import type { FC } from "react";

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
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    />
  );
};
