import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface MarkdownProps {
  content: string;
  className?: string;
}

/**
 * Renders long-form markdown (category / subcategory body copy) with the same
 * prose typography used elsewhere in the app. Links open in a new tab.
 */
export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={`prose prose-neutral dark:prose-invert max-w-none ${className ?? ""}`}
      data-testid="markdown-content"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Wide tables scroll inside the column instead of widening the page on phones.
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props}>{children}</table>
            </div>
          ),
          a: ({ href, children, ...props }) => {
            // HYPD signup links are calls to action: render them as the brand button.
            if (href?.startsWith("https://app.hypd.ai/")) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonVariants()} not-prose mr-4 no-underline`}
                  {...props}
                >
                  {children}
                  <ArrowRight />
                </a>
              );
            }
            const isInternal = href?.startsWith("/");
            return (
              <a
                href={href}
                {...(isInternal
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
