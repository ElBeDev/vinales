// Carga el contenido inicial (el del sitio original) en la base de datos.
//   npm run db:seed           → solo si está vacía
//   npm run db:seed -- --force → borra secciones y configuración y vuelve a cargar
import { config } from "dotenv";

config({ path: [".env.local", ".env"], quiet: true });

async function main() {
  const { requireDb } = await import("../src/db");
  const { sections, settings } = await import("../src/db/schema");
  const { seedSections, seedSettings } = await import("../src/lib/seed-data");
  const { SETTINGS_KEY } = await import("../src/lib/content");

  const db = requireDb();
  const force = process.argv.includes("--force");

  const existing = await db.select({ id: sections.id }).from(sections).limit(1);
  if (existing.length > 0 && !force) {
    console.log("La base ya tiene contenido. Usa --force para reemplazarlo.");
    process.exit(0);
  }

  await db.transaction(async (tx) => {
    await tx.delete(sections);
    await tx.delete(settings);
    await tx.insert(settings).values({ key: SETTINGS_KEY, value: seedSettings });
    await tx.insert(sections).values(
      seedSections.map((s, i) => ({ page: "home", type: s.type, position: i, data: s.data })),
    );
  });

  console.log(`Listo: ${seedSections.length} secciones y la configuración del sitio.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
