import React from "react";

interface SectionHeaderProps {
  /** Small coloured line above the headline (Apple's "eyebrow"). */
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode | null;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  /** Kept for backwards compatibility with older call sites. */
  number?: string;
  label?: string;
  theme?: "ink" | "bone";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
  className = "",
  label,
}) => {
  const eyebrowText = eyebrow ?? label;
  const centered = align === "center";

  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrowText && (
        <p className={`ap-eyebrow mb-3 ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{eyebrowText}</p>
      )}
      <h2 className={`ap-headline ${centered ? "mx-auto" : ""} max-w-[18ch] ${dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"}`}>
        {title}
      </h2>
      {intro && (
        <p
          className={`ap-sub mt-5 max-w-[34ch] ${centered ? "mx-auto" : ""} ${
            dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
};
