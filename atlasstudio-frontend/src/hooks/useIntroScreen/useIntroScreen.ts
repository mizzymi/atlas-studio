"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the useIntroScreen. This hook centralizes
 * all the logic related to:
 *
 * - Deciding if the IntroScreen must be shown or not.
 * - Handling the "slide" animation to go to the login page.
 * - Handling the "fade" animation when the viewport becomes desktop.
 * - Triggering the redirection to the login route.
 */
interface UseIntroScreenReturn {
  /**
   * Indicates whether the IntroScreen should be rendered.
   * - `null`: still deciding (first render / hydration).
   * - `true`: intro must be rendered.
   * - `false`: intro must not be rendered (desktop direct redirect).
   */
  allowIntro: boolean | null;

  /**
   * `true` when the slide-up animation should be applied.
   */
  isSliding: boolean;

  /**
   * `true` when the fade-out animation should be applied.
   */
  isFading: boolean;

  /**
   * Triggers the slide animation and redirects to the login page
   * when the animation finishes. Intended to be used on the
   * "Start" button click.
   */
  triggerSlideToLogin: () => void;
}

/**
 * **DESCRIPTION:**
 *
 * This interface currently has 3 optional properties to configure:
 * - The desktop breakpoint.
 * - The redirect path.
 * - The transition duration in milliseconds.
 *
 * If you add any property, you must document it and type it correctly
 * for the usability of the custom hook.
 */
interface UseIntroScreenProps {
  /**
   * Width in pixels considered as "desktop".
   * When the window width is greater or equal than this value,
   * the IntroScreen will not be shown on first render.
   *
   * @default 1024
   */
  desktopBreakpoint?: number;

  /**
   * Path where the user will be redirected once the animation ends.
   *
   * @default "/Login"
   */
  redirectPath?: string;

  /**
   * Duration of the slide / fade animations in milliseconds.
   * Must be kept in sync with the Tailwind transition duration.
   *
   * @default 650
   */
  transitionDurationMs?: number;
}

/**
 * **DESCRIPTION:**
 *
 * The `useIntroScreen` hook centralizes all the behavior for the
 * IntroScreen page:
 *
 * - On mount it checks the viewport width:
 *   - If it"s desktop (>= `desktopBreakpoint`) it redirects directly
 *     to `redirectPath` without showing the intro.
 *   - Otherwise it allows the IntroScreen to be rendered.
 * - It listens to the wheel event to trigger a slide-up animation
 *   and then navigates to `redirectPath`.
 * - It listens to the resize event and, if the viewport becomes
 *   desktop while the IntroScreen is visible, it triggers a fade-out
 *   animation and then navigates to `redirectPath`.
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `allowIntro`: `boolean | null` → controls whether the intro
 *   must be rendered.
 * - `isSliding`: `boolean` → slide animation flag.
 * - `isFading`: `boolean` → fade animation flag.
 * - `triggerSlideToLogin`: `() => void` → function to manually
 *   start the slide animation and redirect.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * const { allowIntro, isSliding, isFading, triggerSlideToLogin } =
 *   useIntroScreen({});
 */
export const useIntroScreen = ({
  desktopBreakpoint = 1024,
  redirectPath = "/Login",
  transitionDurationMs = 650,
}: UseIntroScreenProps): UseIntroScreenReturn => {
  const router = useRouter();

  const [allowIntro, setAllowIntro] = useState<boolean | null>(null);
  const [animation, setAnimation] = useState<"none" | "slide" | "fade">("none");

  const hasStartedTransition = useRef(false);

  const triggerSlideToLogin = useCallback(() => {
    if (hasStartedTransition.current) return;
    hasStartedTransition.current = true;

    setAnimation("slide");

    setTimeout(() => {
      router.replace(redirectPath);
    }, transitionDurationMs);
  }, [redirectPath, router, transitionDurationMs]);

  const triggerFadeToLogin = useCallback(() => {
    if (hasStartedTransition.current) return;
    hasStartedTransition.current = true;

    setAnimation("fade");

    setTimeout(() => {
      router.replace(redirectPath);
    }, transitionDurationMs);
  }, [redirectPath, router, transitionDurationMs]);

  useEffect(() => {
    const isDesktop = window.innerWidth >= desktopBreakpoint;

    if (isDesktop) {
      setAllowIntro(false);
      router.replace(redirectPath);
    } else {
      setAllowIntro(true);
    }
  }, [desktopBreakpoint, redirectPath, router]);

  useEffect(() => {
    if (!allowIntro) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > 20) {
        event.preventDefault();
        triggerSlideToLogin();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [allowIntro, triggerSlideToLogin]);

  useEffect(() => {
    if (!allowIntro) return;

    const handleResize = () => {
      if (window.innerWidth >= desktopBreakpoint) {
        triggerFadeToLogin();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [allowIntro, desktopBreakpoint, triggerFadeToLogin]);

  return {
    allowIntro,
    isSliding: animation === "slide",
    isFading: animation === "fade",
    triggerSlideToLogin,
  };
};
