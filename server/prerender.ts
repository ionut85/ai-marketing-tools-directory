import fs from "fs";
import path from "path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { loadJsonData } from "./routes";
import {
  BASE_TITLE,
  generateToolJsonLd,
  generateCategoryJsonLd,
} from "../client/src/components/SEO";
import { toolInCategory, toolInSubcategory } from "../client/src/lib/toolFilters";
import type { Tool, Category, UseCase } from "../client/src/lib/types";

/**
 * Server-side rendering of the SEO-relevant parts of tool, category and
 * subcategory pages. The app is a client-rendered SPA, so without this every
 * URL returns the same empty index.html. Here we inject the page's own
 * title / description / canonical / Open Graph / JSON-LD into <head> and a
 * plain-HTML version of the page content into #root. React replaces the #root
 * content on mount (createRoot), and SEO.tsx updates the same head tags in
 * place, so the browser experience is unchanged.
 *
 * Titles, descriptions and JSON-LD mirror the page components
 * (ToolDetailPage, CategoryPage, SubcategoryPage) so crawlers and users see
 * the same metadata.
 */

interface CategoryDescription {
  title: string;
  description: string;
  longDescription: string;
  keywords: string[];
}

interface SubcategoryDescription {
  title: string;
  description: string;
  keywords: string[];
}

interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogType: "website" | "product";
  ogImage?: string;
  canonicalPath: string;
  jsonLd: object;
}

export interface RenderedPage {
  status: number;
  html: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadContent(kind: "categories" | "subcategories", slug: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "client",
    "src",
    "data",
    "content",
    kind,
    `${slug}.md`,
  );
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function renderMarkdown(content: string): string {
  return renderToStaticMarkup(
    createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, content),
  );
}

function toolCount(n: number): string {
  return `${n} ${n === 1 ? "tool" : "tools"}`;
}

function toolList(tools: Tool[]): string {
  const items = tools
    .map(
      (t) =>
        `<li><a href="/tools/${escapeHtml(t.slug)}">${escapeHtml(t.name)}</a>${
          t.tagline ? ` - ${escapeHtml(t.tagline)}` : ""
        }</li>`,
    )
    .join("");
  return `<ul>${items}</ul>`;
}

function renderHead(meta: PageMeta, baseUrl: string): string {
  const fullTitle = `${meta.title} | ${BASE_TITLE}`;
  const fullUrl = `${baseUrl}${meta.canonicalPath}`;
  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.keywords?.length
      ? `<meta name="keywords" content="${escapeHtml(meta.keywords.join(", "))}" />`
      : "",
    `<link rel="canonical" href="${escapeHtml(fullUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:url" content="${escapeHtml(fullUrl)}" />`,
    meta.ogImage ? `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    meta.ogImage ? `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />` : "",
    // data-seo-jsonld lets SEO.tsx find and replace this script on mount.
    `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(
      meta.jsonLd,
    ).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** Swap the template's default head tags for the page's own and fill #root. */
function inject(template: string, head: string, body: string): string {
  return template
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace(/\s*<meta property="og:(title|description|type)"[^>]*>/g, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function renderTool(slug: string): { meta: PageMeta; body: string } | null {
  const tools = loadJsonData<Tool[]>("tools.json");
  const categories = loadJsonData<Category[]>("categories.json");
  const useCases = loadJsonData<UseCase[]>("useCases.json");

  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const category = categories.find((c) => c.id === tool.category);
  const subcategory = category?.subcategories.find((s) => s.id === tool.subcategory);
  const useCaseNames = tool.useCases.map(
    (id) => useCases.find((u) => u.id === id)?.name ?? id,
  );
  // Same selection as ToolDetailPage.
  const relatedTools = tools
    .filter(
      (t) =>
        t.id !== tool.id &&
        (t.category === tool.category ||
          t.useCases.some((uc) => tool.useCases.includes(uc))),
    )
    .slice(0, 4);

  const meta: PageMeta = {
    title: `${tool.name} - ${category?.name || "AI Marketing Tool"}`,
    description: tool.tagline || tool.description.slice(0, 160),
    keywords: [tool.name, ...tool.useCases, category?.name || "", "AI marketing tool"],
    ogType: "product",
    ogImage: tool.logo || undefined,
    canonicalPath: `/tools/${tool.slug}`,
    jsonLd: generateToolJsonLd({
      name: tool.name,
      description: tool.description,
      tagline: tool.tagline,
      website: tool.website,
      logo: tool.logo || undefined,
      pricing: tool.pricing,
    }),
  };

  const breadcrumb = [
    `<a href="/">All tools</a>`,
    category ? `<a href="/category/${category.id}">${escapeHtml(category.name)}</a>` : "",
    category && subcategory
      ? `<a href="/category/${category.id}/${subcategory.id}">${escapeHtml(subcategory.name)}</a>`
      : "",
  ]
    .filter(Boolean)
    .join(" / ");

  const body = `<main>
<nav>${breadcrumb}</nav>
<h1>${escapeHtml(tool.name)}</h1>
${tool.tagline ? `<p>${escapeHtml(tool.tagline)}</p>` : ""}
<p>${escapeHtml(tool.description)}</p>
<ul>
${useCaseNames.length ? `<li>Use cases: ${escapeHtml(useCaseNames.join(", "))}</li>` : ""}
<li>Pricing: ${escapeHtml(tool.pricing)}</li>
${tool.founded ? `<li>Founded: ${tool.founded}</li>` : ""}
</ul>
<p><a href="${escapeHtml(tool.website)}" rel="noopener">Visit ${escapeHtml(tool.name)}</a></p>
${relatedTools.length ? `<h2>Related tools</h2>${toolList(relatedTools)}` : ""}
</main>`;

  return { meta, body };
}

function renderCategory(slug: string, baseUrl: string): { meta: PageMeta; body: string } | null {
  const tools = loadJsonData<Tool[]>("tools.json");
  const categories = loadJsonData<Category[]>("categories.json");
  const descriptions = loadJsonData<Record<string, CategoryDescription>>(
    "categoryDescriptions.json",
  );

  const category = categories.find((c) => c.id === slug);
  const info = descriptions[slug];
  if (!category || !info) return null;

  const categoryTools = tools.filter((t) => toolInCategory(t, category.id));
  const content = loadContent("categories", category.id);

  const meta: PageMeta = {
    title: info.title,
    description: info.description,
    keywords: info.keywords,
    ogType: "website",
    canonicalPath: `/category/${category.id}`,
    jsonLd: generateCategoryJsonLd({
      name: info.title,
      description: info.description,
      tools: categoryTools
        .slice(0, 10)
        .map((t) => ({ name: t.name, url: `${baseUrl}/tools/${t.slug}` })),
    }),
  };

  const subLinks = category.subcategories
    .map(
      (s) =>
        `<li><a href="/category/${category.id}/${s.id}">${escapeHtml(s.name)}</a></li>`,
    )
    .join("");

  const body = `<main>
<nav><a href="/">All tools</a></nav>
<h1>${escapeHtml(info.title)}</h1>
<p>${escapeHtml(info.longDescription)}</p>
${subLinks ? `<ul>${subLinks}</ul>` : ""}
<h2>${toolCount(categoryTools.length)}</h2>
${toolList(categoryTools)}
${content ? `<section>${renderMarkdown(content)}</section>` : ""}
</main>`;

  return { meta, body };
}

function renderSubcategory(
  slug: string,
  subSlug: string,
  baseUrl: string,
): { meta: PageMeta; body: string } | null {
  const tools = loadJsonData<Tool[]>("tools.json");
  const categories = loadJsonData<Category[]>("categories.json");
  const descriptions = loadJsonData<Record<string, SubcategoryDescription>>(
    "subcategoryDescriptions.json",
  );

  const category = categories.find((c) => c.id === slug);
  const subcategory = category?.subcategories.find((s) => s.id === subSlug);
  if (!category || !subcategory) return null;

  const info = descriptions[subcategory.id];
  // Same fallbacks as SubcategoryPage.
  const title = info?.title ?? `${subcategory.name} Tools`;
  const description =
    info?.description ??
    `Browse ${subcategory.name} tools in the ${category.name} category on HYPD.`;

  const subTools = tools.filter((t) => toolInSubcategory(t, category.id, subcategory.id));
  const content = loadContent("subcategories", subcategory.id);

  const meta: PageMeta = {
    title,
    description,
    keywords: info?.keywords,
    ogType: "website",
    canonicalPath: `/category/${category.id}/${subcategory.id}`,
    jsonLd: generateCategoryJsonLd({
      name: title,
      description,
      tools: subTools
        .slice(0, 10)
        .map((t) => ({ name: t.name, url: `${baseUrl}/tools/${t.slug}` })),
    }),
  };

  const body = `<main>
<nav><a href="/">All tools</a> / <a href="/category/${category.id}">${escapeHtml(category.name)}</a></nav>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<h2>${toolCount(subTools.length)}</h2>
${toolList(subTools)}
${content ? `<section>${renderMarkdown(content)}</section>` : ""}
</main>`;

  return { meta, body };
}

/**
 * Render the HTML for a request. Tool / category / subcategory URLs get their
 * own metadata and content; an unknown slug on those routes returns 404 with
 * noindex. Every other URL gets the template unchanged.
 */
export function renderPage(url: string, template: string, baseUrl: string): RenderedPage {
  let pathname: string;
  try {
    pathname = decodeURIComponent(url.split("?")[0].split("#")[0]).replace(/\/+$/, "");
  } catch {
    return { status: 200, html: template };
  }

  const toolMatch = pathname.match(/^\/tools\/([^/]+)$/);
  const subMatch = pathname.match(/^\/category\/([^/]+)\/([^/]+)$/);
  const catMatch = pathname.match(/^\/category\/([^/]+)$/);

  let page: { meta: PageMeta; body: string } | null;
  if (toolMatch) page = renderTool(toolMatch[1]);
  else if (subMatch) page = renderSubcategory(subMatch[1], subMatch[2], baseUrl);
  else if (catMatch) page = renderCategory(catMatch[1], baseUrl);
  else return { status: 200, html: template };

  if (!page) {
    const notFound = template.replace(
      "</head>",
      `    <meta name="robots" content="noindex" />\n  </head>`,
    );
    return { status: 404, html: notFound };
  }

  return { status: 200, html: inject(template, renderHead(page.meta, baseUrl), page.body) };
}
