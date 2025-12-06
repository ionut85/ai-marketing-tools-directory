import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LandscapeGrid } from "@/components/LandscapeGrid";
import type { Tool, Category } from "@/lib/types";

import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

export default function Landscape() {
  const [, setLocation] = useLocation();

  const tools = toolsData as Tool[];
  const categories = categoriesData as Category[];

  const handleToolClick = (tool: Tool) => {
    setLocation(`/tools/${tool.slug}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-landscape-title">
              AI x Marketing Landscape
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore the ecosystem of AI-powered marketing tools by category
            </p>
          </div>

          <LandscapeGrid
            tools={tools}
            categories={categories}
            onToolClick={handleToolClick}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
