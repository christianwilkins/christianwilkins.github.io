import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

const learningDescription = "Learning Hub experiments in UI systems, state models, and interaction design.";

export const metadata: Metadata = {
  title: "Learning Hub | Christian Wilkins",
  description: learningDescription,
  keywords: [...siteConfig.keywords, "learning hub", "ui systems experiments"],
  alternates: {
    canonical: `${siteConfig.url}/lab/learning`,
  },
  openGraph: {
    title: "Learning Hub | Christian Wilkins",
    description: learningDescription,
    url: `${siteConfig.url}/lab/learning`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Learning Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Hub | Christian Wilkins",
    description: learningDescription,
    images: [siteConfig.image],
  },
};

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
