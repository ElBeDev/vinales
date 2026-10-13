import type { Locale } from "@/lib/i18n";
import type { SectionData, SectionType } from "@/lib/sections/registry";
import type { SiteSettings } from "@/lib/settings";

export type SectionProps<K extends SectionType> = {
  data: SectionData[K];
  locale: Locale;
  settings: SiteSettings;
};

export const num = (i: number) => String(i + 1).padStart(2, "0");
export const delay = (i: number) => (i % 4 === 0 ? "" : ` d${i % 4}`);
