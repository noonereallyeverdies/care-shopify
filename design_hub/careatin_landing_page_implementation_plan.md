# Care-atin: Detailed Landing Page Implementation Plan (RLT for Hair MVP)

**Objective:** Launch a robust, high-performing, and on-brand landing page for Care-atin's Red Light Therapy for Hair device, based on the `careatin_brand_strategy.md` and `careatin_developer_guidance.md`.

**Core Platform:** Shopify Hydrogen
**Project Docs Location:** `design_hub/` folder

**Target Audience:** Consumers experiencing hair thinning/loss or seeking improved hair health, interested in science-backed, premium solutions.

---

## Phase 1: Foundation & Setup (Est. Duration: [e.g., 1-2 days])

**Goal:** Establish the technical groundwork, finalize core design assets, align the team.

### **Project Manager (PM):**

```markdown
**Phase 1 PM Checklist & Flow:**

1.  **Define Scope:**
    *   [X] Document MVP Sections in Plan (Hero, Problem/Solution, HowItWorks Snippet, Device Spotlight, Proof/Results, Final CTA).
    *   [X] Document Exclusions in Plan (Full Science/Results Pages, Bundling, Quiz, etc.).
    *   [X] Confirm: Static reviews OK for MVP.

2.  **Create Timeline Visualization (Example - Needs Dates):**
    *   Phase 1: Foundation & Setup -> [Target End Date]
    *   Phase 2: Design & Content Def. -> [Target End Date]
    *   Phase 3: Development & Impl. -> [Target End Date]
    *   Phase 4: Content Integ. & Refine -> [Target End Date]
    *   Phase 5: Testing & Pre-Launch -> [Target End Date]
    *   Phase 6: Launch & Monitor -> [Target Launch Date]
    *   *Note: Includes ~10-15% buffer per phase.*

3.  **Confirm Resources:**
    *   [X] Shared folder confirmed: `design_hub/`.
    *   [X] Key docs located/created within `design_hub/`.
    *   [X] Access confirmed for: PM, Designer, Dev, Copywriter, SEO, Marketing, Legal.

4.  **Run Kickoff:**
    *   [ ] Schedule & conduct meeting.
    *   [X] Key Topics Covered & Documented (in meeting notes within `design_hub/`).

5.  **Set Communication:**
    *   [ ] Define primary channel [e.g., Slack Channel #careatin-landingpage].
    *   [ ] Set & communicate meeting cadence [e.g., Daily 15min standups, Weekly 30min sync].
```

### **UX/UI Designer:**

*   **Action:** Provide *final, specific* HEX/HSL codes for the full color palette variables (`--c-primary-*`, `--c-secondary-nature-*`, `--c-accent-rlt`) documented clearly **(PENDING)**.
*   **Action:** Confirm final heading font choice (`Inter`). Body font (`Manrope`).
*   **Action:** Deliver the precise typographic scale definitions (CSS variable names tied to `px` or `rem` values, font weights, line heights for H1-H6, body, small text, captions, etc.) **(PENDING)**.
*   **Action:** Provide the precise spacing unit definitions (CSS variable names tied to `px` or `rem` values, e.g., `--space-md: 1rem; --section-padding-y: 5rem;`) **(PENDING)**.
*   **Action:** Deliver the finalized SVG icon set (optimized for web) and the final brand logo files (SVG, high-res PNG). Ensure naming conventions are clear **(PENDING)**.
    *   *Consideration:* Ensure icons visually align with the "clean lines, organic + tech shapes" concept. **Decision:** Use an outlined style primarily, ensuring lines are crisp and not overly complex.

### **Developer (Dev):**

*   **Action:** Initialize/clean the Hydrogen project (`care/app`). Ensure necessary dependencies are installed.
*   **Action:** Implement CSS variables for colors, typography, and spacing units within a global stylesheet (`app/styles/variables.css` or similar, imported into `root.tsx`). **Use provided values, use logical placeholders where assets are pending.**
    *   *Consideration:* Double-check variable names match designer specs precisely. **Action:** Implement exactly as provided by the designer; raise any naming conflicts immediately. Use placeholder values (e.g., standard grays, common font sizes) temporarily if final specs pending.
*   **Action:** Set up basic global styles: CSS reset/normalize, base font styles applied to `body` (font-family, size, color, line-height), link styling.
*   **Action:** Configure Shopify Storefront API client (e.g., in `app/lib/shopify.ts`) using credentials from `.env` file. Test connection.
*   **Action:** Basic `app/root.tsx` structure: Include `<html>`, `<head>`, `<body>`. Implement basic `<meta>` tags (charset, viewport). Link global stylesheets. Set up core layout structure (e.g., using divs for Header, Main, Footer). Add placeholder `Header` and `Footer` components.
    *   *Consideration:* Think about SEO implications for metadata early (placeholders ok, but structure needed). **Action:** Include placeholder `<title>` and `<meta name="description">` tags, ready for population in Phase 4.

### **Copywriter/Content Strategist:**

*   **Action:** Review `careatin_brand_strategy.md` thoroughly, internalizing the "Radiant Growth Science" voice and target audience needs.
*   **Action:** Review competitor RLT hair device websites for messaging angles, claims, and tone (informational gathering).

### **SEO Specialist:**

*   **Action:** Conduct preliminary keyword research focused on "red light therapy for hair," "hair growth device," "hair thinning solutions," etc. **(See SEO Analysis in `design_hub/` for initial list).** Identify primary and secondary target keywords for the landing page.
*   **Action:** Review competitor SEO (titles, meta descriptions, heading structures) for RLT hair products. **(See SEO Analysis in `design_hub/` for initial insights).**

---

## Phase 2: Design & Content Definition (Est. Duration: [e.g., 3-5 days])

**Goal:** Translate strategy into visual blueprints and draft initial content.

### **UX/UI Designer:**

*   **Action:** Create detailed wireframes for the landing page (Mobile & Desktop), showing section order, element placement, content hierarchy, and placeholder content areas for each MVP section. Annotate key interactions or functionality.
    *   *Consideration:* Pay close attention to the logical flow defined in the strategy (Problem -> Solution -> How -> Proof -> Product -> CTA). Ensure mobile layout is prioritized. **Action:** Wireframes must clearly label content blocks corresponding to MVP sections and show mobile-first layout structure.
*   **Action:** Design high-fidelity mockups (Mobile & Desktop) based on approved wireframes, meticulously applying the finalized color palette, typography scale, spacing rules, icons, and button styles **(Blocked until assets provided)**.
    *   *Consideration:* Mockups must accurately reflect the "Cleanliness & Precision" aesthetic. Show specific examples of the "Radiance/Glow" accent used sparingly (e.g., on a CTA, highlighting a diagram element). **Action:** Provide explicit visual examples in mockups for accent color usage on buttons, interactive states, and data highlights.
*   **Action:** Provide detailed specifications for microinteractions: Define timings, easing functions, and visual changes for button states, scroll-triggered animations (e.g., "subtle fade-in-up, 0.5s ease-out"), hover effects on icons/cards. Use examples or animation prototypes if possible.
*   **Action:** Design the specific visual appearance and layout for the `TestimonialSlider` cards and the `BeforeAfter` component, ensuring they integrate seamlessly with the overall design.
*   **Action:** Create a concise Style Guide document or Figma page summarizing core visual elements (Color Palette swatches w/ vars, Typographic Scale examples, Button styles w/ states, Icon examples) for easy developer reference.

### **Copywriter/Content Strategist:**

*   **Action:** Write draft copy for *all* landing page MVP sections, aligning with wireframes/mockups and SEO keyword recommendations. Focus on clarity, conciseness, and benefit-driven language.
    *   *Hero:* Compelling Headline & sub-headline.
    *   *Problem/Solution:* Empathetic framing of hair concerns.
    *   *HowItWorks Snippet:* Simple, clear explanation of RLT mechanism (avoid jargon). Define 2-3 key benefit statements.
    *   *Device Spotlight:* Translate technical features into user benefits.
    *   *Testimonials:* Draft placeholder structure and example quote style.
    *   *Before/After:* Define caption/label requirements.
    *   *CTAs:* Write clear, action-oriented text for all buttons.
    *   *Consideration:* Maintain the balance between scientific credibility ("Science") and aspirational results ("Radiant Growth"). Ensure consistency in terminology (e.g., RLT, device name). **Action:** Use active voice where possible. Ensure claims align with expected Legal review guidelines (focus on "supports," "improves appearance" initially).
*   **Action:** Consider placeholder copy length carefully to inform design constraints.

### **SEO Specialist:**

*   **Action:** Provide refined keyword list based on initial research and content direction. Specify primary keyword target(s) for the landing page.
*   **Action:** Recommend optimal H1 tag usage (should contain primary keyword). Suggest keyword inclusion strategy for H2s and body copy (naturally integrated, not stuffed).
*   **Action:** Draft initial meta title (under 60 chars) and meta description (under 160 chars) incorporating primary keywords and compelling value proposition.
    *   *Consideration:* Title & Description should entice clicks from search results. **Action:** Draft 2-3 options for Meta Title/Description for review.

### **Developer (Dev):**

*   **Action:** Review wireframes and initial mockups. Provide feedback on technical feasibility, potential challenges, or alternative implementation suggestions for interactions/components (e.g., suggest simpler animation if specified one is too complex for timeline).
*   **Action:** Start scaffolding basic React components in `app/components/` for each MVP section based on wireframes (structure only, no styling yet). Example: `HeroSection.tsx`, `HowItWorksSnippet.tsx`, etc.

### **Project Manager (PM):**

```markdown
**Phase 2 PM Checklist & Flow:**

1.  **Manage Reviews:**
    *   [ ] Circulate Wireframes -> Consolidate feedback -> Provide to Designer.
    *   [ ] Circulate Mockups (when available) -> Consolidate feedback -> Provide to Designer.
    *   [ ] Circulate Draft Copy -> Consolidate feedback -> Provide to Copywriter.
    *   [ ] Ensure feedback loops are efficient (e.g., document comments, dedicated review meetings).

2.  **Secure Sign-offs:**
    *   [ ] Obtain documented approval for final Wireframes.
    *   [ ] Obtain documented approval for final Mockups (when available).
    *   [ ] Obtain documented approval for core Copy direction.

3.  **Monitor Progress:**
    *   [ ] Check task status against Phase 2 timeline.
    *   [ ] Identify any delays (esp. dependency on design assets) and communicate impact.
```

---

## Phase 3: Development & Implementation (Est. Duration: [e.g., 5-10 days])

**Goal:** Build the functional and styled landing page components.

### **Developer (Dev):**

*   **Action:** Build reusable React components for each MVP section (`HeroSection`, `ProblemSolution`, `HowItWorksSnippet`, `DeviceSpotlight`, `TestimonialSlider`, `BeforeAfter`, static `ReviewCard`, `Shared/Header`, `Shared/Footer`, `Shared/Button`, `Shared/Icon`) based *strictly* on the approved high-fidelity mockups and style guide **(Styling blocked until assets/specs provided)**.
    *   *Consideration:* Focus on semantic HTML structure within components (`<section>`, `<article>`, headings, etc.). **Action:** Use appropriate landmarks (`<section>`, `<aside>`) and heading tags (H1, H2, H3...) logically within each component.
*   **Action:** Apply CSS styling using the established CSS variables **(Blocked until assets/specs provided)**. Implement responsive styles ensuring pixel-perfect (or near-perfect) rendering across mobile, tablet, and desktop breakpoints defined by the designer. Prioritize mobile-first styling.
*   **Action:** Integrate SwiperJS for the `TestimonialSlider`. Configure options (slides per view, breakpoints, pagination, navigation if needed) based on design specs. Populate with static review data initially.
*   **Action:** Build the custom `BeforeAfter` component (e.g., using CSS clip-path/object-position and range input or a library like `react-before-after-slider`).
*   **Action:** Implement the specified microinteractions (CSS transitions for button states, scroll-triggered animations using Intersection Observer API or a library like `framer-motion` for simple fades/slides).
*   **Action:** Structure the main landing page route (`app/routes/_index.tsx`) by importing and arranging the built components in the correct order.
*   **Action:** Implement Shopify Storefront API call (e.g., using Hydrogen's `useShopQuery` or standard `fetch`) to retrieve essential data for the RLT device (Product title, Price, potentially Featured Image URL). Display this data in the `DeviceSpotlight` and potentially Hero/CTA sections.
    *   *Consideration:* Handle loading and error states gracefully for API calls. **Action:** Implement simple loading indicators (e.g., subtle skeleton screen or spinner) and display user-friendly error messages if API data fails to load.
*   **Action:** Implement the sticky header functionality with the specified transition behavior on scroll (e.g., background color change + shadow).
*   **Action:** Ensure all images have appropriate `alt` tags (use descriptive placeholders initially if final copy not ready). Ensure interactive elements are keyboard accessible.
*   **Action:** Conduct basic self-testing during development (check layout breaks, console errors, basic interactions in multiple browsers).

### **UX/UI Designer:**

*   **Action:** Perform regular (e.g., daily or every other day) design QA sessions on the development build/staging link **(Focus on structure/functionality until styling is implemented)**. Provide precise feedback on visual discrepancies (spacing, alignment, color, typography), interaction issues, and responsiveness problems. Use visual annotation tools if helpful.
    *   *Consideration:* Focus on ensuring the implementation matches the intended premium feel and adheres strictly to the style guide. **Action:** Prioritize feedback based on impact (e.g., major layout breaks > minor spacing issues).

### **Project Manager (PM):**

```markdown
**Phase 3 PM Checklist & Flow:**

1.  **Track Tasks:**
    *   [ ] Monitor dev task completion (structure, API calls, basic components) against Phase 3 timeline.
    *   [ ] Note blocking status due to pending design assets.

2.  **Facilitate Communication:**
    *   [ ] Ensure Dev <> Designer feedback loops are working (e.g., via Slack, comments on staging).
    *   [ ] Organize brief ad-hoc calls if needed to resolve specific implementation questions.

3.  **Mitigate Blockers:**
    *   [ ] Check in regularly with Dev on potential issues (API access, complex CSS, library conflicts).
    *   [ ] Escalate unresolved issues or significant delays (especially asset delivery) to stakeholders.
    *   [ ] Document any scope adjustments needed due to blockers.
```

### **Copywriter/Content Strategist:**

*   **Action:** Finalize all copy based on approved draft and any design constraints discovered. Ensure character counts fit allocated spaces if necessary. Proofread meticulously.

### **SEO Specialist:**

*   **Action:** Review the developer's implementation of heading structures (H1, H2s) on the staging link to ensure alignment with recommendations.

---

## Phase 4: Content Integration & Refinement (Est. Duration: [e.g., 2-3 days])

**Goal:** Populate the built page with final content and assets, conduct initial reviews.

### **Developer (Dev):**

*   **Action:** Replace all placeholder text with the final, proofread copy provided by the Copywriter. Ensure text wraps correctly and doesn't break layouts.
*   **Action:** Replace placeholder images/videos with the final, approved, and optimized assets provided by Marketing/Brand **(Pending asset delivery)**. Ensure correct aspect ratios and resolutions are used. Update `alt` tags with descriptive final text.
*   **Action:** Implement the final meta title and description in `app/root.tsx` or `app/routes/_index.tsx` loader.
*   **Action:** Integrate the GTM container snippet correctly in the `<head>` (usually via `root.tsx`).

### **Copywriter/Content Strategist:**

*   **Action:** Perform a final review of all integrated copy *on the live staging site*. Check for typos, grammatical errors, awkward phrasing, or layout issues caused by text length.

### **Marketing Manager/Brand Manager:**

*   **Action:** Provide all final, approved visual assets (ensure they are optimized for web) **(PENDING)**.
*   **Action:** Conduct a final brand review of the staging site, checking for consistency in voice, visuals, and overall message alignment with the `care-atin` brand.

### **Legal/Regulatory:**

*   **Action:** Conduct final review of *all* text and visual claims on the staging site, particularly those related to hair growth, efficacy, health benefits, or scientific proof. Provide explicit approval or required modifications.
    *   *Consideration:* This is a critical gate. Launch cannot proceed without this approval. **Action:** Review must cover explicit claims, implied claims, testimonial content, and imagery. Approval/Changes must be formally documented.

### **Project Manager (PM):**

```markdown
**Phase 4 PM Checklist & Flow:**

1.  **Coordinate Assets/Copy:**
    *   [ ] Confirm delivery of final assets/copy from Marketing/Copywriter **(Track Pending)**.
    *   [ ] Ensure Dev receives assets in the correct format/location.
    *   [ ] Verify Dev integrates final content.

2.  **Track Legal Review:**
    *   [ ] Submit staging link to Legal with clear review deadline.
    *   [ ] Follow up on review status.
    *   [ ] Communicate required changes clearly to Dev/Copywriter.
    *   [ ] Verify changes are implemented.

3.  **Document Sign-offs:**
    *   [ ] Obtain & store formal Legal approval.
    *   [ ] Obtain & store final Brand/Marketing approval.
```

---

## Phase 5: Testing & Pre-Launch (Est. Duration: [e.g., 3-5 days])

**Goal:** Ensure quality, performance, and readiness for launch through rigorous testing.

### **QA Tester (or Dev/Designer):**

*   **Action:** Execute comprehensive test plan covering:
    *   **Cross-Browser Testing:** Latest versions of Chrome, Firefox, Safari, Edge on Desktop (Mac/Windows).
    *   **Cross-Device Testing:** iOS Safari (latest iPhone/iPad), Android Chrome (popular devices like Pixel/Samsung). Check various screen sizes (small phone, large phone, tablet portrait/landscape, desktop).
    *   **Functional Testing:** Click all links/CTAs, test testimonial slider interactions (swipe, navigation), test Before/After slider, test sticky header behavior, check form field interactions (if any).
    *   **Visual Regression Testing:** Compare staging site meticulously against final mockups for visual discrepancies (layout, spacing, typography, color). Use tools if available **(Full visual test depends on final asset integration)**.
    *   **Responsiveness Testing:** Resize browser window extensively, use browser dev tools device modes. Ensure no layout breaks, overlapping elements, or unreadable text.
    *   **Console Error Check:** Open browser developer console and check for any JavaScript errors or warnings.
    *   **Basic Accessibility Checks:** Test keyboard navigation (tab through all interactive elements, ensure focus indicators are visible), run automated accessibility checker tool (e.g., Axe DevTools), check color contrast ratios.

### **UX/UI Designer:**

*   **Action:** Perform a final holistic usability review on the staging site across key devices. Assess the overall flow, clarity, and feel of the interactions. Provide final polish feedback.

### **SEO Specialist:**

*   **Action:** Conduct final technical SEO audit on staging:
    *   Verify meta title/description implementation.
    *   Verify H1/H2 structure.
    *   Check image `alt` tags.
    *   Run Google PageSpeed Insights and Mobile-Friendly Test. Identify major performance bottlenecks.
    *   Check `robots.txt` (ensure it allows crawling once live) and XML sitemap generation (if applicable for single page).
    *   Verify canonical tag implementation.

### **Developer (Dev):**

*   **Action:** Prioritize and fix all critical/high-priority bugs identified during QA testing.
*   **Action:** Implement final design polish feedback from the UX/UI Designer.
*   **Action:** Address major performance issues identified by SEO/Lighthouse where feasible within scope (e.g., further image optimization, critical CSS/JS improvements). Ensure Hydrogen build optimizations are enabled.
*   **Action:** Perform final code review/cleanup. Prepare production build artifacts.

### **Project Manager (PM):**

```markdown
**Phase 5 PM Checklist & Flow:**

1.  **Manage Bug Fixing:**
    *   [ ] Triage bug reports from QA/Team (e.g., list in shared doc/section).
    *   [ ] Prioritize bugs with Dev (Critical > High > Medium > Low).
    *   [ ] Track bug fix progress and verify fixes.

2.  **Coordinate Final Sign-offs:**
    *   [ ] Request final review & approval from QA.
    *   [ ] Request final review & approval from Design.
    *   [ ] Request final review & approval from SEO.
    *   [ ] Request final stakeholder approval (e.g., Marketing Lead).
    *   [ ] Document all sign-offs.

3.  **Prepare Launch Checklist:**
    *   [ ] Create checklist covering: Final code deployment, DNS changes (if any), Cache clearing, Post-launch checks (smoke tests, analytics verification).
```

---

## Phase 6: Launch & Monitor (Est. Duration: Ongoing)

**Goal:** Deploy the landing page and monitor its initial performance.

### **Developer (Dev):**

*   **Action:** Deploy the approved production build to the live hosting environment (e.g., Shopify Oxygen, Vercel, Netlify).
*   **Action:** Perform post-launch smoke tests on the live site to ensure critical functionality is working as expected.

### **Project Manager (PM):**

```markdown
**Phase 6 PM Checklist & Flow:**

1.  **Coordinate Launch:**
    *   [ ] Confirm final launch time/date with Marketing/Stakeholders.
    *   [ ] Execute pre-launch checklist with Dev.
    *   [ ] Give green light for deployment.

2.  **Communicate:**
    *   [ ] Announce successful launch internally (e.g., Slack, email).

3.  **Monitor:**
    *   [ ] Closely watch for any immediate critical issues (via error monitoring tools, team reports).
    *   [ ] Be ready to initiate rollback plan with Dev if needed.

4.  **Plan Next Steps:**
    *   [ ] Schedule post-launch review meeting (after ~1 week).
    *   [ ] Start planning for Phase 2 (e.g., building out full Science/Results pages based on MVP performance).
```

### **Marketing/Analytics Team:**

*   **Action:** Verify immediately post-launch that GTM, GA4, and all relevant advertising pixels are loading and collecting data correctly on the live domain.
*   **Action:** Begin monitoring key landing page metrics: Traffic sources, bounce rate, time on page, scroll depth, CTA click-through rates, conversion rates (if applicable immediately).
*   **Action:** Set up dashboards or reports for ongoing monitoring.

### **SEO Specialist:**

*   **Action:** Request indexing in Google Search Console. Monitor initial indexing status and check for any crawl errors reported.

---

This detailed plan provides a comprehensive roadmap. Flexibility will be needed, but adhering to this structure and level of detail across roles will significantly increase the likelihood of launching a successful, robust, and strategically aligned landing page for Care-atin. 