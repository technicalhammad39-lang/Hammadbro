"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { portfolioCategories } from "@/data/data";
import { db } from "@/lib/firebase";
import { PortfolioProjectDoc } from "@/lib/content-types";
import { normalizeImageUrl } from "@/lib/image-url";
import ProjectCategoryBadge from "@/components/ui/ProjectCategoryBadge";

export default function PortfolioGallery({
  initialCategory = "All",
  initialProjects = [],
}: {
  initialCategory?: string;
  initialProjects?: PortfolioProjectDoc[];
}) {
  const [projects, setProjects] = useState<PortfolioProjectDoc[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    let settled = false;
    const failOpenTimer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    }, 5500);

    const unsubscribe = onSnapshot(
      query(collection(db, "portfolioProjects"), where("status", "==", "published"), orderBy("order", "asc")),
      (snapshot) => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
        setProjects(items);
        setLoading(false);
      },
      () => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        setProjects((currentProjects) => currentProjects);
        setLoading(false);
      },
    );

    return () => {
      window.clearTimeout(failOpenTimer);
      unsubscribe();
    };
  }, []);

  const categories = portfolioCategories;

  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div
        data-portfolio-filter-row
        className="hide-scrollbar flex w-full snap-x snap-proximity flex-nowrap gap-2.5 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 sm:gap-3 lg:justify-center"
        data-lenis-prevent-touch
        data-lenis-prevent-wheel
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`min-h-11 flex-none snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition-all duration-300 sm:min-h-12 sm:px-5 sm:text-base ${activeCategory === category ? "bg-[#FD853A] text-white shadow-[0_10px_24px_rgba(253,133,58,0.22)]" : "bg-[#F2F4F7] text-[#171717] hover:bg-[#171717] hover:text-white"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && (
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="mb-6 h-[260px] break-inside-avoid animate-pulse rounded-[22px] bg-[#F2F4F7] sm:h-[340px]" />
          ))}
        </div>
      )}

      {!loading && visibleProjects.length === 0 && (
        <div className="rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">No projects found.</div>
      )}

      {!loading && <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {visibleProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group mb-6 block break-inside-avoid overflow-hidden rounded-[22px] bg-[#171717] shadow-md"
          >
            <div className="relative">
              <img
                src={normalizeImageUrl(project.mainImageUrl)}
                alt={project.title}
                className="h-auto w-full"
                loading="lazy"
                decoding="async"
              />
              <ProjectCategoryBadge category={project.category} className="absolute left-3 top-3 z-20 sm:left-4 sm:top-4" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45" />
              <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-[18px] border border-white/20 bg-black/45 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{project.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-white/80">View Project</p>
              </div>
            </div>
          </Link>
        ))}
      </div>}
    </div>
  );
}
