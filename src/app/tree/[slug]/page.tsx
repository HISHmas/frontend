// src/app/tree/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';
import TreeDecorateButton from '@/src/app/tree/components/TreeDecorateButton';
import TreeShareButton from '@/src/app/tree/components/TreeShareButton';
import DecorationBottomSheet, { DECO_LIST, DecoType } from '@/src/app/tree/components/DecorationBottomSheet';

interface Decoration {
  id: string;
  type: DecoType;
  src: string;
  x: number; // %
  y: number; // %
}

export default function TreeDetailPageUIOnly() {
  const params = useParams();
  const slug = params.slug as string;

  const [isMyTree, setIsMyTree] = useState(false);
  const treeTitle = useMemo(() => `🎄 ${slug} 님의 트리`, [slug]);

  const [decorations, setDecorations] = useState<Decoration[]>([
    { id: 'd1', type: 'sock', src: '/images/Socks01_small.png', x: 40, y: 35 },
    { id: 'd2', type: 'circle', src: '/images/Ornament_Yellow_small.png', x: 55, y: 55 },
  ]);

  const [showDecoSheet, setShowDecoSheet] = useState(false);
  const [pendingDeco, setPendingDeco] = useState<Omit<Decoration, 'x' | 'y'> | null>(null);

  const treeRef = useRef<HTMLDivElement>(null);

  const handlePickDeco = (deco: (typeof DECO_LIST)[number]) => {
    setPendingDeco({
      id: `temp-${Date.now()}`,
      type: deco.type,
      src: deco.src,
    });
    setShowDecoSheet(false);
  };

  const handleTreeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pendingDeco || !treeRef.current) return;

    const rect = treeRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setDecorations((prev) => [...prev, { ...pendingDeco, id: `d-${Date.now()}`, x, y }]);
    setPendingDeco(null);
  };

  return (
    // ✅ bg-white 제거 → layout 배경이 보이게
    <div className="h-full flex flex-col px-4 py-4 bg-transparent">
      {/* 상단 */}
      <div className="mb-3 text-center shrink-0">
        <h2 className="text-xl font-bold text-green-800">{treeTitle}</h2>
        <p className="text-sm text-gray-600">장식 {decorations.length}개</p>
        {pendingDeco && <p className="text-xs text-green-700 mt-1">트리에 붙일 위치를 눌러주세요!</p>}
      </div>

      {/* UI-only 토글 */}
      <div className="mb-2 flex justify-center shrink-0">
        <button onClick={() => setIsMyTree((v) => !v)} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          {isMyTree ? '내 트리(임시) ✅' : '남의 트리(임시) 🌲'}
        </button>
      </div>

      {/* ✅ 트리 캔버스 (배경은 layout, 여긴 장식만) */}
      <div ref={treeRef} onClick={handleTreeClick} className="relative w-full flex-1 min-h-0">
        {decorations.map((d) => (
          <div
            key={d.id}
            className="absolute z-10"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Image src={d.src} alt={d.type} width={48} height={48} className="object-contain pointer-events-none select-none" />
          </div>
        ))}

        {pendingDeco && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs bg-white/80 px-3 py-1 rounded-full shadow z-20">선택됨: {pendingDeco.type}</div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto pb-2 shrink-0">
        {isMyTree ? (
          <TreeShareButton>트리 공유하기</TreeShareButton>
        ) : (
          <TreeDecorateButton onClick={() => setShowDecoSheet(true)}>트리 꾸미기</TreeDecorateButton>
        )}
      </div>

      <DecorationBottomSheet open={showDecoSheet} onClose={() => setShowDecoSheet(false)} onPick={handlePickDeco} />
    </div>
  );
}
