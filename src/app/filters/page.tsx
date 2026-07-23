import type { Metadata } from "next";
import { FiltersStudio } from "@/components/filters/filters-studio";

export const metadata: Metadata = {
  title: "Filters Studio",
  description: "A small, playful body-shape study built from live controls.",
  alternates: {
    canonical: "https://filters.chriswiki.com",
  },
};

export default function FiltersPage() {
  return <FiltersStudio />;
}
