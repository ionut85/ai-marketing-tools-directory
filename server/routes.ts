import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  subcategory: string;
  useCases: string[];
  pricing: string;
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

function loadJsonData<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "client", "src", "data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as T;
}

function getBaseUrl(req: Express["request"]): string {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return `${protocol}://${host}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = getBaseUrl(req);
    const tools = loadJsonData<Tool[]>("tools.json");
    const categories = loadJsonData<Category[]>("categories.json");
    
    const today = new Date().toISOString().split("T")[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/landscape</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
    
    for (const category of categories) {
      sitemap += `
  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }
    
    for (const tool of tools) {
      sitemap += `
  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    
    sitemap += `
</urlset>`;
    
    res.set("Content-Type", "application/xml");
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    const baseUrl = getBaseUrl(req);

    const robots = `# GenAI Marketing Landscape
# https://tools.hypd.ai

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# LLMs.txt for AI crawlers
# See: ${baseUrl}/llms.txt
`;
    
    res.set("Content-Type", "text/plain");
    res.send(robots);
  });

  app.get("/llms.txt", (req, res) => {
    const baseUrl = getBaseUrl(req);
    const tools = loadJsonData<Tool[]>("tools.json");
    const categories = loadJsonData<Category[]>("categories.json");
    const categoryDescriptions = loadJsonData<Record<string, CategoryDescription>>("categoryDescriptions.json");
    
    let llms = `# GenAI Marketing Landscape

> A comprehensive directory of GenAI marketing tools helping marketers discover solutions across Plan, Create, Activate, and Measure categories.

This directory helps marketing professionals find and evaluate AI tools across four main categories. Each tool listing includes pricing information, use cases, and direct links to the tool's website.

## Main Pages
- [Home](${baseUrl}/): Browse and search all ${tools.length} AI marketing tools
- [Landscape View](${baseUrl}/landscape): Visual overview of tools organized by category
- [About](${baseUrl}/about): Learn more about this directory

## Categories
`;
    
    for (const category of categories) {
      const desc = categoryDescriptions[category.id];
      const categoryTools = tools.filter(t => t.category === category.id);
      llms += `
### ${category.name}
- [${desc?.title || category.name}](${baseUrl}/category/${category.id}): ${desc?.description || `${categoryTools.length} tools`}
`;
      
      for (const sub of category.subcategories) {
        const subTools = tools.filter(t => t.category === category.id && t.subcategory === sub.id);
        if (subTools.length > 0) {
          llms += `  - ${sub.name}: ${subTools.length} tools\n`;
        }
      }
    }
    
    llms += `
## Featured Tools
`;
    
    const featuredByCategory: Record<string, Tool[]> = {};
    for (const category of categories) {
      featuredByCategory[category.id] = tools
        .filter(t => t.category === category.id)
        .slice(0, 3);
    }
    
    for (const category of categories) {
      llms += `
### ${category.name}
`;
      for (const tool of featuredByCategory[category.id]) {
        llms += `- [${tool.name}](${baseUrl}/tools/${tool.slug}): ${tool.tagline}
`;
      }
    }
    
    llms += `
## Tool Information Format
Each tool page includes:
- Name and tagline
- Detailed description
- Category and subcategory
- Use cases
- Pricing model (free, freemium, paid, enterprise)
- Links to official website and social profiles

## Data
- Total tools: ${tools.length}
- Categories: ${categories.length}
- Pricing models: Free, Freemium, Paid, Enterprise
`;
    
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(llms);
  });

  return httpServer;
}
