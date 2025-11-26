"use client";

import type { FC } from "react";
import Image from "next/image";
import { GoogleLoginButton } from "@/components/GoogleLoginButton/GoogleLoginButton";
import { useLoginPage } from "@/hooks/useLogin/useLogin";

/**
 * **DESCRIPTION:**
 *
 * Login page with Google OAuth and local email/password login.
 * All business logic (session check, handlers, state) is delegated
 * to the `useLoginPage` hook so this component remains purely
 * presentational. On large screens (≥1024px) it displays a
 * split layout: form on the left and a hero image on the right.
 *
 * **ROUTE:**
 *
 * This file represents the route: `/Login`
 *
 * **RETURNS:**
 *
 * @returns A responsive login layout with:
 * - Mobile: centered card with login form.
 * - Desktop: two-column layout with form (left) and image (right).
 *
 * **EXAMPLE OF USE:**
 *
 * @example
 * // Just navigate to /Login in your browser.
 * // The routing is handled automatically by Next.js.
 */
const LoginPage: FC = () => {
  const {
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
  } = useLoginPage({});

  if (checkingSession) {
    return (
      <main
        data-testid="Login-Page"
        className="min-h-screen flex items-center justify-center bg-[#050509] text-white px-4"
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
      {/* Columna izquierda: formulario */}
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
          {/* Title + subtitle centered */}
          <h1 className="text-center text-3xl font-extrabold tracking-tight mb-2">
            Login to Your
            <br />
            Account
          </h1>
          <p className="text-center text-sm text-gray-400 mb-7">
            Create and share your Web.
          </p>

          {/* Google Button */}
          <div className="mb-5">
            <GoogleLoginButton
              onClick={handleGoogleLogin}
              loading={loadingGoogle}
              redirectMaking="Login"
            />
          </div>

          {/* OR separator */}
          <div className="mb-5 flex items-center gap-3 text-[11px] text-gray-500">
            <span className="h-px flex-1 bg-white/10" />
            <span className="uppercase tracking-[0.2em]">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Local login */}
          <form onSubmit={handleLocalLogin} className="space-y-3">
            <input
              type="email"
              placeholder="UserName"
              className="
                w-full rounded-lg
                bg-[#202227]
                border border-transparent
                px-3 py-2.5 text-sm
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-sky-500
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full rounded-lg
                bg-[#202227]
                border border-transparent
                px-3 py-2.5 text-sm
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-sky-500
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Forgot password aligned right */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[11px] text-gray-400 hover:text-gray-200"
              >
                Forgot Password?
              </button>
            </div>

            {localError && (
              <p className="text-xs text-red-400 mt-1">{localError}</p>
            )}

            {/* Gradient button */}
            <button
              type="submit"
              disabled={localLoading}
              className="
                w-full mt-1 inline-flex items-center justify-center rounded-full
                bg-gradient-to-r from-[#27f3c8] to-[#1ca4ff]
                px-4 py-2.5 text-sm font-semibold tracking-wide text-black
                shadow-[0_12px_30px_rgba(0,0,0,0.6)]
                transition
                hover:brightness-110
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {localLoading ? "Logging in..." : "Login to your Account"}
            </button>
          </form>

          {/* Bottom text */}
          <p className="mt-6 text-[11px] text-center text-gray-400">
            Not a member yet?{" "}
            <a href="/Register" className="text-sky-400 underline">
              Register Now
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
        {/* Degradado suave si quieres oscurecer un poco la parte izquierda de la foto */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
      </aside>
    </main>
  );
};

export default LoginPage;
