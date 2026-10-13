"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { listMedia, uploadImage } from "@/app/admin/(protected)/actions";
import type { MediaRow } from "@/db/schema";
import { resizeForUpload } from "./resize";

// Sube una o varias fotos. Devuelve las URLs subidas.
export function useUploader() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const upload = (files: FileList | File[], onDone: (urls: string[]) => void) => {
    setError(null);
    startTransition(async () => {
      const urls: string[] = [];
      for (const original of Array.from(files)) {
        const file = await resizeForUpload(original);
        const fd = new FormData();
        fd.append("file", file);
        const res = await uploadImage(fd);
        if (res.ok) urls.push(res.media.url);
        else setError(res.error);
      }
      onDone(urls);
    });
  };

  return { upload, pending, error };
}

export function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const [items, setItems] = useState<MediaRow[] | null>(null);
  const { upload, pending, error } = useUploader();
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => listMedia().then(setItems);
  useEffect(() => {
    listMedia().then(setItems);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-t-2xl bg-white sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-semibold">Biblioteca de imágenes</h2>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => fileRef.current?.click()} disabled={pending}>
              {pending ? "Subiendo…" : "Subir nuevas"}
            </button>
            <button className="btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => e.target.files && upload(e.target.files, () => load())}
          />
        </div>
        {error && <p className="px-5 pt-3 text-sm text-red">{error}</p>}
        <div className="overflow-y-auto p-5">
          {items === null ? (
            <p className="text-sm text-ink/50">Cargando…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-ink/50">Todavía no hay imágenes. Sube la primera.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {items.map((m) => (
                <button
                  key={m.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-line hover:border-gold"
                  onClick={() => onPick(m.url)}
                  title={m.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
