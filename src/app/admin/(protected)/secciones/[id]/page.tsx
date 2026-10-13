import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireDb } from "@/db";
import { sections } from "@/db/schema";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { withDefaults } from "@/lib/fields";
import { SECTION_TYPES, isSectionType } from "@/lib/sections/registry";
import { saveSection } from "../../actions";

export default async function EditSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isInteger(id)) notFound();

  const db = requireDb();
  const [row] = await db.select().from(sections).where(eq(sections.id, id));
  if (!row || !isSectionType(row.type)) notFound();

  const def = SECTION_TYPES[row.type];
  const data = withDefaults<Record<string, unknown>>(def.fields, row.data);
  const anchor = typeof data.anchor === "string" && data.anchor ? `#${data.anchor}` : "";

  return (
    <div>
      <Link href="/admin" className="text-sm text-ink/50 hover:text-ink">← Secciones</Link>
      <h1 className="mt-2 text-2xl font-semibold">{def.label}</h1>
      <p className="mt-1 text-sm text-ink/60">
        {def.description}
        {!row.visible && <span className="ml-1 font-semibold text-red">Esta sección está oculta.</span>}
      </p>
      <div className="mt-6">
        <ContentEditor
          fields={def.fields}
          initial={data}
          save={saveSection.bind(null, id)}
          previewHref={`/es${anchor}`}
        />
      </div>
    </div>
  );
}
