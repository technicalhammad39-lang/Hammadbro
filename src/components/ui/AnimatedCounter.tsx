"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  durationMs = 1200,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasRun) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun) return;

        setHasRun(true);
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(value * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplayValue(value);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [durationMs, hasRun, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}
