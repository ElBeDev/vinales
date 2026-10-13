import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// `db` es null mientras no exista DATABASE_URL. El sitio público usa entonces
// el contenido inicial (seed); el panel de admin sí necesita la base de datos.
export const db = connectionString
  ? drizzle(postgres(connectionString, { prepare: false, max: 5 }), { schema })
  : null;

export function requireDb() {
  if (!db) throw new Error("Base de datos no configurada (DATABASE_URL)");
  return db;
}
