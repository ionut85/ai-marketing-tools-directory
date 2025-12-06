import { ToolCard } from "./ToolCard";
import type { Tool, Category } from "@/lib/types";

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
  onToolClick: (tool: Tool) => void;
}

export function ToolGrid({ tools, categories, onToolClick }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground" data-testid="text-no-results">
          No tools found matching your criteria.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      data-testid="grid-tools"
    >
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          categories={categories}
          onClick={() => onToolClick(tool)}
        />
      ))}
    </div>
  );
}
