import { pick } from "@/lib/i18n";
import { Icon } from "../Icon";
import { Img } from "../Img";
import { Rich } from "../Rich";
import { delay, type SectionProps } from "./types";

export function Features({ data, locale }: SectionProps<"features">) {
  return (
    <section className="acc-sec" id={data.anchor || undefined}>
      <div className="s-inner">
        <div className="acc-layout">
          <div className="acc-sticky reveal">
            <p className="s-label">{pick(data.eyebrow, locale)}</p>
            <h2 className="s-title">
              <Rich text={pick(data.title, locale)} />
            </h2>
            <div className="gold-rule" />
            <p className="s-text">{pick(data.text, locale)}</p>
            {data.image.src && (
              <div className="acc-photo">
                <Img image={data.image} locale={locale} sizes="(max-width: 900px) 100vw, 560px" />
                <div className="acc-photo-overlay" />
              </div>
            )}
          </div>
          <div className="acc-grid">
            {data.items.map((item, i) => (
              <div key={i} className={`acc-card reveal${delay(i)}`}>
                {item.icon !== "none" && <Icon name={item.icon} className="acc-icon" />}
                <h3 className="acc-name">{pick(item.name, locale)}</h3>
                <p className="acc-desc">{pick(item.text, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
