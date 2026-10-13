import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { sections, settings } from "@/db/schema";
import { withDefaults } from "@/lib/fields";
import {
  SECTION_TYPES,
  isSectionType,
  type Section,
} from "@/lib/sections/registry";
import { seedSections, seedSettings } from "@/lib/seed-data";
import { SETTINGS_FIELDS, type SiteSettings } from "@/lib/settings";

const SETTINGS_KEY = "site";

// Lectura de contenido para el sitio y el panel.
// Sin base de datos (o vacía) se usa el contenido inicial, así el sitio
// siempre se puede construir y ver.

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!db) return seedSettings;
  const [row] = await db
    .select()
    .from(settings)
    .where(eq(settings.key, SETTINGS_KEY));
  if (!row) return seedSettings;
  return withDefaults<SiteSettings>(SETTINGS_FIELDS, row.value);
});

export const getSections = cache(
  async (page = "home", includeHidden = false): Promise<Section[]> => {
    if (!db) return seedFallback();

    const rows = await db
      .select()
      .from(sections)
      .where(eq(sections.page, page))
      .orderBy(asc(sections.position), asc(sections.id));

    if (rows.length === 0 && page === "home") return seedFallback();

    return rows
      .filter((row) => includeHidden || row.visible)
      .filter((row) => isSectionType(row.type))
      .map(
        (row) =>
          ({
            id: row.id,
            type: row.type,
            visible: row.visible,
            data: withDefaults(
              SECTION_TYPES[row.type as keyof typeof SECTION_TYPES].fields,
              row.data,
            ),
          }) as Section,
      );
  },
);

function seedFallback(): Section[] {
  return seedSections.map(
    (s, i) => ({ id: -(i + 1), visible: true, ...s }) as Section,
  );
}

export { SETTINGS_KEY };
