import React from 'react';
import { Link } from '@remix-run/react';
import { cn } from "../lib/utils";

// Base button variants and sizes
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

// Base props shared by all button types
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Button component props (HTML button)
interface ButtonElementProps extends BaseButtonProps, 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {}

// Link component props (Remix Link)
interface ButtonLinkProps extends BaseButtonProps,
  Omit<React.ComponentProps<typeof Link>, keyof BaseButtonProps | 'className'> {}

// External link props (HTML anchor)
interface ButtonExternalProps extends BaseButtonProps,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  external: true;
  href: string;
}

// Union type for all button variations
type ButtonProps = ButtonElementProps | ButtonLinkProps | ButtonExternalProps;

// Type guards to determine which type of button to render
function isExternalLink(props: ButtonProps): props is ButtonExternalProps {
  return 'external' in props && props.external === true;
}

function isInternalLink(props: ButtonProps): props is ButtonLinkProps {
  return 'to' in props;
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    children,
    className,
    ...rest
  } = props;

  // Base styles for all buttons
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out rounded-md',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-[0.98]',
    {
      'w-full': fullWidth,
      'cursor-not-allowed opacity-50': loading,
    }
  );

  // Variant styles
  const variantStyles = {
    primary: cn(
      'bg-primary text-primary-foreground shadow-sm',
      'hover:bg-primary/90 focus-visible:ring-primary'
    ),
    secondary: cn(
      'bg-secondary text-secondary-foreground shadow-sm',
      'hover:bg-secondary/90 focus-visible:ring-secondary'
    ),
    outline: cn(
      'border border-input bg-background text-foreground shadow-sm',
      'hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring'
    ),
    ghost: cn(
      'text-foreground',
      'hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring'
    ),
    link: cn(
      'text-primary underline-offset-4',
      'hover:underline focus-visible:ring-primary'
    ),
  };

  // Size styles
  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  // Combine all styles
  const buttonClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="h-4 w-4 animate-spin"
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
  );

  // Button content with loading state
  const content = (
    <>
      {loading && <LoadingSpinner />}
      {children}
    </>
  );

  // External link button
  if (isExternalLink(props)) {
    const { external, href, ...externalProps } = rest as ButtonExternalProps;
    return (
      <a
        href={href}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...externalProps}
      >
        {content}
      </a>
    );
  }

  // Internal link button (Remix Link)
  if (isInternalLink(props)) {
    const { to, ...linkProps } = rest as ButtonLinkProps;
    return (
      <Link to={to} className={buttonClassName} {...linkProps}>
        {content}
      </Link>
    );
  }

  // Regular HTML button
  const { disabled, ...buttonProps } = rest as ButtonElementProps;
  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      type="button"
      {...buttonProps}
    >
      {content}
    </button>
  );
}

// Convenience components for specific use cases
export const PrimaryButton = (props: ButtonProps) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: ButtonProps) => (
  <Button {...props} variant="secondary" />
);

export const OutlineButton = (props: ButtonProps) => (
  <Button {...props} variant="outline" />
);

export const GhostButton = (props: ButtonProps) => (
  <Button {...props} variant="ghost" />
);

export const LinkButton = (props: ButtonProps) => (
  <Button {...props} variant="link" />
);

// Export types for external use
export type { ButtonProps, ButtonVariant, ButtonSize };
