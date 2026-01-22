import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostHeader from '@/components/molecules/post-header';
import MarkdownContent from '@/components/molecules/markdown-content';
import PostNavigation from '@/components/molecules/post-navigation';
import Button from '@/components/atoms/button';
import { getPostBySlug, getAllPosts, getAdjacentPosts } from '@/lib/utils/markdown';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

interface PostPageProps {
  params: Promise<{
    projectId: string;
    slug: string;
  }>;
}

// SSG: 빌드 타임에 정적 경로 생성
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts
    .filter((post) => post.project) // 프로젝트가 할당된 포스트만
    .map((post) => ({
      projectId: post.project!,
      slug: post.slug,
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
  const { projectId, slug } = await params;
  const post = await getPostBySlug(slug);

  // 포스트가 없거나 프로젝트가 일치하지 않으면 404
  if (!post || post.project !== projectId) {
    notFound();
  }

  // 이전/다음 포스트 가져오기
  const { prevPost, nextPost } = await getAdjacentPosts(slug, projectId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* 뒤로 가기 버튼 */}
        <div className="mb-8">
          <Button href={`/projects/${projectId}`} variant="ghost" size="sm">
            ← 프로젝트로 돌아가기
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

        {/* 이전글/다음글 네비게이션 */}
        <PostNavigation
          projectId={projectId}
          prevPost={prevPost}
          nextPost={nextPost}
        />

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800">
          <Button href={`/projects/${projectId}`} variant="secondary">
            ← 프로젝트 포스트 목록
          </Button>
          <Button href="/" variant="ghost">
            홈으로 →
          </Button>
        </div>
      </article>
    </div>
  );
}
