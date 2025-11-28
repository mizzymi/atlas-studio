"use client";

import { type FC } from "react";
import { Moon, Sun } from "lucide-react";
import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * This interface currently has 0 properties but if you add any property
 * you must document it and type it correctly for the usability of the component.
 *
 */
interface ThemeSwitcherProps {}

/**
 * **DESCRIPTION:**
 *
 * `ThemeSwitcher` renders a small icon button that toggles the UI theme
 * using the global `Ui` slice.
 *
 * - `theme` puede ser: 'light' | 'dark' | 'system'.
 * - `resolvedTheme` es siempre 'light' | 'dark' después de resolver 'system'
 *   contra `prefers-color-scheme`.
 *
 * El botón muestra:
 * - Icono de **sol** cuando `resolvedTheme === 'light'`.
 * - Icono de **luna** cuando `resolvedTheme === 'dark'`.
 * - Una pequeña chapa "AUTO" cuando `theme === 'system'`.
 */
export const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
  const { theme, resolvedTheme, toggleTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === "dark";
  const isSystem = theme === "system";

  const ariaLabel = isSystem
    ? `Switch theme (system: currently ${isDarkMode ? "dark" : "light"})`
    : isDarkMode
    ? "Switch to light mode"
    : "Switch to dark mode";

  return (
    <button
      type="button"
      data-testid="ThemeSwitcher-Component"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className={`
        inline-flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        text-xs
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        ${isDarkMode
          ? "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 focus:ring-slate-500 focus:ring-offset-[#05070B]"
          : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 focus:ring-sky-500 focus:ring-offset-white"
        }
      `}
    >
      <span className="sr-only">{ariaLabel}</span>

      <span className="relative inline-flex items-center justify-center">
        {/* Sun icon (visible in light mode) */}
        <Sun
          className={`
            h-4
            w-4
            transition-all
            duration-200
            ${isDarkMode ? "scale-0 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0"}
          `}
        />

        {/* Moon icon (visible in dark mode) */}
        <Moon
          className={`
            h-4
            w-4
            absolute
            transition-all
            duration-200
            ${isDarkMode ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90"}
          `}
        />

        {/* Badge "AUTO" cuando el tema es 'system' */}
        {isSystem && (
          <span
            className={`
              absolute
              -bottom-3
              left-1/2
              -translate-x-1/2
              rounded-full
              px-1.5
              py-0.5
              text-[9px]
              font-medium
              uppercase
              tracking-wide
              ${isDarkMode
                ? "bg-white/15 text-slate-100"
                : "bg-slate-900 text-slate-50"
              }
            `}
          >
            Auto
          </span>
        )}
      </span>
    </button>
  );
};
