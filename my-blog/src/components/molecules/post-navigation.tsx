import Link from 'next/link';

interface AdjacentPost {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  projectId: string;
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
}

export default function PostNavigation({
  projectId,
  prevPost,
  nextPost,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 md:grid-cols-2">
      {/* 이전글 (더 최신 글) */}
      <div className="flex flex-col">
        {prevPost ? (
          <Link
            href={`/projects/${projectId}/posts/${prevPost.slug}`}
            className="group flex h-full flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-950"
          >
            <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              ← 이전글
            </span>
            <span className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {prevPost.title}
            </span>
          </Link>
        ) : (
          <div className="flex h-full flex-col rounded-lg border border-gray-100 p-4 dark:border-gray-800">
            <span className="mb-1 text-sm text-gray-400 dark:text-gray-600">
              ← 이전글
            </span>
            <span className="text-gray-400 dark:text-gray-600">
              이전 글이 없습니다
            </span>
          </div>
        )}
      </div>

      {/* 다음글 (더 오래된 글) */}
      <div className="flex flex-col">
        {nextPost ? (
          <Link
            href={`/projects/${projectId}/posts/${nextPost.slug}`}
            className="group flex h-full flex-col rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-950"
          >
            <span className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              다음글 →
            </span>
            <span className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {nextPost.title}
            </span>
          </Link>
        ) : (
          <div className="flex h-full flex-col rounded-lg border border-gray-100 p-4 text-right dark:border-gray-800">
            <span className="mb-1 text-sm text-gray-400 dark:text-gray-600">
              다음글 →
            </span>
            <span className="text-gray-400 dark:text-gray-600">
              다음 글이 없습니다
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
