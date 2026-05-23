"use client";

import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { PortfolioProjectDoc } from "@/lib/content-types";
import { normalizeImageUrl } from "@/lib/image-url";
import ProjectCategoryBadge from "@/components/ui/ProjectCategoryBadge";

export default function HomePortfolio({ initialProjects = [] }: { initialProjects?: PortfolioProjectDoc[] }) {
  const [projects, setProjects] = useState<PortfolioProjectDoc[]>(initialProjects);
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
      query(
          collection(db, "portfolioProjects"),
          where("status", "==", "published"),
          where("showOnHome", "==", true),
          orderBy("order", "asc"),
          limit(3),
      ),
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

  if (loading) {
    return (
      <div className="flex w-full max-w-[980px] flex-col gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[260px] animate-pulse rounded-[22px] bg-[#F2F4F7] sm:h-[360px]" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <div className="w-full max-w-[980px] rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">Portfolio projects will appear here soon.</div>;
  }

  return (
    <div className="flex w-full max-w-[980px] flex-col gap-8">
      {projects.map((project, index) => {
        const isLast = index === projects.length - 1;
        return (
          <div key={project.slug} className="relative">
            <Link
              href={`/portfolio/${project.slug}?from=projects`}
              className="group block overflow-hidden rounded-[22px] bg-[#171717] shadow-md"
              onClick={() => {
                if (window.location.pathname === "/") {
                  window.history.replaceState(null, "", "/#projects");
                }
              }}
            >
              <div className="relative">
                <img
                  src={normalizeImageUrl(project.mainImageUrl)}
                  alt={project.title}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
                <ProjectCategoryBadge category={project.category} className="absolute left-3 top-3 z-20 sm:left-5 sm:top-5" />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35" />
                <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-[18px] border border-white/20 bg-black/45 p-5 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{project.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{project.shortDescription}</p>
                </div>
                {isLast && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07111f]/95 via-[#07111f]/55 to-transparent" />}
              </div>
            </Link>

            {isLast && (
              <div className="-mt-8 flex justify-center">
                <Link href="/work" className="relative z-10 rounded-full border border-white/40 bg-[#171717]/70 px-7 py-3.5 text-base font-semibold text-white shadow-2xl backdrop-blur-md transition-colors hover:bg-[#FD853A]">
                  See More Work
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
