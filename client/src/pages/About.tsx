import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-about-title">
            About AI x Marketing Tools
          </h1>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>
              The AI x Marketing Tools Directory is a comprehensive resource for discovering
              the best AI-powered marketing solutions. Our goal is to help marketers,
              agencies, and businesses find the right tools to enhance their marketing efforts.
            </p>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">What We Cover</h2>
              <ul className="space-y-2">
                <li>Creative & Delivery - Content creation, creative intelligence, ad serving</li>
                <li>Measurement & Analytics - Attribution, marketing analytics, ROI tracking</li>
                <li>Media Facilitation - DSPs, retargeting, programmatic advertising</li>
                <li>Data Enablement - Identity resolution, CDPs, customer data platforms</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">Submit a Tool</h2>
              <p>
                Know of a great AI marketing tool that should be in our directory?
                We'd love to hear from you. Send us an email at{" "}
                <a
                  href="mailto:submit@aimarketing.tools?subject=Tool%20Submission"
                  className="text-foreground underline underline-offset-4"
                >
                  submit@aimarketing.tools
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
