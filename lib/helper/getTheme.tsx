// utils/getTheme.ts
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"; // default on server

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDark ? "dark" : "light";
}
