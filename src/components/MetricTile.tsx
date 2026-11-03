import React from "react";
import { isTodo, cleanString } from "../lib/utils";

interface MetricTileProps {
  value: string | null | undefined;
  label: string;
  detail?: string | null | undefined;
  className?: string;
  size?: "large" | "medium";
  dark?: boolean;
  gradient?: boolean;
  /** Kept for backwards compatibility. */
  theme?: "ink" | "bone";
}

export const MetricTile: React.FC<MetricTileProps> = ({
  value,
  label,
  detail,
  className = "",
  size = "large",
  dark = false,
  gradient = false,
}) => {
  if (isTodo(value) || !value) return null;
  const cleanDetail = cleanString(detail);

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`font-bold tabular-nums tracking-[-0.04em] leading-none ${
          gradient ? "ap-gradient-text" : dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"
        }`}
        style={{ fontSize: size === "large" ? "clamp(56px, 7vw, 96px)" : "clamp(40px, 4.6vw, 60px)" }}
      >
        {String(value).trim()}
      </div>
      <div className={`mt-3 text-[17px] font-semibold ${dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}`}>{label}</div>
      {cleanDetail && (
        <div className={`mt-1 text-[14px] leading-snug ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>
          {cleanDetail}
        </div>
      )}
    </div>
  );
};
