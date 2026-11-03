import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

/** Full-screen image viewer with keyboard (←, →, Esc) support. */
export const Lightbox: React.FC<LightboxProps> = ({ items, index, onClose, onChange }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && items[index];

  useEffect(() => {
    if (index === null) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [index, items.length, onClose, onChange]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || item.alt}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-14 shrink-0 text-[#a1a1a6] text-[14px]">
        <span>
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16 relative">
        <img
          src={item.src}
          alt={item.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-full object-contain rounded-[12px]"
        />
        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                onChange((index - 1 + items.length) % items.length);
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                onChange((index + 1) % items.length);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {(item.title || item.caption) && (
        <div className="shrink-0 px-6 py-5 text-center" onClick={(e) => e.stopPropagation()}>
          {item.title && <p className="text-[17px] font-semibold text-white">{item.title}</p>}
          {item.caption && <p className="mt-1 text-[15px] text-[#a1a1a6] max-w-[60ch] mx-auto">{item.caption}</p>}
        </div>
      )}
    </div>
  );
};
