import React, { useState } from "react";
import { results, creatives } from "../../content/proof";
import { Lightbox, LightboxItem } from "./Lightbox";

const resultItems: LightboxItem[] = results.map((r) => ({
  src: r.src,
  alt: `${r.title} — ad account screenshot`,
  title: r.title,
  caption: [r.figure && `${r.figure} ${r.figureLabel}.`, r.line].filter(Boolean).join(" "),
}));

/** Cards of real ad-account screenshots. Click to open full size. */
export const ResultsGallery: React.FC<{ limit?: number; dark?: boolean }> = ({ limit, dark = false }) => {
  const [open, setOpen] = useState<number | null>(null);
  const list = typeof limit === "number" ? results.slice(0, limit) : results;

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {list.map((r, i) => (
          <li key={r.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`group w-full text-left rounded-[22px] overflow-hidden flex flex-col cursor-zoom-in transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(0,0,0,0.14)] ${
                dark ? "bg-[#1d1d1f] text-[#f5f5f7]" : "bg-white text-[#1d1d1f]"
              }`}
            >
              <div className="relative aspect-[943/561] bg-white overflow-hidden border-b border-black/[0.06]">
                <img
                  src={r.src}
                  alt={`${r.title} — ad account screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:p-7 flex flex-col-reverse sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
                <div className="min-w-0">
                  <p className={`text-[12px] font-semibold uppercase tracking-[0.04em] ${dark ? "text-[#a1a1a6]" : "text-[#bf4800]"}`}>
                    {r.tag}
                  </p>
                  <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.02em] leading-snug">{r.title}</h3>
                  <p className={`mt-1 text-[15px] leading-snug ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{r.line}</p>
                </div>
                {r.figure && (
                  <div className="sm:text-right shrink-0">
                    <div className="text-[36px] sm:text-[40px] font-bold tracking-[-0.04em] leading-none tabular-nums">
                      {r.figure}
                    </div>
                    <div className={`mt-1 text-[13px] ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{r.figureLabel}</div>
                  </div>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={resultItems.slice(0, list.length)} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </>
  );
};

const creativeItems: LightboxItem[] = creatives.map((c) => ({ src: c.src, alt: c.alt, title: c.client }));

/** Square grid of published social / ad creatives. Click to open full size. */
export const CreativesGrid: React.FC<{ limit?: number; dark?: boolean }> = ({ limit, dark = false }) => {
  const [open, setOpen] = useState<number | null>(null);
  const list = typeof limit === "number" ? creatives.slice(0, limit) : creatives;

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {list.map((c, i) => (
          <li key={c.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left cursor-zoom-in"
              aria-label={`Open creative: ${c.alt}`}
            >
              <div className="aspect-square rounded-[18px] overflow-hidden bg-[#e8e8ed]">
                <img
                  src={c.src}
                  alt={c.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className={`mt-2.5 px-1 text-[14px] ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{c.client}</p>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={creativeItems.slice(0, list.length)} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </>
  );
};
