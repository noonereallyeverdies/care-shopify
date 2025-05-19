import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProductDetails, submitProductReview, subscribeToNewsletter } from '../app/lib/api/apiClient';

describe('API Client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Use fake timers to control setTimeout
    vi.useFakeTimers();
  });
  
  describe('fetchProductDetails', () => {
    it('returns product details for valid ID', async () => {
      // Arrange
      const productId = 'prod_123';
      
      // Act
      const fetchPromise = fetchProductDetails(productId);
      // Fast-forward time to resolve all timeouts
      await vi.runAllTimersAsync();
      const result = await fetchPromise;
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.product).toBeDefined();
      expect(result.product.id).toBe(productId);
      expect(result.product.title).toBe('Advanced Hair Restoration Kit');
      expect(result.product.variants).toHaveLength(2);
    });
    
    it('returns error for invalid product ID', async () => {
      // Arrange
      const invalidId = 'invalid_id';
      
      // Act
      const fetchPromise = fetchProductDetails(invalidId);
      await vi.runAllTimersAsync();
      const result = await fetchPromise;
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Product not found');
    });
  });
  
  describe('submitProductReview', () => {
    it('submits valid review successfully', async () => {
      // Arrange
      const productId = 'prod_123';
      const review = {
        rating: 4,
        name: 'Test User',
        comment: 'Great product!',
        email: 'test@example.com'
      };
      
      // Mock random to always succeed
      vi.spyOn(Math, 'random').mockReturnValue(0.5);
      
      // Act
      const submitPromise = submitProductReview(productId, review);
      await vi.runAllTimersAsync();
      const result = await submitPromise;
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.reviewId).toBeDefined();
      expect(result.message).toContain('successfully');
    });
    
    it('validates required review fields', async () => {
      // Arrange
      const productId = 'prod_123';
      const invalidReview = {
        // Missing rating
        name: 'Test User',
        comment: 'Great product!'
      };
      
      // Act
      const submitPromise = submitProductReview(productId, invalidReview);
      await vi.runAllTimersAsync();
      const result = await submitPromise;
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Missing required review fields');
    });
    
    it('validates rating value', async () => {
      // Arrange
      const productId = 'prod_123';
      const invalidReview = {
        rating: 6, // Invalid: outside 1-5 range
        name: 'Test User',
        comment: 'Great product!'
      };
      
      // Act
      const submitPromise = submitProductReview(productId, invalidReview);
      await vi.runAllTimersAsync();
      const result = await submitPromise;
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rating must be between 1 and 5');
    });
    
    it('handles service failures', async () => {
      // Arrange
      const productId = 'prod_123';
      const review = {
        rating: 4,
        name: 'Test User',
        comment: 'Great product!',
      };
      
      // Mock random to force failure
      vi.spyOn(Math, 'random').mockReturnValue(0.95);
      
      // Act
      const submitPromise = submitProductReview(productId, review);
      await vi.runAllTimersAsync();
      const result = await submitPromise;
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Service temporarily unavailable');
    });
  });
  
  describe('subscribeToNewsletter', () => {
    it('subscribes with valid email', async () => {
      // Arrange
      const email = 'test@example.com';
      
      // Act
      const subscribePromise = subscribeToNewsletter(email);
      await vi.runAllTimersAsync();
      const result = await subscribePromise;
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.message).toContain('Successfully subscribed');
    });
    
    it('validates email format', async () => {
      // Arrange
      const invalidEmail = 'not-an-email';
      
      // Act
      const subscribePromise = subscribeToNewsletter(invalidEmail);
      await vi.runAllTimersAsync();
      const result = await subscribePromise;
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid email address');
    });
    
    it('accepts additional preferences', async () => {
      // Arrange
      const email = 'test@example.com';
      const preferences = {
        productUpdates: true,
        promotions: false
      };
      
      // Act
      const subscribePromise = subscribeToNewsletter(email, preferences);
      await vi.runAllTimersAsync();
      const result = await subscribePromise;
      
      // Assert
      expect(result.success).toBe(true);
    });
  });
});
