// src/app/tree/components/DecoItem.tsx
'use client';

import Image from 'next/image';
import type { DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

export interface Decoration {
  id: string;
  type: DecoType;
  src: string;
  x: number; // %
  y: number; // %
}

export default function DecoItem({ d }: { d: Decoration }) {
  return (
    <div
      className="absolute z-10 w-12 h-12"
      style={{
        left: `${d.x}%`,
        top: `${d.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Image src={d.src} alt={d.type} width={48} height={48} className="object-contain pointer-events-none select-none" />
    </div>
  );
}
