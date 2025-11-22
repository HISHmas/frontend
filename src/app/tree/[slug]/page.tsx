// src/app/tree/[slug]/page.tsx
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TreeDecorateButton from '@/src/app/tree/components/TreeDecorateButton';
import TreeShareButton from '@/src/app/tree/components/TreeShareButton';
import DecorationBottomSheet, { DECO_LIST, DecoType } from '@/src/app/tree/components/DecorationBottomSheet';
import { useAuthStore } from '@/src/stores/useAuthStore';

interface Decoration {
  id: string;
  type: DecoType;
  src: string;
  x: number; // %
  y: number; // %
}

export default function TreeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { user, isLoaded, loadUser } = useAuthStore();

  // ✅ 내 트리인지 판별
  const isMyTree = !!user && user.loginId === slug;

  const treeTitle = useMemo(() => `🎄 ${slug} 님의 트리`, [slug]);

  // ✅ 서버에서 불러온 "전체 장식"
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  // ✅ 이번에 "비회원이 새로 붙인 장식(아직 저장 안됨)"
  const [unsavedDecorations, setUnsavedDecorations] = useState<Decoration[]>([]);

  const [isTreeLoading, setIsTreeLoading] = useState(false);

  // 바텀 시트 / 선택 장식
  const [showDecoSheet, setShowDecoSheet] = useState(false);
  const [pendingDeco, setPendingDeco] = useState<Omit<Decoration, 'x' | 'y'> | null>(null);

  const treeRef = useRef<HTMLDivElement>(null);

  // ✅ 로그인 상태 로드
  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  // ✅ 트리 데이터 로드
  useEffect(() => {
    const fetchTree = async () => {
      setIsTreeLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tree/${slug}`, { credentials: 'include' });
        if (!res.ok) throw new Error();
        const data = await res.json();

        // data.decorations 가 서버 장식
        setDecorations(data.decorations ?? []);
        setUnsavedDecorations([]); // 페이지 진입 시 미저장 장식은 비움
      } catch {
        setDecorations([]);
      } finally {
        setIsTreeLoading(false);
      }
    };

    if (slug) fetchTree();
  }, [slug]);

  // ✅ 장식 선택 → pendingDeco로 들고 있기
  const handlePickDeco = (deco: (typeof DECO_LIST)[number]) => {
    setPendingDeco({
      id: `temp-${Date.now()}`,
      type: deco.type,
      src: deco.src,
    });
    setShowDecoSheet(false);
  };

  // ✅ 트리 클릭해서 pendingDeco 붙이기 (비회원만 가능)
  const handleTreeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMyTree) return; // ✅ 회원(내 트리)은 꾸미기 금지
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

    // ✅ UI에 바로 반영
    setDecorations((prev) => [...prev, newDeco]);
    setUnsavedDecorations((prev) => [...prev, newDeco]);

    // ✅ pending 제거 → “붙일 위치를 눌러주세요” 문구 사라짐
    setPendingDeco(null);
  };

  // ✅ 저장하기 버튼 클릭 → 미저장 장식만 백엔드로 전송
  const handleSave = async () => {
    if (unsavedDecorations.length === 0) return;

    try {
      // --------------------------------------
      // ✅ 실제 API 전송부
      // 엔드포인트는 백엔드에 맞춰서 바꿔줘
      // 예1) POST /tree/{slug}/decorations/bulk
      // 예2) PUT /tree/{slug}/decorations
      // --------------------------------------
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tree/${slug}/decorations`, {
        method: 'POST', // or PUT/bulk
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decorations: unsavedDecorations.map(({ type, src, x, y }) => ({
            type,
            src,
            x,
            y,
          })),
        }),
      });

      if (!res.ok) throw new Error();

      alert('저장 완료!');

      // ✅ 저장 성공 → 미저장 장식 비우기 → 버튼이 다시 “트리 꾸미기”로 변함
      setUnsavedDecorations([]);
    } catch {
      alert('저장 실패');
    }
  };

  return (
    <div className="h-full flex flex-col px-4 py-4 bg-transparent">
      {/* 상단 */}
      <div className="mb-3 text-center shrink-0">
        <h2 className="text-xl font-bold text-green-800">{treeTitle}</h2>
        <p className="text-sm text-gray-600">장식 {decorations.length}개</p>
        {!isMyTree && pendingDeco && <p className="text-xs text-green-700 mt-1">트리에 붙일 위치를 눌러주세요!</p>}
      </div>

      {/* 트리 캔버스 */}
      <div ref={treeRef} onClick={handleTreeClick} className="relative w-full flex-1 min-h-0">
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
            <Image src={d.src} alt={d.type} width={48} height={48} className="object-contain pointer-events-none select-none" />
          </div>
        ))}

        {!isMyTree && pendingDeco && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs bg-white/80 px-3 py-1 rounded-full shadow z-20">선택됨: {pendingDeco.type}</div>
        )}
      </div>

      {/* 하단 버튼 (디자인 유지) */}
      <div className="mt-auto pb-2 shrink-0">
        {isMyTree ? (
          // ✅ 회원(내 트리): 공유하기 버튼
          <TreeShareButton>트리 공유하기</TreeShareButton>
        ) : unsavedDecorations.length > 0 ? (
          // ✅ 비회원 + 미저장 장식 있음: 저장하기 버튼으로 변경
          <TreeDecorateButton onClick={handleSave}>저장하기</TreeDecorateButton>
        ) : (
          // ✅ 비회원 + 아직 안 붙임: 트리 꾸미기 버튼
          <TreeDecorateButton onClick={() => setShowDecoSheet(true)}>트리 꾸미기</TreeDecorateButton>
        )}
      </div>

      {/* 비회원만 바텀시트 사용 */}
      {!isMyTree && <DecorationBottomSheet open={showDecoSheet} onClose={() => setShowDecoSheet(false)} onPick={handlePickDeco} />}
    </div>
  );
}
