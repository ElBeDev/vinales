import { asc, eq } from "drizzle-orm";
import { requireDb } from "@/db";
import { sections } from "@/db/schema";
import { SectionList, type SectionSummary } from "@/components/admin/SectionList";
import { SECTION_TYPES, isSectionType } from "@/lib/sections/registry";
import { createSection } from "./actions";

function summaryOf(data: unknown) {
  const d = (data ?? {}) as Record<string, { es?: string } | undefined> & {
    items?: { title?: { es?: string } }[];
  };
  const firstItem = Array.isArray(d.items) ? d.items[0]?.title?.es : "";
  const text = d.title?.es || d.quote?.es || d.eyebrow?.es || firstItem || "";
  return text.replace(/\*/g, "").replace(/\n/g, " ").slice(0, 90);
}

export default async function SectionsPage() {
  const db = requireDb();
  const rows = await db
    .select()
    .from(sections)
    .where(eq(sections.page, "home"))
    .orderBy(asc(sections.position), asc(sections.id));

  const list: SectionSummary[] = rows.map((r) => ({
    id: r.id,
    type: r.type,
    typeLabel: isSectionType(r.type) ? SECTION_TYPES[r.type].label : r.type,
    summary: r.type === "contact" ? "Ubicación, horario y contacto" : summaryOf(r.data),
    visible: r.visible,
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Secciones de la página</h1>
      <p className="mt-1 text-sm text-ink/60">
        Arrastra para cambiar el orden. Toca una sección para editarla. Las ocultas no aparecen en el sitio.
      </p>

      <div className="mt-6">
        {list.length === 0 ? (
          <p className="card p-6 text-sm text-ink/60">
            No hay secciones. Agrega una abajo o carga el contenido inicial con <code>npm run db:seed</code>.
          </p>
        ) : (
          <SectionList sections={list} />
        )}
      </div>

      <div className="card mt-8 p-5">
        <h2 className="font-semibold">Agregar sección</h2>
        <p className="mt-1 text-sm text-ink/60">Se agrega al final y oculta, para que la llenes antes de publicarla.</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {Object.entries(SECTION_TYPES).map(([type, def]) => (
            <form key={type} action={createSection.bind(null, type)}>
              <button className="w-full rounded-lg border border-line p-3 text-left hover:border-gold hover:bg-paper">
                <span className="block text-sm font-semibold">{def.label}</span>
                <span className="block text-xs text-ink/55">{def.description}</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
