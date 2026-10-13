import type { HoursValue } from "@/lib/fields";
import { dayName, t, type Locale } from "@/lib/i18n";

export function formatTime(value: string, locale: Locale) {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h)) return value;
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const time = `${hour12}:${String(m ?? 0).padStart(2, "0")}`;
  return locale === "es" ? `${time} ${suffix}` : `${time} ${suffix.toUpperCase()}`;
}

// Agrupa días consecutivos con el mismo horario:
// [{ days: "Lunes — Sábado", time: "12:00 pm — 8:00 pm" }, { days: "Domingo", time: "Cerrado" }]
export function summarizeHours(hours: HoursValue, locale: Locale) {
  // Orden de lunes a domingo
  const week = [1, 2, 3, 4, 5, 6, 0]
    .map((d) => hours.find((h) => h.day === d))
    .filter((h) => h !== undefined);

  const label = (h: HoursValue[number]) =>
    h.closed
      ? t("closed", locale)
      : `${formatTime(h.open, locale)} — ${formatTime(h.close, locale)}`;

  const groups: { from: number; to: number; time: string }[] = [];
  for (const h of week) {
    const time = label(h);
    const last = groups.at(-1);
    if (last && last.time === time) last.to = h.day;
    else groups.push({ from: h.day, to: h.day, time });
  }

  return groups.map((g) => ({
    days:
      g.from === g.to
        ? dayName(g.from, locale)
        : `${dayName(g.from, locale)} — ${dayName(g.to, locale)}`,
    time: g.time,
    closed: g.time === t("closed", locale),
  }));
}
