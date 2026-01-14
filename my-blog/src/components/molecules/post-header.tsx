import Tag from '@/components/atoms/tag';
import { formatDate } from '@/lib/utils';

interface PostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
}

export default function PostHeader({
  title,
  date,
  tags = [],
  description,
}: PostHeaderProps) {
  return (
    <header className="mb-8 border-b border-gray-200 pb-8 dark:border-gray-800">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mb-4 text-xl text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <time className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(date)}
        </time>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
