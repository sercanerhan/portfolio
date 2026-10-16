---
name: add-case-study
description: Add or rewrite a case study on the portfolio (the deep-linkable story cards in the "Selected case studies" section). Use when the user wants to feature another project, company or outcome as a case study.
---

# Add a case study

Case studies live in `caseStudies` in `src/data/profile.ts` and render through `components/CaseStudies.tsx` (cards) and `components/CaseSheet.tsx` (full sheet at `#/work/<slug>`). No component changes are needed for a new entry.

1. **Gather facts first.** Use only what is on the CV or what the user tells you in this conversation. If a metric isn't sourced, leave it out — ask the user rather than inventing one.
2. **Add an entry** following the existing shape:
   - `slug` — kebab-case, stable (it becomes a public URL; never rename an existing one)
   - `kicker` (2–3 words), `title` (a claim, not a job title), `company`, `period`
   - `metrics` — 2–4 `{ value, label }` chips, all sourced
   - `context`, `challenge` (the hard part), `actions` (3–5, first person, verbs first), `outcome`, `lesson` (one quotable sentence)
3. **Cover image:** run the `generate-image` skill with name `case-<slug-ish>` and set `cover: 'images/case-<name>.webp'`. Until then the `Cover` component shows a gradient fallback.
4. The grid is two columns; an odd count leaves a gap — either add a fourth/sixth story or make the extra one a wide card like the AYA "Product for good" block.
5. The command palette lists case studies automatically. Verify with `npm run build`, then open `#/work/<slug>` in the preview and check the sheet on desktop and at 375px.
