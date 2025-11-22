'use client';

import { usePathname } from 'next/navigation';
import localFont from 'next/font/local';
import './globals.css';
import LayoutWrapper from '@/src/components/LayoutWrapper';
import Header from '@/src/components/common/Header';

const ownglyph = localFont({
  src: '../../public/fonts/OwnglyphPDH.ttf',
  variable: '--font-ownglyph',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTree = pathname.startsWith('/tree');

  return (
    <html lang="ko" className={ownglyph.variable}>
      <body className="bg-grayscale-5">
        {isTree ? (
          // ✅ tree는 전역 레이아웃 영향 제거(스크롤 원인 차단)
          <>{children}</>
        ) : (
          // ✅ 나머지 페이지는 기존 레이아웃 유지
          <LayoutWrapper>
            <Header />
            <div className="pt-[56px] flex-1">{children}</div>
          </LayoutWrapper>
        )}
      </body>
    </html>
  );
}
