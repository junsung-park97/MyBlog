import Link from 'next/link';
import OptimizedImage from '@/components/atoms/optimized-image';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  thumbnail,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <Link href={`/projects/${id}`}>
        {/* 썸네일 이미지 */}
        {thumbnail ? (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <OptimizedImage
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="flex h-full items-center justify-center">
              <h3 className="text-4xl font-bold text-white">{title[0]}</h3>
            </div>
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h2>
          <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
            프로젝트 보기
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
