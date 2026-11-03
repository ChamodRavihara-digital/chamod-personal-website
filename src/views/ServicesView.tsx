import React from "react";
import { services, addOn, engagementModels, process } from "../../content/services";
import { isTodo } from "../lib/utils";
import { SectionHeader } from "../components/SectionHeader";
import { CTABlock } from "../components/CTABlock";
import { Button, ChevronLink } from "../components/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ServicesViewProps {
  onNavigate: (href: string) => void;
}

const Check: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-[3px]">
    <circle cx="10" cy="10" r="10" fill={dark ? "#2997ff" : "#0071e3"} opacity="0.15" />
    <path d="M6 10.2l2.6 2.6L14 7.4" stroke={dark ? "#2997ff" : "#0071e3"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ServicesView: React.FC<ServicesViewProps> = ({ onNavigate }) => {
  useScrollReveal();
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="w-full pt-[52px]">
      {/* Hero */}
      <section className="bg-[#f5f5f7] text-center pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#bf4800] mb-3">Services</p>
          <h1 className="ap-hero mx-auto max-w-[13ch]">Data you can trust. Spend that pays back.</h1>
          <p className="ap-sub text-[#424245] mt-6 mx-auto max-w-[34ch]">
            Performance marketing built on verifiable tracking, steady ad testing and weekly optimisation.
          </p>

          {/* In-page jump links */}
          <nav aria-label="Services on this page" className="mt-10 flex flex-wrap justify-center gap-2">
            {services.map((svc) => (
              <a
                key={svc.slug}
                href={`#${svc.slug}`}
                className="min-h-[44px] inline-flex items-center px-5 rounded-full bg-white text-[15px] text-[#1d1d1f] hover:bg-[#e8e8ed] transition-colors"
              >
                {svc.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* One section per service */}
      {services.map((svc, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={svc.slug}
            id={svc.slug}
            className={`scroll-mt-[52px] ap-section ${dark ? "bg-black text-[#f5f5f7]" : "bg-white text-[#1d1d1f]"}`}
          >
            <div className="ap-wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 reveal-on-scroll">
              <div>
                <p className={`text-[17px] font-semibold ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>
                  {svc.n} · {svc.subtitle}
                </p>
                <h2 className="ap-headline mt-3">{svc.title}</h2>
                <p className={`ap-sub mt-4 ${dark ? "text-[#a1a1a6]" : "text-[#424245]"}`}>{svc.promise}</p>
                {svc.proof && (
                  <div className="mt-6">
                    <ChevronLink dark={dark} href={svc.proof.href} onClick={go(svc.proof.href)}>
                      {svc.proof.text}
                    </ChevronLink>
                  </div>
                )}
              </div>

              <div className={`rounded-[28px] p-8 sm:p-10 ${dark ? "bg-[#1d1d1f]" : "bg-[#f5f5f7]"}`}>
                <h3 className={`text-[14px] font-semibold uppercase tracking-[0.04em] ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>
                  What's included
                </h3>
                <ul className="mt-5 space-y-4">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[19px] leading-snug tracking-[-0.015em]">
                      <Check dark={dark} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      {/* Add-on */}
      <section className="bg-[#f5f5f7] py-16 sm:py-20">
        <div className="ap-wrap flex flex-col md:flex-row md:items-center justify-between gap-6 reveal-on-scroll">
          <div>
            <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.025em]">{addOn.title}</h2>
            <p className="mt-2 text-[19px] text-[#6e6e73] max-w-[48ch]">{addOn.line}</p>
          </div>
          <Button variant="secondaryLight" href="/contact" onClick={go("/contact")} className="shrink-0 self-start md:self-auto">
            Ask about the add-on
          </Button>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white ap-section">
        <div className="ap-wrap-wide">
          <SectionHeader
            eyebrow="How we work"
            title="Five steps from audit to scale."
            intro="A clear order of work that stops budget leaking before spend goes up."
            align="center"
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 reveal-on-scroll">
            {process.map((step, idx) => (
              <li key={step.step} className="rounded-[22px] bg-[#f5f5f7] p-7">
                <div className="text-[48px] font-bold tracking-[-0.04em] leading-none text-[#d2d2d7]" aria-hidden="true">
                  {idx + 1}
                </div>
                <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.02em]">{step.step}</h3>
                <p className="mt-2 text-[15px] leading-snug text-[#6e6e73]">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-[#f5f5f7] ap-section">
        <div className="ap-wrap-wide">
          <SectionHeader
            eyebrow="Ways to work together"
            title="Pick the model that fits."
            intro="A one-off audit and tracking fix, or a monthly performance team."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll">
            {engagementModels.map((model) => (
              <article key={model.name} className="rounded-[22px] bg-white p-7 sm:p-8 flex flex-col">
                <h3 className="text-[28px] font-bold tracking-[-0.025em]">{model.name}</h3>
                {model.price && !isTodo(model.price) && (
                  <p className="mt-1 text-[17px] font-semibold text-[#1d1d1f]">{model.price}</p>
                )}
                <p className="mt-4 text-[14px] text-[#6e6e73]">Best for</p>
                <p className="text-[17px] font-semibold leading-snug">{model.for}</p>
                <p className="mt-4 text-[15px] leading-snug text-[#424245]">{model.what}</p>
                <div className="mt-auto pt-6">
                  <ChevronLink href="/contact" onClick={go("/contact")}>
                    Discuss {model.name}
                  </ChevronLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
