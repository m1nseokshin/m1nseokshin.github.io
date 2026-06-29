import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 About | Minseok Shin",
  description: "디자인과 프론트엔드 개발의 조화를 탐구하는 예비 UX 디자이너 신민석의 프로필, 교육 경험 및 기술 스택 소개 페이지입니다.",
  openGraph: {
    title: "소개 About | Minseok Shin",
    description: "HCI 및 웹 기술을 연구하는 신민석의 커리어 프로필과 포부 페이지입니다.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
