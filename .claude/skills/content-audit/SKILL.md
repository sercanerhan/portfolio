---
name: content-audit
description: Audit portfolio copy against the CV and the content rules — fixed facts, sourced metrics only, privacy, tone and illustration labels. Use before shipping copy changes or when the user asks to proofread or fact-check the site.
---

# Content audit

The source of truth for facts is the CV (kept locally as `cv_sercanerhan_*.pdf`, never committed) plus anything the user has stated in conversation. Read the PDF if it is present.

Check `src/data/profile.ts` and any hard-coded strings in `src/components/**` for:

1. **Facts** — every company name, title, date range and degree matches the CV character for character (including Turkish characters: İTÜ, İŞLEM CBS, Yıldız, İstanbul). Current company = "Basefy Innovation Lab".
2. **Metrics** — every number traces to the allow-list in `CLAUDE.md` → "Content rules". Flag anything else; numbers inside a demo must be labelled as sample/simulation.
3. **Consistency** — the same fact reads the same everywhere (e.g. "18 years", "65% QoQ", "$11M … $8M"). Grep for each metric across `src/`.
4. **Privacy** — no phone number, no home address, no CV PDF in `public/` or git (`git ls-files | grep -i pdf` must be empty).
5. **Tone** — confident showcase; no "open to opportunities", "looking for", "hire me".
6. **Labels** — every showcase demo still renders its `DemoNote` or simulation note.
7. **Language** — British/American spelling is mixed only where already established; fix typos and grammar without rewriting voice.

Report findings as a short list (file:line → issue → suggested fix) and apply only the fixes the user approves, unless they asked you to fix everything.
