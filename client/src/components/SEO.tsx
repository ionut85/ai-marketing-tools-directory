import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  canonicalUrl?: string;
  jsonLd?: object;
}

const BASE_TITLE = "GenAI Marketing Landscape";
const BASE_DESCRIPTION = "Explore the GenAI Marketing Landscape - your comprehensive directory of AI-powered marketing tools for planning, creating, activating, and measuring campaigns.";
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

export function SEO({
  title,
  description = BASE_DESCRIPTION,
  keywords = [],
  ogType = "website",
  ogImage,
  canonicalUrl,
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
  const fullUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description);
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywords.length > 0) {
      updateMeta("keywords", keywords.join(", "));
    } else if (keywordsMeta) {
      keywordsMeta.remove();
    }

    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:url", fullUrl, true);
    if (ogImage) {
      updateMeta("og:image", ogImage, true);
    }

    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    if (ogImage) {
      updateMeta("twitter:image", ogImage);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    if (jsonLd) {
      let existingScript = document.querySelector('script[data-seo-jsonld]');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const jsonLdScript = document.querySelector('script[data-seo-jsonld]');
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    };
  }, [fullTitle, description, keywords, ogType, ogImage, fullUrl, jsonLd]);

  return null;
}

export function generateToolJsonLd(tool: {
  name: string;
  description: string;
  tagline: string;
  website: string;
  logo?: string;
  pricing: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": tool.website,
    "image": tool.logo,
    "offers": {
      "@type": "Offer",
      "price": tool.pricing === "free" ? "0" : undefined,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
  };
}

export function generateCategoryJsonLd(category: {
  name: string;
  description: string;
  tools: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${category.name} - AI Marketing Tools`,
    "description": category.description,
    "numberOfItems": category.tools.length,
    "itemListElement": category.tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": tool.name,
      "url": tool.url,
    })),
  };
}

export function generateDirectoryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BASE_TITLE,
    "description": BASE_DESCRIPTION,
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${BASE_URL}/?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
