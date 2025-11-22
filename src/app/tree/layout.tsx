import Image from 'next/image';
import Header from '@/src/components/common/Header';

export default function TreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 1) 헤더 */}
      <Header />

      {/* 2) 헤더 아래부터 반응형으로 배경 시작 */}
      <div className="fixed left-0 right-0 bottom-0 top-[56px] -z-10">
        <Image src="/images/Tree_v02.png" alt="tree background" fill priority className="object-cover object-bottom" />
      </div>

      {/* ⭐ 3) 오른쪽 상단 메일박스 아이콘 */}
      <div className="absolute top-0 right-0 pt-0 pr-2">
        <Image
          src="/images/Mailbox_v02.png" // 여기에 업로드한 파일 경로
          alt="mailbox"
          width={75}
          height={75}
          priority
        />
      </div>

      {/* 3) 414px 모바일 프레임 */}
      <div className="relative z-10 w-full h-full flex justify-center">
        <main className="w-full max-w-[414px] h-full flex flex-col mx-auto relative pt-[56px]">{children}</main>
      </div>
    </div>
  );
}
