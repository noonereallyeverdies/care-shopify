// Simple useCart hook for compatibility
export function useCart() {
  return {
    lines: [],
    totalQuantity: 0,
    cost: {
      totalAmount: { amount: '0', currencyCode: 'USD' },
    },
  };
}
