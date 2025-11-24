// src/api/tree.ts
import { api } from './common';
import type { ApiDecoName } from '@/src/app/tree/constants/decorations';

/** 백엔드 오브젝트 1개 */
export interface ApiObject {
  object_id: string;
  name: ApiDecoName; // "SOCK" | "CIRCLE" | "CANDY"
  position_x: number; // px
  position_y: number; // px
  user_id: string;
}

/** GET /objects 응답 */
export interface GetObjectsResponse {
  objects: ApiObject[];
}

/** POST /objects 요청 */
export interface ApiDecoration {
  login_id: string; // slug 그대로
  name: ApiDecoName; // "SOCK" | "CIRCLE" | "CANDY"
  position_x: number; // px
  position_y: number; // px
}

/** POST /objects 응답 */
export interface CreateObjectResponse {
  message: string;
  object: ApiObject;
}

/** 트리(오브젝트) 불러오기 */
export function getTreeApi(login_id: string) {
  return api<GetObjectsResponse>(`/objects?login_id=${login_id}`);
}

/** 오브젝트 1개 저장 */
export function createObjectApi(body: ApiDecoration) {
  return api<CreateObjectResponse, ApiDecoration>('/objects', {
    method: 'POST',
    body,
  });
}

/**
 * ✅ 여러 개 저장 (비회원이 붙인 것만)
 * 백엔드는 1개씩만 받으므로 Promise.all로 병렬 저장
 */
export async function saveDecorationsApi(payload: ApiDecoration[]) {
  await Promise.all(payload.map((obj) => createObjectApi(obj)));
}
