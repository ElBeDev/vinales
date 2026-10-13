import { pick } from "@/lib/i18n";
import { resolveHref } from "@/lib/links";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Statement({ data, locale, settings }: SectionProps<"statement">) {
  const label = pick(data.button.label, locale);
  const text = pick(data.text, locale);
  return (
    <section className="exp-sec">
      <div className="exp-inner reveal">
        <span className="exp-mark">&ldquo;</span>
        <p className="exp-quote">
          <Rich text={pick(data.quote, locale)} />
        </p>
        {text && <p className="exp-sub">{text}</p>}
        {label && (
          <a href={resolveHref(data.button.href, settings, locale)} className="btn-gold">
            {label}
          </a>
        )}
      </div>
    </section>
  );
}
