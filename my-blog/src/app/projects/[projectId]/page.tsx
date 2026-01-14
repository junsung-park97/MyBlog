import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostList from '@/components/organisms/post-list';
import MarkdownContent from '@/components/molecules/markdown-content';
import Button from '@/components/atoms/button';
import {
  getAllProjectIds,
  getProjectById,
} from '@/lib/utils/projects';
import { getPostsByProject } from '@/lib/utils/markdown';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

// 정적 경로 생성
export async function generateStaticParams() {
  const projectIds = getAllProjectIds();
  return projectIds.map((projectId) => ({
    projectId,
  }));
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) {
    return {
      title: '프로젝트를 찾을 수 없습니다',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const posts = await getPostsByProject(projectId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Project Header */}
      <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-6">
            <Button href="/" variant="ghost">
              ← 홈으로 돌아가기
            </Button>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Description */}
      {project.content && (
        <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <MarkdownContent content={project.content} />
          </div>
        </section>
      )}

      {/* Posts List */}
      <section className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            게시글
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            총 {posts.length}개의 게시글이 있습니다.
          </p>
        </div>

        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              아직 게시글이 없습니다.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
