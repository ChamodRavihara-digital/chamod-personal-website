import React from "react";
import { caseStudies } from "../../content/work";
import { isTodo, cleanString } from "../lib/utils";
import { MetricTile } from "../components/MetricTile";
import { CaseCover } from "../components/CaseCover";
import { CTABlock } from "../components/CTABlock";
import { Button, ChevronLink } from "../components/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface CaseStudyDetailViewProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export const CaseStudyDetailView: React.FC<CaseStudyDetailViewProps> = ({ slug, onNavigate }) => {
  useScrollReveal();
  const study = caseStudies.find((c) => c.slug === slug);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  if (!study) {
    return (
      <main className="w-full pt-[52px]">
        <section className="bg-[#f5f5f7] text-center ap-section">
          <div className="ap-wrap">
            <h1 className="ap-headline">Case study not found.</h1>
            <p className="ap-sub text-[#6e6e73] mt-4 mx-auto max-w-[30ch]">
              It doesn't exist or may have moved.
            </p>
            <div className="mt-8">
              <Button href="/work" onClick={go("/work")}>
                Back to selected work
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];
  const displayClient = isTodo(study.client) ? study.industry : study.client;

  const validSections: { title: string; content: string }[] = [];
  const add = (title: string, value?: string) => {
    if (!isTodo(value)) validSections.push({ title, content: cleanString(value) });
  };
  add("Challenge", study.sections?.challenge);
  add("Strategy", study.sections?.strategy);
  add("Execution", study.sections?.execution);
  add("Results", study.sections?.results);
  add("What I'd do next", study.sections?.next);

  const facts = [
    { k: "Client", v: displayClient },
    { k: "Role", v: study.role },
    { k: "Channels", v: study.channels.join(", ") },
    { k: "Market", v: !isTodo(study.market) ? study.market : study.industry },
    ...(!isTodo(study.period) ? [{ k: "Period", v: study.period }] : []),
  ];

  return (
    <main className="w-full pt-[52px]">
      {/* Local sub-nav, like Apple's product bar */}
      <div className="sticky top-[52px] z-30 bg-[rgba(255,255,255,0.8)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/[0.08]">
        <div className="ap-wrap h-[52px] flex items-center justify-between gap-4">
          <span className="text-[21px] font-semibold tracking-[-0.02em] truncate">{displayClient}</span>
          <a href="/work" onClick={go("/work")} className="text-[12px] text-[#0066cc] hover:underline shrink-0">
            All case studies
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white text-center pt-16 sm:pt-24">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#bf4800] mb-3">
            {study.category} · {displayClient}
          </p>
          <h1 className="ap-hero mx-auto max-w-[16ch]">{study.title}</h1>
        </div>

        <div className="ap-wrap-wide mt-14">
          <CaseCover
            study={study}
            large
            aspect="aspect-[16/9]"
            className="rounded-[28px] max-h-[640px] mx-auto bg-[#f5f5f7] border border-black/[0.06]"
          />
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-white py-20 sm:py-28">
        <div className="ap-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center sm:text-left reveal-on-scroll">
          {study.metrics.map((metric, idx) => (
            <MetricTile key={idx} value={metric.value} label={metric.label} detail={metric.detail} gradient={idx === 0} />
          ))}
        </div>
      </section>

      {/* Facts */}
      <section className="bg-[#f5f5f7] py-14">
        <dl className="ap-wrap grid grid-cols-2 md:grid-cols-5 gap-6">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="text-[14px] text-[#6e6e73]">{f.k}</dt>
              <dd className="mt-1 text-[17px] font-semibold leading-snug">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story */}
      {validSections.length > 0 && (
        <section className="bg-white ap-section">
          <div className="max-w-[692px] mx-auto px-[22px] space-y-16">
            {validSections.map((sec) => (
              <div key={sec.title} className="reveal-on-scroll">
                <h2 className="ap-title">{sec.title}</h2>
                <p className="mt-5 text-[21px] leading-[1.5] tracking-[-0.015em] text-[#424245]">{sec.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next */}
      <section className="bg-[#f5f5f7] py-16">
        <div className="ap-wrap flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[14px] text-[#6e6e73]">Next case study</p>
            <a
              href={`/work/${nextStudy.slug}`}
              onClick={go(`/work/${nextStudy.slug}`)}
              className="mt-1 inline-block text-[28px] sm:text-[32px] font-bold tracking-[-0.025em] hover:text-[#0066cc] transition-colors"
            >
              {isTodo(nextStudy.client) ? nextStudy.industry : nextStudy.client} ›
            </a>
          </div>
          <ChevronLink href="/work" onClick={go("/work")}>
            Browse all case studies
          </ChevronLink>
        </div>
      </section>

      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
