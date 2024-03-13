import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system"; // Define acceptable theme values

type ThemeProviderProps = {
  // Props for ThemeProvider component
  children: React.ReactNode; // React children prop to wrap child components
  defaultTheme?: Theme; // Optional default theme
  storageKey?: string; // Optional localStorage key for saving theme preference
};

type ThemeProviderState = {
  // State and setter for theme context
  theme: Theme; // Current theme state
  setTheme: (theme: Theme) => void; // Function to update theme
};

const initialState: ThemeProviderState = {
  // Initial state for theme context
  theme: "system", // Default to system theme
  setTheme: () => null, // Placeholder function for initial state
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState); // Create context with initial state

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    // Initialize theme state from localStorage or use default
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    // Effect to apply the current theme to the document root
    const root = window.document.documentElement; // Access the root element

    root.classList.remove("light", "dark"); // Clear existing theme classes

    if (theme === "system") {
      // If system theme, detect and apply system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme); // Apply the selected theme
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme); // Save theme preference to localStorage
      setTheme(theme); // Update theme state
    },
  };

  // Provide theme context to child components
  return (
    <ThemeProviderContext.Provider
      {...props}
      value={value}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  // Custom hook to access theme context
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    // Ensure hook is used within a ThemeProvider
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
