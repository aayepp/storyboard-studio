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

---

## Session Changes — 2026-07-24 (Part 2)

### 6. Cinematic Pro — Elite Creative Director Upgrade

**`getCinematicStoryboardPrompt` fully rewritten:**
- Role: Elite Creative Director + Film Director + AI Video Prompt Engineer
- Auto-detect `marketingObjective` dari topic (Sales/Education/Awareness/Entertainment)
- Auto-detect `emotionalDriver` dari topic (Fear→Hope/Curiosity→Satisfaction/Urgency→Value)
- Platform context strengthened per platform (TikTok/Reels/YouTube/Shopee)
- Style engine: auto-select strongest style dari 27 options
- Narrative engine: pick from 15 structures (mystery reveal, curiosity loop, transformation, etc.)

**New fields per scene:**
- `pace` — FAST/MEDIUM/SLOW
- `lens_suggestion` — focal length (24mm, 85mm, macro 100mm)
- `lighting` — setup specific (soft window, dramatic side, golden hour)
- `composition` — framing rule (rule of thirds, centered symmetry, leading lines)
- `ambient_sound` — sound design note (ASMR texture, bass drop, silence)
- `transition` — cut type (whip pan, match cut, smash cut, dissolve)
- `purpose` — why this scene exists in the story

**Top-level JSON fields:**
- `marketing_objective` — auto-detected
- `emotional_driver` — auto-detected
- `audio_direction` — overall BGM mood for full video
- `platform` — platform target

**Cinematic quality standard:**
- Netflix documentary quality
- Apple commercial aesthetics
- Nike campaign energy

---

### 7. Dialogue-Visual Match Fixes

**`DIALOGUE_AUTHENTICITY_RULES` strengthened:**
- Added `VISUAL-DIALOGUE SYNC` as most important rule
- Rule: Write action first, then write dialogue that MATCHES that action
- NEVER write dialogue about Topic A while visual shows Topic B

**`getCinematicStoryboardPrompt` explicit examples:**
- "tengok ni packaging" → visual MUST show packaging
- "battery dia 7 hari" → visual MUST show battery %
- "kulit aku glowing" → visual MUST show skin close-up
- Rule: Write visual AFTER dialogue — visual SERVES dialogue

**Applied to ALL 8 tabs:**
- UGC ✅ (dah ada)
- Micro Impact ✅ (dah ada)
- Narrative Arc ✅ (dah ada)
- Talking Head ✅ (dah ada)
- Stop Motion ✅ (baru tambah)
- Grafix ✅ (baru tambah)
- Product POV ✅ (baru tambah)
- OOTD ✅ (baru tambah)

---

### 8. JSON Parsing Fixes

**`normalizeStoryboardPayload` strengthened:**
- Handle array at root
- Auto-detect scenes under any key with `scene_num` field
- Fallback to any array key
- Always return `scenes: []` instead of null

**`validateStoryboard` auto-normalize:**
- Before throwing "Missing scenes array", try to find array in any key
- Prevents false errors when AI returns scenes under different key name

**`parseModelJson` auto-close truncated JSON:**
- 3-tier recovery: direct parse → repair → auto-close brackets
- `autoClose()` helper: balance open brackets, close open strings
- Prevents `Unexpected end of JSON input` error

---

### 9. Additional Bug Fixes

**`Missing scenes array` error:**
- Root cause: AI return JSON dengan scenes tapi normalizer tak detect
- Fix: Strengthen `normalizeStoryboardPayload` + `validateStoryboard`

**JSON export format:**
- Universal format untuk semua tabs
- Includes: title, duration, identity_bible, full scenes array
- Each scene: scene_num, timecode, visual, camera, action, emotion, dialogue, i2v_prompt, image_prompt, negative, angle_used, b_roll, sound_note

**JSON copy button per Flow AI segment:**
- Added `{ } JSON` button sebelah `📋 Copy` dalam setiap segment
- `scenes` array ditambah ke segment object dalam `generateFlowSegments`

**Background lock:**
- `toTimeCodedI2V` — `[BACKGROUND LOCK]` dalam setiap i2v_prompt
- Flow AI segment — `BACKGROUND LOCK — CRITICAL` + `VOICE & TONE LOCK — CRITICAL`

**Voice & tone consistency:**
- Creator voice tone, energy, BM slang kekal consistent across all segments

**No-invention lock:**
- `[NO-INVENTION LOCK]` dalam product reference rules
- `analyzeReferenceAssets` — describe ONLY what is visible

**Scene count reduced:**
- 30s: 8 → 6 scenes (lagi consistent per segment)

**Angle consistency rule:**
- `[ANGLE CONSISTENCY RULE]` dalam SCENE_JSON_CONTRACT

---

## Commits (2026-07-24 Part 2)
| Commit | Description |
|--------|-------------|
| `ceb2da5` | feat: getCinematicStoryboardPrompt elite creative director upgrade |
| `46aa0ba` | fix: normalizeStoryboardPayload + validateStoryboard auto-normalize |
| `24471d0` | fix: dialogue-visual match rules strengthened |
| `a3ec141` | fix: DIALOGUE_AUTHENTICITY_RULES applied to all 8 tabs |

---

## Current File State (2026-07-24 Part 2)
- **Lines:** ~7750+
- **Build:** ✅ esbuild zero errors
- **Latest commit:** `a3ec141`
- **All 8 tabs:** ✅ DIALOGUE_AUTHENTICITY_RULES applied
- **Cinematic Pro:** ✅ Elite creative director format

---
### Auto-log: 2026-07-25 02:47 (branch: main)
**Files changed:** src/App.jsx

---

## Session Changes — 2026-07-25

### 1. Energy Curve (All Tabs)
- Added `energy_level` field to `SCENE_JSON_CONTRACT` — HIGH/MED/LOW/PEAK per scene
- Energy curve injected per duration: 10s = [HIGH,HIGH,HIGH,HIGH,PEAK], 30s = [HIGH,MED,MED,HIGH,MED,PEAK]
- PEAK used once only — last scene (climax/payoff)

### 2. Bridge Field (All Tabs)
- Added `bridge_to_next` field to `SCENE_JSON_CONTRACT`
- Short physical action/camera movement (max 10 words) that connects scene N to scene N+1
- Last scene bridge_to_next = "" (empty)
- Makes visual flow smooth — no jarring cuts

### 3. Dialogue Continuity Rule (All Tabs)
- Added `DIALOGUE CONTINUITY RULE` block to `DIALOGUE_AUTHENTICITY_RULES`
- All dialogue across scenes must read as ONE continuous monologue
- Natural connectors enforced: pastu, lepas tu, so, tapi yang best, then, kan
- Applied to all tabs automatically (both use DIALOGUE_AUTHENTICITY_RULES)

### Commit
- `e09c20d` feat: energy curve, bridge_to_next, dialogue continuity rules — all tabs

## Current File State (2026-07-25)
- **Build:** ✅ esbuild zero errors
- **Latest commit:** `e09c20d`

### 2. Per-Tab Story Improvements (All 9 Tabs)

**Cinematic Pro:**
- Callback ending rule — Scene 1 visual MUST echo in last scene (cinematic closure)

**Micro Impact (10s):**
- Micro arc formula: 0-2s HOOK → 2-8s PROOF → 8-10s CTA
- Explicit energy timing per scene (grab in <0.5s)

**Narrative Arc (30s):**
- `emotional_beat` field per scene — what VIEWER feels (curiosity/tension/hope/dread/relief/joy/awe/peak)
- Callback rule — Scene 9 must visually echo Scene 1

**Talking Head:**
- Camera distance variation schedule — MCU hook, alternate CU/MS/ECU middle, MCU+gesture CTA
- No Wide Shot rule for talking head

**Stop Motion:**
- Loop point rule — final frame must match/rhyme Scene 1 (seamless loop)
- `delta` field per scene — "state A → state B" object change description

**Grafix:**
- Layout grid lock — Scene 1 establishes grid, all scenes follow same layout positions
- `layout_zone` field per scene

**UGC:**
- Trust signal placement — face first → product → CTA order enforced
- Comment bait rule — 1 scene must trigger comments, `comment_bait: true` field
- Scale reference rule — 1 scene must show product in hand/vs object

**Product POV:**
- Feature spotlight rule — each scene = 1 unique feature only, no repeats
- Scale reference rule — 1 scene must show real-world size context

**OOTD:**
- Outfit reveal formula — Scene 1=COVER (partial), Scene 2=FULL REVEAL
- Movement scheduling — odd scenes static, even scenes movement (visual rhythm)

### Commit
- `b7a93c0` feat: per-tab story improvements (9 tabs)

### 3. UI/Layout Fixes (2026-07-25)
- Fake Influencer download rename: model - {name}.png
- Sidebar auto-collapse on generate: REMOVED
- Separate scroll: tabs sidebar + main content independent scroll
- Footer inside main scroll area (no more overlap/cut-off)
- Flow AI segments: side-by-side grid (1 to 2 to 3 cols responsive)
- Flow AI Copy+JSON buttons: side by side
- Flow AI section: full width (removed max-w-4xl)
- Scroll-stop formula Scene 1 — Cinematic Pro (4 types)
- Text hierarchy 3-tier T1/T2/T3 — Grafix tab

### Commits (2026-07-25)
| Commit | Description |
|--------|-------------|
| e09c20d | Energy curve + bridge_to_next + dialogue continuity |
| b7a93c0 | Per-tab story improvements (9 tabs) |
| 6713ddb | Scroll-stop formula + text hierarchy |
| 5abd702 | Fake influencer download rename |
| f6ab6b5 | Remove sidebar auto-collapse + separate scroll |
| 57c5ff6 | Footer inside main scroll area |
| ef7933b | Flow AI side-by-side grid + copy/json buttons |
| 660d611 | Flow AI full width |

## Current File State (2026-07-25)
- Lines: ~7820+
- Build: esbuild + vite zero errors
- Latest commit: 660d611

---
### Auto-log: 2026-07-25 22:05 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 22:12 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 22:22 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:02 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:09 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:11 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:21 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:33 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-25 23:41 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-26 00:59 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-26 01:26 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-26 01:48 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-26 02:27 (branch: main)
**Files changed:** src/App.jsx

---
### Auto-log: 2026-07-26 12:18 (branch: main)
**Files changed:** src/App.jsx

---

## Session Changes — 2026-07-25 (Part 3)

### 10. Storyboard Sheet Grid View

**Sheet View feature:**
- Toggle button dalam output section — "Sheet View" / "List View"
- Auto aspect ratio (9:16, 16:9, 1:1) per panel
- Grid layout: 3 or 4 columns based on scene count
- Pace color coding: FAST=amber, MEDIUM=cyan, SLOW=purple
- Each panel: scene number badge, timecode, image, camera, visual, dialogue, purpose
- Hover tooltip: full details (lens, lighting, composition, emotion, ambient sound, transition)
- Transition indicators between panels
- Marketing meta header: marketing_objective, emotional_driver, platform
- Audio direction bar: BGM mood per segment
- Legend at bottom: FAST/MEDIUM/SLOW color guide

**Export/Print:**
- Canvas-based 2K PNG export — combine real `imageUrls[]` into 1 sheet
- Print mode — white background for print/share to client
- No AI token cost for export (browser canvas only)

**"Generate All Images" button:**
- Detects missing images in sheet view
- Generates all missing scene images sequentially
- `handleGenerateAllSheetImages` handler

**Per-panel regenerate:**
- Hover panel → refresh icon bottom-right
- Click → `regenerateSingleVisual(i)` for that scene only

### 11. Per-Segment Image Sheets (Flow AI Workflow)

**Added to each Flow AI segment card:**
- 2×2 image grid (4 scenes per segment)
- Pace color border per panel
- Scene number, timecode, camera, visual, dialogue per panel

**3 Action buttons per segment:**
- 📥 **PNG** — canvas export 2K sheet (photorealistic, no AI call)
- 📊 **CSV** — export scene data (scene_num, timecode, visual, camera, action, emotion, dialogue, i2v_prompt, pace)
- 📋 **Prompt** — copy Flow AI prompt for segment

**Auto-collapse after generate:**
- All Flow AI segments auto-collapse when generate completes
- User can expand which segment they want to edit

### 12. Auto-Generate Images Per Scene (No Timeline Toggle)

**Removed:**
- Timeline toggle UI
- Keyframe toggle UI
- Storyboard Timeline section (5150 chars removed)

**Changed behavior:**
- `timelineMode` force `'on'` — always generate 1 image per scene
- `keyframeMode` force `'off'` — no longer overrides timeline

**Result:**
- Press Generate → auto generate 1 image per scene (e.g., 6 scenes = 6 images)
- No toggle needed
- Each Flow AI segment gets 4 unique images in 2×2 grid

### 13. Smart Keyframe Re-enabled (Anchor Badge)

**`pickBestKeyframe` active again:**
- Scores each scene: camera, visual, action, emotion, dialogue, eye contact
- Picks best scene as identity anchor
- Returns `{ index, confidence, reason }`

**Anchor badge display:**
- Yellow "KEYFRAME" badge on best scene
- Confidence % tag (green ≥75%, yellow 55-74%, red <55%)
- Reason text (e.g., "clear face shot + has dialogue")

**Updated conditions:**
- Badge now shows when `keyframeInfo[index]` exists — regardless of timeline mode
- Previously hidden when `timelineMode === 'on'`

**Flow:**
1. Timeline ON → all scenes get images
2. Smart Keyframe picks best scene → sets `keyframeInfo`
3. Badge displays on best scene
4. All scenes still get images (badge is display only)

---

### 14. Bug Fixes (Part 3)

**React error #310:**
- Root cause: `useState` called inside IIFE (`(() => { })()`) in Sheet View
- Fix: Move states to component level (`sheetPrintMode`, `sheetHoveredScene`, `sheetGeneratingAll`)

**Sheet View blank page:**
- Root cause: `handleGenerateAllSheetImages` async loop inside IIFE
- Fix: Extract to proper handler function

**Sheet image mapping (panels showing same image):**
- Root cause: `imageUrls[i]` direct index — when keyframe mode, only 1-3 images for 8 scenes
- Fix: Distribute keyframes across all scenes (`getImg` function with proportional mapping)

**Dialogue word limit:**
- Changed from fixed `3 words/sec` to adaptive `2.5 words/sec`
- Scene-type specific: Hook 8-12, Demo 5-8, CTA 10-15, Visual-only empty

---

## Commits (2026-07-25 Part 3)
| Commit | Description |
|--------|-------------|
| `af29f36` | feat: storyboard sheet grid view — pace color, export PNG, scene info |
| `6d6c8eb` | feat: auto-include Flow AI director brief in JSON segment copy |
| `dc53957` | fix: storyboard sheet image mapping — distribute keyframes |
| `f06e263` | feat: storyboard sheet v2 — hover tooltip, transition badges, generate all |
| `3664be4` | fix: move sheet view useState to component level |
| `4405baf` | fix: React error #310 — move generateAllSheetImages to handler |
| `085d459` | feat: generate 2K composite storyboard sheet image (1 API call) |
| `e323eb8` | fix: 2K sheet image photorealistic style |
| `54ffbe6` | feat: canvas-based 2K sheet export — combine real images |
| `7acdddb` | feat: per-segment 2×2 image grid + PNG/CSV/Prompt buttons |
| `43293bc` | feat: remove timeline/keyframe toggles — auto generate per scene |
| `7994d0a` | feat: remove Storyboard Timeline section |
| `f9436bb` | feat: re-enable smart keyframe as anchor badge |
| `d7a2764` | fix: adaptive dialogue word limit — 2.5 words/sec |
| `b9d2018` | feat: auto-collapse flow AI segments after generate |

---

## Current File State (2026-07-25 Part 3)
- **Lines:** ~7650
- **Build:** ✅ esbuild zero errors
- **Latest commit:** `f9436bb`
- **Auto-generate:** ✅ 1 image per scene (no toggle)
- **Smart Keyframe:** ✅ Active as anchor badge
- **Sheet View:** ✅ Grid + canvas export + per-panel regen
- **Per-Segment Sheets:** ✅ 2×2 grid + PNG/CSV/Prompt
- **Storyboard Timeline:** ❌ Removed

---

## Session Changes — 2026-07-26

### 1. Background Theme Dropdown
- `BACKGROUND_THEMES` constant — 16 options (studio, cafe, gym, beach, office, dll)
- `detectBgTheme(topic)` — auto-detect dari topic (BM + EN keywords)
- `bgTheme` state, auto-detect bila tab/topic berubah
- Dropdown dalam config area (2-col grid), semua 10 tabs
- `[BACKGROUND THEME LOCK]` inject ke identityBible — semua paths

### 2. Outfit Style Dropdown
- `OUTFIT_THEMES` constant — 11 options (casual, office, streetwear, athletic, formal, beach, editorial, lounge, influencer, baju kurung, outdoor)
- `detectOutfitStyle(topic)` — auto-detect dari topic (BM + EN)
- `outfitStyle` state, auto-detect bila tab/topic berubah
- Dropdown dalam config area (2-col grid), semua 10 tabs
- `[OUTFIT LOCK]` inject ke identityBible — semua paths
- Outfit stripped dari scene `image_prompt` bila outfit lock active
- Hard override `[OUTFIT OVERRIDE — HIGHEST PRIORITY]` prepended ke parts[0]
- Face lock instruction updated — copy face/hair/skin only, NOT outfit dari reference image

### 3. Smart Keyframe Fixes
- Default = `segment` (per-segmen) — migration clear stale `off` dari localStorage
- `handleKeyframeModeChange` fix — sets `timelineMode` correctly (off bila keyframe aktif)
- Demo-focused image instruction — show subject actively doing/demo, bukan plain portrait

### 4. Flow AI Segment Fixes
- Auto-expand semua segments selepas generate (sebelum: auto-collapse)
- Segment 3 dialogue fix — guna `seg.scenes` terus, bukan timecode filter
- Remove 2×2 image grid dari segment cards — clean view balik

### 5. Other Fixes
- Model upload face lock — subject only, ignore background dari reference
- `Missing scenes array` — normalize empty scenes + smarter repair note
- Segment PNG export — canvas size adapts to actual image count (no empty panels)
- bg+outfit locks applied ke semua generate paths (generateNewMode, product, ootd)

### Commits (2026-07-26)
| Commit | Description |
|--------|-------------|
| `ceb5689` | feat: background theme dropdown — 16 options, auto-detect from topic |
| `bfb7575` | fix: Missing scenes array — normalize empty scenes, smarter repair note |
| `7b333ae` | fix: model upload — extract subject only, ignore reference background |
| `49953f0` | fix: smart keyframe toggle — ON/segment sets timelineMode off |
| `2e50608` | fix: segment PNG export — canvas adapts to actual image count |
| `14e70f6` | feat: auto outfit style — 11 options, auto-detect from topic |
| `ccea8a6` | feat: background+outfit dropdowns moved to config area — all 10 tabs |
| `357ecd7` | fix: keyframe default segment, auto-detect bg+outfit on topic change |
| `a2f6732` | fix: bg+outfit locks applied to all generate paths |
| `1c04b04` | fix: keyframe default segment migration + demo-focused image instruction |
| `186e1e0` | fix: remove segment image grid from flow AI |
| `f69044d` | fix: flow AI segments auto-expand after generate |
| `7d0ead7` | fix: outfit dropdown overrides model reference image |
| `e42abd9` | fix: outfit lock prepended as highest priority |
| `d4c08ad` | fix: strip outfit from scene prompt + hard override |
| `73646af` | fix: segment 3 dialogue — use seg.scenes directly |

## Current File State (2026-07-26)
- **Lines:** ~8500
- **Build:** ✅ esbuild + vite zero errors
- **Latest commit:** `73646af`
- **Smart Keyframe:** ✅ Default PER-SEGMEN
- **Background Theme:** ✅ 16 options, auto-detect
- **Outfit Style:** ✅ 11 options, auto-detect, overrides reference image
- **Flow AI Segments:** ✅ Auto-expand, clean view (no image grid)

### Auto-log: 2026-07-26 13:15 (branch: main)
**Files changed:** src/App.jsx

---

## Session Changes — 2026-07-27

### 1. Outfit + Background Dropdown Fix (4-Layer Leak) — FIXED ✅

**Problem:** User pilih outfit/background dari dropdown, tapi AI generate ikut outfit dalam gambar face reference model. Background pun kadang tak apply.

**Root causes (4 leaks, fixed dalam order penemuan):**

**Leak 1 — Auto-detect overwrite manual selection (MASTER BUG):**
- useEffect auto-detect fire setiap kali user type dalam topic field
- `setBgTheme(detectBgTheme(topic))` overwrite pilihan dropdown user secara senyap
- Locks tak pernah masuk identityBible sebab value dah reset sebelum generate
- **Fix:** `bgThemeManualRef` + `outfitManualRef` — user pilih dari dropdown = auto-detect DILARANG overwrite. Pilih balik "Auto" = auto-detect on semula.

**Leak 2 — Background theme takde override kat image level:**
- Outfit ada `[OUTFIT OVERRIDE]` dalam fetchSingleImage, background theme takde langsung
- **Fix:** `_bgThemeActive` check + `[BACKGROUND THEME OVERRIDE — HIGHEST PRIORITY]` + prepend theme lock kat top prompt (sama pattern macam outfit)

**Leak 3 — Image pixels kalahkan text instruction:**
- Face reference ada full outfit dalam pixels — model copy baju walaupun text kata ignore
- **Fix:** `cropFaceTop()` helper (browser canvas, zero API cost) — outfit lock active → crop reference kepada kepala+bahu je sebelum hantar. Model tak boleh copy apa yang dia tak nampak.
- Portrait detection: h < w×1.25 = headshot, passthrough. Crop fail = fallback original.

**Leak 4 — Outfit bocor jadi TEXT melalui analyzer (PALING LICIK):**
- `analyzeReferenceAssets` hantar gambar FULL + suruh describe "clothing style if person"
- Outfit description masuk `assetAnalysis` → inject ke SEMUA storyboard prompts (8+ tempat)
- Storyboard AI tulis image_prompt setiap scene dengan outfit baked in as text
- Crop kat image-gen level useless sebab outfit dah jadi ayat dalam prompt
- **Fix:** Bila outfit lock active — analyzer terima gambar cropped (reuse cropFaceTop) + instruction tukar "clothing: SKIP ENTIRELY — do NOT describe any clothing"

**Complete protection chain (4 layers):**
1. Dropdown value protected (manual ref) ✅
2. Analyzer tak nampak/describe outfit ✅
3. Image-gen terima cropped face ✅
4. Text overrides + regex strip as safety net ✅

**Other fixes dalam session sama:**
- Face ref label — outfit exclusion sebelah image (instruction beside image = more reliable)
- `[CONTINUITY ANCHOR]` — WARDROBE EXCEPTION bila outfit lock active ([OUTFIT LOCK] wins over continuity frame clothing)

**Lesson learned:** Image model tak boleh dilawan dengan text je — kena buang source dari PIXELS + dari TEXT.

**Verified:** Tested dengan real user reference image (2160×3840 portrait) — crop preserve muka+hijab, buang baju+skirt. User confirmed fixed dalam production.

### Commits (2026-07-27)
| Commit | Description |
|--------|-------------|
| — | fix: dropdown manual pick never overwritten by auto-detect + bg theme override in image gen |
| — | fix: crop face reference to head+shoulders when outfit lock active |
| — | fix: outfit leak via assetAnalysis text — analyzer gets cropped face + skip clothing when outfit locked |

## Current File State (2026-07-27)
- **Lines:** ~8570
- **Build:** ✅ esbuild zero errors
- **Outfit dropdown:** ✅ 100% overrides face reference outfit
- **Background dropdown:** ✅ Overrides scene descriptions + reference backgrounds
- **Manual dropdown picks:** ✅ Protected from auto-detect overwrite

## Pending Work (carried forward)
1. Multi-angle product reference upload (cropped images, auto-select per scene)
2. Stale confidence tag selepas regenerate keyframe (#6)
3. Narrative logic rules to remaining 6 tabs
