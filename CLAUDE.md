@AGENTS.md

# Viñales Cigar Shop

Ver README.md para estructura y comandos. Notas para trabajar aquí:

- Todo el contenido del sitio sale de la base de datos (tablas `settings` y `sections`); no
  escribir textos en los componentes. Los textos fijos de interfaz están en `src/lib/i18n.ts`.
- Un tipo de sección = campos en `src/lib/sections/registry.ts` + componente en
  `src/components/site/sections/`. El formulario del panel y la validación se generan de los campos.
- El sitio público es estático (`/es`, `/en`); las Server Actions del panel llaman
  `revalidatePath("/[locale]", "layout")` para regenerarlo. No usar `dynamicParams = false`
  en `[locale]`: rompe la regeneración (la página termina en 404).
- Cada Server Action del panel debe empezar con `await requireAdmin()`.
- El CSS del sitio es CSS plano portado del diseño original (`app/[locale]/site.css`);
  Tailwind solo se usa en el panel (`app/admin/admin.css`).
