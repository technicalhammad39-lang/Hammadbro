import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SourceBackLink from "@/components/ui/SourceBackLink";
import RichTextContent from "@/components/ui/RichTextContent";
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
      fullDescription: firestoreProject.fullDescription,
      services: firestoreProject.servicesUsed,
      mainImage: firestoreProject.mainImageUrl,
      images: firestoreProject.images || [],
    };
  }

  if (fallbackProject) {
    return {
      title: fallbackProject.title,
      category: fallbackProject.category,
      shortDescription: fallbackProject.desc,
      fullDescription: fallbackProject.solution,
      services: fallbackProject.services,
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

  const galleryImages = [project.mainImage, ...project.images].filter(Boolean);

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white px-5 pb-16 pt-4 sm:px-6 sm:pt-6 lg:px-[71px]">
      <Navbar />

      <article className="mx-auto flex w-full max-w-[1298px] flex-col gap-8 py-10 sm:py-14 lg:py-16">
        <section className="grid gap-8 rounded-[32px] bg-[#171717] p-6 text-white sm:rounded-[44px] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-12">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#FD853A]">{project.category}</p>
              <h1 className="text-[42px] font-semibold leading-[0.98] sm:text-[64px] lg:text-[78px]">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{project.shortDescription}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact" className="rounded-full bg-[#FD853A] px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-[#e46e24]">
                Start a Similar Project
              </Link>
              <SourceBackLink source="projects" homeHref="/#projects" defaultHref="/portfolio" className="rounded-full border border-white/40 px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#171717]">
                Back to Portfolio
              </SourceBackLink>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-white/10">
            {project.mainImage ? (
              <img src={normalizeImageUrl(project.mainImage)} alt={project.title} className="h-auto w-full" />
            ) : (
              <div className="flex min-h-[280px] items-center justify-center text-white/60">No project image</div>
            )}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          {project.services.map((service) => (
            <div key={service} className="rounded-[28px] border border-[#E4E7EC] bg-[#F9FAFB] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Service</p>
              <h2 className="mt-3 text-xl font-semibold text-[#171717]">{service}</h2>
            </div>
          ))}
        </section>

        <section className="rounded-[32px] border border-[#FD853A]/25 bg-[#FFF6ED] p-6 sm:p-8 lg:p-10">
          <h2 className="text-3xl font-semibold text-[#171717]">Project Details</h2>
          <RichTextContent value={project.fullDescription} className="mt-4 max-w-4xl text-lg leading-relaxed text-[#667085]" />
        </section>

        {galleryImages.length > 0 && (
          <section className="columns-1 gap-6 md:columns-2">
            {galleryImages.map((image) => (
              <img key={image} src={normalizeImageUrl(image)} alt={project.title} className="mb-6 h-auto w-full break-inside-avoid rounded-[24px]" />
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
