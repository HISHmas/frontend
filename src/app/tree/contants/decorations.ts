// src/app/tree/constants/decorations.ts
import type { DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

// 백엔드 name 타입
export type ApiDecoName = 'SOCK' | 'CIRCLE' | 'CANDY';

// ✅ name -> DecoType
export const API_NAME_TO_TYPE: Record<ApiDecoName, DecoType> = {
  SOCK: 'sock',
  CIRCLE: 'circle',
  CANDY: 'candy',
};

// ✅ DecoType -> name
export const TYPE_TO_API_NAME: Record<DecoType, ApiDecoName> = {
  sock: 'SOCK',
  circle: 'CIRCLE',
  candy: 'CANDY',
};

// ✅ DecoType -> src
export const TYPE_TO_SRC: Record<DecoType, string> = {
  sock: '/images/Socks01_small.png',
  circle: '/images/Ornament_Yellow_small.png',
  candy: '/images/candycane_v01.png',
};

// ✅ 백엔드 px 기준(원본 375x812에서 헤더 56 제외)
export const TREE_BASE_SIZE = {
  width: 375,
  height: 812 - 56,
};

// px -> %
export function pxToPercent(px: number, base: number) {
  return (px / base) * 100;
}

// % -> px
export function percentToPx(percent: number, base: number) {
  return (percent / 100) * base;
}
