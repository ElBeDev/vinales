"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc, eq, max } from "drizzle-orm";
import sharp from "sharp";
import { requireDb } from "@/db";
import { media, sections, settings } from "@/db/schema";
import { destroySession, requireAdmin } from "@/lib/auth";
import { SETTINGS_KEY } from "@/lib/content";
import { emptyObject, schemaFor } from "@/lib/fields";
import { SECTION_TYPES, isSectionType } from "@/lib/sections/registry";
import { SETTINGS_FIELDS } from "@/lib/settings";
import { removeFile, storeFile } from "@/lib/storage";

export type ActionResult = { ok: true } | { ok: false; error: string };

// Regenera el sitio público (las dos versiones de idioma).
function refreshSite() {
  revalidatePath("/[locale]", "layout");
}

function formatIssues(error: { issues: { path: PropertyKey[]; message: string }[] }) {
  const first = error.issues[0];
  return `Dato inválido en «${first.path.join(" › ")}»: ${first.message}`;
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

// ─── Secciones ───

export async function saveSection(id: number, data: unknown): Promise<ActionResult> {
  await requireAdmin();
  const db = requireDb();
  const [row] = await db.select().from(sections).where(eq(sections.id, id));
  if (!row || !isSectionType(row.type)) return { ok: false, error: "La sección no existe." };

  const parsed = schemaFor(SECTION_TYPES[row.type].fields).safeParse(data);
  if (!parsed.success) return { ok: false, error: formatIssues(parsed.error) };

  await db
    .update(sections)
    .set({ data: parsed.data, updatedAt: new Date() })
    .where(eq(sections.id, id));
  refreshSite();
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function createSection(type: string) {
  await requireAdmin();
  if (!isSectionType(type)) throw new Error("Tipo de sección desconocido");
  const db = requireDb();
  const [{ last }] = await db
    .select({ last: max(sections.position) })
    .from(sections)
    .where(eq(sections.page, "home"));

  const [created] = await db
    .insert(sections)
    .values({
      page: "home",
      type,
      position: (last ?? -1) + 1,
      // Las secciones nuevas empiezan ocultas para no publicar algo a medias.
      visible: false,
      data: emptyObject(SECTION_TYPES[type].fields),
    })
    .returning({ id: sections.id });

  redirect(`/admin/secciones/${created.id}`);
}

export async function duplicateSection(id: number) {
  await requireAdmin();
  const db = requireDb();
  const [row] = await db.select().from(sections).where(eq(sections.id, id));
  if (!row) return;
  const all = await db
    .select({ id: sections.id })
    .from(sections)
    .where(eq(sections.page, row.page))
    .orderBy(sections.position, sections.id);

  const [copy] = await db
    .insert(sections)
    .values({ page: row.page, type: row.type, visible: false, data: row.data, position: 0 })
    .returning({ id: sections.id });

  // Inserta la copia justo debajo del original
  const ids = all.map((s) => s.id);
  ids.splice(ids.indexOf(id) + 1, 0, copy.id);
  await reorder(ids);
  revalidatePath("/admin");
}

export async function deleteSection(id: number) {
  await requireAdmin();
  const db = requireDb();
  await db.delete(sections).where(eq(sections.id, id));
  refreshSite();
  revalidatePath("/admin");
}

export async function setSectionVisible(id: number, visible: boolean) {
  await requireAdmin();
  const db = requireDb();
  await db.update(sections).set({ visible }).where(eq(sections.id, id));
  refreshSite();
  revalidatePath("/admin", "layout");
}

async function reorder(ids: number[]) {
  const db = requireDb();
  await db.transaction(async (tx) => {
    for (const [position, id] of ids.entries()) {
      await tx.update(sections).set({ position }).where(eq(sections.id, id));
    }
  });
}

export async function reorderSections(ids: number[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || !ids.every(Number.isInteger)) return;
  await reorder(ids);
  refreshSite();
  revalidatePath("/admin");
}

// ─── Configuración del sitio ───

export async function saveSettings(data: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = schemaFor(SETTINGS_FIELDS).safeParse(data);
  if (!parsed.success) return { ok: false, error: formatIssues(parsed.error) };

  const db = requireDb();
  await db
    .insert(settings)
    .values({ key: SETTINGS_KEY, value: parsed.data })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: parsed.data, updatedAt: new Date() },
    });
  refreshSite();
  revalidatePath("/admin", "layout");
  return { ok: true };
}

// ─── Imágenes ───

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_WIDTH = 2400;

export type UploadResult =
  | { ok: true; media: { id: number; url: string; name: string } }
  | { ok: false; error: string };

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No se recibió ningún archivo." };
  }
  if (!IMAGE_TYPES.includes(file.type)) {
    return { ok: false, error: "Formato no soportado. Usa JPG, PNG o WebP." };
  }

  try {
    let body: Buffer = Buffer.from(await file.arrayBuffer());
    let mime = file.type;
    let name = file.name.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-").slice(0, 60) || "imagen";

    // Normaliza: gira según EXIF, limita el ancho y convierte a WebP (salvo GIF animado).
    if (mime !== "image/gif") {
      body = await sharp(body)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      mime = "image/webp";
    }
    const meta = await sharp(body).metadata();
    name = `${name}.${mime === "image/gif" ? "gif" : "webp"}`;

    const url = await storeFile(name, body, mime);
    const db = requireDb();
    const [row] = await db
      .insert(media)
      .values({ url, name, mime, size: body.length, width: meta.width, height: meta.height })
      .returning({ id: media.id, url: media.url, name: media.name });

    revalidatePath("/admin/imagenes");
    return { ok: true, media: row };
  } catch (err) {
    console.error(err);
    return { ok: false, error: err instanceof Error ? err.message : "No se pudo subir la imagen." };
  }
}

export async function listMedia() {
  await requireAdmin();
  const db = requireDb();
  return db.select().from(media).orderBy(desc(media.createdAt));
}

export async function deleteMedia(id: number) {
  await requireAdmin();
  const db = requireDb();
  const [row] = await db.delete(media).where(eq(media.id, id)).returning();
  if (row) await removeFile(row.url);
  revalidatePath("/admin/imagenes");
}
