import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Manrope,
  Newsreader,
  Plus_Jakarta_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { LayoutShell } from "@/components/layout-shell";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/data/siteConfig";
import { contactLinks } from "@/data/contactData";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Christian Wilkins",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.title,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Software Consulting",
  classification: "Portfolio",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}${siteConfig.rss}`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo192.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: ["Christian Wilkins Portfolio", siteConfig.url],
      url: siteConfig.url,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteConfig.url}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Software consultant and engineer",
      disambiguatingDescription:
        "United States software consultant and engineer focused on startups and product design.",
      description: siteConfig.description,
      knowsAbout: [...siteConfig.keywords],
      sameAs: contactLinks
        .filter((link) => ["github", "linkedin", "twitter"].includes(link.id))
        .map((link) => link.url),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Christian Wilkins Software Consulting",
      url: siteConfig.url,
      areaServed: "United States",
      description: siteConfig.description,
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      serviceType: [
        "Software consulting",
        "Product design systems",
        "Front-end engineering",
        "AI workflow automation",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "inquiries",
        email: contactLinks.find((link) => link.id === "email")?.url.replace("mailto:", "") ?? "",
        url: contactLinks.find((link) => link.id === "call")?.url ?? siteConfig.url,
      },
      sameAs: contactLinks
        .filter((link) => ["github", "linkedin", "twitter"].includes(link.id))
        .map((link) => link.url),
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${plexSans.variable} ${newsreader.variable} ${plusJakarta.variable} ${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LayoutShell>
              {children}
            </LayoutShell>
          </Providers>
        </ThemeProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
