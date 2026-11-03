import React from "react";
import { CaseStudy } from "../../content/work";
import { isTodo } from "../lib/utils";
import { CaseCover } from "./CaseCover";

interface CaseCardProps {
  study: CaseStudy;
  onClick?: (slug: string) => void;
  className?: string;
  index?: number;
  dark?: boolean;
}

export const CaseCard: React.FC<CaseCardProps> = ({ study, onClick, className = "", dark = false }) => {
  const displayClient = isTodo(study.client) ? study.industry : study.client;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(study.slug);
    }
  };

  return (
    <a
      href={`/work/${study.slug}`}
      onClick={handleClick}
      className={`group flex flex-col rounded-[18px] overflow-hidden transition-all duration-500 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)] hover:scale-[1.01] ${
        dark ? "bg-[#1d1d1f] text-[#f5f5f7]" : "bg-white text-[#1d1d1f]"
      } ${className}`}
    >
      <div className="overflow-hidden border-b border-black/[0.05]">
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <CaseCover study={study} />
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.04em] mb-2 ${dark ? "text-[#a1a1a6]" : "text-[#bf4800]"}`}>
          {study.category}
          {study.market && !isTodo(study.market) && <span className={dark ? "" : "text-[#6e6e73]"}> · {study.market}</span>}
        </p>
        <h3 className="text-[24px] font-bold tracking-[-0.025em] leading-tight">{displayClient}</h3>
        <p className={`mt-2 text-[15px] leading-snug ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{study.title}</p>

        <div className="mt-auto pt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[40px] font-bold tracking-[-0.04em] leading-none tabular-nums">
              {study.headlineMetric.value}
            </div>
            <div className={`text-[14px] mt-1 ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{study.headlineMetric.label}</div>
          </div>
          <span className={`text-[17px] whitespace-nowrap ${dark ? "text-[#2997ff]" : "text-[#0066cc]"}`}>
            <span className="group-hover:underline">Read case</span> ›
          </span>
        </div>
      </div>
    </a>
  );
};
