"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { href: "/admin", label: "Secciones", match: (p: string) => p === "/admin" || p.startsWith("/admin/secciones") },
  { href: "/admin/negocio", label: "Info del negocio", match: (p: string) => p.startsWith("/admin/negocio") },
  { href: "/admin/imagenes", label: "Imágenes", match: (p: string) => p.startsWith("/admin/imagenes") },
];

export function AdminNav({ logout }: { logout: () => Promise<void> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="bg-ink text-white md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0">
      <div className="flex items-center justify-between px-5 py-4 md:block md:px-6 md:py-8">
        <Link href="/admin" className="font-serif text-sm tracking-[0.25em] uppercase">
          Vi<span className="text-red">ñ</span>ales <span className="text-gold-lt">Admin</span>
        </Link>
        <button className="text-sm text-white/70 md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>
      <nav className={`${open ? "block" : "hidden"} space-y-1 px-3 pb-4 md:block md:px-4`}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 text-sm font-medium ${
              item.match(pathname) ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="/es"
          target="_blank"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-gold-lt hover:text-white"
        >
          Ver sitio ↗
        </a>
        <form action={logout} className="pt-4">
          <button type="submit" className="px-3 text-xs font-semibold text-white/40 hover:text-white">
            Cerrar sesión
          </button>
        </form>
      </nav>
    </aside>
  );
}
