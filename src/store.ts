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
    age: number;
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
    age: 0,
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
        set({ user: { username: '', email: '', age: 0 } });
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
