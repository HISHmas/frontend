// src/api/common.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Body가 없는 요청일 경우 타입을 void로 제한
type RequestBody = Record<string, unknown> | undefined | null;

interface RequestOptions<TBody extends RequestBody = undefined> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

// 응답은 제네릭으로 강제
export async function api<TResponse, TBody extends RequestBody = undefined>(path: string, options: RequestOptions<TBody> = {}): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    credentials: options.credentials ?? 'include',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} (${path})`);
  }

  return res.json() as Promise<TResponse>;
}
