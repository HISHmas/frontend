// src/api/letters.ts
import { api } from './common';

export interface LetterDto {
  letter_id: string;
  user_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

export interface GetLettersResponse {
  message: string;
  letters: LetterDto[];
}

/**
 * ✅ 내 편지 목록 조회 (쿠키 기반)
 * - 프론트는 user_id/slug 안 보냄
 * - 백엔드가 JWT 쿠키에서 user_id 뽑아서 해당 유저 편지만 내려줌
 */
export async function getLettersApi() {
  return api<GetLettersResponse>('/letters');
}
