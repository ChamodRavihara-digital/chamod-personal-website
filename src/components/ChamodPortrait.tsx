import React, { useState } from "react";
import { site } from "../../content/site";

interface ChamodPortraitProps {
  className?: string;
  dark?: boolean;
}

/**
 * Portrait in a clean rounded frame. Uses /myphoto.jpg; if the file is
 * missing, shows a quiet monogram panel instead of a broken image.
 */
export const ChamodPortrait: React.FC<ChamodPortraitProps> = ({ className = "", dark = false }) => {
  const [imgError, setImgError] = useState(false);
  const initials = site.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className={`w-full max-w-[460px] mx-auto ${className}`}>
      <div
        className={`relative aspect-[4/5] w-full rounded-[28px] overflow-hidden ${
          dark ? "bg-[#1d1d1f]" : "bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        }`}
      >
        {!imgError ? (
          <img
            src="/myphoto.jpg"
            alt={`${site.name} — ${site.title}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <div
              className={`w-36 h-36 rounded-full flex items-center justify-center text-[52px] font-bold tracking-[-0.04em] ${
                dark ? "bg-[#2c2c2e] text-[#f5f5f7]" : "bg-[#f5f5f7] text-[#1d1d1f]"
              }`}
            >
              {initials}
            </div>
            <p className={`mt-5 text-[21px] font-semibold tracking-[-0.02em] ${dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}`}>
              {site.name}
            </p>
            <p className={`text-[15px] ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{site.title}</p>
          </div>
        )}
      </div>
    </figure>
  );
};
