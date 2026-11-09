import React from "react";
import { services } from "../../content/services";
import { ventures } from "../../content/ventures";
import { caseStudies } from "../../content/work";
import { ChamodPortrait } from "../components/ChamodPortrait";
import { CertifiedLogos } from "../components/CertifiedLogos";
import { BrandLogosMarquee } from "../components/BrandLogosMarquee";
import { ResultsGallery } from "../components/ProofGalleries";
import { creatives } from "../../content/proof";
import { CaseCard } from "../components/CaseCard";
import { CTABlock } from "../components/CTABlock";
import { Button, ChevronLink } from "../components/Button";
import { PlatformRow } from "../components/PlatformRow";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface HomeViewProps {
  onNavigate: (href: string) => void;
}

/* ---------- Small visuals for the service tiles ---------- */

const RoasVisual: React.FC = () => (
  <div className="w-full max-w-[420px] mx-auto">
    <div className="text-center">
      <div className="ap-gradient-text font-bold tracking-[-0.05em] leading-none" style={{ fontSize: "clamp(88px, 12vw, 140px)" }}>
        3.2×
      </div>
      <p className="mt-2 text-[15px] text-[#6e6e73]">ROAS for anythingatsupun.lk</p>
    </div>
    <svg viewBox="0 0 420 90" className="w-full h-[90px] mt-6" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M0 80 C60 76 100 70 150 58 C200 46 230 52 280 36 C330 20 370 18 420 8"
        fill="none"
        stroke="#0071e3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M0 80 C60 76 100 70 150 58 C200 46 230 52 280 36 C330 20 370 18 420 8 L420 90 L0 90 Z"
        fill="#0071e3"
        opacity="0.08"
      />
    </svg>
  </div>
);

const TrackingVisual: React.FC = () => {
  const rows = [
    { name: "Meta Pixel + Conversions API", on: true },
    { name: "GA4 + Google Tag Manager", on: true },
    { name: "Server-side tagging", on: true },
    { name: "Catalogue sync", on: true },
  ];
  return (
    <ul className="w-full max-w-[420px] mx-auto space-y-2.5 text-left">
      {rows.map((r) => (
        <li key={r.name} className="flex items-center justify-between rounded-[14px] bg-[#1d1d1f] px-5 py-4 text-[15px]">
          <span className="text-[#f5f5f7]">{r.name}</span>
          <span className="inline-flex items-center gap-1.5 text-[#30d158] text-[13px]">
            <span className="w-2 h-2 rounded-full bg-[#30d158]" aria-hidden="true" />
            Live
          </span>
        </li>
      ))}
    </ul>
  );
};

const SocialVisual: React.FC = () => (
  <div className="grid grid-cols-3 gap-1.5 w-full max-w-[360px] mx-auto" aria-hidden="true">
    {creatives.slice(0, 6).map((c) => (
      <div key={c.src} className="aspect-square rounded-[12px] overflow-hidden bg-[#e8e8ed]">
        <img src={c.src} alt="" loading="lazy" className="w-full h-full object-cover" />
      </div>
    ))}
  </div>
);

const CreativeVisual: React.FC = () => {
  const picks = [creatives[3], creatives[0], creatives[1]].filter(Boolean);
  return (
    <div className="relative w-full max-w-[460px] h-[260px] sm:h-[300px] mx-auto" aria-hidden="true">
      {picks.map((c, i) => (
        <div
          key={c.src}
          className="absolute top-1/2 left-1/2 w-[46%] aspect-square rounded-[18px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            transform: `translate(-50%, -50%) translateX(${(i - 1) * 62}%) rotate(${(i - 1) * 6}deg) scale(${i === 1 ? 1.08 : 0.94})`,
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          <img src={c.src} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

const serviceVisuals: Record<string, { dark: boolean; visual: React.ReactNode }> = {
  "paid-media": { dark: false, visual: <RoasVisual /> },
  tracking: { dark: true, visual: <TrackingVisual /> },
  social: { dark: false, visual: <SocialVisual /> },
  creative: { dark: true, visual: <CreativeVisual /> },
};

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  useScrollReveal();

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  const featured = caseStudies.filter((c) => c.featured).slice(0, 3);

  return (
    <main className="w-full pt-[52px]">
      {/* 1. Hero — light W + mountains artwork */}
      <section className="relative overflow-hidden bg-[#f1f3fb]" aria-labelledby="hero-heading">
        {/* Desktop: artwork fills the hero, text sits on the clear left side */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 right-0 left-[16%] bg-cover bg-no-repeat bg-[position:right_center]"
          style={{ backgroundImage: "url(/images/hero-bg-light.jpg)" }}
        />
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 bg-[linear-gradient(90deg,#f1f3fb_0%,#f1f3fb_16%,rgba(241,243,251,0.75)_30%,rgba(241,243,251,0)_52%)]"
        />

        <div className="relative px-[22px] lg:px-[8vw] pt-10 sm:pt-16 lg:pt-0 lg:min-h-[calc(125vh-52px)] lg:max-h-[1000px] lg:flex lg:items-center">
          <div className="text-center lg:text-left max-w-[600px] lg:max-w-none lg:w-[46%] mx-auto lg:mx-0 lg:py-24">
            <a
              href="/health-check"
              onClick={go("/health-check")}
              className="inline-flex items-center gap-2 rounded-full bg-white/85 border border-black/[0.06] pl-1.5 pr-3.5 py-1.5 text-[13px] sm:text-[14px] text-[#1d1d1f] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <span className="rounded-full bg-[#0071e3] text-white text-[11px] font-semibold px-2 py-0.5">Free</span>
              <span className="sm:hidden">Get your ad health score</span>
              <span className="hidden sm:inline">How healthy are your ads? Get your score</span>
              <span className="text-[#0066cc]" aria-hidden="true">›</span>
            </a>

            <p className="mt-6 sm:mt-8 text-[12px] sm:text-[15px] font-semibold uppercase tracking-[0.2em] text-[#0071e3]">
              Performance Marketing Strategist
            </p>
            <h1
              id="hero-heading"
              className="mt-3 sm:mt-4 text-[#1d1d1f] font-bold tracking-[-0.035em] leading-[1.05]"
              style={{ fontSize: "clamp(38px, 5.2vw, 80px)" }}
            >
              <span className="lg:whitespace-nowrap">Digital marketing</span>{" "}
              <br className="hidden lg:block" />
              <span className="lg:whitespace-nowrap">with a human touch.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-[17px] sm:text-[21px] leading-[1.47] text-[#424245] max-w-[34ch] mx-auto lg:mx-0">
              Meta, TikTok and Google Ads, built on clean tracking — so every rupee shows up as measurable revenue.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                size="lg"
                href="/contact"
                onClick={go("/contact")}
                className="shadow-[0_10px_28px_rgba(0,113,227,0.28)]"
              >
                Book a strategy call
                <span aria-hidden="true" className="ml-1.5">›</span>
              </Button>
              <Button size="lg" variant="secondaryLight" href="/work" onClick={go("/work")} className="bg-white/60">
                <svg width="11" height="13" viewBox="0 0 14 16" aria-hidden="true" className="inline -mt-0.5 mr-2">
                  <path d="M1 1.5v13l12-6.5z" fill="currentColor" />
                </svg>
                View selected work
              </Button>
            </div>

            <PlatformRow className="mt-7 sm:mt-11 justify-center lg:justify-start" />
          </div>
        </div>

        {/* Mobile & tablet: artwork as a banner under the text */}
        <div
          aria-hidden="true"
          className="lg:hidden relative mt-6 h-[300px] sm:h-[420px] bg-no-repeat bg-cover bg-[position:70%_center]"
          style={{ backgroundImage: "url(/images/hero-bg-light-mobile.jpg)" }}
        >
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f1f3fb] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Scroll cue (desktop) */}
        <div aria-hidden="true" className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-8">
          <div className="w-6 h-[38px] rounded-[13px] border-2 border-[#1d1d1f]/45 flex justify-center pt-[7px]">
            <div className="w-[3px] h-[7px] rounded-sm bg-[#1d1d1f]/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Numbers */}
      <section className="bg-white py-20 sm:py-28">
        <div className="ap-wrap grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 text-center reveal-on-scroll">
          {[
            { n: 35, label: "Brands scaled" },
            { n: 4, label: "Years in performance marketing" },
            { n: 5, label: "Countries" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-bold tracking-[-0.05em] leading-none text-[#1d1d1f]" style={{ fontSize: "clamp(64px, 8vw, 104px)" }}>
                <AnimatedCounter target={s.n} suffix="+" />
              </div>
              <p className="mt-3 text-[17px] text-[#6e6e73]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About — dark statement */}
      <section className="bg-black text-[#f5f5f7] ap-section" aria-label="About Chamod">
        <div className="ap-wrap-wide grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="reveal-on-scroll">
            <p className="ap-eyebrow text-[#a1a1a6] mb-3">About me</p>
            <h2 className="ap-headline">
              Hi, I'm Chamod.
              <br />
              <span className="text-[#86868b]">I make ad spend accountable.</span>
            </h2>
            <p className="mt-7 text-[19px] leading-[1.5] text-[#a1a1a6] max-w-[44ch]">
              I'm a results-driven digital marketer specialising in performance advertising and social media growth.
              I help brands scale with data-backed strategy across{" "}
              <span className="text-[#f5f5f7]">Meta, TikTok and Google Ads</span> — from Conversions API-perfect
              tracking to full-funnel campaign architecture.
            </p>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#424245] pt-8">
              {[
                { k: "Platforms", v: "Meta, TikTok & Google" },
                { k: "Tracking", v: "Server-side CAPI & GA4" },
                { k: "Focus", v: "ROI-led strategy" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[14px] text-[#a1a1a6]">{item.k}</dt>
                  <dd className="mt-1 text-[17px] font-semibold">{item.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              <ChevronLink dark href="/about" onClick={go("/about")}>
                Read the full story
              </ChevronLink>
              <ChevronLink dark href="/contact" onClick={go("/contact")}>
                Let's talk growth
              </ChevronLink>
            </div>
          </div>

          <div className="reveal-on-scroll">
            <ChamodPortrait dark />
          </div>
        </div>
      </section>

      {/* 4. Services — Apple homepage tiles */}
      <section className="bg-white p-3" aria-labelledby="services-heading">
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {services.map((svc) => {
            const v = serviceVisuals[svc.slug] ?? { dark: false, visual: null };
            return (
              <article
                key={svc.slug}
                className={`ap-tile sm:min-h-[680px] flex flex-col items-center text-center pt-14 px-6 pb-12 ${
                  v.dark ? "bg-black text-[#f5f5f7]" : "bg-[#f5f5f7] text-[#1d1d1f]"
                }`}
              >
                <p className={`text-[14px] font-semibold ${v.dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{svc.subtitle}</p>
                <h3 className="ap-title mt-2">{svc.title}</h3>
                <p className="text-[21px] sm:text-[24px] mt-2 tracking-[-0.015em]">{svc.promise}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-x-6">
                  <ChevronLink dark={v.dark} href="/services" onClick={go("/services")}>
                    Learn more
                  </ChevronLink>
                  {svc.proof && (
                    <ChevronLink dark={v.dark} href={svc.proof.href} onClick={go(svc.proof.href)}>
                      See proof
                    </ChevronLink>
                  )}
                </div>
                <div className="mt-auto pt-12 w-full">{v.visual}</div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5. Selected work */}
      <section className="bg-[#f5f5f7] ap-section">
        <div className="ap-wrap-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-on-scroll">
            <div>
              <p className="ap-eyebrow text-[#6e6e73] mb-3">Selected work</p>
              <h2 className="ap-headline max-w-[16ch]">Results you can verify.</h2>
            </div>
            <ChevronLink href="/work" onClick={go("/work")}>
              See all case studies
            </ChevronLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((study) => (
              <CaseCard key={study.slug} study={study} onClick={(slug) => onNavigate(`/work/${slug}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* 5b. Real results — screenshots from live ad accounts */}
      <section className="bg-black text-[#f5f5f7] ap-section">
        <div className="ap-wrap-wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal-on-scroll">
            <div>
              <p className="ap-eyebrow text-[#a1a1a6] mb-3">Real results</p>
              <h2 className="ap-headline max-w-[16ch]">
                Straight from the ad accounts.
                <span className="text-[#86868b]"> No mock-ups.</span>
              </h2>
            </div>
            <ChevronLink dark href="/portfolio" onClick={go("/portfolio")}>
              See all results and creatives
            </ChevronLink>
          </div>
          <ResultsGallery limit={4} dark />
        </div>
      </section>

      {/* 6. Ventures */}
      <section className="bg-white p-3" aria-labelledby="ventures-heading">
        <div className="text-center ap-wrap pt-20 sm:pt-28 pb-12 reveal-on-scroll">
          <p className="ap-eyebrow text-[#6e6e73] mb-3">Ventures</p>
          <h2 id="ventures-heading" className="ap-headline mx-auto max-w-[18ch]">
            Two studios. One growth engine.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {ventures.map((venture) => {
            const isSozo = venture.slug === "sozo-visuals";
            return (
              <article
                key={venture.slug}
                className={`ap-tile sm:min-h-[520px] flex flex-col items-center justify-center text-center px-8 py-16 ${
                  isSozo ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
                }`}
              >
                <h3
                  className="font-bold tracking-[-0.04em] leading-none"
                  style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
                >
                  {isSozo ? (
                    <>
                      SOZO<span className="text-[#F1BC25]"> Visuals</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="/logos/wegot-digital.png"
                        alt="WEGOT Digital — We Got Your Digital Covered"
                        className="mx-auto h-[150px] sm:h-[190px] w-auto"
                      />
                    </>
                  )}
                </h3>
                <p className={`mt-5 text-[19px] sm:text-[21px] max-w-[32ch] ${isSozo ? "text-[#a1a1a6]" : "text-[#424245]"}`}>
                  {venture.line}
                </p>
                <p className={`mt-2 text-[15px] ${isSozo ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{venture.role}</p>
                <div className="mt-8">
                  <Button
                    variant={isSozo ? "sozo" : "primary"}
                    href={venture.href}
                    onClick={go(venture.href)}
                  >
                    {venture.button}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7. Certified by */}
      <section className="bg-white pt-24 sm:pt-32 pb-6" aria-label="Certified by">
        <div className="ap-wrap text-center">
          <p className="text-[17px] text-[#6e6e73] mb-8">Certified by</p>
          <div className="flex justify-center">
            <CertifiedLogos />
          </div>
        </div>
      </section>

      {/* 8. Client logos */}
      <BrandLogosMarquee />

      {/* 9. CTA */}
      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
