// src/stores/authStore.ts
import { create } from 'zustand';

interface User {
  loginId: string;
}

interface AuthState {
  user: User | null;
  isLoaded: boolean;

  /** ✅ 쿠키 기반 로그인 상태 확인 (실서비스용) */
  loadUser: () => Promise<void>;

  /** ✅ 로그인 (mock or real) */
  login: (loginId: string, password?: string) => Promise<string | null>;

  /** ✅ 로그아웃 (mock or real) */
  logout: () => Promise<void>;
}

/**
 * =========================================
 * ✅ 개발용 스위치
 * - 개발 중: true (mock 로그인)
 * - API 연결 후: false 로 바꾸고 mock만 삭제하면 됨
 * =========================================
 */
const USE_MOCK_AUTH = true;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,

  /**
   * ✅ [실서비스] 쿠키(JWT)로 현재 로그인 유저 조회
   * - /auth/me 가 { login_id } 반환한다고 가정
   */
  loadUser: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: 'include',
      });

      if (!res.ok) {
        set({ user: null, isLoaded: true });
        return;
      }

      const data = await res.json(); // { login_id }
      set({ user: { loginId: data.login_id }, isLoaded: true });
    } catch {
      set({ user: null, isLoaded: true });
    }
  },

  /**
   * ✅ 로그인
   * - 개발 중(USE_MOCK_AUTH = true): mock으로 로그인 처리
   * - API 연결 후(USE_MOCK_AUTH = false): 실제 /auth/login 호출
   *
   * @returns slug(login_id) 반환
   */
  login: async (loginId, password) => {
    // ============================
    // ✅ MOCK LOGIN (개발용)
    // API 연결 후 이 블록만 삭제하면 끝
    // ============================
    if (USE_MOCK_AUTH) {
      set({ user: { loginId }, isLoaded: true });
      return loginId; // slug = login_id
    }

    // ============================
    // ✅ REAL LOGIN (API 연결용)
    // ============================
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include', // ✅ 쿠키 저장
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login_id: loginId,
          password,
        }),
      });

      if (!res.ok) return null;

      const data = await res.json(); // { login_id }
      set({ user: { loginId: data.login_id }, isLoaded: true });
      return data.login_id;
    } catch {
      return null;
    }
  },

  /**
   * ✅ 로그아웃
   * - 개발 중: mock 로그아웃
   * - API 연결 후: /auth/logout 호출
   */
  logout: async () => {
    // ============================
    // ✅ MOCK LOGOUT (개발용)
    // API 연결 후 이 블록만 삭제하면 끝
    // ============================
    if (USE_MOCK_AUTH) {
      set({ user: null, isLoaded: true });
      return;
    }

    // ============================
    // ✅ REAL LOGOUT (API 연결용)
    // ============================
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      set({ user: null, isLoaded: true });
    }
  },
}));
