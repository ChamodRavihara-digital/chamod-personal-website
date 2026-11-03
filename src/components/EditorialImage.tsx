import React, { useState } from "react";
import { isTodo } from "../lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  aspectRatio?: "16/10" | "16/9" | "4/3" | "1/1" | "custom";
  className?: string;
  priority?: boolean;
  category?: string;
  client?: string;
  dark?: boolean;
}

/**
 * Image with a clean Apple-style fallback: when the file is missing,
 * a soft gradient panel shows the client name instead of a broken image.
 */
export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  aspectRatio = "16/10",
  className = "",
  category,
  client,
  dark = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "16/9"
      ? "aspect-[16/9]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "1/1"
      ? "aspect-square"
      : "";

  const displayClient = client && !isTodo(client) ? client : alt;

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${
        dark ? "bg-gradient-to-br from-[#2c2c2e] to-[#1d1d1f]" : "bg-gradient-to-br from-[#fbfbfd] to-[#e8e8ed]"
      } ${className}`}
    >
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {(hasError || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
          <div
            className={`font-semibold text-[22px] sm:text-[26px] tracking-[-0.025em] ${
              dark ? "text-[#f5f5f7]" : "text-[#1d1d1f]"
            }`}
          >
            {displayClient}
          </div>
          {category && !isTodo(category) && (
            <div className={`text-[14px] mt-1 ${dark ? "text-[#a1a1a6]" : "text-[#6e6e73]"}`}>{category}</div>
          )}
        </div>
      )}
    </div>
  );
};
