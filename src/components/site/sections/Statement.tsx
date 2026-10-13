import { pick } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Statement({ data, locale, settings }: SectionProps<"statement">) {
  const label = pick(data.button.label, locale);
  const text = pick(data.text, locale);
  return (
    <section className="statement">
      <div className="container statement-grid">
        <blockquote className="statement-quote reveal">
          <Rich text={pick(data.quote, locale)} />
        </blockquote>
        {(text || label) && (
          <div className="statement-side reveal" style={{ "--i": 1 } as React.CSSProperties}>
            {text && <p className="statement-text">{text}</p>}
            {label && (
              <a href={resolveHref(data.button.href, settings, locale)} className="btn btn-gold">
                {label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
