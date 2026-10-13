import type { Field, ImageValue } from "@/lib/fields";
import type { Localized } from "@/lib/i18n";

// Catálogo de tipos de sección. Cada tipo define su formulario (fields);
// el diseño lo pone el componente correspondiente en components/site/sections.

export const ICONS = [
  { value: "none", label: "Sin ícono" },
  { value: "cigar", label: "Puro corto" },
  { value: "cigar-long", label: "Puro largo" },
  { value: "torpedo", label: "Torpedo" },
  { value: "cutter", label: "Cortador" },
  { value: "flame", label: "Flama" },
  { value: "humidor", label: "Humidor" },
  { value: "sun", label: "Accesorio" },
] as const;

export type IconName = (typeof ICONS)[number]["value"];

const RICH_HELP =
  "Encierra palabras entre *asteriscos* para resaltarlas. Enter = salto de línea.";

const anchor: Field = {
  kind: "text",
  key: "anchor",
  label: "ID para enlazar desde el menú",
  help: "Sin espacios ni acentos, ej. puros. El menú enlaza a #puros.",
  placeholder: "puros",
};

const eyebrow: Field = {
  kind: "i18n",
  key: "eyebrow",
  label: "Etiqueta pequeña (arriba del título)",
};

const title: Field = {
  kind: "i18n",
  key: "title",
  label: "Título",
  rich: true,
  help: RICH_HELP,
};

const text: Field = {
  kind: "i18n",
  key: "text",
  label: "Texto",
  multiline: true,
};

const button: Field = {
  kind: "group",
  key: "button",
  label: "Botón",
  help: "Deja el texto vacío para ocultarlo.",
  fields: [
    { kind: "i18n", key: "label", label: "Texto del botón" },
    {
      kind: "text",
      key: "href",
      label: "Enlace",
      placeholder: "#contacto",
      help: "#seccion, una URL completa o wa (abre WhatsApp)",
    },
  ],
};

export const SECTION_TYPES = {
  hero: {
    label: "Portada (hero)",
    description: "Pantalla completa con foto o video de fondo, logo, título y botones.",
    fields: [
      { kind: "image", key: "image", label: "Foto de fondo" },
      {
        kind: "text",
        key: "video",
        label: "Video de fondo (opcional)",
        help: "URL de un .mp4 corto y ligero. Si hay video se usa la foto como portada mientras carga.",
      },
      { kind: "bool", key: "showLogo", label: "Mostrar logo" },
      eyebrow,
      { ...title, help: "Ej. VI*Ñ*ALES resalta la Ñ en rojo." },
      {
        kind: "i18n",
        key: "tagline",
        label: "Frase",
        multiline: true,
      },
      {
        kind: "list",
        key: "buttons",
        label: "Botones",
        itemLabel: "Botón",
        summaryKey: "label",
        fields: [
          { kind: "i18n", key: "label", label: "Texto" },
          { kind: "text", key: "href", label: "Enlace", placeholder: "#puros" },
          {
            kind: "select",
            key: "style",
            label: "Estilo",
            options: [
              { value: "solid", label: "Relleno (rojo)" },
              { value: "outline", label: "Contorno (dorado)" },
            ],
          },
        ],
      },
    ],
  },

  marquee: {
    label: "Franja de palabras",
    description: "Palabras que corren de lado a lado (productos, servicios, lugar).",
    fields: [
      {
        kind: "list",
        key: "items",
        label: "Palabras",
        itemLabel: "Palabra",
        summaryKey: "label",
        fields: [{ kind: "i18n", key: "label", label: "Texto" }],
      },
    ],
  },

  quote: {
    label: "Franja con frase",
    description: "Franja roja con una cita y un dato destacado.",
    fields: [
      {
        kind: "i18n",
        key: "quote",
        label: "Frase",
        multiline: true,
        rich: true,
        help: RICH_HELP,
      },
      { kind: "text", key: "statValue", label: "Dato destacado", placeholder: "100%" },
      { kind: "i18n", key: "statLabel", label: "Descripción del dato" },
    ],
  },

  cards: {
    label: "Tarjetas con banner",
    description: "Título, texto, foto panorámica y tarjetas numeradas (como Puros).",
    fields: [
      anchor,
      eyebrow,
      title,
      text,
      { kind: "image", key: "banner", label: "Foto panorámica" },
      { kind: "i18n", key: "bannerLabel", label: "Texto sobre la foto" },
      {
        kind: "list",
        key: "items",
        label: "Tarjetas",
        itemLabel: "Tarjeta",
        summaryKey: "name",
        fields: [
          { kind: "select", key: "icon", label: "Ícono", options: [...ICONS] },
          { kind: "i18n", key: "name", label: "Nombre" },
          { kind: "i18n", key: "text", label: "Descripción", multiline: true },
        ],
      },
    ],
  },

  features: {
    label: "Texto + cuadrícula",
    description: "Texto fijo a la izquierda con foto, y cuadrícula de elementos con ícono (como Accesorios).",
    fields: [
      anchor,
      eyebrow,
      title,
      text,
      { kind: "image", key: "image", label: "Foto bajo el texto" },
      {
        kind: "list",
        key: "items",
        label: "Elementos",
        itemLabel: "Elemento",
        summaryKey: "name",
        fields: [
          { kind: "select", key: "icon", label: "Ícono", options: [...ICONS] },
          { kind: "i18n", key: "name", label: "Nombre" },
          { kind: "i18n", key: "text", label: "Descripción", multiline: true },
        ],
      },
    ],
  },

  split: {
    label: "Foto + lista",
    description: "Foto grande a un lado y lista numerada al otro (como Pipas).",
    fields: [
      anchor,
      { kind: "image", key: "image", label: "Foto" },
      {
        kind: "select",
        key: "imageSide",
        label: "Lado de la foto",
        options: [
          { value: "left", label: "Izquierda" },
          { value: "right", label: "Derecha" },
        ],
      },
      eyebrow,
      title,
      text,
      {
        kind: "list",
        key: "items",
        label: "Elementos",
        itemLabel: "Elemento",
        summaryKey: "name",
        fields: [
          { kind: "i18n", key: "name", label: "Nombre" },
          { kind: "i18n", key: "text", label: "Descripción", multiline: true },
        ],
      },
    ],
  },

  gallery: {
    label: "Galería",
    description: "Mosaico de fotos con título. Al tocarlas se ven en grande.",
    fields: [
      anchor,
      { ...eyebrow, help: "Opcional." },
      { ...title, label: "Título (opcional)" },
      {
        kind: "list",
        key: "items",
        label: "Fotos",
        itemLabel: "Foto",
        summaryKey: "title",
        fields: [
          { kind: "image", key: "image", label: "Foto" },
          { kind: "i18n", key: "title", label: "Título" },
          { kind: "i18n", key: "subtitle", label: "Subtítulo" },
        ],
      },
    ],
  },

  statement: {
    label: "Frase grande",
    description: "Cita centrada a pantalla completa con texto y botón.",
    fields: [
      {
        kind: "i18n",
        key: "quote",
        label: "Frase",
        multiline: true,
        rich: true,
        help: RICH_HELP,
      },
      text,
      button,
    ],
  },

  text: {
    label: "Texto libre",
    description: "Título y párrafos, para cualquier cosa (historia, avisos, etc.).",
    fields: [
      anchor,
      eyebrow,
      title,
      {
        kind: "i18n",
        key: "body",
        label: "Texto",
        multiline: true,
        rich: true,
        help: "Deja una línea en blanco para separar párrafos. *Asteriscos* para resaltar.",
      },
      {
        kind: "select",
        key: "align",
        label: "Alineación",
        options: [
          { value: "left", label: "Izquierda" },
          { value: "center", label: "Centrado" },
        ],
      },
    ],
  },

  faq: {
    label: "Preguntas frecuentes",
    description: "Lista de preguntas que se abren al tocarlas.",
    fields: [
      anchor,
      eyebrow,
      title,
      {
        kind: "list",
        key: "items",
        label: "Preguntas",
        itemLabel: "Pregunta",
        summaryKey: "q",
        fields: [
          { kind: "i18n", key: "q", label: "Pregunta" },
          { kind: "i18n", key: "a", label: "Respuesta", multiline: true },
        ],
      },
    ],
  },

  contact: {
    label: "Contacto y mapa",
    description: "Ubicación, horario y contacto. Los datos salen de «Info del negocio».",
    fields: [
      anchor,
      eyebrow,
      title,
      { kind: "bool", key: "showMap", label: "Mostrar mapa" },
    ],
  },
} satisfies Record<string, { label: string; description: string; fields: Field[] }>;

export type SectionType = keyof typeof SECTION_TYPES;

export function isSectionType(value: string): value is SectionType {
  return value in SECTION_TYPES;
}

// ─── Tipos de datos de cada sección (para los componentes del sitio) ───

type Button = { label: Localized; href: string };
type Item = { icon: IconName; name: Localized; text: Localized };

export type SectionData = {
  hero: {
    image: ImageValue;
    video: string;
    showLogo: boolean;
    eyebrow: Localized;
    title: Localized;
    tagline: Localized;
    buttons: (Button & { style: "solid" | "outline" })[];
  };
  marquee: { items: { label: Localized }[] };
  quote: { quote: Localized; statValue: string; statLabel: Localized };
  cards: {
    anchor: string;
    eyebrow: Localized;
    title: Localized;
    text: Localized;
    banner: ImageValue;
    bannerLabel: Localized;
    items: Item[];
  };
  features: {
    anchor: string;
    eyebrow: Localized;
    title: Localized;
    text: Localized;
    image: ImageValue;
    items: Item[];
  };
  split: {
    anchor: string;
    image: ImageValue;
    imageSide: "left" | "right";
    eyebrow: Localized;
    title: Localized;
    text: Localized;
    items: { name: Localized; text: Localized }[];
  };
  gallery: {
    anchor: string;
    eyebrow: Localized;
    title: Localized;
    items: { image: ImageValue; title: Localized; subtitle: Localized }[];
  };
  statement: { quote: Localized; text: Localized; button: Button };
  text: {
    anchor: string;
    eyebrow: Localized;
    title: Localized;
    body: Localized;
    align: "left" | "center";
  };
  faq: {
    anchor: string;
    eyebrow: Localized;
    title: Localized;
    items: { q: Localized; a: Localized }[];
  };
  contact: { anchor: string; eyebrow: Localized; title: Localized; showMap: boolean };
};

export type Section = {
  [K in SectionType]: {
    id: number;
    type: K;
    visible: boolean;
    data: SectionData[K];
  };
}[SectionType];
