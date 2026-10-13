import type { Metadata } from "next";
import { cinzel, montserrat } from "@/app/fonts";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin | Viñales Cigar Shop",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
