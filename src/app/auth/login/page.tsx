"use client";

import LoginForm from "./components/LoginForm";
import LoginButton from "./components/LoginButton";

export default function Page() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col items-center pt-20 mx-auto
          bg-white
          w-[375px] h-[812px]
        "
      >
        <p className="mt-15 text-xl" style={{ fontFamily: "var(--font-ownglyph)" }}>트리를 꾸며주세요!</p>

        <div className="mt-20">
          <LoginForm />
        </div>

        <div className="w-80 mx-auto mt-20 px-6">
          <LoginButton />
        </div>
      </form>
    </div>
  );
}