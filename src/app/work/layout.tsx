import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "작업 Work | Minseok Shin",
  description: "디자인과 프론트엔드 코드로 완성도 높게 구현한 Mazda RX-7 소개 사이트, Styles 이커머스 등 다양한 프로젝트 쇼케이스를 확인하실 수 있습니다.",
  openGraph: {
    title: "작업 Work | Minseok Shin",
    description: "디자인 및 프론트엔드 개발을 융합하여 구축한 프로젝트 쇼케이스 목록입니다.",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
