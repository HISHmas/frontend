// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { loginApi, meApi, logoutApi, signupApi } from '@/src/api/auth';

interface User {
  loginId: string;
}

interface AuthState {
  user: User | null;
  isLoaded: boolean;
  error: string | null;

  loadUser: () => Promise<void>;
  login: (loginId: string, password: string) => Promise<string | null>;
  signup: (loginId: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const isDev = process.env.NODE_ENV === 'development';

function getErrorMessage(err: unknown, fallback = 'unknown error'): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  try {
    return JSON.stringify(err);
  } catch {
    return fallback;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,
  error: null,

  /* -------------------- 로그인 유지 -------------------- */
  loadUser: async () => {
    try {
      const data = await meApi();
      set({
        user: { loginId: data.user.login_id },
        isLoaded: true,
        error: null,
      });
    } catch (err) {
      if (isDev) console.warn('[loadUser] guest:', getErrorMessage(err));
      set({ user: null, isLoaded: true, error: null });
    }
  },

  /* -------------------- 로그인 -------------------- */
  login: async (loginId, password) => {
    try {
      const data = await loginApi({ login_id: loginId, password });
      const id = data.user.login_id;

      set({
        user: { loginId: id },
        isLoaded: true,
        error: null,
      });

      return id;
    } catch (err) {
      const msg = getErrorMessage(err, 'login failed');
      if (isDev) console.error('[login] fail:', msg);

      set({ user: null, isLoaded: true, error: msg });
      return null;
    }
  },

  /* -------------------- 회원가입 -------------------- */
  signup: async (loginId, password, name) => {
    try {
      await signupApi({
        login_id: loginId,
        password,
        name,
      });

      return true; // 성공 시 true
    } catch (err) {
      if (isDev) console.error('[signup] fail:', getErrorMessage(err));
      return false;
    }
  },

  /* -------------------- 로그아웃 -------------------- */
  logout: async () => {
    set({ user: null, isLoaded: true, error: null });
  },
}));
