import type { MetadataRoute } from "next";
import { blogs, portfolioData } from "@/data/data";
import { getPublishedBlogs, getPublishedProjects } from "@/lib/public-content";

const baseUrl = "https://hammadgfx.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = ["", "/about", "/resume", "/projects", "/work", "/contact", "/blog"];
  const [firestoreProjects, firestoreBlogs] = await Promise.all([
    getPublishedProjects(),
    getPublishedBlogs(),
  ]);

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectSlugs = Array.from(
    new Set([...portfolioData.map((project) => project.slug), ...firestoreProjects.map((project) => project.slug)]),
  );
  const blogSlugs = Array.from(
    new Set([...blogs.map((post) => post.slug), ...firestoreBlogs.map((post) => post.slug)]),
  );

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
