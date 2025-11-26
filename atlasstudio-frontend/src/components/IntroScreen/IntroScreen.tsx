"use client";

import type { FC } from "react";
import Image from "next/image";
import { useIntroScreen } from "@/hooks/useIntroScreen/useIntroScreen";

/**
 * **DESCRIPTION:**
 *
 * Introductory fullscreen screen for Atlas Studio on small devices.
 * This component renders the hero background, main title and
 * the “Start” call-to-action, delegating all navigation and
 * responsive behavior to the `useIntroScreen` custom hook.
 *
 * - It only remains visible while `allowIntro` is `true`.
 * - Slide and fade animations are controlled by the hook flags.
 * - When the animation finishes, the user is redirected to `/Login`
 *   (or the path configured in the hook).
 *
 * This component is purely presentational; logic is encapsulated
 * in the `useIntroScreen` hook.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * // app/page.tsx
 * import { IntroScreen } from "@/components/IntroScreen/IntroScreen";
 *
 * const HomePage = () => <IntroScreen />;
 */
export const IntroScreen: FC = () => {
  const { allowIntro, isSliding, isFading, triggerSlideToLogin } =
    useIntroScreen({});

  if (allowIntro === null) {
    return <main className="min-h-screen w-full bg-black" />;
  }

  if (allowIntro === false) {
    return null;
  }

  return (
    <main
      data-testid="IntroScreen-Page"
      className={`
        relative min-h-screen w-full overflow-hidden
        flex items-end justify-center
        bg-black text-white
        transition-all duration-700 ease-out
        ${isSliding ? "-translate-y-full" : "translate-y-0"}
        ${isFading ? "opacity-0" : "opacity-100"}
      `}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/atlas-intro-bg.jpg"
          alt="Earth from space at night"
          fill
          priority
          className="object-cover h-dvh"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      </div>

      <section className="relative z-10 w-full px-7 pb-16">
        <h1 className="text-4xl font-extrabold leading-tight mb-3">
          <span className="block text-[#26f3c7]">Atlas Studio</span>
        </h1>

        <p className="text-lg leading-relaxed max-w-xs">
          <span className="block">Make your own</span>
          <span className="block">
            <span className="text-[#26f3c7] font-semibold">WebSites</span>, master
            your domain.
          </span>
        </p>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={triggerSlideToLogin}
            className="flex flex-col items-center gap-2 focus:outline-none"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-white/60">
              Start
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="7 11 12 6 17 11" />
                <polyline points="7 18 12 13 17 18" />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};
