import localFont from "next/font/local";
import './globals.css'
import LayoutWrapper from "@/src/components/LayoutWrapper";
import Header from "@/src/components/common/Header";
// import BottomNavBar from "@/src/components/common/BottomNavBar"; // 필요 시 추가

const ownglyph = localFont({
    src: "../../public/fonts/OwnglyphPDH.ttf",
    variable: "--font-ownglyph",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={ownglyph.variable}>
        <body className="bg-grayscale-5">


        <LayoutWrapper>


            <Header />


            <div className="pt-[56px] flex-1">
                {children}
            </div>




        </LayoutWrapper>

        </body>
        </html>
    );
}
