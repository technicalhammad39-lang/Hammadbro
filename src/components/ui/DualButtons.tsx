'use client';

import { useState } from 'react';

function ButtonArrow() {
  return (
    <span className="cta-arrow-stack shrink-0" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function DualToggleButtons() {
  const [active, setActive] = useState<"portfolio" | "hire">("portfolio");

  return (
    <div className="flex w-full max-w-[390px] rounded-full border border-white/45 bg-white/20 shadow-[0_14px_35px_rgba(0,0,0,0.18)] backdrop-blur-[8px] gap-2 p-2 sm:p-[10px] min-h-[70px] sm:min-h-[82px] items-center justify-center">
      <a
        href="#projects"
        onMouseEnter={() => setActive("portfolio")}
        onFocus={() => setActive("portfolio")}
        className={`group flex flex-1 items-center justify-center gap-2 rounded-[60px] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap
          ${
            active === "portfolio"
              ? "bg-[#FD853A] text-white font-medium text-[16px] sm:text-[22px] h-[54px] sm:h-[62px] border border-[#D0D5DD] shadow-md"
              : "bg-white/10 text-white font-medium text-[15px] sm:text-[18px] h-[50px] sm:h-[54px] border border-white/20"
          }`}
      >
        View Portfolio
        <span className={active === "portfolio" ? "opacity-100" : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"}>
          <ButtonArrow />
        </span>
      </a>

      <a
        href="#contact"
        onMouseEnter={() => setActive("hire")}
        onFocus={() => setActive("hire")}
        className={`group flex flex-1 items-center justify-center gap-2 rounded-[60px] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap
          ${
            active === "hire"
              ? "bg-[#FD853A] text-white font-medium text-[16px] sm:text-[22px] h-[54px] sm:h-[62px] border border-[#D0D5DD] shadow-md"
              : "bg-white/10 text-white font-medium text-[15px] sm:text-[18px] h-[50px] sm:h-[54px] border border-white/20"
          }`}
      >
        Hire me
        <span className={active === "hire" ? "opacity-100" : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"}>
          <ButtonArrow />
        </span>
      </a>
    </div>
  );
}
