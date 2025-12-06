import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoFallback } from "./LogoFallback";
import type { Tool, Category } from "@/lib/types";

interface ToolCardProps {
  tool: Tool;
  categories: Category[];
  onClick?: () => void;
}

export function ToolCard({ tool, categories, onClick }: ToolCardProps) {
  const category = categories.find((c) => c.id === tool.category);
  const categoryName = category?.name || tool.category;

  return (
    <Card
      className="p-3 cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
      data-testid={`card-tool-${tool.slug}`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        {tool.logo ? (
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="h-8 w-8 rounded-md object-contain"
          />
        ) : (
          <LogoFallback name={tool.name} size="md" />
        )}
        <span className="font-medium text-sm truncate" data-testid={`text-tool-name-${tool.slug}`}>
          {tool.name}
        </span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-1 mb-2" data-testid={`text-tool-tagline-${tool.slug}`}>
        {tool.tagline}
      </p>
      <div className="flex flex-wrap gap-1">
        <Badge variant="secondary" className="text-xs px-1.5 py-0">
          {categoryName}
        </Badge>
        {tool.useCases.slice(0, 1).map((useCase) => (
          <Badge key={useCase} variant="outline" className="text-xs px-1.5 py-0">
            {useCase.replace(/-/g, " ")}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
