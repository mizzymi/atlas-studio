import { type FC } from "react";

/**
 * **PROPERTIES OF APP COMPONENT:**
 * 
 * This interface defines the props for the `LoginTitle` component.
 * 
 * - `title`: Controls the main heading prefix. It can be either
 *   `"Login to"` or `"Create"` to build the final title
 *   (e.g. "Login to Your Account" or "Create Your Account").
 * - `label`: A short descriptive text displayed under the title,
 *   usually explaining what the user is expected to do.
 */
interface LoginTitleProps {
  title: "Login to" | "Create";
  label: string;
}

/**
 * **DESCRIPTION:**
 * 
 * LoginTitle is a small, reusable header block for authentication views.
 * It renders a large, two-line title (e.g. "Login to Your Account" or
 * "Create Your Account") and a short descriptive label underneath.
 * 
 * Use this component at the top of login and registration forms to keep
 * the page titles consistent and easy to scan.
 * 
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <LoginTitle title="Login to" label="Enter your credentials to continue." />
 * )
 */
export const LoginTitle: FC<LoginTitleProps> = ({ title, label }) => {

  return (
    <>
      <h1 className="text-center text-3xl font-extrabold tracking-tight mb-2">
        {title} Your
        <br />
        Account
      </h1>
      <p className="text-center text-sm text-gray-400 mb-7">
        {label}
      </p>
    </>

  )
}
