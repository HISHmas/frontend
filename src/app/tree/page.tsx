// src/app/tree/page.tsx
import TreeShareButton from '@/src/app/tree/components/buttons/TreeShareButton';

export default function TreePage() {
  return (
    <div className="h-full flex flex-col px-4 py-4">
      <div className="flex-1" />
      <TreeShareButton>트리 공유하기</TreeShareButton>
    </div>
  );
}
