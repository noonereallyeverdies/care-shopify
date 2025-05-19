import React, { useState } from 'react';
import { subscribeToNewsletter } from '../lib/api/apiClient';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }
    
    try {
      setStatus('loading');
      setMessage('Subscribing...');
      
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <div className="newsletter-signup">
      <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
      <p className="text-gray-600 mb-4">Subscribe to our newsletter for product updates and exclusive offers.</p>
      
      <form onSubmit={handleSubscribe} className="flex flex-col">
        <div className="flex mb-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="grow px-4 py-2 border rounded-l"
            aria-label="Email address"
            data-testid="email-input"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
            disabled={status === 'loading'}
            data-testid="subscribe-button"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {status !== 'idle' && (
          <div 
            className={`mt-2 p-2 rounded ${
              status === 'success' ? 'bg-green-100 text-green-800' : 
              status === 'error' ? 'bg-red-100 text-red-800' : 
              'bg-gray-100'
            }`}
            data-testid="status-message"
          >
            {message}
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
}
