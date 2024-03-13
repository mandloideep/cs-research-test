import { Moon, Sun } from "lucide-react"; // Import icons for light and dark mode

import { Button } from "@/components/ui/button"; // Reusable button component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Components for creating a dropdown menu
import { useTheme } from "@/components/theme-provider"; // Custom hook to access theme-related functionality

export function ModeToggle() {
  const { setTheme } = useTheme(); // Access the setTheme function from the theme context

  // Component UI with a button that toggles the theme and a dropdown for selecting the theme directly
  return (
    <div>
      <DropdownMenu>
        {/* Trigger for the dropdown menu */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            {/* Icons that change appearance based on the current theme */}
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            {/* Accessible text for screen readers */}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        {/* Dropdown menu items for selecting a specific theme */}
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
