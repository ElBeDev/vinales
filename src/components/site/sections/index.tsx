import type { Locale } from "@/lib/i18n";
import type { Section } from "@/lib/sections/registry";
import type { SiteSettings } from "@/lib/settings";
import { Cards } from "./Cards";
import { Contact } from "./Contact";
import { Faq } from "./Faq";
import { Features } from "./Features";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Quote } from "./Quote";
import { Split } from "./Split";
import { Statement } from "./Statement";
import { TextBlock } from "./TextBlock";

export function RenderSection({
  section,
  locale,
  settings,
}: {
  section: Section;
  locale: Locale;
  settings: SiteSettings;
}) {
  const common = { locale, settings };
  switch (section.type) {
    case "hero":
      return <Hero data={section.data} {...common} />;
    case "marquee":
      return <Marquee data={section.data} locale={locale} />;
    case "quote":
      return <Quote data={section.data} {...common} />;
    case "cards":
      return <Cards data={section.data} {...common} />;
    case "features":
      return <Features data={section.data} {...common} />;
    case "split":
      return <Split data={section.data} {...common} />;
    case "gallery":
      return <Gallery data={section.data} locale={locale} />;
    case "statement":
      return <Statement data={section.data} {...common} />;
    case "text":
      return <TextBlock data={section.data} {...common} />;
    case "faq":
      return <Faq data={section.data} {...common} />;
    case "contact":
      return <Contact data={section.data} {...common} />;
  }
}
