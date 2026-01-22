'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import PostCard from '@/components/molecules/post-card';

interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  project?: string;
}

interface InfinitePostListProps {
  projectId: string;
  initialPosts: Post[];
  initialHasMore: boolean;
  limit?: number;
}

export default function InfinitePostList({
  projectId,
  initialPosts,
  initialHasMore,
  limit = 5,
}: InfinitePostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(
        `/api/projects/${projectId}/posts?page=${nextPage}&limit=${limit}`
      );
      const data = await response.json();

      setPosts((prev) => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.error('Failed to load more posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, projectId, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, loadMorePosts]);

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          아직 게시된 포스트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>

      {/* 로딩 인디케이터 및 관찰 대상 */}
      <div ref={observerRef} className="mt-8 flex justify-center py-4">
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>로딩 중...</span>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            모든 포스트를 불러왔습니다.
          </p>
        )}
      </div>
    </div>
  );
}
