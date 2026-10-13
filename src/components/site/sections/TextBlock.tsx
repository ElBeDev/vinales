import { pick } from "@/lib/i18n";
import { RichParagraphs } from "../Rich";
import { Head } from "./Head";
import type { SectionProps } from "./types";

export function TextBlock({ data, locale }: SectionProps<"text">) {
  const center = data.align === "center";
  return (
    <section className={`sec text-sec${center ? " center" : ""}`} id={data.anchor || undefined}>
      <div className="container">
        <Head eyebrow={data.eyebrow} title={data.title} locale={locale} layout={center ? "center" : "stack"} />
        <div className="prose reveal">
          <RichParagraphs text={pick(data.body, locale)} />
        </div>
      </div>
    </section>
  );
}
