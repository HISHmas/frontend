// src/api/auth.ts
import { api } from './common';

export interface LoginRequest {
  login_id: string;
  password: string;
}

export interface SignupRequest {
  login_id: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: {
    login_id: string;
  };
}

/* -------------------- 로그인 -------------------- */
export async function loginApi(body: LoginRequest) {
  return api<AuthResponse, LoginRequest>('/auth/login', {
    method: 'POST',
    body,
  });
}

/* -------------------- 회원가입 -------------------- */
export async function signupApi(body: SignupRequest) {
  return api<AuthResponse, SignupRequest>('/auth/signup', {
    method: 'POST',
    body,
  });
}

/* -------------------- 로그인 유지 -------------------- */
export async function meApi() {
  return api<AuthResponse>('/user/me');
}

/* -------------------- 로그아웃 -------------------- */
export async function logoutApi() {
  return api<void>('/auth/logout', { method: 'POST' });
}
