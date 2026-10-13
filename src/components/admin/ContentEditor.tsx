"use client";

import { useEffect, useState, useTransition } from "react";
import type { Field } from "@/lib/fields";
import type { ActionResult } from "@/app/admin/(protected)/actions";
import { FieldsEditor } from "./FieldsEditor";

// Formulario completo con botón de guardar fijo abajo y aviso de cambios sin guardar.
export function ContentEditor({
  fields,
  initial,
  save,
  previewHref,
}: {
  fields: Field[];
  initial: Record<string, unknown>;
  save: (data: Record<string, unknown>) => Promise<ActionResult>;
  previewHref?: string;
}) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = value !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const onSave = () =>
    startTransition(async () => {
      const res = await save(value);
      if (res.ok) {
        setSaved(value);
        setStatus({ ok: true, text: "Guardado. El sitio ya está actualizado." });
      } else {
        setStatus({ ok: false, text: res.error });
      }
    });

  return (
    <div className="pb-24">
      <FieldsEditor
        fields={fields}
        value={value}
        onChange={(next) => {
          setValue(next);
          setStatus(null);
        }}
      />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur md:left-60">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <p className={`text-sm ${status ? (status.ok ? "text-green-700" : "text-red") : "text-ink/50"}`}>
            {status?.text ?? (dirty ? "Hay cambios sin guardar" : "Sin cambios")}
          </p>
          <div className="flex shrink-0 gap-2">
            {previewHref && (
              <a href={previewHref} target="_blank" className="btn-secondary">
                Ver en el sitio ↗
              </a>
            )}
            <button className="btn-primary" onClick={onSave} disabled={pending || !dirty}>
              {pending ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
