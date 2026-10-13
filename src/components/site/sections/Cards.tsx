import { pick } from "@/lib/i18n";
import { Icon } from "../Icon";
import { Img } from "../Img";
import { Head, stagger } from "./Head";
import { num, type SectionProps } from "./types";

const RING_ICONS = new Set(["cutter", "flame", "humidor", "sun"]);

export function Cards({ data, locale }: SectionProps<"cards">) {
  const label = pick(data.bannerLabel, locale);
  return (
    <section className="sec cards-sec" id={data.anchor || undefined}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} text={data.text} locale={locale} layout="split" />

        {data.banner.src && (
          <figure className="banner reveal">
            <Img image={data.banner} locale={locale} fallbackAlt={label} sizes="(max-width: 1320px) 100vw, 1240px" />
            {label && <figcaption>{label}</figcaption>}
          </figure>
        )}

        <div className="cards-grid">
          {data.items.map((item, i) => (
            <article key={i} className="card reveal" style={stagger(i)}>
              <div className="card-top">
                <span className="card-num">{num(i)}</span>
                {item.icon !== "none" && (
                  <span className="card-icon">
                    <Icon name={item.icon} className={RING_ICONS.has(item.icon) ? "icon-ring" : undefined} />
                  </span>
                )}
              </div>
              <h3>{pick(item.name, locale)}</h3>
              <p>{pick(item.text, locale)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
