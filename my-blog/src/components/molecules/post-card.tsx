import Link from 'next/link';
import Tag from '@/components/atoms/tag';
import OptimizedImage from '@/components/atoms/optimized-image';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
  project?: string;
}

export default function PostCard({
  title,
  slug,
  description,
  date,
  tags = [],
  thumbnail,
  project,
}: PostCardProps) {
  // 프로젝트가 있으면 프로젝트 기반 URL, 없으면 기존 URL
  const href = project
    ? `/projects/${project}/posts/${slug}`
    : `/posts/${slug}`;

  return (
    <article className="group overflow-hidden rounded-lg  transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Link href={href}>
        {/* 썸네일 이미지 */}
        {thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <OptimizedImage
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="p-6">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h2>
          <time className="mb-3 block text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </time>
          <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
