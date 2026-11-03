import React from "react";
import { site } from "../../content/site";

interface WordmarkProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  dark?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({ className = "", onClick, dark = false }) => {
  return (
    <a
      href="/"
      onClick={onClick}
      className={`inline-flex items-center font-semibold text-[17px] tracking-[-0.03em] transition-opacity hover:opacity-70 ${
        dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"
      } ${className}`}
      aria-label={`${site.name} — Home`}
    >
      <span>{site.name}</span>
    </a>
  );
};
