'use client';

export default function TreeShareButton({ children, onClick, disabled }: { children?: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <div
      className="
        sticky bottom-0 left-0 right-0
        pb-[env(safe-area-inset-bottom)]
        bg-transparent
        flex justify-center
        z-30
      "
    >
      <button
        type="button"
        onClick={onClick}
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
