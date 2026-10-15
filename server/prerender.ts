import fs from "fs";
import path from "path";

/**
 * Server-side HTML for every page of the directory.
 *
 * The client is a single-page app, so without this every URL answered with the
 * same empty shell: one generic <title>, no description, no H1 and no text
 * until JavaScript ran. Crawlers that don't run JavaScript (and Google's first
 * pass) saw 157 identical pages, and unknown paths returned 200.
 *
 * For each request we resolve the route against the static catalogue and
 * inject into the HTML template:
 *  - a unique <title>, meta description, canonical, Open Graph and JSON-LD
 *    (the same values the client's <SEO> component sets after hydration)
 *  - the page's H1, text and links as plain HTML inside #root, which React
 *    replaces when it mounts
 *  - HTTP 404 plus `noindex` for anything that isn't a real page
 *
 * The catalogue is read from disk once per process; it only changes on deploy.
 */

interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  website: string;
  category: string;
  subcategory: string | null;
  secondaryCategories?: { category: string; subcategory: string | null }[];
  useCases: string[];
  pricing: string;
  companyType: string;
  founded: number | null;
}

interface Category {
  id: string;
  name: string;
  subcategories: { id: string; name: string }[];
}

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

interface UseCase {
  id: string;
  name: string;
}

interface Catalogue {
  tools: Tool[];
  categories: Category[];
  categoryDescriptions: Record<string, CategoryDescription>;
  subcategoryDescriptions: Record<string, SubcategoryDescription>;
  useCases: UseCase[];
  categoryBodies: Record<string, string>;
  subcategoryBodies: Record<string, string>;
}

export interface RenderedPage {
  status: 200 | 404;
  title: string;
  description: string;
  /** Path only, e.g. "/tools/gomarble". Omitted on 404s. */
  canonicalPath?: string;
  ogType: "website" | "product";
  ogImage?: string;
  noindex: boolean;
  jsonLd?: object;
  bodyHtml: string;
}

// Mirrors client/src/components/SEO.tsx so the server and client agree.
const BASE_TITLE = "GenAI Marketing Landscape";
const BASE_DESCRIPTION =
  "Explore the GenAI Marketing Landscape - your comprehensive directory of AI-powered marketing tools for planning, creating, activating, and measuring campaigns.";

const DATA_DIR = path.join(process.cwd(), "client", "src", "data");

const PRICING_LABELS: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  subscription: "Subscription",
  "usage-based": "Usage-based",
  enterprise: "Enterprise",
  paid: "Paid",
};

let cache: Catalogue | null = null;

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf-8")) as T;
}

function readMarkdownDir(dir: string): Record<string, string> {
  const full = path.join(DATA_DIR, "content", dir);
  const out: Record<string, string> = {};
  if (!fs.existsSync(full)) return out;
  for (const file of fs.readdirSync(full)) {
    if (file.endsWith(".md")) {
      out[file.replace(/\.md$/, "")] = fs.readFileSync(path.join(full, file), "utf-8");
    }
  }
  return out;
}

function catalogue(): Catalogue {
  if (!cache) {
    cache = {
      tools: readJson<Tool[]>("tools.json"),
      categories: readJson<Category[]>("categories.json"),
      categoryDescriptions: readJson("categoryDescriptions.json"),
      subcategoryDescriptions: readJson("subcategoryDescriptions.json"),
      useCases: readJson<UseCase[]>("useCases.json"),
      categoryBodies: readMarkdownDir("categories"),
      subcategoryBodies: readMarkdownDir("subcategories"),
    };
  }
  return cache;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
}

/**
 * Minimal markdown for the category/subcategory bodies: headings, paragraphs,
 * bullet lists, bold and links — everything those files use.
 */
export function markdownToHtml(md: string): string {
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
    if (list.length) {
      html.push(`<ul>${list.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (!line) {
      flush();
    } else if (heading) {
      flush();
      // Page titles are the only H1; body headings start at H2.
      const level = Math.max(2, heading[1].length);
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (bullet) {
      if (paragraph.length) flush();
      list.push(bullet[1]);
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return html.join("\n");
}

function toolInCategory(tool: Tool, categoryId: string): boolean {
  if (tool.category === categoryId) return true;
  return (tool.secondaryCategories ?? []).some((s) => s.category === categoryId);
}

function toolInSubcategory(tool: Tool, categoryId: string, subcategoryId: string): boolean {
  if (tool.category === categoryId && tool.subcategory === subcategoryId) return true;
  return (tool.secondaryCategories ?? []).some(
    (s) => s.category === categoryId && s.subcategory === subcategoryId,
  );
}

function cleanDescription(text: string): string {
  // Same holiday-emoji strip as ToolDetail.tsx.
  return text.replace(/🎄|🐣|🎅/g, "").trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function toolLinkList(tools: Tool[]): string {
  if (!tools.length) return "";
  return `<ul>${tools
    .map(
      (t) =>
        `<li><a href="/tools/${escapeHtml(t.slug)}">${escapeHtml(t.name)}</a>${
          t.tagline ? ` – ${escapeHtml(t.tagline)}` : ""
        }</li>`,
    )
    .join("")}</ul>`;
}

function siteNav(categories: Category[]): string {
  return `<nav aria-label="Main"><a href="/">${escapeHtml(BASE_TITLE)}</a> · <a href="/landscape">Landscape</a> · <a href="/about">About</a> · ${categories
    .map((c) => `<a href="/category/${escapeHtml(c.id)}">${escapeHtml(c.name)}</a>`)
    .join(" · ")}</nav>`;
}

function itemListJsonLd(name: string, description: string, tools: Tool[], baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} - AI Marketing Tools`,
    description,
    numberOfItems: tools.slice(0, 10).length,
    itemListElement: tools.slice(0, 10).map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${baseUrl}/tools/${tool.slug}`,
    })),
  };
}

function notFound(categories: Category[], what = "Page"): RenderedPage {
  return {
    status: 404,
    title: `${what} Not Found | ${BASE_TITLE}`,
    description: BASE_DESCRIPTION,
    ogType: "website",
    noindex: true,
    bodyHtml: `${siteNav(categories)}<main><h1>${escapeHtml(what)} Not Found</h1><p>The page you're looking for doesn't exist. <a href="/">Browse all AI marketing tools</a>.</p></main>`,
  };
}

function renderTool(slug: string, c: Catalogue, baseUrl: string): RenderedPage {
  const tool = c.tools.find((t) => t.slug === slug);
  if (!tool) return notFound(c.categories, "Tool");

  const category = c.categories.find((cat) => cat.id === tool.category);
  const subcategory = category?.subcategories.find((s) => s.id === tool.subcategory);
  const useCaseNames = tool.useCases
    .map((id) => c.useCases.find((u) => u.id === id)?.name ?? id)
    .filter(Boolean);
  const related = c.tools
    .filter(
      (t) =>
        t.id !== tool.id &&
        (t.category === tool.category || t.useCases.some((uc) => tool.useCases.includes(uc))),
    )
    .slice(0, 4);
  const description = cleanDescription(tool.description);

  const facts = [
    category &&
      `<li>Category: <a href="/category/${escapeHtml(category.id)}">${escapeHtml(category.name)}</a>${
        subcategory
          ? ` › <a href="/category/${escapeHtml(category.id)}/${escapeHtml(subcategory.id)}">${escapeHtml(subcategory.name)}</a>`
          : ""
      }</li>`,
    useCaseNames.length && `<li>Use cases: ${escapeHtml(useCaseNames.join(", "))}</li>`,
    `<li>Pricing: ${escapeHtml(PRICING_LABELS[tool.pricing] ?? tool.pricing)}</li>`,
    tool.founded && `<li>Founded: ${tool.founded}</li>`,
    `<li>Website: <a href="${escapeHtml(tool.website)}" rel="noopener">${escapeHtml(tool.website)}</a></li>`,
  ]
    .filter(Boolean)
    .join("");

  return {
    status: 200,
    // Same title shape as ToolDetailPage.tsx.
    title: `${tool.name} - ${category?.name || "AI Marketing Tool"} | ${BASE_TITLE}`,
    description: tool.tagline || truncate(description, 160),
    canonicalPath: `/tools/${tool.slug}`,
    ogType: "product",
    ogImage: tool.logo ?? undefined,
    noindex: false,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: tool.website,
      image: tool.logo ?? undefined,
      offers: {
        "@type": "Offer",
        price: tool.pricing === "free" ? "0" : undefined,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },
    bodyHtml: `${siteNav(c.categories)}<main><article><h1>${escapeHtml(tool.name)}</h1>${
      tool.tagline ? `<p>${escapeHtml(tool.tagline)}</p>` : ""
    }<p>${escapeHtml(description)}</p><ul>${facts}</ul>${
      related.length ? `<h2>Related tools</h2>${toolLinkList(related)}` : ""
    }</article></main>`,
  };
}

function renderCategory(id: string, c: Catalogue, baseUrl: string): RenderedPage {
  const category = c.categories.find((cat) => cat.id === id);
  const info = c.categoryDescriptions[id];
  if (!category || !info) return notFound(c.categories, "Category");

  const tools = c.tools.filter((t) => toolInCategory(t, category.id));
  const body = c.categoryBodies[category.id];
  const subLinks = category.subcategories
    .map(
      (s) =>
        `<li><a href="/category/${escapeHtml(category.id)}/${escapeHtml(s.id)}">${escapeHtml(s.name)}</a></li>`,
    )
    .join("");

  return {
    status: 200,
    title: `${info.title} | ${BASE_TITLE}`,
    description: info.description,
    canonicalPath: `/category/${category.id}`,
    ogType: "website",
    noindex: false,
    jsonLd: itemListJsonLd(info.title, info.description, tools, baseUrl),
    bodyHtml: `${siteNav(c.categories)}<main><h1>${escapeHtml(info.title)}</h1><p>${escapeHtml(
      info.description,
    )}</p><h2>${escapeHtml(category.name)} subcategories</h2><ul>${subLinks}</ul><h2>${escapeHtml(
      category.name,
    )} tools</h2>${toolLinkList(tools)}${body ? markdownToHtml(body) : ""}</main>`,
  };
}

function renderSubcategory(
  categoryId: string,
  subcategoryId: string,
  c: Catalogue,
  baseUrl: string,
): RenderedPage {
  const category = c.categories.find((cat) => cat.id === categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
  if (!category || !subcategory) return notFound(c.categories, "Subcategory");

  const meta = c.subcategoryDescriptions[subcategory.id];
  // Same fallbacks as SubcategoryPage.tsx.
  const title = meta?.title ?? `${subcategory.name} Tools`;
  const description =
    meta?.description ?? `Browse ${subcategory.name} tools in the ${category.name} category on HYPD.`;
  const tools = c.tools.filter((t) => toolInSubcategory(t, category.id, subcategory.id));
  const body = c.subcategoryBodies[subcategory.id];

  return {
    status: 200,
    title: `${title} | ${BASE_TITLE}`,
    description,
    canonicalPath: `/category/${category.id}/${subcategory.id}`,
    ogType: "website",
    noindex: false,
    jsonLd: itemListJsonLd(title, description, tools, baseUrl),
    bodyHtml: `${siteNav(c.categories)}<main><p><a href="/category/${escapeHtml(category.id)}">${escapeHtml(
      category.name,
    )}</a></p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${toolLinkList(tools)}${
      body ? markdownToHtml(body) : ""
    }</main>`,
  };
}

function categoryOverview(c: Catalogue): string {
  return c.categories
    .map((cat) => {
      const tools = c.tools.filter((t) => toolInCategory(t, cat.id));
      const subs = cat.subcategories
        .map(
          (s) =>
            `<a href="/category/${escapeHtml(cat.id)}/${escapeHtml(s.id)}">${escapeHtml(s.name)}</a>`,
        )
        .join(", ");
      return `<section><h2><a href="/category/${escapeHtml(cat.id)}">${escapeHtml(cat.name)}</a></h2><p>${escapeHtml(
        c.categoryDescriptions[cat.id]?.description ?? "",
      )}</p><p>${subs}</p>${toolLinkList(tools)}</section>`;
    })
    .join("");
}

function renderHome(c: Catalogue, baseUrl: string): RenderedPage {
  const description =
    "Explore the GenAI Marketing Landscape - discover AI-powered tools to plan, create, activate, and measure your marketing campaigns.";
  return {
    status: 200,
    title: `Discover Practical GenAI Marketing Tools | ${BASE_TITLE}`,
    description,
    canonicalPath: "/",
    ogType: "website",
    noindex: false,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BASE_TITLE,
      description: BASE_DESCRIPTION,
      url: baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    bodyHtml: `${siteNav(c.categories)}<main><h1>${escapeHtml(
      BASE_TITLE,
    )}</h1><p>Discover AI-powered tools to plan, create, activate, and measure your marketing. ${
      c.tools.length
    } tools across ${c.categories.length} categories.</p>${categoryOverview(c)}</main>`,
  };
}

function renderLandscape(c: Catalogue): RenderedPage {
  return {
    status: 200,
    title: `GenAI Marketing Overview | ${BASE_TITLE}`,
    description:
      "Explore the complete AI x Marketing ecosystem organized by category. Visual overview of creative, analytics, media, and data tools.",
    canonicalPath: "/landscape",
    ogType: "website",
    noindex: false,
    bodyHtml: `${siteNav(c.categories)}<main><h1>GenAI x Marketing Landscape</h1><p>Explore the ecosystem of GenAI-powered marketing tools by category.</p>${categoryOverview(
      c,
    )}</main>`,
  };
}

function renderAbout(c: Catalogue): RenderedPage {
  // Mirrors client/src/pages/About.tsx.
  return {
    status: 200,
    title: `About | ${BASE_TITLE}`,
    description:
      "Learn about the GenAI Marketing Landscape - a curated directory of GenAI-powered tools for marketing.",
    canonicalPath: "/about",
    ogType: "website",
    noindex: false,
    bodyHtml: `${siteNav(c.categories)}<main><h1>About GenAI Marketing Landscape</h1>
<p>The GenAI Marketing Landscape is a curated directory of GenAI-powered tools for marketing. The goal is to help marketers, agencies, and businesses discover the right tools to plan, create, activate, and measure marketing—faster and with less manual work.</p>
<p>We started by reviewing tools across startups, indies, scale-ups, and publicly listed companies, and organizing them into a practical taxonomy. The current version is an MVP and will keep evolving.</p>
<h2>What you'll find</h2><ul><li><strong>Directory view:</strong> searchable tool cards with categories and use-cases</li><li><strong>Landscape view:</strong> a category map to understand where tools cluster and how the ecosystem is shifting</li><li><strong>Coverage:</strong> primarily the application layer (marketing workflows and tooling), not infrastructure/LLM stack</li></ul>
<h2>What we cover</h2><ul><li><strong>Plan:</strong> market research, audience intelligence, competitive analysis, AI assistants</li><li><strong>Create:</strong> ad creative, copywriting &amp; SEO, landing pages, social &amp; influencers</li><li><strong>Activate:</strong> campaign management, email &amp; outreach, AI ad platforms, shopping assistants</li><li><strong>Measure:</strong> attribution, analytics, GenAI Visibility (GEO)</li></ul>
<h2>What's next</h2><ul><li>make the dataset available via MCP and/or a ChatGPT app</li><li>add popularity/votes and simple comparisons</li><li>make tool discovery/additions more automated (agentic browsing + structured outputs)</li></ul>
<h2>Submit a tool</h2><p>Know a tool that should be included? Email <a href="mailto:contact@hypd.ai">contact@hypd.ai</a></p></main>`,
  };
}

/** Resolve a request path to its server-rendered page. */
export function renderPage(pathname: string, baseUrl: string): RenderedPage {
  const c = catalogue();
  const clean = pathname.replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean).map((p) => decodeURIComponent(p));

  if (clean === "/") return renderHome(c, baseUrl);
  if (clean === "/landscape") return renderLandscape(c);
  if (clean === "/about") return renderAbout(c);
  if (parts[0] === "tools" && parts.length === 2) return renderTool(parts[1], c, baseUrl);
  if (parts[0] === "category" && parts.length === 2) return renderCategory(parts[1], c, baseUrl);
  if (parts[0] === "category" && parts.length === 3) {
    return renderSubcategory(parts[1], parts[2], c, baseUrl);
  }
  return notFound(c.categories);
}

/** Inject a rendered page into the client's index.html. */
export function injectPage(template: string, page: RenderedPage, baseUrl: string): string {
  const url = page.canonicalPath ? `${baseUrl}${page.canonicalPath}` : undefined;
  const head = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    page.noindex ? `<meta name="robots" content="noindex" />` : "",
    url ? `<link rel="canonical" href="${escapeHtml(url)}" />` : "",
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:type" content="${page.ogType}" />`,
    url ? `<meta property="og:url" content="${escapeHtml(url)}" />` : "",
    page.ogImage ? `<meta property="og:image" content="${escapeHtml(page.ogImage)}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    // Same marker the client's <SEO> uses, so it replaces this node instead
    // of adding a second one after hydration.
    page.jsonLd
      ? `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  return template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/, "")
    .replace(/<meta\s+property="og:(title|description|type)"[^>]*>/g, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.bodyHtml}</div>`);
}
