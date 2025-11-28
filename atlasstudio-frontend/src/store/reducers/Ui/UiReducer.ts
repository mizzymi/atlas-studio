import type { AppAction } from '../../../types/AppAction';

/**
 * **DESCRIPTION:**
 *
 * Possible theme modes for the UI slice.
 */
export type UiTheme = 'light' | 'dark' | 'system';

/**
 * **DESCRIPTION:**
 *
 * This interface defines the state shape for the `Ui` slice
 * of the global AppStore.
 */
export interface UiState {
  /**
   * Global loading indicator that can be used to show
   * spinners or block the UI during critical operations.
   */
  globalLoading: boolean;

  /**
   * Current theme mode selected by the user or system.
   */
  theme: UiTheme;

  /**
   * Indicates whether the main sidebar (if any) is open.
   */
  sidebarOpen: boolean;
}

/**
 * **DESCRIPTION:**
 *
 * Initial state for the `Ui` slice.
 */
export const UiInitialState: UiState = {
  globalLoading: false,
  theme: 'light',
  sidebarOpen: false,
};

/**
 * **DESCRIPTION:**
 *
 * Pure reducer function for the `Ui` slice. It receives the
 * current `Ui` state and a global `AppAction`, and returns
 * the next state.
 *
 * **KNOWN ACTION TYPES:**
 *
 * - `ui/setGlobalLoading` → payload: `boolean`.
 * - `ui/setTheme`         → payload: `UiTheme`.
 * - `ui/toggleSidebar`    → no payload.
 * - `ui/setSidebarOpen`   → payload: `boolean`.
 *
 * **PARAMETERS:**
 *
 * @param state Current `Ui` state.
 * @param action Global action describing how the state should change.
 */
export const UiReducer = (
  state: UiState,
  action: AppAction
): UiState => {
  switch (action.type) {
    case 'ui/setGlobalLoading':
      return {
        ...state,
        globalLoading: Boolean(action.payload),
      };

    case 'ui/setTheme': {
      const theme = (action.payload as UiTheme | undefined) ?? state.theme;
      return {
        ...state,
        theme,
      };
    }

    case 'ui/toggleSidebar':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case 'ui/setSidebarOpen':
      return {
        ...state,
        sidebarOpen: Boolean(action.payload),
      };

    default:
      return state;
  }
};
