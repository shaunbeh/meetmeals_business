import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export enum LangOptions {
  en = 'en',
  nl = 'nl',
}

interface UserState {
  user: {
    username: string;
    email: string;
    token: string;
  };
  lang: string;
}
interface UserActions {
  updateUserInfoAfterLogin: (newUser: Partial<UserState['user']>) => void;
  updateUserInfoAfterLogout: () => void;
  toggleLang: () => void;
}

export const initialFilterState = {
  user: {
    username: '',
    email: '',
    token: '',
  },
  lang: LangOptions.en,
};

export const useAppStore = create<UserState & UserActions>()(
  persist(
    devtools((set) => ({
      ...initialFilterState,
      updateUserInfoAfterLogin: (newUser) => {
        set((state) => ({ user: { ...state.user, ...newUser } }));
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
