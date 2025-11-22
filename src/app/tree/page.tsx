import TreeShareButton from "@/src/app/tree/components/TreeShareButton";

export default function TreePage() {
  return (
    <div className="h-full flex flex-col px-4 py-4">
      <div className="flex-1">
        Tree content here
      </div>

      <div className="mt-auto">
        <TreeShareButton>트리 공유하기</TreeShareButton>
      </div>
    </div>
  );
}
