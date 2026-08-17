import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { insightPosts } from "@/data/insightsContent";
import { thoughtPosts } from "@/data/thoughtsContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/about/now",
    "/about/uses",
    "/projects",
    "/contact",
    "/services",
    "/consulting",
    "/faq",
    "/insights",
    "/thoughts",
    "/resources",
    "/case-studies",
    "/lab",
    "/lab/learning",
    "/lab/faq",
    "/lab/supabase-tester",
    "/llms.txt",
    "/ai.txt",
    "/rss.xml",
  ];

  const insightRoutes = insightPosts.map((post) => `/insights/${post.slug}`);
  const thoughtRoutes = thoughtPosts.map((post) => `/thoughts/${post.slug}`);

  return [...routes, ...insightRoutes, ...thoughtRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
