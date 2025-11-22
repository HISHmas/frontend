// src/app/auth/login/page.tsx
'use client';

import LoginForm from './components/LoginForm';
import LoginButton from './components/LoginButton';
import Link from 'next/link';
import { useAuthStore } from '@/src/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData(e.currentTarget);
    const loginId = String(formData.get('login_id') || '');
    const password = String(formData.get('password') || '');

    if (!loginId || !password) {
      alert('아이디/비밀번호를 입력해주세요!');
      return;
    }

    setLoading(true);
    const result = await login(loginId, password);
    setLoading(false);

    if (!result) {
      alert('로그인 실패');
      return;
    }

    //  로그인 성공하면 내 트리로 이동
    router.push(`/tree/${loginId}`);
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

      {/* 로그인 버튼 (디자인 그대로) */}
      <div className="w-full mt-10 flex justify-center">
        <LoginButton disabled={loading}>{loading ? '로그인 중...' : '로그인 하기'}</LoginButton>
      </div>

      <p className="mt-5 mb-4 text-gray-500 text-sm" style={{ fontFamily: 'var(--font-ownglyph)' }}>
        또는
      </p>

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
