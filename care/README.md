# care•atin (Hydrogen Storefront - Project `care`)

## 1. Project Overview

*   **Name:** `care•atin` (Codebase name: `care`)
*   **Type:** Custom Shopify Storefront ("Headless" Commerce)
*   **Framework:** Shopify Hydrogen (Latest Stable Version - e.g., 2024.x) with Remix
*   **Goal:** To create a visually rich, premium, and potentially animation-heavy custom e-commerce experience focused on red light therapy hair care devices. The aesthetic aims for a blend of Glossier's approachability and Apple's minimalism and premium feel. Integrates directly with the Shopify Storefront API for all e-commerce functionality (products, cart, checkout).
*   **Key Features:**
    *   Unique, branded landing page experience.
    *   Custom product detail pages (PDP).
    *   Custom collection pages (PLP).
    *   Seamless cart management.
    *   Integration with Shopify Checkout.
    *   (Optional) Customer accounts (login, order history).

## 2. Design Philosophy & Aesthetic ("Glossier meets Apple")

*   **Minimalism:** Clean layouts, generous whitespace, focus on essential elements.
*   **Typography:** Strong, legible, and potentially unique font choices that convey quality. Limited font variations.
*   **Imagery & Video:** High-quality, professional product photography and videography are crucial. Lifestyle shots should align with the brand's premium, caring image.
*   **Color Palette:** Likely muted, sophisticated colors with specific accent colors for calls-to-action.
*   **Animations & Interactions:** Subtle, smooth, and meaningful animations to enhance user experience without being distracting. Think fluid transitions, micro-interactions on buttons/forms, and potentially scroll-based animations for storytelling on the landing page. Performance is key.
*   **User Experience (UX):** Intuitive navigation, clear information hierarchy, frictionless checkout process.

## 3. Technology Stack

*   **Framework:** Shopify Hydrogen & Remix
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Recommended for utility-first approach, integrates well with Hydrogen)
*   **UI Components:** Custom React Components (Prioritize over generic libraries for unique look-and-feel)
*   **Animations:** Framer Motion (Recommended for complex, performant animations) or CSS Transitions/Animations (for simpler effects)
*   **State Management:** Remix Loaders/Actions + React Context/Zustand (for specific client-side needs)
*   **Testing:** Vitest (Unit/Integration), Playwright/Cypress (End-to-End)
*   **Linting/Formatting:** ESLint, Prettier

## 4. Project Structure (Recommended)

```
care/
├── app/                      # Core Remix application
│   ├── components/           # Reusable React components
│   │   ├── global/           # Header, Footer, Layout, SEO
│   │   ├── common/           # Buttons, Inputs, Modals, Icons
│   │   ├── sections/         # Larger page sections (Hero, Features, Testimonials)
│   │   ├── product/          # ProductCard, ProductGallery, ProductForm, Swatches
│   │   ├── cart/             # CartLineItem, CartSummary, MiniCart
│   │   └── account/          # LoginForm, OrderHistory, ProfileForm
│   ├── graphql/              # Storefront API GraphQL queries and mutations (or co-located)
│   ├── lib/                  # Utilities, helpers, constants, API clients
│   ├── routes/               # Application routes (pages and API endpoints)
│   │   ├── _index.tsx        # Homepage / Landing Page
│   │   ├── products.$handle.tsx # Product Detail Page (PDP)
│   │   ├── collections.$handle.tsx # Collection/Product Listing Page (PLP)
│   │   ├── cart.tsx          # Cart page
│   │   ├── api.cart.tsx      # API route for cart actions (add, remove, update)
│   │   ├── account._index.tsx # Account dashboard
│   │   ├── account.login.tsx # Login page
│   │   └── ...               # Other routes (search, policies, etc.)
│   ├── styles/               # Global styles, Tailwind CSS input
│   ├── entry.client.tsx      # Client-side entry point
│   ├── entry.server.tsx      # Server-side entry point (Hydrogen)
│   └── root.tsx              # Root layout, global context providers
├── public/                   # Static assets (images, fonts, favicon)
├── server.ts                 # Hydrogen server entry point
├── hydrogen.config.ts        # Hydrogen configuration (Shopify credentials)
├── remix.config.js           # Remix configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables (Shopify keys - DO NOT COMMIT)
└── README.md                 # This file
```

## 5. Best Practices

*   **Start with the CLI:** Use `npx @shopify/cli hydrogen init care` to ensure the correct boilerplate and latest stable dependencies.
*   **TypeScript:** Leverage TypeScript for type safety and improved developer experience.
*   **Component-Driven:** Build the UI from small, reusable, well-defined components. Use Storybook or similar to develop components in isolation.
*   **Styling Consistency:** Use Tailwind CSS with a `tailwind.config.js` that defines your brand's design tokens (colors, fonts, spacing) for consistency.
*   **Performant Animations:** Use `Framer Motion` or CSS transforms/opacity for smooth animations. Avoid animating properties that trigger layout reflows. Use intersection observers to trigger animations on scroll.
*   **Data Fetching:** Utilize Remix `loader` functions with Hydrogen's `storefront` client for efficient server-side data fetching. Co-locate GraphQL queries where possible or keep them organized in `/app/graphql`.
*   **Mutations:** Use Remix `action` functions for cart updates, form submissions, etc.
*   **State:** Rely on Remix's built-in state management first. Use client-side state libraries (Context, Zustand) sparingly for UI state not tied to server data.
*   **Image Optimization:** Use Hydrogen's `<Image>` component for automatic optimization and responsive images. Use modern formats (WebP, AVIF).
*   **Caching:** Leverage Hydrogen's caching strategies (`CacheSeconds()`, `CacheCustom()`) in loaders to optimize performance.
*   **SEO:** Implement dynamic meta tags (title, description, Open Graph) using Remix's `meta` export in each route. Ensure semantic HTML.
*   **Accessibility (a11y):** Build with accessibility in mind from the start (semantic HTML, ARIA attributes, keyboard navigation, color contrast). Test regularly.
*   **Environment Variables:** Store Shopify API keys and other secrets in a `.env` file (added to `.gitignore`) and access them via `hydrogen.config.ts`.
*   **Error Handling:** Implement robust error boundaries in Remix (`ErrorBoundary`) for graceful failure modes.

## 6. Setup & Development

1.  **Prerequisites:**
    *   Node.js (Check Hydrogen docs for required version, usually latest LTS)
    *   `pnpm` (Recommended), `npm`, or `yarn`
2.  **Clone Repository:**
    ```bash
    git clone <your-repo-url>
    cd care
    ```
3.  **Install Dependencies:**
    ```bash
    pnpm install
    # or npm install / yarn install
    ```
4.  **Environment Variables:**
    *   Create a `.env` file in the project root.
    *   Add your Shopify Storefront API credentials:
        ```dotenv
        # .env
        PUBLIC_STOREFRONT_API_TOKEN=<your_public_storefront_api_token>
        PUBLIC_STORE_DOMAIN=<your_shopify_store_domain.myshopify.com>
        # Optional: Add private token if needed for specific admin tasks (use with caution)
        # PRIVATE_STOREFRONT_API_TOKEN=<your_private_storefront_api_token>
        ```
    *   Get these from your Shopify Admin under **Apps and sales channels** -> **Develop apps** -> **Create an app**. Ensure necessary Storefront API scopes (e.g., `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`) are granted.
5.  **Run Development Server:**
```bash
    pnpm dev
    # or npm run dev / yarn dev
    ```
    *   Access the store at `http://localhost:3000`.

## 7. Deployment

*   **Shopify Oxygen:** Shopify's recommended hosting platform for Hydrogen storefronts (provides global edge deployment, integrates seamlessly).
*   **Other Platforms:** Vercel, Netlify, Cloudflare Workers, or any platform supporting Node.js/Remix applications. Configure server environments accordingly.

# care•atin Landing Page UI/UX Brainstorm: "Effortless Science"

**Core Concept:** Projecting effortless beauty and wellness backed by credible, advanced red light science. The vibe is "off-duty model meets brilliant scientist" – approachable yet authoritative, beautiful yet effective. It combines Glossier's aspirational-but-relatable feel with Apple's clean, premium, tech-forward presentation.

**Guiding Principles:**

1.  **Clarity & Confidence:** The science is complex, but the presentation must be simple, clear, and confident. Avoid jargon where possible; when used, explain it effortlessly. (Apple influence)
2.  **Aesthetic Minimalism:** Clean layouts, generous whitespace, focus on high-quality visuals and typography. Every element serves a purpose. (Apple influence)
3.  **Subtle Glow:** Red light is the core technology, but visually it should be an accent – a subtle glow, a gradient, a highlight – not overwhelming. Think sophisticated, not clinical or alarming.
4.  **Authentic Beauty:** Showcase health, wellness, and natural beauty. Imagery should feel relatable, aspirational yet achievable. Focus on the *results* (healthy hair) and the *feeling* (confidence, ease). (Glossier influence)
5.  **Intuitive Flow:** Guide the user logically from understanding the core benefit to seeing the proof and understanding the product, leading naturally to a call-to-action.

**I. Visual Language**

*   **Color Palette:**
    *   **Primary Background (`contrast`):** Very soft, warm off-white or a light, muted beige/blush. (Feels softer than stark white).
    *   **Primary Text (`primary`):** A deep, slightly warm charcoal or dark gray instead of pure black. (Softer, more premium feel).
    *   **Brand Accent (`brand`):** A very subtle, desaturated blush pink or peach tone. Used sparingly for background tints, subtle highlights, or potentially icons.
    *   **CTA/Highlight (`accent`):** Primarily the deep charcoal/gray (`primary`) for buttons/links for a sophisticated, minimal look. *Alternatively*, a very specific, non-aggressive, deep red or burgundy could be tested for primary CTAs, tying back to the red light theme *very cautiously*.
    *   **Red Light Accent:** Used *only* as subtle gradients, glows on hover states, thin dividing lines, or perhaps integrated into abstract background graphics. It should *suggest* the technology, not dominate. Maybe a linear gradient transitioning from the brand accent to a soft red?
*   **Typography:**
    *   **Headings:** A clean, modern, slightly geometric sans-serif with excellent legibility (e.g., Inter, SF Pro Display, Manrope, or a premium equivalent). Confident and clear.
    *   **Body Text:** The same sans-serif, or a complementary one with slightly more warmth/character but still highly readable. Ensure generous line spacing (`leading-relaxed` or `leading-loose`).
    *   **Hierarchy:** Strong visual hierarchy through font size, weight (use a good range like regular, medium, bold/semibold), and color (primary, primary/80, primary/60).
*   **Imagery & Videography:**
    *   **Style:** High-quality, natural lighting, soft focus where appropriate. Feels authentic and "captured," not overly staged.
    *   **Models:** Diverse, relatable individuals embodying "effortless wellness." Focus on healthy, natural-looking hair. Minimal makeup. Show the device being used easily in a calm, beautiful home setting.
    *   **Product Shots:** Clean, crisp, Apple-esque shots of the device itself, possibly showing details, materials, and build quality. Consider exploded views or subtle animations highlighting key tech components if feasible.
    *   **Video:** Essential for the Hero section. Show the device in use, the light effect (subtly), and the user feeling relaxed/confident. Short, looping background videos could work.

**II. Layout & Structure**

*   **Whitespace:** Generous use of padding and margins around sections and elements. Let content breathe.
*   **Grid:** Primarily a single-column focused layout for clarity, especially for text-heavy sections. Use subtle grid variations (e.g., two columns for product features) where it enhances clarity without adding clutter. Avoid busy layouts.
*   **Flow:**
    1.  **Hero:** Immediate hook – value proposition + aspirational visual.
    2.  **Problem/Solution (Implicit):** Briefly touch upon common hair concerns the device addresses.
    3.  **Key Benefits:** Icon-driven, concise, benefit-oriented language.
    4.  **Featured Product:** Clear visuals, key features, simple CTA.
    5.  **How It Works (Science Simplified):** Clean diagrams/steps, authoritative but easy-to-digest explanation. Link to more detail.
    6.  **Effortless Routine:** Show how easily it integrates into life (visuals/short steps).
    7.  **Social Proof (Testimonials):** Authentic quotes, ideally with user photos.
    8.  **Final CTA / Product Recap:** Clear call to purchase or learn more.
*   **Responsiveness:** Flawless mobile experience is paramount. Ensure typography scales well and layouts adapt cleanly.

**III. Section-Specific UI/UX Ideas**

*   **Hero:**
    *   **Visual:** Full-bleed background video or high-res image (model using device, subtle light glow).
    *   **Text:** Minimal text overlay. Strong, concise headline (e.g., "Hair Wellness. Illuminated."). Short descriptive paragraph.
    *   **CTA:** Clean button, potentially using the `primary` color text on a `contrast` background with a border, or the cautious deep red. Subtle hover animation (maybe a soft red glow outline?).
*   **Key Benefits:**
    *   **Layout:** 3-4 columns.
    *   **Visuals:** Custom, minimal outline icons using `primary` color or the `brand` accent color.
    *   **Text:** Short title + 1-sentence description per benefit.
*   **Featured Product:**
    *   **Layout:** Two columns (image | text+CTA).
    *   **Visuals:** High-quality product shot, maybe a carousel or interactive view.
    *   **CTA:** Clear "Shop Now" or "Learn More" button (consistent style).
*   **How It Works:**
    *   **Layout:** Numbered steps or alternating image/text blocks.
    *   **Visuals:** Clean line-art diagrams or subtle animations showing light penetration/cellular effect. Use brand/accent colors sparingly.
    *   **Text:** Simple, direct language. "1. Target.", "2. Activate.", "3. Revitalize." followed by brief explanations.
*   **Effortless Routine:**
    *   **Visual:** Lifestyle photos/short video clips showing use during different activities (reading, relaxing).
    *   **Text:** Very short steps (e.g., "1. Place.", "2. Relax (10 min).", "3. Glow.").
*   **Testimonials:**
    *   **Layout:** Card-based grid or slider.
    *   **Visuals:** User photos if possible (adds authenticity). Clean quote formatting.
    *   **Text:** Highlight key phrases from the quote. Author name + location.

**IV. Interactivity & Animation**

*   **Keep it Subtle:** Animations should enhance the feeling of premium quality and smoothness, not distract.
*   **Examples:**
    *   Smooth page scrolling.
    *   Subtle fade-in reveals for sections/elements as they scroll into view.
    *   Micro-interactions on buttons/links (e.g., scale change, soft background color transition, the subtle red glow?).
    *   *Maybe* a very subtle parallax effect on background images if performance allows.
    *   Interactive product views (360 spin).

**V. Tone of Voice**

*   **Confident & Calm:** Reassuring, knowledgeable about the science.
*   **Aspirational & Approachable:** Speaks to the desire for effortless beauty and wellness.
*   **Benefit-Oriented:** Focuses on the results and feeling.
*   **Clear & Concise:** Avoids overly technical or fluffy marketing language.

**Next Steps:**

1.  **Refine Palette/Fonts:** Finalize specific hex codes/font names.
2.  **Component Styling:** Start applying these principles more concretely to the existing components, focusing on spacing, typography, and color updates first.
3.  **Add Visuals:** Integrate placeholder or actual images/videos.
4.  **Implement Animations:** Layer in subtle animations.
