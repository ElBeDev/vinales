"use client";

import { useEffect, useState } from "react";
import type { HoursValue } from "@/lib/fields";
import { formatTime } from "@/lib/hours";
import { dayName, t, type Locale } from "@/lib/i18n";

const toMinutes = (value: string) => {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + (m || 0);
};

function nowIn(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function status(hours: HoursValue, timezone: string, locale: Locale) {
  let now;
  try {
    now = nowIn(timezone);
  } catch {
    now = nowIn("America/Mexico_City");
  }
  const today = hours.find((h) => h.day === now.day);

  if (today && !today.closed && today.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (now.minutes >= open && now.minutes < close) {
      return { open: true, text: `${t("openNow", locale)} · ${t("closesAt", locale)} ${formatTime(today.close, locale)}` };
    }
    if (now.minutes < open) {
      return { open: false, text: `${t("closedNow", locale)} · ${t("opensAt", locale)} ${t("today", locale)} ${formatTime(today.open, locale)}` };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = (now.day + offset) % 7;
    const next = hours.find((h) => h.day === day);
    if (next && !next.closed && next.open) {
      const when = offset === 1 ? t("tomorrow", locale) : dayName(day, locale).toLowerCase();
      return { open: false, text: `${t("closedNow", locale)} · ${t("opensAt", locale)} ${when} ${formatTime(next.open, locale)}` };
    }
  }
  return { open: false, text: t("closedNow", locale) };
}

// Se calcula en el navegador para que siempre esté al día aunque la página
// esté en caché.
export function OpenNow({ hours, timezone, locale }: { hours: HoursValue; timezone: string; locale: Locale }) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const update = () => setState(status(hours, timezone, locale));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours, timezone, locale]);

  return (
    <p className={`open-badge${state?.open ? " open" : ""}`} aria-live="polite">
      {state?.text ?? " "}
    </p>
  );
}
