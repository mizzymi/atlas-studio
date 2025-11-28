import type { FC } from "react";
import { useChangeTheme } from "@/hooks/useChangeTheme/useChangeTheme";

/**
 * **PROPERTIES OF APP COMPONENT:**
 *
 * This interface defines the props for the `AuthInput` component.
 *
 * - `type`: HTML input type. Typically `"email"`, `"password"` or `"text"`.
 * - `placeholder`: Placeholder text shown when the field is empty.
 * - `value`: Current value of the input, controlled by the parent component.
 * - `onChange`: Callback fired on every change. Receives the new `string` value.
 * - `autoComplete` (optional): Native `autoComplete` attribute to help the browser
 *   suggest values (e.g. `"email"`, `"current-password"`).
 * - `required` (optional): Whether the field is required in a form submission.
 *   Defaults to `true`.
 *
 * If you add new properties, make sure to:
 * - Name them clearly.
 * - Type them correctly in this interface.
 * - Update this documentation so the component remains easy to use.
 */
interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
}

/**
 * **DESCRIPTION:**
 *
 * `AuthInput` is a reusable input component tailored for authentication forms.
 * It encapsulates a styled text field with a consistent visual appearance
 * across login, registration and other auth-related pages.
 *
 * The component is theme-aware: it reads the current theme from the
 * `useChangeTheme` hook and adapts its colors for light/dark modes
 * using your design tokens (`--background`, `--foreground`, accent blues).
 *
 * The value is fully controlled by the parent component through the `value`
 * and `onChange` props, keeping business logic and state management outside
 * of this presentational component.
 *
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <AuthInput
 *     type="email"
 *     placeholder="Email"
 *     value={email}
 *     onChange={setEmail}
 *     autoComplete="email"
 *   />
 * )
 */
export const AuthInput: FC<AuthInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  required = true,
}) => {
  const { resolvedTheme } = useChangeTheme({});
  const isDarkMode = resolvedTheme === "dark";

  const baseClasses = `
    w-full
    rounded-lg
    px-3
    py-2.5
    text-sm
    outline-none
    border
    transition-colors
    duration-200
  `;

  const themeClasses = isDarkMode
    ? `
        bg-[#202227]
        border-transparent
        text-white
        placeholder:text-gray-500
        focus:border-sky-500
      `
    : `
        bg-[rgba(15,23,42,0.03)]
        border-[rgba(148,163,184,0.6)]
        text-[var(--foreground)]
        placeholder:text-gray-400
        focus:border-[rgba(28,164,255,0.9)]
      `;

  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`${baseClasses} ${themeClasses}`}
      style={
        !isDarkMode
          ? {
              backgroundColor: "rgba(255,255,255,0.95)",
              color: "var(--foreground)",
            }
          : undefined
      }
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
};
