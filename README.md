# sercan.erhan — portfolio

Personal portfolio of **Sercan Erhan**, Chief Product Officer at Basefy Innovation Lab.
Live at **https://sercanerhan.github.io/portfolio/**.

Built with Claude Code (planning + code) and the Codex CLI (image generation), as a small product in its own right:
an impact dashboard, deep-linkable case studies, seven playable product demos, a career changelog and a ⌘K command palette.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · cmdk · Lenis — static output, deployed to GitHub Pages by GitHub Actions.

## Develop

```bash
npm install
npm run dev
```

## Edit content

All copy lives in [`src/data/profile.ts`](src/data/profile.ts) — roles, case studies, demos, principles, toolkit, education.

## Images

Covers were generated with the Codex CLI (ChatGPT subscription, built-in image tool) into `assets-src/generated/` (git-ignored), then optimised:

```bash
npm run images   # PNG → WebP in public/images + public/og-image.jpg
```

Real product screenshots can be dropped into `public/images/real/<demo-id>.webp`
(`route`, `laas`, `grocery`, `health`, `transit`, `relief`, `agents`) — a “View real screenshot” button appears automatically.

## Other scripts

```bash
node scripts/build-map.mjs   # regenerate the dotted world map data
npm run stats                # refresh the "How this site was built" numbers (also runs on build)
npm run build && npm run preview
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The base path is detected automatically, so the same build works for a `username.github.io` repo or a project repo.
