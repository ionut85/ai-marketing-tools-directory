import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import logoUrl from "@assets/logos/logo.png";
import categoriesData from "@/data/categories.json";
import type { Category } from "@/lib/types";

const HYPD_HOME = "https://www.hypd.ai/?utm_source=tools&utm_content=header";
const HYPD_SIGNUP = "https://app.hypd.ai/start?utm_source=tools&utm_content=header&utm_term=header";

export function Header() {
  const [location] = useLocation();
  const categories = categoriesData as Category[];

  const navLinks = [
    ...categories.map((c) => ({ href: `/category/${c.id}`, label: c.name })),
    { href: "/landscape", label: "Landscape" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="" className="h-8 w-8 rounded-md" />
            <span className="hidden whitespace-nowrap font-semibold sm:inline-block" data-testid="text-logo">
              GenAI Marketing Landscape
            </span>
          </Link>
          <a
            href={HYPD_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            data-testid="link-hypd-home"
          >
            by HYPD
          </a>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => {
            const active = location === l.href || location.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                  active ? "bg-muted text-foreground" : "text-muted-foreground",
                )}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Below xl the category links are hidden; keep the two original pages reachable. */}
          <Link href="/landscape" className="text-sm font-medium text-muted-foreground hover:text-foreground xl:hidden">
            Landscape
          </Link>
          <Link href="/about" className="ml-2 text-sm font-medium text-muted-foreground hover:text-foreground xl:hidden">
            About
          </Link>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex" data-testid="button-header-cta">
            <a href={HYPD_SIGNUP} target="_blank" rel="noopener noreferrer">
              Try HYPD free
              <ArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
