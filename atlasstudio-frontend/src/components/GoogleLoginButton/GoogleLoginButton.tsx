import { type FC } from "react";
import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * @property onClick         Function that will be called when the button is clicked.
 * @property loading         Optional flag to show a loading state while redirecting.
 * @property redirectMaking  login/register.
 */
interface GoogleLoginButtonProps {
  onClick: () => void;
  loading?: boolean;
  redirectMaking: "Login" | "Register";
}

/**
 * **DESCRIPTION:**
 *
 * Reusable Google login button. It only handles UI and calls `onClick`
 * when the user wants to login/register with Google.
 *
 * The visual style adapts to the current UI theme using the
 * `useChangeTheme` hook:
 *
 * - In **dark** mode it uses a bright border and white text on a dark
 *   background, with a subtle blue hover state.
 * - In **light** mode it uses `var(--background)` / `var(--foreground)`
 *   and a softer blue border with a very light accent background on hover.
 *
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <GoogleLoginButton
 *     loading={isRedirecting}
 *     onClick={handleGoogleLogin}
 *     redirectMaking="Login"
 *   />
 * )
 */
export const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  onClick,
  loading,
  redirectMaking,
}) => {
  const { resolvedTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === "dark";

  const baseClasses = `
    w-full
    rounded-md
    py-2
    px-4
    text-sm
    flex
    items-center
    justify-center
    gap-2
    transition-colors
    duration-200
    disabled:opacity-60
    disabled:cursor-not-allowed
  `;

  const themeClasses = isDarkMode
    ? "border border-[#26BEFF] text-white hover:bg-[#2c6df2]/10"
    : "border border-[rgba(28,164,255,0.4)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[rgba(39,243,200,0.08)]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      data-testid="GoogleLoginButton-Component"
      className={`${baseClasses} ${themeClasses}`}
    >
      <span
        className={`
          inline-flex
          h-5
          w-5
          items-center
          justify-center
          rounded-[4px]
          font-semibold
          ${
            isDarkMode
              ? "text-[#26BEFF]"
              : "text-[#26BEFF]"
          }
        `}
      >
        G
      </span>
      <span>{loading ? "Redirecting…" : `${redirectMaking} with Google`}</span>
    </button>
  );
};
