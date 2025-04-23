# Visual Components & Features Checklist (Omiwell -> Care-atin)

This checklist tracks the implementation of visually significant components and features identified during the analysis of the Omiwell site code, intended for adaptation onto the Care-atin landing page.

## Core UI Elements & Styling

-   [x] **Consistent Card Styling:** Apply a unified `.content-card` style (or similar) to sections like Benefits, Testimonials, Science Hub, etc.
-   [x] **Color Palette Refinement:** Align Care-atin's color scheme more closely with Omiwell's palette where appropriate.
-   [x] **Typography Consistency:** Ensure consistent use of base font styles (Cormorant Infant/Manrope) across sections.
-   [x] **Section Spacing & Layout:** Standardize vertical spacing and padding between sections.
-   [x] **Button Styling:** Unify button appearance across the page.
-   [x] **Tabbed Content Implementation:** Added `TabbedContent` component to homepage.
-   [ ] **Footer Simplification:** Refine the footer layout and styling.

## Interactive Components

-   [x] **Hero Section Simplification:** Remove complex animations/motion from the Hero section, potentially simplifying layout.
-   [ ] **Carousels/Sliders:**
    -   [ ] Implement Product Carousels (e.g., for featured products, cross-sells). Consider libraries like Swiper.js or Keen Slider. // Deferred - Requires multi-product/image data
    -   [x] Implement Testimonial Carousel/Slider.
    -   [x] Implement Logo Marquee/Carousel (for social proof).
    -   [x] Implement "Flip" Style Card Slider (from primary_minjs2.md).
-   [ ] **Modals/Popups:** (Implemented basic info modal example)
    -   [x] Implement a base modal system (React state + dialog component).
    -   [ ] Consider modals for Quick View, special offers, or informational popups. (Base usage shown)
-   [x] **Transitions & Animations:** (Added basic scroll-triggered effects)
    -   [x] Add subtle transitions on hover/focus states.
    -   [x] Implement entry/scroll-based animations (Fade-in for sections).
    -   [x] Add scroll-triggered text fade-in/line-by-line animation (from primary_minjs.md).
    -   [x] Add scroll-triggered image/card fade-in/slide-in animation (from primary_minjs.md, primary_minjs2.md).
    -   [x] Implement animated percentage counters on scroll (from primary_minjs.md).
    -   [x] Add subtle image parallax effect on scroll (from primary_minjs2.md).
-   [x] **Navigation/Header:** Ensure consistency and simplicity.
    -   [x] Implement scroll-based header transparency toggle (from primary_minjs.md).
-   [x] **Before/After Sliders:** Implement draggable handle image comparison slider (library added, placeholders used).
-   [x] **Accordions/FAQ:** Implement expandable/collapsible sections (from primary_minjs.md).
-   [x] **Tabbed Content:** Implement interface for switching content via tabs (from primary_minjs.md).
-   [ ] **Advanced Scroll Interactions:** Consider adapting complex scroll-driven animations like the timeline or large before/after progress if suitable (from primary_minjs2.md).

## Product Display & E-commerce Features

-   [x] **Color/Size Swatches:** Implement visual swatches for product variants if applicable.
-   [x] **Price/Currency Formatting:** Ensure consistent and clear display of prices (using <Money> component).
-   [x] **Dynamic Template/Component Loading:** Use Remix conventions for loading components efficiently. (Acknowledged Remix usage)
-   [ ] **"Visible in 90 days" Visualization:** Recreate or adapt this specific visual element if deemed important (requires identifying its implementation first).

## Section-Specific Simplification/Refinement

-   [ ] **Testimonials:** Ensure grid layout and card styling are consistent. Remove motion. (Done)
-   [ ] **Founders Vision:** Simplify layout, remove animations. (Done)
-   [ ] **Social Proof Logos:** Simplify structure, remove motion. (Done)
-   [ ] **Benefits/Features (GlowingBenefits):** Simplify grid, remove motion, apply card style. [x] (Done)
-   [ ] **Science Hub:** Simplify grid, remove motion, apply card style, simplify link. (In Progress/Next) 

## Potential New Sections (Omiwell Inspired)

-   [x] **Detailed Product Feature Section:** Dedicated section for main product details, features, benefits, imagery/video, ATC. // Implemented as static FeaturedProduct section
-   [ ] **"How It Works" / Visual Process:** Graphical step-by-step explanation (diagrams/animations) of the 3-in-1 process.
-   [ ] **Ingredient / Key Technology Spotlight:** Section focusing on a hero ingredient (e.g., IFP Hair Growth Peptide™) or core technology.
-   [ ] **User-Generated Content (UGC) / Social Feed:** Embed or gallery of real-world user photos/videos.
-   [ ] **Comparison Section:** Visually compare Care-atin to traditional methods or competitors.
-   [ ] **Bundles / Special Offers Section:** Highlight specific deals or product combinations. 