"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { t, type Locale } from "@/lib/i18n";
import { canOptimize } from "./Img";

const KEY = "vinales-age-ok";

function readStored() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function AgeGate({ locale, logo, name }: { locale: Locale; logo: string; name: string }) {
  // En el servidor no se muestra; en el navegador depende de lo guardado.
  const stored = useSyncExternalStore(subscribe, readStored, () => "1");
  const [accepted, setAccepted] = useState(false);
  const [denied, setDenied] = useState(false);
  const show = stored !== "1" && !accepted;

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
  }, [show]);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setAccepted(true);
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-card">
        {logo && (
          <Image src={logo} alt={name} width={110} height={110} unoptimized={!canOptimize(logo)} />
        )}
        <h2 id="age-title">{t("ageTitle", locale)}</h2>
        <p>{denied ? t("ageDenied", locale) : t("ageText", locale)}</p>
        {!denied && (
          <div className="age-actions">
            <button type="button" className="btn-gold" onClick={accept}>
              {t("ageYes", locale)}
            </button>
            <button type="button" className="btn-ghost" onClick={() => setDenied(true)}>
              {t("ageNo", locale)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
