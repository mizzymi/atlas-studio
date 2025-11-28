"use client";

import type { FC } from "react";
import Image from "next/image";
import { GoogleLoginButton } from "@/components/GoogleLoginButton/GoogleLoginButton";
import { useRegisterPage } from "@/hooks/useRegister/useRegister";
import { OrSeparator } from "@/components/OrSeparator/OrSeparator";
import { LoginTitle } from "@/components/LoginTitle/LoginTitle";
import { AuthInput } from "@/components/AuthInput/AuthInput";

/**
 * **DESCRIPTION:**
 *
 * Registration page for local accounts (email + password + confirm password)
 * and Google OAuth. All logic is delegated to the `useRegisterPage` hook.
 *
 * **ROUTE:**
 *
 * This file represents the route: `/Register`
 *
 * **RETURNS:**
 *
 * @returns A centered registration card with:
 * - Google register button.
 * - Name (optional), email, password and confirm password fields.
 * - Validation for mismatching passwords.
 * - Link to the `/Login` page for existing users.
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * // Just navigate to /Register in your browser.
 * // The routing is handled automatically by Next.js.
 */
const RegisterPage: FC = () => {
  const {
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
  } = useRegisterPage({});

  if (checkingSession) {
    return (
      <main
        data-testid="Login-Page"
        className="min-h-screen flex items-center justify-center bg-[#050509] text-white"
      >
        <p>Comprobando sesión...</p>
      </main>
    );
  }

  return (
    <main
      data-testid="Login-Page"
      className="
        min-h-screen
        bg-[#050509]
        text-white
        flex
        flex-col
        lg:flex-row
      "
    >
      <section
        className="
          flex-1
          flex
          items-center
          justify-center
          px-4
          py-10
        "
      >
        <div className="w-full max-w-sm rounded-2xl px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
          {/* Title + subtitle */}
          <LoginTitle
            title={"Create"}
            label={"Register and start creating your WebSites."}
          />

          {/* Google Button */}
          <div className="mb-5">
            <GoogleLoginButton
              onClick={handleGoogleRegister}
              loading={loadingGoogle}
              redirectMaking="Register"
            />
          </div>

          {/* Or Separator */}
          <OrSeparator />

          <form onSubmit={handleRegister} className="space-y-3">
            <AuthInput
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={setName}
              autoComplete="name"
              required={false}
            />

            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />

            <AuthInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
            />

            <AuthInput
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />

            {passwordsMismatch && (
              <p className="text-xs text-yellow-400 mt-1">
                Passwords don&apos;t match.
              </p>
            )}

            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}

            <button
              type="submit"
              disabled={loading || passwordsMismatch}
              className="
                w-full mt-2 inline-flex items-center justify-center rounded-xl
                bg-gradient-to-r from-sky-500 to-cyan-400
                px-4 py-2.5 text-sm font-semibold tracking-wide text-white
                shadow-lg shadow-cyan-500/25
                transition
                hover:from-sky-400 hover:to-cyan-300 hover:shadow-cyan-400/40
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-400">
            Already have an account?{" "}
            <a href="/Login" className="text-sky-400 underline">
              Login
            </a>
          </p>
        </div>
      </section>

      {/* Columna derecha: imagen (solo en ≥1024px) */}
      <aside className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/images/atlas-intro-bg.jpg"
          alt="Earth from space at night"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
      </aside>
    </main>
  );
};

export default RegisterPage;
