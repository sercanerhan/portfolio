---
name: generate-image
description: Create or regenerate portfolio artwork (case-study covers, section backdrops, OG image) with the Codex CLI on the user's ChatGPT subscription — never an API key. Use when the user asks for a new image, a new cover, or to redo the art.
---

# Generate an image with Codex

The user wants images from **Codex's built-in image tool on their existing subscription**. Do not use or ask for an OpenAI API key, and do not draw the image with code.

1. **Write the subject.** One sentence describing the scene. The shared house style (dark glassy 3D, indigo/cyan glow, no text/logos/faces, 16:10, empty left third) is appended automatically by the script — don't fight it. For a new case study, tie the subject to the story's core metaphor (e.g. Marketyo = streams merging into a basket = acquisition).
2. **Generate** (ask before running; each call uses the user's subscription quota):
   ```bash
   scripts/generate-images.sh <name> "<subject>"
   ```
   Run it in the background for long batches. It writes `assets-src/generated/<name>.png` and a `.log`. If it hangs, check the log — a missing `< /dev/null` makes `codex exec` wait on stdin.
3. **Look at it.** Read the PNG and judge it honestly: on-style, no stray text/letters, nothing that misrepresents a real company or disaster (AYA art must stay hopeful, no destruction). Regenerate with a sharper subject if not.
4. **Optimize:** `npm run images` → `public/images/<name>.webp` (≈40–130 KB) and rebuilds `public/og-image.jpg`.
5. **Wire it up** via `asset('images/<name>.webp')` or a `cover:` field in `src/data/profile.ts`. Use `alt=""` for decorative covers.
6. Raw PNGs in `assets-src/` stay git-ignored; only the WebP output is committed.
