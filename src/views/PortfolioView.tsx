import React, { useState } from "react";
import { results, creatives, clients, videos } from "../../content/proof";
import { VideoShowcase } from "../components/VideoCard";
import { CTABlock } from "../components/CTABlock";
import { ResultsGallery, CreativesGrid } from "../components/ProofGalleries";
import { ClientLogoGrid } from "../components/BrandLogosMarquee";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface PortfolioViewProps {
  onNavigate: (href: string) => void;
}

const sections = [
  { id: "results", label: "Real results", count: results.length },
  { id: "videos", label: "Videos", count: videos.length },
  { id: "creatives", label: "Creatives", count: creatives.length },
  { id: "clients", label: "Clients", count: clients.length },
];

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onNavigate }) => {
  useScrollReveal();
  const [active, setActive] = useState("results");

  return (
    <main className="w-full pt-[52px]">
      {/* Hero */}
      <section className="bg-black text-[#f5f5f7] text-center pt-20 sm:pt-28 pb-16">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#a1a1a6] mb-3">Portfolio</p>
          <h1 className="ap-hero mx-auto max-w-[13ch]">Real accounts. Real creatives.</h1>
          <p className="ap-sub text-[#a1a1a6] mt-6 mx-auto max-w-[36ch]">
            Screenshots from live ad accounts and tracking setups, plus creatives published for real clients.
          </p>

          <nav aria-label="Portfolio sections" className="mt-10 flex justify-center">
            <div className="inline-flex max-w-full overflow-x-auto scrollbar-none rounded-full bg-[#1d1d1f] p-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`min-h-[40px] inline-flex items-center px-4 sm:px-5 rounded-full text-[14px] whitespace-nowrap transition-all ${
                    active === s.id ? "bg-[#424245] text-white" : "text-[#a1a1a6] hover:text-white"
                  }`}
                >
                  {s.label} <span className="ml-1.5 text-[#86868b]">{s.count}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="scroll-mt-[52px] bg-black text-[#f5f5f7] pb-24 sm:pb-32">
        <div className="ap-wrap-wide">
          <div className="mb-10 reveal-on-scroll">
            <h2 className="ap-title">Real results.</h2>
            <p className="mt-3 text-[19px] text-[#a1a1a6] max-w-[52ch]">
              Meta Ads, lead generation and conversion tracking — exactly as they appear in Ads Manager, Events Manager
              and Google Tag Manager. Tap any card to see the full screenshot.
            </p>
          </div>
          <ResultsGallery dark />
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="scroll-mt-[52px] bg-black text-[#f5f5f7] pb-24 sm:pb-32 border-t border-[#424245] pt-24 sm:pt-32">
        <div className="ap-wrap-wide">
          <div className="mb-12 reveal-on-scroll">
            <p className="ap-eyebrow text-[#F1BC25] mb-2">By SOZO Visuals</p>
            <h2 className="ap-title">Videos.</h2>
            <p className="mt-3 text-[19px] text-[#a1a1a6] max-w-[52ch]">
              Reels, motion graphics and video ads made in-house. Tap play to watch with sound.
            </p>
          </div>
          <VideoShowcase videos={videos} />
        </div>
      </section>

      {/* Creatives */}
      <section id="creatives" className="scroll-mt-[52px] bg-[#f5f5f7] ap-section">
        <div className="ap-wrap-wide">
          <div className="mb-10 reveal-on-scroll">
            <h2 className="ap-title">Creatives.</h2>
            <p className="mt-3 text-[19px] text-[#6e6e73] max-w-[52ch]">
              Social and ad creatives designed for clients in e-commerce, healthcare, travel and retail.
            </p>
          </div>
          <CreativesGrid />
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="scroll-mt-[52px] bg-white ap-section">
        <div className="ap-wrap-wide">
          <div className="mb-10 reveal-on-scroll">
            <h2 className="ap-title">Clients.</h2>
            <p className="mt-3 text-[19px] text-[#6e6e73] max-w-[52ch]">
              Brands across Sri Lanka, Australia and Italy that trust WEGOT Digital with their growth.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#f5f5f7] p-3 sm:p-5">
            <ClientLogoGrid />
          </div>
        </div>
      </section>

      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
