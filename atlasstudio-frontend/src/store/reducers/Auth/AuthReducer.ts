import type { AppAction } from '../../../types/AppAction';

/**
 * **DESCRIPTION:**
 *
 * Minimal representation of an authenticated user.
 * Adapt this shape to whatever your `/api/me` endpoint returns.
 *
 * If you add new properties, make sure to:
 * - Keep them in sync with the backend response.
 * - Update the documentation of this type.
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

/**
 * **DESCRIPTION:**
 *
 * This interface defines the state shape for the `Auth` slice
 * of the global AppStore.
 */
export interface AuthState {
  /**
   * True while the app is checking `/api/me`.
   */
  checkingSession: boolean;

  /**
   * True if a valid authenticated user has been detected.
   */
  isAuthenticated: boolean;

  /**
   * Authenticated user data, or null when not logged in.
   */
  user: AuthUser | null;

  /**
   * Optional error message related to auth/session operations.
   */
  authError: string | null;
}

/**
 * **DESCRIPTION:**
 *
 * Initial state for the `Auth` slice.
 */
export const AuthInitialState: AuthState = {
  checkingSession: true,
  isAuthenticated: false,
  user: null,
  authError: null,
};

/**
 * **DESCRIPTION:**
 *
 * Pure reducer function for the `Auth` slice. It receives the
 * current `Auth` state and a global `AppAction`, and returns
 * the next state.
 *
 * **KNOWN ACTION TYPES:**
 *
 * - `auth/check/start`      → Start session check.
 * - `auth/check/success`    → Session check succeeded, payload is `AuthUser`.
 * - `auth/check/failure`    → Session check failed, optional payload is `string` error.
 * - `auth/logout`           → Clear auth state.
 *
 * **PARAMETERS:**
 *
 * @param state Current `Auth` state.
 * @param action Global action describing how the state should change.
 */
export const AuthReducer = (
  state: AuthState,
  action: AppAction
): AuthState => {
  switch (action.type) {
    case 'auth/check/start':
      return {
        ...state,
        checkingSession: false,
        authError: null,
      };

    case 'auth/check/success': {
      const user = action.payload as AuthUser;
      return {
        checkingSession: false,
        isAuthenticated: true,
        user,
        authError: null,
      };
    }

    case 'auth/check/failure': {
      const errorMessage =
        (action.payload as string | undefined) ?? 'Session check failed';
      return {
        checkingSession: false,
        isAuthenticated: false,
        user: null,
        authError: errorMessage,
      };
    }

    case 'auth/logout':
      return {
        checkingSession: false,
        isAuthenticated: false,
        user: null,
        authError: null,
      };

    default:
      return state;
  }
};
