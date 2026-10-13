"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { pick, t, type Locale, type Localized } from "@/lib/i18n";
import { canOptimize } from "./Img";

type Props = {
  locale: Locale;
  name: string;
  logo: string;
  nav: { label: Localized; href: string }[];
  banner: { text: string; href: string } | null;
  address: string;
  phone: string;
  email: string;
};

export function Header({ locale, name, logo, nav, banner, address, phone, email }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // "Viñales Cigar Shop" → VI[Ñ]ALES + "Cigar Shop"
  const m = name.match(/^(\S*?)([ñÑ])(\S*)\s*(.*)$/);

  return (
    <>
      <header className="site-header">
        {banner &&
          (banner.href ? (
            <a className="top-banner" href={banner.href}>
              {banner.text}
            </a>
          ) : (
            <p className="top-banner">{banner.text}</p>
          ))}
        <nav className={`nav${scrolled || open ? " scrolled" : ""}`} aria-label={t("menu", locale)}>
          <div className="container nav-inner">
            <a href={`/${locale}`} className="nav-brand" onClick={() => setOpen(false)}>
              {logo && <Image src={logo} alt="" width={44} height={44} preload unoptimized={!canOptimize(logo)} />}
              <span className="nav-wordmark">
                {m ? (
                  <>
                    <b>
                      {m[1]}
                      <span>{m[2]}</span>
                      {m[3]}
                    </b>
                    {m[4] && <small>{m[4]}</small>}
                  </>
                ) : (
                  <b>{name}</b>
                )}
              </span>
            </a>
            <ul className="nav-links">
              {nav.map((item, i) => (
                <li key={i}>
                  <a href={item.href}>{pick(item.label, locale)}</a>
                </li>
              ))}
            </ul>
            <div className="lang-switch">
              {(["es", "en"] as const).map((l) =>
                l === locale ? (
                  <span key={l}>{l.toUpperCase()}</span>
                ) : (
                  <a key={l} href={`/${other}`} hrefLang={other} aria-label={t("switchLang", locale)}>
                    {l.toUpperCase()}
                  </a>
                ),
              )}
            </div>
            <button
              className={`nav-toggle${open ? " open" : ""}`}
              aria-label={t("menu", locale)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <ol>
          {nav.map((item, i) => (
            <li key={i}>
              <a
                href={item.href}
                style={{ "--i": i } as React.CSSProperties}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
              >
                {pick(item.label, locale)}
              </a>
            </li>
          ))}
        </ol>
        <div className="mobile-menu-foot">
          {address && <span>{address}</span>}
          {phone && <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} tabIndex={open ? 0 : -1}>{phone}</a>}
          {email && <a href={`mailto:${email}`} tabIndex={open ? 0 : -1}>{email}</a>}
        </div>
      </div>
    </>
  );
}
