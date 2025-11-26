import { type FC } from "react";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * @property onClick  Function that will be called when the button is clicked.
 * @property loading  Optional flag to show a loading state while redirecting.
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
 * when the user wants to login with Google.
 *
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <GoogleLoginButton
 *     loading={isRedirecting}
 *     onClick={handleGoogleLogin}
 *   />
 * )
 */
export const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  onClick,
  loading,
  redirectMaking,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      data-testid="GoogleLoginButton-Component"
      className="w-full border border-[#26BEFF] rounded-md py-2 px-4 text-sm text-white flex items-center justify-center gap-2 hover:bg-[#2c6df2]/10 disabled:opacity-60"
    >
      <span>G</span>
      <span>{loading ? "Redirecting…" :  `${redirectMaking} with Google`}</span>
    </button>
  );
};
