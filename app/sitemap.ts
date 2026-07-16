import type { MetadataRoute } from "next";
import { projects } from "./data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wordofmoutheg.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
  ];
  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes];
}
