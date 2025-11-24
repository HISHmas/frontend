// src/app/tree/constants/decorations.ts
import type { DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

export type ApiDecoName = 'SOCK' | 'CIRCLE' | 'CANDY';

export const API_NAME_TO_TYPE: Record<ApiDecoName, DecoType> = {
  SOCK: 'sock',
  CIRCLE: 'circle',
  CANDY: 'candy',
};

export const TYPE_TO_API_NAME: Record<DecoType, ApiDecoName> = {
  sock: 'SOCK',
  circle: 'CIRCLE',
  candy: 'CANDY',
};

export const TYPE_TO_SRC: Record<DecoType, string> = {
  sock: '/images/Socks01.png',
  circle: '/images/Ornament_Yellow.png',
  candy: '/images/Candycane.png',
};

export const TREE_BASE_SIZE = {
  width: 375,
  height: 812 - 56,
};

export function pxToPercent(px: number, base: number) {
  return (px / base) * 100;
}

export function percentToPx(percent: number, base: number) {
  return (percent / 100) * base;
}
