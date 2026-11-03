import React, { useRef, useEffect } from "react";
import { site } from "../../content/site";
import { Button } from "../components/Button";
import { CTABlock } from "../components/CTABlock";
import { VideoShowcase } from "../components/VideoCard";
import { videos } from "../../content/proof";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface SozoVisualsViewProps {
  onNavigate: (href: string) => void;
}

const deliverables = [
  {
    title: "Reels & short-form",
    line: "9:16 vertical edits for Instagram Reels and TikTok, with fast pacing and strong opening hooks.",
  },
  {
    title: "Product films",
    line: "Crisp studio and lifestyle footage that shows craftsmanship, features and real value.",
  },
  {
    title: "Ad creative variants",
    line: "Multiple hooks, callouts and formats, ready for proper paid-ad testing.",
  },
];

export const SozoVisualsView: React.FC<SozoVisualsViewProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollReveal();

  // Play the reel only while it's on screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause())),
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="w-full pt-[52px] bg-black text-[#f5f5f7]">
      {/* Sub nav */}
      <div className="sticky top-[52px] z-30 bg-[rgba(22,22,23,0.8)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-white/[0.12]">
        <div className="ap-wrap h-[52px] flex items-center justify-between gap-4">
          <span className="text-[21px] font-semibold tracking-[-0.02em]">
            SOZO <span className="text-[#F1BC25]">Visuals</span>
          </span>
          <a
            href="/contact"
            onClick={go("/contact")}
            className="inline-flex items-center rounded-full bg-[#F1BC25] hover:bg-[#dfab1b] text-black text-[12px] font-medium px-3.5 py-[5px]"
          >
            Book
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="text-center pt-20 sm:pt-28">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#F1BC25] mb-3">Motion · Media · Production</p>
          <h1 className="font-bold tracking-[-0.045em] leading-none" style={{ fontSize: "clamp(56px, 11vw, 140px)" }}>
            SOZO Visuals.
          </h1>
          <p className="ap-sub text-[#a1a1a6] mt-7 mx-auto max-w-[30ch]">
            Reels, product films and ad creative built to stop the scroll — and convert.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="sozo" href="/contact" onClick={go("/contact")}>
              Book a video package
            </Button>
            <Button size="lg" variant="secondary" href={site.whatsapp} external>
              Ask on WhatsApp
            </Button>
          </div>
        </div>

        {/* Reel */}
        <div className="ap-wrap-wide mt-16 sm:mt-20">
          <div className="mx-auto max-w-[1100px] rounded-[28px] overflow-hidden bg-[#1d1d1f] aspect-video">
            <video
              ref={videoRef}
              src="/video/tiktok-ads-promo.mp4"
              poster="/images/tiktok-ads-poster.jpg"
              aria-label="SOZO Visuals showreel preview"
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="text-center ap-section">
        <div className="ap-wrap reveal-on-scroll">
          <p className="ap-headline mx-auto max-w-[18ch]">
            Video made for paid feeds.
            <span className="text-[#86868b]"> Not for the shelf.</span>
          </p>
          <p className="ap-sub text-[#a1a1a6] mt-6 mx-auto max-w-[36ch]">
            High-contrast, attention-holding short-form video designed for Meta, TikTok and Instagram ads.
          </p>
        </div>
      </section>

      {/* Reels */}
      <section id="reels" className="scroll-mt-[104px] pb-24 sm:pb-32">
        <div className="ap-wrap-wide">
          <div className="mb-12 reveal-on-scroll">
            <h2 className="ap-title">Recent work.</h2>
            <p className="mt-3 text-[19px] text-[#a1a1a6] max-w-[52ch]">
              Storytelling reels, motion-graphics showreels and short ad creative. Tap play to watch with sound.
            </p>
          </div>
          <VideoShowcase videos={videos} />
        </div>
      </section>

      {/* Deliverables */}
      <section className="pb-24 sm:pb-32">
        <div className="ap-wrap-wide grid grid-cols-1 md:grid-cols-3 gap-4 reveal-on-scroll">
          {deliverables.map((d, i) => (
            <article key={d.title} className="rounded-[28px] bg-[#1d1d1f] p-8 sm:p-10">
              <div className="text-[48px] font-bold tracking-[-0.04em] leading-none text-[#F1BC25]" aria-hidden="true">
                {i + 1}
              </div>
              <h2 className="mt-6 text-[24px] font-semibold tracking-[-0.02em]">{d.title}</h2>
              <p className="mt-3 text-[17px] text-[#a1a1a6] leading-snug">{d.line}</p>
            </article>
          ))}
        </div>
      </section>

      <CTABlock
        headline="Ad creative that actually sells."
        subline="Monthly video production slots and campaign creative packages."
        onNavigate={onNavigate}
        className="border-t border-[#424245]"
      />
    </main>
  );
};
