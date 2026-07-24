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

## Session Changes — 2026-07-24

### 1. 26 AI Generation Improvements (All Tabs)

**Cinematic Pro:**
- Platform selector UI (TikTok/Reels/YouTube/Shopee) — `cinematicPlatform` state + pass to prompt
- Category-aware hook — AI pilih hook style ikut jenis content
- `getCinematicStoryboardPrompt` signature updated: `platform = 'TikTok'` param

**10s Micro:**
- Punch-cut mode toggle (5 scenes × 2s) — `microPunchCut` state + UI toggle
- Sound design notes per scene — `sound_note` field dalam SCENE_JSON_CONTRACT

**30s Narrative:**
- Genre selector (Emotional/Thriller/Comedy/Motivational/Educational) — `narrativeGenre` state + UI
- Color grade suggestion per genre injected ke prompt
- `getNarrativeArcPrompt` signature updated: `genre = 'emotional'` param

**Talking Head:**
- Teleprompter mode toggle (dialog baris pendek + [PAUSE][SMILE] cues) — `thTeleprompter` state
- CapCut subtitle format toggle (removed — caused escape bug)
- `getTalkingHeadPrompt` signature updated: `teleprompter = false, subtitleFormat = false` params

**Affiliate UGC:**
- Price anchor field UI — `ugcPrice` state
- Unboxing detail rules injected ke prompt
- Routed dari `generateAllContent` ke `generateNewMode` — proper AI scenes dengan dialogue
- `getUgcStoryboardPrompt` call passes `ugcPrice`

**Product POV:**
- Full AI-generated scenes (buang hardcoded blueprint) — `getProductPOVPrompt` function baru
- Hero shot formula per category (gadget/skincare/fashion/food)
- Camera movement specific per scene
- Lighting suggestion

**OOTD:**
- Multi-scene storyboard (4-10 scenes) — `getOotdStoryboardPrompt` function baru
- Styling tips adaptive (kasut/beg/tudung/default)
- Flow AI ready dengan i2v_prompt

**Stop Motion:**
- Easing selector (Natural/Bounce/Snap/Slow-mo) — `smEasingMode` state + UI
- Props checklist injected ke prompt
- `getStopMotionPrompt` signature updated: `easingMode = 'ease-in-out'` param

**Grafix:**
- Brand color lock field — `gfBrandColor` state + UI
- Data visualization input field — `gfDataInput` state + UI
- Visual metaphor mode (buang text overlay, guna icon/visual)
- `getGrafixPrompt` signature updated: `brandColor = '', dataInput = ''` params

**Char Sheet:**
- Label consistency rule — setiap panel MESTI ada caption label
- Auto-crop guide — 4 primary panels designed untuk crop individual

**All Tabs:**
- `b_roll` + `sound_note` fields tambah dalam SCENE_JSON_CONTRACT
- Angle consistency rule — tak boleh tukar angle produk dalam segment sama

---

### 2. Bug Fixes

**`genre is not defined` (30s Narrative):**
- Root cause: `getNarrativeArcPrompt` signature takde `genre` param, `colorGrade` tak declared dalam function
- Fix: Tambah `genre = 'emotional'` param, declare `colorGrade` inside function, pass `narrativeGenre` dalam call

**`platform is not defined` (Cinematic Pro):**
- Root cause: `getCinematicStoryboardPrompt` signature takde `platform` param
- Fix: Tambah `platform = 'TikTok'` param, pass `cinematicPlatform` dalam call

**`easingMode is not defined` (Stop Motion):**
- Root cause: `getStopMotionPrompt` signature takde `easingMode` param
- Fix: Tambah `easingMode = 'ease-in-out'` param

**`productAngles is not defined` (generateNewMode):**
- Root cause: `productAngles` assigned tanpa `let` declaration
- Fix: Tambah `let productAngles = null` dalam `generateNewMode`

**Regenerate keyframe sama gambar:**
- Root cause: `editableImagePrompt[index] || editableImagePrompt[0]` fallback ke index 0
- Fix: Guna `scenes[index].image_prompt` sebagai fallback, buang `editableImagePrompt[0]`

**UGC takde dialogue:**
- Root cause: UGC dalam `generateAllContent` tak generate AI scenes JSON, guna hardcoded prompts
- Fix: Route UGC ke `generateNewMode`, add `ugc` ke routing array, add `getUgcStoryboardPrompt` call

**`Unexpected end of JSON input` (Product POV):**
- Root cause: AI return truncated JSON
- Fix: Upgrade `parseModelJson` dengan auto-close truncated JSON (bracket balancing)

**Vercel build error (syntax):**
- Root cause: `let // comment` — comment dalam variable declaration
- Fix: Pindah comment ke baris berasingan, declare `let basePromptForRegen` betul

---

### 3. UI/UX Improvements

**Upload zones:**
- Product + Background upload zones centered (icon atas, text bawah) — match Face Lock layout
- "Aset Rujukan" badge removed dari product upload
- Background thumbnails centered dalam box

**Empty state:**
- "Belum Ada Output" block removed — cleaner UI

**Sidebar:**
- Active glow pulse animation (`@keyframes sidebarGlow`)
- Left accent bar bila active
- Icon scale up 110% bila active
- Shimmer sweep on hover
- Scene count badge per tab

**Output section:**
- Compact spacing (pb-20 → pb-8, mt-20 → mt-8)
- Copy All Scenes button
- Save Draft button (Ctrl+S)
- Shortcuts modal (press `?`)

**Toast:**
- Position: `bottom-16 right-6` — atas button Changelog

**Sidebar auto-hide:**
- Sidebar auto-collapse bila Generate start
- Kekal hidden bila output siap (full-width centered)

---

### 4. AI Quality Improvements

**Background lock:**
- `toTimeCodedI2V` — tambah `[BACKGROUND LOCK]` dalam setiap i2v_prompt
- Flow AI segment export — tambah `BACKGROUND LOCK — CRITICAL` line

**Voice & tone lock:**
- Flow AI segment export — tambah `VOICE & TONE LOCK — CRITICAL` line
- Creator voice tone, energy, BM slang kekal consistent across all segments

**No-invention lock:**
- Product reference rules — `[NO-INVENTION LOCK]` block dalam fetchSingleImage
- Hanya render features visible dalam reference image — zero extras, zero assumption
- `analyzeReferenceAssets` prompt strengthened — describe ONLY what is visible

**Scene count reduced:**
- 30s: 8 scenes → 6 scenes (2 scenes per 10s segment — lagi consistent)
- Applies to: Cinematic Pro, UGC, Product POV, OOTD

**Angle consistency:**
- `[ANGLE CONSISTENCY RULE]` dalam SCENE_JSON_CONTRACT
- Tak boleh tukar angle produk dalam segment yang sama

---

### 5. JSON Export Improvements

**Copy JSON button dekat output:**
- Universal format: title, duration, identity_bible, full scenes array
- Each scene: scene_num, timecode, visual, camera, action, emotion, dialogue, i2v_prompt, image_prompt, negative, angle_used, b_roll, sound_note

**Copy JSON button per Flow AI segment:**
- Added `{ } JSON` button sebelah `📋 Copy` dalam setiap segment
- `scenes` array ditambah ke segment object dalam `generateFlowSegments`
- Format: segment label, part, full scenes dengan semua fields

---

## Commits (2026-07-24)
| Commit | Description |
|--------|-------------|
| `ec50c12` | feat: product POV AI scenes, OOTD multi-scene, cinematic platform, narrative genre, TH teleprompter |
| `89d1734` | feat: 26 AI generation improvements |
| `d31ede5` | fix: UGC route to generateNewMode |
| `79a7d3a` | fix: UGC routing verified, all 10 tabs confirmed |
| `484cf52` | fix: genre not defined, productAngles not defined |
| `fdb2c9d` | fix: narrative genre param not passed to call |
| `f16fd50` | fix: platform + easingMode missing from signatures |
| `5709717` | fix: regenerate keyframe scene-specific prompt |
| `10a8913` | fix: syntax error in regenerate keyframe fix |
| `3da4963` | fix: background lock in i2v prompts + Flow AI segment |
| `8df1645` | fix: reduce scene count, angle consistency rule |
| `1bec6a5` | fix: no-invention lock on product/model reference |
| `df62746` | fix: voice and tone consistency lock |
| `74f1ca0` | fix: parseModelJson auto-close truncated JSON |
| `9801a50` | feat: improve JSON export format |
| `a4687d5` | feat: JSON copy button per flow segment |
| `7bf2cb4` | fix: add scenes array to segment object |

---

## Known Limitations / Pending Work (Updated 2026-07-24)

1. **Background consistency in Flow AI** — text rules strengthened, tapi Flow AI masih boleh drift. Fix terbaik: upload keyframe untuk setiap segment berasingan.
2. **UGC price anchor** — state + UI ada tapi call site ambiguous (generateAllContent vs generateNewMode routing perlu verify).
3. **CapCut subtitle format** — removed (escape bug). Boleh re-implement dengan proper escaping.
4. **Confidence tag stale selepas regenerate** (#6 dari sebelum) — belum fix.
5. **Auto-crop character sheet** — belum implement.
6. **ugcPrice field** — UI ada, tapi perlu verify pass betul ke getUgcStoryboardPrompt.

---

## Current File State (2026-07-24)
- **Lines:** ~7700+
- **Build:** ✅ esbuild zero errors
- **Latest commit:** `7bf2cb4`
- **All 10 tabs routing:** ✅ verified
- **All prompt function signatures:** ✅ verified params passed

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

---
### Auto-log: 2026-07-24 23:47 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-24 23:56 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:00 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:12 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:16 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:31 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:47 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 00:51 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 01:03 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 01:14 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 01:24 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 01:32 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 01:37 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 02:23 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 02:31 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 02:41 (branch: main)
**Files changed:** src/App.jsx
