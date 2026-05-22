import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BlogGrid from "@/components/sections/BlogGrid";

export const metadata: Metadata = {
  title: "Blog | Hammad GFX",
  description: "Graphic design insights about branding, logo design, social media visuals, and first impressions by Hammad GFX.",
  openGraph: {
    title: "Blog | Hammad GFX",
    description: "Read graphic design insights from Hammad GFX.",
  },
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white px-5 pb-16 pt-4 sm:px-6 sm:pt-6 lg:px-[71px]">
      <Navbar />

      <section className="mx-auto flex w-full max-w-[1298px] flex-col gap-6 py-7 sm:gap-8 sm:py-14 lg:py-16">
        <div className="premium-dark-hero rounded-[28px] bg-[#171717] px-5 py-6 text-white sm:rounded-[44px] sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FD853A] sm:mb-4 sm:text-sm sm:tracking-[0.22em]">Design Blog</p>
          <h1 className="max-w-4xl text-[34px] font-semibold leading-[1.02] sm:text-[58px] sm:leading-[0.98] lg:text-[76px]">
            <span className="sm:hidden">Practical Design Insights</span>
            <span className="hidden sm:inline">Practical Design Insights for Better Brand First Impressions.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-lg">
            <span className="sm:hidden">Branding, logo design, and social media tips to help businesses look trusted and professional.</span>
            <span className="hidden sm:inline">Learn how brand identity, logo design, and social media visuals help businesses look more trusted and professional.</span>
          </p>
        </div>

        <BlogGrid />

        <div className="rounded-[32px] bg-[#FFF6ED] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-[#171717]">Need visuals for your brand?</h2>
          <p className="mt-3 max-w-2xl text-[#667085]">Get premium logos, brand identity, social media designs, and print-ready marketing visuals for your business.</p>
          <Link href="/#contact" className="mt-5 inline-flex rounded-full bg-[#FD853A] px-6 py-3 font-semibold text-white hover:bg-[#e46e24]">
            Hire Hammad GFX
          </Link>
        </div>
      </section>
    </main>
  );
}
