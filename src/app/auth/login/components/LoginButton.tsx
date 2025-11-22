export default function LoginButton({ children }: { children?: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="
        w-[200px] h-10 bg-red-600 text-white rounded-lg
        flex items-center justify-center
        hover:opacity-90 active:opacity-80
        transition
      "
      style={{ fontFamily: 'var(--font-ownglyph)' }}
    >
      {children || '로그인 하기'}
    </button>
  );
}
