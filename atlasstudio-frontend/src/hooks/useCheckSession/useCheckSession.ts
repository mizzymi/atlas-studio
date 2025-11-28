"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppStore } from "@/store/AppStore";

/**
 * **DESCRIPTION:**
 *
 * Return type for `useCheckSession`. Since we no longer perform
 * any HTTP request here, `checkingSession` will usually be `false`
 * unless you decide to drive it from the reducer manually.
 */
interface UseCheckSessionReturn {
  /**
   * Indicates whether a session check is in progress, as seen
   * from the Auth reducer. In this simplified version it will
   * normally be `false`.
   */
  checkingSession: boolean;
}

/**
 * **DESCRIPTION:**
 *
 * Hook props:
 * - `redirectAuthenticatedTo` (optional): if provided and the
 *   user is already authenticated (`isAuthenticated === true`),
 *   the hook will immediately perform `router.replace` to that
 *   path.
 */
interface UseCheckSessionProps {
  redirectAuthenticatedTo?: string;
}

/**
 * **DESCRIPTION:**
 *
 * `useCheckSession` NOW:
 *
 * - Does NOT perform ANY `fetch` calls.
 * - Does NOT dispatch auth check actions.
 * - Simply reads `isAuthenticated` (and `checkingSession`) from
 *   the Auth slice of the global AppStore.
 * - If `isAuthenticated` is true and `redirectAuthenticatedTo`
 *   is provided, it redirects.
 */
export const useCheckSession = ({
  redirectAuthenticatedTo,
}: UseCheckSessionProps): UseCheckSessionReturn => {
  const router = useRouter();
  const { state } = useAppStore();
  const { checkingSession, isAuthenticated } = state.auth;

  useEffect(() => {
    if (isAuthenticated && redirectAuthenticatedTo) {
      router.replace(redirectAuthenticatedTo);
    }
  }, [isAuthenticated, redirectAuthenticatedTo, router]);

  return { checkingSession: false };
};
