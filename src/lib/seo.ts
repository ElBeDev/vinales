import { pick, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/settings";

export function siteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return (fromEnv || "http://localhost:3000").replace(/\/$/, "");
}

function absolute(src: string) {
  if (!src) return undefined;
  return src.startsWith("/") ? `${siteUrl()}${src}` : src;
}

const SCHEMA_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Datos estructurados para Google (ficha de negocio local).
export function storeJsonLd(settings: SiteSettings, locale: Locale) {
  const { business, contact, social, hours } = settings;
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: business.name,
    description: pick(settings.seo.description, locale),
    url: `${siteUrl()}/${locale}`,
    image: absolute(settings.seo.image.src || business.logo.src),
    logo: absolute(business.logo.src),
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: business.address
      ? { "@type": "PostalAddress", streetAddress: business.address, addressCountry: "MX" }
      : undefined,
    openingHoursSpecification: hours
      .filter((h) => !h.closed && h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA_DAYS[h.day],
        opens: h.open,
        closes: h.close,
      })),
    sameAs: Object.values(social).filter(Boolean),
  };
}
