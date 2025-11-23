import Header from '@/src/components/common/Header';
import MailboxButton from '@/src/app/tree/components/buttons/MailboxButton';
import Image from 'next/image';

export default function TreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex justify-center bg-white overflow-hidden">
      <div className="relative w-full max-w-[414px] h-screen overflow-hidden bg-white">
        <Header />

        {/* 트리 배경 */}
        <div className="relative w-full h-[calc(100vh-56px)] mt-[56px]">
          <Image src="/images/Tree_v02.png" alt="tree background" fill priority className="object-cover object-bottom pointer-events-none select-none" />

          {/* 페이지 내용 */}
          <div className="relative w-full h-full z-10">{children}</div>
        </div>

        {/* ⭐ Mailbox 버튼은 렌더링 가장 마지막에 둬야 함 */}
        <div className="absolute top-0 right-0 pr-2 z-[9999] pointer-events-auto">
          <MailboxButton />
        </div>
      </div>
    </div>
  );
}
