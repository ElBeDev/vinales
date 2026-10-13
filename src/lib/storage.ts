import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Con BLOB_READ_WRITE_TOKEN las imágenes van a Vercel Blob.
// Sin token (desarrollo local) se guardan en public/uploads.
const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function storeFile(name: string, body: Buffer, contentType: string) {
  if (blobEnabled()) {
    const blob = await put(`media/${name}`, body, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });
    return blob.url;
  }

  if (process.env.VERCEL) {
    throw new Error("Falta configurar BLOB_READ_WRITE_TOKEN para subir imágenes.");
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const filename = `${Date.now()}-${name}`;
  await writeFile(path.join(dir, filename), body);
  return `/uploads/${filename}`;
}

export async function removeFile(url: string) {
  if (url.startsWith("/uploads/")) {
    await unlink(path.join(process.cwd(), "public", url)).catch(() => {});
  } else if (blobEnabled() && url.includes(".blob.vercel-storage.com")) {
    await del(url).catch(() => {});
  }
}
