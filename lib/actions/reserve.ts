"use server";

import { Resend } from "resend";
import { z } from "zod";
import {
  AREA_LABELS_PT,
  AREAS,
  LUNCH_TIMES,
  TIME_SLOTS,
} from "@/lib/reservation";
import { site } from "@/lib/site";

export type ReserveState = {
  status: "idle" | "success" | "error" | "invalid";
  /** Field name → messages key under `reserve.validation`. */
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const schema = z.object({
  name: z.string().trim().min(2, "name"),
  email: z.email("email"),
  phone: z.string().trim().min(6, "phone"),
  partySize: z.string().regex(/^[1-9]$/, "name"),
  date: z.iso.date("date"),
  time: z.string().refine((v) => TIME_SLOTS.includes(v), "time"),
  area: z.enum(AREAS),
  notes: z.string().trim().max(1000).optional().default(""),
});

function openOn(
  date: string,
  time: string,
): "ok" | "dateClosed" | "timeClosed" {
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  // Closed Monday (1) and Tuesday (2).
  if (day === 1 || day === 2) return "dateClosed";
  // Sunday (0): lunch only.
  if (day === 0 && !(LUNCH_TIMES as readonly string[]).includes(time)) {
    return "timeClosed";
  }
  return "ok";
}

export async function submitReservation(
  _prev: ReserveState,
  formData: FormData,
): Promise<ReserveState> {
  const raw = Object.fromEntries(
    [
      "name",
      "email",
      "phone",
      "partySize",
      "date",
      "time",
      "area",
      "notes",
    ].map((k) => [k, String(formData.get(k) ?? "")]),
  );

  // Honeypot: bots fill it, people never see it.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success" };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "");
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "invalid", errors, values: raw };
  }

  const service = openOn(parsed.data.date, parsed.data.time);
  if (service !== "ok") {
    const field = service === "dateClosed" ? "date" : "time";
    return { status: "invalid", errors: { [field]: service }, values: raw };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitReservation: RESEND_API_KEY is not set");
    return { status: "error", values: raw };
  }

  const { name, email, phone, partySize, date, time, area, notes } =
    parsed.data;
  const party = partySize === "9" ? "9+" : partySize;

  const lines = [
    `Nome: ${name}`,
    `Email: ${email}`,
    `Telefone: ${phone}`,
    `Pessoas: ${party}`,
    `Data: ${date}`,
    `Hora: ${time}`,
    `Área: ${AREA_LABELS_PT[area]}`,
    notes ? `Notas: ${notes}` : null,
    "",
    "— Pedido enviado pelo formulário de reservas do website.",
  ].filter(Boolean);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.RESERVATIONS_FROM ??
        "Reservas Escondidinho <onboarding@resend.dev>",
      to: process.env.RESERVATIONS_TO ?? site.email,
      replyTo: email,
      subject: `Reserva ${date} ${time} — ${name} (${party} pax)`,
      text: lines.join("\n"),
    });
    if (error) {
      console.error("submitReservation: Resend error", error);
      return { status: "error", values: raw };
    }
  } catch (err) {
    console.error("submitReservation: send failed", err);
    return { status: "error", values: raw };
  }

  return { status: "success" };
}
