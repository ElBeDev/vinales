import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { cinzel, cormorant, montserrat } from "@/app/fonts";
import { AgeGate } from "@/components/site/AgeGate";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getSettings } from "@/lib/content";
import { isLocale, locales, pick, t, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/links";
import { siteUrl, storeJsonLd } from "@/lib/seo";
import "./site.css";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0f0a07" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const settings = await getSettings();
  const title = pick(settings.seo.title, locale);
  const description = pick(settings.seo.description, locale);
  const image = settings.seo.image.src || settings.business.logo.src;

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: settings.business.name,
      locale: locale === "es" ? "es_MX" : "en_US",
      images: image ? [{ url: image, alt: pick(settings.seo.image.alt, locale) || title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const settings = await getSettings();
  const wa = whatsappUrl(settings, locale);
  const bannerText = settings.banner.enabled ? pick(settings.banner.text, locale) : "";

  return (
    <html lang={locale} className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd(settings, locale)).replace(/</g, "\\u003c") }}
        />
        <Header
          locale={locale}
          name={settings.business.name}
          logo={settings.business.logo.src}
          nav={settings.nav}
          banner={bannerText ? { text: bannerText, href: settings.banner.href } : null}
          address={settings.business.address}
          phone={settings.contact.phone}
          email={settings.contact.email}
        />
        {children}
        <Footer settings={settings} locale={locale} />
        {wa && <WhatsAppButton href={wa} label={t("whatsapp", locale)} />}
        {settings.legal.ageGate && (
          <AgeGate locale={locale} logo={settings.business.logo.src} name={settings.business.name} />
        )}
        <Reveal />
      </body>
    </html>
  );
}
