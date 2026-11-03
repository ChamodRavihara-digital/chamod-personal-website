import React, { useState, useEffect } from "react";

export const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem("chamod_consent");
    } catch {
      consent = null;
    }
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (value: "granted" | "denied") => {
    try {
      localStorage.setItem("chamod_consent", value);
    } catch {
      /* storage unavailable — just hide */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Privacy and cookies"
      className="fixed bottom-24 left-5 right-5 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-[380px] z-60 rounded-[18px] p-5 bg-[rgba(251,251,253,0.9)] backdrop-blur-[20px] backdrop-saturate-[180%] border border-black/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.12)] animate-fadeIn"
    >
      <p className="text-[14px] font-semibold text-[#1d1d1f]">Privacy &amp; measurement</p>
      <p className="mt-1 text-[14px] leading-snug text-[#6e6e73]">
        This site uses minimal measurement to evaluate campaigns and analytics. No personal profiling.
      </p>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => save("denied")}
          className="min-h-[36px] px-4 rounded-full text-[14px] text-[#0066cc] hover:underline cursor-pointer"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => save("granted")}
          className="min-h-[36px] px-4 rounded-full text-[14px] bg-[#0071e3] hover:bg-[#0077ed] text-white cursor-pointer"
        >
          Accept
        </button>
      </div>
    </aside>
  );
};
