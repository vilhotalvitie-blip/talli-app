import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@components/primitives/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/primitives/DropdownMenu";
import { useThemeStore } from "@stores/themeStore";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle() {
  const { mode, setMode } = useThemeStore();

  const getIcon = () => {
    switch (mode) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (mode) {
      case "light":
        return "Vaalea";
      case "dark":
        return "Tumma";
      case "system":
        return "Järjestelmä";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getIcon()}
          <span className="sr-only">Vaihda teema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setMode("light" as ThemeMode)}>
          <Sun className="mr-2 h-4 w-4" />
          Vaalea
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("dark" as ThemeMode)}>
          <Moon className="mr-2 h-4 w-4" />
          Tumma
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode("system" as ThemeMode)}>
          <Monitor className="mr-2 h-4 w-4" />
          Järjestelmä
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
