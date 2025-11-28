"use client";

import { useThemeInitializer } from "@/hooks/useThemeInitializer/useThemeInitializer";

/**
 * Pequeño componente cliente que sólo ejecuta el hook
 * `useThemeInitializer` por sus efectos (leer localStorage,
 * actualizar el store, poner data-theme, etc.).
 */
export function ThemeBootstrapper() {
  useThemeInitializer({});
  return null;
}
