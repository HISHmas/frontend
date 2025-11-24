// src/api/common.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type JsonBody = object | undefined | null;

interface RequestOptions<TBody extends JsonBody = undefined> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
}

export async function api<TResponse, TBody extends JsonBody = undefined>(path: string, options: RequestOptions<TBody> = {}): Promise<TResponse> {
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
