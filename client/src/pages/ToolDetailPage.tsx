import { useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolDetail } from "@/components/ToolDetail";
import { SEO, generateToolJsonLd } from "@/components/SEO";
import type { Tool, Category } from "@/lib/types";
import { relatedTools as pickRelated } from "@shared/relatedTools";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

export default function ToolDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];

  const tool = tools.find((t) => t.slug === params.slug);

  const relatedTools = useMemo(() => (tool ? pickRelated(tool, tools) : []), [tool, tools]);

  if (!tool) {
    return (
      <div className="flex min-h-screen flex-col">
        <SEO title="Tool Not Found" noindex />
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Tool Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The tool you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === tool.category);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={tool.seoTitle ?? `${tool.name} - ${category?.name || "AI Marketing Tool"}`}
        description={tool.seoDescription ?? (tool.tagline || tool.description.slice(0, 160))}
        keywords={[tool.name, ...tool.useCases, category?.name || "", "AI marketing tool"]}
        ogType="product"
        ogImage={tool.logo || undefined}
        canonicalUrl={`/tools/${tool.slug}`}
        jsonLd={generateToolJsonLd({
          name: tool.name,
          description: tool.description,
          tagline: tool.tagline,
          website: tool.website,
          logo: tool.logo || undefined,
          pricing: tool.pricing,
        })}
      />
      <Header />
      <main className="flex-1">
        <ToolDetail
          tool={tool}
          categories={categories}
          relatedTools={relatedTools}
          onRelatedToolClick={(t) => setLocation(`/tools/${t.slug}`)}
        />
      </main>
      <Footer />
    </div>
  );
}
