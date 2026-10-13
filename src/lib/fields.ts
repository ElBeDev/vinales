import { z } from "zod";

// Descripción declarativa de un formulario. A partir de ella se generan:
//  - el formulario del panel de admin (components/admin/FieldsEditor),
//  - el esquema de validación (schemaFor),
//  - los valores vacíos para un elemento nuevo (emptyValue).

type Base = { key: string; label: string; help?: string };

export type Field =
  | (Base & { kind: "text"; placeholder?: string })
  | (Base & { kind: "i18n"; multiline?: boolean; rich?: boolean })
  | (Base & { kind: "image" })
  | (Base & { kind: "bool" })
  | (Base & { kind: "select"; options: { value: string; label: string }[] })
  | (Base & { kind: "group"; fields: Field[] })
  | (Base & {
      kind: "list";
      fields: Field[];
      itemLabel: string;
      // Campo usado como título de cada elemento en la lista colapsada
      summaryKey?: string;
    })
  | (Base & { kind: "hours" });

export type ImageValue = { src: string; alt: { es: string; en: string } };

export type HoursValue = {
  day: number; // 0 = domingo
  closed: boolean;
  open: string; // "12:00"
  close: string; // "20:00"
}[];

const localized = z.object({ es: z.string(), en: z.string() });

const imageSchema = z.object({ src: z.string(), alt: localized });

const hoursSchema = z
  .array(
    z.object({
      day: z.number().int().min(0).max(6),
      closed: z.boolean(),
      open: z.string().regex(/^\d{2}:\d{2}$|^$/),
      close: z.string().regex(/^\d{2}:\d{2}$|^$/),
    }),
  )
  .length(7);

function fieldSchema(field: Field): z.ZodType {
  switch (field.kind) {
    case "text":
      return z.string();
    case "i18n":
      return localized;
    case "image":
      return imageSchema;
    case "bool":
      return z.boolean();
    case "select":
      return z.enum(field.options.map((o) => o.value) as [string, ...string[]]);
    case "group":
      return schemaFor(field.fields);
    case "list":
      return z.array(schemaFor(field.fields));
    case "hours":
      return hoursSchema;
  }
}

export function schemaFor(fields: Field[]) {
  return z.object(
    Object.fromEntries(fields.map((f) => [f.key, fieldSchema(f)])),
  );
}

export function emptyValue(field: Field): unknown {
  switch (field.kind) {
    case "text":
      return "";
    case "i18n":
      return { es: "", en: "" };
    case "image":
      return { src: "", alt: { es: "", en: "" } };
    case "bool":
      return false;
    case "select":
      return field.options[0]?.value ?? "";
    case "group":
      return emptyObject(field.fields);
    case "list":
      return [];
    case "hours":
      return [0, 1, 2, 3, 4, 5, 6].map((day) => ({
        day,
        closed: false,
        open: "12:00",
        close: "20:00",
      }));
  }
}

export function emptyObject(fields: Field[]): Record<string, unknown> {
  return Object.fromEntries(fields.map((f) => [f.key, emptyValue(f)]));
}

// Completa con valores vacíos los campos que no existan en `data`
// (útil cuando se agrega un campo nuevo a un tipo de sección ya guardado).
export function withDefaults<T>(fields: Field[], data: unknown): T {
  const source = (data && typeof data === "object" ? data : {}) as Record<
    string,
    unknown
  >;
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const value = source[f.key];
    if (value === undefined) {
      out[f.key] = emptyValue(f);
    } else if (f.kind === "group") {
      out[f.key] = withDefaults(f.fields, value);
    } else if (f.kind === "list" && Array.isArray(value)) {
      out[f.key] = value.map((item) => withDefaults(f.fields, item));
    } else {
      out[f.key] = value;
    }
  }
  return out as T;
}
