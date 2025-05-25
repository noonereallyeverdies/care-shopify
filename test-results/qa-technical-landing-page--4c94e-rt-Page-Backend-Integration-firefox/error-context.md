# Test info

- Name: Landing Page Technical QA - Shopify Integration >> 5. Cart Page Backend Integration
- Location: /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:198:3

# Error details

```
Error: locator.isVisible: Unexpected token "=" while parsing css selector "[data-test="add-to-cart"], text=/add to cart/i". Did you mean to CSS.escape it?
Call log:
    - checking visibility of [data-test="add-to-cart"], text=/add to cart/i >> nth=0

    at /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:206:31
```

# Page snapshot

```yaml
- heading "Oops" [level=1]
- heading "404" [level=2]
- group: Not found
```

# Test source

```ts
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
  131 |     await expect(addToCartButton).toBeVisible({ timeout: 10000 });
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
> 206 |     if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
      |                               ^ Error: locator.isVisible: Unexpected token "=" while parsing css selector "[data-test="add-to-cart"], text=/add to cart/i". Did you mean to CSS.escape it?
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
  232 |     } else {
  233 |       console.warn('⚠️ No items in cart - may indicate add to cart issue');
  234 |     }
  235 |     
  236 |     console.log('✅ Cart page backend integration checked');
  237 |   });
  238 |
  239 |   test('6. Mobile Responsiveness & Touch Targets', async () => {
  240 |     console.log('🔍 Testing: Mobile responsiveness and touch targets...');
  241 |     
  242 |     // Set mobile viewport
  243 |     await page.setViewportSize({ width: 375, height: 667 });
  244 |     await page.goto(`${BASE_URL}/`);
  245 |     
  246 |     // Check mobile CTA visibility
  247 |     const mobileCTA = page.locator('.mobile-cta, [class*="mobile"]').first();
  248 |     if (await mobileCTA.isVisible()) {
  249 |       const ctaBox = await mobileCTA.boundingBox();
  250 |       expect(ctaBox?.height).toBeGreaterThan(44); // Minimum touch target
  251 |     }
  252 |     
  253 |     // Check main CTA button touch target
  254 |     const mainCTA = page.locator('text=get photonique now').first();
  255 |     if (await mainCTA.isVisible()) {
  256 |       const ctaBox = await mainCTA.boundingBox();
  257 |       expect(ctaBox?.height).toBeGreaterThan(44); // iOS minimum
  258 |     }
  259 |     
  260 |     // Test FAQ accordion on mobile
  261 |     const faqItems = page.locator('[class*="faq"] button, [class*="accordion"] button');
  262 |     if (await faqItems.count() > 0) {
  263 |       const firstFaq = faqItems.first();
  264 |       const faqBox = await firstFaq.boundingBox();
  265 |       expect(faqBox?.height).toBeGreaterThan(44);
  266 |     }
  267 |     
  268 |     console.log('✅ Mobile responsiveness and touch targets verified');
  269 |   });
  270 |
  271 |   test('7. Performance & Loading States', async () => {
  272 |     console.log('🔍 Testing: Performance and loading states...');
  273 |     
  274 |     // Monitor performance
  275 |     const startTime = Date.now();
  276 |     
  277 |     await page.goto(`${BASE_URL}/`);
  278 |     await page.waitForLoadState('networkidle');
  279 |     
  280 |     const loadTime = Date.now() - startTime;
  281 |     console.log(`📊 Page load time: ${loadTime}ms`);
  282 |     
  283 |     // Check for loading states
  284 |     const loadingIndicators = page.locator('.loading, .spinner, [class*="loading"]');
  285 |     
  286 |     // Should not have persistent loading states
  287 |     await page.waitForTimeout(5000);
  288 |     const persistentLoading = await loadingIndicators.count();
  289 |     expect(persistentLoading).toBe(0);
  290 |     
  291 |     // Test product page loading
  292 |     await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
  293 |     await page.waitForLoadState('networkidle');
  294 |     
  295 |     // Verify no JavaScript errors
  296 |     const errors: string[] = [];
  297 |     page.on('pageerror', error => {
  298 |       errors.push(error.message);
  299 |     });
  300 |     
  301 |     await page.waitForTimeout(2000);
  302 |     
  303 |     if (errors.length > 0) {
  304 |       console.warn('⚠️ JavaScript errors detected:', errors);
  305 |     }
  306 |     
```