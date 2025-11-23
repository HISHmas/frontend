'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/src/stores/useAuthStore';
import SignupForm from './components/SignupForm';
import SignupButton from './components/SignupButton';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);

  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    const success = await signup(loginId, password, name);

    setLoading(false);

    if (!success) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      return;
    }

    alert('회원가입이 완료되었습니다! 이제 로그인 해주세요 😊');
    router.push('/auth/login');
  }

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

      {/* 입력 Form */}
      <div className="mt-10 w-full flex justify-center">
        <SignupForm name={name} loginId={loginId} password={password} setName={setName} setLoginId={setLoginId} setPassword={setPassword} error={error} />
      </div>

      {/* 회원가입 버튼 */}
      <div className="w-full mt-10 flex justify-center">
        <SignupButton disabled={loading}>{loading ? '회원가입 중...' : '회원가입 하기'}</SignupButton>
      </div>
    </form>
  );
}
