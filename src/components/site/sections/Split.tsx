import { pick } from "@/lib/i18n";
import { Img } from "../Img";
import { Rich } from "../Rich";
import { delay, num, type SectionProps } from "./types";

export function Split({ data, locale }: SectionProps<"split">) {
  const text = pick(data.text, locale);
  return (
    <section className="pipes-sec" id={data.anchor || undefined}>
      <div className="s-inner">
        <div className={`pipes-layout${data.imageSide === "right" ? " reverse" : ""}`}>
          {data.image.src && (
            <div className="pipes-visual reveal">
              <Img image={data.image} locale={locale} sizes="(max-width: 900px) 100vw, 560px" className="pipes-photo" />
              <div className="pipes-photo-overlay" />
            </div>
          )}
          <div>
            <div className="reveal">
              <p className="s-label">{pick(data.eyebrow, locale)}</p>
              <h2 className="s-title">
                <Rich text={pick(data.title, locale)} />
              </h2>
              <div className="gold-rule" />
              {text && (
                <p className="s-text" style={{ marginBottom: "3rem" }}>
                  {text}
                </p>
              )}
            </div>
            <div className="pipes-items">
              {data.items.map((item, i) => (
                <div key={i} className={`pipe-item reveal${delay(i)}`}>
                  <span className="pipe-num">{num(i)}</span>
                  <div>
                    <span className="pipe-name">{pick(item.name, locale)}</span>
                    <span className="pipe-desc">{pick(item.text, locale)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
