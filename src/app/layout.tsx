import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

const siteUrl = "https://m1nseokshin.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Minseok Shin | UX Designer & Frontend Developer Portfolio",
    template: "%s | Minseok Shin",
  },
  description: "부산대학교 디자인앤테크놀로지전공 신민석의 포트폴리오. UX 디자인, HCI 연구, 생성형 AI(Generative AI), Three.js 인터랙티브 웹 개발 결과물을 만나보세요.",
  keywords: [
    "신민석",
    "신민석 포트폴리오",
    "Minseok Shin",
    "Minseok Shin Portfolio",
    "UX 디자이너",
    "프론트엔드 개발자",
    "HCI 연구",
    "디자인앤테크놀로지",
    "부산대학교",
    "Spark Design Awards",
    "Korea Design Membership",
    "KDM+",
    "Generative AI",
    "Three.js Developer",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Minseok Shin", url: siteUrl }],
  creator: "Minseok Shin",
  publisher: "Minseok Shin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "Minseok Shin Portfolio",
    title: "Minseok Shin | UX Designer & Frontend Developer Portfolio",
    description: "디자인과 기술의 조화로운 접점을 구축하는 신민석의 인터랙티브 포트폴리오 웹사이트입니다.",
    images: [
      {
        url: `${siteUrl}/img/profile.png`,
        width: 800,
        height: 800,
        alt: "Minseok Shin Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minseok Shin | UX Designer & Frontend Developer",
    description: "디자인과 기술의 조화로운 접점을 구축하는 신민석의 포트폴리오 웹사이트입니다.",
    images: [`${siteUrl}/img/profile.png`],
  },
  icons: {
    icon: "/img/profile.png",
    shortcut: "/img/profile.png",
    apple: "/img/profile.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "신민석",
      alternateName: "Minseok Shin",
      jobTitle: "UX Designer & Frontend Developer",
      url: siteUrl,
      image: `${siteUrl}/img/profile.png`,
      sameAs: [
        "https://www.linkedin.com/in/m1nseokdesign/",
        "https://github.com/m1nseokshin",
        "https://www.instagram.com/xx_xstyles",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "부산대학교 (Pusan National University)",
      },
      knowsAbout: [
        "User Experience (UX) Design",
        "Human-Computer Interaction (HCI)",
        "Generative AI",
        "Three.js",
        "Next.js",
        "React",
        "Frontend Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Minseok Shin Portfolio",
      description: "UX Designer & Developer Minseok Shin Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll />
        <LanguageProvider>
          <Header />
          <div className="flex-grow pt-[64px]">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
