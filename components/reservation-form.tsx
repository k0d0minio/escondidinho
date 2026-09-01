"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useActionState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type ReserveState, submitReservation } from "@/lib/actions/reserve";
import {
  AREAS,
  DINNER_TIMES,
  LUNCH_TIMES,
  PARTY_SIZES,
} from "@/lib/reservation";
import { site } from "@/lib/site";

const INITIAL: ReserveState = { status: "idle" };

const AREA_KEYS = {
  any: "areaAny",
  upstairs: "areaUpstairs",
  downstairs: "areaDownstairs",
  terrace: "areaTerrace",
} as const;

export function ReservationForm() {
  const t = useTranslations("reserve");
  const tHours = useTranslations("hours");
  const locale = useLocale();
  const id = useId();
  const [state, formAction, pending] = useActionState(
    submitReservation,
    INITIAL,
  );

  const today = new Date().toISOString().slice(0, 10);
  const v = (key: string) => state.values?.[key] ?? undefined;
  const fieldError = (key: string) =>
    state.status === "invalid" && state.errors?.[key] ? (
      <p className="mt-1.5 text-xs text-destructive" role="alert">
        {t(`validation.${state.errors[key]}`)}
      </p>
    ) : null;

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-gold/40 px-8 py-14 text-center"
        role="status"
      >
        <p className="eyebrow">{t("success.title")}</p>
        <p className="display mt-6 text-2xl leading-snug text-foreground md:text-3xl">
          {t("success.body")}
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-7">
      <AnimatePresence>
        {state.status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-destructive/50 bg-destructive/10 px-5 py-4 text-sm"
            role="alert"
          >
            <p className="font-semibold">{t("error.title")}</p>
            <p className="mt-1 text-muted-foreground">
              {t("error.body", { phone: site.phoneDisplay })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeypot — hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`}>{t("form.name")}</Label>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            defaultValue={v("name")}
            aria-invalid={state.errors?.name ? true : undefined}
            className="mt-2"
          />
          {fieldError("name")}
        </div>
        <div>
          <Label htmlFor={`${id}-phone`}>{t("form.phone")}</Label>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            defaultValue={v("phone")}
            aria-invalid={state.errors?.phone ? true : undefined}
            className="mt-2"
          />
          {fieldError("phone")}
        </div>
      </div>

      <div>
        <Label htmlFor={`${id}-email`}>{t("form.email")}</Label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("form.emailPlaceholder")}
          defaultValue={v("email")}
          aria-invalid={state.errors?.email ? true : undefined}
          className="mt-2"
        />
        {fieldError("email")}
      </div>

      <div className="grid gap-7 sm:grid-cols-3">
        <div>
          <Label htmlFor={`${id}-party`}>{t("form.partySize")}</Label>
          <Select
            key={`party-${v("partySize") ?? "2"}`}
            name="partySize"
            defaultValue={v("partySize") ?? "2"}
          >
            <SelectTrigger id={`${id}-party`} className="mt-2 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PARTY_SIZES.map((n) => (
                <SelectItem key={n} value={n}>
                  {n === "9"
                    ? t("form.partySizeMore")
                    : t("form.partySizeOption", { count: Number(n) })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor={`${id}-date`}>{t("form.date")}</Label>
          <Input
            id={`${id}-date`}
            name="date"
            type="date"
            min={today}
            lang={locale}
            defaultValue={v("date")}
            aria-invalid={state.errors?.date ? true : undefined}
            className="mt-2 [color-scheme:dark]"
          />
          {fieldError("date")}
        </div>
        <div>
          <Label htmlFor={`${id}-time`}>{t("form.time")}</Label>
          <Select
            key={`time-${v("time") ?? "unset"}`}
            name="time"
            defaultValue={v("time")}
          >
            <SelectTrigger
              id={`${id}-time`}
              className="mt-2 w-full"
              aria-invalid={state.errors?.time ? true : undefined}
            >
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{tHours("lunchLabel")}</SelectLabel>
                {LUNCH_TIMES.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>{tHours("dinnerLabel")}</SelectLabel>
                {DINNER_TIMES.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldError("time")}
        </div>
      </div>

      <div>
        <Label htmlFor={`${id}-area`}>{t("form.area")}</Label>
        <Select
          key={`area-${v("area") ?? "any"}`}
          name="area"
          defaultValue={v("area") ?? "any"}
        >
          <SelectTrigger id={`${id}-area`} className="mt-2 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AREAS.map((area) => (
              <SelectItem key={area} value={area}>
                {t(`form.${AREA_KEYS[area]}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={`${id}-notes`}>{t("form.notes")}</Label>
        <Textarea
          id={`${id}-notes`}
          name="notes"
          rows={4}
          placeholder={t("form.notesPlaceholder")}
          defaultValue={v("notes")}
          className="mt-2"
        />
      </div>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center bg-gold px-8 py-3.5 font-sans text-[0.8125rem] font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-gold-bright disabled:opacity-60"
        >
          {pending ? t("form.submitting") : t("form.submit")}
        </button>
        <p className="text-xs text-muted-foreground">{t("confirmNote")}</p>
      </div>
    </form>
  );
}
