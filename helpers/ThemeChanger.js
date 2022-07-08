import { useEffect, useState } from "react";

function ThemeChanger() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "default"
  );
  const colorTheme = theme === "default" ? "light" : "default";

  useEffect(() => {
    const root = window.document.documentElement;

    root.setAttribute('data-theme', theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [colorTheme, setTheme];
}

export default ThemeChanger;