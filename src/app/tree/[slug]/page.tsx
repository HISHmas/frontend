'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

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

  /* ============================================================
     트리 데이터 로딩
  ============================================================ */
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

  /* ============================================================
     장식 선택 → pending 상태로 저장
  ============================================================ */
  const handlePickDeco = (deco: (typeof DECO_LIST)[number]) => {
    setPendingDeco({
      id: `temp-${Date.now()}`,
      type: deco.type,
      src: deco.src,
    });
    setShowDecoSheet(false);
  };

  /* ============================================================
     트리에 장식 배치
  ============================================================ */
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

  /* ============================================================
     저장 API 호출 + 실패 시 롤백 (요청하신 부분)
  ============================================================ */
  const handleSave = async () => {
    if (unsavedDecorations.length === 0) return;

    // 실패하면 제거하기 위해 unsaved ID 저장
    const unsavedIds = new Set(unsavedDecorations.map((d) => d.id));

    try {
      await saveDecorationsApi(
        slug,
        unsavedDecorations.map(({ type, src, x, y }) => ({ type, src, x, y })),
      );

      alert('저장 완료!');
      setUnsavedDecorations([]); // 성공 시 초기화
    } catch {
      alert('저장 실패');

      // ❗ 실패하면 방금 붙인 장식 제거 (롤백)
      setDecorations((prev) => prev.filter((d) => !unsavedIds.has(d.id)));

      // ❗ 저장 실패 후 다시 "트리 꾸미기" 버튼으로 돌아가기
      setUnsavedDecorations([]);
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
            className="absolute z-10 w-12 h-12"
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

      {/* 하단 버튼 (회원 = 1개 / 비회원 = 2개) */}
      <div className="mt-auto pb-2 shrink-0">
        {isMyTree ? (
          <TreeShareButton>트리 공유하기</TreeShareButton>
        ) : (
          <div
            className="
              sticky bottom-0 left-0 right-0
              pb-[env(safe-area-inset-bottom)]
              bg-transparent
              flex justify-center z-30
            "
          >
            <div className="w-[calc(100%-32px)] max-w-[382px] flex gap-3">
              {/* 회원가입 */}
              <Link
                href="/auth/signup"
                className="
                  flex-1 h-12 bg-gray-200 text-gray-700
                  flex items-center justify-center
                  rounded-xl font-semibold
                  hover:bg-gray-300 transition shadow-md
                "
                style={{ fontFamily: 'var(--font-ownglyph)' }}
              >
                내 트리 만들기
              </Link>

              {/* 저장 / 트리 꾸미기 */}
              <button
                type="button"
                onClick={unsavedDecorations.length > 0 ? handleSave : () => setShowDecoSheet(true)}
                className="
                  flex-1 h-12 bg-green-600 text-white
                  rounded-xl flex items-center justify-center
                  hover:opacity-90 active:opacity-80
                  transition font-semibold shadow-md
                "
                style={{ fontFamily: 'var(--font-ownglyph)' }}
              >
                {unsavedDecorations.length > 0 ? '저장하기' : '트리 꾸미기'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 장식 선택 모달 */}
      {!isMyTree && <DecorationBottomSheet open={showDecoSheet} onClose={() => setShowDecoSheet(false)} onPick={handlePickDeco} />}
    </div>
  );
}
