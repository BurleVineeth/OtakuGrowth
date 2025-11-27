import { createContext, useContext, useState, useEffect } from "react";
import { LocalStorageKeys } from "../constants";

export type Theme = "purple";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem(LocalStorageKeys.THEME) as Theme) || "purple"
  );

  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove("theme-purple");

    // Add new theme class
    root.classList.add(`theme-${theme}`);

    localStorage.setItem(LocalStorageKeys.THEME, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext)!;
