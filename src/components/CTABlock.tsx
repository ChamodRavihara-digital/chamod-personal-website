import React from "react";
import { site } from "../../content/site";
import { Button } from "./Button";

interface CTABlockProps {
  headline?: string;
  subline?: string;
  onNavigate?: (href: string) => void;
  className?: string;
}

/** Full-bleed black closing section, Apple "statement" style. */
export const CTABlock: React.FC<CTABlockProps> = ({
  headline = "Spend that pays back.",
  subline = "Audits, conversion tracking setup and monthly performance retainers. Direct replies within 24 hours.",
  onNavigate,
  className = "",
}) => {
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <section className={`w-full bg-black text-[#f5f5f7] text-center ap-section ${className}`}>
      <div className="ap-wrap reveal-on-scroll">
        <p className="ap-eyebrow text-[#a1a1a6] mb-4 inline-flex items-center gap-2 justify-center">
          <span className="w-2 h-2 rounded-full bg-[#30d158]" aria-hidden="true" />
          {site.availability}
        </p>
        <h2 className="ap-hero mx-auto max-w-[14ch]">{headline}</h2>
        <p className="ap-sub text-[#a1a1a6] mt-6 mx-auto max-w-[36ch]">{subline}</p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="/contact" onClick={handleNav("/contact")}>
            Start a project
          </Button>
          <Button variant="secondary" size="lg" href={site.whatsapp} external>
            Message on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
