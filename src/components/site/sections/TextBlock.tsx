import { pick } from "@/lib/i18n";
import { Rich, RichParagraphs } from "../Rich";
import type { SectionProps } from "./types";

export function TextBlock({ data, locale }: SectionProps<"text">) {
  const eyebrow = pick(data.eyebrow, locale);
  const title = pick(data.title, locale);
  return (
    <section className={`text-sec${data.align === "center" ? " center" : ""}`} id={data.anchor || undefined}>
      <div className="s-inner reveal">
        {eyebrow && <p className="s-label">{eyebrow}</p>}
        {title && (
          <h2 className="s-title">
            <Rich text={title} />
          </h2>
        )}
        <div className="gold-rule" />
        <div className="text-body">
          <RichParagraphs text={pick(data.body, locale)} />
        </div>
      </div>
    </section>
  );
}
