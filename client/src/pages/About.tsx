import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="About"
        description="Learn about the GenAI Marketing Landscape - a curated directory of GenAI-powered tools for marketing."
        keywords={["about AI marketing", "marketing tools directory", "AI advertising tools"]}
        canonicalUrl="/about"
      />
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-about-title">
            About GenAI Marketing Landscape
          </h1>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              The GenAI Marketing Landscape is a curated directory of GenAI-powered tools for marketing.
              The goal is to help marketers, agencies, and businesses discover the right tools to plan,
              create, activate, and measure marketing—faster and with less manual work.
            </p>

            <p>
              We started by reviewing tools across startups, indies, scale-ups, and publicly listed companies,
              and organizing them into a practical taxonomy. The current version is an MVP and will keep evolving.
            </p>

            <Separator className="my-8" />

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">What you'll find</h2>
              <ul className="space-y-2">
                <li><strong>Directory view:</strong> searchable tool cards with categories and use-cases</li>
                <li><strong>Landscape view:</strong> a category map to understand where tools cluster and how the ecosystem is shifting</li>
                <li><strong>Coverage:</strong> primarily the application layer (marketing workflows and tooling), not infrastructure/LLM stack</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">What we cover</h2>
              <ul className="space-y-2">
                <li><strong>Plan:</strong> market research, audience intelligence, competitive analysis, AI assistants</li>
                <li><strong>Create:</strong> ad creative, copywriting & SEO, landing pages, social & influencers</li>
                <li><strong>Activate:</strong> campaign management, email & outreach, AI ad platforms, shopping assistants</li>
                <li><strong>Measure:</strong> attribution, analytics, GenAI Visibility (GEO)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">What's next</h2>
              <ul className="space-y-2">
                <li>make the dataset available via MCP and/or a ChatGPT app</li>
                <li>add popularity/votes and simple comparisons</li>
                <li>make tool discovery/additions more automated (agentic browsing + structured outputs)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Submit a tool</h2>
              <p>
                Know a tool that should be included? Email{" "}
                <a
                  href="mailto:contact@hypd.ai"
                  className="text-foreground underline underline-offset-4"
                >
                  contact@hypd.ai
                </a>
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
