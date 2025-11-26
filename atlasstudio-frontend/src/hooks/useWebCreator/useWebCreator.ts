"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the `useWebCreatorPage`. This hook centralizes
 * the protection logic for the WebCreator route.
 *
 * It is responsible for:
 * - Fetching the authenticated user from `/api/me`.
 * - Redirecting to `/Login` when there is no active session.
 * - Exposing the loading state and the user object.
 */
interface UseWebCreatorPageReturn {
  /**
   * The authenticated user object returned by `/api/me`,
   * or `null` if no user is available.
   */
  user: any | null;

  /**
   * Indicates whether the user loading process is still in progress.
   */
  loading: boolean;
}

/**
 * **DESCRIPTION:**
 *
 * This interface currently has 0 properties but if you add any property
 * you must document it and type it correctly for the usability of
 * the custom hook.
 */
interface UseWebCreatorPageProps {}

/**
 * **DESCRIPTION:**
 *
 * The `useWebCreatorPage` hook encapsulates the protection logic
 * for the `/WebCreator` route:
 *
 * - On mount, it calls `/api/me` with `credentials: "include"`.
 * - If the response status is `401`, it redirects to `/Login`.
 * - If the response is `200`, it stores the user object in local state.
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `user`: the authenticated user or `null`.
 * - `loading`: `true` while the user is being loaded.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * const { user, loading } = useWebCreatorPage({});
 */
export const useWebCreatorPage = ({}: UseWebCreatorPageProps): UseWebCreatorPageReturn => {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/me`, {
          credentials: "include",
        });

        if (res.status === 401) {
          router.replace("/Login");
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return {
    user,
    loading,
  };
};
