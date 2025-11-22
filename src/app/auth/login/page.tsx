'use client';

import LoginForm from './components/LoginForm';
import LoginButton from './components/LoginButton';
import Link from 'next/link';

export default function Page() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col items-center
        px-6 pt-10 pb-12
        w-full
      "
    >
      <p className="text-xl mt-6 text-black" style={{ fontFamily: 'var(--font-ownglyph)' }}>
        🎄트리를 만들어보세요!🎅🏻
      </p>

      {/* 로그인 폼 */}
      <div className="mt-10 w-full flex justify-center">
        <LoginForm />
      </div>

      {/* 로그인 버튼 */}
      <div className="w-full mt-10 flex justify-center">
        <LoginButton />
      </div>

      {/* 또는 */}
      <p className="mt-5 mb-4 text-gray-500 text-sm" style={{ fontFamily: 'var(--font-ownglyph)' }}>
        또는
      </p>

      {/* 회원가입 버튼 */}
      <div className="w-full flex justify-center">
        <Link
          href="/auth/signup"
          className="
            w-full  h-10
            flex items-center justify-center
            rounded-xl
            bg-gray-200 text-gray-700
            font-semibold
            hover:bg-gray-300
            transition
          "
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        >
          회원가입
        </Link>
      </div>
    </form>
  );
}
