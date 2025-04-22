## OMI Wellbeauty - Website Analysis for Inspiration (Developer Focused)

**URL:** https://omiwellbeauty.com/

**Overall Platform:** Shopify (Confirmed by numerous `shopify.com` URLs, Liquid object variables like `Shopify.shop`, `Shopify.theme`, section/block structure, `storefrontAccessToken`, etc.)

---

**1. Technology Stack & Key Libraries:**

*   **Platform:** Shopify
*   **Frontend Framework/Library:** Likely vanilla JS enhanced with libraries, possibly within Shopify's Liquid templating system. No major JS framework like React/Vue/Angular immediately apparent in the core structure (though Shopify apps might use them internally).
*   **CSS:** Primarily uses compiled theme CSS (`compiled_assets/styles.css`, `primary-min.css`, `cart-min.css`). Leverages CSS variables (`:root`) extensively for theming (colors, fonts, spacing) - *Good Practice*.
*   **JavaScript Libraries:**
    *   **GlideJS (`glide.min.js`, `glide.core.min.css`):** Used for sliders/carousels (e.g., announcement bar, likely others).
    *   **Lenis (`lenis.min.js`):** Used for smooth scrolling effects. *Note: Custom JS detected to disable Lenis on older iOS versions (<=14) due to potential compatibility issues.*
    *   **jQuery:** Potentially used by Shopify or apps (implied by `trekkie` setup script).
    *   **Shopify Analytics (Trekkie):** Shopify's native analytics library.
    *   **Shopify Web Pixels Manager:** Centralized script for managing tracking pixels (Facebook, Google Analytics/Ads, etc.).

---

**2. Visual Design & UI Elements:**

*   **Typography:**
    *   **Headings:** Uses a custom font: `'Feature Display Web'`. Weights loaded: 300 (Light) and 400 (Regular), including italics. Hosted on Shopify CDN. Font files include `woff2`, `woff`, `ttf` for compatibility. *Note: Preloaded for performance.*
    *   **Body:** Uses Google Font: `'Manrope'`, variable font with weights 200-800. Loaded via Google Fonts API.
    *   **CSS Variables:** `--font-heading-family`, `--font-body-family`, weights, etc., defined in `:root` for consistency.
*   **Color Palette:** Defined using CSS variables in `:root`.
    *   `--primary-color: #1a1a1a` (Dark grey/black)
    *   `--primary-color-light: #9A92B6` (Muted purple)
    *   `--primary-color-light2: #7E7796` (Darker muted purple)
    *   `--secondary-color: #f4b4a4` (Peach/Pink)
    *   `--secondary-color-dark: #D58774` (Darker peach/pink)
    *   `--background: #fffcf8` (Off-white/Cream)
    *   `--background-dark: #F2EAE1` (Darker cream/beige)
*   **Layout & Spacing:**
    *   Uses CSS variables (`--section-spacing: 120px`) for consistent vertical rhythm between sections.
    *   Likely uses a standard container approach (`container-fluid lg`, `container-fluid md`) for different content widths.
    *   Leverages CSS Flexbox/Grid for component layouts (implied by section structure like `col-50`, `flex-wpr`).
*   **Key UI Components Noted:**
    *   Sticky, initially transparent header (`header-wpr transparent make-sticky`).
    *   Video hero background.
    *   Infinite scrolling logo marquee (`loop-wpr`).
    *   Image parallax sections (`multi-image-parallax`).
    *   Before/After image comparison slider (`before-after-slider-tabs`).
    *   Accordion FAQ (`faq-item`, `faq-question`, `faq-answer`).
    *   Predictive Search modal (`<details-modal>`, `<predictive-search>`).

---

**3. Assets & Performance:**

*   **Fonts:**
    *   Key custom font (`FeatureDisplayWeb`) is preloaded (`rel="preload" as="font"`).
    *   Uses `font-display: swap;` for better perceived performance during font loading.
*   **Images:**
    *   Hosted on Shopify CDN (`cdn.shopify.com`).
    *   Uses `loading="lazy"` attribute on many images.
    *   Provides `srcset` for responsive images (good practice).
    *   Uses modern formats like `.webp` where seen.
*   **Video:** Uses HTML5 `<video>` tag for hero background, providing different sources for desktop/mobile (though URLs are the same here) and a `poster` image. Autoplay, muted, loop attributes set.
*   **CSS/JS Loading:**
    *   Key CSS/JS preloaded.
    *   Many non-critical third-party scripts are loaded asynchronously (`async`) or deferred (`defer`), or loaded via a custom `asyncLoad` function triggered by `window.addEventListener('load', ...)`. This prevents render blocking.
    *   Shopify performance kit (`shopify-perf-kit`) is included.

---

**4. Third-Party Integrations & Shopify Apps:**

*   **Analytics/Tracking:**
    *   Google Tag Manager (`GTM-592XXLNQ`)
    *   Shopify Analytics (Trekkie)
    *   Shopify Web Pixels Manager (integrating multiple pixels: Saasler?, Optimizely?, Google, Facebook)
*   **Marketing & CRM:**
    *   Klaviyo (Email Marketing, Onsite JS for popups/forms, Back in Stock notifications)
*   **Reviews:** Okendo (`oke-reviews-settings`, Okendo scripts/styles)
*   **Subscriptions:** Recharge (`static.rechargecdn.com/.../widget.min.js`)
*   **Personalization/Upsells:** Rebuy (`cdn.rebuyengine.com`, `rebuy-cart`, `data-rebuy-id`)
*   **Store Locator:** Likely Amasty (`amaicdn.com/storelocator-prod/`)
*   **Product Quiz:** Custom or third-party (`pc-quiz.s3.us-east-2.amazonaws.com/.../quiz-loader.min.js`)
*   **Instagram Feed:** Likely NFCube (`cdn.nfcube.com/instafeed...`)
*   **Fraud Prevention:** Kount (`api.kount.com`)
*   **Cookie Consent:** OneTrust (`cdn.cookielaw.org/scripttemplates/otSDKStub.js`)
*   **Accessibility:** AccessiBe (`acsbapp.com`)

---

**5. SEO & Metadata:**

*   **Title Tag:** Well-defined (`OMI Wellbeauty | Hair Growth Peptides | Naomi Whittel`).
*   **Meta Description:** Present and informative.
*   **Canonical URL:** Set correctly.
*   **Open Graph & Twitter Cards:** Properly configured for social sharing.
*   **Schema Markup:** Includes basic `WebSite` schema with `SearchAction`. (Likely more schema on product/article pages).
*   **Favicons:** Comprehensive set provided (png, svg, ico, apple-touch-icon, manifest).

---

**6. Accessibility:**

*   Uses the AccessiBe widget (`acsbapp.com`). *Developer Note: The effectiveness and practices of overlay widgets like AccessiBe are debated within the accessibility community.*
*   Some semantic elements observed (e.g., `<nav>`, `<main>`, `<footer>`), but a deeper dive would be needed to fully assess semantic HTML usage.
*   ARIA attributes (`aria-label`, `aria-expanded`, `role`, etc.) are used, particularly in interactive components like FAQs, search modal, and sliders.

---

**Developer Takeaways & Inspiration Points:**

*   **Solid Shopify Foundation:** Leverages Shopify's CDN, sections, and Liquid framework.
*   **Performance Focus:** Preloading critical assets (fonts), lazy loading images, async/defer JS loading are good practices to emulate.
*   **CSS Variables:** Excellent use of CSS variables for maintainable and consistent theming (colors, fonts, spacing).
*   **Smooth Scroll:** Use of Lenis adds a premium feel, but requires compatibility checks (like the iOS check they implemented).
*   **Custom Fonts:** Use of a distinct display font ('Feature Display Web') paired with a clean sans-serif ('Manrope') creates a strong brand identity.
*   **Rich Interactions:** Incorporates common e-commerce UI patterns like video backgrounds, carousels (GlideJS), parallax, comparison sliders, and accordions.
*   **App Ecosystem:** Utilizes a wide range of common Shopify apps for reviews (Okendo), subscriptions (Recharge), personalization (Rebuy), marketing (Klaviyo), and more. Understanding which apps achieve certain functionalities is key.
*   **Accessibility Overlay:** They've chosen an overlay widget approach (AccessiBe).
*   **Mobile Compatibility:** Explicitly handles older iOS versions, indicating attention to cross-browser/device testing. 