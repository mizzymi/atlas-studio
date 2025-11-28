"use client";

import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import { type FC } from "react";
import { useDashboardPage } from "@/hooks/useDashboard/useDashboard";
import { useChangeTheme } from '@/hooks/useChangeTheme/useChangeTheme';



const DashboardPage: FC = () => {
  useDashboardPage({});
  const { resolvedTheme } = useChangeTheme({});

  const isDarkMode = resolvedTheme === 'dark';

  const mainClasses = `
    min-h-screen
    flex
    items-center
    justify-center
    px-4
    py-8
    transition-colors
    duration-300
    ${isDarkMode ? "bg-[#05070B] text-white" : ""}
  `;

  const cardBaseClasses = `
    w-full
    max-w-sm
    rounded-2xl
    border
    px-6
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
        <header className="mb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.2em]
                  px-2
                  py-1
                  rounded-full
                  inline-flex
                  items-center
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
                Atlas-studio
              </p>

              <h1 className="mt-3 text-2xl font-semibold leading-tight">
                Dashboard
              </h1>

              <p
                className="mt-1 text-sm"
                style={{
                  color: isDarkMode ? "rgb(148, 163, 184)" : "rgb(100, 116, 139)",
                }}
              >
                Create your own webs.
              </p>
            </div>
          </div>
        </header>

        <LogoutButton />

        <p
          className="mt-4 text-[11px] text-center"
          style={{
            color: isDarkMode ? "rgb(148, 163, 184)" : "rgb(107, 114, 128)",
          }}
        >
          Not the right account? Close session and sign in again.
        </p>
      </section>
    </main>
  );
};

export default DashboardPage;
