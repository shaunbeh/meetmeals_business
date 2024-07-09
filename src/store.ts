import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { UserInfoT } from './lib/types/ApiTypes';

export enum LangOptions {
  en = 'en',
  nl = 'nl',
}

export interface UserState {
  user: UserInfoT;
  auth: { token: string; isLoggedIn: boolean };
  lang: string;
}
interface UserActions {
  updateUserInfoAfterLogin: (newUser: UserState['user']) => void;
  updateAuthToken: (token: string) => void;
  updateUserInfoAfterLogout: () => void;
  toggleLang: () => void;
}

export const initialFilterState = {
  user: {
    id: -1,
    first_name: '',
    last_name: '',
    email: '',
    mobile: null,
    organization: {
      id: -1,
      name: '',
      address: '',
    },
  },
  auth: { token: '', isLoggedIn: false },
  lang: LangOptions.en,
};

export const useAppStore = create<UserState & UserActions>()(
  persist(
    devtools((set) => ({
      ...initialFilterState,
      updateUserInfoAfterLogin: (newUser) => {
        set((state) => ({ ...state, user: newUser }));
      },
      updateUserInfoAfterLogout: () => {
        set({ user: initialFilterState.user });
      },
      updateAuthToken: (token) => {
        set((state) => ({ ...state, auth: { isLoggedIn: true, token } }));
      },
      toggleLang: () => {
        set((state) => ({
          ...state,
          lang: state.lang === LangOptions.en ? LangOptions.nl : LangOptions.en,
        }));
      },
    })),
    { name: 'user' },
  ),
);
