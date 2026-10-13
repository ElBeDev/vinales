import { pick } from "@/lib/i18n";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Faq({ data, locale }: SectionProps<"faq">) {
  const eyebrow = pick(data.eyebrow, locale);
  return (
    <section className="faq-sec" id={data.anchor || undefined}>
      <div className="s-inner">
        <div className="reveal">
          {eyebrow && <p className="s-label">{eyebrow}</p>}
          <h2 className="s-title">
            <Rich text={pick(data.title, locale)} />
          </h2>
        </div>
        <div className="faq-list">
          {data.items.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>{pick(item.q, locale)}</summary>
              <p>{pick(item.a, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
