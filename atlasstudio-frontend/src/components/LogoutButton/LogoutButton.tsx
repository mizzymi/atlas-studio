"use client";

import { type FC } from "react";

interface LogoutButtonProps { }

/**
 * **DESCRIPTION:**
 *
 * Botón que cierra la sesión del usuario llamando al endpoint
 * de logout del backend y dejando que Spring redirija a /Login.
 *
 * **EXAMPLE OF USE:**
 * @example
 * return (
 *   <LogoutButton />
 * )
 */
export const LogoutButton: FC<LogoutButtonProps> = ({ }) => {
  const handleLogout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <button
      type="button"
      data-testid="LogoutButton-Component"
      onClick={handleLogout}
      className="
        w-full
        mt-4
        inline-flex
        items-center
        justify-center
        rounded-xl
        bg-gradient-to-r
        from-sky-500
        to-cyan-400
        px-4
        py-3
        text-sm
        font-semibold
        tracking-wide
        text-white
        shadow-lg
        shadow-cyan-500/25
        transition
        hover:from-sky-400
        hover:to-cyan-300
        hover:shadow-cyan-400/40
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-300
        focus:ring-offset-2
        focus:ring-offset-neutral-900
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      Cerrar sesión
    </button>
  );
};
