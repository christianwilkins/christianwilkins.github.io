export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, props?: AnalyticsProps) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible === "function") {
    window.plausible(name, props ? { props } : undefined);
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", name, props ?? {});
  }
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}
