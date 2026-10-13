"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deleteMedia } from "@/app/admin/(protected)/actions";
import type { MediaRow } from "@/db/schema";
import { useUploader } from "./MediaPicker";

const kb = (n: number) => (n > 1_000_000 ? `${(n / 1_000_000).toFixed(1)} MB` : `${Math.round(n / 1000)} KB`);

export function MediaLibrary({ items }: { items: MediaRow[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, pending, error } = useUploader();
  const [dragging, setDragging] = useState(false);
  const [, startTransition] = useTransition();
  const [copied, setCopied] = useState<number | null>(null);

  const onFiles = (files: FileList) => upload(files, () => router.refresh());

  return (
    <div>
      <div
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
          dragging ? "border-gold bg-gold/5" : "border-line bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-ink/60">Arrastra fotos aquí o</p>
        <button className="btn-primary mt-3" onClick={() => fileRef.current?.click()} disabled={pending}>
          {pending ? "Subiendo…" : "Elegir fotos"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && onFiles(e.target.files)} />
        {error && <p className="mt-3 text-sm text-red">{error}</p>}
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink/50">Todavía no hay imágenes.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <div key={m.id} className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.name} className="aspect-square w-full object-cover" loading="lazy" />
              <div className="p-2">
                <p className="truncate text-xs font-medium" title={m.name}>{m.name}</p>
                <p className="text-[11px] text-ink/50">
                  {m.width && m.height ? `${m.width}×${m.height} · ` : ""}
                  {kb(m.size)}
                </p>
                <div className="mt-2 flex gap-1">
                  <button
                    className="btn-secondary flex-1 px-2 py-1 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(new URL(m.url, location.origin).href);
                      setCopied(m.id);
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {copied === m.id ? "¡Copiada!" : "Copiar URL"}
                  </button>
                  <button
                    className="btn-danger px-2 py-1 text-xs"
                    onClick={() => {
                      if (confirm("¿Borrar esta imagen? Si se usa en alguna sección dejará de verse.")) {
                        startTransition(async () => {
                          await deleteMedia(m.id);
                          router.refresh();
                        });
                      }
                    }}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
