import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          a: ({ href, children, ...props }) => {
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
