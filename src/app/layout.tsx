import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Manrope,
  Newsreader,
  Plus_Jakarta_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutShell } from "@/components/layout-shell";
import { Providers } from "@/components/providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
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
  metadataBase: new URL("https://christianwilkins.github.io"),
  title: {
    default: "Christian Wilkins Software Consultant and Engineer",
    template: "%s | Christian Wilkins",
  },
  description:
    "Portfolio of Christian Wilkins. Software consultancy for startups, freelance product design, and hiring support for top CS candidates in the United States.",
  keywords: [
    "software consultancy",
    "software consulting",
    "startup",
    "start up",
    "freelance software engineer",
    "product design",
    "UI design",
    "UX design",
    "design systems",
    "hiring CS candidates",
    "founder support",
    "technical consulting",
  ],
  openGraph: {
    title: "Christian Wilkins Software Consultant and Engineer",
    description:
      "Software consultancy for startups, freelance product design, and hiring support for top CS candidates.",
    url: "/",
    siteName: "Christian Wilkins",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Wilkins Software Consultant and Engineer",
    description:
      "Software consultancy for startups, freelance product design, and hiring support for top CS candidates.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${newsreader.variable} ${plusJakarta.variable} ${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
