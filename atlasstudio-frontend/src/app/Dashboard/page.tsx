"use client";

import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import { type FC } from "react";
import { useDashboardPage } from "@/hooks/useDashboard/useDashboard";

/**
 * **DESCRIPTION:**
 *
 * Main Dashboard of Atlas Studio after a successful login.
 * It displays a centered card with a short description and
 * a logout button that will terminate the current session.
 *
 * All potential business logic (future metrics, user data, etc.)
 * is intended to be handled inside the `useDashboardPage` hook.
 *
 * **ROUTE:**
 *
 * This file represents the route: `/Dashboard`
 *
 * **RETURNS:**
 *
 * @returns A minimal dashboard layout containing:
 * - A small header with app name and title.
 * - A short description encouraging the user to create webs.
 * - A `LogoutButton` component to close the current session.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * // Just navigate to /Dashboard in your browser.
 * // The routing is handled automatically by Next.js.
 */
const DashboardPage: FC = () => {
  // Currently not returning anything, but ready for future usage
  useDashboardPage({});

  return (
    <main
      data-testid="Dashboard-Page"
      className="
        min-h-screen
        bg-[#05070B]
        text-white
        flex
        items-center
        justify-center
        px-4
        py-8
      "
    >
      <section
        className="
          w-full
          max-w-sm
          rounded-2xl
          bg-[#111319]
          border
          border-white/5
          shadow-xl
          shadow-black/60
          px-6
          py-7
        "
      >
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Atlas-studio
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Create your own webs.
          </p>
        </header>

        <LogoutButton />

        <p className="mt-4 text-[11px] text-center text-slate-500">
          Not the right account? Close session and sign in again.
        </p>
      </section>
    </main>
  );
};

export default DashboardPage;
