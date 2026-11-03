import React, { useState, useEffect } from "react";
import { X, Send, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [hasAnimatedEntry, setHasAnimatedEntry] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [imgError, setImgError] = useState(false);

  const defaultWhatsappUrl =
    "https://wa.me/94770675710?text=Hi%20Chamod%2C%20I%20would%20like%20to%20discuss%20a%20performance%20marketing%20project.";

  useEffect(() => {
    // 5-second entry delay as requested:
    // When a user lands on the site, wait 5 seconds, then enter with a smooth spring animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto-open the chat card only on larger screens, and not on pages with their own lead form.
      let consented = false;
      try {
        consented = !!localStorage.getItem("chamod_consent");
      } catch {
        consented = false;
      }
      const bigScreen = window.matchMedia("(min-width: 1024px)").matches;
      const quietPage = ["/contact", "/health-check"].includes(window.location.pathname);
      setShowCard(consented && bigScreen && !quietPage);
      setHasAnimatedEntry(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismissCard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCard(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // If card is hidden, clicking button opens the conversion card or toggles
    setUnreadBadge(false);
    if (!showCard) {
      e.preventDefault();
      setShowCard(true);
    }
  };

  const quickPrompts = [
    {
      label: "Scale my Meta & Google Ads 🚀",
      text: "Hi Chamod, I want to scale my paid advertising and improve ROAS for my brand.",
    },
    {
      label: "Conversions API / Tracking Audit 🔍",
      text: "Hi Chamod, I need help with server-side Conversions API, GA4, and pixel tracking setup.",
    },
    {
      label: "Quick Growth Consultation 💬",
      text: "Hi Chamod, I'd like to book a quick growth consultation to discuss our marketing strategy.",
    },
  ];

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 flex flex-col items-end pointer-events-none select-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-75 pointer-events-none"
      }`}
    >
      {/* High-Converting Interactive Chat Card */}
      <div
        className={`pointer-events-auto mb-3 transition-all duration-400 ease-out origin-bottom-right ${
          showCard
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Direct message prompt"
      >
        <div className="bg-[#1d1d1f] text-white border border-[#3a3a3c] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] max-w-[320px] sm:max-w-[340px] text-[13px] relative overflow-hidden backdrop-blur-xl">
          {/* Card Top Brand Strip */}
          <div className="bg-[#2c2c2e] px-4 py-3.5 border-b border-[#3a3a3c] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#25D366] bg-[#0071e3] shrink-0 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src="/myphoto.jpg"
                    alt="Chamod Ravihara"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="font-sans font-black text-white text-[14px]">CR</span>
                )}
                {/* Active indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#1d1d1f]" />
              </div>

              <div>
                <div className="font-semibold text-white text-[14px] flex items-center gap-1.5 leading-tight">
                  <span>Chamod Ravihara</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                </div>
                <div className="text-[11px] text-[#A3B8B8] font-mono mt-0.5">
                  Performance Strategist • Online
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={handleDismissCard}
              className="text-[#a1a1a6] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close conversation prompt"
            >
              <X size={16} />
            </button>
          </div>

          {/* Conversational Message Bubble */}
          <div className="p-4 space-y-3.5 bg-[#082424]/70">
            <div className="bg-[#2c2c2e] p-3.5 rounded-[14px] rounded-tl-sm border border-[#3a3a3c] text-[13px] leading-relaxed text-[#E0E7E7] shadow-xs">
              <p>
                Hey there! 👋 Looking to scale your ad performance or get an audit on your marketing?
              </p>
              <p className="mt-2 text-[#2997ff] font-medium text-[12px] flex items-center gap-1">
                <Sparkles size={13} /> Tap below to chat directly with me on WhatsApp:
              </p>
            </div>

            {/* Quick 1-Click CTA Prompts */}
            <div className="space-y-1.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#A3B8B8] font-semibold">
                Quick Select:
              </div>
              {quickPrompts.map((p, idx) => {
                const targetUrl = `https://wa.me/94770675710?text=${encodeURIComponent(p.text)}`;
                return (
                  <a
                    key={idx}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/item flex items-center justify-between p-2.5 rounded-[10px] bg-[#2c2c2e]/80 hover:bg-[#154646] border border-[#3a3a3c] hover:border-[#25D366]/50 transition-all text-[12px] text-white"
                  >
                    <span className="truncate pr-2">{p.label}</span>
                    <ArrowRight
                      size={13}
                      className="text-[#25D366] opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0"
                    />
                  </a>
                );
              })}
            </div>

            {/* Direct Send CTA Button */}
            <a
              href={defaultWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-[44px] rounded-[12px] bg-[#25D366] hover:bg-[#20ba5a] text-[#073816] font-semibold text-[13px] transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_rgba(37,211,102,0.35)]"
            >
              <Send size={15} />
              <span>Start Direct WhatsApp Chat</span>
            </a>

            {/* Response time guarantee */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#A3B8B8] pt-1">
              <span>⚡ Typically replies in &lt; 15 mins</span>
              <span className="text-[#25D366] font-medium">+94 77 067 5710</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Floating Trigger Button */}
      <a
        href={showCard ? defaultWhatsappUrl : "#"}
        onClick={handleButtonClick}
        target={showCard ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={`pointer-events-auto group relative flex items-center gap-2.5 sm:gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#073816] font-semibold px-4 sm:px-5 h-[50px] sm:h-[54px] rounded-full shadow-[0_8px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.05] active:scale-[0.96] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#25D366] ${
          hasAnimatedEntry && !showCard ? "animate-pulse" : ""
        }`}
        aria-label="Contact Chamod Ravihara on WhatsApp"
      >
        {/* Unread Message Pill Badge */}
        {unreadBadge && (
          <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2997ff] text-[#1d1d1f] font-extrabold text-[10px] shadow-md border-2 border-[#1d1d1f] animate-bounce">
            1
          </span>
        )}

        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#25D366]" />
        </div>

        {/* Text Label */}
        <span className="text-[14px] sm:text-[15px] tracking-[-0.01em] whitespace-nowrap">
          {showCard ? "Close Chat" : "Chat on WhatsApp"}
        </span>
      </a>
    </aside>
  );
};
