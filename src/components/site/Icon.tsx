import type { IconName } from "@/lib/sections/registry";

// Íconos del sitio original. Los de puros llevan colores propios;
// los demás usan currentColor (dorado).
export function Icon({ name, className }: { name: IconName; className?: string }) {
  switch (name) {
    case "cigar":
      return (
        <svg width="52" height="14" viewBox="0 0 52 14" fill="none" aria-hidden="true">
          <rect x="5" y="4.5" width="40" height="5" rx="2.5" fill="#d4a017" opacity="0.5" />
          <path d="M45 7 C48 4.5 52 4 52 7 C52 10 48 9.5 45 7Z" fill="#ff6a00" opacity="0.8" />
          <rect x="0" y="5.5" width="6" height="3" rx="1.5" fill="#c61e1e" opacity="0.5" />
          <line x1="44" y1="4.5" x2="44" y2="9.5" stroke="#9c7510" strokeWidth="0.75" opacity="0.8" />
        </svg>
      );
    case "cigar-long":
      return (
        <svg width="62" height="14" viewBox="0 0 62 14" fill="none" aria-hidden="true">
          <rect x="5" y="4.5" width="50" height="5" rx="2.5" fill="#d4a017" opacity="0.5" />
          <path d="M55 7 C58 4.5 62 4 62 7 C62 10 58 9.5 55 7Z" fill="#ff6a00" opacity="0.8" />
          <rect x="0" y="5.5" width="6" height="3" rx="1.5" fill="#c61e1e" opacity="0.5" />
          <line x1="54" y1="4.5" x2="54" y2="9.5" stroke="#9c7510" strokeWidth="0.75" opacity="0.8" />
        </svg>
      );
    case "torpedo":
      return (
        <svg width="42" height="16" viewBox="0 0 42 16" fill="none" aria-hidden="true">
          <path d="M4 8 C4 8 6 3 14 3 L30 3 C35 3 38 5 38 8 C38 11 35 13 30 13 L14 13 C6 13 4 8 4 8Z" fill="#d4a017" opacity="0.4" />
          <path d="M38 8 C39.5 5.5 42 5 42 8 C42 11 39.5 10.5 38 8Z" fill="#ff6a00" opacity="0.85" />
          <rect x="0" y="6.5" width="5" height="3" rx="1.5" fill="#c61e1e" opacity="0.5" />
          <line x1="29" y1="3.5" x2="29" y2="12.5" stroke="#9c7510" strokeWidth="0.75" opacity="0.8" />
        </svg>
      );
    case "cutter":
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
          <line x1="9" y1="18" x2="27" y2="18" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9 14 L15 18 L9 22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M27 14 L21 18 L27 22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      );
    case "flame":
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
          <path d="M18 9 C18 9 13.5 14.5 13.5 19.5 C13.5 23 15.5 26.5 18 26.5 C20.5 26.5 22.5 23 22.5 19.5 C22.5 14.5 18 9 18 9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M18 21 C16.5 22 16 23.5 16 25" stroke="currentColor" strokeWidth="1" opacity="0.45" strokeLinecap="round" />
        </svg>
      );
    case "humidor":
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
          <rect x="9" y="15" width="18" height="11" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <line x1="9" y1="19.5" x2="27" y2="19.5" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <path d="M15.5 13.5 L15.5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M20.5 13.5 L20.5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="16" y="12" width="4" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      );
    case "sun":
      return (
        <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
          <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.3" />
          {[
            [18, 9, 18, 12], [18, 24, 18, 27], [9, 18, 12, 18], [24, 18, 27, 18],
            [11.6, 11.6, 13.7, 13.7], [22.3, 22.3, 24.4, 24.4], [24.4, 11.6, 22.3, 13.7], [13.7, 22.3, 11.6, 24.4],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          ))}
        </svg>
      );
    case "none":
      return null;
  }
}
