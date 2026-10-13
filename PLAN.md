# Viñales Cigar Shop — Plan de rediseño + panel de admin

> Estado: **fases 1 y 2 hechas** (13-oct-2026). Ver «Avance» abajo.

## Avance

**Hecho**
- [x] Proyecto Next.js 16 + Postgres (Drizzle) + panel `/admin` — ver README.md
- [x] Diseño original migrado a componentes, idéntico visualmente; contenido actual cargado tal cual (fotos de Pexels como relleno)
- [x] `/es` y `/en` como URLs reales (redirige según idioma del navegador), hreflang, sitemap, robots, datos estructurados `Store`
- [x] Imágenes optimizadas (hero 2.6 MB → 256 KB, logo 712 KB → 74 KB, todo vía `next/image`)
- [x] Panel: secciones (arrastrar para ordenar, ocultar, duplicar, borrar, agregar de 10 tipos), editor ES/EN, subida de fotos desde el celular (se reducen y pasan a WebP solas), biblioteca de imágenes
- [x] Info del negocio editable: contacto, WhatsApp, redes, horario por día, menú, aviso superior, SEO, +18
- [x] Email/teléfono clicables, botón de WhatsApp (aparece al poner el número), mapa oscuro + «Cómo llegar», «Abierto ahora» con zona horaria de Bucerías, galería con lightbox, verificación +18, «nafta» corregido, «Scroll» traducido, galería y foto de pipas visibles en celular
- [x] Info de Facebook integrada: link en el sitio, confirmados dirección/teléfono/email, y sección nueva **«Más que una tienda» (#lugar)** sobre el espacio para socializar, con una foto real sacada del video de su página

**Pendiente de llenar (desde el panel)**: fotos reales, número de WhatsApp, Instagram, imagen 1200×630 para compartir.

**Siguiente**: aviso de privacidad, catálogo (fase 3), extras de fase 4/5, deploy.

---

## 1. Dónde estamos hoy

Hoy el sitio es **un solo `index.html`** (~1,270 líneas con el CSS y el JS dentro) + `logo.png` + `puros.png`. Se ve elegante (paleta caoba/rojo/dorado, Cinzel + Cormorant, animaciones al hacer scroll, toggle ES/EN), pero:

- Todo el contenido está escrito a mano en el HTML → cualquier cambio de texto, horario o foto implica editar código.
- El ES/EN está duplicado en atributos `data-es` / `data-en` de cada elemento → difícil de mantener y Google solo ve la versión en español.
- Es 100% estático: no hay manera de que alguien sin conocimientos técnicos lo actualice.

### Secciones actuales
1. Nav (logo, links, botón EN/ES, hamburguesa en móvil)
2. Hero (foto `puros.png`, logo, "VIÑALES", tagline, 2 botones)
3. Franja de cita + "100% Origen Cubano"
4. Puros (banner + 3 tarjetas: Robustos, Churchill/Lonsdale, Torpedos/Figurados)
5. Accesorios (texto sticky + 4 tarjetas: cortadores, encendedores, humidores, otros)
6. Pipas (foto + 3 items)
7. Galería (3 fotos)
8. Experiencia (cita grande + CTA)
9. Contacto (ubicación, horario, contacto)
10. Footer

---

## 2. Problemas y detalles que encontré

### Hay que corregir sí o sí
| # | Problema | Por qué importa |
|---|---|---|
| 1 | **Las fotos son de Pexels enlazadas directamente** (hotlink), no son de la tienda | Si Pexels cambia la URL se rompen; además no muestran *tu* tienda ni *tus* productos. Es lo que más resta credibilidad. |
| 2 | **`puros.png` pesa 2.6 MB y `logo.png` 712 KB** | El hero tarda en cargar, sobre todo en celular con datos. Deberían pesar ~150 KB y ~30 KB (WebP/AVIF). |
| 3 | **`og:image` usa ruta relativa (`logo.png`)** | WhatsApp/Facebook necesitan URL absoluta; hoy al compartir el link probablemente no sale imagen. Además debería ser una imagen 1200×630, no el logo cuadrado. |
| 4 | **El email y el teléfono no son clicables** | En celular el cliente quiere tocar y llamar / escribir. Faltan `tel:` y `mailto:`. |
| 5 | **No hay botón de WhatsApp** | En México (y con turistas) es EL canal de contacto. |
| 6 | **No hay mapa ni link a Google Maps** | La dirección está en texto plano; el turista en Bucerías quiere "cómo llego". |
| 7 | **El teléfono es lada 982 (Campeche)** pero la tienda está en Bucerías, Nayarit (lada 329) | Puede estar bien si es celular, pero vale la pena confirmar. |
| 8 | **"Sin nafta"** en encendedores | "Nafta" es argentino; en México se entiende raro. Mejor "sin gas de mechero" / "sin sabores a combustible". |
| 9 | **"Scroll"** del hero no se traduce, y el idioma elegido no se recuerda al recargar | Detalle de pulido. |
| 10 | **No hay aviso de privacidad** | En México es obligatorio si recolectas datos (LFPDPPP), y lo vamos a necesitar en cuanto haya formulario. |
| 11 | **No hay verificación de edad (+18)** | Es una tienda de tabaco; un age-gate sencillo es casi obligatorio y protege el negocio. |
| 12 | El footer no tiene link a "Visítanos" ni a redes | — |

### ⚠️ Ojo legal (verificar con un abogado/contador)
Desde 2023 la **Ley General para el Control del Tabaco** en México es muy restrictiva con la publicidad, promoción y exhibición de productos de tabaco. Antes de meter **precios, catálogo con "comprar", promociones o venta en línea**, conviene confirmar qué se puede publicar. Por eso en este plan el catálogo es **informativo** (qué manejamos, marcas, vitolas) y la venta sigue siendo **en tienda / por WhatsApp**. Si resulta que sí se puede más, el panel lo soporta igual.

---

## 3. Qué le falta para que quede chingona

### Contenido que vende
- **Fotos reales de la tienda**: fachada, vitrina/humidor, mostrador, el lounge si hay, las manos cortando un puro. Esto solo cambia el sitio más que cualquier efecto. *(Lo más importante de toda la lista.)*
- **Marcas que manejan** (Cohiba, Montecristo, Partagás, Romeo y Julieta, H. Upmann, Bolívar, Trinidad…) como carrusel/marquee de logos o nombres.
- **Catálogo de puros** por marca y vitola, con ficha: foto, medidas (largo × cepo), fortaleza (suave → fuerte con barra visual), notas de sabor, duración aproximada de fumada.
- **"Encuentra tu puro"**: mini-quiz de 3 preguntas (¿primera vez?, ¿cuánto tiempo tienes?, ¿suave o intenso?) → recomienda 2-3 vitolas. Muy bueno para el turista que no sabe qué pedir.
- **Guía de vitolas** visual: siluetas a escala (Robusto, Corona, Churchill, Torpedo…).
- **Cómo reconocer un habano auténtico** (sello de garantía, holograma de Habanos S.A., anillas). Genera confianza y posiciona en Google contra falsificaciones.
- **Reseñas / testimonios** (idealmente jalando las de Google).
- **Eventos / catas / maridajes** (si hacen o planean hacer).
- **Sección "Nosotros"**: la historia, por qué "Viñales", quién atiende (Laura). La gente le compra a personas.
- **FAQ para turistas**: ¿aceptan USD / tarjeta?, ¿envían?, ¿puedo llevarlos en el avión? (cuidado: la respuesta depende del país de destino, ej. EE.UU. no permite importar puros cubanos).

### Conversión / contacto
- **Botón flotante de WhatsApp** con mensaje prellenado ("Hola, vi su página y quiero información sobre…").
- **Mapa embebido** + botón "Cómo llegar" (Google Maps / Waze).
- **Indicador "Abierto ahora / Cerrado"** calculado con el horario.
- **Links a Instagram / Facebook / Google Business**.
- **Formulario de contacto** simple (nombre, mensaje, WhatsApp) que llega por email y se guarda en el panel.

### Diseño / experiencia
- **Hero con video corto en loop** (humo, encendido de un puro, la vitrina) con la foto como respaldo.
- Textura sutil de madera de cedro / papel de anilla en fondos; detalles dorados tipo anilla de habano en separadores.
- **Humo animado** muy sutil en el hero (canvas/CSS, que no distraiga ni pese).
- Galería real con **lightbox** (tocar y ver grande, deslizar).
- Microinteracciones: contadores animados, hover con "brasa" en tarjetas, transición de página.
- Tipografías se quedan (están bien elegidas), pero cargar solo los pesos que se usan.

### Técnico / SEO
- Imágenes optimizadas automáticamente (WebP/AVIF, tamaños responsivos, lazy load).
- **Versiones `/es` y `/en` reales** (URLs separadas) → Google indexa ambas; muy importante porque el público de Bucerías es mitad turista.
- **Schema.org `LocalBusiness`/`Store`** (dirección, horario, teléfono) → aparece mejor en Google y Maps.
- `sitemap.xml`, `robots.txt`, imagen OG generada 1200×630.
- Analytics simple (Vercel Analytics o Plausible) para saber cuántos dan clic en WhatsApp / "Cómo llegar".
- Lighthouse 90+ en móvil.

---

## 4. El panel de admin ("un WordPress, pero así nomás")

### Qué se podrá editar desde el panel
| Módulo | Qué incluye |
|---|---|
| **Secciones de la página** | Ver la lista de secciones de la home, **reordenarlas arrastrando**, **ocultar/mostrar**, **agregar nuevas** de un catálogo de tipos y **eliminar**. Cada sección tiene su formulario. |
| **Textos** | Todo texto en **dos campos: ES / EN** lado a lado. Si EN está vacío se muestra el ES (para no dejar huecos). |
| **Imágenes** | Subir arrastrando desde el celular o la compu. Se optimizan solas. Biblioteca de medios para reutilizar fotos. Campo de texto alternativo. |
| **Productos / catálogo** | Categorías (Puros, Accesorios, Pipas…), productos con foto, marca, vitola, medidas, fortaleza, notas, destacado sí/no, visible sí/no. |
| **Galería** | Agregar/quitar/reordenar fotos con su pie. |
| **Info del negocio** | Nombre, dirección, coordenadas del mapa, teléfono, WhatsApp, email, redes, **horario por día** (con días cerrados y horarios especiales/festivos). Se usa en todo el sitio automáticamente. |
| **Testimonios** | Nombre, texto ES/EN, estrellas, visible sí/no. |
| **Eventos** (opcional) | Título, fecha, foto, descripción. Se ocultan solos cuando pasan. |
| **Aviso / banner** | Barra superior opcional ("Cerrado el 25 de dic", "Nueva llegada de Cohiba"). |
| **SEO** | Título y descripción por idioma, imagen para compartir. |
| **Mensajes** | Bandeja de los formularios de contacto recibidos. |
| **Usuarios** | 1–3 cuentas de admin con contraseña propia. |

### Cómo funcionan las "secciones" (la parte tipo WordPress)
La home deja de ser HTML fijo y pasa a ser **una lista ordenada de bloques** guardada en la base de datos. Cada bloque tiene un **tipo** y sus **datos**:

```
Home
 ├─ [hero]          foto/video, título, tagline ES/EN, botones
 ├─ [cita]          frase ES/EN, número destacado
 ├─ [catálogo]      categoría "Puros", estilo tarjetas, mostrar destacados
 ├─ [lista+foto]    "Accesorios", foto a la izquierda/derecha, items
 ├─ [galería]       fotos seleccionadas
 ├─ [testimonios]   automáticos desde el módulo
 ├─ [cta]           frase grande + botón
 ├─ [contacto+mapa] automático desde "Info del negocio"
 └─ ...
```

Tipos de bloque iniciales (cubren todo lo actual + lo nuevo):
`hero`, `cita`, `catálogo`, `tarjetas`, `lista+foto`, `galería`, `marcas`, `testimonios`, `cta`, `texto libre`, `faq`, `eventos`, `contacto+mapa`, `encuentra-tu-puro`.

El diseño de cada tipo lo controlamos nosotros (así nunca se "rompe" la estética como pasa en WordPress), y el admin solo llena contenido y decide orden/visibilidad. Es el balance correcto entre flexibilidad y que siempre se vea chingón.

### Experiencia del panel
- Funciona bien **desde el celular** (para que quien atiende la tienda suba una foto ahí mismo).
- Botón **"Ver cambios"** (vista previa) antes de publicar.
- Al guardar, el sitio público se actualiza en segundos (sin redeploy).
- Historial simple: poder deshacer el último cambio de una sección (fase 2).

---

## 5. Stack propuesto

Mismo stack que **The Blvck Stone** y **Tequis Mágico**, para reutilizar lo que ya funciona (login de admin, subida de imágenes, configuración, i18n):

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Next.js 16** (App Router) + TypeScript | Sitio rápido, SEO, y el admin vive en el mismo proyecto (`/admin`). |
| Estilos | **Tailwind 4** + las variables de color actuales | Conservamos la identidad visual. |
| Base de datos | **Postgres (Neon)** + **Drizzle ORM** | Ya lo usas; barato/gratis para este tamaño. |
| Imágenes | **Vercel Blob** + `next/image` | Subida directa desde el panel, optimización automática. |
| Idiomas | **next-intl** con rutas `/es` y `/en` | SEO real en ambos idiomas. |
| Auth admin | Sesión con cookie firmada (reutilizar `src/lib/auth.ts` de Blvck Stone) | Simple y suficiente. |
| Animaciones | `motion` | Igual que Blvck Stone. |
| Hosting | **Vercel** (o Hostinger Node si el dominio ya vive ahí) | Deploy automático desde GitHub. |

**Alternativa considerada:** Payload CMS (admin "tipo WordPress" ya hecho, corre dentro de Next.js). Da más cosas gratis (historial, roles, editor rico), pero es una dependencia pesada para un sitio de una página y el panel se siente menos "a la medida". **Recomiendo el panel propio** porque ya tienes el patrón armado en tus otros proyectos y el alcance es chico.

### Modelo de datos (borrador)
```
settings        (clave/valor: nombre, dirección, teléfono, whatsapp, redes, seo…)
hours           (día, abre, cierra, cerrado)  + special_hours (fecha, …)
sections        (id, page, type, position, visible, data JSONB)
media           (id, url, alt_es, alt_en, ancho, alto)
categories      (id, slug, nombre_es, nombre_en, position)
products        (id, category_id, marca, nombre, vitola, largo, cepo,
                 fortaleza, notas_es, notas_en, image_id, destacado, visible, position)
testimonials    (id, autor, texto_es, texto_en, estrellas, visible)
events          (id, fecha, titulo_es, titulo_en, desc_es, desc_en, image_id)
messages        (id, nombre, contacto, mensaje, leído, creado)
admin_users     (id, usuario, password_hash)
```
`sections.data` se valida con un esquema (zod) distinto por tipo de bloque.

---

## 6. Fases

| Fase | Entregable | Resultado |
|---|---|---|
| **0. Insumos** | Fotos reales, logo en alta (ideal vector/PNG transparente), lista de marcas, redes, WhatsApp, confirmar teléfono y dominio | Sin esto el rediseño se queda a medias |
| **1. Base** | Proyecto Next.js, migrar el diseño actual a componentes, ES/EN con rutas, imágenes optimizadas, arreglar los 12 problemas de la sección 2 | El sitio se ve igual o mejor, pero ya es dinámico |
| **2. Panel v1** | Login, Info del negocio + horario, editor de secciones (orden/visible/editar), subida de imágenes, galería, SEO | Ya se puede cambiar todo sin tocar código |
| **3. Catálogo** | Categorías y productos, fichas con fortaleza/medidas, bloque catálogo, marcas | El sitio muestra lo que realmente venden |
| **4. Lo chingón** | WhatsApp flotante, mapa, "abierto ahora", hero en video, humo, lightbox, "encuentra tu puro", testimonios, age-gate, aviso de privacidad | Diferenciación real |
| **5. Extras** | Formulario + bandeja de mensajes, eventos, banner de avisos, historial de cambios, analytics | Pulido y operación |

Cada fase se puede publicar por separado; el sitio nunca queda "en obra".

---

## 7. Preguntas para ti antes de arrancar

1. **¿Tienen fotos reales** de la tienda y productos, o hay que planear una sesión de fotos?
2. **¿Venta en línea o solo catálogo informativo** + WhatsApp? (ver la nota legal arriba)
3. **¿Mostrar precios?**
4. **¿Dominio y hosting?** ¿Ya existe `vinales-cigars.com`? ¿Vercel o Hostinger?
5. **¿Quién va a usar el panel?** (¿tú, Laura, alguien de la tienda?) — define qué tan simple tiene que ser.
6. **¿Tienen lounge / área para fumar ahí mismo?** Si sí, es una sección fuerte.
7. **¿Hacen o quieren hacer catas/eventos?**
8. **Redes sociales y número de WhatsApp** a usar.
9. ¿Más páginas aparte de la home (Nosotros, Catálogo completo, Blog/Guías) o todo en una sola página larga?
