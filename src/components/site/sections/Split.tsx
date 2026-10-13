import { pick } from "@/lib/i18n";
import { Img } from "../Img";
import { Head, stagger } from "./Head";
import type { SectionProps } from "./types";

export function Split({ data, locale }: SectionProps<"split">) {
  return (
    <section className="sec split-sec" id={data.anchor || undefined}>
      <div className={`container split-grid${data.imageSide === "right" ? " reverse" : ""}`}>
        {data.image.src && (
          <div className="split-media reveal">
            <div className="split-photo">
              <Img image={data.image} locale={locale} sizes="(max-width: 920px) 100vw, 580px" />
            </div>
          </div>
        )}
        <div>
          <Head eyebrow={data.eyebrow} title={data.title} text={data.text} locale={locale} />
          {data.items.length > 0 && (
            <div className="split-list">
              {data.items.map((item, i) => (
                <div key={i} className="split-item reveal" style={stagger(i)}>
                  <span aria-hidden="true" />
                  <div>
                    <h3>{pick(item.name, locale)}</h3>
                    <p>{pick(item.text, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
