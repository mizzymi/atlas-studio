"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the `useLoginPage`. This hook centralizes
 * all the logic related to:
 *
 * - Checking if there is an existing authenticated session.
 * - Handling the local login form state.
 * - Handling Google OAuth login trigger.
 * - Managing loading and error states.
 */
interface UseLoginPageReturn {
  /**
   * Indicates whether the Google OAuth button is in a loading state.
   */
  loadingGoogle: boolean;

  /**
   * Indicates whether the session checking (`/api/me`)
   * is still in progress.
   */
  checkingSession: boolean;

  /**
   * Current value of the email/username field.
   */
  email: string;

  /**
   * Current value of the password field.
   */
  password: string;

  /**
   * Error message for the local login flow, if any.
   */
  localError: string | null;

  /**
   * Indicates whether the local login request is in progress.
   */
  localLoading: boolean;

  /**
   * Setter for the email/username field.
   */
  setEmail: (value: string) => void;

  /**
   * Setter for the password field.
   */
  setPassword: (value: string) => void;

  /**
   * Triggers the Google OAuth login redirection.
   */
  handleGoogleLogin: () => void;

  /**
   * Handles the local login form submission
   * against `/api/auth/login`.
   */
  handleLocalLogin: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * **DESCRIPTION:**
 *
 * This interface currently has 0 properties. If you add any property
 * you must document it and type it correctly for the usability
 * of the custom hook.
 */
interface UseLoginPageProps {}

/**
 * **DESCRIPTION:**
 *
 * The `useLoginPage` hook encapsulates all logic needed for the
 * Login page:
 *
 * - On mount, it calls `/api/me` to check if there is an active session.
 *   - If an authenticated user is found, it redirects to `/WebCreator`.
 *   - Otherwise, it allows the Login page to render.
 * - It manages the state of the login form (`email`, `password`).
 * - It exposes handlers to:
 *   - Trigger Google OAuth login.
 *   - Submit the local login form to `/api/auth/login`.
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `loadingGoogle`, `checkingSession`
 * - `email`, `password`, `localError`, `localLoading`
 * - `setEmail`, `setPassword`
 * - `handleGoogleLogin`, `handleLocalLogin`
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * const {
 *   loadingGoogle,
 *   checkingSession,
 *   email,
 *   password,
 *   localError,
 *   localLoading,
 *   setEmail,
 *   setPassword,
 *   handleGoogleLogin,
 *   handleLocalLogin,
 * } = useLoginPage({});
 */
export const useLoginPage = ({}: UseLoginPageProps): UseLoginPageReturn => {
  const router = useRouter();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState(false);

  // Session check on mount
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
          router.replace("/WebCreator");
        } else {
          setCheckingSession(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [router, backendUrl]);

  const handleGoogleLogin = () => {
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return;
    }
    setLoadingGoogle(true);
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const handleLocalLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return;
    }

    setLocalLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("username", email);
      body.append("password", password);

      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (res.ok) {
        router.replace("/WebCreator");
      } else {
        setLocalError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setLocalError("Unexpected error. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    loadingGoogle,
    checkingSession,
    email,
    password,
    localError,
    localLoading,
    setEmail,
    setPassword,
    handleGoogleLogin,
    handleLocalLogin,
  };
};
