import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex h-14 items-center justify-between gap-4 px-4 md:px-6 w-full">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
            <span className="text-sm font-bold text-background">AI</span>
          </div>
          <span className="hidden font-semibold sm:inline-block" data-testid="text-logo">
            AI x Marketing
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/landscape"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              location === "/landscape" ? "text-foreground" : "text-muted-foreground"
            )}
            data-testid="link-landscape"
          >
            Landscape
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground",
              location === "/about" ? "text-foreground" : "text-muted-foreground"
            )}
            data-testid="link-about"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
