import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Projects | Minseok Shin",
  description: "2026 KDM+ 우수상 수상작 Rally(XR 스포츠), Three.js 3D Solar System, Next.js 및 디자인 아트워크 프로젝트 쇼케이스.",
  openGraph: {
    title: "Work & Projects | Minseok Shin",
    description: "2026 KDM+ 우수상 수상작 Rally(XR 스포츠), Three.js 3D Solar System, Next.js 및 디자인 아트워크 프로젝트 쇼케이스.",
    url: "https://m1nseokshin.github.io/work",
  },
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
