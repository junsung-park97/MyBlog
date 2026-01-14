import { Metadata } from 'next';
import PostList from '@/components/organisms/post-list';
import { getAllPosts } from '@/lib/utils/markdown';

export const metadata: Metadata = {
  title: '모든 포스트',
  description: '블로그의 모든 포스트를 확인하세요.',
};

// ISR: 30분마다 재생성
export const revalidate = 1800;

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
            모든 포스트
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            총 {posts.length}개의 포스트가 있습니다.
          </p>
        </header>

        <PostList posts={posts} />
      </div>
    </div>
  );
}
