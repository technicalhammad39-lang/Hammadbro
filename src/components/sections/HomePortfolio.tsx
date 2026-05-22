"use client";

import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioItem } from "@/data/data";
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

export default function HomePortfolio({ fallback }: { fallback: PortfolioItem[] }) {
  const [projects, setProjects] = useState<PortfolioProjectDoc[]>(fallback.slice(0, 3).map(fallbackToDoc));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
          collection(db, "portfolioProjects"),
          where("status", "==", "published"),
          where("showOnHome", "==", true),
          orderBy("order", "asc"),
          limit(3),
      ),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
        setProjects(items.length ? items : fallback.slice(0, 3).map(fallbackToDoc));
      },
      (error) => {
        console.error("Home portfolio realtime listener failed:", error);
        setProjects(fallback.slice(0, 3).map(fallbackToDoc));
      },
    );

    return unsubscribe;
  }, [fallback]);

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
                />
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
                <Link href="/portfolio" className="relative z-10 rounded-full border border-white/40 bg-[#171717]/70 px-7 py-3.5 text-base font-semibold text-white shadow-2xl backdrop-blur-md transition-colors hover:bg-[#FD853A]">
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
