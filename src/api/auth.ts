// src/api/auth.ts
import { api } from './common';

export interface LoginRequest {
  login_id: string;
  password: string;
}

// ✅ 서버 응답 구조에 맞춘 타입
export interface AuthResponse {
  user: {
    login_id: string;
  };
}

export async function loginApi(body: LoginRequest) {
  return api<AuthResponse, LoginRequest>('/auth/login', {
    method: 'POST',
    body,
  });
}

export async function meApi() {
  // ✅ 서버 경로에 맞게 둘 중 하나로 통일!
  return api<AuthResponse>('/user/me');
  // return api<AuthResponse>("/user/me");
}

export async function logoutApi() {
  return api<void>('/auth/logout', { method: 'POST' });
}
