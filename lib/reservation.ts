export const LUNCH_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
] as const;

export const DINNER_TIMES = [
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
] as const;

export const TIME_SLOTS = [...LUNCH_TIMES, ...DINNER_TIMES];

export const AREAS = ["any", "upstairs", "downstairs", "terrace"] as const;
export type Area = (typeof AREAS)[number];

export const AREA_LABELS_PT: Record<Area, string> = {
  any: "Qualquer área",
  upstairs: "Sala de cima",
  downstairs: "Sala de baixo",
  terrace: "Esplanada",
};

export const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
