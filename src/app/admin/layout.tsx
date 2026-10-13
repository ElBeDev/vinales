import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./admin.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-cinzel" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-montserrat" });

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
