import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Minseok Shin - UX Designer & Developer",
  description: "부산대학교 디자인앤테크놀로지전공 신민석의 프로필, Spark Design Awards Gold Winner 수상 이력, Google Cloud 수료증 및 경험을 소개합니다.",
  openGraph: {
    title: "About | Minseok Shin - UX Designer & Developer",
    description: "부산대학교 디자인앤테크놀로지전공 신민석의 프로필, Spark Design Awards Gold Winner 수상 이력, Google Cloud 수료증 및 경험을 소개합니다.",
    url: "https://m1nseokshin.github.io/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
