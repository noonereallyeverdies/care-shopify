# Test info

- Name: Landing Page Technical QA - Shopify Integration >> 1. Landing Page Loads Successfully
- Location: /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:38:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('h1, h2') resolved to 10 elements:
    1) <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-thin mb-6 md:mb-8 tracking-[0.08em] md:tracking-[0.1em] lowercase text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">professional results. 10 mins at home.</h1> aka getByRole('heading', { name: 'professional results. 10 mins' })
    2) <h2 class="text-3xl md:text-4xl font-serif font-thin text-neutral-900 mb-6 lowercase tracking-widest ">3-in-1 technology that keeps up.</h2> aka getByRole('heading', { name: '-in-1 technology that keeps up.' })
    3) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-800 mb-6">3-in-1 engineering. designed for life.</h2> aka getByRole('heading', { name: '3-in-1 engineering. designed' })
    4) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-6">3-in-1 technology</h2> aka getByRole('heading', { name: '3-in-1 technology', exact: true })
    5) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-800 mb-6">your 12-week transformation</h2> aka getByRole('heading', { name: 'your 12-week transformation' })
    6) <h2 class="text-3xl md:text-4xl font-serif font-light text-neutral-900 mb-6 mx-auto text-center">proof</h2> aka getByRole('heading', { name: 'proof' })
    7) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-4">real people, real results</h2> aka getByRole('heading', { name: 'real people, real results' })
    8) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-6">questions? we have answers</h2> aka getByRole('heading', { name: 'questions? we have answers' })
    9) <h2 class="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-4">your transformation starts now</h2> aka getByRole('heading', { name: 'your transformation starts now' })
    10) <h2 class="text-5xl font-bold text-white">…</h2> aka getByRole('heading', { name: 'care•atin' })

Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for locator('h1, h2')

    at /Users/yvonne/Desktop/care/new-hydrogen-app/tests/qa-technical-landing-page.spec.ts:48:42
```

# Page snapshot

```yaml
- banner:
  - link "care•atin":
    - /url: /
  - navigation:
    - link "shop":
      - /url: /collections/all
    - link "the science":
      - /url: /pages/science
    - link "our story":
      - /url: /pages/our-story
    - link "hair quiz":
      - /url: /pages/hair-quiz
    - link "journal":
      - /url: /journal
  - button "Cart (0 items)":
    - img
- main:
  - heading "professional results. 10 mins at home." [level=1]
  - paragraph: the 3-in-1 hair confidence device forward thinkers choose for effortless transformation
  - paragraph: precision 650nm + 850nm light. targeted oil delivery. therapeutic massage. naturally fuller hair. medical-grade triple-wavelength vs. single-function devices
  - text: 87% thicker hair (8 wks) pays for itself in <2 weeks chosen by 25,000+ professionals
  - link "get photonique":
    - /url: /products/photonique-touch
  - paragraph: $89 $129 after initial launch
  - paragraph: "exclusive launch: 347 of 500 remaining"
  - text: Discover More
  - heading "3-in-1 technology that keeps up." [level=2]
  - paragraph: your routine, elevated.
  - heading "triple-action results" [level=3]
  - paragraph: therapeutic scalp massage stimulates circulation. dual-wavelength light (650nm + 850nm) activates follicles. precision oil delivery nourishes at the root. 87% saw thicker hair in 8 weeks.
  - heading "fits your life" [level=3]
  - paragraph: 10 mins. 3x weekly. morning coffee. evening skincare. seamlessly integrate clinical-grade hair technology into your day.
  - heading "effortless, natural fullness" [level=3]
  - paragraph: your hair, authentically better. promotes natural growth cycle. no harsh chemicals. just healthier, naturally full hair that looks effortlessly polished.
  - paragraph: loading...
  - paragraph: loading...
  - paragraph: loading...
  - paragraph: loading...
  - paragraph: loading...
- contentinfo:
  - heading "care•atin" [level=2]
  - paragraph: designed in california. where beauty meets care.
  - heading "about us" [level=3]
  - list:
    - listitem:
      - link "our story":
        - /url: /pages/our-story
    - listitem:
      - link "the science":
        - /url: /pages/science
    - listitem:
      - link "philanthropy":
        - /url: /pages/philanthropy
    - listitem:
      - link "intellectual property":
        - /url: /pages/intellectual-property
    - listitem:
      - link "blog":
        - /url: /blogs/news
    - listitem:
      - link "faq":
        - /url: /pages/faq
  - heading "connect" [level=3]
  - list:
    - listitem:
      - link "contact us":
        - /url: /pages/contact
    - listitem:
      - link "ambassador program":
        - /url: /pages/ambassador-program
    - listitem:
      - link "student discount":
        - /url: /pages/student-discount
    - listitem:
      - link "press kit":
        - /url: /pages/press-kit
    - listitem:
      - link "affiliate program":
        - /url: /pages/affiliate-program
    - listitem:
      - link "wholesale":
        - /url: /pages/wholesale
  - heading "policies" [level=3]
  - list:
    - listitem:
      - link "terms of service":
        - /url: /policies/terms-of-service
    - listitem:
      - link "privacy policy":
        - /url: /policies/privacy-policy
    - listitem:
      - link "shipping policy":
        - /url: /policies/shipping-policy
    - listitem:
      - link "refund policy":
        - /url: /policies/refund-policy
    - listitem:
      - link "warranty":
        - /url: /pages/warranty
  - heading "support" [level=3]
  - list:
    - listitem:
      - link "returns":
        - /url: /pages/returns
  - heading "your email address" [level=3]
  - text: your email address
  - textbox "your email address"
  - button "Subscribe to newsletter"
  - paragraph: by subscribing, you agree to our privacy policy
  - heading "follow us" [level=4]
  - link "Instagram":
    - /url: https://instagram.com
  - link "Facebook":
    - /url: https://facebook.com
  - link "Twitter":
    - /url: https://twitter.com
  - link "Youtube":
    - /url: https://youtube.com
  - paragraph: protected by patents globally to provide the best red light therapy technology for hair growth and scalp health.
  - paragraph: these statements have not been evaluated by the food and drug administration. this product is not intended to diagnose, treat, cure, or prevent any disease. results may vary.
  - link "privacy policy":
    - /url: /policies/privacy-policy
  - link "terms of service":
    - /url: /policies/terms-of-service
  - link "shipping policy":
    - /url: /policies/shipping-policy
  - link "refund policy":
    - /url: /policies/refund-policy
  - link "warranty":
    - /url: /pages/warranty
  - link "accessibility":
    - /url: /pages/accessibility-statement
  - link "do not sell or share my personal information":
    - /url: /pages/do-not-sell
  - link "consumer health data privacy policy":
    - /url: /pages/consumer-health-data-policy
  - paragraph: © 2025 care•atin. all rights reserved.
```

# Test source

```ts
   1 | import { test, expect, type Page, type BrowserContext } from '@playwright/test';
   2 |
   3 | // Test configuration
   4 | const BASE_URL = 'http://localhost:4002'; // Adjust based on your dev server
   5 | const PRODUCT_HANDLE = 'photonique-touch'; // Your main product handle
   6 |
   7 | // Critical landing page technical QA test suite
   8 | test.describe('Landing Page Technical QA - Shopify Integration', () => {
   9 |   let page: Page;
   10 |   let context: BrowserContext;
   11 |
   12 |   test.beforeEach(async ({ browser }) => {
   13 |     // Create isolated context for each test
   14 |     context = await browser.newContext({
   15 |       viewport: { width: 1280, height: 720 },
   16 |       // Simulate real user agent
   17 |       userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
   18 |     });
   19 |     page = await context.newPage();
   20 |     
   21 |     // Monitor console errors
   22 |     page.on('console', msg => {
   23 |       if (msg.type() === 'error') {
   24 |         console.error('Console Error:', msg.text());
   25 |       }
   26 |     });
   27 |     
   28 |     // Monitor network failures
   29 |     page.on('requestfailed', request => {
   30 |       console.error('Request Failed:', request.url(), request.failure()?.errorText);
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
>  48 |     await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });
      |                                          ^ Error: expect.toBeVisible: Error: strict mode violation: locator('h1, h2') resolved to 10 elements:
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
```