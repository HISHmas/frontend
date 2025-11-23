// src/app/tree/[slug]/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import TreeShareButton from '@/src/app/tree/components/buttons/TreeShareButton';
import DecorationBottomSheet, { DECO_LIST } from '@/src/app/tree/components/sheets/DecorationBottomSheet';

import { useAuthStore } from '@/src/stores/useAuthStore';
import { useTreeDecorations } from '@/src/app/tree/hooks/useTreeDecorations';

export default function TreeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { user, isLoaded, loadUser } = useAuthStore();
  const isMyTree = !!user && user.loginId === slug;

  useEffect(() => {
    if (!isLoaded) loadUser();
  }, [isLoaded, loadUser]);

  const {
    treeRef,
    treeTitle,
    decorations,
    unsavedDecorations,
    pendingDeco,
    isTreeLoading,
    showDecoSheet,
    setShowDecoSheet,
    pickDecoration,
    placeDecoration,
    saveDecorations,
  } = useTreeDecorations(slug, isMyTree);

  return (
    <div className="h-full flex flex-col px-4 py-4 bg-transparent">
      {/* 상단 */}
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold text-green-800">{treeTitle}</h2>
        <p className="text-sm text-gray-600">장식 {decorations.length}개</p>
        {!isMyTree && pendingDeco && <p className="text-xs text-green-700 mt-1">트리에 붙일 위치를 눌러주세요!</p>}
      </div>

      {/* 트리 캔버스 */}
      <div ref={treeRef} onClick={placeDecoration} className="relative w-full flex-1">
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
            <Image src={d.src} alt={d.type} width={48} height={48} className="object-contain" />
          </div>
        ))}
      </div>

      {/* 하단 버튼 (회원=1개 / 비회원=2개 반반) */}
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
              {/* 왼쪽: 내 트리 만들기 */}
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

              {/* 오른쪽: 꾸미기 / 저장하기 */}
              <button
                type="button"
                onClick={unsavedDecorations.length > 0 ? saveDecorations : () => setShowDecoSheet(true)}
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

      {/* 장식 선택 바텀시트 */}
      {!isMyTree && <DecorationBottomSheet open={showDecoSheet} onClose={() => setShowDecoSheet(false)} onPick={(d) => pickDecoration(d)} />}
    </div>
  );
}
