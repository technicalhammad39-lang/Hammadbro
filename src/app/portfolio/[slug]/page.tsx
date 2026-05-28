import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SourceBackLink from "@/components/ui/SourceBackLink";
import { getPortfolioProject, portfolioData } from "@/data/data";
import { normalizeImageUrl } from "@/lib/image-url";
import { getProjectBySlug } from "@/lib/public-content";

export const dynamicParams = true;

export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

async function resolveProject(slug: string) {
  const firestoreProject = await getProjectBySlug(slug);
  const fallbackProject = getPortfolioProject(slug);

  if (firestoreProject) {
    return {
      title: firestoreProject.title,
      category: firestoreProject.category,
      shortDescription: firestoreProject.shortDescription,
      mainImage: firestoreProject.mainImageUrl,
      images: firestoreProject.images || [],
    };
  }

  if (fallbackProject) {
    return {
      title: fallbackProject.title,
      category: fallbackProject.category,
      shortDescription: fallbackProject.desc,
      mainImage: fallbackProject.image,
      images: [],
    };
  }

  return null;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const image = project.mainImage ? normalizeImageUrl(project.mainImage) : "/logo.webp";

  return {
    title: `${project.title} Portfolio`,
    description: project.shortDescription,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Hammad GFX`,
      description: project.shortDescription,
      url: `/portfolio/${slug}`,
      type: "article",
      images: [
        {
          url: image,
          alt: `${project.title} by Hammad GFX`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Hammad GFX Portfolio`,
      description: project.shortDescription,
      images: [image],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    notFound();
  }

  const normalizedMainImage = project.mainImage ? normalizeImageUrl(project.mainImage) : "";
  const galleryImages = Array.from(
    new Set(
      project.images
        .filter(Boolean)
        .map((image) => normalizeImageUrl(image))
        .filter((image) => image !== normalizedMainImage),
    ),
  );

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white px-5 pb-16 pt-4 sm:px-6 sm:pt-6 lg:px-[71px]">
      <Navbar />

      <article className="mx-auto flex w-full max-w-[1298px] flex-col gap-5 py-5 sm:py-7 lg:py-10">
        <section className="relative grid overflow-hidden rounded-[26px] bg-[#171717] p-3.5 text-white sm:rounded-[34px] sm:p-6 lg:grid-cols-[1fr_0.68fr] lg:gap-7 lg:p-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rotate-12 rounded-[34px] bg-gradient-to-br from-[#FD853A]/45 via-[#FD853A]/10 to-transparent blur-[1px]" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-32 bg-[#FD853A]/20 [clip-path:polygon(100%_0,0_0,100%_100%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-[#FD853A]/10 blur-3xl" aria-hidden="true" />

          <div className="relative z-10 flex flex-col justify-between gap-4 sm:gap-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A] sm:mb-2.5 sm:text-sm sm:tracking-[0.2em]">{project.category}</p>
              <h1 className="text-[clamp(28px,5.2vw,56px)] font-semibold leading-[1.03]">{project.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-3 sm:text-base">{project.shortDescription}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
              <Link href="/#contact" className="rounded-full bg-[#FD853A] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#e46e24] sm:px-5 sm:py-2.5">
                Start a Similar Project
              </Link>
              <SourceBackLink source="projects" homeHref="/#projects" defaultHref="/work" className="rounded-full border border-white/40 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#171717] sm:px-5 sm:py-2.5">
                Back to Portfolio
              </SourceBackLink>
            </div>
          </div>

          <div className="relative z-10 mt-4 flex items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-white/8 p-1.5 sm:mt-5 sm:p-2 lg:mt-0">
            {project.mainImage ? (
              <img src={normalizedMainImage} alt={project.title} className="h-auto max-h-[180px] w-full rounded-[16px] object-contain sm:max-h-[240px] lg:max-h-[285px]" />
            ) : (
              <div className="flex min-h-[150px] items-center justify-center text-white/60">No project image</div>
            )}
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="columns-1 gap-6 md:columns-2">
            {galleryImages.map((image) => (
              <img key={image} src={image} alt={`${project.title} gallery image`} className="mb-6 h-auto w-full break-inside-avoid rounded-[24px] bg-[#F2F4F7]" loading="lazy" decoding="async" />
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
