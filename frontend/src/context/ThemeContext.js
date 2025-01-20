import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    // Optional: Update body background when theme changes
    document.body.style.backgroundColor = !isDarkMode
      ? "var(--bg-dark)"
      : "var(--bg-light)";
    document.body.style.color = !isDarkMode
      ? "var(--text-dark)"
      : "var(--text-light)";
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
