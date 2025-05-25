import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string; // Optional title
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    // Using Fragment to avoid adding extra nodes unless necessary
    // For portals or more complex scenarios, consider React Portals
    <div 
      role="dialog"
      aria-modal="true"
      // aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out" 
        onClick={onClose} // Close on overlay click
        aria-hidden="true"
      />

      {/* Modal Container Wrapper (for centering) */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Modal Panel */}
        <div 
          className="relative transform overflow-hidden rounded-lg bg-contrast text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
        >
          {/* Modal Header (Optional Title + Close Button) */}
          <div className="flex items-start justify-between p-4 border-b border-neutral-200">
            {title && (
              <h3 className="text-lg font-semibold leading-6 text-primary" id="modal-title">
                {title}
              </h3>
            )}
            <button
              type="button"
              className="ml-auto rounded-md p-1 text-neutral-400 hover:text-primary hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {children}
          </div>
          
          {/* Optional Footer Area - Can be added via children if needed */}
          {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button">Action</button>
          </div> */}
        </div>
      </div>
    </div>
  );
} 