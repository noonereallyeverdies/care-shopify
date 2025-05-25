# Plan for Integrating React Three Fiber (R3F) with Shopify Hydrogen/Remix

This document outlines the steps and best practices for integrating the `DeviceScene.tsx` component, which uses React Three Fiber, into the Shopify Hydrogen/Remix application.

## Understanding the Challenges

1.  **Server-Side Rendering (SSR):** Remix/Hydrogen renders components on the server first. R3F relies heavily on browser-specific APIs (`window`, `document`, WebGL) which are unavailable in the Node.js server environment.
2.  **Static Imports:** Importing R3F components directly can cause server errors if the imported code (or its dependencies) executes browser-specific logic upon import.
3.  **Client-Side Hydration:** R3F components, especially those using hooks, need the R3F `<Canvas>` context to be available when they render on the client, which happens during or after React's hydration process.
4.  **Build Environment (MiniOxygen/Vite):** The development server (MiniOxygen) or build tool (Vite) might encounter issues if R3F code is incorrectly bundled or executed during server startup.

## Best Practices & Implementation Plan

1.  **Dynamic Import (`React.lazy`):
    *   **Requirement:** Absolutely necessary for the component using R3F (`DeviceScene`).
    *   **Purpose:** Prevents the component's code from being included in the initial server bundle, delaying its load until rendered on the client.
    *   **Status:** Currently implemented correctly in `Hero.tsx`.
    ```javascript
    const LazyDeviceScene = lazy(() =>
      import('~/components/3d/DeviceScene').then(module => ({ default: module.DeviceScene }))
    );
    ```

2.  **Client-Side Rendering Boundary:
    *   **Requirement:** Essential to prevent rendering attempts on the server and ensure browser APIs/context are ready.
    *   **Purpose:** Guarantees the `<Canvas>` and the R3F component only render *after* the parent component (`Hero`) has mounted in the browser.
    *   **Implementation:** Use a combination of a dedicated `<ClientOnly>` component and an `isMounted` state check.
    *   **Status:** `<ClientOnly>` component created (`utility/ClientOnly.tsx`). Usage implemented in `Hero.tsx` (currently commented out for debugging other issues).
    ```javascript
    import { ClientOnly } from '~/components/utility/ClientOnly';
    // ...
    <ClientOnly>
      {isMounted && (
        <Canvas /* ... */>
          <Suspense fallback={null}>
            <LazyDeviceScene />
          </Suspense>
        </Canvas>
      )}
    </ClientOnly>
    ```

3.  **Review `DeviceScene.tsx` Code:
    *   **Requirement:** Manual code review.
    *   **Purpose:** Ensure no browser-specific APIs (`window`, `document`, etc.) are accessed *outside* of React component functions or `useEffect` hooks. Code at the top level of the file runs upon import and can cause server errors.
    *   **Action:** Examine `~/components/3d/DeviceScene.tsx` for any such top-level API usage.

4.  **Vite SSR Configuration (If Necessary):
    *   **Requirement:** Only if errors persist after verifying steps 1-3.
    *   **Purpose:** Explicitly tell Vite *not* to bundle R3F or related libraries for the server build.
    *   **Action:** Investigate `vite.config.ts` and potentially use `ssr.noExternal = ['@react-three/fiber', 'three', /* other related libs */];`.

## Execution Steps

1.  Resolve the current outstanding errors in `root.tsx` (CSP, TypeScript type errors).
2.  Verify the application runs without MiniOxygen or console errors (with the R3F section in `Hero.tsx` still commented out).
3.  **Manually review `DeviceScene.tsx`** as described in Plan Step 3.
4.  **Uncomment** the `<ClientOnly>` block containing the `<Canvas>` and `<LazyDeviceScene>` in `Hero.tsx`.
5.  Restart the development server.
6.  Test thoroughly in the browser. Check for:
    *   MiniOxygen startup errors.
    *   Browser console errors (R3F hook errors, etc.).
    *   Correct rendering of the 3D scene.
7.  If errors related to R3F reappear, focus on Step 3 (reviewing `DeviceScene.tsx`) and then potentially Step 4 (Vite config). 