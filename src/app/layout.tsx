import localFont from "next/font/local";
import "./globals.css";

const ownglyph = localFont({
  src: "../../public/fonts/OwnglyphPDH.ttf", // ✅ 절대경로
  variable: "--font-ownglyph",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={ownglyph.variable}>
    <body>{children}</body>
    </html>
  );
}
