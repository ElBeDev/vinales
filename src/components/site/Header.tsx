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
};

export function Header({ locale, name, logo, nav, banner }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El nombre se muestra como "Vi[ñ]ales": la ñ en rojo, como el logo original.
  const accent = name.match(/^(.*?)(ñ|Ñ)(.*?)(\s.*)?$/);

  return (
    <header className={`site-header${banner ? " has-banner" : ""}`}>
      {banner &&
        (banner.href ? (
          <a className="top-banner" href={banner.href}>
            {banner.text}
          </a>
        ) : (
          <p className="top-banner">{banner.text}</p>
        ))}
      <nav id="nav" className={scrolled ? "scrolled" : undefined}>
        <a href="#" className="nav-logo">
          {logo && (
            <Image
              src={logo}
              alt={name}
              width={46}
              height={46}
              className="nav-logo-img"
              unoptimized={!canOptimize(logo)}
            />
          )}
          <span className="nav-logo-text">
            {accent ? (
              <>
                <span className="nav-logo-name">
                  {accent[1]}
                  <span className="nav-logo-accent">{accent[2]}</span>
                  {accent[3]}
                </span>
                {accent[4] && <span className="nav-logo-sub">{accent[4].trim()}</span>}
              </>
            ) : (
              <span className="nav-logo-name">{name}</span>
            )}
          </span>
        </a>
        <ul className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {nav.map((item, i) => (
            <li key={i}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {pick(item.label, locale)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <a className="lang-btn" href={`/${other}`} hrefLang={other} aria-label={t("switchLang", locale)}>
            {other.toUpperCase()}
          </a>
          <button
            className={`nav-toggle${open ? " open" : ""}`}
            aria-label={t("menu", locale)}
            aria-expanded={open}
            aria-controls="navLinks"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
