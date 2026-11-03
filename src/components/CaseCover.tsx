import React, { useState } from "react";
import { CaseStudy } from "../../content/work";
import { clients } from "../../content/proof";
import { isTodo } from "../lib/utils";

/** Soft Apple-style tint per category, used when there's no cover photo or logo. */
const tints: Record<string, { bg: string; fg: string; sub: string }> = {
  "E-commerce": { bg: "linear-gradient(135deg,#fff4e5 0%,#ffe1c2 100%)", fg: "#1d1d1f", sub: "#8a4b00" },
  Tracking: { bg: "linear-gradient(135deg,#e8f2ff 0%,#cfe3ff 100%)", fg: "#1d1d1f", sub: "#0058b0" },
  "Lead generation": { bg: "linear-gradient(135deg,#eef9f0 0%,#d2f0da 100%)", fg: "#1d1d1f", sub: "#1a7a3c" },
  Brand: { bg: "linear-gradient(135deg,#f4eeff 0%,#e2d6ff 100%)", fg: "#1d1d1f", sub: "#5b3db5" },
  Video: { bg: "linear-gradient(135deg,#2c2c2e 0%,#000 100%)", fg: "#f5f5f7", sub: "#F1BC25" },
};

const findLogo = (client: string) => {
  const key = client.toLowerCase().replace(/\s+/g, "");
  return clients.find((c) => {
    const n = c.name.toLowerCase().replace(/\s+/g, "");
    return n === key || n.startsWith(key) || key.startsWith(n);
  });
};

interface CaseCoverProps {
  study: CaseStudy;
  aspect?: string;
  className?: string;
  large?: boolean;
}

/**
 * Cover for a case study, in order of preference:
 * 1. the real cover photo (study.cover), if the file exists
 * 2. the client's logo from content/proof.ts
 * 3. a tinted typographic cover with the headline result
 */
export const CaseCover: React.FC<CaseCoverProps> = ({ study, aspect = "aspect-[16/10]", className = "", large = false }) => {
  const [photoOk, setPhotoOk] = useState<boolean | null>(null);
  const displayClient = isTodo(study.client) ? study.industry : study.client;
  const logo = isTodo(study.client) ? undefined : findLogo(study.client);
  const tint = tints[study.category] ?? tints.Brand;

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {/* Fallback layer (always rendered underneath; the photo covers it when it loads) */}
      {logo ? (
        <div
          className={`absolute inset-0 flex items-center justify-center ${logo.dark ? "bg-[#1d1d1f]" : "bg-white"}`}
          style={logo.bg ? { background: logo.bg } : undefined}
        >
          <img
            src={logo.src}
            alt={`${logo.name} logo`}
            className={`object-contain ${large ? "w-[55%] max-w-[560px]" : "w-[78%]"} h-auto`}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" style={{ background: tint.bg }}>
          <div
            className="font-bold tracking-[-0.045em] leading-none tabular-nums"
            style={{ color: tint.fg, fontSize: large ? "clamp(72px, 12vw, 160px)" : "clamp(56px, 7vw, 76px)" }}
          >
            {study.headlineMetric.value}
          </div>
          <div className={`mt-2 font-semibold ${large ? "text-[21px]" : "text-[15px]"}`} style={{ color: tint.sub }}>
            {study.headlineMetric.label} · {displayClient}
          </div>
        </div>
      )}

      {photoOk !== false && (
        <img
          src={study.cover}
          alt={study.title}
          loading="lazy"
          onLoad={() => setPhotoOk(true)}
          onError={() => setPhotoOk(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${photoOk ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};
