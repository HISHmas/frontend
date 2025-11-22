'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white
        border-b
        flex justify-center
        [padding-top:env(safe-area-inset-top)]
      "
      style={{ height: 'calc(56px + env(safe-area-inset-top))' }}
    >
      <div className="relative w-full max-w-[414px] h-[56px] flex items-center justify-center px-5">
        {/* 타이틀 */}
        <h1 className="text-[24px] text-[#1d1d1d] font-['Ownglyph PDH']">HISHmas</h1>
      </div>
    </header>
  );
}
