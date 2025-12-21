import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="About"
        description="Learn about the GenAI Marketing Landscape - your comprehensive resource for discovering the best AI-powered marketing solutions."
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
              The GenAI Marketing Landscape is a comprehensive resource for discovering
              the best AI-powered marketing solutions. Our goal is to help marketers,
              agencies, and businesses find the right tools to enhance their marketing efforts.
            </p>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">What We Cover</h2>
              <ul className="space-y-2">
                <li>Plan - Market research, audience intelligence, competitive analysis, AI assistants</li>
                <li>Create - Ad creative, copywriting & SEO, landing pages, social & influencers</li>
                <li>Activate - Campaign management, email & outreach, AI ad platforms, shopping assistants</li>
                <li>Measure - Attribution, analytics, AI visibility</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Submit a Tool</h2>
              <p>
                Know of a great AI marketing tool that should be in our directory?
                We'd love to hear from you. Send us an email at{" "}
                <a
                  href="mailto:contact@hypd.ai?subject=Tool%20Submission%20%F0%9F%8E%84%F0%9F%90%A3%F0%9F%8E%85"
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
