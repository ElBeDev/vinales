// Reduce las fotos en el navegador antes de subirlas: las del celular
// pesan 3–8 MB y el servidor acepta máximo ~4 MB por petición.
const MAX = 2400;

export async function resizeForUpload(file: File): Promise<File> {
  if (file.type === "image/gif" || file.size < 600_000) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file; // formato que el navegador no puede leer: se intenta tal cual
  }
}
