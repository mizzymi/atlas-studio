"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/AppStore";
import type { UiTheme } from "@/store/reducers/Ui/UiReducer";

interface UseChangeThemeReturn {
  theme: UiTheme;
  resolvedTheme: "light" | "dark";
  setTheme: (nextTheme: UiTheme) => void;
  toggleTheme: () => void;
}

interface UseChangeThemeProps {}

/**
 * `useChangeTheme`:
 *
 * - Lee `theme` del AppStore.
 * - Calcula `resolvedTheme` ('light'|'dark') resolviendo 'system'
 *   usando `prefers-color-scheme: dark`.
 * - Devuelve helpers para cambiar el tema (setTheme, toggleTheme).
 *
 * NO toca localStorage ni `document.documentElement.dataset.theme`.
 * Eso lo hace `useThemeInitializer` a nivel global.
 */
export const useChangeTheme = (
  {}: UseChangeThemeProps
): UseChangeThemeReturn => {
  const { state, dispatch } = useAppStore();
  const theme = state.ui.theme;

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      setResolvedTheme(theme === "dark" ? "dark" : "light");
      return;
    }

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const update = () => {
        setResolvedTheme(media.matches ? "dark" : "light");
      };

      update();
      media.addEventListener("change", update);

      return () => {
        media.removeEventListener("change", update);
      };
    }

    setResolvedTheme(theme === "dark" ? "dark" : "light");
  }, [theme]);

  const setTheme = (nextTheme: UiTheme) => {
    dispatch({
      type: "ui/setTheme",
      payload: nextTheme,
    });
  };

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }

    setTheme(theme === "dark" ? "light" : "dark");
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};
