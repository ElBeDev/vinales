import { pick } from "@/lib/i18n";
import { Head, stagger } from "./Head";
import type { SectionProps } from "./types";

export function Faq({ data, locale }: SectionProps<"faq">) {
  return (
    <section className="sec faq-sec" id={data.anchor || undefined}>
      <div className="container faq-grid">
        <Head eyebrow={data.eyebrow} title={data.title} locale={locale} />
        <div className="faq-list">
          {data.items.map((item, i) => (
            <details key={i} className="faq-item reveal" style={stagger(i)}>
              <summary>{pick(item.q, locale)}</summary>
              <p>{pick(item.a, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
