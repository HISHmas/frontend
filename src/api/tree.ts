// src/api/tree.ts
import { api } from './common';
import type { DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

export interface DecorationData {
  type: DecoType;
  src: string;
  x: number;
  y: number;
}

export interface TreeResponse {
  title: string;
  decorations: Array<
    DecorationData & {
      id: string;
    }
  >;
}

// 트리 불러오기
export function getTreeApi(slug: string) {
  return api<TreeResponse>(`/tree/${slug}`);
}

// 장식 저장하기 (비회원 bulk 저장)
export function saveDecorationsApi(slug: string, decorations: DecorationData[]) {
  return api<void, { decorations: DecorationData[] }>(`/tree/${slug}/decorations`, {
    method: 'POST',
    body: { decorations },
  });
}
