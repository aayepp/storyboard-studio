const fs = require('fs');
const path = 'C:\\Users\\SV\\Desktop\\storyboard-studio\\src\\App.jsx';
let c = fs.readFileSync(path, 'utf8');

// --- 1. Replace DIALOGUE_AUTHENTICITY_RULES ---
const oldDialogue = c.match(/const DIALOGUE_AUTHENTICITY_RULES = `[\s\S]*?`;/);
if (oldDialogue) {
  const newDialogue = `const DIALOGUE_AUTHENTICITY_RULES = \`
DIALOGUE RULES (MANDATORY):
- Dialogue must sound naturally spoken.
- For Malay: use natural conversational Malay.
- Avoid: formal Malay, corporate Malay, textbook Malay, robotic phrasing, advertising-copy dialogue.
- Preferred length: 10 to 20 words per dialogue line.
- Maximum: 20 words per dialogue line.
- Dialogue must fit scene duration — calculate ~3 words/sec for natural BM speech.
- If dialogue is unnecessary for a scene: Dialogue: "—"
- Include natural Malay fillers sparingly: eh, kan, tau tak, sumpah, gila, weh.
- Each scene's dialogue must have DIFFERENT emotional energy than the previous scene.
- NEVER start consecutive scenes with the same word or phrase type (question, statement, filler).

ZERO REPETITION RULES (CRITICAL FOR FLOW AI):
- Every sentence of dialogue across ALL scenes must be UNIQUE.
- NEVER reuse the same phrase, sentence structure, or wording pattern in any two scenes.
- Each scene's dialogue must communicate a DIFFERENT piece of information.
- If Scene1 talks about a problem, Scene2 must talk about discovery, Scene3 about experience, Scene4 about result.
- Think of dialogue as a story staircase: each scene climbs to a NEW step.
- Before writing, scan all dialogue and VERIFY no two scenes share the same core message.
- Every scene MUST add NEW value/insight that wasn't mentioned before.

SEGMENT-TO-SEGMENT BRIDGE RULES (MANDATORY):
- The LAST line of dialogue in segment N MUST logically flow into the FIRST line of dialogue in segment N+1.
- Use bridging transitions: "so...", "lepas tu...", "tapi yang best nya...", "then...", "pastu..."
- If segment N ends with a question, segment N+1 MUST start with an answer.
- NEVER end a segment with "ok tu je" or "so yeah" — every segment ending must bridge to the next.
- Think of it as a single continuous conversation cut into pieces — seamless across ALL cuts.

CLEAN DIALOGUE RULES:
- NO repeated fillers across scenes: If Scene1 uses "weh", Scene2 must NOT use "weh".
- FILLER ROTATION: eh, kan, tau tak, ah, weh, sumpah, gila, serious, best. Max 1 filler per scene. Never reuse same filler across ALL scenes.
- NO CLICHÉ OPENINGS: Do NOT repeatedly start scenes with "Weh korang!", "Sumpah ah!", "Gila weh!".
- Vary opening words: start with a question, start mid-sentence, start with a reaction, start with an observation, start with a claim.
- DIALOGUE HIERARCHY: Each scene's dialogue must serve: HOOK → BUILD → PROVE → CLOSE.
- WORD CHOICE VARIETY: If Scene1 says "premium", Scene2 must say "quality" or "worth it". Never use same adjective across different scenes.
\`;`;
  c = c.replace(oldDialogue[0], newDialogue);
  console.log('✓ Replaced DIALOGUE_AUTHENTICITY_RULES');
}

// --- 2. Replace camera options ---
const newCamOpts = '- Available: Extreme Close Up, Close Up, Medium Shot, Medium Wide Shot, Wide Shot, Drone Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Dolly Out, Push In, Pull Back, Handheld, Static, Low Angle, High Angle, Top Down, Macro Shot, Whip Pan, Orbit Shot, Rack Focus, Crane Shot, Dutch Angle, Locked-Off Shot.\n- Avoid repetitive framing. Use camera movement strategically.\n- Use at least 4 different camera types';

let camCount = 0;
c = c.replace(/- Available: Extreme Close Up, Close Up, Medium Shot, Wide Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Low Angle, High Angle, Top Down, Macro, Handheld, Orbit Shot, Whip Pan\.\n- Vary strategically: close-up for emotion, wide for context, POV for immersion, tracking for energy\.\n- Use at least 4 different camera types/g, () => { camCount++; return newCamOpts; });

c = c.replace(/- Available: Extreme Close Up, Close Up, Medium Shot, Wide Shot, POV, Tracking Shot, Dolly In, Low Angle, High Angle, Macro, Handheld\.\n/g, () => { camCount++; return '- Available: Extreme Close Up, Close Up, Medium Shot, Medium Wide Shot, Wide Shot, Drone Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Dolly Out, Push In, Pull Back, Handheld, Static, Low Angle, High Angle, Top Down, Macro Shot, Whip Pan, Orbit Shot, Rack Focus, Crane Shot, Dutch Angle, Locked-Off Shot.\n- Avoid repetitive framing. Use camera movement strategically.\n'; });

c = c.replace(/- Available: Extreme Close Up, Close Up, Medium Shot, Wide Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Low Angle, High Angle, Macro, Handheld\.\s*\n\s*\n/g, () => { camCount++; return '- Available: Extreme Close Up, Close Up, Medium Shot, Medium Wide Shot, Wide Shot, Drone Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Dolly Out, Push In, Pull Back, Handheld, Static, Low Angle, High Angle, Top Down, Macro Shot, Whip Pan, Orbit Shot, Rack Focus, Crane Shot, Dutch Angle, Locked-Off Shot.\n- Avoid repetitive framing. Use camera movement strategically.\n\n'; });
console.log('✓ Updated camera options (' + camCount + ' occurrences)');

// --- 3. Add new rules after DIALOGUE_AUTHENTICITY_RULES ---
const visualRulesBlock = `
const VISUAL_RULES = \`
VISUAL RULES (MANDATORY):
Every scene MUST include: Visual, Camera, Action, Emotion, Dialogue.
Visual descriptions must be concrete and include relevant:
- character appearance, positioning, expression
- environment/location name
- lighting quality and direction
- foreground elements
- background details
- props and set dressing
- product placement and orientation
- time of day
- weather conditions
- texture details (fabric, surface, material)
- color palette and mood
- scale relationships
- movement type and energy
- camera framing justification

Do NOT describe plain white backgrounds. Fill the frame with the scene environment as specified.
\`;

const RETENTION_RULES = \`
RETENTION RULES (MANDATORY):
Scene 1 must create immediate interest using one of:
- unexpected movement or action mid-frame
- unfinished action (viewer needs to see what happens next)
- emotional tension or human reaction
- visual contradiction or unusual scale
- mystery or transformation beginning
- sensory imagery (texture, sound implication, touch)
- pattern interruption (something viewers don't expect)
- immediate consequence of an unseen event
Do NOT open with generic talking-to-camera unless the topic demands it.
Every scene must create a reason to watch the next scene — cliffhanger, curiosity gap, or emotional pull.
\`;

const REFERENCE_CONSISTENCY_RULES = \`
REFERENCE IMAGE CONSISTENCY (MANDATORY):
If reference image exists, maintain across ALL scenes:
- character design, wardrobe, and color palette
- mood, lighting direction, and art direction
- lens feeling, composition, and texture
- environment and visual era
- overall appearance and brand identity
Do NOT change unless explicitly requested.
Never redesign, recolor, or replace with generic version of the uploaded reference.
\`;

const CAMERA_OPTIONS = [
  'Extreme Close Up', 'Close Up', 'Medium Shot', 'Medium Wide Shot', 'Wide Shot',
  'Drone Shot', 'POV', 'Over Shoulder', 'Tracking Shot', 'Dolly In', 'Dolly Out',
  'Push In', 'Pull Back', 'Handheld', 'Static', 'Low Angle', 'High Angle',
  'Top Down', 'Macro Shot', 'Whip Pan', 'Orbit Shot', 'Rack Focus',
  'Crane Shot', 'Dutch Angle', 'Locked-Off Shot'
];
`;

c = c.replace(
  "const getRandomHookAngle = () => getRandomElement(HOOK_ANGLES);",
  visualRulesBlock + "\n\n" + "const getRandomHookAngle = () => getRandomElement(HOOK_ANGLES);"
);
console.log('✓ Added VISUAL_RULES, RETENTION_RULES, REFERENCE_CONSISTENCY_RULES, CAMERA_OPTIONS');

// --- 4. Write back ---
fs.writeFileSync(path, c, 'utf8');
console.log('✅ Done! All rules updated.');
