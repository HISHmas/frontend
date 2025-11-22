// src/api/auth.ts
import { api } from './common';

export interface LoginRequest {
  login_id: string;
  password: string;
}

export interface AuthMeResponse {
  login_id: string;
}

export async function loginApi(body: LoginRequest) {
  return api<AuthMeResponse, LoginRequest>('/auth/login', {
    method: 'POST',
    body,
  });
}

export async function meApi() {
  return api<AuthMeResponse>('/auth/me');
}

export async function logoutApi() {
  return api<void>('/auth/logout', { method: 'POST' });
}
