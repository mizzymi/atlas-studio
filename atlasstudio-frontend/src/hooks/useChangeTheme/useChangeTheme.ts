"use client";

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/AppStore';
import type { UiTheme } from '@/store/reducers/Ui/UiReducer';

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the useChangeTheme, that this custom
 * hook will return only one property that an object of this
 * type.
 */
interface UseChangeThemeReturn {
  /**
   * Raw theme stored in the Ui slice.
   * Can be: 'light' | 'dark' | 'system'.
   */
  theme: UiTheme;

  /**
   * Effective theme that the UI will use after resolving 'system'
   * against the OS preference. Always 'light' or 'dark'.
   */
  resolvedTheme: 'light' | 'dark';

  /**
   * Manually set the theme in the store.
   */
  setTheme: (nextTheme: UiTheme) => void;

  /**
   * Toggle between 'light' and 'dark'.
   * If current theme is 'system', it toggles from resolvedTheme.
   */
  toggleTheme: () => void;
}

/**
 * **DESCRIPTION:**
 *
 * This interface currently have 0 properties but if you add any property
 * you must document it and type it correctly for the usability of the custom hook.
 */
interface UseChangeThemeProps { }

/**
 * **DESCRIPTION:**
 *
 * `useChangeTheme` centralizes all theme-related logic:
 *
 * - Reads `theme` from the global AppStore (`state.ui.theme`).
 * - Resolves `'system'` using `prefers-color-scheme: dark`.
 * - Persists the theme in `localStorage` so it survives reloads.
 * - Exposes helpers to change the theme (`setTheme`, `toggleTheme`).
 * - Syncs the resolved theme with the DOM
 *   (`document.documentElement.dataset.theme = 'light' | 'dark'`).
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `theme`: raw value from store (`'light' | 'dark' | 'system'`).
 * - `resolvedTheme`: `'light' | 'dark'` used by the UI.
 * - `setTheme(nextTheme)`: updates `state.ui.theme` in the store.
 * - `toggleTheme()`: convenience to flip between light/dark.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * const {
 *   theme,
 *   resolvedTheme,
 *   setTheme,
 *   toggleTheme,
 * } = useChangeTheme({});
 */
export const useChangeTheme = ({ }: UseChangeThemeProps): UseChangeThemeReturn => {
  const { state, dispatch } = useAppStore();
  const theme = state.ui.theme;

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    theme === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('atlas-ui-theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      if (stored !== theme) {
        dispatch({
          type: 'ui/setTheme',
          payload: stored as UiTheme,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setResolvedTheme(theme === 'light' ? 'light' : 'dark');
      return;
    }

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');

      const update = () => {
        setResolvedTheme(media.matches ? 'dark' : 'light');
      };

      update();
      media.addEventListener('change', update);

      return () => {
        media.removeEventListener('change', update);
      };
    }

    setResolvedTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('atlas-ui-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  const setTheme = (nextTheme: UiTheme) => {
    dispatch({
      type: 'ui/setTheme',
      payload: nextTheme,
    });
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      return;
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
};