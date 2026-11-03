import React from "react";
import { clients } from "../../content/proof";

/** Scrolling strip of real client logos (from content/proof.ts). */
export const BrandLogosMarquee: React.FC<{ className?: string; title?: string }> = ({
  className = "",
  title = "Trusted by brands in Sri Lanka, Australia and Italy.",
}) => {
  // Duplicated once so the loop is seamless (animation moves -50%)
  const marqueeList = [...clients, ...clients];

  return (
    <div className={`w-full bg-white py-14 sm:py-16 overflow-hidden relative ${className}`}>
      <p className="ap-wrap text-center text-[17px] text-[#6e6e73] mb-8">{title}</p>

      {/* Screen-reader list of clients (the moving strip is decorative) */}
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.name}>
            {c.name} — {c.industry}
          </li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="relative w-full overflow-hidden" aria-hidden="true">
        <div className="animate-marquee flex items-center gap-4 sm:gap-5">
          {marqueeList.map((c, index) => (
            <div
              key={`${c.name}-${index}`}
              title={`${c.name} — ${c.industry}`}
              style={c.bg ? { background: c.bg } : undefined}
              className={`shrink-0 w-[168px] h-[84px] sm:w-[200px] sm:h-[100px] rounded-[18px] overflow-hidden ${
                c.dark ? "bg-[#1d1d1f]" : "bg-white border border-black/[0.06]"
              }`}
            >
              <img src={c.src} alt="" loading="lazy" className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Static grid of client logos with names, for the Work page. */
export const ClientLogoGrid: React.FC = () => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
    {clients.map((c) => (
      <li key={c.name} className="rounded-[22px] bg-white p-3 sm:p-4 flex flex-col">
        <div
          className={`aspect-[2/1] rounded-[14px] overflow-hidden ${c.dark ? "bg-[#1d1d1f]" : "bg-white"}`}
          style={c.bg ? { background: c.bg } : undefined}
        >
          <img src={c.src} alt={`${c.name} logo`} loading="lazy" className="w-full h-full object-contain" />
        </div>
        <p className="mt-3 px-1 text-[15px] font-semibold leading-tight">{c.name}</p>
        <p className="px-1 text-[13px] text-[#6e6e73] leading-snug">{c.industry}</p>
      </li>
    ))}
  </ul>
);
