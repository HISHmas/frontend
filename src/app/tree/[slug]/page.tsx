// src/app/tree/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import TreeDecorateButton from '@/src/app/tree/components/buttons/TreeDecorateButton';
import TreeShareButton from '@/src/app/tree/components/buttons/TreeShareButton';
import DecorationBottomSheet, { DECO_LIST, DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

import { useAuthStore } from '@/src/stores/useAuthStore';
import { getTreeApi, saveDecorationsApi } from '@/src/api/tree';

interface Decoration {
  id: string;
  type: DecoType;
  src: string;
  x: number;
  y: number;
}

export default function TreeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { user, isLoaded, loadUser } = useAuthStore();
  const isMyTree = !!user && user.loginId === slug;

  const treeTitle = useMemo(() => `🎄 ${slug} 님의 트리`, [slug]);

  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [unsavedDecorations, setUnsavedDecorations] = useState<Decoration[]>([]);

  const [isTreeLoading, setIsTreeLoading] = useState(false);
  const [showDecoSheet, setShowDecoSheet] = useState(false);
  const [pendingDeco, setPendingDeco] = useState<Omit<Decoration, 'x' | 'y'> | null>(null);

  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  //  트리 데이터 API로 가져오기
  useEffect(() => {
    const fetchTree = async () => {
      try {
        setIsTreeLoading(true);
        const data = await getTreeApi(slug);
        setDecorations(data.decorations ?? []);
      } catch {
        setDecorations([]);
      } finally {
        setIsTreeLoading(false);
      }
    };

    fetchTree();
  }, [slug]);

  // 장식 선택
  const handlePickDeco = (deco: (typeof DECO_LIST)[number]) => {
    setPendingDeco({
      id: `temp-${Date.now()}`,
      type: deco.type,
      src: deco.src,
    });
    setShowDecoSheet(false);
  };

  // 장식 위치 배치
  const handleTreeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMyTree) return;
    if (!pendingDeco || !treeRef.current) return;

    const rect = treeRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newDeco: Decoration = {
      ...pendingDeco,
      id: `d-${Date.now()}`,
      x,
      y,
    };

    setDecorations((prev) => [...prev, newDeco]);
    setUnsavedDecorations((prev) => [...prev, newDeco]);
    setPendingDeco(null);
  };

  //  저장 API 호출
  const handleSave = async () => {
    if (unsavedDecorations.length === 0) return;

    try {
      await saveDecorationsApi(
        slug,
        unsavedDecorations.map(({ type, src, x, y }) => ({ type, src, x, y })),
      );

      alert('저장 완료!');
      setUnsavedDecorations([]);
    } catch {
      alert('저장 실패');
    }
  };

  return (
    <div className="h-full flex flex-col px-4 py-4 bg-transparent">
      {/* 상단 */}
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold text-green-800">{treeTitle}</h2>
        <p className="text-sm text-gray-600">장식 {decorations.length}개</p>
        {!isMyTree && pendingDeco && <p className="text-xs text-green-700 mt-1">트리에 붙일 위치를 눌러주세요!</p>}
      </div>

      {/* 트리 캔버스 */}
      <div ref={treeRef} onClick={handleTreeClick} className="relative w-full flex-1">
        {isTreeLoading && <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">트리 불러오는 중...</div>}

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
            <Image src={d.src} alt={d.type} width={48} height={48} />
          </div>
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-auto pb-2">
        {isMyTree ? (
          <TreeShareButton>트리 공유하기</TreeShareButton>
        ) : unsavedDecorations.length > 0 ? (
          <TreeDecorateButton onClickAction={handleSave}>저장하기</TreeDecorateButton>
        ) : (
          <TreeDecorateButton onClickAction={() => setShowDecoSheet(true)}>트리 꾸미기</TreeDecorateButton>
        )}
      </div>

      {!isMyTree && <DecorationBottomSheet open={showDecoSheet} onClose={() => setShowDecoSheet(false)} onPick={handlePickDeco} />}
    </div>
  );
}
