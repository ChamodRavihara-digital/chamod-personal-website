import React, { useState } from "react";
import { caseStudies } from "../../content/work";
import { CaseCard } from "../components/CaseCard";
import { CTABlock } from "../components/CTABlock";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface WorkIndexViewProps {
  onNavigate: (href: string) => void;
}

export const WorkIndexView: React.FC<WorkIndexViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  useScrollReveal();

  const categories = ["All", "E-commerce", "Tracking", "Lead generation", "Brand"].filter(
    (cat) => cat === "All" || caseStudies.some((c) => c.category === cat)
  );

  const filteredStudies =
    selectedCategory === "All" ? caseStudies : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <main className="w-full pt-[52px]">
      <section className="bg-[#f5f5f7] text-center pt-20 sm:pt-28 pb-12">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#bf4800] mb-3">Selected work</p>
          <h1 className="ap-hero mx-auto max-w-[13ch]">Built for verified return on ad spend.</h1>
          <p className="ap-sub text-[#424245] mt-6 mx-auto max-w-[34ch]">
            Campaigns, tracking setups and growth numbers across retail, education and diversified brands.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f5f7] pb-24 sm:pb-32">
        <div className="ap-wrap-wide">
          {/* Segmented filter */}
          <div className="flex justify-center mb-12">
            <div
              role="tablist"
              aria-label="Filter case studies"
              className="inline-flex max-w-full overflow-x-auto scrollbar-none rounded-full bg-[#e8e8ed] p-1"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = cat === "All" ? caseStudies.length : caseStudies.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[40px] px-4 sm:px-5 rounded-full text-[14px] whitespace-nowrap transition-all cursor-pointer ${
                      isActive ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : "text-[#424245] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {cat} <span className="text-[#6e6e73]">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudies.map((study, idx) => (
              <CaseCard key={study.slug} study={study} index={idx} onClick={(slug) => onNavigate(`/work/${slug}`)} />
            ))}
          </div>
        </div>
      </section>

      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
