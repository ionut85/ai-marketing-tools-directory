import { Link } from "wouter";
import { Mail } from "lucide-react";
import categoriesData from "@/data/categories.json";
import type { Category } from "@/lib/types";

const categories = categoriesData as Category[];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium">
              AI x Marketing Tools Directory
            </p>
            <a
              href="mailto:submit@aimarketing.tools?subject=Tool%20Submission"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              data-testid="link-submit-tool"
            >
              <Mail className="h-4 w-4" />
              Submit a Tool
            </a>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Categories</p>
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  data-testid={`link-footer-category-${category.id}`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            Discover the best AI-powered marketing tools
          </p>
        </div>
      </div>
    </footer>
  );
}
