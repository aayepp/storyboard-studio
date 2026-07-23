# Storyboard Studio — AI Agent Briefing

Before doing ANYTHING, read `CHANGES-SESSION.md` in this directory completely.
It contains full technical context, recent changes, known bugs, and next steps.
Do not write or modify any code until you have read it completely.

## Quick Start
```bash
cd storyboard-studio
npm install
npm run dev
```

## Validate before every commit
```bash
npx esbuild src/App.jsx --outfile=/tmp/check.js --bundle --loader:.jsx=jsx
# Must return zero errors
```

## Key Rules
- Edit `src/App.jsx` only (NOT `App.tsx` — that file is dead)
- Ponytail mindset: minimal patches, ask before adding, never touch unrelated code
- Always esbuild validate before commit
- Backup before structural changes: `cp src/App.jsx src/App.jsx.bak`
