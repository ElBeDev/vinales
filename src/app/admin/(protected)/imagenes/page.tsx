import { desc } from "drizzle-orm";
import { requireDb } from "@/db";
import { media } from "@/db/schema";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default async function MediaPage() {
  const db = requireDb();
  const items = await db.select().from(media).orderBy(desc(media.createdAt));
  return (
    <div>
      <h1 className="text-2xl font-semibold">Imágenes</h1>
      <p className="mt-1 text-sm text-ink/60">
        Todas las fotos subidas. Se optimizan solas al subirlas (puedes subirlas directo del celular).
      </p>
      <div className="mt-6">
        <MediaLibrary items={items} />
      </div>
    </div>
  );
}
