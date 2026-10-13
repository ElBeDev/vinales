export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Texto editable en los dos idiomas.
export type Localized = { es: string; en: string };

export function L(es: string, en = ""): Localized {
  return { es, en };
}

// Si falta la traducción al inglés se muestra el español, para no dejar huecos.
export function pick(value: Localized | undefined, locale: Locale) {
  if (!value) return "";
  return (value[locale] || value.es || "").trim();
}

// Textos fijos de la interfaz (no editables desde el panel).
const ui = {
  scroll: L("Desliza", "Scroll"),
  menu: L("Menú", "Menu"),
  switchLang: L("Ver en inglés", "Ver en español"),
  location: L("Ubicación", "Location"),
  hours: L("Horario", "Hours"),
  contact: L("Contacto", "Contact"),
  directions: L("Cómo llegar", "Get directions"),
  closed: L("Cerrado", "Closed"),
  openNow: L("Abierto ahora", "Open now"),
  closedNow: L("Cerrado ahora", "Closed now"),
  closesAt: L("Cierra a las", "Closes at"),
  opensAt: L("Abre", "Opens"),
  today: L("hoy", "today"),
  tomorrow: L("mañana", "tomorrow"),
  whatsapp: L("Escríbenos por WhatsApp", "Message us on WhatsApp"),
  rights: L("Todos los derechos reservados", "All rights reserved"),
  ageTitle: L("¿Eres mayor de edad?", "Are you of legal age?"),
  ageText: L(
    "Este sitio contiene información sobre productos de tabaco y es exclusivo para mayores de 18 años.",
    "This site contains information about tobacco products and is intended only for adults 18 and over.",
  ),
  ageYes: L("Sí, tengo 18 o más", "Yes, I'm 18 or older"),
  ageNo: L("No", "No"),
  ageDenied: L(
    "Lo sentimos, debes ser mayor de edad para entrar.",
    "Sorry, you must be of legal age to enter.",
  ),
  close: L("Cerrar", "Close"),
  call: L("Llamar", "Call"),
  email: L("Correo", "Email"),
  explore: L("Explora", "Explore"),
  follow: L("Síguenos", "Follow us"),
  adultsOnly: L(
    "Venta exclusiva a mayores de 18 años.",
    "Tobacco products sold to adults 18+ only.",
  ),
  dayNames: {
    es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
};

type UiKey = Exclude<keyof typeof ui, "dayNames">;

export function t(key: UiKey, locale: Locale) {
  return pick(ui[key], locale);
}

export function dayName(day: number, locale: Locale) {
  return ui.dayNames[locale][day];
}
