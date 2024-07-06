import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { UserType } from './lib/types/ApiTypes';

export enum LangOptions {
  en = 'en',
  nl = 'nl',
}

export interface UserState {
  user: UserType & { token: string };
  lang: string;
}
interface UserActions {
  updateUserInfoAfterLogin: (newUser: UserState['user']) => void;
  updateUserInfoAfterLogout: () => void;
  toggleLang: () => void;
}

export const initialFilterState = {
  user: {
    id: 0,
    username: '',
    fName: '',
    lName: '',
    userImage: null,
    privilege: '',
    email: '',
    mobile: '',
    user_code: 0,
    post_code: null,
    verified: '',
    organization_id: 0,
    token: '',
  },
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
