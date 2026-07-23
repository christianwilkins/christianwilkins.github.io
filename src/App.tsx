import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LayoutShell } from "@/components/layout-shell";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import Home from "@/app/page";
import About from "@/app/about/page";
import NowPage from "@/app/about/now/page";
import UsesPage from "@/app/about/uses/page";
import ConsultingPage from "@/app/consulting/page";
import ServicesPage from "@/app/services/page";
import Projects from "@/app/projects/page";
import Contact from "@/app/contact/page";
import FaqPage from "@/app/faq/page";
import InsightsPage from "@/app/insights/page";
import ResourcesPage from "@/app/resources/page";
import CaseStudiesPage from "@/app/case-studies/page";
import LabPage from "@/app/lab/page";
import LabFaqPage from "@/app/lab/faq/page";
import LearningPage from "@/app/lab/learning/page";
import VibeCodersGuidePage from "@/app/lab/learning/vibe-coders-guide/page";
import VibeArcPage from "@/app/lab/learning/vibe-coders-guide/[arc]/page";
import TerminalPage from "@/app/terminal/page";
import { InsightPostPage } from "@/routes/InsightPostPage";
import { CloudflarePendingPage } from "@/routes/CloudflarePendingPage";
import { NotFoundPage } from "@/routes/NotFoundPage";
import { siteConfig } from "@/data/siteConfig";
import { contactLinks } from "@/data/contactData";
import { FiltersStudio } from "@/components/filters/filters-studio";

const FILTERS_HOSTS = new Set(["filters.chriswiki.com", "www.filters.chriswiki.com"]);

function RouteMetadata() {
  const location = useLocation();
  const titleByPath: Record<string, string> = {
    "/": "Christian Wilkins",
    "/about": "About | Christian Wilkins",
    "/about/now": "Now | Christian Wilkins",
    "/about/uses": "Uses | Christian Wilkins",
    "/consulting": "Software Consulting | Christian Wilkins",
    "/services": "Services | Christian Wilkins",
    "/projects": "Projects | Christian Wilkins",
    "/contact": "Contact | Christian Wilkins",
    "/faq": "FAQ | Christian Wilkins",
    "/insights": "Insights | Christian Wilkins",
    "/resources": "Resources | Christian Wilkins",
    "/case-studies": "Case Studies | Christian Wilkins",
    "/lab": "The Lab | Christian Wilkins",
    "/lab/faq": "Lab FAQ | Christian Wilkins",
    "/lab/learning": "Learning Hub | Christian Wilkins",
    "/lab/learning/vibe-coders-guide": "Vibe Coder's Guide to the Galaxy | Christian Wilkins",
    "/terminal": "Terminal | Christian Wilkins",
  };

  document.title = titleByPath[location.pathname] ?? siteConfig.title;

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    canonical.href = `${siteConfig.url}${location.pathname === "/" ? "" : location.pathname}`;
  }

  return null;
}

function VibeArcRoute() {
  const params = useParams<{ arc: string }>();
  if (!params.arc) return <NotFoundPage />;
  return <VibeArcPage params={{ arc: params.arc }} />;
}

function RootStructuredData() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: ["Christian Wilkins Portfolio", siteConfig.url],
      url: siteConfig.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: "Software consultant and engineer",
      description: siteConfig.description,
      knowsAbout: [...siteConfig.keywords],
      sameAs: contactLinks
        .filter((link) => ["github", "linkedin", "twitter"].includes(link.id))
        .map((link) => link.url),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function App() {
  if (FILTERS_HOSTS.has(window.location.hostname.toLowerCase())) {
    return <FiltersStudio />;
  }

  return (
    <>
      <RouteMetadata />
      <RootStructuredData />
      <LayoutShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/now" element={<NowPage />} />
          <Route path="/about/uses" element={<UsesPage />} />
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightPostPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/lab/faq" element={<LabFaqPage />} />
          <Route path="/lab/learning" element={<LearningPage />} />
          <Route path="/lab/learning/vibe-coders-guide" element={<VibeCodersGuidePage />} />
          <Route path="/lab/learning/vibe-coders-guide/:arc" element={<VibeArcRoute />} />
          <Route path="/lab/books" element={<CloudflarePendingPage feature="Library" />} />
          <Route path="/lab/supabase-tester/*" element={<CloudflarePendingPage feature="Supabase tester" />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/articles" element={<Navigate to="/insights" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LayoutShell>
      <AnalyticsScripts />
    </>
  );
}
