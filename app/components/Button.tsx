import {Link} from '@remix-run/react';
import {cn} from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button' | 'link' | 'span';
  variant?: 'primary' | 'secondary' | 'inline' | 'outline';
  width?: 'auto' | 'full';
  to?: string;
  // For Link compatibility
  type?: 'submit' | 'reset' | 'button' | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  as = 'button',
  children,
  className = '',
  variant = 'primary',
  width = 'auto',
  to = '',
  type,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-[0.98]',
    {
      'py-3 px-6': variant !== 'inline',
      'text-xs': variant === 'inline',
      'opacity-50 cursor-not-allowed': disabled || loading,
      'w-full': width === 'full',
    }
  );

  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/90 active:bg-primary text-white shadow',
    secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-primary',
    outline: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 border border-current text-primary',
    inline: 'border-b border-primary/30 hover:border-primary text-primary hover:text-primary p-0',
  };

  const styles = cn(baseStyles, variantStyles[variant], className);

  const content = (
    <>
      {loading ? (
        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-current rounded-full"></span>
      ) : (
        children
      )}
    </>
  );

  // Link button
  if (as === 'link') {
    return (
      <Link to={to} className={styles} {...props}>
        {content}
      </Link>
    );
  }

  // Span (non-clickable display)
  if (as === 'span') {
    return (
      <span className={styles} {...props}>
        {content}
      </span>
    );
  }

  // Default button
  return (
    <button 
      className={styles} 
      disabled={disabled || loading}
      type={type || 'button'}
      {...props}
    >
      {content}
    </button>
  );
}
