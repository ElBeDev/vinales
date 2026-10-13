import Image from "next/image";
import { pick, type Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/settings";
import { canOptimize } from "./Img";

export function Footer({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const logo = settings.business.logo.src;
  const text = pick(settings.legal.footer, locale).replace("{year}", String(new Date().getFullYear()));
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          {logo ? (
            <Image
              src={logo}
              alt={settings.business.name}
              width={50}
              height={50}
              className="footer-logo-img"
              unoptimized={!canOptimize(logo)}
            />
          ) : (
            settings.business.name
          )}
        </div>
        <p className="footer-copy">{text}</p>
        <ul className="footer-nav">
          {settings.nav.map((item, i) => (
            <li key={i}>
              <a href={item.href}>{pick(item.label, locale)}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
