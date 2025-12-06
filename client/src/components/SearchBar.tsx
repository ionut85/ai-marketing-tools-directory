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
  placeholder = "Search tools... try \"AI for ad creative\" or \"attribution platforms\"",
  className,
}: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-2xl ${className ?? ""}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex h-12 w-full rounded-md border border-input bg-background px-12 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        data-testid="input-search"
      />
      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 ${value ? "visible" : "invisible"}`}
        onClick={() => onChange("")}
        data-testid="button-clear-search"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
