import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Configuración general del sitio (info del negocio, horario, SEO…).
// Un solo registro por clave; hoy solo se usa la clave "site".
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Bloques de contenido de cada página, en orden.
// `data` depende de `type` y se valida con el esquema del registro de secciones.
export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  page: text("page").notNull().default("home"),
  type: text("type").notNull(),
  position: integer("position").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Biblioteca de imágenes subidas desde el panel.
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type SectionRow = typeof sections.$inferSelect;
export type MediaRow = typeof media.$inferSelect;
