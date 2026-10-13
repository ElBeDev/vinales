import Image from "next/image";
import { pick, t } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { canOptimize, Img } from "../Img";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Hero({ data, locale, settings }: SectionProps<"hero">) {
  const eyebrow = pick(data.eyebrow, locale);
  const logo = settings.business.logo;

  return (
    <div className="hero">
      <div className="hero-media">
        {data.video ? (
          <video
            src={data.video}
            poster={data.image.src || undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Img image={data.image} locale={locale} sizes="100vw" preload />
        )}
      </div>

      <div className="hero-inner">
        {data.showLogo && logo.src && (
          <div className="hero-logo-wrap">
            <Image
              src={logo.src}
              alt={settings.business.name}
              width={185}
              height={185}
              className="hero-logo"
              preload
              unoptimized={!canOptimize(logo.src)}
            />
          </div>
        )}
        {eyebrow && (
          <div className="hero-band">
            <span className="hero-band-line" />
            <span className="hero-band-text">{eyebrow}</span>
            <span className="hero-band-line" />
          </div>
        )}
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
                className={b.style === "outline" ? "btn-ghost" : "btn-gold"}
              >
                {pick(b.label, locale)}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line" />
        <span>{t("scroll", locale)}</span>
      </div>
    </div>
  );
}
