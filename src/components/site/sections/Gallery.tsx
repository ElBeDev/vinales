"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { pick, t } from "@/lib/i18n";
import { canOptimize, Img } from "../Img";
import { Head } from "./Head";
import type { SectionProps } from "./types";

export function Gallery({ data, locale }: Omit<SectionProps<"gallery">, "settings">) {
  const items = data.items.filter((item) => item.image.src);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? null : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  if (items.length === 0) return null;
  const current = open !== null ? items[open] : null;
  const hasHead = Boolean(pick(data.eyebrow, locale) || pick(data.title, locale));

  return (
    <section className={`sec gallery-sec${hasHead ? "" : " no-head"}`} id={data.anchor || undefined}>
      <div className={hasHead ? "container" : undefined}>
        <Head eyebrow={data.eyebrow} title={data.title} locale={locale} layout="center" />
        <div className="mosaic" data-count={Math.min(items.length, 6)}>
          {items.map((item, i) => {
            const title = pick(item.title, locale);
            const subtitle = pick(item.subtitle, locale);
            return (
              <button key={i} type="button" className="tile reveal" style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(i)}>
                <Img image={item.image} locale={locale} fallbackAlt={title} sizes="(max-width: 600px) 100vw, (max-width: 920px) 50vw, 40vw" />
                {(title || subtitle) && (
                  <span className="tile-label">
                    <b>{title}</b>
                    {subtitle && <small>{subtitle}</small>}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label={t("close", locale)}>
            ✕
          </button>
          {items.length > 1 && (
            <>
              <button type="button" className="lightbox-btn lightbox-prev" aria-label="←" onClick={(e) => { e.stopPropagation(); step(-1); }}>
                ‹
              </button>
              <button type="button" className="lightbox-btn lightbox-next" aria-label="→" onClick={(e) => { e.stopPropagation(); step(1); }}>
                ›
              </button>
            </>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.image.src}
              alt={pick(current.image.alt, locale) || pick(current.title, locale)}
              fill
              sizes="100vw"
              quality={85}
              unoptimized={!canOptimize(current.image.src)}
            />
            <figcaption>{pick(current.title, locale)}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
