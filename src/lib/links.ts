import type { SiteSettings } from "@/lib/settings";
import { pick, type Locale } from "@/lib/i18n";

export function whatsappUrl(settings: SiteSettings, locale: Locale) {
  const number = settings.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const text = pick(settings.contact.whatsappMessage, locale);
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

// "wa" en un enlace editable abre WhatsApp con el número del negocio.
export function resolveHref(href: string, settings: SiteSettings, locale: Locale) {
  const value = href.trim();
  if (value === "wa") return whatsappUrl(settings, locale) ?? "#contacto";
  return value || "#";
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export function telUrl(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mapQuery(settings: SiteSettings) {
  return settings.business.mapQuery || settings.business.address;
}

export function directionsUrl(settings: SiteSettings) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery(settings))}`;
}

export function mapEmbedUrl(settings: SiteSettings, locale: Locale) {
  return `https://www.google.com/maps?q=${encodeURIComponent(mapQuery(settings))}&hl=${locale}&z=16&output=embed`;
}
