import Image from "next/image";
import type { ImageValue } from "@/lib/fields";
import { pick, type Locale } from "@/lib/i18n";

// Dominios configurados en next.config.ts (remotePatterns). Cualquier otra
// URL pegada en el panel se muestra tal cual, sin optimizar.
const OPTIMIZABLE = [/^\//, /^https:\/\/images\.pexels\.com\//, /^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//];

export function canOptimize(src: string) {
  return OPTIMIZABLE.some((re) => re.test(src));
}

export function Img({
  image,
  locale,
  fallbackAlt = "",
  sizes,
  className,
  preload,
}: {
  image: ImageValue;
  locale: Locale;
  fallbackAlt?: string;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  if (!image.src) return null;
  return (
    <Image
      src={image.src}
      alt={pick(image.alt, locale) || fallbackAlt}
      fill
      sizes={sizes}
      className={className}
      preload={preload}
      unoptimized={!canOptimize(image.src)}
    />
  );
}
