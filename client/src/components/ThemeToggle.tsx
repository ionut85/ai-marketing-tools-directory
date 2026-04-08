import { Egg, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
    >
      {theme === "light" && <Sun className="h-5 w-5" />}
      {theme === "dark" && <Moon className="h-5 w-5" />}
      {theme === "easter" && <Egg className="h-5 w-5" />}
    </Button>
  );
}
