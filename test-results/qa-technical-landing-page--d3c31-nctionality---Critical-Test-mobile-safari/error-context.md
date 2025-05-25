# Test info

- Name: Landing Page Technical QA - Shopify Integration >> 4. Add to Cart Functionality - Critical Test
- Location: /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:121:3

# Error details

```
Error: expect.toBeVisible: Unexpected token "=" while parsing css selector "[data-test="add-to-cart"], text=/add to cart/i, button:has-text("add")". Did you mean to CSS.escape it?
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for [data-test="add-to-cart"], text=/add to cart/i, button:has-text("add") >> nth=0

    at /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:131:35
```

# Page snapshot

```yaml
- heading "Oops" [level=1]
- heading "404" [level=2]
- group: Not found
```

# Test source

```ts
   31 |     });
   32 |   });
   33 |
   34 |   test.afterEach(async () => {
   35 |     await context.close();
   36 |   });
   37 |
   38 |   test('1. Landing Page Loads Successfully', async () => {
   39 |     console.log('🔍 Testing: Landing page loads successfully...');
   40 |     
   41 |     // Navigate to homepage
   42 |     const response = await page.goto(`${BASE_URL}/`);
   43 |     
   44 |     // Check response status
   45 |     expect(response?.status()).toBe(200);
   46 |     
   47 |     // Wait for critical elements to load
   48 |     await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });
   49 |     
   50 |     // Check for critical sections
   51 |     await expect(page.locator('text=photonique')).toBeVisible();
   52 |     await expect(page.locator('text=get photonique now')).toBeVisible();
   53 |     
   54 |     console.log('✅ Landing page loads successfully');
   55 |   });
   56 |
   57 |   test('2. CTA Buttons Are Visible and Functional', async () => {
   58 |     console.log('🔍 Testing: CTA buttons visibility and functionality...');
   59 |     
   60 |     await page.goto(`${BASE_URL}/`);
   61 |     
   62 |     // Check main CTA button visibility
   63 |     const mainCTA = page.locator('text=get photonique now').first();
   64 |     await expect(mainCTA).toBeVisible();
   65 |     
   66 |     // Check button styling (should not be invisible)
   67 |     const buttonStyles = await mainCTA.evaluate(el => {
   68 |       const styles = window.getComputedStyle(el);
   69 |       return {
   70 |         backgroundColor: styles.backgroundColor,
   71 |         color: styles.color,
   72 |         visibility: styles.visibility,
   73 |         opacity: styles.opacity
   74 |       };
   75 |     });
   76 |     
   77 |     // Ensure button is not invisible
   78 |     expect(buttonStyles.visibility).not.toBe('hidden');
   79 |     expect(parseFloat(buttonStyles.opacity)).toBeGreaterThan(0.5);
   80 |     expect(buttonStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
   81 |     
   82 |     // Test CTA click functionality
   83 |     await mainCTA.click({ timeout: 5000 });
   84 |     
   85 |     // Should navigate to product page
   86 |     await expect(page).toHaveURL(new RegExp(`products/${PRODUCT_HANDLE}`));
   87 |     
   88 |     console.log('✅ CTA buttons are visible and functional');
   89 |   });
   90 |
   91 |   test('3. Product Page Backend Integration', async () => {
   92 |     console.log('🔍 Testing: Product page Shopify backend integration...');
   93 |     
   94 |     await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
   95 |     
   96 |     // Wait for product data to load
   97 |     await page.waitForLoadState('networkidle');
   98 |     
   99 |     // Check for essential product elements
  100 |     await expect(page.locator('[data-test="product-title"], h1')).toBeVisible({ timeout: 15000 });
  101 |     
  102 |     // Verify price is loaded from Shopify
  103 |     const priceElement = page.locator('text=/\\$\\d+/').first();
  104 |     await expect(priceElement).toBeVisible();
  105 |     
  106 |     // Check product options are loaded
  107 |     const colorOptions = page.locator('[aria-label*="Select"], button[title], .color-swatch');
  108 |     if (await colorOptions.count() > 0) {
  109 |       await expect(colorOptions.first()).toBeVisible();
  110 |     }
  111 |     
  112 |     // Verify product images load
  113 |     const productImages = page.locator('img[alt*="product"], img[src*="cdn.shopify"]');
  114 |     if (await productImages.count() > 0) {
  115 |       await expect(productImages.first()).toBeVisible();
  116 |     }
  117 |     
  118 |     console.log('✅ Product page backend integration working');
  119 |   });
  120 |
  121 |   test('4. Add to Cart Functionality - Critical Test', async () => {
  122 |     console.log('🔍 Testing: Add to cart functionality (CRITICAL)...');
  123 |     
  124 |     await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
  125 |     await page.waitForLoadState('networkidle');
  126 |     
  127 |     // Find and click add to cart button
  128 |     const addToCartButton = page.locator('[data-test="add-to-cart"], text=/add to cart/i, button:has-text("add")').first();
  129 |     
  130 |     // Wait for button to be available
> 131 |     await expect(addToCartButton).toBeVisible({ timeout: 10000 });
      |                                   ^ Error: expect.toBeVisible: Unexpected token "=" while parsing css selector "[data-test="add-to-cart"], text=/add to cart/i, button:has-text("add")". Did you mean to CSS.escape it?
  132 |     
  133 |     // Check if button is enabled (not sold out)
  134 |     const isDisabled = await addToCartButton.isDisabled();
  135 |     if (isDisabled) {
  136 |       console.warn('⚠️ Add to cart button is disabled - may be sold out');
  137 |       // Still continue test to check error handling
  138 |     }
  139 |     
  140 |     // Monitor network requests for cart mutations
  141 |     const cartRequests: any[] = [];
  142 |     page.on('request', request => {
  143 |       if (request.url().includes('cart') || request.method() === 'POST') {
  144 |         cartRequests.push({
  145 |           url: request.url(),
  146 |           method: request.method(),
  147 |           postData: request.postData()
  148 |         });
  149 |       }
  150 |     });
  151 |     
  152 |     // Click add to cart
  153 |     await addToCartButton.click();
  154 |     
  155 |     // Wait for potential loading states
  156 |     await page.waitForTimeout(2000);
  157 |     
  158 |     // Check for success indicators
  159 |     const successIndicators = [
  160 |       page.locator('text=/added to cart/i'),
  161 |       page.locator('text=/item added/i'),
  162 |       page.locator('[data-test="cart-count"]'),
  163 |       page.locator('.cart-indicator'),
  164 |       page.locator('text=/view cart/i')
  165 |     ];
  166 |     
  167 |     let foundSuccess = false;
  168 |     for (const indicator of successIndicators) {
  169 |       try {
  170 |         await indicator.waitFor({ timeout: 3000 });
  171 |         foundSuccess = true;
  172 |         break;
  173 |       } catch (e) {
  174 |         // Continue checking other indicators
  175 |       }
  176 |     }
  177 |     
  178 |     // Verify cart requests were made
  179 |     expect(cartRequests.length).toBeGreaterThan(0);
  180 |     
  181 |     if (!foundSuccess) {
  182 |       console.warn('⚠️ No clear success indicator found - checking cart state...');
  183 |       
  184 |       // Try to access cart to verify item was added
  185 |       await page.goto(`${BASE_URL}/cart`);
  186 |       const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item');
  187 |       
  188 |       if (await cartItems.count() > 0) {
  189 |         foundSuccess = true;
  190 |         console.log('✅ Item found in cart - add to cart working');
  191 |       }
  192 |     }
  193 |     
  194 |     expect(foundSuccess).toBe(true);
  195 |     console.log('✅ Add to cart functionality working');
  196 |   });
  197 |
  198 |   test('5. Cart Page Backend Integration', async () => {
  199 |     console.log('🔍 Testing: Cart page backend integration...');
  200 |     
  201 |     // First add an item to cart
  202 |     await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
  203 |     await page.waitForLoadState('networkidle');
  204 |     
  205 |     const addToCartButton = page.locator('[data-test="add-to-cart"], text=/add to cart/i').first();
  206 |     if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
  207 |       await addToCartButton.click();
  208 |       await page.waitForTimeout(2000);
  209 |     }
  210 |     
  211 |     // Navigate to cart
  212 |     await page.goto(`${BASE_URL}/cart`);
  213 |     await page.waitForLoadState('networkidle');
  214 |     
  215 |     // Check cart functionality
  216 |     const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item, [class*="cart"]');
  217 |     
  218 |     if (await cartItems.count() > 0) {
  219 |       // Test quantity update
  220 |       const quantityInput = page.locator('input[type="number"], .quantity-input').first();
  221 |       if (await quantityInput.isVisible()) {
  222 |         await quantityInput.fill('2');
  223 |         await page.waitForTimeout(1000);
  224 |       }
  225 |       
  226 |       // Test remove item
  227 |       const removeButton = page.locator('button:has-text("Remove"), button:has-text("Delete"), [aria-label*="remove"]').first();
  228 |       if (await removeButton.isVisible()) {
  229 |         await removeButton.click();
  230 |         await page.waitForTimeout(1000);
  231 |       }
```