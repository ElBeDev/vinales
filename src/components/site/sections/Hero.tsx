import Image from "next/image";
import { pick } from "@/lib/i18n";
import { directionsUrl, resolveHref } from "@/lib/links";
import { canOptimize, Img } from "../Img";
import { OpenNow } from "../OpenNow";
import { Rich } from "../Rich";
import { UiIcon } from "../UiIcon";
import type { SectionProps } from "./types";

export function Hero({ data, locale, settings }: SectionProps<"hero">) {
  const eyebrow = pick(data.eyebrow, locale);
  const { logo, name, address, timezone } = settings.business;

  return (
    <section className="hero">
      <div className="hero-media">
        {data.video ? (
          <video src={data.video} poster={data.image.src || undefined} autoPlay muted loop playsInline aria-hidden="true" />
        ) : (
          <Img image={data.image} locale={locale} sizes="(max-width: 920px) 100vw, 46vw" preload />
        )}
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          {data.showLogo && logo.src && (
            <Image src={logo.src} alt={name} width={150} height={150} className="hero-logo" preload unoptimized={!canOptimize(logo.src)} />
          )}
          {/* La etiqueta va dentro del H1 para que el encabezado principal diga qué es la tienda. */}
          <h1>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <span className="hero-title">
              <Rich text={pick(data.title, locale)} />
            </span>
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
      </div>

      <div className="hero-bar">
        <div className="container hero-bar-inner">
          {address && (
            <a className="hero-bar-item" href={directionsUrl(settings)} target="_blank" rel="noopener noreferrer">
              <UiIcon name="pin" />
              {address}
            </a>
          )}
          <div className="hero-bar-item">
            <UiIcon name="clock" />
            <OpenNow hours={settings.hours} timezone={timezone} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
