"use client";

import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import { type FC } from "react";
import { useDashboardPage } from "@/hooks/useDashboard/useDashboard";
import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";
import { Header } from "@/components/Header/Header";

const DashboardPage: FC = () => {
  useDashboardPage({});
  const { resolvedTheme } = useChangeTheme({});

  const isDarkMode = resolvedTheme === "dark";

  const mainClasses = `
    min-h-screen
    flex
    flex-col
    transition-colors
    duration-300
    ${isDarkMode ? "bg-[#05070B] text-white" : ""}
  `;

  const cardBaseClasses = `
    w-full
    max-w-md
    rounded-2xl
    border
    px-8
    py-7
    shadow-xl
    transition-colors
    duration-300
  `;

  const cardDarkClasses = `
    bg-[#111319]
    border-white/5
    shadow-black/60
  `;

  return (
    <main
      data-testid="Dashboard-Page"
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
      className={mainClasses}
    >
      <Header />

      {/* Contenedor central del contenido */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <section
          className={`${cardBaseClasses} ${isDarkMode ? cardDarkClasses : "bg-white"
            }`}
          style={
            !isDarkMode
              ? {
                borderColor: "rgba(28, 164, 255, 0.1)",
                boxShadow: "0 18px 45px rgba(23, 23, 23, 0.06)",
              }
              : undefined
          }
        >
          {/* Cabecera de la tarjeta */}
          <header className="mb-6 border-b border-white/5 pb-5">
            <p
              className="
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-[11px]
                uppercase
                tracking-[0.18em]
              "
              style={
                isDarkMode
                  ? {
                    backgroundColor: "rgba(148, 163, 184, 0.08)",
                    color: "rgb(148, 163, 184)",
                  }
                  : {
                    backgroundColor: "rgba(39, 243, 200, 0.1)",
                    color: "var(--foreground)",
                  }
              }
            >
              Atlas Studio · Dashboard
            </p>

            <h1 className="mt-4 text-2xl font-semibold leading-tight">
              Account overview
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color: isDarkMode
                  ? "rgb(148, 163, 184)"
                  : "rgb(100, 116, 139)",
              }}
            >
              Manage your session and access your Atlas Studio workspace.
            </p>
          </header>

          <section className="space-y-4">

            <div className="mt-3">
              <LogoutButton />
            </div>

            <p
              className="mt-4 text-[11px]"
              style={{
                color: isDarkMode
                  ? "rgb(148, 163, 184)"
                  : "rgb(107, 114, 128)",
              }}
            >
              Not the right account? Close your session and sign in again with
              different credentials.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
