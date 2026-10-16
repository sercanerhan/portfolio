---
name: add-showcase-demo
description: Build a new playable product demo for the "Things I've shipped" showcase tabs, or change an existing one. Use when the user wants to show another product interactively.
---

# Add a showcase demo

Demos are small, self-contained React recreations of a product's *core idea* — not replicas of real UI.

1. **Data:** add an item to `showcase` in `src/data/profile.ts` — `id` (short, stable; also the name of the optional real screenshot `public/images/real/<id>.webp`), `label` (tab text), `company`, `years`, `title`, `blurb`, `points` (3).
2. **Component:** create `src/components/showcase/<Name>Demo.tsx` exporting a named component. Patterns to reuse:
   - `Phone` / `Browser` frames and `DemoNote` from `DeviceFrame.tsx`
   - SVG + `motion` paths for maps and routes (see `RouteOptimizerDemo`, `TransitMapDemo`); `MapDots` from `WorldMap.tsx` for world views
   - state machines for flows (see `GroceryAppDemo`, `HealthDemo`); `setInterval` simulations with play/pause (see `ReliefMapDemo`)
3. **Register** it in the `demos` map in `components/Showcase.tsx` with `lazy(() => import(...).then(m => ({ default: m.X })))` so it gets its own chunk.
4. **Rules:**
   - No network calls, API keys or real personal data — it must run on static GitHub Pages.
   - Label it: "Illustrative recreation · not the production UI" for UI, "Simulation · not real data" for data. Sample numbers inside a demo must be clearly marked as sample.
   - Works by mouse, touch and keyboard (real `<button>`s, `aria-pressed` / `aria-selected` on toggles, `aria-label` on icon buttons and SVGs).
   - Respect reduced motion: gate SVG `animateMotion` loops on `useReducedMotion()`.
   - Fits the ~600px demo column on desktop and 340px on mobile; stack instead of squeezing.
   - Scrollable inner areas need `data-lenis-prevent`.
5. Verify: `npm run build`, then switch to the tab in the preview, interact with it, and check the console and the 375px layout.
