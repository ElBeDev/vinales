import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "weekly",
    priority: 1,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}`])) },
  }));
}
