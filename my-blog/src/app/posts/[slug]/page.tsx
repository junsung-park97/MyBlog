import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostHeader from '@/components/molecules/post-header';
import MarkdownContent from '@/components/molecules/markdown-content';
import Button from '@/components/atoms/button';
import { getPostBySlug, getAllPostSlugs } from '@/lib/utils/markdown';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

interface PostPageProps {
  params: {
    slug: string;
  };
}

// SSG: 빌드 타임에 정적 경로 생성
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-8">
          <Button href="/" variant="ghost" size="sm">
            ← 홈으로 돌아가기
          </Button>
        </div>

        {/* 포스트 컨테이너 */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
          <PostHeader
            title={post.title}
            date={post.date}
            tags={post.tags}
            description={post.description}
          />

          <MarkdownContent content={post.content} />
        </div>

        {/* 공유 버튼 (선택사항) */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
          <Button href="/posts" variant="secondary">
            ← 모든 포스트 보기
          </Button>
        </div>
      </article>
    </div>
  );
}
