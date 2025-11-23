'use client';

export default function LoginButton({ children, disabled }: { children?: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="
        w-full h-10 bg-red-600 text-white rounded-lg
        flex items-center justify-center
        hover:opacity-90 active:opacity-80
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      style={{ fontFamily: 'var(--font-ownglyph)' }}
    >
      {children || '로그인 하기'}
    </button>
  );
}
