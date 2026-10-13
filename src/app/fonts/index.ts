import localFont from "next/font/local";

// Fuentes dentro del proyecto (Fontsource, licencia OFL; ver OFL.txt) para que la
// compilación no dependa de descargar de Google Fonts.
// Subconjunto "latin": incluye ñ, acentos, ¿ ¡ © y la puntuación general.

export const cinzel = localFont({
  src: "./cinzel-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-cinzel",
  display: "swap",
});

export const cormorant = localFont({
  src: [
    { path: "./cormorant-garamond-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
    { path: "./cormorant-garamond-latin-wght-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const montserrat = localFont({
  src: "./montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});
