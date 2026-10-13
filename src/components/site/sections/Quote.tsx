import { pick } from "@/lib/i18n";
import { Rich } from "../Rich";
import type { SectionProps } from "./types";

export function Quote({ data, locale }: SectionProps<"quote">) {
  return (
    <div className="strip">
      <div className="strip-inner">
        <blockquote>
          <Rich text={pick(data.quote, locale)} />
        </blockquote>
        {data.statValue && (
          <div className="strip-stat">
            <div className="stat-num">{data.statValue}</div>
            <div className="stat-label">{pick(data.statLabel, locale)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
