import { pick } from "@/lib/i18n";
import type { SectionProps } from "./types";

export function Marquee({ data, locale }: Omit<SectionProps<"marquee">, "settings">) {
  const items = data.items.map((i) => pick(i.label, locale)).filter(Boolean);
  if (items.length === 0) return null;
  // Se repite hasta llenar el ancho; la pista se desplaza la mitad de su largo.
  const group = Array.from({ length: Math.max(2, Math.ceil(12 / items.length)) }, () => items).flat();
  const dur = `${Math.max(25, group.length * 4)}s`;

  return (
    <div className="marquee" style={{ "--dur": dur } as React.CSSProperties}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group" aria-hidden={copy === 1}>
            {group.map((text, i) => (
              <span key={i} className="marquee-item">
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
