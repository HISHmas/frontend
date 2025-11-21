import React from 'react';

export default function SignupForm() {
  return (
    <div className="w-80 mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* 이름 입력 필드 */}
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="name" className="text-sm text-gray-600">
          이름
        </label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요"
          className="
            w-full px-4 py-3 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400
          "
          style={{ fontFamily: "var(--font-ownglyph)" }}
        />
      </div>

      {/* 아이디 입력 필드 */}
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="username" className="text-sm text-gray-600">
          아이디
        </label>
        <input
          type="text"
          id="username"
          placeholder="아이디를 입력해주세요"
          className="
            w-full px-4 py-3 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400
          "
          style={{ fontFamily: "var(--font-ownglyph)" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm text-gray-600">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요"
          className="
            w-full px-4 py-3 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500
            placeholder-gray-400
          "
          style={{ fontFamily: "var(--font-ownglyph)" }}
        />
      </div>
    </div>
  );
}