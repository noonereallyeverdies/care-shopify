import React from 'react';
import { Link } from '@remix-run/react';

export function HomeLink() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Link 
        to="/"
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors"
      >
        Take me to the home page
      </Link>
    </div>
  );
} 