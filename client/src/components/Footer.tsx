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
              GenAI Marketing Landscape
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
            <p className="text-sm font-medium">Resources</p>
            <nav className="flex flex-col gap-2">
              <a
                href="https://lumapartners.com/lumascapes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-testid="link-footer-ai-lumascape"
              >
                AI Lumascape
              </a>
              <a
                href="https://uof.digital/introducing-the-u-of-digitals-ai-in-ad-tech-knowledgescape/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-testid="link-footer-ai-knowledgescape"
              >
                AI Knowledgescape
              </a>
              <a
                href="https://phiture.com/mobilegrowthstack/what-is-the-mobile-growth-stack/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-testid="link-footer-mobile-growth-stack"
              >
                Mobile Growth Stack
              </a>
              <a
                href="https://www.linkedin.com/posts/hugo-gersanois-36633619_ai-marketing-tools-landscape-2023-winter-activity-7135700718711181314-PFMw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                data-testid="link-footer-ai-marketing-tools"
              >
                AI Marketing Tools
              </a>
            </nav>
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
            Discover the best GenAI marketing tools
          </p>
        </div>
      </div>
    </footer>
  );
}
