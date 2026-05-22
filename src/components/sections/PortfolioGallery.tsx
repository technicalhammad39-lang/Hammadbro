"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { portfolioCategories, PortfolioItem } from "@/data/data";
import { db } from "@/lib/firebase";
import { PortfolioProjectDoc } from "@/lib/content-types";
import { normalizeImageUrl } from "@/lib/image-url";

function fallbackToDoc(project: PortfolioItem, index: number): PortfolioProjectDoc {
  return {
    title: project.title,
    slug: project.slug,
    category: project.category,
    shortDescription: project.desc,
    fullDescription: project.solution,
    servicesUsed: project.services,
    mainImageUrl: project.image,
    images: [],
    order: index,
    featured: index === 0,
    showOnHome: true,
    status: "published",
  };
}

export default function PortfolioGallery({ fallback, initialCategory = "All" }: { fallback: PortfolioItem[]; initialCategory?: string }) {
  const [projects, setProjects] = useState<PortfolioProjectDoc[]>(fallback.map(fallbackToDoc));
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "portfolioProjects"), where("status", "==", "published"), orderBy("order", "asc")),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
        setProjects(items.length ? items : fallback.map(fallbackToDoc));
      },
      (error) => {
        console.error("Portfolio realtime listener failed:", error);
        setProjects(fallback.map(fallbackToDoc));
      },
    );

    return unsubscribe;
  }, [fallback]);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean)));
    return Array.from(new Set(["All", ...portfolioCategories.filter((category) => category !== "All"), ...dynamicCategories]));
  }, [projects]);

  const visibleProjects = activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:text-base ${activeCategory === category ? "bg-[#FD853A] text-white" : "bg-[#F2F4F7] text-[#171717] hover:bg-[#171717] hover:text-white"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {visibleProjects.length === 0 && (
        <div className="rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">No projects found.</div>
      )}

      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {visibleProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group mb-6 block break-inside-avoid overflow-hidden rounded-[22px] bg-[#171717] shadow-md"
          >
            <div className="relative">
              <img src={normalizeImageUrl(project.mainImageUrl)} alt={project.title} className="h-auto w-full" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45" />
              <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-[18px] border border-white/20 bg-black/45 p-4 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{project.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{project.title}</h2>
                <p className="mt-2 text-sm font-semibold text-white/80">View Project</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
