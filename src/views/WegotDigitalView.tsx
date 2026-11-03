import React from "react";
import { site } from "../../content/site";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { CTABlock } from "../components/CTABlock";
import { BrandLogosMarquee } from "../components/BrandLogosMarquee";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface WegotDigitalViewProps {
  onNavigate: (href: string) => void;
}

const offers = [
  {
    title: "Full-funnel media buying",
    line: "Meta, Google and TikTok accounts with structured prospecting, warm retargeting, dynamic catalogue sales and weekly budget rebalancing.",
  },
  {
    title: "Measurement & Conversions API",
    line: "Server-side tagging through Google Tag Manager and Stape, protecting attribution against ad-blockers and iOS privacy changes.",
  },
  {
    title: "Transparent reporting",
    line: "One clear monthly report: actual ad spend, attributed revenue, blended return and next month's priorities.",
  },
];

export const WegotDigitalView: React.FC<WegotDigitalViewProps> = ({ onNavigate }) => {
  useScrollReveal();
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="w-full pt-[52px]">
      {/* Product-style sub nav */}
      <div className="sticky top-[52px] z-30 bg-[rgba(255,255,255,0.8)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/[0.08]">
        <div className="ap-wrap h-[52px] flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[21px] font-semibold tracking-[-0.02em]">
            <img src="/logos/wegot-mark.png" alt="" className="h-6 w-auto" />
            WEGOT Digital
          </span>
          <a
            href="/contact"
            onClick={go("/contact")}
            className="inline-flex items-center rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] px-3.5 py-[5px]"
          >
            Enquire
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f5f5f7] text-center pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#bf4800] mb-3">A {site.name} venture</p>
          <h1>
            <img
              src="/logos/wegot-digital.png"
              alt="WEGOT Digital — We Got Your Digital Covered"
              className="mx-auto h-[180px] sm:h-[260px] w-auto"
            />
          </h1>
          <p className="ap-sub text-[#424245] mt-7 mx-auto max-w-[32ch]">
            Performance marketing retainers for growing brands. Meta and Google Ads, conversion tracking and disciplined scaling.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" href="/contact" onClick={go("/contact")}>
              Enquire about a retainer
            </Button>
            <Button size="lg" variant="secondaryLight" href={site.whatsapp} external>
              WhatsApp the team
            </Button>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-black text-[#f5f5f7] text-center ap-section">
        <div className="ap-wrap reveal-on-scroll">
          <p className="ap-headline mx-auto max-w-[18ch]">
            The team behind bigger retainers.
            <span className="text-[#86868b]"> Five markets. One standard.</span>
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white ap-section">
        <div className="ap-wrap-wide">
          <SectionHeader
            align="center"
            eyebrow="What we do"
            title="Everything a growth team should do."
            intro="For established and fast-moving direct-to-consumer and B2B brands."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal-on-scroll">
            {offers.map((o, i) => (
              <article key={o.title} className="rounded-[28px] bg-[#f5f5f7] p-8 sm:p-10">
                <div className="text-[48px] font-bold tracking-[-0.04em] leading-none text-[#d2d2d7]" aria-hidden="true">
                  {i + 1}
                </div>
                <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.02em] leading-tight">{o.title}</h3>
                <p className="mt-3 text-[17px] text-[#424245] leading-snug">{o.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="ap-wrap text-center">
          <h2 className="ap-title">Active across five markets.</h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {site.markets.map((m) => (
              <li key={m} className="rounded-full bg-white px-6 py-3 text-[19px] font-semibold tracking-[-0.015em]">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BrandLogosMarquee title="Brands WEGOT Digital works with." />

      <CTABlock
        headline="Scale with WEGOT Digital."
        subline="Open for retainers this quarter. Talk directly with the team."
        onNavigate={onNavigate}
      />
    </main>
  );
};
