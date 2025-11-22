// src/app/tree/layout.tsx
import Image from 'next/image';
import Header from '@/src/components/common/Header';

export default function TreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex justify-center bg-white overflow-hidden">
      {/* ✅ 414px 고정 모바일 프레임 */}
      <div className="relative w-full max-w-[414px] h-screen overflow-hidden bg-white">
        {/* 헤더 */}
        <Header />

        {/* 메일박스 */}
        <div className="absolute top-0 right-0 pr-2 z-20">
          <Image src="/images/Mailbox_v02.png" alt="mailbox" width={75} height={75} priority />
        </div>

        {/* ✅ 헤더 아래 “트리 캔버스 영역” */}
        <div className="relative w-full h-[calc(100vh-56px)] mt-[56px]">
          {/* ✅ 배경을 여기서 1번만 깔기 */}
          <Image src="/images/Tree_v02.png" alt="tree background" fill priority className="object-cover object-bottom pointer-events-none select-none" />
          {/* ✅ 페이지 내용(장식/버튼 등) */}
          <div className="relative w-full h-full z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
