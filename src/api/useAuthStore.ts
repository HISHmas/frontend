// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { loginApi, meApi, logoutApi } from '@/src/api/auth';

interface User {
  loginId: string;
}

interface AuthState {
  user: User | null;
  isLoaded: boolean;
  loadUser: () => Promise<void>;
  login: (id: string, pw: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const USE_MOCK = true;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,

  loadUser: async () => {
    if (USE_MOCK) {
      set({ user: null, isLoaded: true });
      return;
    }

    try {
      const data = await meApi();
      set({ user: { loginId: data.login_id }, isLoaded: true });
    } catch {
      set({ user: null, isLoaded: true });
    }
  },

  login: async (id, pw) => {
    if (USE_MOCK) {
      set({ user: { loginId: id }, isLoaded: true });
      return id;
    }

    try {
      const data = await loginApi({ login_id: id, password: pw });
      set({ user: { loginId: data.login_id }, isLoaded: true });
      return data.login_id;
    } catch {
      return null;
    }
  },

  logout: async () => {
    if (!USE_MOCK) await logoutApi();
    set({ user: null, isLoaded: true });
  },
}));
