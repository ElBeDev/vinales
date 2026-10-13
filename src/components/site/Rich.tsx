import { Fragment } from "react";

// Marcado mínimo para los textos editables:
//   *palabra*  → resaltado (<em>, cada sección le da su estilo)
//   salto de línea → <br>
export function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {/* el espacio evita que se peguen las palabras si el CSS oculta el <br> */}
          {i > 0 && (
            <>
              {" "}
              <br />
            </>
          )}
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
              <em key={j}>{part.slice(1, -1)}</em>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}

// Párrafos separados por una línea en blanco.
export function RichParagraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter((p) => p.trim())
        .map((p, i) => (
          <p key={i}>
            <Rich text={p.trim()} />
          </p>
        ))}
    </>
  );
}
