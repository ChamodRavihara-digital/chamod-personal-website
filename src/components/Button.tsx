import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * primary        – solid blue pill (main action, on light or dark)
   * secondary      – outlined pill for DARK sections
   * secondaryLight – outlined blue pill for LIGHT sections
   * ctaPrimary     – same as primary (kept for compatibility)
   * ctaSecondary   – same as secondaryLight (kept for compatibility)
   * inverse        – light pill on dark sections
   * sozo           – SOZO yellow pill, black text
   */
  variant?: "primary" | "secondary" | "secondaryLight" | "ctaPrimary" | "ctaSecondary" | "inverse" | "sozo";
  size?: "md" | "lg";
  href?: string;
  external?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  external,
  withArrow = false,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const sizeClasses =
    size === "lg"
      ? "min-h-[50px] px-7 text-[17px]"
      : "min-h-[44px] px-[22px] text-[17px]";

  const baseClasses = `inline-flex items-center justify-center gap-1.5 rounded-full font-normal tracking-[-0.022em] whitespace-nowrap transition-colors duration-200 select-none group disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses}`;

  let variantClasses = "";
  switch (variant) {
    case "primary":
    case "ctaPrimary":
      variantClasses = "bg-[#0071e3] text-white hover:bg-[#0077ed]";
      break;
    case "secondary":
      variantClasses = "border border-[#2997ff] text-[#2997ff] hover:bg-[#2997ff] hover:text-black";
      break;
    case "secondaryLight":
    case "ctaSecondary":
      variantClasses = "border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3] hover:text-white";
      break;
    case "inverse":
      variantClasses = "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-white";
      break;
    case "sozo":
      variantClasses = "bg-[#F1BC25] text-black font-medium hover:bg-[#dfab1b]";
      break;
  }

  const content = (
    <>
      <span>{children}</span>
      {(withArrow || external) && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick} {...props}>
      {content}
    </button>
  );
};

/** Apple-style "Learn more ›" text link. */
export const ChevronLink: React.FC<{
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  dark?: boolean;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ href, onClick, dark, external, children, className = "" }) => (
  <a
    href={href}
    onClick={onClick}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={`ap-chevron-link ${dark ? "text-[#2997ff]" : "text-[#0066cc]"} ${className}`}
  >
    <span>{children}</span>
    <span aria-hidden="true" className="text-[1.1em] leading-none">›</span>
  </a>
);
