# HANDOFF — READ THIS FIRST

You are continuing development of **Storyboard Studio** (React + Vite, single-file app).
Read this file completely before touching any code.

## Stack
- **App:** `src/App.jsx` (single file, ~7600+ lines) — DO NOT edit `App.tsx` (dead file)
- **Framework:** React + Vite, deploy via Vercel (auto-deploy from `main` branch)
- **AI Backend:** Gemini API (text + image), gateway via `callTextApi` / `callGeminiApi`
- **Repo:** `https://github.com/aayepp/storyboard-studio`
- **Validate:** `npx esbuild src/App.jsx --outfile=/tmp/check.js --bundle --loader:.jsx=jsx` (zero errors)

## Working Directories
- `~/Desktop/storyboard-studio/` — ORIGINAL repo (main branch)
- `~/Desktop/storyboard-studio-test/` — TEST repo (clone, changes applied here first)

## Philosophy
**Ponytail mindset** — minimal patches, reuse existing helpers, ask "perlu ke?" before adding, never touch unrelated code, mark corner cuts with `ponytail:` comment.

---

## Session Changes — 2026-07-23

### 1. Sound Effects (Web Audio API)
- Added `playSound(type)` — Web Audio API tones: start/success/click/error
- Added `handleSoundToggle` + sound toggle button in header (next to dark mode)
- Sound triggers: generate start/success, regen start/success, magic edit, keyboard Ctrl+Enter, error
- State: `soundEnabled` (uses existing `sound_alerts` localStorage key from `playDoneSound`)
- **Note:** Removed duplicate `soundEnabled` state — unified with existing `#12` sound state

### 2. Bug Fixes — Tab Functions
**Bug 1 — Grafix audience always empty:**
- Added `gfAudience` state + InputField UI in Grafix tab
- Fixed `getGrafixPrompt` call: replaced hardcoded `""` with `gfAudience`

**Bug 2 — UGC 30s hardcoded blueprint:**
- Removed ~5000 char hardcoded blueprint block
- Now routes through `getUgcStoryboardPrompt` same as all other durations

**Bug 3 — Product POV scene cap (max 3):**
- Fixed ladder: `10s→2, 20s→4, 30s→6, 45s→8` scenes

**Bug 4 — OOTD dialog generic:**
- Dialog now adaptive by product type: kasut/beg/tudung/default each get different lines

### 3. Keyframe Confidence + Per-Segment Fix
**Bug — Confidence always 0%:**
- `generateAllContent` (UGC path) now passes `keyframeScenes` + `keyframeDurationSec` to `generateVisual`

**Bug — Per-segment shows only 1 image:**
- `totalSec` now uses actual duration, not hardcoded fallback 30s
- Formula: `keyframeDurationSec > 0 ? keyframeDurationSec : sceneList.length * 2.5`

### 4. Category-Specific UGC Context
- Added `getCategoryContext(category, product)` helper before `getUgcStoryboardPrompt`
- Each category gets specific demo sequence, hook angle, CTA style, extra negatives:
  - **Skincare:** texture swatch → apply on face → absorption → glow result
  - **Food & Beverage:** preparation → first bite/sip → taste reaction → verdict
  - **Tech & Gadgets:** unbox → build quality → feature demo → performance reaction
  - **Fashion:** material close-up → try-on → fit/movement → mirror check
  - **Home Living:** before problem → product use → after result
- Injected into `getUgcStoryboardPrompt` as `[CATEGORY-SPECIFIC GUIDE]` block
- Product name included in hook/cta strings

### 5. Product Reference — Strengthened Rules
- Rewrote `[PRODUCT REFERENCE IMAGE]` rules in `fetchSingleImage` to numbered STEP format:
  - STEP 1: Identify angle needed
  - STEP 2: Find matching panel
  - STEP 3: Copy from THAT panel ONLY
- HARD RULES: FRONT=screen only, BACK=rear only, LEFT/RIGHT Controls never swap
- Screen always faces person, never camera (unless product showcase)

### 6. Auto Angle-Mapping from Reference Sheet
- Added `analyzeProductAngles()` — scans uploaded reference sheet, detects available panels
- Returns `{ is_sheet, available_angles[], angle_notes }`
- Called after `analyzeReferenceAssets` in both `generateNewMode` and `generateAllContent`
- Available angles injected into `identityBible` as `[PRODUCT REFERENCE SHEET — AVAILABLE ANGLES]`
- Added `angle_used` field to `SCENE_JSON_CONTRACT` — AI declares panel per scene
- `imagePrompts` map injects `[USE PANEL: X]` instruction per scene

### 7. Background Lock — Override Conflicting Descriptions
- Added `hasBackgroundRef` check in `fetchSingleImage`
- When background reference uploaded: `envLock` becomes `[BACKGROUND OVERRIDE — CRITICAL]`
- Explicitly overrides any environment description in prompt that contradicts reference image
- Prevents AI from inventing cafes/rooms when electronics store was uploaded as reference

### 8. NO-INVENTION RULE Label
- Added `[NO-INVENTION RULE — CRITICAL ENVIRONMENT BACKGROUND LOCK]` label to background reference block

### 9. Fake Influencer — No Product in Hand
- Removed "hold a generic product box" from Product Review format prompt
- Added `[HANDS FREE]` instruction in mainImagePrompt
- Added "holding product, holding bottle, holding box..." to `strictNegativePrompt`

---

## Current File State
- **Lines:** ~7600+
- **Build:** ✅ esbuild zero errors
- **Dev server:** `npm run dev` (port 5174/5175)

---

## Known Limitations
1. Auto angle-mapping (`analyzeProductAngles`) — extra API call adds ~2-3s to generation time
2. Background override rule is text-only — strong model like Gemini 2.5 Flash respects it better
3. Fake Influencer hands-free — negative prompt helps but AI may still occasionally add props
4. Per-segment confidence tag goes stale after regenerate keyframe (known issue #6 from previous session)

---

## Next Suggested Work
1. **Commit + push** test folder changes to GitHub main branch
2. **Test** auto angle-mapping with ROG Ally X reference sheet
3. **Consider** crop reference sheet into individual angle images for highest accuracy
4. **OOTD** — consider full storyboard mode (scenes + dialog) instead of single image
5. **Product POV** — test new scene ladder (20s→4, 30s→6) with real product

---

## File Structure Reference
```
src/App.jsx
├── Constants: DEFAULT_NEGATIVE, SCENE_JSON_CONTRACT, DIALOGUE_AUTHENTICITY_RULES (~line 300)
├── Image model cascade: IMAGE_MODEL_CASCADE (~line 400)
├── Smart keyframe: scoreKeyframeCandidate, pickBestKeyframe (~line 120000)
├── Prompt functions:
│   ├── getCategoryContext (~line 750)
│   ├── getUgcStoryboardPrompt (~line 800)
│   ├── getCinematicStoryboardPrompt (~line 850)
│   ├── getMicroImpactPrompt (~line 950)
│   ├── getNarrativeArcPrompt (~line 970)
│   ├── getTalkingHeadPrompt (~line 1000)
│   ├── getStopMotionPrompt (~line 1040)
│   ├── getGrafixPrompt (~line 1080)
│   └── buildSheetPrompt (~line 1150)
├── Generate functions:
│   ├── analyzeReferenceAssets
│   ├── analyzeProductAngles (NEW)
│   ├── generateNewMode (cinematic/micro/narrative/talkinghead/stopmotion/grafix)
│   └── generateAllContent (ugc/product/ootd/character/fake_influencer)
└── fetchSingleImage — image gen with reference handling
```

---

*Last updated: 2026-07-23. All changes in `src/App.jsx`. Validated with esbuild (zero errors).*

---
### Auto-log: 2026-07-24 02:46 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-24 22:31 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-24 23:03 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-24 23:19 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-24 23:26 (branch: main)
**Files changed:** src/App.jsx
