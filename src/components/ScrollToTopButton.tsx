"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const nextVisible = window.scrollY > 520;
      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const onScroll = () => {
      if (frame.current) {
        return;
      }

      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-[#FD853A] text-white shadow-[0_14px_35px_rgba(253,133,58,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#171717] sm:bottom-7 sm:right-7 sm:h-12 sm:w-12 ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={21} />
    </button>
  );
}
