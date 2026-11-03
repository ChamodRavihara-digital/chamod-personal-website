import React from "react";

export const CertifiedLogos: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
      {/* 1. Google (Official Multi-Color Wordmark & Icon) */}
      <div
        className="flex items-center gap-2 group transition-transform hover:scale-105"
        title="Google Ads & Analytics Certified"
      >
        <svg className="h-6 w-auto shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        <span className="font-semibold text-[15px] sm:text-[16px] text-[#1d1d1f] tracking-tight">
          Google <span className="font-medium text-[#6e6e73] text-[13px]">Partner</span>
        </span>
      </div>

      {/* 2. Meta Certified */}
      <div
        className="flex items-center gap-2 group transition-transform hover:scale-105"
        title="Meta Certified Digital Marketing Associate"
      >
        <svg className="h-5 w-auto shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 7.28c-2.4 0-4.46 1.48-5.46 3.65-.96-1.74-2.52-2.8-4.32-2.8C1.03 8.13 0 9.27 0 11.16c0 2.92 2.76 5.86 5.92 5.86 2.45 0 4.54-1.49 5.54-3.7.97 1.76 2.53 2.85 4.34 2.85 3.19 0 4.2-1.14 4.2-3.03 0-2.92-2.76-5.86-5.92-5.86h-2.08zm4.08 7.06c-1.39 0-2.61-.95-3.23-2.34.8-1.57 2.08-2.6 3.23-2.6 1.34 0 2.09.83 2.09 2.47 0 1.64-.75 2.47-2.09 2.47zm-8.16 0c-1.34 0-2.09-.83-2.09-2.47 0-1.64.75-2.47 2.09-2.47 1.15 0 2.43 1.03 3.23 2.6-.62 1.39-1.84 2.34-3.23 2.34z"
            fill="#0668E1"
          />
        </svg>
        <span className="font-semibold text-[15px] sm:text-[16px] text-[#1d1d1f] tracking-tight">
          Meta <span className="font-medium text-[#6e6e73] text-[13px]">Certified</span>
        </span>
      </div>

      {/* 3. HubSpot Academy */}
      <div
        className="flex items-center gap-2 group transition-transform hover:scale-105"
        title="HubSpot Academy Certified"
      >
        <svg className="h-5 w-auto shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.43 8.84V6.26a2.03 2.03 0 1 0-2.15 0v2.58a5.2 5.2 0 0 0-3.13 1.93L6.9 7.42a2.03 2.03 0 1 0-1.25 1.5l5.12 3.26a5.2 5.2 0 0 0-.27 1.67c0 .59.1 1.15.28 1.68l-5.13 3.26a2.03 2.03 0 1 0 1.25 1.5l5.25-3.35a5.2 5.2 0 1 0 5.28-8.1zM16.35 15.7a2.03 2.03 0 1 1 0-4.06 2.03 2.03 0 0 1 0 4.06z"
            fill="#FF7A59"
          />
        </svg>
        <span className="font-semibold text-[15px] sm:text-[16px] text-[#1d1d1f] tracking-tight">
          HubSpot <span className="font-medium text-[#6e6e73] text-[13px]">Academy</span>
        </span>
      </div>

      {/* 4. Cisco */}
      <div
        className="flex items-center gap-2.5 group transition-transform hover:scale-105"
        title="Cisco Certified"
      >
        <svg className="h-4 sm:h-5 w-auto shrink-0" viewBox="0 0 32 18" fill="none">
          <rect x="1" y="7" width="2" height="10" rx="1" fill="#1BA0D7" />
          <rect x="6" y="3" width="2" height="14" rx="1" fill="#1BA0D7" />
          <rect x="11" y="7" width="2" height="10" rx="1" fill="#1BA0D7" />
          <rect x="15" y="0" width="2" height="17" rx="1" fill="#1BA0D7" />
          <rect x="19" y="7" width="2" height="10" rx="1" fill="#1BA0D7" />
          <rect x="24" y="3" width="2" height="14" rx="1" fill="#1BA0D7" />
          <rect x="29" y="7" width="2" height="10" rx="1" fill="#1BA0D7" />
        </svg>
        <span className="font-semibold text-[14px] sm:text-[15px] tracking-[0.08em] text-[#1d1d1f]">
          CISCO
        </span>
      </div>

      {/* 5. Canva */}
      <div
        className="flex items-center gap-2 group transition-transform hover:scale-105"
        title="Canva Certified Creative"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center text-white text-[12px] font-extrabold italic shadow-xs">
          C
        </div>
        <span className="font-semibold text-[15px] sm:text-[16px] text-[#1d1d1f] tracking-tight">
          Canva
        </span>
      </div>

      {/* 6. E-Minds Australia */}
      <div
        className="flex items-center gap-2 group transition-transform hover:scale-105"
        title="E-Minds Australia"
      >
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-[6px] bg-[#1d1d1f] flex items-center justify-center text-white text-[11px] font-black">
          eM
        </div>
        <span className="font-semibold text-[14px] sm:text-[15px] text-[#1d1d1f] tracking-tight">
          E-Minds <span className="font-medium text-[#6e6e73] text-[12px]">Australia</span>
        </span>
      </div>
    </div>
  );
};
