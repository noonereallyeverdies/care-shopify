## UI/UX Checklist for `care/app` Inspired by OMI Wellbeauty

This checklist outlines potential UI/UX improvements for the `care/app` project, drawing inspiration from the OMI Wellbeauty website analysis.

**1. Typography:**

*   [ ] **Review Font Pairing:** Evaluate current heading/body font pairing (`Feature Display Web` / `Manrope` on OMI). Consider if our current pair achieves a similar premium, trustworthy feel.
*   [ ] **Refine Weights & Hierarchy:** Ensure clear visual hierarchy using font weights, sizes, and line heights, similar to OMI's structure.
*   [ ] **Consistency:** Verify consistent application of heading (H1-H6) and body text styles across the site.

**2. Color Palette & Usage:**

*   [ ] **Define/Refine Palette:** Solidify a sophisticated palette using soft neutrals, a primary dark text color, and 1-2 strategic accent colors (like OMI's `#fffcf8`, `#1a1a1a`, `#f4b4a4`, `#9A92B6`).
*   [ ] **Strategic Application:** Use accent colors purposefully for CTAs and highlights. Use subtle background variations (`#F2EAE1` on OMI) for section differentiation.
*   [ ] **CSS Variables:** Ensure colors are defined using CSS variables (like `:root` on OMI) for easy maintenance.

**3. Layout & Spacing:**

*   [ ] **Implement Consistent Spacing:** Establish or verify a consistent spacing system (e.g., `rem` or `px` multiples) for margins and padding across all sections and components.
*   [ ] **Generous Whitespace:** Ensure ample whitespace to improve readability and create a premium feel. Review OMI's `--section-spacing: 120px`.
*   [ ] **Container Strategy:** Use clear container widths (`max-w-5xl`, etc.) for main content areas to maintain focus, similar to OMI's `container-fluid lg/md`.

**4. Imagery & Videography:**

*   [ ] **Assess Asset Quality:** Ensure product and lifestyle imagery/video is high-resolution, well-lit, and professionally executed.
*   [ ] **Brand Alignment:** Verify that visuals consistently reinforce the premium, scientific positioning of the Photonique Touch.
*   [ ] **Optimization:** Confirm images use modern formats (like WebP), `srcset` for responsiveness, and `loading="lazy"`.

**5. Animations & Interactions:**

*   [ ] **Subtle Entrance Animations:** Implement subtle scroll-triggered animations (fade-in, slide-up) for polish. Evaluate libraries if needed (OMI uses scroll detection, possibly with Framer Motion or similar in our case).
*   [ ] **Interactive Element States:** Ensure buttons, links, and cards have clear `:hover` and `:focus` states.
*   [ ] **Smooth Scrolling (Optional):** Consider implementing smooth scrolling (like Lenis on OMI) if performance impact is acceptable, test cross-browser compatibility (especially older iOS).

**6. Visual Hierarchy & Information Architecture:**

*   [ ] **Clear Sectioning:** Use headings, spacing, and visual cues (borders, backgrounds) to logically structure content and guide the user.
*   [ ] **Scan-ability:** Ensure key information (science, benefits, results) is presented in easily digestible formats (e.g., short paragraphs, bullet points, icon cards like OMI's).
*   [ ] **CTAs:** Verify calls-to-action are prominent and clear.

**7. Trust & Credibility Building:**

*   [ ] **Highlight Key Proof Points:** Ensure scientific backing, clinical results, testimonials, and expert endorsements are visually prominent and well-designed.
*   [ ] **Adopt Effective Patterns:** Consider patterns like OMI's percentage stats display or their "Visible results in 90 days" timeline component to showcase data compellingly.
*   [ ] **FAQ Section:** Implement a clear, easy-to-use accordion-style FAQ section like OMI's. 