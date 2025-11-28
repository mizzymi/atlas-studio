"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/AppStore";
import type { UiTheme } from "@/store/reducers/Ui/UiReducer";

interface UseThemeInitializerReturn {}
interface UseThemeInitializerProps {}

const STORAGE_KEY = "atlas-ui-theme";

/**
 * `useThemeInitializer`:
 *
 * - En el primer montaje (cliente), lee el último tema de localStorage.
 * - Si es válido y distinto al del store, hace UN dispatch para sincronizar.
 * - Cada vez que cambia `state.ui.theme`:
 *   - Resuelve 'system' -> 'light' | 'dark'.
 *   - Pone `data-theme="light|dark"` en <html>.
 *   - Persiste el tema crudo ('light' | 'dark' | 'system') en localStorage.
 */
export const useThemeInitializer = (
  {}: UseThemeInitializerProps
): UseThemeInitializerReturn => {
  const { state, dispatch } = useAppStore();
  const currentTheme = state.ui.theme;
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY) as UiTheme | null;

    if (stored === "light" || stored === "dark" || stored === "system") {
      if (stored !== currentTheme) {
        dispatch({
          type: "ui/setTheme",
          payload: stored,
        });
      }
    }
  }, []); 

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const effectiveTheme: "light" | "dark" =
      currentTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : currentTheme === "dark"
        ? "dark"
        : "light";

    document.documentElement.dataset.theme = effectiveTheme;

    window.localStorage.setItem(STORAGE_KEY, currentTheme);
  }, [currentTheme]);

  return {};
};
