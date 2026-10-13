import { RenderSection } from "@/components/site/sections";
import { getSections, getSettings } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  const [settings, sections] = await Promise.all([getSettings(), getSections("home")]);

  return (
    <main>
      {sections.map((section) => (
        <RenderSection key={section.id} section={section} locale={locale} settings={settings} />
      ))}
    </main>
  );
}
