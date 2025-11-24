// src/app/auth/login/components/LoginForm.tsx
import React from 'react';

export default function LoginForm() {
  return (
    <div className="w-80 mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="username" className="text-sm text-gray-600">
          아이디
        </label>
        <input
          type="text"
          id="username"
          name="login_id"
          placeholder="아이디를 입력해주세요"
          className="
            w-full px-4 py-3 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400 text-gray-900
          "
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          className="
            w-full px-4 py-3 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400 text-gray-900
          "
          style={{ fontFamily: 'var(--font-ownglyph)' }}
        />
      </div>
    </div>
  );
}
