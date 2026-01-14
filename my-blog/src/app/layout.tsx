import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/organisms/header';
import Footer from '@/components/organisms/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MyBlog - 개인 기술 블로그',
    template: '%s | MyBlog',
  },
  description:
    'frontend 개발자 지망생의 포트폴리오 & 기술 블로그',
  keywords: ['블로그', '포트폴리오', 'frontend', '기술 블로그'],
  authors: [{ name: 'Junlog' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://junlog.com',
    siteName: 'Junlog',
    title: 'Junlog - 포트폴리오&개인 기술 블로그',
    description:
      'frontend 개발자 지망생의 포트폴리오 & 기술 블로그',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
