"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      duration: 0.85,
      wheelMultiplier: 1.15,
      touchMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: {
        offset: 90,
        duration: 0.85,
      },
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
