import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import chroma from "chroma-js"; // npm install chroma-js

const ThemeContext = createContext();

const defaultThemeSettings = {
  primaryColor: "#0d6efd",
  secondaryColor: "#6c757d",
  backgroundColor: "#f8f9fa",
  textColor: "#212529",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const deriveThemeVariables = ({
  primaryColor,
  secondaryColor,
  backgroundColor,
  textColor,
  fontFamily,
}) => {
  const primaryHover = chroma(primaryColor).darken(0.5).hex();
  const linkColor = chroma(primaryColor).brighten(0.3).hex();
  const linkHover = chroma(primaryColor).darken(0.3).hex();

  return {
    "--bs-body-bg": backgroundColor,
    "--bs-body-color": textColor,
    "--bs-primary": primaryColor,
    "--bs-secondary": secondaryColor,
    "--bs-border-color": "#dee2e6",
    "--bs-link-color": linkColor,
    "--bs-link-hover-color": linkHover,
    "--bs-font-sans-serif": fontFamily,
    "--bs-btn-hover-color": "#fff",
    "--bs-btn-hover-bg": primaryHover,
    "--bs-btn-hover-border-color": primaryHover,
  };
};

export const ThemeProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(defaultThemeSettings);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get("/api/theme");
        setThemeSettings(res.data.theme || defaultThemeSettings);
      } catch (err) {
        console.error("Failed to fetch theme", err);
      }
    };
    fetchTheme();
  }, []);

  useEffect(() => {
    const cssVars = deriveThemeVariables(themeSettings);
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [themeSettings]);

  const updateTheme = async (newSettings) => {
    const updated = { ...themeSettings, ...newSettings };
    setThemeSettings(updated);
    try {
      await axios.post("/api/theme", { theme: updated });
    } catch (err) {
      console.error("Failed to save theme", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
