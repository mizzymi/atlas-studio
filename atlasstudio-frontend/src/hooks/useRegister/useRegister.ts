"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCheckSession } from "@/hooks/useCheckSession/useCheckSession";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * **DESCRIPTION:**
 *
 * With this interface we can represent the return of the
 * custom hook of the `useRegisterPage`. This hook centralizes
 * all the logic related to:
 *
 * - Checking if there is an existing authenticated session.
 * - Handling the local registration form state.
 * - Handling Google OAuth registration trigger.
 * - Managing loading and error states.
 */
interface UseRegisterPageReturn {
  /**
   * Current value of the name field (optional).
   */
  name: string;

  /**
   * Current value of the email field.
   */
  email: string;

  /**
   * Current value of the password field.
   */
  password: string;

  /**
   * Current value of the confirm password field.
   */
  confirmPassword: string;

  /**
   * Indicates whether the session checking (`/api/me`)
   * is still in progress.
   */
  checkingSession: boolean;

  /**
   * Indicates whether the Google OAuth button is in a loading state.
   */
  loadingGoogle: boolean;

  /**
   * Global error message for the registration flow, if any.
   */
  error: string | null;

  /**
   * Indicates whether the local registration request is in progress.
   */
  loading: boolean;

  /**
   * Indicates if the password and confirm password fields
   * do not match and both have some content.
   */
  passwordsMismatch: boolean;

  /**
   * Setter for the name field.
   */
  setName: (value: string) => void;

  /**
   * Setter for the email field.
   */
  setEmail: (value: string) => void;

  /**
   * Setter for the password field.
   */
  setPassword: (value: string) => void;

  /**
   * Setter for the confirm password field.
   */
  setConfirmPassword: (value: string) => void;

  /**
   * Triggers the Google OAuth registration redirection.
   */
  handleGoogleRegister: () => void;

  /**
   * Handles the local registration form submission
   * against `/api/auth/register`.
   */
  handleRegister: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * **DESCRIPTION:**
 *
 * This interface currently has 0 properties. If you add any property
 * you must document it and type it correctly for the usability
 * of the custom hook.
 */
interface UseRegisterPageProps { }

/**
 * **DESCRIPTION:**
 *
 * The `useRegisterPage` hook encapsulates all logic needed for the
 * Register page:
 *
 * - It uses `useCheckSession` to call `/api/me` and, if a session
 *   exists, redirects to `/WebCreator`.
 * - It manages the state of the registration form (`name`, `email`,
 *   `password`, `confirmPassword`).
 * - It validates that both password fields match.
 * - It exposes handlers to:
 *   - Trigger Google OAuth registration.
 *   - Submit the local registration form to `/api/auth/register`.
 *
 * **RETURNS:**
 *
 * @returns returns an object with the properties of:
 * - `name`, `email`, `password`, `confirmPassword`
 * - `checkingSession`, `loadingGoogle`, `error`, `loading`
 * - `passwordsMismatch`
 * - `setName`, `setEmail`, `setPassword`, `setConfirmPassword`
 * - `handleGoogleRegister`, `handleRegister`
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * const {
 *   name,
 *   email,
 *   password,
 *   confirmPassword,
 *   checkingSession,
 *   loadingGoogle,
 *   error,
 *   loading,
 *   passwordsMismatch,
 *   setName,
 *   setEmail,
 *   setPassword,
 *   setConfirmPassword,
 *   handleGoogleRegister,
 *   handleRegister,
 * } = useRegisterPage({});
 */
export const useRegisterPage = ({ }: UseRegisterPageProps): UseRegisterPageReturn => {
  const router = useRouter();

  const { checkingSession } = useCheckSession({
    redirectAuthenticatedTo: "/WebCreator",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleRegister = () => {
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return;
    }
    setLoadingGoogle(true);
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        router.push("/Login");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Could not register. Try again.");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordsMismatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  return {
    name,
    email,
    password,
    confirmPassword,
    checkingSession,
    loadingGoogle,
    error,
    loading,
    passwordsMismatch,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleGoogleRegister,
    handleRegister,
  };
};
