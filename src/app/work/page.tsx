import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PortfolioGallery from "@/components/sections/PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio | Hammad GFX",
  description: "Graphic design portfolio by Hammad GFX featuring logo design, brand identity, social media, print design, business profiles, and website graphics.",
  openGraph: {
    title: "Portfolio | Hammad GFX",
    description: "Explore premium graphic design projects by Hammad GFX.",
  },
};

type WorkPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const activeCategory = params?.category ?? "All";

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white px-5 pb-16 pt-4 sm:px-6 sm:pt-6 lg:px-[71px]">
      <Navbar />

      <section className="mx-auto flex w-full max-w-[1298px] flex-col gap-6 py-7 sm:gap-8 sm:py-14 lg:py-16">
        <div className="premium-dark-hero rounded-[28px] bg-[#171717] px-5 py-6 text-white sm:rounded-[44px] sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FD853A] sm:mb-4 sm:text-sm sm:tracking-[0.22em]">Hammad GFX Portfolio</p>
          <h1 className="max-w-4xl text-[34px] font-semibold leading-[1.02] sm:text-[58px] sm:leading-[0.98] lg:text-[76px]">
            <span className="sm:hidden">Graphic Design Portfolio</span>
            <span className="hidden sm:inline">Graphic Design Work Built for Trust and First Impressions.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
            <span className="sm:hidden">Selected logo, branding, social media, print, and website graphic projects.</span>
            <span className="hidden sm:inline">Explore selected logo, brand identity, social media, print, business profile, and website graphics projects.</span>
          </p>
        </div>

        <PortfolioGallery initialCategory={activeCategory} />
      </section>
    </main>
  );
}
