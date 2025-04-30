# Game Plan: Refactoring Science Sections on Landing Page

**Objective:** Replace the multiple existing science-related sections with a single, visually dynamic, and interactive `InteractiveScienceSection` component that effectively communicates the core scientific principles (Red Light, Massage, Oiling) and their synergistic effect in an engaging way, optimized for visual understanding.

---

## Phase 1: Preparation & Asset Gathering

1.  **Identify Existing Components:**
    *   **Action:** Locate and list the exact file paths of the current components rendering the following content areas:
        *   `Follicle Reactivation Process` (and its steps)
        *   `Why Red Light Therapy Works`
        *   `Biomimetic Polymer Technology`
        *   `Triple-Action Technology` (current implementation)
        *   `For the Science-Minded` details
    *   **Tool:** Use `codebase_search` or `grep_search` if necessary. Example query: `codebase_search(query="Follicle Reactivation Process component")`.
    *   **Goal:** Know precisely which components to remove later.

2.  **Finalize Interaction Model:**
    *   **Decision:** Choose the primary interaction mechanism for revealing the 3 core actions (Red Light, Massage, Oiling):
        *   **Option A:** Scrollytelling (animations triggered by scroll position).
        *   **Option B:** Tab-based interface (user clicks tabs to reveal each step).
    *   **Action:** Confirm the chosen model. (Defaulting to **Scrollytelling** for now).

3.  **Gather/Create Visual Assets:**
    *   **Action:** Source or create the necessary animations and graphics. This is critical for the visual engagement ("monkey test"). Required assets include:
        *   Sleek animation of the Care•atin device (for the opening hook).
        *   Static/Animated graphic: Dormant hair follicle (initial state).
        *   Static/Animated graphic: Activated hair follicle with thicker hair growing (final state).
        *   Animation: Red light waves penetrating scalp layers.
        *   Animation: Mitochondria "sparking" or energizing within the follicle.
        *   Animation: Comb/massage action on the scalp surface.
        *   Animation: Debris/buildup being cleared from follicle opening.
        *   Animation: Precise oil droplet application near follicle.
        *   Set of small, animated icons representing key benefits (e.g., ATP Boost, Circulation, Inflammation Reduction, Exfoliation, Frizz Reduction, Absorption, Nutrient Delivery).
    *   **Goal:** Have all visual elements ready for implementation. *Dependency: This may require graphic design/animation resources.*

4.  **Consolidate Text Content:**
    *   **Action:** Review the text content within the *existing* science components (identified in Step 1).
    *   **Action:** Extract and refine the *most essential, concise* text snippets for:
        *   The opening hook.
        *   The simplified problem statement.
        *   Each of the 3 core action steps (Red Light, Massage, Oiling).
        *   The synergistic result statement.
    *   **Action:** Identify the single most impactful statistic for the "Proof Point" (e.g., "93% Saw Results").
    *   **Action:** Gather the detailed text/links intended for the optional "Deep Dive" section.
    *   **Goal:** Have finalized, minimal text ready for the new component.

---

## Phase 2: Component Development (`InteractiveScienceSection.tsx`)

1.  **Create New Component File:**
    *   **Action:** Create the file `care/app/components/sections/InteractiveScienceSection.tsx`.

2.  **Scaffold Component Structure:**
    *   **Action:** Set up the basic React functional component structure within the new file. Include imports (React, framer-motion, etc.). Define the main section layout using JSX and appropriate Tailwind CSS classes.

3.  **Implement Opening Hook:**
    *   **Action:** Integrate the device animation and the concise opening text.

4.  **Implement Core Visual & Interaction:**
    *   **Action:** Create the central visual area that will display the main scalp/follicle animation.
    *   **Action:** Implement the Scrollytelling logic (e.g., using `framer-motion`'s `useScroll`, `useTransform`, and potentially `useInView`) to track scroll progress relative to the section and trigger animations/state changes.

5.  **Build Step-by-Step Animations:**
    *   **Action (Step 1 - Red Light):** Integrate the red light wave animation, follicle energizing animation, benefit icons, and concise text. Trigger based on scroll progress.
    *   **Action (Step 2 - Massage):** Integrate the massage animation, scalp clearing animation, benefit icons, and concise text. Trigger based on scroll progress.
    *   **Action (Step 3 - Oiling):** Integrate the oil droplet animation, benefit icons, and concise text. Trigger based on scroll progress.

6.  **Build Result Animation:**
    *   **Action:** Implement the final animation showing the activated follicle and thicker hair growth, triggered after the 3 steps are revealed via scroll.

7.  **Add Proof Point:**
    *   **Action:** Integrate the selected key statistic using the established large, visually consistent number styling.

8.  **Implement Deep Dive (Optional):**
    *   **Action:** Create the mechanism (e.g., a button revealing a collapsible `div` or linking to a modal/page) for the detailed "For the Science-Minded" content. Populate it with the gathered text/links.

9.  **Styling & Responsiveness:**
    *   **Action:** Apply necessary Tailwind CSS throughout for layout, typography, colors, and spacing. Ensure the entire section and its animations are fully responsive across desktop, tablet, and mobile views.

---

## Phase 3: Integration & Cleanup

1.  **Integrate New Component:**
    *   **Action:** Import `InteractiveScienceSection` into the main landing page file (likely `care/app/routes/($locale)._index.tsx` or similar).
    *   **Action:** Place the `<InteractiveScienceSection />` tag in the desired location within the landing page's component structure, replacing the group of old science sections.

2.  **Remove Old Components:**
    *   **Action:** In the main landing page file, remove the *imports* for all the old science components identified in Phase 1, Step 1.
    *   **Action:** Remove the *JSX tags* that were rendering these old components.

3.  **Delete Old Component Files:**
    *   **Action:** Delete the actual source files for the redundant science components identified in Phase 1, Step 1.
    *   **Tool:** Use the `delete_file` tool. Example: `delete_file(target_file='care/app/components/sections/OldScienceComponent1.tsx')`.
    *   **Goal:** Keep the codebase clean and avoid confusion.

---

## Phase 4: Testing & Refinement

1.  **Visual & Interaction Testing:**
    *   **Action:** Thoroughly test the new section on various browsers and screen sizes (desktop, tablet, mobile).
    *   **Action:** Verify all animations trigger correctly based on scroll position. Check for smooth transitions and visual glitches. Test the tab functionality if that model was chosen.

2.  **Functional Testing:**
    *   **Action:** Ensure the "Deep Dive" link/button works correctly. Check any internal links.

3.  **Performance Check:**
    *   **Action:** Monitor the page's performance. Ensure the animations are smooth and do not cause significant frame rate drops (jank). Optimize animations if necessary (e.g., using `will-change`, ensuring hardware acceleration).

4.  **Content Accuracy:**
    *   **Action:** Review the concise text snippets to ensure they still accurately convey the intended scientific message.

--- 