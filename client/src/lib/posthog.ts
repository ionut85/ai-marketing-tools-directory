declare global {
  interface Window {
    posthog: {
      push: (args: unknown[]) => void;
      init: (apiKey: string, options?: object) => void;
      capture: (event: string, properties?: object) => void;
      identify: (distinctId: string, properties?: object) => void;
      reset: () => void;
    } | unknown[];
    __POSTHOG_INITIALIZED__?: boolean;
  }
}

export const initPostHog = () => {
  if (typeof window === 'undefined') return;
  if (window.__POSTHOG_INITIALIZED__) return;

  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    console.warn('Missing required PostHog key: VITE_POSTHOG_API_KEY');
    return;
  }

  window.__POSTHOG_INITIALIZED__ = true;

  const stub: unknown[] = [];
  window.posthog = stub;

  const loaderScript = document.createElement('script');
  loaderScript.async = true;
  loaderScript.src = `${apiHost.replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;
  loaderScript.onload = () => {
    if (window.posthog && typeof window.posthog === 'object' && 'init' in window.posthog) {
      (window.posthog as { init: (key: string, opts?: object) => void }).init(apiKey, {
        api_host: apiHost,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  };
  document.head.appendChild(loaderScript);
};

export const trackPostHogEvent = (event: string, properties?: object) => {
  if (typeof window === 'undefined' || !window.posthog) return;
  
  if (Array.isArray(window.posthog)) {
    window.posthog.push(['capture', event, properties]);
  } else if ('capture' in window.posthog) {
    (window.posthog as { capture: (e: string, p?: object) => void }).capture(event, properties);
  }
};

export const trackPostHogPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.posthog) return;
  
  if (Array.isArray(window.posthog)) {
    window.posthog.push(['capture', '$pageview', { $current_url: url }]);
  } else if ('capture' in window.posthog) {
    (window.posthog as { capture: (e: string, p?: object) => void }).capture('$pageview', { $current_url: url });
  }
};
