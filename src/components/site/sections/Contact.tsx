import { summarizeHours } from "@/lib/hours";
import { t } from "@/lib/i18n";
import { directionsUrl, mapEmbedUrl, telUrl, whatsappUrl } from "@/lib/links";
import { OpenNow } from "../OpenNow";
import { UiIcon } from "../UiIcon";
import { Head } from "./Head";
import type { SectionProps } from "./types";

export const SOCIAL_LABELS = {
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
    <section className="sec contact-sec" id={data.anchor || undefined}>
      <div className="container contact-grid">
        <div>
          <Head eyebrow={data.eyebrow} title={data.title} locale={locale} />

          <div className="contact-blocks">
            {business.address && (
              <div className="contact-block reveal">
                <UiIcon name="pin" />
                <div>
                  <h3>{t("location", locale)}</h3>
                  <p>{business.name}</p>
                  <p className="muted">{business.address}</p>
                </div>
              </div>
            )}
            <div className="contact-block reveal" style={{ "--i": 1 } as React.CSSProperties}>
              <UiIcon name="clock" />
              <div>
                <h3>{t("hours", locale)}</h3>
                <ul className="hours">
                  {summarizeHours(hours, locale).map((row, i) => (
                    <li key={i} className={row.closed ? "closed" : undefined}>
                      <span>{row.days}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
                <OpenNow hours={hours} timezone={business.timezone} locale={locale} />
              </div>
            </div>
            {(contact.email || contact.phone || socials.length > 0) && (
              <div className="contact-block reveal" style={{ "--i": 2 } as React.CSSProperties}>
                <UiIcon name="mail" />
                <div>
                  <h3>{t("contact", locale)}</h3>
                  {contact.email && (
                    <p>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                  )}
                  {contact.phone && (
                    <p>
                      <a href={telUrl(contact.phone)}>{contact.phone}</a>
                    </p>
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
            )}
          </div>

          <div className="contact-actions reveal" style={{ "--i": 3 } as React.CSSProperties}>
            {business.address && (
              <a className="btn btn-gold" href={directionsUrl(settings)} target="_blank" rel="noopener noreferrer">
                <UiIcon name="pin" />
                {t("directions", locale)}
              </a>
            )}
            {wa && (
              <a className="btn btn-outline" href={wa} target="_blank" rel="noopener noreferrer">
                <UiIcon name="chat" />
                WhatsApp
              </a>
            )}
            {contact.phone && (
              <a className="btn btn-outline" href={telUrl(contact.phone)}>
                <UiIcon name="phone" />
                {t("call", locale)}
              </a>
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
    </section>
  );
}
