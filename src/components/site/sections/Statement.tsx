import { pick } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Statement({ data, locale, settings }: SectionProps<"statement">) {
  const label = pick(data.button.label, locale);
  const text = pick(data.text, locale);
  return (
    <section className="statement">
      <div className="smoke" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container reveal">
        <span className="statement-mark" aria-hidden="true">&ldquo;</span>
        <p className="statement-quote">
          <Rich text={pick(data.quote, locale)} />
        </p>
        {text && <p className="statement-text">{text}</p>}
        {label && (
          <a href={resolveHref(data.button.href, settings, locale)} className="btn btn-gold">
            {label}
          </a>
        )}
      </div>
    </section>
  );
}
