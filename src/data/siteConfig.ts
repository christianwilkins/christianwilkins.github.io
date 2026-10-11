import { personalBrand } from "@/data/personalBrand";

const defaultSiteUrl = "https://chriswiki.com";

function getSiteUrl() {
  const configuredUrl =
    typeof process === "undefined" ? undefined : process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return defaultSiteUrl;
  }

  return configuredUrl.replace(/\/+$/, "");
}

export const siteConfig = {
  name: personalBrand.name,
  title: `${personalBrand.name} | ${personalBrand.role}`,
  description: personalBrand.shortBio,
  shortDescription: personalBrand.shortBio,
  url: getSiteUrl(),
  locale: "en_US",
  twitterHandle: "@christian_wilki",
  keywords: [
    "software consultancy",
    "software consulting",
    "startup",
    "freelance software engineer",
    "product design",
    "UI design",
    "UX design",
    "design systems",
    "technical consulting",
    "software engineer",
    "hiring CS candidates",
    "founder support",
    "startup software consultant",
    "software consultant",
    "Christian Wilkins software consultant",
    "Christian Wilkins software consulting",
    "product design consultant",
    "design system consultant",
    "AI workflow consultant",
    "front-end consultant",
    "fractional engineering leadership",
    "startup product consultant",
  ],
  image: "/opengraph-image.png",
  rss: "/rss.xml",
} as const;
