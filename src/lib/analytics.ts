/**
 * Google Tag Manager helpers (container GTM-WH2LVD4M, loaded in index.html).
 * Everything goes through window.dataLayer; set up tags/triggers in GTM itself.
 */
type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const payload: DataLayerEvent = { event, ...params };
  window.dataLayer.push(payload);
}

/** Fired on in-app navigation (the first page load is GTM's normal Page View). */
export function trackPageView(path: string) {
  track("virtual_page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
