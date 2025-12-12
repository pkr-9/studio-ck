import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // If currently dark, switch to light
    if (theme === "dark") {
      setTheme("light");
    }
    // If currently light, switch to dark
    else if (theme === "light") {
      setTheme("dark");
    }
    // If currently 'system', check what the system actually is and flip it
    else {
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemIsDark ? "light" : "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="focus-visible:ring-0"
      onClick={toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
