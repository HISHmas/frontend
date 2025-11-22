// src/stores/authStore.ts
import { create } from 'zustand';

interface User {
  loginId: string;
}

interface AuthState {
  user: User | null;
  isLoaded: boolean;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoaded: false,

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
      set({
        user: { loginId: data.login_id },
        isLoaded: true,
      });
    } catch {
      set({ user: null, isLoaded: true });
    }
  },
}));
