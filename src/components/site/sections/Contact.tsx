import { summarizeHours } from "@/lib/hours";
import { t } from "@/lib/i18n";
import { directionsUrl, mapEmbedUrl, telUrl, whatsappUrl } from "@/lib/links";
import { OpenNow } from "../OpenNow";
import type { SectionProps } from "./types";

const SOCIAL_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  google: "Google",
} as const;

export function Contact({ data, locale, settings }: SectionProps<"contact">) {
  const { business, contact, social, hours } = settings;
  const wa = whatsappUrl(settings, locale);
  const socials = (Object.keys(SOCIAL_LABELS) as (keyof typeof SOCIAL_LABELS)[]).filter((k) => social[k]);

  return (
    <div className="contact-strip" id={data.anchor || undefined}>
      <div className="contact-grid">
        <div className="reveal">
          <p className="c-label">{t("location", locale)}</p>
          <p className="c-value">{business.name}</p>
          <p className="c-sub">{business.address}</p>
          {business.address && (
            <a className="c-link" href={directionsUrl(settings)} target="_blank" rel="noopener noreferrer">
              {t("directions", locale)} →
            </a>
          )}
        </div>
        <div className="reveal d1">
          <p className="c-label">{t("hours", locale)}</p>
          {summarizeHours(hours, locale).map((row, i) =>
            i === 0 ? (
              <div key={i}>
                <p className="c-value">{row.days}</p>
                <p className="c-sub">{row.time}</p>
              </div>
            ) : (
              <p key={i} className={`c-sub c-hours-row${row.closed ? " closed" : ""}`}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </p>
            ),
          )}
          <OpenNow hours={hours} timezone={business.timezone} locale={locale} />
        </div>
        <div className="reveal d2">
          <p className="c-label">{t("contact", locale)}</p>
          {contact.email && (
            <p className="c-value">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
          {contact.phone && (
            <p className="c-sub">
              <a href={telUrl(contact.phone)}>{contact.phone}</a>
            </p>
          )}
          {wa && (
            <a className="c-link" href={wa} target="_blank" rel="noopener noreferrer">
              WhatsApp →
            </a>
          )}
          {socials.length > 0 && (
            <div className="social-links">
              {socials.map((k) => (
                <a key={k} href={social[k]} target="_blank" rel="noopener noreferrer">
                  {SOCIAL_LABELS[k]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      {data.showMap && business.address && (
        <div className="contact-map reveal">
          <iframe
            src={mapEmbedUrl(settings, locale)}
            title={`${t("location", locale)} — ${business.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
