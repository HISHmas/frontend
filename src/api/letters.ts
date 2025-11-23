// src/api/letters.ts
import { api } from './common';

/** 백엔드 Letter DTO */
export interface LetterDto {
  letter_id: string;
  user_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

/** ✅ 편지 목록 조회 응답 */
export interface GetLettersResponse {
  message: string;
  letters: LetterDto[];
}

/**
 * ✅ 내 편지 목록 조회 (쿠키 기반)
 * - 프론트는 아무것도 안 보내고 /letters만 호출
 * - 백엔드가 JWT 쿠키로 user_id 판단해서 내 편지만 내려줌
 */
export async function getLettersApi() {
  return api<GetLettersResponse>('/letters');
}

/** ✅ 편지 저장 요청 (slug = login_id 그대로 보냄) */
export interface CreateLetterRequest {
  login_id: string; // ✅ 수신자(트리 주인) login_id = slug
  sender_name: string; // ✅ 작성자 이름(비회원)
  content: string;
}

/** ✅ 편지 저장 응답 */
export interface CreateLetterResponse {
  message: string;
  letter: LetterDto;
}

/**
 * ✅ 편지 저장 (비회원 작성)
 * POST /api/letters
 */
export async function createLetterApi(body: CreateLetterRequest) {
  return api<CreateLetterResponse, CreateLetterRequest>('/letters', {
    method: 'POST',
    body,
  });
}
