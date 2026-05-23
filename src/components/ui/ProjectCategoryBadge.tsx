type ProjectCategoryBadgeProps = {
  category?: string;
  className?: string;
};

export default function ProjectCategoryBadge({ category, className = "" }: ProjectCategoryBadgeProps) {
  return (
    <span
      data-project-category-badge
      className={`pointer-events-none inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-[#FD853A]/40 bg-[#0F0F0F]/75 px-3 py-1.5 text-[clamp(11px,2.5vw,13px)] font-semibold text-white shadow-[0_10px_26px_rgba(253,133,58,0.18)] backdrop-blur-[10px] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#FD853A]/70 group-hover:shadow-[0_14px_34px_rgba(253,133,58,0.28)] ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FD853A] shadow-[0_0_12px_rgba(253,133,58,0.85)]" />
      <span className="truncate">{category || "Graphic Design"}</span>
    </span>
  );
}
