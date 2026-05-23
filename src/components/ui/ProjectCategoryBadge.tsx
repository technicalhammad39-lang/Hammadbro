type ProjectCategoryBadgeProps = {
  category?: string;
  className?: string;
};

export default function ProjectCategoryBadge({ category, className = "" }: ProjectCategoryBadgeProps) {
  return (
    <span
      data-project-category-badge
      className={`pointer-events-none relative inline-flex max-w-[calc(100%-2rem)] items-center gap-2 overflow-hidden rounded-full border border-[#FD853A]/45 bg-[#0F0F0F]/75 px-[13px] py-[7px] text-[clamp(11px,2.5vw,13px)] font-semibold tracking-[0.03em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.25),0_0_18px_rgba(253,133,58,0.18)] backdrop-blur-[12px] transition-all duration-300 before:absolute before:inset-y-0 before:left-[-55%] before:w-1/2 before:skew-x-[-18deg] before:bg-white/15 before:opacity-0 before:transition-all before:duration-500 group-hover:-translate-y-0.5 group-hover:border-[#FD853A]/75 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.32),0_0_24px_rgba(253,133,58,0.28)] group-hover:before:left-[120%] group-hover:before:opacity-100 ${className}`}
    >
      <span className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD853A] shadow-[0_0_12px_rgba(253,133,58,0.9)]" />
      <span className="relative z-10 truncate">{category || "Graphic Design"}</span>
    </span>
  );
}
