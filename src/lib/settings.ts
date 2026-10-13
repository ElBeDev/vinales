import type { Field, HoursValue, ImageValue } from "@/lib/fields";
import type { Localized } from "@/lib/i18n";

export const SETTINGS_FIELDS: Field[] = [
  {
    kind: "group",
    key: "business",
    label: "Negocio",
    fields: [
      { kind: "text", key: "name", label: "Nombre" },
      { kind: "image", key: "logo", label: "Logo" },
      { kind: "text", key: "address", label: "Dirección" },
      {
        kind: "text",
        key: "mapQuery",
        label: "Búsqueda para el mapa",
        help: "Lo que escribirías en Google Maps para encontrar la tienda. Si se deja vacío se usa la dirección.",
      },
      {
        kind: "text",
        key: "timezone",
        label: "Zona horaria",
        help: "Bucerías usa America/Bahia_Banderas (hora del centro). Se usa para «Abierto ahora».",
      },
    ],
  },
  {
    kind: "group",
    key: "contact",
    label: "Contacto",
    fields: [
      { kind: "text", key: "phone", label: "Teléfono", placeholder: "+52 329 123 4567" },
      {
        kind: "text",
        key: "whatsapp",
        label: "WhatsApp",
        placeholder: "523291234567",
        help: "Número con lada de país, solo dígitos. Si se deja vacío no aparece el botón de WhatsApp.",
      },
      {
        kind: "i18n",
        key: "whatsappMessage",
        label: "Mensaje inicial de WhatsApp",
      },
      { kind: "text", key: "email", label: "Email" },
    ],
  },
  {
    kind: "group",
    key: "social",
    label: "Redes sociales",
    help: "URL completa. Deja vacío lo que no uses.",
    fields: [
      { kind: "text", key: "instagram", label: "Instagram" },
      { kind: "text", key: "facebook", label: "Facebook" },
      { kind: "text", key: "tiktok", label: "TikTok" },
      { kind: "text", key: "google", label: "Google Maps / Business" },
    ],
  },
  { kind: "hours", key: "hours", label: "Horario" },
  {
    kind: "list",
    key: "nav",
    label: "Menú",
    help: "Enlaces del menú superior y del pie de página.",
    itemLabel: "Enlace",
    summaryKey: "label",
    fields: [
      { kind: "i18n", key: "label", label: "Texto" },
      { kind: "text", key: "href", label: "Enlace", placeholder: "#puros" },
    ],
  },
  {
    kind: "group",
    key: "banner",
    label: "Aviso superior",
    help: "Barra delgada arriba del menú, ej. «Cerrado el 25 de diciembre».",
    fields: [
      { kind: "bool", key: "enabled", label: "Mostrar aviso" },
      { kind: "i18n", key: "text", label: "Texto" },
      { kind: "text", key: "href", label: "Enlace (opcional)" },
    ],
  },
  {
    kind: "group",
    key: "seo",
    label: "Google y redes (SEO)",
    fields: [
      {
        kind: "i18n",
        key: "title",
        label: "Título de la página",
        help: "Lo que aparece en la pestaña y en Google. Máx. ~60 caracteres.",
      },
      {
        kind: "i18n",
        key: "description",
        label: "Descripción",
        multiline: true,
        help: "Lo que aparece debajo del título en Google. Máx. ~155 caracteres.",
      },
      {
        kind: "image",
        key: "image",
        label: "Imagen al compartir",
        help: "Se ve al mandar el link por WhatsApp o Facebook. Ideal 1200×630.",
      },
    ],
  },
  {
    kind: "group",
    key: "legal",
    label: "Legal",
    fields: [
      {
        kind: "bool",
        key: "ageGate",
        label: "Pedir confirmación de mayoría de edad (+18)",
      },
      { kind: "i18n", key: "footer", label: "Texto del pie de página" },
    ],
  },
];

export type SiteSettings = {
  business: {
    name: string;
    logo: ImageValue;
    address: string;
    mapQuery: string;
    timezone: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappMessage: Localized;
    email: string;
  };
  social: { instagram: string; facebook: string; tiktok: string; google: string };
  hours: HoursValue;
  nav: { label: Localized; href: string }[];
  banner: { enabled: boolean; text: Localized; href: string };
  seo: { title: Localized; description: Localized; image: ImageValue };
  legal: { ageGate: boolean; footer: Localized };
};
