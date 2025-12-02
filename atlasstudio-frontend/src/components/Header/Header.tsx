"use client";

import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";
import { PanelsTopLeft, UserRound } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * This interface currently has 0 properties but if you add any property
 * you must document it and type it correctly for the usability of the component.
 */
interface HeaderProps {}

/**
 * **DESCRIPTION:**
 *
 * Top navigation bar for Atlas Studio:
 * - Shows product name on the left.
 * - Shows quick access icons (WebCreator, Dashboard) on the right.
 */
export const Header: FC<HeaderProps> = () => {
  const { resolvedTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === "dark";

  return (
    <header
      data-testid="Header-Component"
      className={`
        flex
        items-center
        justify-between
        px-6
        py-4
        border-b
        transition-colors
        duration-300
        ${isDarkMode ? "border-white/10 bg-[#05070B]" : "bg-white"}
      `}
      style={
        !isDarkMode
          ? {
              borderBottomColor: "rgba(28, 164, 255, 0.1)",
            }
          : undefined
      }
    >
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-[0.2em] opacity-70">
          Atlas Studio
        </span>
        <h1 className="text-lg font-semibold leading-tight">
          Web Creator
        </h1>
      </div>

      <nav className="flex items-center gap-3">
        <Link
          href="/WebCreator"
          aria-label="Go to Web Creator"
          className={`
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            text-sm
            transition-colors
            ${isDarkMode
              ? "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
              : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"}
          `}
        >
          <PanelsTopLeft className="h-4 w-4" />
        </Link>

        <Link
          href="/Dashboard"
          aria-label="Go to Dashboard"
          className={`
            inline-flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            text-sm
            transition-colors
            ${isDarkMode
              ? "border-white/15 bg-white/5 text-slate-100 hover:bg-white/10"
              : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"}
          `}
        >
          <UserRound className="h-4 w-4" />
        </Link>
        <ThemeSwitcher />
      </nav>
    </header>
  );
};
