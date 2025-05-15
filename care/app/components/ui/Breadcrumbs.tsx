import React from 'react';
import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react'; // Or your preferred separator icon

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex items-center space-x-1 text-neutral-500">
        <li>
          <Link 
            to="/" 
            className="hover:text-neutral-700 hover:underline"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path || index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 flex-shrink-0" aria-hidden="true" />
            {index === items.length - 1 ? (
              // Last item - current page (not linked)
              <span className="font-medium text-neutral-700" aria-current="page">
                {item.name}
              </span>
            ) : (
              // Intermediate item - linked
              <Link 
                to={item.path} 
                className="hover:text-neutral-700 hover:underline"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 