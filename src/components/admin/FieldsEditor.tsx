"use client";

import { useRef, useState } from "react";
import { emptyObject, type Field, type HoursValue, type ImageValue } from "@/lib/fields";
import type { Localized } from "@/lib/i18n";
import { MediaPicker, useUploader } from "./MediaPicker";

type Obj = Record<string, unknown>;

export function FieldsEditor({
  fields,
  value,
  onChange,
}: {
  fields: Field[];
  value: Obj;
  onChange: (next: Obj) => void;
}) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FieldInput
          key={field.key}
          field={field}
          value={value[field.key]}
          onChange={(v) => onChange({ ...value, [field.key]: v })}
        />
      ))}
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const help = field.help && <p className="help">{field.help}</p>;

  switch (field.kind) {
    case "text":
      return (
        <div>
          <label className="label">{field.label}</label>
          <input
            className="input"
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
          {help}
        </div>
      );

    case "i18n":
      return <I18nInput field={field} value={value as Localized} onChange={onChange} />;

    case "image":
      return (
        <div>
          <label className="label">{field.label}</label>
          <ImageInput value={value as ImageValue} onChange={onChange} />
          {help}
        </div>
      );

    case "bool":
      return (
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5 accent-[#b8860b]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm font-medium">{field.label}</span>
        </label>
      );

    case "select":
      return (
        <div>
          <label className="label">{field.label}</label>
          <select className="input" value={String(value)} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {help}
        </div>
      );

    case "group":
      return (
        <fieldset className="rounded-xl border border-line bg-paper/50 p-4">
          <legend className="px-1 text-sm font-semibold">{field.label}</legend>
          {field.help && <p className="help -mt-1 mb-3">{field.help}</p>}
          <FieldsEditor fields={field.fields} value={(value ?? {}) as Obj} onChange={onChange} />
        </fieldset>
      );

    case "list":
      return <ListInput field={field} value={(value ?? []) as Obj[]} onChange={onChange} />;

    case "hours":
      return <HoursInput label={field.label} value={value as HoursValue} onChange={onChange} />;
  }
}

function I18nInput({
  field,
  value,
  onChange,
}: {
  field: Extract<Field, { kind: "i18n" }>;
  value: Localized;
  onChange: (v: Localized) => void;
}) {
  const v = value ?? { es: "", en: "" };
  const multiline = field.multiline || field.rich;
  return (
    <div>
      <label className="label">{field.label}</label>
      <div className="grid gap-2 sm:grid-cols-2">
        {(["es", "en"] as const).map((lang) => (
          <div key={lang} className="relative">
            <span className="pointer-events-none absolute top-2 right-2 rounded bg-paper px-1.5 text-[10px] font-bold text-ink/40">
              {lang.toUpperCase()}
            </span>
            {multiline ? (
              <textarea
                className={`input resize-y pr-10 ${field.multiline ? "min-h-24" : ""}`}
                value={v[lang]}
                rows={field.multiline ? 4 : 2}
                placeholder={lang === "en" ? "(si se deja vacío se usa el español)" : undefined}
                onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              />
            ) : (
              <input
                className="input pr-10"
                value={v[lang]}
                placeholder={lang === "en" ? "(si se deja vacío se usa el español)" : undefined}
                onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
      {field.help && <p className="help">{field.help}</p>}
    </div>
  );
}

function ImageInput({ value, onChange }: { value: ImageValue; onChange: (v: ImageValue) => void }) {
  const v = value ?? { src: "", alt: { es: "", en: "" } };
  const [picking, setPicking] = useState(false);
  const [showAlt, setShowAlt] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { upload, pending, error } = useUploader();

  return (
    <div className="rounded-xl border border-line bg-white p-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-paper sm:w-44">
          {v.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.src} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-ink/40">Sin imagen</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary" disabled={pending} onClick={() => fileRef.current?.click()}>
              {pending ? "Subiendo…" : "Subir foto"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setPicking(true)}>
              Biblioteca
            </button>
            {v.src && (
              <button type="button" className="btn-secondary" onClick={() => onChange({ ...v, src: "" })}>
                Quitar
              </button>
            )}
          </div>
          <input
            className="input text-xs"
            value={v.src}
            placeholder="…o pega la URL de una imagen"
            onChange={(e) => onChange({ ...v, src: e.target.value.trim() })}
          />
          <button type="button" className="text-xs font-semibold text-gold" onClick={() => setShowAlt((s) => !s)}>
            {showAlt ? "Ocultar" : "Descripción para Google / accesibilidad"}
          </button>
          {showAlt && (
            <div className="grid gap-2 sm:grid-cols-2">
              {(["es", "en"] as const).map((lang) => (
                <input
                  key={lang}
                  className="input text-xs"
                  placeholder={`Qué se ve en la foto (${lang.toUpperCase()})`}
                  value={v.alt[lang]}
                  onChange={(e) => onChange({ ...v, alt: { ...v.alt, [lang]: e.target.value } })}
                />
              ))}
            </div>
          )}
          {error && <p className="text-xs text-red">{error}</p>}
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files?.length) upload(e.target.files, ([url]) => url && onChange({ ...v, src: url }));
          e.target.value = "";
        }}
      />
      {picking && (
        <MediaPicker
          onClose={() => setPicking(false)}
          onPick={(url) => {
            onChange({ ...v, src: url });
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

function summarize(item: Obj, key?: string) {
  if (!key) return "";
  const raw = item[key];
  const text = typeof raw === "string" ? raw : (raw as Localized | undefined)?.es ?? "";
  return text.replace(/\*/g, "").replace(/\n/g, " ");
}

function ListInput({
  field,
  value,
  onChange,
}: {
  field: Extract<Field, { kind: "list" }>;
  value: Obj[];
  onChange: (v: Obj[]) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const update = (i: number, item: Obj) => onChange(value.map((x, j) => (j === i ? item : x)));
  const move = (i: number, dir: -1 | 1) => {
    const next = [...value];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange(next);
    if (openIndex === i) setOpenIndex(i + dir);
  };
  const remove = (i: number) => {
    if (!confirm(`¿Quitar este ${field.itemLabel.toLowerCase()}?`)) return;
    onChange(value.filter((_, j) => j !== i));
    setOpenIndex(null);
  };
  const add = () => {
    onChange([...value, emptyObject(field.fields)]);
    setOpenIndex(value.length);
  };

  return (
    <div>
      <label className="label">{field.label}</label>
      {field.help && <p className="help -mt-0.5 mb-2">{field.help}</p>}
      <div className="space-y-2">
        {value.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="rounded-xl border border-line bg-white">
              <div className="flex items-center gap-2 p-2 pl-3">
                <button
                  type="button"
                  className="min-w-0 flex-1 truncate text-left text-sm"
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span className="mr-2 text-xs font-semibold text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  {summarize(item, field.summaryKey) || `${field.itemLabel} sin título`}
                </button>
                <button type="button" className="btn-icon" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Subir">↑</button>
                <button type="button" className="btn-icon" disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Bajar">↓</button>
                <button type="button" className="btn-icon hover:border-red hover:text-red" onClick={() => remove(i)} aria-label="Quitar">✕</button>
                <button type="button" className="btn-icon" onClick={() => setOpenIndex(open ? null : i)} aria-label={open ? "Cerrar" : "Editar"}>
                  {open ? "−" : "✎"}
                </button>
              </div>
              {open && (
                <div className="border-t border-line p-4">
                  <FieldsEditor fields={field.fields} value={item} onChange={(next) => update(i, next)} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" className="btn-secondary mt-2" onClick={add}>
        + Agregar {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function HoursInput({ label, value, onChange }: { label: string; value: HoursValue; onChange: (v: HoursValue) => void }) {
  const week = [1, 2, 3, 4, 5, 6, 0];
  const set = (day: number, patch: Partial<HoursValue[number]>) =>
    onChange(value.map((h) => (h.day === day ? { ...h, ...patch } : h)));

  return (
    <fieldset className="rounded-xl border border-line bg-paper/50 p-4">
      <legend className="px-1 text-sm font-semibold">{label}</legend>
      <div className="space-y-2">
        {week.map((day) => {
          const h = value.find((x) => x.day === day);
          if (!h) return null;
          return (
            <div key={day} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="w-24 text-sm font-medium">{DAYS[day]}</span>
              <label className="flex items-center gap-1.5 text-xs">
                <input type="checkbox" className="accent-[#b8860b]" checked={h.closed} onChange={(e) => set(day, { closed: e.target.checked })} />
                Cerrado
              </label>
              {!h.closed && (
                <div className="flex items-center gap-2">
                  <input type="time" className="input w-auto py-1" value={h.open} onChange={(e) => set(day, { open: e.target.value })} />
                  <span className="text-xs text-ink/50">a</span>
                  <input type="time" className="input w-auto py-1" value={h.close} onChange={(e) => set(day, { close: e.target.value })} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
