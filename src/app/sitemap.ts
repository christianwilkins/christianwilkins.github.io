import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { insightPosts } from "@/data/insightsContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/contact",
    "/services",
    "/consulting",
    "/faq",
    "/insights",
    "/resources",
    "/case-studies",
    "/lab",
    "/lab/books",
    "/lab/learning",
    "/lab/faq",
    "/terminal",
    "/llms.txt",
    "/ai.txt",
    "/rss.xml",
  ];

  const insightRoutes = insightPosts.map((post) => `/insights/${post.slug}`);

  return [...routes, ...insightRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
