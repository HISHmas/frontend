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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,

  // 로그인 상태 유지
  loadUser: async () => {
    try {
      const data = await meApi();
      set({
        user: { loginId: data.user.login_id },
        isLoaded: true,
      });
    } catch {
      set({ user: null, isLoaded: true });
    }
  },

  // 로그인
  login: async (id, pw) => {
    try {
      const data = await loginApi({ login_id: id, password: pw });

      set({
        user: { loginId: data.user.login_id },
        isLoaded: true,
      });

      // 로그인 성공 시 로그인 ID 반환
      return data.user.login_id;
    } catch (e) {
      return null;
    }
  },

  // 로그아웃
  logout: async () => {
    await logoutApi();
    set({ user: null, isLoaded: true });
  },
}));
