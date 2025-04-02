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