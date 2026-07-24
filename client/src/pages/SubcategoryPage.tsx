import { useState, useMemo, useEffect } from "react";
import { useLocation, useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolGrid } from "@/components/ToolGrid";
import { ResultsCounter } from "@/components/ResultsCounter";
import { Markdown } from "@/components/Markdown";
import { SEO, generateCategoryJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { toolInSubcategory } from "@/lib/toolFilters";
import { getSubcategoryContent } from "@/lib/content";
import type { Tool, Category } from "@/lib/types";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import subcategoryDescriptions from "@/data/subcategoryDescriptions.json";

interface SubcategoryDescription {
  title: string;
  description: string;
  keywords: string[];
}

const TOOLS_PER_PAGE = 15;

export default function SubcategoryPage() {
  const params = useParams<{ slug: string; subcategory: string }>();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];
  const descriptions = subcategoryDescriptions as Record<
    string,
    SubcategoryDescription
  >;

  const category = categories.find((c) => c.id === params.slug);
  const subcategory = category?.subcategories.find(
    (s) => s.id === params.subcategory,
  );
  const meta = descriptions[params.subcategory || ""];

  useEffect(() => {
    setCurrentPage(1);
  }, [params.slug, params.subcategory]);

  const subcategoryTools = useMemo(() => {
    if (!category || !subcategory) return [];
    return tools.filter((tool) =>
      toolInSubcategory(tool, category.id, subcategory.id),
    );
  }, [tools, category, subcategory]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    return subcategoryTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [subcategoryTools, currentPage]);

  const totalPages = Math.ceil(subcategoryTools.length / TOOLS_PER_PAGE);

  const handleToolClick = (tool: Tool) => {
    setLocation(`/tools/${tool.slug}`);
  };

  if (!category || !subcategory) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Subcategory Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The subcategory you're looking for doesn't exist.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-4">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const title = meta?.title ?? `${subcategory.name} Tools`;
  const description =
    meta?.description ??
    `Browse ${subcategory.name} tools in the ${category.name} category on HYPD.`;

  const body = getSubcategoryContent(subcategory.id);

  const toolsForJsonLd = subcategoryTools.slice(0, 10).map((tool) => ({
    name: tool.name,
    url: `${typeof window !== "undefined" ? window.location.origin : ""}/tools/${tool.slug}`,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={title}
        description={description}
        keywords={meta?.keywords}
        canonicalUrl={`/category/${category.id}/${subcategory.id}`}
        jsonLd={generateCategoryJsonLd({
          name: title,
          description,
          tools: toolsForJsonLd,
        })}
      />
      <Header />

      <section className="border-b bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href={`/category/${category.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="mb-6"
              data-testid="button-back-category"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {category.name}
            </Button>
          </Link>

          <div className="max-w-3xl">
            <p
              className="text-sm font-medium text-muted-foreground"
              data-testid="text-parent-category"
            >
              {category.name}
            </p>
            <h1
              className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              data-testid="text-subcategory-title"
            >
              {title}
            </h1>
            <p
              className="mt-4 text-lg text-muted-foreground"
              data-testid="text-subcategory-description"
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="mb-6">
            <ResultsCounter
              showing={paginatedTools.length}
              total={subcategoryTools.length}
            />
          </div>

          <ToolGrid
            tools={paginatedTools}
            categories={categories}
            onToolClick={handleToolClick}
          />

          {totalPages > 1 && (
            <div
              className="mt-8 flex items-center justify-center gap-2"
              data-testid="pagination-controls"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                data-testid="button-prev-page"
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      data-testid={`button-page-${page}`}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                data-testid="button-next-page"
              >
                Next
              </Button>
            </div>
          )}

          {body && (
            <section
              className="mt-12 border-t pt-10"
              data-testid="section-subcategory-content"
            >
              <Markdown content={body} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
