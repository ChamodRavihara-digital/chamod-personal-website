import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "../../content/site";
import { experience, principles, toolkit } from "../../content/experience";
import { education, certifications, Certification } from "../../content/credentials";
import { SectionHeader } from "../components/SectionHeader";
import { TimelineItem } from "../components/TimelineItem";
import { CTABlock } from "../components/CTABlock";
import { Button } from "../components/Button";
import { ChamodPortrait } from "../components/ChamodPortrait";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface AboutViewProps {
  onNavigate: (href: string) => void;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  const [year, month] = dateStr.split("-");
  if (!year || !month) return dateStr;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month, 10) - 1] || month} ${year}`;
};

const ALL_TABS = ["All", "Advertising", "Analytics", "Marketing", "Design", "Technology", "Licences"];

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  useScrollReveal();
  const [availableImages, setAvailableImages] = useState<Record<string, boolean>>({});
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("All");

  useEffect(() => {
    certifications.forEach((cert) => {
      if (!cert.image) return;
      const img = new Image();
      img.src = cert.image;
      img.onload = () => setAvailableImages((prev) => ({ ...prev, [cert.id]: true }));
      img.onerror = () => setAvailableImages((prev) => ({ ...prev, [cert.id]: false }));
    });
  }, []);

  useEffect(() => {
    if (!selectedCert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedCert(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedCert]);

  // Featured first (Google first among them), then newest
  const sortedCertifications = useMemo(
    () =>
      [...certifications].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.featured && b.featured) {
          const ag = a.issuer.toLowerCase().includes("google");
          const bg = b.issuer.toLowerCase().includes("google");
          if (ag !== bg) return ag ? -1 : 1;
        }
        return b.issued.localeCompare(a.issued);
      }),
    []
  );

  const isLicence = (c: Certification) => c.type.toLowerCase() === "licence" || c.category.toLowerCase() === "licences";
  const getTabCount = (tab: string) =>
    tab === "All" ? certifications.length : tab === "Licences" ? certifications.filter(isLicence).length : certifications.filter((c) => c.category === tab).length;
  const visibleTabs = ALL_TABS.filter((tab) => getTabCount(tab) > 0);
  const filteredCertifications = sortedCertifications.filter((cert) =>
    selectedTab === "All" ? true : selectedTab === "Licences" ? isLicence(cert) : cert.category === selectedTab
  );

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <main className="w-full pt-[52px]">
      {/* Hero */}
      <section className="bg-[#f5f5f7] pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="ap-wrap-wide grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="ap-eyebrow text-[#bf4800] mb-3">About</p>
            <h1 className="ap-hero max-w-[12ch]">Performance strategist based in Colombo.</h1>
            <p className="ap-sub text-[#424245] mt-6 max-w-[32ch]">
              Scaling brands across South Asia, Australia and the UK with clean data, creative testing and verified ROAS.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" href="/contact" onClick={go("/contact")}>
                Get in touch
              </Button>
              <Button size="lg" variant="secondaryLight" href={site.whatsapp} external>
                Chat on WhatsApp
              </Button>
            </div>
          </div>
          <ChamodPortrait />
        </div>
      </section>

      {/* Story */}
      <section className="bg-white ap-section">
        <div className="max-w-[760px] mx-auto px-[22px] reveal-on-scroll">
          <p className="text-[28px] sm:text-[32px] font-semibold leading-[1.25] tracking-[-0.025em]">
            I lead performance marketing across e-commerce retail, home appliance brands and high-growth ventures.
            <span className="text-[#6e6e73]">
              {" "}
              My work sits where money meets measurement: flawless tracking, ads that convert, and reports that match real bank balances.
            </span>
          </p>
          <div className="mt-10 space-y-6 text-[19px] leading-[1.6] text-[#424245]">
            <p>
              Too many ad accounts run on bad data: duplicate pixel events, broken Conversions APIs and inflated dashboard
              figures. Before increasing spend, I make sure every rupee, dollar or pound is accounted for through
              server-side tracking and GA4 validation.
            </p>
            <p>
              Alongside my in-house leadership at Supun Group of Companies, I founded WEGOT Digital to take on performance
              retainers internationally, and SOZO Visuals to produce ad creative and short-form video that stops the feed.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-[22px] bg-[#f5f5f7] p-8">
            <div>
              <dt className="text-[14px] text-[#6e6e73]">Location</dt>
              <dd className="mt-1 text-[17px] font-semibold">{site.location}</dd>
            </div>
            <div>
              <dt className="text-[14px] text-[#6e6e73]">Active markets</dt>
              <dd className="mt-1 text-[17px] font-semibold">{site.markets.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-[14px] text-[#6e6e73]">Email</dt>
              <dd className="mt-1 text-[17px]">
                <a href={`mailto:${site.email}`} className="text-[#0066cc] hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[14px] text-[#6e6e73]">Status</dt>
              <dd className="mt-1 text-[17px] font-semibold">{site.availability}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Principles — dark */}
      <section className="bg-black text-[#f5f5f7] ap-section">
        <div className="ap-wrap-wide">
          <SectionHeader dark align="center" eyebrow="How I work" title="Four principles. No exceptions." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll">
            {principles.map((pr, idx) => (
              <div key={pr.title} className="rounded-[22px] bg-[#1d1d1f] p-8">
                <div className="text-[48px] font-bold tracking-[-0.04em] leading-none text-[#424245]" aria-hidden="true">
                  {idx + 1}
                </div>
                <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.02em]">{pr.title}</h3>
                <p className="mt-2 text-[17px] text-[#a1a1a6] leading-snug">{pr.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white ap-section">
        <div className="ap-wrap">
          <SectionHeader eyebrow="Experience" title="Roles and ventures." />
          <div className="border-b border-[#d2d2d7]">
            {experience.map((item, idx) => (
              <TimelineItem
                key={item.org + item.role}
                period={item.period}
                role={item.role}
                org={item.org}
                summary={item.summary}
                highlights={item.highlights}
                defaultExpanded={idx === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <section className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="ap-wrap text-center">
          <h2 className="ap-title">The toolkit.</h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {toolkit.map((tool) => (
              <li key={tool} className="rounded-full bg-white px-5 py-3 text-[17px] text-[#1d1d1f]">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-white ap-section">
        <div className="ap-wrap-wide">
          <SectionHeader
            align="center"
            eyebrow="Credentials"
            title="Education and verified certifications."
            intro="Vendor credentials in advertising, analytics, marketing, design and cybersecurity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto mb-20">
            {education.map((edu) => (
              <div key={edu.title} className="rounded-[22px] bg-[#f5f5f7] p-8">
                <p className="text-[14px] text-[#6e6e73]">{edu.status}</p>
                <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.02em] leading-tight">{edu.title}</h3>
                {edu.institution && <p className="mt-1 text-[17px] text-[#424245]">{edu.institution}</p>}
              </div>
            ))}
          </div>

          {/* Segmented filter */}
          <div className="flex justify-center mb-10">
            <div
              role="tablist"
              aria-label="Filter certifications"
              className="inline-flex max-w-full overflow-x-auto scrollbar-none rounded-full bg-[#e8e8ed] p-1"
            >
              {visibleTabs.map((tab) => {
                const isActive = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedTab(tab)}
                    className={`min-h-[40px] px-4 sm:px-5 rounded-full text-[14px] whitespace-nowrap transition-all cursor-pointer ${
                      isActive ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : "text-[#424245] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {tab} <span className="text-[#6e6e73]">{getTabCount(tab)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertifications.map((cert) => {
              const hasImage = !!availableImages[cert.id];
              return (
                <article key={cert.id} className="rounded-[22px] bg-[#f5f5f7] p-7 flex flex-col">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6e6e73]">
                    {cert.issuer} · {cert.category}
                    {cert.featured && <span className="text-[#bf4800]"> · Featured</span>}
                  </p>
                  <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.02em] leading-snug">{cert.title}</h3>

                  <dl className="mt-4 space-y-1 text-[14px]">
                    <div className="flex justify-between gap-3">
                      <dt className="text-[#6e6e73]">Issued</dt>
                      <dd>{formatDate(cert.issued)}</dd>
                    </div>
                    {cert.expires && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6e6e73]">Expires</dt>
                        <dd>{formatDate(cert.expires)}</dd>
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6e6e73]">Credential ID</dt>
                        <dd className="truncate max-w-[160px]" title={cert.credentialId}>
                          {cert.credentialId}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-auto pt-5 flex flex-wrap items-center gap-x-6">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ap-chevron-link text-[#0066cc] !text-[15px]"
                    >
                      <span>Verify</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                    {hasImage && (
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="ap-chevron-link text-[#0066cc] !text-[15px] cursor-pointer"
                      >
                        <span>View certificate</span>
                        <span aria-hidden="true">›</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificate modal (only when an image exists) */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
            className="bg-white rounded-[22px] max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[14px] text-[#6e6e73]">{selectedCert.issuer}</p>
                <h3 className="text-[24px] font-semibold tracking-[-0.02em]">{selectedCert.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-[#e8e8ed] hover:bg-[#d2d2d7] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full h-auto object-contain max-h-[60vh] rounded-[12px] bg-[#f5f5f7]"
            />
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-[14px] text-[#6e6e73]">
                Issued {formatDate(selectedCert.issued)}
                {selectedCert.expires && ` · Expires ${formatDate(selectedCert.expires)}`}
              </p>
              <Button href={selectedCert.verifyUrl} external>
                Verify on {selectedCert.issuer}
              </Button>
            </div>
          </div>
        </div>
      )}

      <CTABlock onNavigate={onNavigate} />
    </main>
  );
};
