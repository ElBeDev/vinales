import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Las fotos se reducen en el navegador antes de subirse; esto deja margen.
    // (En Vercel el límite real de una petición es 4.5 MB.)
    serverActions: { bodySizeLimit: "4mb" },
  },
  // Los navegadores piden /favicon.ico aunque exista icon.png
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  },
  images: {
    qualities: [75, 85],
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      // Fotos de relleno mientras llegan las reales
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
