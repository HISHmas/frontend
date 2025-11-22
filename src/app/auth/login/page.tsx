'use client';

import LoginForm from './components/LoginForm';
import LoginButton from './components/LoginButton';

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
        트리를 꾸며주세요!
      </p>

      <div className="mt-10 w-full flex justify-center">
        <LoginForm />
      </div>

      <div className="w-full mt-10 flex justify-center">
        <LoginButton />
      </div>
    </form>
  );
}
