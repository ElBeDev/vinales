import { pick } from "@/lib/i18n";
import { Icon } from "../Icon";
import { Img } from "../Img";
import { Head, stagger } from "./Head";
import type { SectionProps } from "./types";

// Sección en tono papel para romper el fondo oscuro.
export function Features({ data, locale }: SectionProps<"features">) {
  return (
    <section className="sec paper" id={data.anchor || undefined}>
      <div className="container features-grid">
        <div className="features-aside">
          <Head eyebrow={data.eyebrow} title={data.title} text={data.text} locale={locale} />
          {data.image.src && (
            <div className="features-photo reveal">
              <Img image={data.image} locale={locale} sizes="(max-width: 920px) 100vw, 560px" />
            </div>
          )}
        </div>
        <div className="features-list">
          {data.items.map((item, i) => (
            <div key={i} className="feature reveal" style={stagger(i)}>
              {item.icon !== "none" && (
                <div className="feature-icon">
                  <Icon name={item.icon} />
                </div>
              )}
              <h3>{pick(item.name, locale)}</h3>
              <p>{pick(item.text, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
