import React, { useState } from "react";
import { isTodo } from "../lib/utils";

interface TimelineItemProps {
  period: string;
  role: string;
  org: string;
  summary: string;
  highlights?: string[];
  defaultExpanded?: boolean;
  dark?: boolean;
  /** Kept for backwards compatibility. */
  theme?: "ink" | "bone";
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  period,
  role,
  org,
  summary,
  highlights = [],
  defaultExpanded = false,
  dark = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const displayPeriod = !isTodo(period) ? period : null;
  const hasHighlights = highlights && highlights.length > 0;
  const panelId = `highlights-${org.replace(/\s+/g, "-")}`;

  return (
    <div className={`border-t py-8 ${dark ? "border-[#424245]" : "border-[#d2d2d7]"}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10">
        <div className="sm:w-[180px] shrink-0 text-[14px] text-[#6e6e73] pt-1.5">{displayPeriod}</div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-[24px] font-semibold tracking-[-0.02em] leading-tight ${dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}`}>
            {role}
          </h3>
          <p className="text-[17px] text-[#6e6e73] mt-0.5">{org}</p>
          <p className={`mt-3 text-[17px] leading-relaxed max-w-[60ch] ${dark ? "text-[#a1a1a6]" : "text-[#1d1d1f]"}`}>
            {summary}
          </p>

          {hasHighlights && (
            <>
              <div
                id={panelId}
                className={`overflow-hidden transition-all duration-500 ${
                  expanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 list-disc pl-5 marker:text-[#86868b]">
                  {highlights.map((h, i) => (
                    <li key={i} className={`text-[15px] leading-relaxed ${dark ? "text-[#a1a1a6]" : "text-[#424245]"}`}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setExpanded(!expanded)}
                className={`mt-3 min-h-[44px] inline-flex items-center gap-1 text-[17px] cursor-pointer ${
                  dark ? "text-[#2997ff]" : "text-[#0066cc]"
                }`}
              >
                <span className="hover:underline">{expanded ? "Show less" : "Show highlights"}</span>
                <span
                  aria-hidden="true"
                  className={`inline-block transition-transform duration-300 ${expanded ? "-rotate-90" : "rotate-90"}`}
                >
                  ›
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
