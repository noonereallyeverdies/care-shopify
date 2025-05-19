import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterSignup } from '../app/components/NewsletterSignup';
import * as apiClient from '../app/lib/api/apiClient';

// Mock the API module
vi.mock('../app/lib/api/apiClient', async () => {
  const actual = await vi.importActual('../app/lib/api/apiClient');
  return {
    ...actual,
    subscribeToNewsletter: vi.fn(),
  };
});

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the newsletter signup form', () => {
    // Arrange & Act
    render(<NewsletterSignup />);
    
    // Assert
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('subscribe-button')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('validates empty email submission', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NewsletterSignup />);
    
    // Act
    await user.click(screen.getByTestId('subscribe-button'));
    
    // Assert
    expect(screen.getByTestId('status-message')).toHaveTextContent('Please enter your email address');
    expect(apiClient.subscribeToNewsletter).not.toHaveBeenCalled();
  });

  it('displays loading state during submission', async () => {
    // Arrange
    const user = userEvent.setup();
    // Mock successful API response but don't resolve immediately
    const mockSubscribePromise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, message: 'Successfully subscribed!' });
      }, 100);
    });
    apiClient.subscribeToNewsletter.mockReturnValue(mockSubscribePromise);
    
    render(<NewsletterSignup />);
    
    // Act - Enter email and submit
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.click(screen.getByTestId('subscribe-button'));
    
    // Assert - Check loading state
    expect(screen.getByTestId('status-message')).toHaveTextContent('Subscribing...');
    expect(screen.getByTestId('subscribe-button')).toHaveTextContent('Subscribing...');
    expect(screen.getByTestId('subscribe-button')).toBeDisabled();
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByTestId('status-message')).toHaveTextContent('Successfully subscribed!');
    });
  });

  it('displays success message after successful subscription', async () => {
    // Arrange
    const user = userEvent.setup();
    apiClient.subscribeToNewsletter.mockResolvedValue({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
    
    render(<NewsletterSignup />);
    
    // Act
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.click(screen.getByTestId('subscribe-button'));
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('status-message')).toHaveTextContent('Successfully subscribed to newsletter!');
    });
    
    // Verify API was called with correct parameters
    expect(apiClient.subscribeToNewsletter).toHaveBeenCalledWith('test@example.com');
    
    // Verify input was cleared
    expect(screen.getByTestId('email-input')).toHaveValue('');
  });

  it('displays error message when subscription fails', async () => {
    // Arrange
    const user = userEvent.setup();
    apiClient.subscribeToNewsletter.mockResolvedValue({
      success: false,
      error: 'Invalid email address'
    });
    
    render(<NewsletterSignup />);
    
    // Act
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    await user.click(screen.getByTestId('subscribe-button'));
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('status-message')).toHaveTextContent('Invalid email address');
    });
    
    // Input should not be cleared on error
    expect(screen.getByTestId('email-input')).toHaveValue('invalid-email');
  });

  it('handles unexpected errors gracefully', async () => {
    // Arrange
    const user = userEvent.setup();
    apiClient.subscribeToNewsletter.mockRejectedValue(new Error('Network error'));
    
    render(<NewsletterSignup />);
    
    // Act
    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.click(screen.getByTestId('subscribe-button'));
    
    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('status-message')).toHaveTextContent('An unexpected error occurred');
    });
  });
});
