import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search tools...",
  className,
}: SearchBarProps) {
  return (
    <div
      className={`flex h-12 w-full max-w-2xl items-center gap-3 rounded-md border border-input bg-background px-4 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background ${className ?? ""}`}
    >
      <Search className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        data-testid="input-search"
      />
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 flex-shrink-0 ${value ? "visible" : "invisible"}`}
        onClick={() => onChange("")}
        data-testid="button-clear-search"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
