import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { initGA } from "@/lib/analytics";
import { initPostHog } from "@/lib/posthog";
import { useAnalytics } from "@/hooks/use-analytics";
import Home from "@/pages/Home";
import ToolDetailPage from "@/pages/ToolDetailPage";
import CategoryPage from "@/pages/CategoryPage";
import SubcategoryPage from "@/pages/SubcategoryPage";
import Landscape from "@/pages/Landscape";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools/:slug" component={ToolDetailPage} />
      <Route path="/category/:slug/:subcategory" component={SubcategoryPage} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/landscape" component={Landscape} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Both init helpers fall back to a default key when the env var is
    // absent, so call them unconditionally and let them decide.
    initGA();
    initPostHog();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
