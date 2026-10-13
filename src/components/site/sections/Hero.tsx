import Image from "next/image";
import { pick, t } from "@/lib/i18n";
import { directionsUrl, resolveHref } from "@/lib/links";
import { canOptimize, Img } from "../Img";
import { OpenNow } from "../OpenNow";
import { Rich } from "../Rich";
import { UiIcon } from "../UiIcon";
import type { SectionProps } from "./types";

export function Hero({ data, locale, settings }: SectionProps<"hero">) {
  const eyebrow = pick(data.eyebrow, locale);
  const { logo, name, address, timezone } = settings.business;
  const sealText = `${name} · ${eyebrow || "Puros cubanos"} · `.toUpperCase().slice(0, 60);

  return (
    <section className="hero">
      <div className="hero-media">
        {data.video ? (
          <video src={data.video} poster={data.image.src || undefined} autoPlay muted loop playsInline aria-hidden="true" />
        ) : (
          <Img image={data.image} locale={locale} sizes="100vw" preload />
        )}
      </div>

      <div className="container hero-content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="hero-title">
          <Rich text={pick(data.title, locale)} />
        </h1>
        <p className="hero-tagline">
          <Rich text={pick(data.tagline, locale)} />
        </p>
        {data.buttons.length > 0 && (
          <div className="hero-actions">
            {data.buttons.map((b, i) => (
              <a
                key={i}
                href={resolveHref(b.href, settings, locale)}
                className={`btn ${b.style === "outline" ? "btn-outline" : "btn-primary"}`}
              >
                {pick(b.label, locale)}
              </a>
            ))}
          </div>
        )}
      </div>

      {data.showLogo && logo.src && (
        <div className="hero-seal" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <path id="seal-path" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
            </defs>
            <text>
              <textPath href="#seal-path" textLength="538" lengthAdjust="spacing">
                {sealText}
              </textPath>
            </text>
          </svg>
          <Image src={logo.src} alt="" width={120} height={120} unoptimized={!canOptimize(logo.src)} />
        </div>
      )}

      <div className="hero-bar">
        <div className="container hero-bar-inner">
          {address ? (
            <a className="hero-bar-item" href={directionsUrl(settings)} target="_blank" rel="noopener noreferrer">
              <UiIcon name="pin" />
              {address}
            </a>
          ) : (
            <span />
          )}
          <div className="hero-bar-item">
            <UiIcon name="clock" />
            <OpenNow hours={settings.hours} timezone={timezone} locale={locale} />
          </div>
          <a className="scroll-cue" href={settings.nav[0]?.href ?? "#"}>
            {t("scroll", locale)}
            <i />
          </a>
        </div>
      </div>
    </section>
  );
}
