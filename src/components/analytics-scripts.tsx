const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const plausibleSrc = import.meta.env.VITE_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
const gaId = import.meta.env.VITE_GA_ID;

export function AnalyticsScripts() {
  return (
    <>
      {plausibleDomain ? (
        <script
          src={plausibleSrc}
          data-domain={plausibleDomain}
          defer
        />
      ) : null}
      {gaId ? (
        <>
          <script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} async />
          <script id="ga4-init">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </script>
        </>
      ) : null}
    </>
  );
}
