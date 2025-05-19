import { Link, type LinkProps } from '@remix-run/react';
import clsx from 'clsx'; // Using clsx for conditional classes
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium' | 'large';

// Base props common to all variations
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  className?: string;
}

// Define specific props for each component type using discriminated unions
type PolymorphicButtonProps = BaseButtonProps & (
  | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a'; href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) // Ensure href is only defined once
  | ({ as: typeof Link; to: LinkProps['to'] } & Omit<LinkProps, 'to'>) // Correctly define 'to' here
);

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  as: Component = 'button',
  className,
  ...props
}: PolymorphicButtonProps) {
  const baseClasses = 'button inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-accent-rlt text-white hover:bg-accent-rlt-dark focus-visible:outline-accent-rlt', // Define --c-accent-rlt-dark later
    secondary: 'bg-transparent border border-accent-rlt text-accent-rlt hover:bg-accent-rlt hover:text-white focus-visible:outline-accent-rlt', // Example secondary
    tertiary: 'bg-transparent text-accent-rlt hover:underline focus-visible:outline-accent-rlt', // Example tertiary (link-like)
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm', // Use spacing vars later
    medium: 'px-5 py-2.5', // Use spacing vars later
    large: 'px-6 py-3 text-lg', // Use spacing vars later
  };

  const combinedClassName = clsx(
    baseClasses,
    `button--${variant}`,
    `button--${size}`,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (Component === 'a') {
    // Extract href and ensure it's not part of the rest props spread onto the <a> tag
    const { href, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={combinedClassName} {...rest}>
        {children}
      </a>
    );
  }

  if (Component === Link) {
    // Extract to and ensure it's not part of the rest props spread onto the <Link> tag
    const { to, ...rest } = props as LinkProps; // LinkProps includes 'to'
    return (
      <Link to={to} className={combinedClassName} {...rest}>
        {children}
      </Link>
    );
  }

  // Default to button
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}

// Note: CSS styles for button variants and sizes should be defined
// in a separate .css file (e.g., imported into global.css or a component-specific css file)
// using the CSS variables defined in variables.css. 