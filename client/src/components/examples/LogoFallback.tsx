import { LogoFallback } from "../LogoFallback";

export default function LogoFallbackExample() {
  return (
    <div className="flex items-center gap-4">
      <LogoFallback name="Jasper" size="sm" />
      <LogoFallback name="Copy.ai" size="md" />
      <LogoFallback name="Segment" size="lg" />
    </div>
  );
}
