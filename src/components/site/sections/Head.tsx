import { pick, type Locale, type Localized } from "@/lib/i18n";
import { Rich } from "../Rich";

// Encabezado común de sección: etiqueta + título (+ texto).
export function Head({
  eyebrow,
  title,
  text,
  locale,
  layout = "stack",
  as: Tag = "h2",
}: {
  eyebrow?: Localized;
  title?: Localized;
  text?: Localized;
  locale: Locale;
  layout?: "stack" | "split" | "center";
  as?: "h1" | "h2";
}) {
  const e = pick(eyebrow, locale);
  const ti = pick(title, locale);
  const tx = pick(text, locale);
  if (!e && !ti && !tx) return null;

  const heading = (
    <div className="reveal">
      {e && <p className="eyebrow">{e}</p>}
      {ti && (
        <Tag className="title">
          <Rich text={ti} />
        </Tag>
      )}
    </div>
  );

  if (layout === "split") {
    return (
      <header className="sec-head split">
        {heading}
        {tx && (
          <p className="lead reveal" style={{ "--i": 1 } as React.CSSProperties}>
            {tx}
          </p>
        )}
      </header>
    );
  }

  return (
    <header className={`sec-head${layout === "center" ? " center" : ""}`}>
      {heading}
      {tx && (
        <p className="lead reveal" style={{ "--i": 1 } as React.CSSProperties}>
          {tx}
        </p>
      )}
    </header>
  );
}

export const stagger = (i: number) => ({ "--i": i % 6 }) as React.CSSProperties;
