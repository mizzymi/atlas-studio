"use client";

import { useEffect, type FC } from "react";
import { useWebCreatorPage } from "@/hooks/useWebCreator/useWebCreator";
import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";
import { Header } from "@/components/Header/Header";
import router from "next/router";

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
  const { resolvedTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);
  
  if (loading) {
    return (
      <main
        data-testid="WebCreator-Page"
        className={`
          min-h-screen
          flex
          items-center
          justify-center
          transition-colors
          duration-300
          ${isDarkMode ? "bg-[#050509] text-white" : ""}
        `}
        style={
          !isDarkMode
            ? {
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }
            : {
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
            }
        }
      >
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main
      data-testid="WebCreator-Page"
      className={`
        min-h-screen
        transition-colors
        duration-300
        ${isDarkMode ? "bg-[#050509] text-white" : ""}
      `}
      style={
        !isDarkMode
          ? {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          }
          : {
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
          }
      }
    >
      <Header />

      <section className="p-6">
        Entry Point for WebCreator page. Good Luck!
      </section>
    </main>
  );
};

export default WebCreatorPage;
