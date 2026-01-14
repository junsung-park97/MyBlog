interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export default function Tag({ children, variant = 'default' }: TagProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    primary: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
