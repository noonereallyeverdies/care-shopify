# Cart Mutation Testing

This document outlines how to run the cart mutation tests to verify the implementation of cart functionality in the Hydrogen app.

## Overview

The cart mutations have been implemented and include the following functionality:

1. Add to cart
2. Update cart quantities
3. Remove from cart
4. Error handling

These mutations are defined in the product route file (`app/routes/($locale)/products/$handle.tsx`) and include:

- `cartLinesAdd` - Adds items to the cart
- `cartLinesUpdate` - Updates quantities of items in the cart
- `cartLinesRemove` - Removes items from the cart

## Setting Up the Tests

Before running the tests, you need to set up Playwright:

```bash
# Make the setup script executable
chmod +x setup-playwright.sh

# Run the setup script
./setup-playwright.sh
```

This will:
- Install Playwright and its dependencies
- Install browser binaries needed for testing
- Create TypeScript type definitions

## Running the Tests

To run the cart mutation tests:

```bash
# Start the development server if it's not already running
npm run dev

# In a separate terminal, run the cart tests
npm run test:cart
```

## Test Scenarios

The tests cover the following scenarios:

1. **Add to Cart Test**: Verifies that the add to cart mutation works by adding a product to the cart and checking that it appears in the cart page.

2. **Update Cart Quantity Test**: Verifies that changing the quantity of an item in the cart works by updating the quantity and checking that the change is reflected.

3. **Remove from Cart Test**: Verifies that removing an item from the cart works by clicking the remove button and checking that the item is no longer in the cart.

4. **Error Handling Test**: Tests how the application handles API errors by mocking error responses for cart mutations and checking that the UI gracefully handles these errors.

## Troubleshooting

If you encounter issues with the tests:

1. Make sure the development server is running (`npm run dev`)
2. Check that the product handle in the test file (`PRODUCT_HANDLE`) is set to a valid product in your store
3. If tests fail due to selectors not finding elements, you may need to update the selectors in the test file to match your specific implementation

## Extending the Tests

You can extend these tests by:

1. Adding more specific checks for cart state
2. Testing edge cases like adding the maximum quantity allowed
3. Testing promotions or discounts if implemented
4. Testing cart persistence across page refreshes

## Integration with CI/CD

These tests can be integrated into your CI/CD pipeline by adding them to your GitHub Actions workflow or other CI service. Make sure to set the `BASE_URL` environment variable to point to your staging environment. 