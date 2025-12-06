import { cn } from "@/lib/utils";

interface LogoFallbackProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorPalette = [
  "bg-zinc-800",
  "bg-zinc-700",
  "bg-zinc-600",
  "bg-zinc-500",
  "bg-neutral-800",
  "bg-neutral-700",
  "bg-stone-700",
  "bg-stone-600",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-12 w-12 text-base",
};

export function LogoFallback({ name, size = "md", className }: LogoFallbackProps) {
  const bgColor = getColorFromName(name);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md font-semibold text-white",
        bgColor,
        sizeClasses[size],
        className
      )}
      data-testid={`logo-fallback-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      {initial}
    </div>
  );
}
