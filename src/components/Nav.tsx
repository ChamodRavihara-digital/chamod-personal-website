import React, { useState, useEffect, useRef } from "react";
import { site } from "../../content/site";
import { Wordmark } from "./Wordmark";

interface NavProps {
  currentPath: string;
  onNavigate: (href: string) => void;
}

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Health Check", href: "/health-check" },
];

const ventureLinks = [
  { label: "WEGOT Digital", line: "Performance agency", href: "/wegot-digital" },
  { label: "SOZO Visuals", line: "Video content studio", href: "/sozo-visuals" },
];

export const Nav: React.FC<NavProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [venturesOpen, setVenturesOpen] = useState(false);
  const venturesRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close ventures flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (venturesRef.current && !venturesRef.current.contains(event.target as Node)) {
        setVenturesOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVenturesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const openVentures = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVenturesOpen(true);
  };
  const closeVenturesSoon = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVenturesOpen(false), 200);
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMobileMenuOpen(false);
    setVenturesOpen(false);
    onNavigate(href);
  };

  const isVentureActive = currentPath.includes("wegot") || currentPath.includes("sozo");
  const linkClass = (active: boolean) =>
    `text-[12px] tracking-[-0.01em] px-2.5 py-3 transition-colors ${
      active ? "text-[#1d1d1f]" : "text-[#1d1d1f]/80 hover:text-[#1d1d1f]"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="bg-[rgba(251,251,253,0.8)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/[0.08]">
          <div className="max-w-[1024px] mx-auto px-[22px] h-[52px] flex items-center justify-between">
            <Wordmark onClick={handleLinkClick("/")} />

            {/* Desktop links */}
            <nav className="hidden md:flex items-center" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href || (link.href === "/work" && currentPath.startsWith("/work/"));
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={linkClass(isActive)}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div
                ref={venturesRef}
                onMouseEnter={openVentures}
                onMouseLeave={closeVenturesSoon}
                className="relative"
              >
                <button
                  type="button"
                  aria-expanded={venturesOpen}
                  aria-haspopup="true"
                  onClick={() => setVenturesOpen((v) => !v)}
                  className={`${linkClass(isVentureActive)} cursor-pointer`}
                >
                  Ventures
                </button>
              </div>

              <a
                href="/contact"
                onClick={handleLinkClick("/contact")}
                aria-current={currentPath === "/contact" ? "page" : undefined}
                className={linkClass(currentPath === "/contact")}
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-1">
              <a
                href="/contact"
                onClick={handleLinkClick("/contact")}
                className="inline-flex items-center rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[12px] px-3.5 py-[5px] transition-colors"
              >
                Book a call
              </a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-11 h-11 -mr-3 flex items-center justify-center text-[#1d1d1f]"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 6.5h14M2 11.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Ventures flyout — full-width, Apple-style */}
        <div
          onMouseEnter={openVentures}
          onMouseLeave={closeVenturesSoon}
          className={`hidden md:block absolute left-0 right-0 top-[52px] bg-[rgba(251,251,253,0.94)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/[0.08] transition-all duration-300 origin-top ${
            venturesOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <div className="max-w-[1024px] mx-auto px-[22px] pt-8 pb-12 grid grid-cols-3 gap-10">
            <div className="col-span-2">
              <p className="ap-caption text-[#6e6e73] mb-3">Ventures</p>
              <ul className="space-y-2">
                {ventureLinks.map((v) => (
                  <li key={v.href}>
                    <a
                      href={v.href}
                      onClick={handleLinkClick(v.href)}
                      className="block text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f] hover:text-[#0066cc] transition-colors"
                    >
                      {v.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ap-caption text-[#6e6e73] mb-3">What they do</p>
              <ul className="space-y-2.5 text-[12px] text-[#1d1d1f]">
                {ventureLinks.map((v) => (
                  <li key={v.href}>
                    <span className="font-semibold">{v.label}</span> — {v.line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Dim page behind the flyout */}
      <div
        aria-hidden="true"
        className={`hidden md:block fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          venturesOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-[#fbfbfd] flex flex-col overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="h-[52px] px-[22px] flex items-center justify-between shrink-0">
            <Wordmark onClick={handleLinkClick("/")} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 -mr-3 flex items-center justify-center text-[#1d1d1f]"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="px-12 pt-6 flex flex-col" aria-label="Mobile navigation">
            {[{ label: "Home", href: "/" }, ...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                aria-current={currentPath === link.href ? "page" : undefined}
                className={`py-1.5 text-[28px] font-semibold tracking-[-0.02em] ${
                  currentPath === link.href ? "text-[#1d1d1f]" : "text-[#1d1d1f]/85"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="px-12 pt-8">
            <p className="ap-caption text-[#6e6e73] mb-2">Ventures</p>
            {ventureLinks.map((v) => (
              <a
                key={v.href}
                href={v.href}
                onClick={handleLinkClick(v.href)}
                className="block py-1.5 text-[15px] font-semibold text-[#1d1d1f]"
              >
                {v.label}
              </a>
            ))}
          </div>

          <div className="mt-auto px-[22px] pt-10 pb-10 flex flex-col gap-3">
            <a
              href="/contact"
              onClick={handleLinkClick("/contact")}
              className="flex items-center justify-center min-h-[50px] rounded-full bg-[#0071e3] text-white text-[17px]"
            >
              Book a strategy call
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-h-[50px] rounded-full bg-[#e8e8ed] text-[#1d1d1f] text-[17px]"
            >
              WhatsApp {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
