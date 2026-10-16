---
name: ship
description: Verify the portfolio builds and renders under the GitHub Pages sub-path, then commit, push and watch the deploy. Use when the user says ship, deploy, publish, push it live, or after finishing a change they want online.
---

# Ship the portfolio

Pushing to `main` publishes the site publicly at https://sercanerhan.github.io/portfolio/. Always get the user's go-ahead before `git push`.

1. **Content check.** Skim `git diff` against the rules in `CLAUDE.md` → "Content rules": no invented metrics, CV facts unchanged, no phone number, no job-hunting language, illustration labels intact. Run the `content-audit` skill if copy changed a lot.
2. **Build exactly like Pages does:**
   ```bash
   BASE_PATH=/portfolio/ npm run build
   ```
   It must finish with no TypeScript errors. A chunk-size warning on the main bundle is known; a new large chunk is not — lazy-load it.
3. **Preview the build under the sub-path.** Run `BASE_PATH=/portfolio/ npx vite preview --port 4173 --strictPort` in the background, attach the Browser pane with `preview_start` url `http://localhost:4173`, then open `http://localhost:4173/portfolio/` and check:
   - every image loads (`[...document.images].every(i => i.naturalWidth > 0)`)
   - no console errors
   - any changed section/demo works; a deep link like `#/work/marketyo-exit` opens its sheet
   - mobile preset (375px): `document.documentElement.scrollWidth === 375`
   Reset the viewport to desktop afterwards.
4. **Commit** with a message that explains why, ending with the co-author line from the session's attribution reminder. Never stage `cv_sercanerhan_*.pdf` or `assets-src/`.
5. **Ask, then push:** `git push`.
6. **Watch the deploy:**
   ```bash
   gh run watch "$(gh run list -R sercanerhan/portfolio --limit 1 --json databaseId -q '.[0].databaseId')" -R sercanerhan/portfolio --exit-status
   curl -s https://sercanerhan.github.io/portfolio/ | grep -o 'assets/index-[^"]*\.js'
   ```
   The bundle hash from curl should match `dist/index.html`. If the browser shows the old version, load with `?fresh=1` — it's cache, not a failed deploy.
7. Report the live URL and what changed.
