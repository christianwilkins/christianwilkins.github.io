import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { InspectorProvider } from "./providers/InspectorProvider";
import styles from "./supabase-tester.module.css";

const testerDescription = "Inspect Supabase endpoints, tables, and write permissions from a single lab workspace.";

export const metadata: Metadata = {
  title: "Supabase Tester | Christian Wilkins",
  description: testerDescription,
  keywords: [...siteConfig.keywords, "supabase tester", "security", "exposure explorer"],
  alternates: {
    canonical: `${siteConfig.url}/lab/supabase-tester`,
  },
  openGraph: {
    title: "Supabase Tester | Christian Wilkins",
    description: testerDescription,
    url: `${siteConfig.url}/lab/supabase-tester`,
    type: "website",
    images: [
      {
        url: siteConfig.image,
        width: 1200,
        height: 630,
        alt: "Supabase Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supabase Tester | Christian Wilkins",
    description: testerDescription,
    images: [siteConfig.image],
  },
};

export default function SupabaseTesterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.supabaseShell}>
      <InspectorProvider>{children}</InspectorProvider>
    </div>
  );
}
