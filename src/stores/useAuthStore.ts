// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { loginApi, meApi, logoutApi } from '@/src/api/auth';

interface User {
  loginId: string;
}

interface AuthState {
  user: User | null;
  isLoaded: boolean;
  error: string | null;

  loadUser: () => Promise<void>;
  login: (loginId: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

// ✅ env로 mock 스위치
const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
const isDev = process.env.NODE_ENV === 'development';

/** unknown 에러에서 안전하게 메시지 뽑기 */
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

  // ✅ 앱 최초 로드 / 새로고침 시 로그인 유지 확인
  loadUser: async () => {
    if (USE_MOCK_AUTH) {
      set({ user: null, isLoaded: true, error: null });
      return;
    }

    try {
      const data = await meApi();
      const loginId = data.user.login_id; // 서버 응답 구조에 맞게
      set({ user: { loginId }, isLoaded: true, error: null });
    } catch (err: unknown) {
      if (isDev) console.warn('[loadUser] guest:', getErrorMessage(err));
      set({ user: null, isLoaded: true, error: null });
    }
  },

  // ✅ 로그인 (mock/real)
  login: async (loginId, password) => {
    if (USE_MOCK_AUTH) {
      set({ user: { loginId }, isLoaded: true, error: null });
      return loginId;
    }

    try {
      const data = await loginApi({ login_id: loginId, password });
      const id = data.user.login_id;

      set({ user: { loginId: id }, isLoaded: true, error: null });
      return id;
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'login failed');
      if (isDev) console.error('[login] fail:', message);

      set({ user: null, isLoaded: true, error: message });
      return null;
    }
  },

  // ✅ 로그아웃 (mock/real)
  logout: async () => {
    if (!USE_MOCK_AUTH) {
      try {
        await logoutApi();
      } catch (err: unknown) {
        if (isDev) console.error('[logout] fail:', getErrorMessage(err));
      }
    }

    set({ user: null, isLoaded: true, error: null });
  },
}));
