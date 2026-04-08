import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogoFallback } from "./LogoFallback";
import { ToolCard } from "./ToolCard";
import { SiLinkedin, SiX, SiGithub } from "react-icons/si";
import type { Tool, Category } from "@/lib/types";

interface ToolDetailProps {
  tool: Tool;
  categories: Category[];
  relatedTools: Tool[];
  onRelatedToolClick: (tool: Tool) => void;
}

export function ToolDetail({
  tool,
  categories,
  relatedTools,
  onRelatedToolClick,
}: ToolDetailProps) {
  const category = categories.find((c) => c.id === tool.category);
  const subcategory = category?.subcategories.find((s) => s.id === tool.subcategory);

  const pricingLabels: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    enterprise: "Enterprise",
  };

  // Christmas theme is hidden from the switcher (HYP-527); strip legacy holiday emojis unconditionally
  const displayDescription = tool.description.replace(/🎄|🐣|🎅/g, '').trim();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>
        <Button asChild data-testid="button-visit-website">
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-6">
        {tool.logo ? (
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="h-16 w-16 rounded-lg object-contain"
          />
        ) : (
          <LogoFallback name={tool.name} size="lg" className="h-16 w-16 text-xl" />
        )}
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-tool-detail-name">
            {tool.name}
          </h1>
          <p className="text-muted-foreground" data-testid="text-tool-detail-tagline">
            {tool.tagline}
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p data-testid="text-tool-description">{displayDescription}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <Badge className="border-primary/50 bg-primary/15 text-foreground">
                {category?.name || tool.category}
              </Badge>
              {subcategory && (
                <Badge variant="outline" className="ml-2">
                  {subcategory.name}
                </Badge>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Use Cases</h3>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((useCase) => (
                <Badge key={useCase} variant="outline">
                  {useCase.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">Pricing</h3>
            <Badge className="border-primary/50 bg-primary/15 text-foreground">
              {pricingLabels[tool.pricing] || tool.pricing}
            </Badge>
          </Card>

          {(() => {
            const {
              linkedin,
              twitter,
              github,
              authorName,
              authorLinkedin,
              authorTwitter,
              authorGithub,
            } = tool.social;

            // Author-level links only show when the equivalent company-level link is missing.
            const showAuthorLinkedin = !linkedin && authorLinkedin;
            const showAuthorTwitter = !twitter && authorTwitter;
            const showAuthorGithub = !github && authorGithub;

            const hasCompanyLinks = linkedin || twitter || github;
            const hasAuthorLinks = showAuthorLinkedin || showAuthorTwitter || showAuthorGithub;

            if (!hasCompanyLinks && !hasAuthorLinks) return null;

            return (
              <Card className="p-4">
                <h3 className="font-medium mb-3">Social</h3>
                {hasCompanyLinks && (
                  <div className="flex gap-2">
                    {linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="link-linkedin"
                        >
                          <SiLinkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="link-twitter"
                        >
                          <SiX className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {github && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="link-github"
                        >
                          <SiGithub className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {hasAuthorLinks && (
                  <div className={hasCompanyLinks ? "mt-4" : ""}>
                    {authorName && (
                      <p
                        className="text-xs text-muted-foreground mb-2"
                        data-testid="text-author-prefix"
                      >
                        by {authorName}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {showAuthorLinkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={authorLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="link-author-linkedin"
                          >
                            <SiLinkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {showAuthorTwitter && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={authorTwitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="link-author-twitter"
                          >
                            <SiX className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {showAuthorGithub && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={authorGithub}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="link-author-github"
                          >
                            <SiGithub className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })()}

          <Card className="p-4">
            <h3 className="font-medium mb-2">Founded</h3>
            <p className="text-muted-foreground">{tool.founded}</p>
          </Card>
        </div>
      </div>

      {relatedTools.length > 0 && (
        <>
          <Separator className="my-8" />
          <div>
            <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {relatedTools.map((relatedTool) => (
                <div key={relatedTool.id} className="w-48 flex-shrink-0">
                  <ToolCard
                    tool={relatedTool}
                    categories={categories}
                    onClick={() => onRelatedToolClick(relatedTool)}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
