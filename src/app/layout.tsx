import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Minseok Shin | Portfolio",
  description: "디자인과 프론트엔드 개발의 경계를 허물어 새로운 가치를 만드는 신민석의 포트폴리오 사이트입니다. UX 디자인, HCI 연구 및 인터랙티브 웹 개발 결과물을 만나보세요.",
  keywords: ["신민석", "포트폴리오", "UX 디자이너", "프론트엔드 개발자", "HCI", "인터랙티브 웹", "Minseok Shin", "Portfolio", "Web Developer", "UX Designer"],
  robots: "index, follow",
  openGraph: {
    title: "Minseok Shin | Portfolio",
    description: "디자인과 개발의 조화로운 접점을 구축하는 신민석의 포트폴리오 웹사이트입니다.",
    type: "website",
    siteName: "Minseok Shin Portfolio",
  },
  icons: {
    icon: "/img/profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <div className="flex-grow pt-[64px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
