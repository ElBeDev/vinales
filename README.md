# Viñales Cigar Shop — sitio web + panel de admin

Sitio en Next.js 16 con contenido editable desde `/admin`: secciones (orden, visibilidad,
textos ES/EN, fotos), info del negocio, horario, redes, menú, SEO e imágenes.

## Desarrollo local

```bash
npm install
cp .env.example .env.local     # llena DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
createdb vinales               # Postgres local (o usa una base de Neon)
npm run db:setup               # crea tablas + carga el contenido inicial
npm run dev
```

- Sitio: http://localhost:3000 (redirige a `/es` o `/en` según el navegador)
- Panel: http://localhost:3000/admin

Sin `BLOB_READ_WRITE_TOKEN`, las fotos subidas en desarrollo se guardan en `public/uploads/`.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run db:generate` | Genera una migración después de cambiar `src/db/schema.ts` |
| `npm run db:migrate` | Aplica las migraciones pendientes |
| `npm run db:seed` | Carga el contenido inicial si la base está vacía (`-- --force` para reemplazarlo) |
| `npm run db:setup` | `migrate` + `seed` |

> El seed escribe directo a la base: si el sitio ya está corriendo en producción, el cambio
> se ve al siguiente deploy o al guardar cualquier cosa en el panel.

## Despliegue (Vercel)

1. Importar el repo en Vercel.
2. Agregar integraciones: **Neon** (crea `DATABASE_URL`) y **Blob** (crea `BLOB_READ_WRITE_TOKEN`).
3. Variables de entorno: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` (cadena larga
   aleatoria, p. ej. `openssl rand -hex 32`) y `NEXT_PUBLIC_SITE_URL` (dominio final).
4. Con `DATABASE_URL` de producción en `.env.local`, correr `npm run db:setup` una vez.
5. Deploy.

> Ya está hecho para producción: proyecto `vinales` en Vercel con Neon (`vinales-db`) y
> Blob (`vinales-media`). Ojo: `vercel env pull` / `vercel link` reescriben `DATABASE_URL`
> en `.env.local` con la base de **producción**; regrésalo al Postgres local después.

## Cómo está armado

```
src/
  app/[locale]/          sitio público (es | en), estático y regenerado al guardar en el panel
  app/admin/             panel: login, secciones, info del negocio, imágenes
  components/site/       diseño del sitio (una carpeta por tipo de sección en sections/)
  components/admin/      formulario genérico (FieldsEditor), lista arrastrable, biblioteca de fotos
  lib/sections/registry.ts  catálogo de tipos de sección y sus campos
  lib/settings.ts        campos de «Info del negocio»
  lib/fields.ts          descripción de campos → formulario + validación (zod)
  lib/seed-data.ts       contenido inicial (el del sitio estático original)
  db/schema.ts           tablas: settings, sections, media
```

### Agregar un tipo de sección nuevo

1. Definir sus campos en `SECTION_TYPES` y su tipo de datos en `SectionData` (`lib/sections/registry.ts`).
2. Crear el componente en `components/site/sections/` y agregarlo a `sections/index.tsx`.
3. Sus estilos van en `app/[locale]/site.css`.

El panel genera el formulario y la validación solo a partir de los campos.

### Marcado en textos

- `*palabra*` → resaltada (rojo en el hero y la frase grande, dorado en títulos)
- Enter → salto de línea; línea en blanco → párrafo nuevo (en «Texto libre»)
- En enlaces: `#seccion`, una URL completa o `wa` (abre WhatsApp con el número del negocio)
