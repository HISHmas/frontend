'use client';

export default function TreeShareButton({ children, disabled }: { children?: React.ReactNode; disabled?: boolean }) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <div
      className="
        sticky bottom-0 left-0 right-0
        pb-[env(safe-area-inset-bottom)]
        bg-transparent flex justify-center z-30
      "
    >
      <button
        type="button"
        onClick={handleShare}
        disabled={disabled}
        className="
          w-[calc(100%-32px)] max-w-[382px] h-12
          bg-green-600 text-white rounded-xl
          flex items-center justify-center
          hover:opacity-90 active:opacity-80
          transition font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-md
        "
        style={{ fontFamily: 'var(--font-ownglyph)' }}
      >
        {children || '트리 공유하기'}
      </button>
    </div>
  );
}
