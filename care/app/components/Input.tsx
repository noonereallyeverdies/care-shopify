import clsx from 'clsx';

export function Input({
  className = '',
  type,
  variant,
  ...props
}: {
  className?: string;
  type?: string;
  variant?: 'search' | 'minisearch';
  [key: string]: any;
}) {
  const variants = {
    search:
      'bg-transparent px-0 py-2 text-heading w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90',
    minisearch:
      'bg-transparent hidden md:inline-block text-left lg:text-right border-b transition border-transparent -mb-px border-x-0 border-t-0 appearance-none px-0 py-1 focus:ring-transparent placeholder:opacity-20 placeholder:text-inherit',
  };

  const defaultStyles = 'border border-primary/20 px-2 py-1 rounded focus:border-primary/50 focus:ring-0';

  const styles = clsx(variant ? variants[variant] : defaultStyles, className);

  return <input type={type} {...props} className={styles} />;
}
