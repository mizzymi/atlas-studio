'use client';

import { type FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useChangeTheme } from '@/hooks/useChangeTheme/useChangeTheme';

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * This interface currently has 0 properties but if you add any property
 * you must document it and type it correctly for the usability of the component.
 *
 */
interface ThemeSwitcherProps { }

/**
 * **DESCRIPTION:**
 *
 * `ThemeSwitcher` renders a small icon button that toggles the UI theme
 * between **light** and **dark** modes.
 *
 * Internally it uses the `useChangeTheme` custom hook, which is connected
 * to the global `Ui` slice (via `UiReducer`). The button shows:
 *
 * - A **sun** icon when the current `resolvedTheme` is `light`.
 * - A **moon** icon when the current `resolvedTheme` is `dark`.
 *
 * On click, it calls `toggleTheme()` from the hook to switch to the
 * opposite theme.
 *
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <header className="flex items-center justify-between px-4 py-3">
 *     <span>Atlas Studio</span>
 *     <ThemeSwitcher />
 *   </header>
 * )
 */
export const ThemeSwitcher: FC<ThemeSwitcherProps> = () => {
  const { resolvedTheme, toggleTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      data-testid="ThemeSwitcher-Component"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        inline-flex
        items-center
        justify-center
        w-9
        h-9
        rounded-full
        border
        text-xs
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        items-center
        justify-center
        focus:ring-offset-2
        ${isDarkMode
          ? 'border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 focus:ring-slate-500 focus:ring-offset-[#05070B]'
          : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 focus:ring-sky-500 focus:ring-offset-white'
        }
      `}
    >
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>

      <span className="relative inline-flex">
        {/* Sun icon (visible in light mode) */}
        <Sun
          className={`
            h-4
            w-4
            transition-all
            duration-200
            ${isDarkMode ? 'scale-0 opacity-0 -rotate-90' : 'scale-100 opacity-100 rotate-0'}
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
            ${isDarkMode ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-90'}
          `}
        />
      </span>
    </button>
  );
};
