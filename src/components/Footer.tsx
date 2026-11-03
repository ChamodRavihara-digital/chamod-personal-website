import React, { useState, useEffect } from "react";
import { site } from "../../content/site";
import { isTodo } from "../lib/utils";

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenSEOModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSEOModal }) => {
  const [colomboTime, setColomboTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        setColomboTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Colombo",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setColomboTime("");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLink = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  const currentYear = new Date().getFullYear();
  const linkClass = "text-[#424245] hover:text-[#1d1d1f] hover:underline";

  const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      title: "Explore",
      links: [
        { label: "Selected Work", href: "/work" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
      ],
    },
    {
      title: "Ventures",
      links: [
        { label: "WEGOT Digital", href: "/wegot-digital" },
        { label: "SOZO Visuals", href: "/sozo-visuals" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Book a call", href: "/contact" },
        { label: "Free ad health check", href: "/health-check" },
        { label: "Email", href: `mailto:${site.email}`, external: true },
        { label: "WhatsApp", href: site.whatsapp, external: true },
        ...(!isTodo(site.socials.linkedin) ? [{ label: "LinkedIn", href: site.socials.linkedin, external: true }] : []),
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#f5f5f7] text-[12px] leading-[1.33] text-[#6e6e73]">
      <div className="max-w-[1024px] mx-auto px-[22px] pt-8 pb-6">
        <p className="pb-4 border-b border-[#d2d2d7]">
          {site.title}. {site.location}.
          {colomboTime && <> It's {colomboTime} in Colombo right now.</>} {site.availability}.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-6 border-b border-[#d2d2d7]">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-[#1d1d1f] text-[12px] tracking-normal mb-2">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={l.external ? undefined : handleLink(l.href)}
                      target={l.external && l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className={linkClass}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold text-[#1d1d1f] text-[12px] tracking-normal mb-2">Markets</h3>
            <ul className="space-y-2">
              {site.markets.map((m) => (
                <li key={m} className="text-[#424245]">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span>
            Copyright © {currentYear} {site.name}. All rights reserved.
          </span>
          {onOpenSEOModal && (
            <button
              type="button"
              onClick={onOpenSEOModal}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[#424245] hover:text-[#1d1d1f] cursor-pointer"
              title="Inspect daily automated SEO & sitemap status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a9e4b]" aria-hidden="true" />
              <span className="hover:underline">Auto-SEO status</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
