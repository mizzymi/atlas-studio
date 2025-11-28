"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * **DESCRIPTION:**
 * 
 * With this interface we can represent the return of the
 * custom hook `useCheckSession`. This hook centralizes
 * the logic used to check if there is already an authenticated
 * user session in the backend.
 * 
 * It is shared by different auth flows (Login, Register, etc.)
 * to avoid duplicating the `/api/me` check in each hook.
 */
interface UseCheckSessionReturn {
  /**
   * Indicates whether the session checking request (`/api/me`)
   * is still in progress.
   */
  checkingSession: boolean;
}

/**
 * **DESCRIPTION:**
 * 
 * This interface defines the props accepted by `useCheckSession`.
 * 
 * - `redirectAuthenticatedTo` (optional): If provided and an
 *   authenticated user is detected, the hook will immediately
 *   redirect to this path using `router.replace`.
 * 
 * If you add new properties, you must document them and type them
 * correctly for the usability of the custom hook.
 */
interface UseCheckSessionProps {
  redirectAuthenticatedTo?: string;
}

/**
 * **DESCRIPTION:**
 * 
 * The `useCheckSession` hook encapsulates the logic to check
 * whether there is an active authenticated session.
 * 
 * - It calls `/api/me` on mount with `credentials: "include"`.
 * - If the response is `ok` and `redirectAuthenticatedTo` is
 *   provided, it performs a `router.replace` to that route.
 * - If there is no valid session (non-OK response or error),
 *   it simply exposes `checkingSession = false` so the
 *   calling component can render the auth page.
 * 
 * **RETURNS:**
 * 
 * @returns an object with:
 * - `checkingSession`: boolean flag indicating whether the
 *   session check is still running.
 * 
 * **EXAMPLE OF USE:**
 * 
 * @example
 * const { checkingSession } = useCheckSession({
 *   redirectAuthenticatedTo: "/WebCreator",
 * });
 */
export const useCheckSession = ({
  redirectAuthenticatedTo,
}: UseCheckSessionProps): UseCheckSessionReturn => {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      setCheckingSession(false);
      return;
    }

    const checkSession = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/me`, {
          credentials: "include",
        });

        if (res.ok) {
          if (redirectAuthenticatedTo) {
            router.replace(redirectAuthenticatedTo);
          }
        } else {
          setCheckingSession(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router, redirectAuthenticatedTo]);

  return { checkingSession };
};
