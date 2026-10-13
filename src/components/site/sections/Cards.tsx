import { pick } from "@/lib/i18n";
import { Icon } from "../Icon";
import { Img } from "../Img";
import { Rich } from "../Rich";
import { delay, num, type SectionProps } from "./types";

export function Cards({ data, locale }: SectionProps<"cards">) {
  const label = pick(data.bannerLabel, locale);
  return (
    <section className="puros-sec" id={data.anchor || undefined}>
      <div className="s-inner">
        <div className="puros-head">
          <div className="reveal">
            <p className="s-label">{pick(data.eyebrow, locale)}</p>
            <h2 className="s-title">
              <Rich text={pick(data.title, locale)} />
            </h2>
          </div>
          <div className="reveal d1">
            <div className="gold-rule" />
            <p className="s-text">{pick(data.text, locale)}</p>
          </div>
        </div>

        {data.banner.src && (
          <div className="puros-banner reveal">
            <Img image={data.banner} locale={locale} fallbackAlt={label} sizes="(max-width: 1280px) 100vw, 1200px" />
            <div className="puros-banner-overlay" />
            {label && <span className="puros-banner-label">{label}</span>}
          </div>
        )}

        <div className="puros-grid">
          {data.items.map((item, i) => (
            <div key={i} className={`puro-card reveal${delay(i)}`}>
              {item.icon !== "none" && (
                <div className="puro-icon">
                  <Icon name={item.icon} className="acc-icon" />
                </div>
              )}
              <p className="puro-num">{num(i)}</p>
              <h3 className="puro-name">{pick(item.name, locale)}</h3>
              <p className="puro-desc">{pick(item.text, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
