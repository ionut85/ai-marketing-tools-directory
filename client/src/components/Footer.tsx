import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 py-6 px-4 md:flex-row md:px-6 w-full">
        <p className="text-sm text-muted-foreground">
          AI x Marketing Tools Directory
        </p>
        <a
          href="mailto:submit@aimarketing.tools?subject=Tool%20Submission"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          data-testid="link-submit-tool"
        >
          <Mail className="h-4 w-4" />
          Submit a Tool
        </a>
      </div>
    </footer>
  );
}
