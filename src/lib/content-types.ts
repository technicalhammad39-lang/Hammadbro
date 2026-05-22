import { Blog, Experience, PortfolioItem } from "@/data/data";
import { isRichTextHtml, richTextToPlainText } from "@/lib/rich-text";

export type PublishStatus = "published" | "draft";

export type PortfolioProjectDoc = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  servicesUsed: string[];
  mainImageUrl: string;
  images: string[];
  order: number;
  featured: boolean;
  showOnHome: boolean;
  status: PublishStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type WorkExperienceDoc = {
  id?: string;
  companyName: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  order: number;
  status: PublishStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type BlogDoc = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  category: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  status: PublishStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type NotificationDoc = {
  id?: string;
  title: string;
  message: string;
  type: "update" | "info" | "success" | "warning";
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type ServiceDoc = {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  imageUrl: string;
  icon?: "Palette" | "Share2" | "PenTool" | "Printer" | "Monitor" | "FileText";
  order: number;
  status: PublishStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type ContactMessageDoc = {
  id?: string;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  source: "website";
  status: "new" | "read" | "replied";
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type SiteSettingsDoc = {
  heroTitle: string;
  heroAnimatedWords: string[];
  heroDescription: string;
  whatsapp: string;
  email: string;
  linkedin: string;
  behance: string;
  instagram: string;
  footerText?: string;
  cvUrl: string;
  updatedAt?: unknown;
};

export function portfolioDocToItem(project: PortfolioProjectDoc): PortfolioItem {
  return {
    image: project.mainImageUrl,
    title: project.title,
    href: `/portfolio/${project.slug}`,
    desc: project.shortDescription,
    slug: project.slug,
    category: project.category,
    overview: project.shortDescription,
    services: project.servicesUsed,
    challenge: "",
    solution: project.fullDescription,
    result: "",
  };
}

export function experienceDocToExperience(experience: WorkExperienceDoc): Experience {
  const duration = experience.currentlyWorking
    ? `${experience.startDate} - Present`
    : `${experience.startDate} - ${experience.endDate}`;

  return {
    company: experience.companyName,
    duration,
    role: experience.role,
    desc: experience.description,
    dotColor: "bg-[#FD853A]",
  };
}

export function blogDocToBlog(blog: BlogDoc): Blog {
  const content = blog.content || "";
  const contentBlocks = isRichTextHtml(content)
    ? [content]
    : content.split(/\n{2,}/).filter(Boolean);

  return {
    image: blog.featuredImageUrl,
    button: "Read More",
    name: blog.author || "Hammad GFX",
    date: "",
    title: blog.title,
    slug: blog.slug,
    excerpt: richTextToPlainText(blog.excerpt),
    category: blog.category,
    metaDescription: blog.metaDescription,
    content: contentBlocks,
  };
}
