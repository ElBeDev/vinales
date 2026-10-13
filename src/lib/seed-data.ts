import { L } from "@/lib/i18n";
import type { SectionData, SectionType } from "@/lib/sections/registry";
import type { SiteSettings } from "@/lib/settings";

// Contenido inicial: el mismo del sitio estático original.
// Las fotos de Pexels son de relleno hasta tener fotos reales de la tienda.

const img = (src: string, es: string, en = "") => ({ src, alt: L(es, en) });
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const seedSettings: SiteSettings = {
  business: {
    name: "Viñales Cigar Shop",
    logo: img("/images/logo.png", "Viñales Cigar Shop"),
    address: "Av Mexico 17-A, Bucerias Centro, Nayarit",
    mapQuery: "Av Mexico 17-A, Bucerias, Nayarit",
    timezone: "America/Bahia_Banderas",
  },
  contact: {
    phone: "+52 (982) 105-1231",
    whatsapp: "",
    whatsappMessage: L(
      "Hola, vi su página y me gustaría más información.",
      "Hi, I saw your website and would like more information.",
    ),
    email: "laura@vinales-cigars.com",
  },
  social: {
    instagram: "",
    facebook: "https://www.facebook.com/profile.php?id=61590459311163",
    tiktok: "",
    google: "",
  },
  hours: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    day,
    closed: day === 0,
    open: "12:00",
    close: "20:00",
  })),
  nav: [
    { label: L("Puros", "Cigars"), href: "#puros" },
    { label: L("Accesorios", "Accessories"), href: "#accesorios" },
    { label: L("Pipas", "Pipes"), href: "#pipas" },
    { label: L("El lugar", "The Lounge"), href: "#lugar" },
    { label: L("Visítanos", "Visit Us"), href: "#contacto" },
  ],
  banner: { enabled: false, text: L(""), href: "" },
  seo: {
    title: L(
      "Viñales Cigar Shop — Puros Cubanos Auténticos",
      "Viñales Cigar Shop — Authentic Cuban Cigars",
    ),
    description: L(
      "Auténticos puros cubanos traídos directamente de Cuba. Cortadores, encendedores, humidores, tabaco y pipas en Bucerías, Nayarit.",
      "Authentic Cuban cigars brought directly from Cuba. Cutters, lighters, humidors, tobacco and pipes in Bucerías, Nayarit.",
    ),
    image: img("/images/hero.jpg", "Puros cubanos"),
  },
  legal: {
    ageGate: true,
    footer: L(
      "© {year} Viñales Cigar Shop — Todos los derechos reservados",
      "© {year} Viñales Cigar Shop — All rights reserved",
    ),
  },
};

type SeedSection = {
  [K in SectionType]: { type: K; data: SectionData[K] };
}[SectionType];

export const seedSections: SeedSection[] = [
  {
    type: "hero",
    data: {
      image: img("/images/hero.jpg", "Puros cubanos", "Cuban cigars"),
      video: "",
      showLogo: true,
      eyebrow: L("Puros Cubanos Auténticos", "Authentic Cuban Cigars"),
      title: L("VI*Ñ*ALES", "VI*Ñ*ALES"),
      tagline: L(
        "Calidad real, sabor original y la experiencia\nque solo un buen puro puede darte.",
        "Real quality, original flavor and the experience\nonly a fine cigar can give you.",
      ),
      buttons: [
        { label: L("Explorar", "Explore"), href: "#puros", style: "solid" },
        { label: L("Visítanos", "Visit Us"), href: "#contacto", style: "outline" },
      ],
    },
  },
  {
    type: "marquee",
    data: {
      items: [
        { label: L("Puros cubanos", "Cuban cigars") },
        { label: L("Humidores", "Humidors") },
        { label: L("Cortadores", "Cutters") },
        { label: L("Encendedores", "Lighters") },
        { label: L("Tabaco para pipa", "Pipe tobacco") },
        { label: L("Lounge", "Lounge") },
        { label: L("Bucerías, Nayarit", "Bucerías, Nayarit") },
      ],
    },
  },
  {
    type: "quote",
    data: {
      quote: L(
        "“Auténticos puros cubanos, traídos directamente de *Cuba* para tu paladar. Calidad real. Sabor original.”",
        "“Authentic Cuban cigars, brought directly from *Cuba* for your palate. Real quality. Original flavor.”",
      ),
      statValue: "100%",
      statLabel: L("Origen Cubano", "Cuban Origin"),
    },
  },
  {
    type: "cards",
    data: {
      anchor: "puros",
      eyebrow: L("Selección Exclusiva", "Exclusive Selection"),
      title: L("Puros *Cubanos*", "Cuban *Cigars*"),
      text: L(
        "Cada puro en nuestra vitrina viene directamente de las mejores vegas de Cuba. Sin intermediarios, sin compromisos — solo el auténtico tabaco cubano que merece tu tiempo y tu paladar.",
        "Every cigar in our showcase comes directly from the finest Cuban tobacco farms. No middlemen, no compromises — only the authentic Cuban tobacco your time and palate deserve.",
      ),
      banner: img(pexels(34217309), "Puros cubanos premium en caja de madera", "Premium Cuban cigars in a wooden box"),
      bannerLabel: L("Colección Premium", "Premium Collection"),
      items: [
        {
          icon: "cigar",
          name: L("Robustos & Robusto Extra"),
          text: L(
            "La medida perfecta para una fumada completa. Cuerpo robusto, humo denso y una entrega equilibrada de todos sus sabores desde el primer tiro hasta el final.",
            "The perfect size for a complete smoke. Full body, dense smoke and a balanced delivery of all its flavors from the first draw to the last.",
          ),
        },
        {
          icon: "cigar-long",
          name: L("Churchill & Lonsdale"),
          text: L(
            "Para quienes disponen del tiempo que merecen. Longitud generosa que evoluciona en tercios, revelando complejidad y elegancia en cada centímetro.",
            "For those who take the time they deserve. Generous length that evolves in thirds, revealing complexity and elegance with every inch.",
          ),
        },
        {
          icon: "torpedo",
          name: L("Torpedos & Figurados"),
          text: L(
            "La vitola más artesanal. Cada corte revela una experiencia diferente — el puro que exige maestría desde el encendido hasta el último tercio.",
            "The most handcrafted vitola. Every cut reveals a different experience — the cigar that demands mastery from the first light to the final third.",
          ),
        },
      ],
    },
  },
  {
    type: "features",
    data: {
      anchor: "accesorios",
      eyebrow: L("Todo para disfrutar", "Everything to Enjoy"),
      title: L("Acce*sorios*", "Acce*ssories*"),
      text: L(
        "Un buen puro merece los mejores accesorios. Aquí encontrarás todo lo necesario para cuidarlo, cortarlo, encenderlo y conservarlo con el mismo respeto que merece el tabaco cubano.",
        "A fine cigar deserves the finest accessories. Here you will find everything needed to care for, cut, light and store it with the same respect Cuban tobacco deserves.",
      ),
      image: img(pexels(10343914), "Cenicero con puros sobre mesa de madera", "Ashtray with cigars on a wooden table"),
      items: [
        {
          icon: "cutter",
          name: L("Cortadores", "Cutters"),
          text: L(
            "Guillotinas dobles, punch cutters y cortadores de cuña. Cortes limpios para un tiro perfecto sin dañar la capa.",
            "Double guillotines, punch cutters and wedge cutters. Clean cuts for a perfect draw without damaging the wrapper.",
          ),
        },
        {
          icon: "flame",
          name: L("Encendedores", "Lighters"),
          text: L(
            "Llama triple, torch y encendedores de cedro. Sin sabores ajenos — solo calor limpio para tu tabaco.",
            "Triple flame, torch and cedar lighters. No foreign flavors — just clean heat for your tobacco.",
          ),
        },
        {
          icon: "humidor",
          name: L("Humidores", "Humidors"),
          text: L(
            "De viaje y de gabinete. Mantén tus puros al 70% de humedad — la condición perfecta para preservar sabor y aroma.",
            "Travel and cabinet humidors. Keep your cigars at 70% humidity — the perfect condition to preserve flavor and aroma.",
          ),
        },
        {
          icon: "sun",
          name: L("Accesorios", "Accessories"),
          text: L(
            "Ceniceros, tubos de viaje, higrómetros y todo lo que completa la experiencia del fumador que sabe lo que quiere.",
            "Ashtrays, travel tubes, hygrometers and everything that completes the experience of a smoker who knows what they want.",
          ),
        },
      ],
    },
  },
  {
    type: "split",
    data: {
      anchor: "pipas",
      image: img(pexels(7938458), "Puro en cenicero de cristal", "Cigar in a crystal ashtray"),
      imageSide: "left",
      eyebrow: L("Para los amantes de la pipa", "For Pipe Lovers"),
      title: L("El mundo *de la pipa*", "The world *of the pipe*"),
      text: L(
        "Si lo tuyo es la pipa, aquí también estás en casa. Una tradición que se disfruta despacio, con el tabaco correcto y los accesorios para mantenerla siempre al 100.",
        "If pipes are your thing, you are home here too. A tradition enjoyed slowly, with the right tobacco and the accessories to keep it always at its best.",
      ),
      items: [
        {
          name: L("Tabaco para pipa", "Pipe Tobacco"),
          text: L(
            "Mezclas Virginia, Burley, Latakia y orientales de excelente calidad. Cortes ribbon, flake y rope para cada estilo de fumada.",
            "Virginia, Burley, Latakia and Oriental blends of excellent quality. Ribbon, flake and rope cuts for every smoking style.",
          ),
        },
        {
          name: L("Pipas", "Pipes"),
          text: L(
            "Distintos estilos y materiales — bruyère, corncob, meerschaum. Para el principiante curioso y el coleccionista exigente.",
            "Different styles and materials — bruyère, corncob, meerschaum. For the curious beginner and the discerning collector.",
          ),
        },
        {
          name: L("Accesorios", "Accessories"),
          text: L(
            "Tampers, limpiapipas, estuches de cuero y todos los implementos para mantener tu pipa siempre a punto.",
            "Tampers, pipe cleaners, leather pouches and all the tools to keep your pipe always in top shape.",
          ),
        },
      ],
    },
  },
  {
    type: "gallery",
    data: {
      anchor: "galeria",
      eyebrow: L("Galería", "Gallery"),
      title: L("Tradición *cubana*", "Cuban *tradition*"),
      items: [
        {
          image: img(pexels(33105628), "Cubano disfrutando puros premium", "Cuban man enjoying premium cigars"),
          title: L("Herencia Cubana", "Cuban Heritage"),
          subtitle: L("Origen & Tradición", "Origin & Tradition"),
        },
        {
          image: img(pexels(10343915), "Puros cubanos en estuche", "Cuban cigars in a case"),
          title: L("Colección", "Collection"),
          subtitle: L("Vitolas Selectas", "Select Vitolas"),
        },
        {
          image: img(pexels(33105617), "Artesano enrollando puros en Cuba", "Artisan rolling cigars in Cuba"),
          title: L("Artesanía", "Craftsmanship"),
          subtitle: L("Hecho a Mano", "Handmade"),
        },
      ],
    },
  },
  {
    type: "split",
    data: {
      anchor: "lugar",
      // Foto tomada del video de la página de Facebook de la tienda
      image: img("/images/tienda-estantes.jpg", "Estantes con cajas de puros cubanos en Viñales Cigar Shop", "Shelves of Cuban cigar boxes at Viñales Cigar Shop"),
      imageSide: "right",
      eyebrow: L("Más que una tienda", "More than a shop"),
      title: L("Un espacio *para disfrutar*", "A place *to enjoy*"),
      text: L(
        "Puros cubanos auténticos y de alta calidad, junto con un espacio cómodo para socializar y disfrutar del buen tabaco.",
        "Authentic, high-quality Cuban cigars, along with a comfortable space to socialize and enjoy fine tobacco.",
      ),
      items: [
        {
          name: L("Puros cubanos auténticos", "Authentic Cuban cigars"),
          text: L(
            "Una selección de alta calidad traída directamente de Cuba.",
            "A high-quality selection brought directly from Cuba.",
          ),
        },
        {
          name: L("Espacio para socializar", "A place to socialize"),
          text: L(
            "Siéntate, enciende tu puro y disfrútalo con calma y en buena compañía.",
            "Sit down, light your cigar and enjoy it slowly, in good company.",
          ),
        },
        {
          name: L("Tabaquería completa", "Full tobacco shop"),
          text: L(
            "Amplia variedad de productos de tabaquería y todos los accesorios esenciales: cortadores, encendedores y más.",
            "A wide variety of tobacco products and all the essential accessories: cutters, lighters and more.",
          ),
        },
      ],
    },
  },
  {
    type: "statement",
    data: {
      quote: L(
        "Aquí no solo vienes a comprar,\nvienes a *disfrutar* y a encontrar\nlo que realmente te gusta.",
        "Here you don't just come to buy,\nyou come to *enjoy* and find\nwhat you truly love.",
      ),
      text: L(
        "Te orientamos para que disfrutes toda la experiencia. Más que una tienda — un lugar donde el buen gusto y el conocimiento van siempre de la mano.",
        "We guide you to enjoy the full experience. More than a shop — a place where good taste and knowledge always go hand in hand.",
      ),
      button: { label: L("Visítanos", "Visit Us"), href: "#contacto" },
    },
  },
  {
    type: "contact",
    data: {
      anchor: "contacto",
      eyebrow: L("Visítanos", "Visit us"),
      title: L("Te esperamos en *Bucerías*", "See you in *Bucerías*"),
      showMap: true,
    },
  },
];
