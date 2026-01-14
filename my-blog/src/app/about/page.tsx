import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Button from '@/components/atoms/button';
import MarkdownContent from '@/components/molecules/markdown-content';
import { getAboutPage } from '@/lib/utils/markdown';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

// 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAboutPage();

  if (!aboutData) {
    return {
      title: '소개',
    };
  }

  return {
    title: aboutData.title,
    description: aboutData.description,
  };
}

export default async function AboutPage() {
  const aboutData = await getAboutPage();

  if (!aboutData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
          <MarkdownContent content={aboutData.content} />

          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
            <Button href="/posts" variant="primary" size="lg">
              포스트 보러 가기
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
