import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateCartTotals, validateInventory } from '../app/lib/services/cartService';

describe('Cart Service', () => {
  describe('calculateCartTotals', () => {
    it('calculates subtotal correctly', () => {
      const cartItems = [
        { id: '1', price: '10.00', quantity: 2 },
        { id: '2', price: '15.50', quantity: 1 },
      ];
      
      const totals = calculateCartTotals(cartItems);
      
      expect(totals.subtotal).toBe(35.50);
    });
    
    it('applies percentage discount correctly', () => {
      const cartItems = [
        { id: '1', price: '100.00', quantity: 1 },
      ];
      
      const totals = calculateCartTotals(cartItems, 'WELCOME10');
      
      expect(totals.discount).toBe(10);
      expect(totals.subtotal).toBe(100);
      // 100 - 10 discount + tax on 90 (7.43) + shipping
      expect(totals.total).toBe(97.43);
    });
    
    it('applies fixed discount correctly', () => {
      const cartItems = [
        { id: '1', price: '75.00', quantity: 1 },
      ];
      
      const totals = calculateCartTotals(cartItems, '50OFF');
      
      expect(totals.discount).toBe(50);
      expect(totals.subtotal).toBe(75);
      // 75 - 50 discount + tax on 25 (2.06) + shipping
      expect(totals.total).toBe(33.05);
    });
    
    it('calculates free shipping over $100', () => {
      const cartItems = [
        { id: '1', price: '120.00', quantity: 1 },
      ];
      
      const totals = calculateCartTotals(cartItems);
      
      expect(totals.shipping).toBe(0);
    });
    
    it('calculates shipping fee under $100', () => {
      const cartItems = [
        { id: '1', price: '50.00', quantity: 1 },
      ];
      
      const totals = calculateCartTotals(cartItems);
      
      expect(totals.shipping).toBe(5.99);
    });
    
    it('throws error with invalid cart items', () => {
      expect(() => calculateCartTotals('not-an-array')).toThrow();
    });
    
    it('throws error with invalid price or quantity', () => {
      const cartItems = [
        { id: '1', price: 'invalid', quantity: 1 },
      ];
      
      expect(() => calculateCartTotals(cartItems)).toThrow();
    });
  });
  
  describe('validateInventory', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    
    it('returns success for valid inventory', async () => {
      const validatePromise = validateInventory('prod_123', 'var_1', 5);
      
      vi.runAllTimers();
      
      const result = await validatePromise;
      expect(result.success).toBe(true);
    });
    
    it('returns error for insufficient inventory', async () => {
      const validatePromise = validateInventory('prod_123', 'var_1', 15);
      
      vi.runAllTimers();
      
      const result = await validatePromise;
      expect(result.success).toBe(false);
      expect(result.message).toContain('Only 10 items available');
    });
    
    it('returns error for invalid product', async () => {
      const validatePromise = validateInventory('invalid_prod', 'var_1', 1);
      
      vi.runAllTimers();
      
      const result = await validatePromise;
      expect(result.success).toBe(false);
      expect(result.message).toBe('Product not found');
    });
    
    it('returns error for invalid variant', async () => {
      const validatePromise = validateInventory('prod_123', 'invalid_var', 1);
      
      vi.runAllTimers();
      
      const result = await validatePromise;
      expect(result.success).toBe(false);
      expect(result.message).toBe('Variant not found');
    });
  });
});
