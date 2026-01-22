import Link from 'next/link';
import Button from '@/components/atoms/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-18 max-w-6xl items-center gap-[44px] px-4">
        <Link href="/" className="text-4xl font-bold text-white">
          Junlog
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/posts"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Posts
          </Link>
          <Link
            href="/about"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            About Me
          </Link>
        </nav>
      </div>
    </header>
  );
}
