// src/app/tree/hooks/useTreeDecorations.ts
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { DecoType } from '@/src/app/tree/components/sheets/DecorationBottomSheet';
import { getObjectsApi, saveDecorationsApi } from '@/src/api/tree';
import type { ApiDecoName } from '@/src/app/tree/contants/decorations';

import { API_NAME_TO_TYPE, TYPE_TO_API_NAME, TYPE_TO_SRC, TREE_BASE_SIZE, pxToPercent, percentToPx } from '@/src/app/tree/contants/decorations';

export interface Decoration {
  id: string;
  type: DecoType;
  src: string;
  x: number; // %
  y: number; // %
}

export function useTreeDecorations(slug: string, isMyTree: boolean) {
  const treeRef = useRef<HTMLDivElement>(null);

  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [unsavedDecorations, setUnsavedDecorations] = useState<Decoration[]>([]);
  const [pendingDeco, setPendingDeco] = useState<Omit<Decoration, 'x' | 'y'> | null>(null);
  const [isTreeLoading, setIsTreeLoading] = useState(false);
  const [showDecoSheet, setShowDecoSheet] = useState(false);

  const treeTitle = useMemo(() => `🎄 ${slug} 님의 트리`, [slug]);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        setIsTreeLoading(true);
        const data = await getObjectsApi(slug);

        const mapped: Decoration[] = (data.objects ?? []).map((o) => {
          const type = API_NAME_TO_TYPE[o.name as ApiDecoName];
          return {
            id: o.object_id,
            type,
            src: TYPE_TO_SRC[type],
            x: pxToPercent(o.position_x, TREE_BASE_SIZE.width),
            y: pxToPercent(o.position_y, TREE_BASE_SIZE.height),
          };
        });

        setDecorations(mapped);
        setUnsavedDecorations([]);
      } catch {
        setDecorations([]);
      } finally {
        setIsTreeLoading(false);
      }
    };

    if (slug) fetchTree();
  }, [slug]);

  const pickDecoration = (deco: { type: DecoType; src: string }) => {
    setPendingDeco({
      id: `temp-${Date.now()}`,
      type: deco.type,
      src: deco.src,
    });
    setShowDecoSheet(false);
  };

  const placeDecoration = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const saveDecorations = async () => {
    if (unsavedDecorations.length === 0) return;

    const unsavedIds = new Set(unsavedDecorations.map((d) => d.id));

    try {
      const payload = unsavedDecorations.map((d) => ({
        name: TYPE_TO_API_NAME[d.type], // "SOCK" | ...
        position_x: percentToPx(d.x, TREE_BASE_SIZE.width),
        position_y: percentToPx(d.y, TREE_BASE_SIZE.height),
      }));

      await saveDecorationsApi(slug, payload);

      alert('저장 완료!');
      setUnsavedDecorations([]);
    } catch {
      alert('저장 실패');

      setDecorations((prev) => prev.filter((d) => !unsavedIds.has(d.id)));
      setUnsavedDecorations([]);
      setPendingDeco(null);
    }
  };

  return {
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
  };
}
