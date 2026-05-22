import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import BlogGrid from "@/components/sections/BlogGrid";
import { blogs } from "@/data/data";

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

      <section className="mx-auto flex w-full max-w-[1298px] flex-col gap-8 py-10 sm:py-14 lg:py-16">
        <div className="rounded-[32px] bg-[#171717] px-6 py-10 text-white sm:rounded-[44px] sm:px-10 lg:px-14 lg:py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#FD853A]">Design Blog</p>
          <h1 className="max-w-4xl text-[40px] font-semibold leading-[0.98] sm:text-[58px] lg:text-[76px]">
            Practical Design Insights for Better Brand First Impressions.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Learn how brand identity, logo design, and social media visuals help businesses look more trusted and professional.
          </p>
        </div>

        <BlogGrid fallback={blogs} />

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
