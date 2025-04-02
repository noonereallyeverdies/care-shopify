import React from 'react';
import clsx from 'clsx';

// Explicitly include className and children in the interface
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; 
  children?: React.ReactNode;
}

// Minimal Card component mimicking basic shadcn/ui structure/styling
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow',
        // Default styles - can be overridden by className prop
        className, // Allow overriding styles
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// You could add CardHeader, CardContent, CardFooter similarly if needed:
// export function CardHeader({ className, ...props }: CardProps) {
//   return <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props} />;
// }
// export function CardContent({ className, ...props }: CardProps) {
//   return <div className={clsx("p-6 pt-0", className)} {...props} />;
// }
// etc. 