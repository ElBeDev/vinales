import { pick } from "@/lib/i18n";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Quote({ data, locale }: SectionProps<"quote">) {
  return (
    <section className="sec quote-sec">
      <div className="container quote-grid">
        <blockquote className="quote-text reveal">
          <Rich text={pick(data.quote, locale)} />
        </blockquote>
        {data.statValue && (
          <div className="quote-stat reveal" style={{ "--i": 1 } as React.CSSProperties}>
            <b>{data.statValue}</b>
            <span>{pick(data.statLabel, locale)}</span>
          </div>
        )}
      </div>
    </section>
  );
}
