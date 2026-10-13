import Image from "next/image";
import { summarizeHours } from "@/lib/hours";
import { pick, t, type Locale } from "@/lib/i18n";
import { telUrl } from "@/lib/links";
import type { SiteSettings } from "@/lib/settings";
import { canOptimize } from "./Img";
import { SOCIAL_LABELS } from "./sections/Contact";

export function Footer({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const { business, contact, social } = settings;
  const logo = business.logo.src;
  const copy = pick(settings.legal.footer, locale).replace("{year}", String(new Date().getFullYear()));
  const socials = (Object.keys(SOCIAL_LABELS) as (keyof typeof SOCIAL_LABELS)[]).filter((k) => social[k]);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {logo && <Image src={logo} alt={business.name} width={74} height={74} unoptimized={!canOptimize(logo)} />}
          <p>{pick(settings.seo.description, locale)}</p>
        </div>
        <div>
          <h4>{t("explore", locale)}</h4>
          <ul>
            {settings.nav.map((item, i) => (
              <li key={i}>
                <a href={item.href}>{pick(item.label, locale)}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t("contact", locale)}</h4>
          <ul>
            {business.address && <li>{business.address}</li>}
            {contact.phone && (
              <li>
                <a href={telUrl(contact.phone)}>{contact.phone}</a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
            {socials.map((k) => (
              <li key={k}>
                <a href={social[k]} target="_blank" rel="noopener noreferrer">
                  {SOCIAL_LABELS[k]} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{t("hours", locale)}</h4>
          <ul className="hours">
            {summarizeHours(settings.hours, locale).map((row, i) => (
              <li key={i} className={row.closed ? "closed" : undefined}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>{copy}</span>
          <b>{t("adultsOnly", locale)}</b>
        </div>
      </div>
    </footer>
  );
}
