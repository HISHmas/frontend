export default function SignupButton({ children }: { children?: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="
        w-full h-10 bg-red-600 text-white rounded-lg
        flex items-center justify-center
        hover:opacity-90 active:opacity-80
        transition
      "
      style={{ fontFamily: "var(--font-ownglyph)" }}
    >
      {children || "회원가입 하기"}
    </button>
  );
}