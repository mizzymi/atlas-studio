'use client';

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type FC,
} from 'react';
import type { AppAction } from '../types/AppAction';
import {
  AuthReducer,
  AuthInitialState,
  type AuthState,
} from './reducers/Auth/AuthReducer';
import {
  UiReducer,
  UiInitialState,
  type UiState,
} from './reducers/Ui/UiReducer';

export interface AppState {
  auth: AuthState;
  ui: UiState;
}

const initialState: AppState = {
  auth: AuthInitialState,
  ui: UiInitialState,
};

const rootReducer = (state: AppState, action: AppAction): AppState => {
  return {
    auth: AuthReducer(state.auth, action),
    ui: UiReducer(state.ui, action),
  };
};

interface AppStoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

export const AppStoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = (): AppStoreContextValue => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return ctx;
};
