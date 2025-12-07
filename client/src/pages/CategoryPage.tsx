import { useState, useMemo, useEffect } from "react";
import { useLocation, useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolGrid } from "@/components/ToolGrid";
import { ResultsCounter } from "@/components/ResultsCounter";
import { SEO, generateCategoryJsonLd } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tool, Category } from "@/lib/types";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import categoryDescriptions from "@/data/categoryDescriptions.json";

interface CategoryDescription {
  title: string;
  description: string;
  longDescription: string;
  keywords: string[];
}

const TOOLS_PER_PAGE = 12;

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];
  const descriptions = categoryDescriptions as Record<string, CategoryDescription>;

  const category = categories.find((c) => c.id === params.slug);
  const categoryInfo = descriptions[params.slug || ""];

  useEffect(() => {
    setCurrentPage(1);
  }, [params.slug]);

  const categoryTools = useMemo(() => {
    if (!category) return [];
    return tools.filter((tool) => tool.category === category.id);
  }, [tools, category]);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * TOOLS_PER_PAGE;
    return categoryTools.slice(startIndex, startIndex + TOOLS_PER_PAGE);
  }, [categoryTools, currentPage]);

  const totalPages = Math.ceil(categoryTools.length / TOOLS_PER_PAGE);

  const handleToolClick = (tool: Tool) => {
    setLocation(`/tools/${tool.slug}`);
  };

  if (!category || !categoryInfo) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Category Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The category you're looking for doesn't exist.
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

  const toolsForJsonLd = categoryTools.slice(0, 10).map((tool) => ({
    name: tool.name,
    url: `${typeof window !== "undefined" ? window.location.origin : ""}/tools/${tool.slug}`,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title={categoryInfo.title}
        description={categoryInfo.description}
        keywords={categoryInfo.keywords}
        canonicalUrl={`/category/${category.id}`}
        jsonLd={generateCategoryJsonLd({
          name: categoryInfo.title,
          description: categoryInfo.description,
          tools: toolsForJsonLd,
        })}
      />
      <Header />

      <section className="border-b bg-background py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Tools
            </Button>
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl" data-testid="text-category-title">
              {categoryInfo.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground" data-testid="text-category-description">
              {categoryInfo.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {category.subcategories.map((sub) => (
                <Badge key={sub.id} variant="secondary" data-testid={`badge-subcategory-${sub.id}`}>
                  {sub.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="mb-6">
            <ResultsCounter showing={paginatedTools.length} total={categoryTools.length} />
          </div>

          <ToolGrid
            tools={paginatedTools}
            categories={categories}
            onToolClick={handleToolClick}
          />

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2" data-testid="pagination-controls">
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    data-testid={`button-page-${page}`}
                  >
                    {page}
                  </Button>
                ))}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
