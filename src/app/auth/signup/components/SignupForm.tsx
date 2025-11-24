import React from 'react';

export default function SignupForm({
  name,
  loginId,
  password,
  setName,
  setLoginId,
  setPassword,
  error,
}: {
  name: string;
  loginId: string;
  password: string;
  setName: (v: string) => void;
  setLoginId: (v: string) => void;
  setPassword: (v: string) => void;
  error: string;
}) {
  return (
    <div className="w-80 mx-auto p-6 bg-white rounded-xl shadow-md mt-10 flex flex-col gap-4">
      {/* 이름 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400 text-gray-900"
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        />
      </div>

      {/* 아이디 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">아이디</label>
        <input
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400 text-gray-900"
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        />
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400 text-gray-900"
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
