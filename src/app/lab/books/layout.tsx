import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";

const booksDescription = "Private library reader for Christian Wilkins lab experiments.";

export const metadata: Metadata = {
  title: "Library | Christian Wilkins",
  description: booksDescription,
  alternates: {
    canonical: `${siteConfig.url}/lab/books`,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Library | Christian Wilkins",
    description: booksDescription,
    url: `${siteConfig.url}/lab/books`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Library | Christian Wilkins",
    description: booksDescription,
    images: [siteConfig.image],
  },
};

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
