// src/api/tree.ts
import { api } from './common';
import type { ApiDecoName } from '@/src/app/tree/contants/decorations';

/** 백엔드 오브젝트 1개 */
export interface ApiObject {
  object_id: string;
  name: ApiDecoName;
  position_x: number;
  position_y: number;
}

/** GET /objects 응답 */
export interface GetObjectsResponse {
  objects: ApiObject[];
}

/** POST /objects 요청 */
export interface CreateObjectRequest {
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

/** ✅ 트리(오브젝트) 불러오기 */
export function getObjectsApi(login_id: string) {
  // 백엔드가 쿠키 기반이면 query 없이 /objects 만 써도 됨
  return api<GetObjectsResponse>(`/objects?login_id=${login_id}`);
}

/** ✅ 오브젝트 1개 저장 */
export function createObjectApi(body: CreateObjectRequest) {
  return api<CreateObjectResponse, CreateObjectRequest>('/objects', {
    method: 'POST',
    body,
  });
}

/**
 * ✅ 여러 개 저장 (비회원이 붙인 것만)
 * backend는 1개씩만 받으므로 Promise.all 로 병렬 저장
 */
export async function saveDecorationsApi(login_id: string, objects: Omit<CreateObjectRequest, 'login_id'>[]) {
  await Promise.all(
    objects.map((obj) =>
      createObjectApi({
        login_id,
        ...obj,
      }),
    ),
  );
}
