"use client";

import type { FC } from "react";
import { useWebCreatorPage } from "@/hooks/useWebCreator/useWebCreator";

/**
 * **DESCRIPTION:**
 *
 * Protected page for the WebCreator. It fetches the authenticated user
 * from the backend (`/api/me`) and redirects to `/Login` if there is no
 * active session. All logic is delegated to the `useWebCreatorPage` hook.
 *
 * **ROUTE:**
 *
 * This file represents the route: `/WebCreator`
 *
 * **RETURNS:**
 *
 * @returns A protected layout for the WebCreator with:
 * - A header showing the Atlas Studio title and the user name or email.
 * - A placeholder section as an entry point for the WebCreator features.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * // Just navigate to /WebCreator in your browser.
 * // The routing and protection are handled on page mount.
 */
const WebCreatorPage: FC = () => {
  const { user, loading } = useWebCreatorPage({});

  if (loading) {
    return (
      <main
        data-testid="WebCreator-Page"
        className="min-h-screen flex items-center justify-center bg-[#050509] text-white"
      >
        <p>Cargando...</p>
      </main>
    );
  }

  if (!user) {
    // If no user is available and not loading, the hook has already
    // tried to redirect; we avoid rendering anything else.
    return null;
  }

  return (
    <main
      data-testid="WebCreator-Page"
      className="min-h-screen bg-[#050509] text-white"
    >
      <header className="p-6 border-b border-white/10">
        <h1 className="text-xl font-semibold">Atlas Studio Web Creator</h1>
        <p className="text-sm text-gray-400">
          Bienvenido, {user.name ?? user.email}
        </p>
      </header>

      <section className="p-6">
        Entry Point for WebCreator page. Good Luck!
      </section>
    </main>
  );
};

export default WebCreatorPage;
