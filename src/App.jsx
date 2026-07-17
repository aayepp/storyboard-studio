/** Storyboard Studio — Vite + React (GitHub/Vercel Ready) */
import React, { useState, useRef, useEffect } from 'react';

const I = ({ name, size = 16, className = '', style = {} }) => React.createElement('span', {
  className,
  style: { fontSize: Math.max(size, 12) + 'px', lineHeight: 1, ...style },
  role: 'img',
  'aria-label': name
}, {
  "Video": "🎬", "Mic": "🎤", "Hash": "#️⃣", "Copy": "📋", "Check": "✅",
  "Sparkles": "✨", "Upload": "📤", "Box": "📦", "Shirt": "👕", "RefreshCw": "🔄",
  "Download": "⬇️", "User": "👤", "Maximize": "⛶", "ShieldAlert": "⚠️", "Layers": "📚",
  "Smartphone": "📱", "X": "✖️", "MessageCircle": "💬", "HelpCircle": "❓", "ChevronDown": "🔽",
  "ChevronRight": "▶️", "Camera": "📸", "Briefcase": "💼", "Headphones": "🎧", "Flame": "🔥",
  "CheckCircle": "🟢", "Wand2": "🪄", "Send": "📨", "ShieldCheck": "🛡️", "Code": "💻",
  "Sun": "☀️", "Moon": "🌙", "Film": "🎞️", "ZoomIn": "🔍", "Info": "ℹ️", "UserCheck": "✅👤",
  "ExternalLink": "🔗", "UserPlus": "➕👤", "Eye": "👁️", "Zap": "⚡", "Clock": "🕐",
  "PenTool": "✒️", "Clapperboard": "🎬", "Edit2": "✏️", "Save": "💾", "ChevronLeft": "◀️",
  "FileText": "📄", "Volume2": "🔊", "Image": "🖼️", "Trash": "🗑️"
}[name] || '◆');

const ChevronDown = ({ className = '', size = 16 }) => (
  <span className={className} style={{ fontSize: size + 'px', lineHeight: 1, display: 'inline-block' }}>🔽</span>
);

const ASPECT_RATIOS = [
  { v: '9:16', l: '9:16' },
  { v: '16:9', l: '16:9' },
  { v: '1:1', l: '1:1' }
];

// Added backgrounds array to store multiple environment images
const EMPTY_UPLOAD = { products: [{ name: '', base64: null, mimeType: null }], backgrounds: [], faceFileName: '', uploadedFaceBase64: null, uploadedFaceMimeType: null, useCustomFace: false };
const TAB_UPLOAD_KEYS = ['cinematic_pro', 'microimpact', 'narrativearc', 'talkinghead', 'product', 'ootd', 'ugc', 'stopmotion', 'grafix', 'character', 'fake_influencer'];
const makeEmptyTabUploads = () => Object.fromEntries(TAB_UPLOAD_KEYS.map((k) => [k, { ...EMPTY_UPLOAD, products: [{ name: '', base64: null, mimeType: null }], backgrounds: [] }]));

const _baseCard = 'border rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden transition-colors duration-300 card-hover scroll-reveal';
const _baseIn = 'w-full rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-sky-300 border';
const C = {
  card: (d, mb = 'mb-8') => `${_baseCard} ${mb} ${d ? 'bg-[#11131a] border-gray-800' : 'bg-white border-gray-100'}`,
  label: 'block text-[10px] font-bold mb-2.5 uppercase tracking-widest text-gray-400',
  input: (d) => `${_baseIn} transition-all ${d ? 'bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`,
  select: (d) => `${_baseIn} appearance-none ${d ? 'bg-[#0a0c10] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`,
  h2: (d) => `text-2xl font-bold tracking-tight ${d ? 'text-white' : 'text-gray-800'}`,
  panel: (d) => d ? 'bg-[#0a0c10] border-gray-700' : 'bg-white border-gray-200',
  muted: (d) => d ? 'text-gray-400' : 'text-gray-500',
  field: (d) => d ? 'bg-[#0a0c10] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800',
  p1: (d) => (d ? 'bg-[#0a0c10] border-sky-900/40 text-white' : 'bg-gray-50 border-sky-100 text-gray-800'),
  p2: (d) => (d ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'),
  p3: (d) => (d ? 'bg-[#11131a] border-gray-800' : 'bg-white border-gray-100'),
};
const PINK_GRAD = 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white';

const U = {
  c1: 'absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none',
  c2: 'w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black py-4 rounded-2xl text-lg disabled:opacity-70',
  c3: 'w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold',
  c4: 'block text-[10px] font-bold mb-2.5 uppercase tracking-widest flex items-center gap-1.5 text-gray-400',
  c5: 'text-sm font-bold uppercase tracking-widest text-sky-500 mb-6 flex items-center gap-2',
  c6: 'block text-[10px] font-bold mb-2.5 uppercase tracking-widest text-sky-400',
  c7: 'px-2 py-0.5 rounded text-[10px] bg-sky-900/40 text-sky-400 font-bold',
  c8: 'px-2 py-0.5 rounded text-[10px] bg-gray-700 text-gray-300 font-bold',
  c9: 'px-2 py-0.5 rounded text-[10px] bg-green-500 text-white font-bold',
  c10: 'font-bold text-base text-sky-500 mb-2 flex items-center gap-1.5',
  c11: 'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
  c12: 'flex justify-between items-center mb-1',
  c13: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  c14: 'text-gray-800 dark:text-white',
  c15: 'border-gray-100 dark:border-gray-800',
  c16: 'text-gray-600 dark:text-gray-300',
  c17: 'text-gray-500 dark:text-gray-400',
  c18: 'text-gray-400 dark:text-gray-600'
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const HOOK_ANGLES = [
  'QUESTION HOOK: Open with a bold provocative question that makes the viewer unable to scroll away.',
  'CONTROVERSY HOOK: Start with a contrarian opinion or unexpected take that challenges common belief.',
  'SHOCKING STAT HOOK: Lead with a surprising number, percentage, or fact that shocks the viewer.',
  'MID-STORY DROP: Start in the middle of the action — no intro, no setup, viewer lands in the climax.',
  'SECRET REVEAL: "Ramai tak tau..." / "Nobody told you this..." style — unlock hidden knowledge.',
  'BEFORE/AFTER TEASER: Show or hint at a dramatic transformation to create instant curiosity.',
  'SOCIAL PROOF: Lead with crowd validation — "50K orang dah grab..." / "Viral sebab..."',
  'CONFESSION: Start with vulnerability or admission — "Aku malu nak mengaku tapi..."',
  'CHALLENGE/DARE: Dare the viewer — "Cuba korang buat ni..." / "Bet korang tak tau..."',
  'TIME PRESSURE: Create urgency — "Dalam 3 saat aku nak tunjuk..." / "Sebelum habis stock..."'
];

const getRandomHookAngle = () => getRandomElement(HOOK_ANGLES);

const DIALOGUE_AUTHENTICITY_RULES = `
DIALOGUE STYLE RULES (MANDATORY):
- Write ALL dialogue as if the person is genuinely talking to their close friend on TikTok Live — NOT reading a script.
- Include natural Malay fillers: eh, kan, tau tak, serious ah, gila, weh, macam, nak bagitau, sumpah.
- Avoid formal copywriting tone. No "Hai korang hari ini aku nak share tentang..."
- Each scene's dialogue must have a DIFFERENT emotional energy than the previous scene (curious → excited → shocked → satisfied → urgent).
- Never repeat the same sentence structure or opening word in consecutive scenes.
- Dialogue must feel spontaneous, imperfect, and relatable — like real person talking, not AI-generated ad copy.
- Use incomplete thoughts, self-corrections, and rhetorical questions naturally.
`;

const DEFAULT_NEGATIVE = 'no text overlay, no watermark, no logo text, no extra fingers, no deformed hands, no plastic skin, no blurry face, no cropped head, plain pure white background, empty white void, featureless white studio cyclorama, blank white backdrop, solid white wall only';

const SCENE_ENVIRONMENT_RULES = `
ENV RULES: Every scene MUST take place in the EXACT SAME core location/set. If the action changes, just change the CAMERA ANGLE of the same room/environment. Do not invent new locations. FORBIDDEN plain white/empty studio. image_prompt must name the location, lighting, props. Keep character, product, and background architecture locked across all scenes.`;

const SCENE_JSON_CONTRACT = `Each scene MUST include: scene_num, timecode, visual (EN — must describe LOCATION + lighting + background props), camera, action, emotion, dialogue (BM or ""), image_prompt (EN still — must include full environment, NOT white background), i2v_prompt (EN motion), negative (must ban plain white background).`;

const enrichSceneImagePrompt = (scene, opts = {}) => {
  const {
    aspectRatio = '9:16',
    topic = '',
    mode = '',
    style = '',
    allowWhiteStudio = false
  } = opts;
  const visual = scene.visual || scene.visual_prompt || '';
  const camera = scene.camera || '';
  const action = scene.action || '';
  const emotion = scene.emotion || '';
  const base = scene.image_prompt || scene.imageGenerationPrompt || visual || '';
  const envHint = scene.environment || scene.location || scene.setting || '';
  const topicBit = topic ? `Story topic: ${topic}. ` : '';
  const styleBit = style && style !== 'auto' ? `Visual style: ${style}. ` : '';
  const modeBit = mode ? `Mode: ${mode}. ` : '';
  const envBit = envHint
    ? `Environment/setting: ${envHint}. `
    : 'Environment: fully detailed location matching the scene visual (not white studio). ';
  const banWhite = allowWhiteStudio
    ? ''
    : 'BACKGROUND BAN: Do NOT use plain white, empty studio, or blank backdrop. Fill the frame with the scene environment.';
  return [
    `High-resolution ${aspectRatio} storyboard still frame.`,
    topicBit + modeBit + styleBit,
    base,
    visual && !String(base).includes(String(visual).slice(0, 40)) ? `Scene visual: ${visual}` : '',
    camera ? `Camera: ${camera}.` : '',
    action ? `Action: ${action}.` : '',
    emotion ? `Emotion/mood: ${emotion}.` : '',
    envBit,
    banWhite,
    'Photoreal or design-accurate; match the scene description exactly.'
  ].filter(Boolean).join(' ');
};

const withEnvNegative = (negative = '', allowWhiteStudio = false) => {
  if (allowWhiteStudio) return negative || DEFAULT_NEGATIVE;
  const ban = 'plain white background, empty white void, featureless white studio, blank white backdrop';
  const n = negative || DEFAULT_NEGATIVE;
  return n.includes('plain white') ? n : `${n}, ${ban}`;
};

const stripCodeFences = (text) => {
  let t = (text || '').trim();
  if (t.startsWith('```')) {
    t = t.replace(/^```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '').trim();
  }
  return t;
};

const parseModelJson = (rawText) => {
  let cleanText = stripCodeFences(rawText);
  try {
    return JSON.parse(cleanText);
  } catch (_) {
    const objStart = cleanText.indexOf('{');
    const arrStart = cleanText.indexOf('[');
    let start = -1;
    if (objStart >= 0 && (arrStart < 0 || objStart < arrStart)) start = objStart;
    else if (arrStart >= 0) start = arrStart;
    if (start >= 0) {
      const endChar = cleanText[start] === '{' ? '}' : ']';
      const end = cleanText.lastIndexOf(endChar);
      if (end > start) {
        cleanText = cleanText.slice(start, end + 1);
      }
    }
    const repaired = cleanText
      .replace(/,\s*([}\]])/g, '$1')
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'");
    return JSON.parse(repaired);
  }
};

const normalizeStoryboardPayload = (parsed) => {
  let data = parsed;
  if (Array.isArray(data)) {
    data = { title: '🎬 Papan Cerita Storyboard', duration: 'Kustom', style: 'Auto', scenes: data };
  } else if (data && !data.scenes) {
    const arrayKey = Object.keys(data).find((k) => Array.isArray(data[k]));
    if (arrayKey) data = { ...data, scenes: data[arrayKey] };
  }
  return data;
};

const normalizeScene = (scene, idx, aspectRatio = '9:16', enrichOpts = {}) => {
  const num = scene.scene_num || scene.scene || scene.sceneNumber || scene.number || scene.id || (idx + 1);
  const dialogue = scene.dialogue || scene.dialog || scene.dialogue_text || scene.script || '';
  const visual = scene.visual || scene.visual_prompt || scene.visual_description || scene.description || scene.image_prompt || '';
  const camera = scene.camera || scene.camera_angle || scene.shot || scene.camera_shot || '';
  const action = scene.action || scene.action_description || scene.movement || '';
  const emotion = scene.emotion || scene.emotional_state || scene.mood || scene.expression || '';
  const allowWhite = !!enrichOpts.allowWhiteStudio;
  const negative = withEnvNegative(scene.negative || DEFAULT_NEGATIVE, allowWhite);
  let image_prompt = scene.image_prompt || scene.imageGenerationPrompt || '';
  const looksEmptyOrWhite = !image_prompt.trim() || /plain white|white background|white studio|empty studio|blank backdrop/i.test(image_prompt);
  if (looksEmptyOrWhite || enrichOpts.forceEnrich) {
    image_prompt = enrichSceneImagePrompt({
      ...scene,
      visual,
      camera,
      action,
      emotion,
      image_prompt: image_prompt || visual
    }, { aspectRatio, allowWhiteStudio: allowWhite, ...enrichOpts });
  } else {
    image_prompt = enrichSceneImagePrompt({
      ...scene,
      visual,
      camera,
      action,
      emotion,
      image_prompt
    }, { aspectRatio, allowWhiteStudio: allowWhite, ...enrichOpts });
  }
  const i2v_prompt = scene.i2v_prompt ||
    `Animate this frame ${aspectRatio}. ${action || visual}. Camera: ${camera || 'subtle handheld'}. Keep identity, wardrobe, product, and ENVIRONMENT locked (no white void). Natural motion only.`;
  return {
    ...scene,
    scene_num: num,
    sceneNumber: num,
    timecode: scene.timecode || '',
    visual,
    camera,
    action,
    emotion,
    dialogue,
    image_prompt,
    i2v_prompt,
    negative,
    imageGenerationPrompt: image_prompt
  };
};

const validateStoryboard = (data, expectedSceneCount = null) => {
  if (!data || !Array.isArray(data.scenes) || data.scenes.length === 0) {
    return { ok: false, reason: 'Missing scenes array' };
  }
  
  // Relaxed strict check to prevent 'Expected X scenes, got Y' crashes.
  // The system will dynamically distribute the duration across whatever scenes the AI successfully generates.
  if (expectedSceneCount != null && data.scenes.length !== expectedSceneCount) {
    console.warn(`Notice: Expected ${expectedSceneCount} scenes, but AI generated ${data.scenes.length}. Adapting dynamically.`);
  }
  
  for (let i = 0; i < data.scenes.length; i++) {
    const s = data.scenes[i];
    const visual = s.visual || s.visual_prompt || s.image_prompt || '';
    if (!String(visual).trim()) {
      return { ok: false, reason: `Scene ${i + 1} missing visual` };
    }
  }
  return { ok: true };
};

const buildIdentityBible = ({
  mode = 'general',
  productName = '',
  category = '',
  gender = 'Wanita',
  hijabMode = 'Hijab',
  environment = '',
  style = '',
  assetAnalysis = '',
  extra = ''
}) => {
  const genderEn = (gender === 'Wanita' || gender === 'Female') ? 'young Asian female' : 'young Asian male';
  const hijab = (gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab'
    ? 'wearing a modern aesthetic hijab'
    : 'natural modern hairstyle, no head covering';
  const parts = [
    `[IDENTITY BIBLE — LOCK ACROSS ALL SCENES]`,
    `Mode: ${mode}`,
    productName ? `Product/Subject: ${productName}${category ? ` (${category})` : ''}` : '',
    `Talent: ${genderEn}, ${hijab}`,
    environment ? `Environment baseline: ${environment}` : '',
    style ? `Style: ${style}` : '',
    assetAnalysis ? `Reference analysis: ${assetAnalysis}` : '',
    extra || '',
    `RULES: Same face, age, body type, skin tone, wardrobe colors, product packaging across scenes. Do not redesign the character or product.`,
    `ACCESSORY BAN: Do NOT add any accessories, jewelry, gadgets, headphones, watches, glasses, bags, or props that are NOT explicitly mentioned or visible in the uploaded product reference. Only the uploaded product should appear — no AI-invented extras.`,
    `BACKGROUND RULES: Never default to plain white. Keep the environment/set strictly consistent. If the scene changes, show the EXACT SAME location from a different camera angle. Do not teleport to unrelated rooms.`
  ].filter(Boolean);
  return parts.join('\n');
};

const expectedSceneCountForDuration = (duration, mode = 'default') => {
  const sec = parseInt(duration) || 30;
  if (mode === 'microimpact') return 3;
  if (mode === 'narrativearc') return 6;
  if (mode === 'stopmotion') return 10;
  if (mode === 'grafix') {
    if (sec <= 10) return 3;
    if (sec <= 20) return 4;
    if (sec <= 30) return 6;
    if (sec <= 45) return 9;
    return 12;
  }
  if (mode === 'talkinghead') {
    if (sec <= 10) return 2;
    if (sec <= 20) return 4;
    if (sec <= 30) return 6;
    if (sec <= 45) return 9;
    return 12;
  }
  if (mode === 'ugc') {
    if (sec <= 10) return 3;
    if (sec <= 20) return 4;
    return 6;
  }
  if (sec <= 10) return 3;
  if (sec <= 15) return 4;
  if (sec <= 20) return 4;
  if (sec <= 30) return 6;
  if (sec <= 45) return 9;
  return 12;
};

const buildGrafixStyleBible = (topic, style, aspect, assetAnalysis = '') => {
  const cleanTopic = String(topic || '').trim();
  const styleLine = !style || style === 'auto' ? 'auto motion-graphics best fit for topic' : style;
  return [
    `[GRAFIX STYLE BIBLE — TOPIC LOCK]`,
    `TOPIC (mandatory in every frame): ${cleanTopic}`,
    `Mode: motion graphics / kinetic design / explainer`,
    `Visual style: ${styleLine}`,
    `Aspect: ${aspect}`,
    assetAnalysis ? `Brand/ref notes: ${assetAnalysis}` : '',
    `RULES:`,
    `- Every frame is about the TOPIC above — titles, icons, charts, UI, product graphics related to topic.`,
    `- Do NOT insert random human influencers, fashion models, or unrelated portraits.`,
    `- Keep consistent color palette, type treatment, and graphic language across scenes.`,
    `- Each scene needs a DESIGNED set/background world (gradients, rooms, city, UI space, abstract environment) matching the topic — NEVER plain white empty canvas unless the topic is literally about white space.`,
    `- Prefer rich commercial motion-graphics composition with depth and color.`
  ].filter(Boolean).join('\n');
};

const mapWithConcurrency = async (items, limit, worker, onProgress) => {
  const results = new Array(items.length);
  let nextIndex = 0;
  let completed = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const i = nextIndex++;
      results[i] = await worker(items[i], i);
      completed += 1;
      if (onProgress) onProgress(completed, items.length, i);
    }
  });
  await Promise.all(runners);
  return results;
};

const combineImagesVerticallyPair = (imgUrl1, imgUrl2, aspectRatio = '9:16') => {
  return new Promise((resolve, reject) => {
    const img1 = new Image();
    const img2 = new Image();
    let loaded = 0;

    const tryMerge = () => {
      loaded++;
      if (loaded < 2) return;

      const canvas = document.createElement('canvas');
      // Stack two scenes vertically in one combined output
      // Each scene takes half the height
      let canvasWidth, canvasHeight;
      if (aspectRatio === '9:16') {
        canvasWidth = 1080;
        canvasHeight = 1920;
      } else if (aspectRatio === '16:9') {
        canvasWidth = 1920;
        canvasHeight = 1080;
      } else {
        canvasWidth = 1080;
        canvasHeight = 1080;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');

      // Draw a thin separator line
      const halfH = canvasHeight / 2;
      const gap = 4;

      // Draw img1 top half
      const drawFit = (img, x, y, w, h) => {
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        const dx = x + (w - dw) / 2;
        const dy = y + (h - dh) / 2;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.drawImage(img, dx, dy, dw, dh);
        ctx.restore();
      };

      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      drawFit(img1, 0, 0, canvasWidth, halfH - gap / 2);
      drawFit(img2, 0, halfH + gap / 2, canvasWidth, halfH - gap / 2);

      // Separator line
      ctx.fillStyle = '#f472b6';
      ctx.fillRect(0, halfH - gap / 2, canvasWidth, gap);

      // Scene labels
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, canvasWidth, 36);
      ctx.fillRect(0, halfH + gap / 2, canvasWidth, 36);
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText('▶ SCENE A', 16, 26);
      ctx.fillText('▶ SCENE B', 16, halfH + gap / 2 + 26);

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };

    img1.onload = tryMerge;
    img2.onload = tryMerge;
    img1.onerror = () => reject(new Error('Failed to load image 1 for combining'));
    img2.onerror = () => reject(new Error('Failed to load image 2 for combining'));
    img1.src = imgUrl1;
    img2.src = imgUrl2;
  });
};

const combineImagesToSegments = async (imageUrlsArr, scenesPerSegment = 2, aspectRatio = '9:16') => {
  if (!imageUrlsArr || imageUrlsArr.length <= scenesPerSegment) return imageUrlsArr;
  const combined = [];
  for (let i = 0; i < imageUrlsArr.length; i += scenesPerSegment) {
    const chunk = imageUrlsArr.slice(i, i + scenesPerSegment);
    if (chunk.length === 2 && chunk[0] && chunk[1]) {
      try {
        const merged = await combineImagesVerticallyPair(chunk[0], chunk[1], aspectRatio);
        combined.push(merged);
      } catch (e) {
        // Fallback: keep individual images if combining fails
        console.warn('Image combine failed, keeping individuals:', e);
        chunk.forEach((u) => { if (u) combined.push(u); });
      }
    } else {
      // Odd scene out or single — keep as-is
      chunk.forEach((u) => { if (u) combined.push(u); });
    }
  }
  return combined;
};

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 1024;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const mime = file.type || 'image/jpeg';
        resolve(canvas.toDataURL(mime, 0.8).split(',')[1]);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

const StepBadge = ({ number }) => (
  <div className="w-10 h-10 shrink-0 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
    {number}
  </div>
);

const getUgcStoryboardPrompt = (product, duration, category, environment, gender, hijabMode, angle, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 10;
  const sceneCount = sec <= 10 ? 3 : sec <= 20 ? 4 : 6;
  const perScene = (sec / sceneCount).toFixed(1);
  const modelRef = `${gender === 'Wanita' || gender === 'Female' ? 'young Asian female' : 'young Asian male'} influencer${(gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab' ? ' wearing an aesthetic modern hijab' : ''}`;

  return `You are a high-converting affiliate UGC (User Generated Content) video director. Create a detailed ${sec}s storyboard for a video about "${product}" (Category: ${category}).
Style / Angle: ${angle}
Environment: ${environment}
Influencer Profile: ${modelRef}
${refCount > 0 ? 'Note: Reference assets are loaded for physical consistency.' : ''}
${assetAnalysis ? `PRODUCT/ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

RULES:
- Exactly ${sceneCount} scenes, ${perScene}s each. Timecodes must be continuous with no gaps.
- Dialogue / Script / Voice Over MUST be written in conversational, casual, trendy, relatable BAHASA MELAYU (Malay). Keep visual/camera/image fields in English.
- Scene 1: HOOK — stop scrolling immediately. MANDATORY HOOK ANGLE: ${getRandomHookAngle()}
- Middle scenes: build interest, showcase material textures, demonstration or benefits.
- Final scene: clear CTA pointing to the bottom yellow basket ("beg kuning").
${DIALOGUE_AUTHENTICITY_RULES}
- Keep the SAME influencer face, outfit palette, product packaging across all scenes.
- Environment baseline: ${environment} — each image_prompt must show this (or progressive angles of it) with furniture/props/lighting, never plain white.
${SCENE_ENVIRONMENT_RULES}
- ${SCENE_JSON_CONTRACT}

Return ONLY valid JSON:
{
"title": "🤳 UGC: ${product}",
"duration": "${sec}s",
"identity_bible": "short lock string for face/product/environment",
"scenes": [
{
"scene_num": 1,
"timecode": "0s–${perScene}s",
"visual": "[Detailed English visual + location ${environment}]",
"camera": "[shot + movement]",
"action": "[what happens]",
"emotion": "[facial emotion]",
"dialogue": "[Spoken dialogue in natural Malay]",
"image_prompt": "[English still with full environment ${environment}, not white studio]",
"i2v_prompt": "[ready-to-use English image-to-video prompt]",
"negative": "${DEFAULT_NEGATIVE}"
}
]
}`;
};

const getCinematicStoryboardPrompt = (topic, duration, style, aspect, audience, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 30;
  const sceneCount = sec <= 10 ? 3 : sec <= 20 ? 4 : sec <= 30 ? 6 : sec <= 45 ? 9 : 12;
  const perScene = (sec / sceneCount).toFixed(1);
  const actMap = sceneCount <= 3
    ? ['ACT 1 — HOOK (grab attention instantly)', 'ACT 2 — BUILD (conflict/tension/demo)', 'ACT 3 — PAYOFF (resolution/CTA)']
    : sceneCount <= 4
    ? ['ACT 1 — HOOK', 'ACT 2 — BUILD', 'ACT 2 — ESCALATE', 'ACT 3 — PAYOFF']
    : sceneCount <= 6
    ? ['ACT 1 — HOOK (pattern interrupt, stop scroll)', 'ACT 1 — SETUP (establish world/character)', 'ACT 2 — CONFLICT (problem/tension/challenge)', 'ACT 2 — BUILD (demo/deepen stakes)', 'ACT 3 — RESOLUTION (transformation/solution)', 'ACT 3 — PAYOFF (CTA/emotional peak)']
    : Array.from({ length: sceneCount }, (_, i) => {
        const third = Math.floor(sceneCount / 3);
        if (i < third) return `ACT 1 — HOOK/SETUP (scene ${i+1})`;
        if (i < third * 2) return `ACT 2 — BUILD/CONFLICT (scene ${i+1})`;
        return `ACT 3 — RESOLUTION/PAYOFF (scene ${i+1})`;
      });

  return `You are a VIRAL STORYBOARD DIRECTOR. Create a ${sec}s ${aspect} storyboard about: ${topic}${style !== 'auto' ? ` in ${style} style` : ''}${audience ? `. Target: ${audience}` : ''}.
Exactly ${sceneCount} scenes, ~${perScene}s each, continuous story.
${refCount > 0 ? 'Reference assets loaded — lock product/identity consistency.' : ''}
${assetAnalysis ? `ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

3-ACT STRUCTURE — every scene MUST follow this arc (do not skip or reorder):
${actMap.map((act, i) => `Scene ${i+1}: ${act}`).join('\n')}
Emotional journey: Curiosity → Tension/Interest → Satisfaction. Each scene must PUSH the story forward — no filler.

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Dialogue must be natural conversational Bahasa Melayu. Visual/image fields English. Every image_prompt must name a real location/set for the topic (not white).

Return ONLY valid JSON:
{"title":"🎬 [topic]","duration":"${sec}s","style":"[style]","identity_bible":"[lock string]","scenes":[{"scene_num":1,"timecode":"0s–${perScene}s","visual":"[English with LOCATION + lighting]","camera":"[shot + movement]","action":"[what happens]","emotion":"[facial]","dialogue":"[BM]","image_prompt":"[English still with full environment]","i2v_prompt":"[English motion prompt]","negative":"${DEFAULT_NEGATIVE}"}]}`;
};

const getMicroImpactPrompt = (topic, aspect, audience, refCount, identityBible = '', assetAnalysis = '') =>
  `You are a 10s MICRO-IMPACT SPECIALIST. Create exactly 3 scenes (~3.3s) for: ${topic}. Aspect ${aspect}.${audience ? ` Target: ${audience}.` : ''}${refCount ? ' Refs loaded.' : ''}
${assetAnalysis ? `ASSET:\n${assetAnalysis}\n` : ''}${identityBible ? identityBible + '\n' : ''}${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Dialogue BM; visuals EN; each image_prompt must include a vivid environment matching the topic (never plain white). JSON only:
{"title":"⚡ ${topic}","duration":"10s","identity_bible":"[lock]","scenes":[{"scene_num":1,"timecode":"0s–3.3s","visual":"[EN + location]","camera":"[shot]","action":"[action]","emotion":"[face]","dialogue":"[BM]","image_prompt":"[still with environment]","i2v_prompt":"[motion]","negative":"${DEFAULT_NEGATIVE}"}]}`;

const getNarrativeArcPrompt = (topic, aspect, audience, refCount, identityBible = '', assetAnalysis = '') => {
  return `You are a professional FLOW AI & IMAGE-TO-VIDEO CINEMATIC DIRECTOR. Create a continuous 30-second storyboard with exactly 6 scenes (5 seconds each) optimized for Flow AI.
Topic: ${topic}
Aspect Ratio: ${aspect}
${audience ? `Target: ${audience}` : ''}
${refCount > 0 ? 'Reference assets loaded.' : ''}
${assetAnalysis ? `ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

3-ACT STRUCTURE (mandatory — each scene must serve its act):
Scene 1: ACT 1 — HOOK: visual pattern interrupt, grab attention in 1 second. Unexpected angle or extreme close-up.
Scene 2: ACT 1 — SETUP: establish world, character, and stakes. Viewer must understand what this is about.
Scene 3: ACT 2 — CONFLICT: introduce tension, problem, challenge, or desire. Emotional pull begins.
Scene 4: ACT 2 — BUILD: deepen conflict or demonstrate solution building. Energy escalates.
Scene 5: ACT 3 — RESOLUTION: breakthrough moment, transformation, or answer revealed. Emotional peak.
Scene 6: ACT 3 — PAYOFF: strong close — satisfaction, CTA, or lingering emotional image. No dead ending.
Emotional arc: Curiosity → Tension → Release. Action in scene N must flow naturally into scene N+1.

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Scenes must feel continuous (action carries over). Dialogue BM, visuals English with location detail. No plain white backgrounds.

Return ONLY valid JSON:
{"title": "🎬 30s Narrative: [Topic]", "duration": "30s", "style": "Flow AI Optimized", "identity_bible":"[lock]", "scenes": [{"scene_num":1,"timecode":"0s–5s","visual":"[English + location/lighting]","camera":"[movement]","action":"[continuous action]","emotion":"[emotion]","dialogue":"[BM]","image_prompt":"[still with full environment]","i2v_prompt":"[motion]","negative":"${DEFAULT_NEGATIVE}"}]}`;
};

const getTalkingHeadPrompt = (topic, duration, tone, aspect, audience, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 30;
  const sceneCount = sec <= 10 ? 2 : sec <= 20 ? 4 : sec <= 30 ? 6 : sec <= 45 ? 9 : 12;
  const perScene = (sec / sceneCount).toFixed(1);
  return `You are a TALKING HEAD storyboard generator. Create ${sec}s influencer storyboard: ${topic}. Tone: ${tone}. Aspect: ${aspect}.
Exactly ${sceneCount} scenes, ~${perScene}s each.
${audience ? `Target: ${audience}` : ''}
${refCount > 0 ? 'Reference assets loaded.' : ''}
${assetAnalysis ? `ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

SCENE 1 HOOK — MANDATORY (pick the strongest hook type for this topic):
- QUESTION HOOK: Open with a bold provocative question in BM that the target audience cannot ignore. e.g. "Korang tau tak kenapa ramai orang rugi buat benda ni?"
- BOLD CLAIM HOOK: Start with a surprising statement or controversial opinion. e.g. "Aku berhenti buat [X] lepas 2 tahun — dan rasa lega gila."
- SURPRISING STAT HOOK: Lead with a shocking number or fact relevant to the topic.
- STORY HOOK: Drop straight into a relatable micro-story mid-action, no intro. e.g. "Semalam aku kat kedai, tetiba nampak benda ni..."
Scene 1 dialogue MUST use one of these hooks. No generic intros like "Hai korang, hari ni aku nak cakap pasal...".

STORY STRUCTURE for remaining scenes:
- Middle scenes: deliver the value/story/demo promised by the hook. Build curiosity → answer → deeper insight.
- Final scene: strong close — emotional payoff, clear CTA, or memorable punchline. Not just "ok tu je dari aku".

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Keep same face identity. Dialogue natural BM. Visuals English. Background must be a real room/location (bedroom, cafe, office, street) — never plain white.

Return ONLY valid JSON:
{"title":"🤳 [topic]","duration":"${sec}s","style":"${tone}","identity_bible":"[lock]","scenes":[{"scene_num":1,"timecode":"0s–${perScene}s","visual":"[English + room/location]","camera":"[shot]","action":"[action]","emotion":"[facial]","dialogue":"[BM hook — question/bold claim/stat/story]","image_prompt":"[still with environment]","i2v_prompt":"[motion]","negative":"${DEFAULT_NEGATIVE}"}]}`;
};

const getStopMotionPrompt = (product, duration, style, aspect, audience, refCount, identityBible = '', assetAnalysis = '') => {
  return `You are a specialized Stop Motion Storyboard Generator. Transform "${product}" into a 10-second stop-motion video storyboard.

RULES:
- Exactly 10 scenes, each exactly 1 second.
- Format: 9:16 vertical. Style: Stop Motion / ${style}.
- Scene 1 MUST create immediate visual curiosity (object slides/jumps/snaps into frame).
- Scene 10 MUST be a strong hero shot (main object centered, clean background, premium composition).
- Every scene must visually connect to the next — one continuous sequence, NOT random disconnected shots.
- Each scene has ONE dominant stop-motion action only.
- Prefer movements: Slide, Jump, Rotate, Assemble, Appear, Flip, Stack, Pop Up, Spin, Expand, Collapse, Roll, Snap Into Place, Split, Merge, Unfold, Scatter, Gather, Pour, Drop, Rise, Orbit, Swap, Reveal.
- Keep actions easy to animate (frame-by-frame repositioning, rotation, scale, practical tabletop stop motion).
${refCount > 0 ? 'Note: Product reference image is loaded for visual consistency.' : ''}
${assetAnalysis ? `PRODUCT ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Dialogue should be empty string for all scenes unless text-on-screen is essential (prefer empty).
Tabletop set must have visible surface texture, props, and lighting — not empty white void.

Return ONLY valid JSON:
{
"title": "🧩 Stop Motion: ${product}",
"duration": "10s",
"style": "Stop Motion",
"identity_bible": "[product lock]",
"scenes": [
{"scene_num": 1, "timecode": "0s–1s", "visual": "[English]", "camera": "[Top Down / Close Up / Macro / Hero Shot]", "action": "[One stop-motion movement]", "emotion": "[mood]", "dialogue": "", "image_prompt": "[still]", "i2v_prompt": "[frame-by-frame motion]", "negative": "${DEFAULT_NEGATIVE}"}
],
"props": ["[props]"],
"visual_mood": "[mood]",
"transition_style": ["[transitions]"]
}`;
};

const getGrafixPrompt = (topic, duration, aspect, style, audience, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 30;
  const sceneCount = sec <= 10 ? 3 : sec <= 20 ? 4 : sec <= 30 ? 6 : sec <= 45 ? 9 : 12;
  const perScene = (sec / sceneCount).toFixed(1);
  const styleLine = !style || style === 'auto'
    ? 'Choose the best motion-graphics style that fits the topic (infographic / kinetic type / dashboard / organic shapes).'
    : `Mandatory visual style: ${style}.`;
  const cleanTopic = String(topic || '').trim();

  return `You are a senior MOTION GRAPHICS STORYBOARD DIRECTOR for After Effects / Premiere / CapCut-style explainers.

PRIMARY TOPIC (MUST dominate every scene — do NOT ignore or replace this topic):
"""${cleanTopic}"""

Video length: ${sec} seconds
Aspect ratio: ${aspect}
${styleLine}
${audience ? `Target audience: ${audience}` : 'Target audience: general social / ads viewers'}
${refCount > 0 ? 'Reference brand/product images are attached for color/logo consistency only — still keep the TOPIC as the story.' : ''}
${assetAnalysis ? `REFERENCE NOTES (use for brand colors/logo only):\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

HARD RULES:
1. Exactly ${sceneCount} scenes, each about ${perScene}s, continuous narrative about the TOPIC above.
2. This is MOTION GRAPHICS / kinetic design / explainer — NOT live-action influencer, NOT UGC talking head, NOT fashion model.
3. Every scene visual + image_prompt + i2v_prompt MUST explicitly mention the topic concepts, keywords, data, product name, or message from """${cleanTopic}""".
4. Prefer: typography, icons, charts, UI panels, product renders, maps, arrows, callouts, transitions, lower-thirds.
5. Avoid: random stock people, unrelated landscapes, generic "young Asian influencer", hijab fashion, unless the topic itself requires a human presenter.
6. dialogue = short on-screen BM text or VO line that supports the topic (can be empty for pure graphic beats).
7. image_prompt = production-ready still of that motion-graphics frame (English), topic-locked, with a COLORED designed environment/set (gradients, desk, city skyline UI, abstract 3D space) — NOT plain white empty canvas.
8. i2v_prompt = how the graphics animate (scale, wipe, count-up, parallax, type-on).
9. negative must include: live-action influencer, random person portrait, fashion photoshoot, plain white background, empty white void (unless topic needs human).
${SCENE_ENVIRONMENT_RULES}

${SCENE_JSON_CONTRACT}

Return ONLY valid JSON (no markdown):
{
"title": "📊 ${cleanTopic.slice(0, 80)}",
"duration": "${sec}s",
"style": "${style && style !== 'auto' ? style : 'motion-graphics'}",
"topic": "${cleanTopic.replace(/"/g, '\\"')}",
"identity_bible": "brand/palette/type system lock for this grafix topic",
"scenes": [
{
"scene_num": 1,
"timecode": "0s–${perScene}s",
"visual": "[English motion-graphics description tightly about the topic]",
"camera": "[graphic transition / move]",
"action": "[animation action]",
"emotion": "[mood/energy]",
"dialogue": "[short BM on-screen or VO related to topic]",
"image_prompt": "[still frame prompt; MUST include topic keywords]",
"i2v_prompt": "[motion graphics animation prompt about topic]",
"negative": "${DEFAULT_NEGATIVE}, live-action influencer, random portrait, fashion model"
}
]
}`;
};

const FI_SKIN_TONE_OPTIONS = ['Malay warm fair (putih gading)', 'Malay natural medium (sawo matang)', 'Malay golden tan glow', 'Malaysian Chinese fair porcelain', 'Malaysian Chinese warm ivory', 'Malaysian Indian warm brown', 'Mixed Malaysian golden beige', 'Deep warm bronze Malaysian', 'Light cool beige KL office look'];
const FI_HAIR_HEADWEAR_FEMALE = ['Long straight black hair (Raya sleek)', 'Soft wavy brown-black hair', 'Shoulder-length layered hair', 'Sleek high ponytail', 'Curtain bangs soft black hair', 'Tudung bawal pastel aesthetic', 'Tudung labuh plain premium', 'Inner + shawl hijab modern', 'Sporty instant tudung', 'Satin scarf headwrap casual', 'Half-up claw clip hair (cafe OOTD)'];
const FI_HAIR_HEADWEAR_MALE = ['Short neat black hair (kerap potong)', 'Korean soft middle part', 'Textured crop / french crop', 'Combed side part clean', 'Undercut modern', 'Messy natural waves', 'Buzz cut clean', 'Songkok formal Raya (optional props)', 'Baseball cap street casual', 'Kopiah plain (soft lighting portrait)'];
const FI_OUTFIT_VIBE_FEMALE = ['Casual MY OOTD (cotton tee + jeans)', 'Hijab modest pastel set', 'Raya kurung modern soft color', 'Office lady blouse + slacks (KL)', 'Cafe soft girl cardigan look', 'Shopee Live comfy loungewear', 'Baju Melayu inspired chic top', 'Streetwear baggy tee + cargo', 'Skincare GRWM robe + headband', 'Premium modest blazer set', 'Sporty activewear Uniqlo vibe', 'Date night simple midi dress'];
const FI_OUTFIT_VIBE_MALE = ['Casual MY OOTD (plain tee + jeans)', 'Baju Melayu modern slim fit', 'Office smart casual (oxford + chinos)', 'Shopee Live comfy polo', 'Streetwear oversized tee', 'Kopitiam uncle-chic button shirt', 'Gym / activewear clean', 'Raya songket accent formal', 'Campus hoodie casual', 'Premium blazer date look', 'Product review plain white tee', 'Techwear light jacket outdoor'];
const FI_LOCATION_OPTIONS = ['Bilik tidur aesthetic Malaysia (fairy lights)', 'Mirror OOTD corner rumah', 'Ruang tamu minimal KL condo', 'Meja vanity skincare setup', 'Cafe aesthetic Malaysia (natural light)', 'Kopitiam classic wooden interior', 'Mall corridor (Pavilion / Mid Valley vibe)', 'Jalan Bukit Bintang night bokeh', 'Masjid courtyard soft daylight', 'Taman / park green Malaysia', 'Shopee Live desk setup rumah', 'Kitchen counter product unboxing', 'Balcony condo golden hour', 'University campus walkway', 'Pasar malam colorful stalls (blurred)', 'Clean white content studio MY'];
const FI_NICHE_OPTIONS = ['TikTok Malaysia Affiliate', 'Shopee Live Host', 'Skincare / Beauty MY', 'Hijab Fashion MY', 'Foodie Malaysia', 'OOTD & Lifestyle MY', 'Tech Gadget Review MY', 'Fitness / Gym MY', 'Mom Life / Family MY', 'Travel Dalam Malaysia'];
const FI_VIBE_OPTIONS_FEMALE = ['Malaysia Local Influencer (main)', 'Kakak Affiliate Shopee vibe', 'Hijabi aesthetic soft', 'KL Clean Girl', 'Cafe soft girl MY', 'Raya glam modest', 'Campus girl natural', 'Premium beauty creator'];
const FI_VIBE_OPTIONS_MALE = ['Malaysia Local Influencer (main)', 'Abang Affiliate Shopee vibe', 'KL Clean Boy', 'Campus guy natural', 'Gym bro aesthetic MY', 'Kopitiam casual creator', 'Premium tech reviewer', 'Raya smart formal'];
const FI_FORMAT_OPTIONS = ['9:16 TikTok / Reels MY Pose', '9:16 Full Body OOTD', '1:1 Instagram Feed Portrait', 'Product Review Pose (hold box)', 'Beauty Close Up / GRWM', '4 Pose Character Sheet', 'Shopee Live Talking Head'];

const buildSheetPrompt = (subjectType, name, charGenderLabel, hijabModifier, characterDescription, charShotType, cleanImageInstruction) => {
  const category = subjectType || 'HUMAN_CHARACTER';

  // Category-specific layout definitions
  const CATEGORY_LAYOUTS = {
    HUMAN_CHARACTER: {
      topRow: 'TOP ROW — TURNAROUND VIEWS: Front View, 3/4 Left View, Side View, Back View, 3/4 Right View. Requirements: Same person, same outfit, same hairstyle, same body proportions, same scale, consistent camera height, consistent studio lighting, clear separation between panels.',
      middleRow: 'MIDDLE ROW — EXPRESSIONS: Neutral Expression, Smile Expression, Serious Expression, Thinking Expression. Requirements: Preserve facial identity, preserve hairstyle, preserve skin tone, change only expression and natural expression-related muscle movement, avoid identity drift.',
      bottomRow: 'BOTTOM ROW — REFERENCE DETAILS: Full Body Reference, Close-Up Face Reference, Hair Reference, Outfit Reference, Accessories Reference. Use a professional visual-development sheet layout.'
    },
    PRODUCT_CHARACTER: {
      topRow: 'TOP ROW — PRIMARY VIEWS: Front View, 3/4 Front View, Left Side View, Right Side View, Back View.',
      middleRow: 'MIDDLE ROW — TECHNICAL VIEWS: Top View, Bottom View, 3/4 Rear View, Packaging View.',
      bottomRow: 'BOTTOM ROW — DETAIL REFERENCES: Label Close-Up, Material Close-Up, Texture Reference, Logo Detail, Scale Reference. Requirements: Preserve exact product identity, proportions, brand colors, visible logo design, label hierarchy, packaging geometry, consistent material rendering.'
    },
    VEHICLE_CHARACTER: {
      topRow: 'PRIMARY VIEWS: Front View, Rear View, Left Side View, Right Side View, Top View, 3/4 Front View, 3/4 Rear View.',
      middleRow: 'DETAIL VIEWS: Interior View, Dashboard View, Wheel Detail, Headlight Detail.',
      bottomRow: 'Requirements: Same vehicle, same paint, same wheels, same trim, same configuration, consistent geometry, professional automotive design presentation.'
    },
    ANIMAL_CHARACTER: {
      topRow: 'PRIMARY VIEWS: Front View, Side View, Back View, 3/4 View.',
      middleRow: 'EXPRESSIONS: Neutral, Happy, Alert, Curious.',
      bottomRow: 'DETAIL REFERENCES: Full Body, Face Close-Up, Fur Detail, Paw Detail. Requirements: Same individual animal, same markings, same proportions, same fur pattern, same accessories, natural anatomy.'
    },
    MASCOT_CHARACTER: {
      topRow: 'PRIMARY VIEWS: Front View, Side View, Back View, 3/4 View.',
      middleRow: 'EXPRESSIONS: Happy, Angry, Surprised, Thinking.',
      bottomRow: 'DETAIL REFERENCES: Costume Detail, Accessory Detail, Branding Detail. Requirements: Preserve exact mascot identity, costume, brand colors, logos, proportions, maintain commercial brand consistency.'
    },
    OBJECT_CHARACTER: {
      topRow: 'PRIMARY VIEWS: Front View, 3/4 Front View, Left Side View, Right Side View, Back View, Top View, Bottom View.',
      middleRow: 'DETAIL REFERENCES: Material Detail, Texture Detail, Functional Detail, Construction Detail, Scale Reference.',
      bottomRow: 'Requirements: Preserve exact object geometry, color, material, texture, surface finish, functional components, avoid unsupported redesign.'
    }
  };

  // Category-specific identity preservation rules
  const IDENTITY_RULES = {
    HUMAN_CHARACTER: `HUMAN IDENTITY CONSISTENCY — Preserve ALL of the following across every panel:
- Facial identity: face shape, head proportions, eye shape, eye spacing, eye color, eyebrow shape, nose structure, lip shape, jawline, chin shape, ear shape, skin tone
- Hair: hairline, hairstyle, hair length, hair texture, hair color
- Body: apparent age range, body proportions
- Appearance: facial hair, distinctive marks, makeup
- Clothing: clothing colors, clothing patterns, footwear, jewelry, accessories
Never create visibly different people across panels. All views must represent the same individual.`,
    PRODUCT_CHARACTER: `PRODUCT CONSISTENCY — Preserve ALL of the following across every panel:
- Product silhouette, dimensions and proportions, geometry, packaging structure
- Brand colors, product colors, logo placement, label placement, typography appearance
- Cap/lid/handle shape, material, surface finish, transparency, reflectivity, texture
- Structural details: visible seams, buttons, ports, decorative elements
Never invent a materially different product across panels.`,
    VEHICLE_CHARACTER: `VEHICLE CONSISTENCY — Preserve ALL of the following across every panel:
- Vehicle type, body silhouette, proportions, paint color, trim
- Grille, windows, mirrors, wheels, tires, lights, badges, decals
- Doors, roof structure, body panels, aerodynamic components, visible interior design cues
All views must depict the same vehicle configuration.`,
    ANIMAL_CHARACTER: `ANIMAL CONSISTENCY — Preserve ALL of the following across every panel:
- Species, breed when visually identifiable, body proportions
- Fur color, fur pattern, markings, eye color, ear shape, muzzle shape, tail shape, paw appearance
- Distinctive features, collar, harness, visible accessories
All panels must depict the same individual animal.`,
    MASCOT_CHARACTER: `MASCOT CONSISTENCY — Preserve ALL of the following across every panel:
- Head shape, face design, eye design, mouth design, body proportions
- Costume, brand colors, logo, accessories, gloves, shoes, surface material, character silhouette
Do not redesign branding.`,
    OBJECT_CHARACTER: `OBJECT CONSISTENCY — Preserve ALL of the following across every panel:
- Shape, scale relationships, geometry, color, material, texture, surface finish
- Functional components, decorative details, construction details`
  };

  const layout = CATEGORY_LAYOUTS[category] || CATEGORY_LAYOUTS.HUMAN_CHARACTER;
  const identityRule = IDENTITY_RULES[category] || IDENTITY_RULES.HUMAN_CHARACTER;

  const genderLine = (category === 'HUMAN_CHARACTER' || category === 'MASCOT_CHARACTER')
    ? `\nGENDER / PRESENTATION: ${charGenderLabel}, ${hijabModifier}natural appearance`
    : '';

  const shotLine = (category === 'HUMAN_CHARACTER')
    ? `\nSHOT TYPE: ${charShotType || 'Full Body (Head to Toe)'}`
    : '';

  return `You are a PROFESSIONAL CHARACTER SHEET GENERATOR. Your function is to generate a production-ready professional Character Sheet for use in AI Video, Animation, Storyboarding, Game Design, Comic Production, Product Design, Brand Asset Creation, and Visual Development.

SUBJECT: ${name}
CATEGORY: ${category}${genderLine}
DESCRIPTION: ${characterDescription || 'No extra description provided.'}${shotLine}

=== AUTOMATIC CATEGORY: ${category} ===

=== MULTI-ROW LAYOUT (Professional Grid) ===
${layout.topRow}

${layout.middleRow}

${layout.bottomRow}

=== IDENTITY PRESERVATION RULES ===
${identityRule}

GLOBAL IDENTITY RULE: The uploaded reference image (if provided) is the source of truth. Preserve all visible identity-defining characteristics. Do not redesign, arbitrarily beautify, simplify, replace, modernize, exaggerate, or reinterpret distinctive features. Maintain maximum cross-view consistency.

=== VIEW ACCURACY RULES ===
Each requested view must be visually distinct and geometrically plausible.
Do not duplicate the same image and relabel it as another angle.
Front View must read as front-facing. Side View must read as a true profile. Back View must show the rear. 3/4 views must clearly show three-quarter rotation.
Maintain continuity between all angles.

=== EXPRESSION RULES ===
For expression panels: preserve identity, facial proportions, age, hairstyle, costume, species or mascot design. Only modify features necessary to communicate the requested expression. Avoid extreme deformation unless the original style requires it.

=== COMPOSITION & OUTPUT FORMAT ===
Canvas: Portrait 9:16 aspect ratio (vertical).
Background: Clean white studio background.
Layout: Professional production-ready symmetrical grid with balanced margins, clear row hierarchy, consistent panel spacing, consistent subject scale.
Quality: Photorealistic, ultra-detailed, commercial quality, production-ready, studio lighting, sharp focus, premium presentation, 8K-quality aesthetic.
No overlapping views, no decorative clutter, no environmental background, no unnecessary props, no cinematic scenery, no random graphic elements.
The final image must resemble a professional studio reference board used in animation, games, industrial design, branding, or production.

=== REFERENCE UNCERTAINTY RULE ===
When a requested view contains information not visible in the uploaded image: infer conservatively, use the visible design language, maintain symmetry where reasonable, avoid adding distinctive unsupported features, keep inferred regions visually simple, prioritize consistency over novelty.

=== TEXT & LABELS ===
If labels are used: keep labels minimal, use clean professional typography, use short view names, place labels consistently, avoid large titles. Where text rendering quality is unreliable, prioritize clean visual layout over excessive labels.

=== FAILURE PREVENTION ===
Avoid: identity drift, different faces/hairstyles/clothing between views, random accessories, extra or missing limbs, anatomical distortion, duplicate angles, incorrect rear views, mirrored logos, corrupted branding, random product redesign, color drift, material drift, scale inconsistency, perspective inconsistency, background clutter, cropped critical details, unreadable composition, unnecessary text, watermarks, fake signatures.

=== PRIORITY ORDER ===
1. Visual identity consistency
2. Reference-image fidelity
3. Cross-panel continuity
4. Correct view differentiation
5. Professional Character Sheet layout
6. High image quality
7. Production usability
8. Aesthetic polish

If visual beauty conflicts with identity accuracy, choose identity accuracy.
If creative interpretation conflicts with reference fidelity, choose reference fidelity.
If complexity conflicts with consistency, choose consistency.

${cleanImageInstruction}
Generate the Character Sheet now. Output a single 9:16 portrait professional Character Sheet image.`;
};

const parseDurationToSeconds = (value) => {
  if (value == null || value === '') return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.round(value));
  const m = String(value).trim().match(/(\d+(?:\.\d+)?)/);
  if (!m) return 0;
  return Math.max(0, Math.round(parseFloat(m[1])));
};

const lockScenesToDuration = (scenes, totalSec) => {
  const list = Array.isArray(scenes) ? scenes.filter(Boolean) : [];
  const sec = parseDurationToSeconds(totalSec) || 0;
  if (!list.length || sec <= 0) return list;
  const n = list.length;
  const per = sec / n;
  return list.map((s, i) => {
    const start = Math.round(i * per * 10) / 10;
    const end = i === n - 1 ? sec : Math.round((i + 1) * per * 10) / 10;
    const num = s.scene_num || s.sceneNumber || (i + 1);
    return { ...s, scene_num: num, sceneNumber: num, timecode: `${start}s–${end}s` };
  });
};

const sceneCountForVideoDuration = (totalSec) => {
  const sec = parseDurationToSeconds(totalSec) || 10;
  if (sec <= 10) return 2;
  if (sec <= 20) return 4;
  return 6;
};

const generateFlowSegments = (scenes, durationStr, options = {}) => {
  const {
    identityBible = '',
    aspectRatio = '9:16',
    segSize = 10,
    title = ''
  } = options;

  const totalSec = parseDurationToSeconds(durationStr) || 30;
  if (totalSec <= 0) return [];

  const numSegments = Math.max(1, Math.ceil(totalSec / segSize));
  const list = Array.isArray(scenes) ? scenes.filter(Boolean) : [];

  const normalized = list.map((sc, i) => {
    const num = sc.scene_num || sc.sceneNumber || sc.scene || (i + 1);
    let timecode = sc.timecode || '';
    if (!timecode && list.length > 0) {
      const slice = totalSec / list.length;
      const a = Math.round(i * slice * 10) / 10;
      const b = Math.round(Math.min(totalSec, (i + 1) * slice) * 10) / 10;
      timecode = `${a}s–${b}s`;
    }
    return {
      ...sc,
      scene_num: num,
      sceneNumber: num,
      timecode,
      visual: sc.visual || sc.visual_prompt || sc.videoPrompt || sc.action || '',
      camera: sc.camera || '',
      action: sc.action || sc.movement || '',
      emotion: sc.emotion || '',
      dialogue: sc.dialogue || sc.script || '',
      i2v_prompt: sc.i2v_prompt || '',
      image_prompt: sc.image_prompt || sc.imageGenerationPrompt || ''
    };
  });

  const buckets = Array.from({ length: numSegments }, () => []);

  const assignEven = () => {
    for (let i = 0; i < numSegments; i++) buckets[i] = [];
    if (!normalized.length) return;
    normalized.forEach((sc, i) => {
      const segIdx = Math.min(
        numSegments - 1,
        Math.floor((i * numSegments) / normalized.length)
      );
      buckets[segIdx].push(sc);
    });
  };

  if (!normalized.length) {
    assignEven();
  } else {
    let usedTimecode = false;
    normalized.forEach((sc) => {
      const m = String(sc.timecode || '').match(/(\d+\.?\d*)\s*[sS]?\s*[–\-\u2013\u2014to]+\s*(\d+\.?\d*)/);
      if (m) {
        usedTimecode = true;
        const mid = (parseFloat(m[1]) + parseFloat(m[2])) / 2;
        let segIdx = Math.floor(mid / segSize);
        if (segIdx < 0) segIdx = 0;
        if (segIdx >= numSegments) segIdx = numSegments - 1;
        if (mid >= totalSec) segIdx = numSegments - 1;
        buckets[segIdx].push(sc);
      }
    });

    const emptyCount = buckets.filter((b) => !b.length).length;
    if (!usedTimecode || emptyCount > 0) {
      assignEven();
    }
    for (let i = 0; i < numSegments; i++) {
      if (buckets[i].length) continue;
      let donor = null;
      for (let d = i - 1; d >= 0; d--) {
        if (buckets[d].length) { donor = buckets[d]; break; }
      }
      if (!donor) {
        for (let d = i + 1; d < numSegments; d++) {
          if (buckets[d].length) { donor = buckets[d]; break; }
        }
      }
      if (donor && donor.length) {
        const s0 = i * segSize;
        const e0 = Math.min(s0 + segSize, totalSec);
        buckets[i] = donor.map((sc) => ({
          ...sc,
          visual: `${sc.visual || ''}\n[CONTINUATION ${s0}s–${e0}s: same identity/product/wardrobe, progress the action naturally for this window]`,
          i2v_prompt: sc.i2v_prompt
            ? `${sc.i2v_prompt} Continue motion into ${s0}s–${e0}s.`
            : `Continue seamless motion ${s0}s–${e0}s, same character and product.`
        }));
      }
    }
  }

  const results = [];
  for (let i = 0; i < numSegments; i++) {
    const s = i * segSize;
    const e = Math.min(s + segSize, totalSec);
    const segScenes = buckets[i] || [];

    const visuals = segScenes.length
      ? segScenes.map((sc) => {
          const vis = sc.visual || sc.action || '';
          const cam = sc.camera || '';
          const i2v = sc.i2v_prompt || '';
          const img = sc.image_prompt || '';
          return [
            `Scene ${sc.scene_num}: ${vis}`,
            cam ? `Camera: ${cam}` : '',
            img ? `Still prompt: ${img}` : '',
            i2v ? `I2V: ${i2v}` : ''
          ].filter(Boolean).join('\n');
        }).join('\n\n')
      : `Hold continuity frame for ${s}s–${e}s. Same character, product, lighting. Subtle natural motion only.`;

    const dialogues = segScenes
      .filter((sc) => sc.dialogue && String(sc.dialogue).trim())
      .map((sc) => `[Scene ${sc.scene_num}] "${sc.dialogue}"`)
      .join('\n');

    const prompt = [
      `🌊 FLOW AI SEGMENT ${s}s–${e}s  (full video ${totalSec}s · part ${i + 1}/${numSegments})`,
      title ? `TITLE: ${title}` : '',
      `FORMAT: ${aspectRatio} | WINDOW: ${s}s to ${e}s | DURATION: ${e - s}s`,
      identityBible ? `\n${identityBible}` : '',
      `\nVISUAL:\n${visuals}`,
      dialogues ? `\nDIALOGUE (BM):\n${dialogues}` : '',
      `\nCONTINUITY: Same character, product, wardrobe, environment across ALL segments of this ${totalSec}s video.`,
      `INSTRUCTIONS: Generate only the ${s}s–${e}s portion. Match prior segment identity if extending.`
    ].filter(Boolean).join('\n');

    results.push({
      label: `${s}S–${e}S`,
      sceneCount: segScenes.length || 1,
      prompt,
      start: s,
      end: e,
      totalSec,
      part: i + 1,
      parts: numSegments
    });
  }

  return results;
};

// UI Component Helpers Defined OUTSIDE to prevent focus loss on typing
const SelectField = ({ label, value, onChange, options, isDarkMode }) => (
  <div>
    <label className={C.label}>{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={C.select(isDarkMode)}
        style={darkFieldStyle(isDarkMode)}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' && opt !== null ? opt.v : opt;
          const labelText = typeof opt === 'object' && opt !== null ? opt.l : opt;
          return (
            <option key={val} value={val} style={isDarkMode ? { backgroundColor: '#0a0c10', color: '#fff' } : { backgroundColor: '#fff', color: '#1f2937' }}>
              {labelText}
            </option>
          );
        })}
      </select>
      <ChevronDown className={U.c1} size={14} />
    </div>
  </div>
);

const darkFieldStyle = (d) => d
  ? { backgroundColor: '#0a0c10', color: '#ffffff', borderColor: '#374151' }
  : { backgroundColor: '#f9fafb', color: '#1f2937', borderColor: '#e5e7eb' };

const InputField = ({ label, value, onChange, placeholder, isDarkMode }) => (
  <div>
    <label className={C.label}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={C.input(isDarkMode)}
      style={darkFieldStyle(isDarkMode)}
    />
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder, rows = 3, isDarkMode }) => (
  <div>
    <label className={C.label}>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={C.input(isDarkMode)}
      style={darkFieldStyle(isDarkMode)}
    />
  </div>
);

const getStoredApiKey = () => {
  try { return localStorage.getItem('gemini_api_key') || ''; } catch { return ''; }
};

const getStoredGenfityKey = () => {
  try { return localStorage.getItem('genfity_api_key') || ''; } catch { return ''; }
};

const getStoredTextProvider = () => {
  try { return localStorage.getItem('text_provider') || 'gemini'; } catch { return 'gemini'; }
};

const getStoredGenerateMode = () => {
  try { return localStorage.getItem('generate_mode') || 'text_and_images'; } catch { return 'text_and_images'; }
};

const GEMINI_MODELS = [
  { v: 'gemini-3.5-flash', l: 'Gemini 3.5 Flash (Latest)' },
  { v: 'gemini-3.1-pro', l: 'Gemini 3.1 Pro (Advanced)' },
  { v: 'gemini-3.1-flash-lite', l: 'Gemini 3.1 Flash-Lite (Fastest)' },
  { v: 'gemini-2.5-flash-preview-09-2025', l: 'Gemini 2.5 Flash Preview' },
  { v: 'gemini-2.0-flash', l: 'Gemini 2.0 Flash' },
  { v: 'gemini-1.5-pro', l: 'Gemini 1.5 Pro' },
];

const GENFITY_MODELS = [
  { v: 'genfity/gemini-3.5-flash', l: 'Gemini 3.5 Flash (Genfity)' },
  { v: 'genfity/claude-opus-4.7', l: 'Claude Opus 4.7 (Genfity)' },
  { v: 'genfity/gpt-5.5', l: 'GPT 5.5 (Genfity)' },
];

const IMAGE_MODEL = 'gemini-3.1-flash-image';

const getStoredModel = () => {
  try { return localStorage.getItem('gemini_selected_model') || 'gemini-3.5-flash'; } catch { return 'gemini-3.5-flash'; }
};

const getStoredGenfityModel = () => {
  try { return localStorage.getItem('genfity_selected_model') || 'genfity/gemini-3.5-flash'; } catch { return 'genfity/gemini-3.5-flash'; }
};

const callGeminiApi = async (model, payload, isPredict = false, signal = null) => {
  const currentKey = getStoredApiKey();
  if (!currentKey) throw new Error('API Key belum dimasukkan. Sila masukkan Gemini API Key anda di bahagian atas halaman.');
  const endpoint = isPredict ? 'predict' : 'generateContent';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${endpoint}?key=${currentKey}`;
  const delays = [1000, 2000, 4000, 8000, 16000];
  
  for (let i = 0; i <= 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal
      });

      if (response.ok) {
        return await response.json();
      }

      if (response.status === 400 || response.status === 401 || response.status === 403) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      // For 5xx and other transient errors, retry with backoff
      throw new Error(`HTTP Error ${response.status}`);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      // Don't retry permanent errors (400 Bad Request, 401 Unauthorized, 403 Forbidden)
      if (error.message && /HTTP (400|401|403)/.test(error.message)) throw error;
      if (i === 5) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delays[i]));
  }
};

const callGenfityApi = async (model, promptText, signal = null) => {
  const genfityKey = getStoredGenfityKey();
  if (!genfityKey) throw new Error('Genfity API Key belum dimasukkan. Sila masukkan Genfity API Key anda.');
  // Route through Vercel serverless proxy to bypass CORS
  const url = '/api/genfity';
  const delays = [1000, 2000, 4000, 8000, 16000];

  const body = {
    model: model,
    messages: [{ role: 'user', content: promptText }],
    temperature: 0.7,
    apiKey: genfityKey
  };

  for (let i = 0; i <= 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        signal
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';
        // Return in Gemini-compatible format so downstream code works unchanged
        return { candidates: [{ content: { parts: [{ text: content }] } }] };
      }

      if (response.status === 400 || response.status === 401 || response.status === 403) {
        const text = await response.text();
        throw new Error(`Genfity HTTP ${response.status}: ${text}`);
      }

      throw new Error(`Genfity HTTP Error ${response.status}`);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      if (error.message && /HTTP (400|401|403)/.test(error.message)) throw error;
      if (i === 5) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delays[i]));
  }
};

const extractGeminiText = (data) => {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    return parts.map(p => p.text || '').join('').trim();
  }
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
};

export default function App() {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [activeTab, setActiveTab] = useState('cinematic_pro');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const t = (d, l) => (isDarkMode ? d : l);
  const [scrollPercent, setScrollPercent] = useState(0);
  const tabsContainerRef = useRef(null);

  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [regeneratingIndexes, setRegeneratingIndexes] = useState({});
  const [loadingText, setLoadingText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [editableImagePrompt, setEditableImagePrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [copiedSection, setCopiedSection] = useState('');
  const [zoomedImages, setZoomedImages] = useState({});

  const [showMagicBox, setShowMagicBox] = useState({});
  const [magicPrompts, setMagicPrompts] = useState({});
  const [isMagicEditing, setIsMagicEditing] = useState({});

  const [editModes, setEditModes] = useState({});
  const [editedValues, setBoxEdits] = useState({});
  const [tabCache, setTabCache] = useState({});
  const [logoError, setLogoError] = useState(false);

  const outputRef = useRef(null);
  const mainAbortController = useRef(null);
  const gridAbortControllers = useRef({});
  const generationAborted = useRef(false);

  const [tabUploads, setTabUploads] = useState(makeEmptyTabUploads);

  const getActiveUploadData = () => tabUploads[activeTab] || { ...EMPTY_UPLOAD, products: [{ name: '', base64: null, mimeType: null }], backgrounds: [] };

  const updateTabUpload = (key, value) => {
    setTabUploads((prev) => ({ ...prev, [activeTab]: { ...prev[activeTab], [key]: value } }));
  };

  const [productName, setProductName] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [duration, setDuration] = useState('10');
  const [energyLevel, setEnergyLevel] = useState('Influencer energetic');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [currentDisplayRatio, setCurrentDisplayRatio] = useState(null);

  const [category, setCategory] = useState('Skincare');
  const [productBackground, setProductBackground] = useState('Auto by AI');
  const [productPOVMode, setProductPOVMode] = useState('With Model');
  const [productNarration, setProductNarration] = useState('With Voice-Over');
  const [productVoiceTone, setProductVoiceTone] = useState('Friendly & Enthusiastic');

  const [gender, setGender] = useState('Female');
  const [hijabMode, setHijabMode] = useState('Hijab');
  const [mirrorMode, setMirrorMode] = useState(true);
  const [style, setStyle] = useState('Korean Minimalist');
  const [location, setLocation] = useState('Auto by AI');

  const [ootdNarration, setOotdNarration] = useState('With Voice-Over');
  const [ootdSceneCount, setOotdSceneCount] = useState('1');

  const [ugcAngle, setUgcAngle] = useState('Storytime & Experience');
  const [ugcEnvironment, setUgcEnvironment] = useState('Aesthetic Room');

  const [characterName, setCharacterName] = useState('');
  const [characterDescription, setCharacterDescription] = useState('A warm professional portrait style, modern smart outfit, beautiful facial symmetric features.');
  const [charShotType, setCharShotType] = useState('Half Body (Portrait)');
  const [charSubjectType, setCharSubjectType] = useState('AUTO_DETECT');

  const [fiName, setFiName] = useState('');
  const [fiGender, setFiGender] = useState('Female');
  const [fiAge, setFiAge] = useState('23-27');
  const [fiNiche, setFiNiche] = useState('TikTok Malaysia Affiliate');
  const [fiVibe, setFiVibe] = useState('Malaysia Local Influencer (main)');
  const [fiFaceShape, setFiFaceShape] = useState('Soft oval face');
  const [fiSkinTone, setFiSkinTone] = useState('Malay natural medium (sawo matang)');
  const [fiHair, setFiHair] = useState('Long straight black hair (Raya sleek)');
  const [fiBodyType, setFiBodyType] = useState('Slim natural');
  const [fiSignature, setFiSignature] = useState('Soft smile');
  const [fiRealism, setFiRealism] = useState('TikTok UGC Natural MY');
  const [fiOutfit, setFiOutfit] = useState('Casual MY OOTD (cotton tee + jeans)');
  const [fiBackground, setFiBackground] = useState('Cafe aesthetic Malaysia (natural light)');
  const [fiFormat, setFiFormat] = useState('9:16 TikTok / Reels MY Pose');
  const [fiRules, setFiRules] = useState({
    lockFace: true, ultraSkin: true, rawPhoto: true, safeFictional: true,
    noAi: true, noText: true, realHands: true, realSkin: true
  });
  const [fiCustom, setFiCustom] = useState('');

  const [cinematicTopic, setCinematicTopic] = useState('');
  const [cinematicDuration, setCinematicDuration] = useState('30');
  const [cinematicStyle, setCinematicStyle] = useState('auto');
  const [cinematicAudience, setCinematicAudience] = useState('');
  const [microImpactTopic, setMicroImpactTopic] = useState('');
  const [microImpactAudience, setMicroImpactAudience] = useState('');
  const [narrativeArcTopic, setNarrativeArcTopic] = useState('');
  const [narrativeArcAudience, setNarrativeArcAudience] = useState('');
  const [thTopic, setThTopic] = useState('');
  const [thDuration, setThDuration] = useState('30');
  const [thTone, setThTone] = useState('personal');
  const [thAudience, setThAudience] = useState('');
  const [smProduct, setSmProduct] = useState('');
  const [smDuration, setSmDuration] = useState('10');
  const [smStyle, setSmStyle] = useState('premium');
  const [smAudience, setSmAudience] = useState('');
  const [gfTopic, setGfTopic] = useState('');
  const [gfDuration, setGfDuration] = useState('30');
  const [gfStyle, setGfStyle] = useState('auto');

  const [apiKey, setApiKey] = useState(getStoredApiKey);
  const [genfityKey, setGenfityKey] = useState(getStoredGenfityKey);
  const [textProvider, setTextProvider] = useState(getStoredTextProvider);
  const [generateMode, setGenerateMode] = useState(getStoredGenerateMode);
  const [genfityModel, setGenfityModel] = useState(getStoredGenfityModel);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!getStoredApiKey());
  const [showProviderPanel, setShowProviderPanel] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getStoredModel);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem('gemini_api_key', key); } catch {}
    if (key.trim()) {
      setShowApiKeyInput(false);
      // Auto-select latest model when API key is first saved
      const latestModel = GEMINI_MODELS[0].v;
      setSelectedModel(latestModel);
      try { localStorage.setItem('gemini_selected_model', latestModel); } catch {}
    }
  };

  const handleSaveGenfityKey = (key) => {
    setGenfityKey(key);
    try { localStorage.setItem('genfity_api_key', key); } catch {}
  };

  const handleTextProviderChange = (provider) => {
    setTextProvider(provider);
    try { localStorage.setItem('text_provider', provider); } catch {}
  };

  const handleGenerateModeChange = (mode) => {
    setGenerateMode(mode);
    try { localStorage.setItem('generate_mode', mode); } catch {}
  };

  const handleGenfityModelChange = (model) => {
    setGenfityModel(model);
    try { localStorage.setItem('genfity_selected_model', model); } catch {}
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    try { localStorage.setItem('gemini_selected_model', model); } catch {}
  };

  // Unified text API call — routes to Gemini or Genfity based on textProvider
  const callTextApi = async (promptText, signal = null, options = {}) => {
    const { temperature = 0.7, responseMimeType = null } = options;
    if (textProvider === 'genfity') {
      // Genfity doesn't support responseMimeType, but we still request JSON in prompt
      return await callGenfityApi(genfityModel, promptText, signal);
    } else {
      // Gemini path (default)
      const payload = {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature,
          ...(responseMimeType ? { responseMimeType } : {})
        }
      };
      return await callGeminiApi(selectedModel, payload, false, signal);
    }
  };

  const analyzeReferenceAssets = async (signal = null) => {
    const activeUploadData = getActiveUploadData();
    const activeProducts = (activeUploadData.products || []).filter((p) => p.base64);
    const activeBackgrounds = (activeUploadData.backgrounds || []).filter((b) => b.base64);
    const hasFace = !!(activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64);
    if (!activeProducts.length && !hasFace && !activeBackgrounds.length) return '';

    const parts = [{
      text: `You are a production continuity supervisor. Analyze the attached reference image(s) for multi-scene storyboard consistency.
Return plain text bullets only (no JSON), 5-10 short concrete bullets covering:
- subject type (person / product / outfit)
- dominant colors and materials
- packaging shape / logo colors if product
- clothing style if person
- face traits if face present (age vibe, hair/hijab, expression baseline)
- exact environment/background details to lock (if background references are provided)
Be visual and specific. English only.`
    }];

    if (hasFace) {
      parts.push({ text: '=== FACE REFERENCE ===' });
      parts.push({
        inlineData: {
          mimeType: activeUploadData.uploadedFaceMimeType || 'image/jpeg',
          data: activeUploadData.uploadedFaceBase64
        }
      });
    }
    activeProducts.forEach((p, i) => {
      parts.push({ text: `=== PRODUCT / OUTFIT REFERENCE ${i + 1}: ${p.name || 'asset'} ===` });
      parts.push({ inlineData: { mimeType: p.mimeType || 'image/jpeg', data: p.base64 } });
    });
    activeBackgrounds.forEach((b, i) => {
      parts.push({ text: `=== BACKGROUND / ENVIRONMENT REFERENCE ${i + 1}: ${b.name || 'background'} ===` });
      parts.push({ inlineData: { mimeType: b.mimeType || 'image/jpeg', data: b.base64 } });
    });

    const payload = {
      contents: [{ role: 'user', parts }],
      generationConfig: { temperature: 0.35 }
    };

    const data = await callGeminiApi(selectedModel, payload, false, signal);
    return extractGeminiText(data).trim();
  };

  const fetchStoryboardJson = async (promptText, expectedCount, signal = null) => {
    const runOnce = async (repairNote = '') => {
      const fullPrompt = repairNote
        ? `${promptText}\n\nCORRECTION REQUIRED: ${repairNote}\nReturn ONLY valid JSON. You MUST generate exactly ${expectedCount} scenes, do not summarize into fewer scenes.`
        : `${promptText}\n\nCRITICAL INSTRUCTION: You MUST generate EXACTLY ${expectedCount} scenes in the "scenes" JSON array. Do not return just 1 scene.`;
      
      const data = await callTextApi(fullPrompt, signal, {
        temperature: repairNote ? 0.45 : 0.7,
        responseMimeType: textProvider === 'gemini' ? 'application/json' : null
      });
      const text = extractGeminiText(data);
      let parsed = normalizeStoryboardPayload(parseModelJson(text));
      const validation = validateStoryboard(parsed, expectedCount);
      if (!validation.ok) {
        throw new Error(validation.reason);
      }
      parsed.scenes = parsed.scenes.map((s, idx) => normalizeScene(s, idx, aspectRatio, {
        forceEnrich: true,
        topic: parsed.topic || parsed.title || '',
        mode: activeTab,
        style: parsed.style || '',
        allowWhiteStudio: activeTab === 'character'
      }));
      return parsed;
    };

    try {
      return await runOnce();
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      setLoadingText('Repairing storyboard JSON structure...');
      return await runOnce(err.message || 'Invalid storyboard JSON');
    }
  };

  const fetchSingleImage = async (customPrompt, ratioToUse, signal = null, idx = 0, options = {}) => {
    const {
      identityBible = '',
      continuityDataUrl = null,
      negative = DEFAULT_NEGATIVE,
      motionGraphicsMode = false,
      topicLock = ''
    } = options;
    const activeUploadData = getActiveUploadData();
    const activeProducts = (activeUploadData.products || []).filter(p => p.base64);
    const activeBackgrounds = (activeUploadData.backgrounds || []).filter(b => b.base64);
    const hasFace = !!(activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64);
    const hasContinuity = !!(continuityDataUrl && continuityDataUrl.startsWith('data:image'));
    const isGuided = activeProducts.length > 0 || hasFace || hasContinuity || activeBackgrounds.length > 0;

    try {
      let ratioDirective = ratioToUse === '9:16'
          ? "CRITICAL 9:16 PRIORITY: The canvas MUST be exactly 9:16 vertical."
          : ratioToUse === '16:9'
          ? "CRITICAL 16:9 PRIORITY: The canvas MUST be exactly 16:9 horizontal."
          : `FINAL OUTPUT FORMAT: You MUST render this image fully covering a ${ratioToUse} canvas.`;

      const allowWhiteStudio = activeTab === 'character' || (
        activeTab === 'fake_influencer' && String(fiFormat || '').includes('Character Sheet')
      );
      let cleanImageInstruction = motionGraphicsMode
        ? " [MOTION GRAPHICS FRAME: designed graphic still with colored set/depth, sharp UI/type/icons, commercial explainer quality. Text only if part of the design. NO plain white empty canvas.]"
        : allowWhiteStudio
        ? " [CHARACTER SHEET: clean white/soft studio OK for reference sheet only. No text overlays.]"
        : " [ENVIRONMENT LOCK: Photoreal storyboard still with a FULL detailed background matching the scene (room, city, nature, cafe, set). NO plain white background, NO empty white studio, NO blank backdrop. No watermarks.]";
      let handAnatomyLock = motionGraphicsMode
        ? " [DESIGN MODE: Prefer flat/3D motion-graphics elements, charts, kinetic type, product renders — not live-action fashion photography.]"
        : " [MANDATORY PHYSICS: Flawless hand anatomy. ORIENTATION LOCK: All held objects, products, devices, screens, and text MUST be in correct upright orientation — NEVER mirrored, flipped, or upside down. Buttons, logos, and screens must face the viewer correctly.]";
      const bibleBlock = identityBible ? `\n${identityBible}\n` : '';
      const topicBlock = topicLock
        ? `\n[TOPIC LOCK — MANDATORY]: This image MUST visually represent: "${topicLock}". Do not replace with unrelated people or scenes.\n`
        : '';
      const envLock = allowWhiteStudio
        ? ''
        : `\n[BACKGROUND LOCK]: Render the exact environment described in the prompt. Fill the frame with location, lighting, and props. Never collapse to pure white.`;
      const negBlock = `\nNEGATIVE: ${withEnvNegative(negative, allowWhiteStudio)}${motionGraphicsMode ? ', live-action influencer selfie, random human portrait, fashion photoshoot, hijab model stock photo, plain white canvas' : ''}`;
      let fullPromptWithClean = `${customPrompt}${topicBlock}${bibleBlock}${envLock} ${handAnatomyLock} ${cleanImageInstruction}${negBlock}`;

      let parts = [{ text: `${ratioDirective}\n\nPROMPT: ${fullPromptWithClean}` }];
      
      if (!motionGraphicsMode && activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64) {
        parts[0].text += "\n\n[MANDATORY BIOMETRIC FACE LOCK]: Preserve the exact facial structure from the attached FACE REFERENCE IMAGE.";
        parts.push({ text: "=== FACE REFERENCE IMAGE ===" });
        parts.push({ inlineData: { mimeType: activeUploadData.uploadedFaceMimeType || "image/jpeg", data: activeUploadData.uploadedFaceBase64 } });
      }

      if (activeProducts.length > 0) {
        if (activeTab === 'character') {
          parts[0].text += "\n\n[CHARACTER SHEET REFERENCE — ABSOLUTE SOURCE OF TRUTH]: The attached REFERENCE IMAGE is the DEFINITIVE visual identity source. You MUST replicate every visible detail: face structure, hair, clothing, colors, proportions, accessories, and distinguishing features EXACTLY as shown. Do NOT redesign, reinterpret, beautify, or deviate from this reference. Every panel in the character sheet must depict THIS EXACT subject.";
        } else if (motionGraphicsMode) {
          parts[0].text += "\n\n[BRAND / PRODUCT GRAPHIC REFERENCE]: Use attached assets for logo, packaging colors, or product look inside motion-graphics composition. Do NOT force a human model holding the product unless the topic requires it.";
        } else {
          parts[0].text += "\n\n[MANDATORY ITEM LOCK]: The human MUST wear/hold ONLY the product from the attached REFERENCE IMAGE. [CRITICAL PHYSICAL ACCURACY]: Replicate the EXACT physical layout of the product — all buttons, joysticks, logos, ports, and controls must be in their CORRECT original positions as shown in the reference. Do NOT mirror, flip, or swap left/right button positions. The product orientation must match reality exactly as a real photograph would show it. [STRICT NO-ADD RULE]: Do NOT add any accessories, items, jewelry, gadgets, bags, headphones, watches, glasses, or props that are NOT visible in the uploaded product reference image. The model should ONLY interact with the exact product shown — nothing else added by AI imagination.";
        }
        activeProducts.forEach((p, indexSlot) => {
          parts.push({ text: `=== REFERENCE IMAGE ${indexSlot + 1} ===` });
          parts.push({ inlineData: { mimeType: p.mimeType || "image/jpeg", data: p.base64 } });
        });
      }

      if (activeTab !== 'character' && activeBackgrounds.length > 0) {
        parts[0].text += "\n\n[CRITICAL ENVIRONMENT BACKGROUND LOCK]: You MUST strictly use the attached BACKGROUND REFERENCE images as the sole environment. If the camera angle changes for the scene, you must visualize this EXACT SAME room/location from that new perspective. DO NOT invent new rooms, buildings, or locations. Keep the architecture, lighting, props, and style 100% identical to the reference.";
        activeBackgrounds.forEach((b, indexSlot) => {
          parts.push({ text: `=== BACKGROUND / ENVIRONMENT REFERENCE ${indexSlot + 1} ===` });
          parts.push({ inlineData: { mimeType: b.mimeType || "image/jpeg", data: b.base64 } });
        });
      }

      if (hasContinuity) {
        const mimeType = continuityDataUrl.substring(continuityDataUrl.indexOf(':') + 1, continuityDataUrl.indexOf(';'));
        const base64Data = continuityDataUrl.split(',')[1];
        parts[0].text += motionGraphicsMode
          ? "\n\n[CONTINUITY ANCHOR — GRAFIX]: Match the SAME motion-graphics style, color palette, type treatment, and topic branding as the CONTINUITY FRAME. New scene layout/animation pose is OK; do not switch to unrelated live-action people."
          : "\n\n[CONTINUITY ANCHOR]: Match the SAME person, face, wardrobe, product, and color grade as the CONTINUITY FRAME. Only change camera angle/pose/action as requested.";
        parts.push({ text: motionGraphicsMode ? "=== CONTINUITY FRAME (STYLE LOCK) ===" : "=== CONTINUITY FRAME (HERO LOCK) ===" });
        parts.push({ inlineData: { mimeType: mimeType || 'image/jpeg', data: base64Data } });
      }

      if (isGuided) {
        const payload = {
          contents: [{ role: 'user', parts }],
          generationConfig: { responseModalities: ['IMAGE'] }
        };
        const data = await callGeminiApi(IMAGE_MODEL, payload, false, signal);
        const newBase64 = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (!newBase64) throw new Error('Gemini Image Model did not return an image.');
        return `data:image/jpeg;base64,${newBase64}`;
      } else {
        const payload = {
          contents: [{ role: 'user', parts }],
          generationConfig: { responseModalities: ['IMAGE'] }
        };
        const data = await callGeminiApi(IMAGE_MODEL, payload, false, signal);
        const newBase64 = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (!newBase64) throw new Error('Gemini did not return an image.');
        return `data:image/jpeg;base64,${newBase64}`;
      }
    } catch (err) {
      if (err.name === 'AbortError') return null;
      console.warn("API image generation failed", err);
      throw err;
    }
  };

  const getSelectedDurationSeconds = () => {
    const byTab = {
      cinematic_pro: cinematicDuration,
      microimpact: '10',
      narrativearc: '30',
      talkinghead: thDuration,
      stopmotion: smDuration || '10',
      grafix: gfDuration,
      product: duration,
      ugc: duration,
      ootd: duration,
      character: duration || '10',
      fake_influencer: '10'
    };
    const selected = byTab[activeTab] ?? duration ?? '30';
    const fromUser = parseDurationToSeconds(selected);
    if (fromUser > 0) return fromUser;
    const fromOutput = parseDurationToSeconds(generatedOutput?.duration);
    return fromOutput || 30;
  };

  const collectScenesForFlow = () => {
    if (!generatedOutput) return [];
    const raw =
      generatedOutput.scenes ||
      generatedOutput.productScenes ||
      generatedOutput.ootdScenes ||
      [];
    return (Array.isArray(raw) ? raw : []).map((s, i) => ({
      ...s,
      scene_num: s.scene_num || s.sceneNumber || (i + 1),
      visual: s.visual || s.videoPrompt || s.visual_prompt || '',
      dialogue: s.dialogue || s.script || '',
      camera: s.camera || '',
      action: s.action || s.movement || '',
      emotion: s.emotion || '',
      timecode: s.timecode || '',
      i2v_prompt: s.i2v_prompt || '',
      image_prompt: s.image_prompt || s.imageGenerationPrompt || ''
    }));
  };

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        const containerWidth = tabsContainerRef.current.clientWidth;
        const btnOffset = activeBtn.offsetLeft;
        const btnWidth = activeBtn.clientWidth;
        tabsContainerRef.current.scrollTo({
          left: btnOffset - containerWidth / 2 + btnWidth / 2,
          behavior: 'smooth'
        });
      }
    }
    handleTabsScroll();
  }, [activeTab]);

  const handleTabsScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollPercent((scrollLeft / maxScroll) * 100);
      } else {
        setScrollPercent(0);
      }
    }
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = 250;
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleFiGenderChange = (e) => {
    const newGender = e.target.value;
    setFiGender(newGender);
    if (newGender === 'Male') {
      if (fiNiche === 'Hijab Fashion MY') setFiNiche('TikTok Malaysia Affiliate');
      setFiVibe('Malaysia Local Influencer (main)');
      if (fiFaceShape === 'Heart-shaped face') setFiFaceShape('Strong jawline');
      setFiHair('Short neat black hair (kerap potong)');
      setFiOutfit('Casual MY OOTD (plain tee + jeans)');
    } else {
      setFiVibe('Malaysia Local Influencer (main)');
      if (fiFaceShape === 'Strong jawline') setFiFaceShape('Heart-shaped face');
      setFiHair('Long straight black hair (Raya sleek)');
      setFiOutfit('Casual MY OOTD (cotton tee + jeans)');
    }
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  const renderAspectRatioButtons = () => (
    <div className="flex gap-2">
      {ASPECT_RATIOS.map((r) => (
        <button
          key={r.v}
          onClick={() => handleRatioChange(r.v)}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold ${aspectRatio === r.v ? 'bg-sky-500 text-white' : (t('bg-[#0a0c10] text-gray-400', 'bg-gray-100 text-gray-500'))}`}
        >
          {r.l}
        </button>
      ))}
    </div>
  );

  const getFramingPrompt = (ratio, isModel) => {
    if (isModel) {
      if (ratio === '9:16') return "[STRICT_RATIO_9:16: Render exactly 9:16 vertical canvas. Vertical full body framing, perfectly centered. Face visible.]";
      if (ratio === '16:9') return "[STRICT_RATIO_16:9: Render exactly 16:9 horizontal canvas. Extremely wide horizontal camera, full body shot centered.]";
      return "[STRICT_RATIO_1:1: Render exactly 1:1 square canvas. Balanced composition, full body shot.]";
    } else {
      if (ratio === '9:16') return "[STRICT_RATIO_9:16: Render exactly 9:16 vertical canvas. Centered product shot.]";
      if (ratio === '16:9') return "[STRICT_RATIO_16:9: Render exactly 16:9 horizontal canvas. Wide studio layout.]";
      return "[STRICT_RATIO_1:1: Render exactly 1:1 square canvas. Centered product.]";
    }
  };

  const copyToClipboard = (text, sectionId) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedSection(sectionId);
        setTimeout(() => setCopiedSection(''), 2000);
      })
      .catch((err) => {
        const textAreas = document.createElement("textarea");
        textAreas.value = text;
        textAreas.style.position = "fixed";
        textAreas.style.opacity = "0";
        document.body.appendChild(textAreas);
        textAreas.focus();
        textAreas.select();
        try {
          document.execCommand('copy');
          setCopiedSection(sectionId);
          setTimeout(() => setCopiedSection(''), 2000);
        } catch (e) {
          console.error('Fallback copy failed', e);
        }
        document.body.removeChild(textAreas);
      });
  };

  const cancelAllGenerations = () => {
    generationAborted.current = true;
    mainAbortController.current?.abort();
    Object.values(gridAbortControllers.current).forEach((ctrl) => ctrl.abort());
    setRegeneratingIndexes({});
    setIsGeneratingImage(false);
    setIsGeneratingAll(false);
    setIsMagicEditing({});
  };

  const handleTabChange = (tab) => {
    if (activeTab === tab) return;

    setTabCache(prev => ({
      ...prev,
      [activeTab]: {
        generatedOutput,
        imageUrls,
        editableImagePrompt,
        currentDisplayRatio,
        aspectRatio
      }
    }));

    cancelAllGenerations();
    setActiveTab(tab);

    setZoomedImages({});
    setCopiedSection('');
    setShowMagicBox({});
    setMagicPrompts({});
    setErrorMessage('');
    setEditModes({});

    const cached = tabCache[tab];
    if (cached) {
      setGeneratedOutput(cached.generatedOutput);
      setImageUrls(cached.imageUrls);
      setEditableImagePrompt(cached.editableImagePrompt);
      setCurrentDisplayRatio(cached.currentDisplayRatio);
      setAspectRatio(cached.aspectRatio);
    } else {
      setGeneratedOutput(null);
      setImageUrls([]);
      setEditableImagePrompt('');
      setCurrentDisplayRatio(null);

      if (tab === 'character') {
        setAspectRatio('16:9');
      } else {
        setAspectRatio('9:16');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRatioChange = (newRatio) => {
    if (newRatio === aspectRatio) return;
    setAspectRatio(newRatio);
  };

  const handleProductUpload = async (e, index) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64Compressed = await compressImage(file);
      const activeUploadData = getActiveUploadData();
      const newProducts = [...activeUploadData.products];
      newProducts[index] = { name: file.name, mimeType: file.type, data: base64Compressed, base64: base64Compressed };
      updateTabUpload('products', newProducts);
    }
  };

  const handleRemoveProduct = (index) => {
    const activeUploadData = getActiveUploadData();
    const newProducts = [...activeUploadData.products];
    newProducts[index] = { name: '', base64: null, mimeType: null };
    updateTabUpload('products', newProducts);
  };

  const handleBackgroundUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newBackgrounds = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const base64Compressed = await compressImage(file);
        newBackgrounds.push({
          name: file.name,
          mimeType: file.type,
          base64: base64Compressed,
        });
      }
      const activeUploadData = getActiveUploadData();
      const existingBackgrounds = activeUploadData.backgrounds || [];
      updateTabUpload('backgrounds', [...existingBackgrounds, ...newBackgrounds]);
    }
  };

  const handleRemoveBackground = (index) => {
    const activeUploadData = getActiveUploadData();
    const newBackgrounds = [...(activeUploadData.backgrounds || [])];
    newBackgrounds.splice(index, 1);
    updateTabUpload('backgrounds', newBackgrounds);
  };

  const handleFaceUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64Compressed = await compressImage(file);
      updateTabUpload('faceFileName', file.name);
      updateTabUpload('uploadedFaceMimeType', file.type);
      updateTabUpload('uploadedFaceBase64', base64Compressed);

      if (activeTab === 'character' && charSubjectType === 'AUTO_DETECT') {
          setLoadingText('Analyzing Character Reference...');
          try {
             const payload = {
                contents: [{ role: 'user', parts: [
                    { text: "Analyze this image and identify the primary subject. Reply strictly with one of these values: HUMAN_CHARACTER, PRODUCT_CHARACTER, VEHICLE_CHARACTER, ANIMAL_CHARACTER, MASCOT_CHARACTER, or OBJECT_CHARACTER." },
                    { inlineData: { mimeType: file.type || 'image/jpeg', data: base64Compressed } }
                ]}],
                generationConfig: { temperature: 0.1 }
             };
             const data = await callGeminiApi(selectedModel, payload, false, null);
             const detectVal = extractGeminiText(data).trim();
             if (['HUMAN_CHARACTER', 'PRODUCT_CHARACTER', 'VEHICLE_CHARACTER', 'ANIMAL_CHARACTER', 'MASCOT_CHARACTER', 'OBJECT_CHARACTER'].includes(detectVal)) {
                 setCharSubjectType(detectVal);
             }
          } catch(err) {
              console.warn("Auto detect failed", err);
          }
          setLoadingText('');
      }
    }
  };

  const handleRemoveFace = () => {
    updateTabUpload('faceFileName', '');
    updateTabUpload('uploadedFaceBase64', null);
    updateTabUpload('uploadedFaceMimeType', null);
  };

  const toggleImageZoom = (index) => {
    setZoomedImages(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleMagicBox = (index) => {
    setShowMagicBox(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const generateVisual = async (promptInput, isRegenerate = false, overrideRatio = null, forcedLimit = 2, options = {}) => {
    // Skip image generation entirely in text-only mode
    if (generateMode === 'text_only' && !isRegenerate) {
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3500);
      return;
    }
    setIsGeneratingImage(true);
    setImageUrls([]);
    setZoomedImages({});
    setShowMagicBox({});
    setMagicPrompts({});

    const activeRatio = overrideRatio || aspectRatio;
    setCurrentDisplayRatio(activeRatio);
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;
    const {
      identityBible = '',
      useContinuity = true,
      concurrency = 3,
      negatives = null,
      motionGraphicsMode = false,
      topicLock = ''
    } = options;

    let generationSucceeded = false;

    try {
      const stabilitySuffix = motionGraphicsMode
        ? "[MANDATORY: Keep the same motion-graphics style, palette, and topic branding.]"
        : "[MANDATORY: KEEP THE PERSON AND FACE EXACTLY THE SAME AS THE REFERENCE].";
      let promptsToRun = [];
      let runLimit = forcedLimit || 2;

      if (Array.isArray(promptInput)) {
        promptsToRun = promptInput;
        runLimit = promptInput.length;
      } else {
        let masterPrompt = promptInput;
        promptsToRun = [
          masterPrompt,
          `${masterPrompt} [Variation: ${motionGraphicsMode ? 'alternate graphic layout / camera move on same topic' : 'dynamic camera angle'}. ${stabilitySuffix}]`
        ];
        runLimit = Math.min(forcedLimit || 2, 2);
      }

      const results = new Array(runLimit).fill(null);
      let lastImageError = null;
      let completed = 0;
      const bumpProgress = () => {
        completed += 1;
        setLoadingText(
          isRegenerate
            ? `Regenerating Visual ${completed}/${runLimit}...`
            : motionGraphicsMode
              ? `Generating Grafix Frame ${completed}/${runLimit}...`
              : `Generating Visual ${completed}/${runLimit} (Parallel & Continuity)...`
        );
      };

      const imgOptionsFor = (i, continuityDataUrl = null) => ({
        identityBible,
        continuityDataUrl,
        negative: Array.isArray(negatives) ? (negatives[i] || DEFAULT_NEGATIVE) : DEFAULT_NEGATIVE,
        motionGraphicsMode,
        topicLock
      });
      if (useContinuity && runLimit >= 3 && Array.isArray(promptInput)) {
        setLoadingText(isRegenerate ? 'Generating Hero Frame (Scene 1)...' : 'Generating Continuity Hero Frame...');
        try {
          const hero = await fetchSingleImage(promptsToRun[0], activeRatio, signal, 0, imgOptionsFor(0));
          if (signal.aborted) return;
          if (hero) {
            results[0] = hero;
            bumpProgress();
            setImageUrls([...results.filter(Boolean)]);
          } else {
            throw new Error('Hero frame generation failed.');
          }
        } catch (heroErr) {
          if (heroErr.name === 'AbortError') return;
          lastImageError = heroErr;
          throw heroErr;
        }

        const restIndexes = promptsToRun.slice(1).map((_, offset) => offset + 1);
        const publishSlots = () => {
          setImageUrls(results.filter(Boolean));
        };

        await mapWithConcurrency(
          restIndexes,
          Math.min(concurrency, restIndexes.length),
          async (i) => {
            if (signal.aborted) return null;
            try {
              const img = await fetchSingleImage(
                promptsToRun[i],
                activeRatio,
                signal,
                i,
                imgOptionsFor(i, results[0])
              );
              results[i] = img;
              bumpProgress();
              publishSlots();
              return img;
            } catch (imgErr) {
              if (imgErr.name === 'AbortError') return null;
              lastImageError = imgErr;
              console.error(`Visual ${i + 1} failed:`, imgErr);
              bumpProgress();
              return null;
            }
          }
        );
      } else {
        await mapWithConcurrency(
          promptsToRun.slice(0, runLimit).map((p, i) => ({ p, i })),
          Math.min(concurrency, runLimit),
          async ({ p, i }) => {
            if (signal.aborted) return null;
            try {
              const img = await fetchSingleImage(p, activeRatio, signal, i, imgOptionsFor(i));
              results[i] = img;
              bumpProgress();
              setImageUrls(results.filter(Boolean));
              return img;
            } catch (imgErr) {
              if (imgErr.name === 'AbortError') return null;
              lastImageError = imgErr;
              console.error(`Visual ${i + 1} failed:`, imgErr);
              bumpProgress();
              return null;
            }
          }
        );
      }

      if (signal.aborted) return;

      const byIndex = [];
      for (let i = 0; i < runLimit; i++) if (results[i]) byIndex.push(results[i]);
      if (byIndex.length > 0) {
        generationSucceeded = true;
        setImageUrls(byIndex);
        if (lastImageError && byIndex.length < runLimit) {
          setErrorMessage(`Partial visual failure (${byIndex.length}/${runLimit}). ${String(lastImageError.message || '')}`);
          setTimeout(() => setErrorMessage(''), 6000);
        }
      } else if (lastImageError) {
        setErrorMessage('Failed to generate visual: ' + String(lastImageError.message || 'Please try again.'));
        setTimeout(() => setErrorMessage(''), 6000);
      } else if (!signal.aborted) {
        setErrorMessage('No visual generated. Please retry.');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error visual generation:", error);
        setErrorMessage('Visual generation failed: ' + String(error.message || 'Unknown network error.'));
        setTimeout(() => setErrorMessage(''), 6000);
      }
    } finally {
      if (!mainAbortController.current?.signal.aborted) {
        setIsGeneratingImage(false);
        if (generationSucceeded) {
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 3500);
        }
      }
      mainAbortController.current = null;
    }
  };

  const regenerateSingleVisual = async (index) => {
    setRegeneratingIndexes(prev => ({ ...prev, [index]: true }));
    gridAbortControllers.current[index] = new AbortController();

    const lockedRatio = currentDisplayRatio || aspectRatio;
    const uniqueSeed = `[Variation Seed: ${Date.now() + index}]`;
    const stabilitySuffix = "[MANDATORY: KEEP THE PERSON AND FACE EXACTLY THE SAME AS THE REFERENCE].";
    const identityBible = generatedOutput?.identityBible || '';
    const allowWhite = activeTab === 'character' || (activeTab === 'fake_influencer' && String(fiFormat || '').includes('Character Sheet'));
    const envRegen = allowWhite ? '' : ' Keep the same detailed environment/location (NOT plain white background).';
    const topicLock = generatedOutput?.topic || productName || cinematicTopic || gfTopic || '';

    try {
      // If images are combined (2 scenes per slot), regenerate both scenes and re-combine
      if (generatedOutput?._imagesCombined && Array.isArray(editableImagePrompt) && editableImagePrompt.length >= 6) {
        const sceneIdxA = index * 2;
        const sceneIdxB = index * 2 + 1;
        const promptA = editableImagePrompt[sceneIdxA] || editableImagePrompt[0];
        const promptB = editableImagePrompt[sceneIdxB] || editableImagePrompt[1];
        const signal = gridAbortControllers.current[index].signal;

        const fullPromptA = `${promptA}. ${uniqueSeed} [Alternative angle. ${stabilitySuffix}]${envRegen}${identityBible ? `\n${identityBible}` : ''}`;
        const fullPromptB = `${promptB}. [Variation Seed: ${Date.now() + index + 99}] [Alternative angle. ${stabilitySuffix}]${envRegen}${identityBible ? `\n${identityBible}` : ''}`;

        setLoadingText(`Regenerating Scene ${sceneIdxA + 1} & ${sceneIdxB + 1}...`);

        const imgA = await fetchSingleImage(fullPromptA, lockedRatio, signal, sceneIdxA, {
          identityBible, continuityDataUrl: null,
          negative: withEnvNegative(DEFAULT_NEGATIVE, allowWhite), topicLock
        });
        if (signal.aborted) return;

        const imgB = await fetchSingleImage(fullPromptB, lockedRatio, signal, sceneIdxB, {
          identityBible, continuityDataUrl: imgA,
          negative: withEnvNegative(DEFAULT_NEGATIVE, allowWhite), topicLock
        });
        if (signal.aborted) return;

        if (imgA && imgB) {
          const combined = await combineImagesVerticallyPair(imgA, imgB, lockedRatio);
          setImageUrls(prev => {
            const newUrls = [...prev];
            newUrls[index] = combined;
            return newUrls;
          });
        } else if (imgA) {
          setImageUrls(prev => { const u = [...prev]; u[index] = imgA; return u; });
        }
      } else {
        // Standard single-image regeneration
        let basePromptForRegen = Array.isArray(editableImagePrompt) ? (editableImagePrompt[index] || editableImagePrompt[0]) : editableImagePrompt;
        const continuityDataUrl = index > 0 && imageUrls[0] ? imageUrls[0] : null;
        const prompt = `${basePromptForRegen}. ${uniqueSeed} [Alternative camera angle. ${stabilitySuffix}]${envRegen}${identityBible ? `\n${identityBible}` : ''}`;

        const newImgUrl = await fetchSingleImage(prompt, lockedRatio, gridAbortControllers.current[index].signal, index, {
          identityBible, continuityDataUrl,
          negative: withEnvNegative(DEFAULT_NEGATIVE, allowWhite), topicLock
        });
        if (newImgUrl) {
          setImageUrls(prev => { const u = [...prev]; u[index] = newImgUrl; return u; });
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Individual regeneration error:", err);
        setErrorMessage('Failed to regenerate visual: ' + String(err.message || 'Please try again.'));
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } finally {
      setRegeneratingIndexes(prev => ({ ...prev, [index]: false }));
      delete gridAbortControllers.current[index];
    }
  };

  const performMagicEdit = async (index) => {
    const prompt = magicPrompts[index];
    if (!prompt || !prompt.trim()) return;

    setRegeneratingIndexes(prev => ({ ...prev, [index]: true }));
    setIsMagicEditing(prev => ({ ...prev, [index]: true }));
    gridAbortControllers.current[index] = new AbortController();

    try {
      const currentImageUrl = imageUrls[index];
      if (!currentImageUrl || !currentImageUrl.startsWith('data:image')) {
        throw new Error("No base image present to execute magic modifications.");
      }

      const mimeType = currentImageUrl.substring(currentImageUrl.indexOf(':') + 1, currentImageUrl.indexOf(';'));
      const base64Data = currentImageUrl.split(',')[1];
      const magicInstruction = `[MAGIC EDIT INSTRUCTION]: ${prompt}.
Keep the subject person, face reference, background layout, and clothes identical to the reference provided. Only apply the specific requested edit.`;

      const payload = {
        contents: [{
          role: "user",
          parts: [
            { text: magicInstruction },
            { inlineData: { mimeType: mimeType, data: base64Data } }
          ]
        }],
        generationConfig: { responseModalities: ['IMAGE'] }
      };

      const data = await callGeminiApi(IMAGE_MODEL, payload, false, gridAbortControllers.current[index].signal);
      const partsList = data?.candidates?.[0]?.content?.parts || [];
      const newBase64 = partsList.find(p => p.inlineData && p.inlineData.data)?.inlineData?.data;

      if (newBase64) {
        setImageUrls(prev => {
          const newUrls = [...prev];
          newUrls[index] = `data:image/jpeg;base64,${newBase64}`;
          return newUrls;
        });
        setShowMagicBox(prev => ({ ...prev, [index]: false }));
        setMagicPrompts(prev => ({ ...prev, [index]: '' }));
      } else throw new Error("Processing logic halted, model failed to return binary arrays.");
    } catch (err) {
      if (err.name !== 'AbortError') {
        setErrorMessage("Magic Box execution failed. Supply clearer instruction parameters.");
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } finally {
      setRegeneratingIndexes(prev => ({ ...prev, [index]: false }));
      setIsMagicEditing(prev => ({ ...prev, [index]: false }));
      delete gridAbortControllers.current[index];
    }
  };

  const getCaptionAndHashtags = () => {
    if (activeTab === 'character' || activeTab === 'fake_influencer') {
      return '';
    }

    const displayCategory = activeTab === 'ootd' ? 'Outfit' : category;
    const pName = productName.trim() !== '' ? productName.trim() : displayCategory;
    const noSpaceName = pName.replace(/[^a-zA-Z0-9]/g, '');

    let platformHashtags = "";
    let platformCallOut = "";

    if (platform === 'TikTok') {
      platformHashtags = `#FYP #TikTokMalaysia #TikTokPromote #${activeTab === 'ootd' ? 'TikTokFashion #OOTDMalaysia' : 'TikTokReview #RacunTikTok #Recommendation'}`;
      platformCallOut = "Korang kena dapatkan cepat sebelum sold out teruk! 🛒👇";
    } else if (platform === 'Reels') {
      platformHashtags = `#ExplorePage #ReelsInstagram #ReelsMalaysia #${activeTab === 'ootd' ? 'InstaFashion #OOTDReels' : 'InstagramReview #ViralMalaysia'}`;
      platformCallOut = "Boleh check out dekat link bio I sekarang okay! ✨";
    } else {
      platformHashtags = `#RacunAesthetic #${activeTab === 'ootd' ? 'OOTDStyle' : 'ProductReview'}`;
      platformCallOut = "Link pembelian ada dekat ruangan yang disediakan ya! ✨";
    }

    const captionTemplates = [
      `Sumpah I tak menyesal langsung beli ${pName} ni! 😭✨ Kualiti dia memang premium habis weh!`,
      `Akhirnya dapat pun try ${pName} yang tengah viral gila tu! Memang berbaloi gila 💯`,
      `Racun aesthetic kalini: ${pName}. Korang dah grab ke belum? Sila cepat weh sebelum kehabisan stock! 🛒👇`
    ];
    const selectedCaption = getRandomElement(captionTemplates);

    return `${selectedCaption}\n\n${platformCallOut}\n\n${platformHashtags} #${noSpaceName}`;
  };

  const handleRegenerateCaption = () => {
      if (!generatedOutput) return;
      const newCap = getCaptionAndHashtags();
      setGeneratedOutput(prev => ({
          ...prev,
          caption: newCap
      }));
      setBoxEdits(prev => ({ ...prev, caption: newCap }));
  };

  const generateNewMode = async (mode) => {
    const validators = {
      cinematic_pro: () => cinematicTopic.trim(),
      microimpact: () => microImpactTopic.trim(),
      narrativearc: () => narrativeArcTopic.trim(),
      talkinghead: () => thTopic.trim(),
      stopmotion: () => smProduct.trim(),
      grafix: () => gfTopic.trim()
    };
    if (validators[mode] && !validators[mode]()) {
      setErrorMessage('Please fill in the core topic or idea field first.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    setIsGeneratingAll(true);
    setGeneratedOutput(null);
    setImageUrls([]);
    setShowMagicBox({});
    setMagicPrompts({});
    setBoxEdits({});
    setEditModes({});
    setLoadingText('Analyzing assets & constructing storyboard architecture...');

    const activeUploadData = getActiveUploadData();
    const refCount = (activeUploadData.products || []).filter(p => p.base64).length;
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;

    try {
      let assetAnalysis = '';
      const hasFace = activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64;
      const hasBackgrounds = activeUploadData.backgrounds && activeUploadData.backgrounds.length > 0;
      
      if (refCount > 0 || hasFace || hasBackgrounds) {
        setLoadingText('Absorbing visual data from reference images...');
        try {
          assetAnalysis = await analyzeReferenceAssets(signal);
        } catch (analyzeErr) {
          if (analyzeErr.name === 'AbortError') throw analyzeErr;
          console.warn('Reference analysis skipped:', analyzeErr);
        }
      }

      const topicByMode = {
        cinematic_pro: cinematicTopic,
        microimpact: microImpactTopic,
        narrativearc: narrativeArcTopic,
        talkinghead: thTopic,
        stopmotion: smProduct,
        grafix: gfTopic
      };
      const durationByMode = {
        cinematic_pro: cinematicDuration,
        microimpact: '10',
        narrativearc: '30',
        talkinghead: thDuration,
        stopmotion: smDuration || '10',
        grafix: gfDuration
      };
      const styleByMode = {
        cinematic_pro: cinematicStyle,
        microimpact: 'micro-impact',
        narrativearc: 'Flow AI',
        talkinghead: thTone,
        stopmotion: smStyle,
        grafix: gfStyle
      };

      const topicText = (topicByMode[mode] || '').trim();
      const isGrafix = mode === 'grafix';
      const identityBible = isGrafix
        ? buildGrafixStyleBible(topicText, styleByMode[mode], aspectRatio, assetAnalysis)
        : buildIdentityBible({
            mode,
            productName: topicText,
            gender,
            hijabMode,
            environment: `Varied cinematic locations matching the topic "${topicText}" — each scene has a specific place, lighting, and background detail (never plain white studio)`,
            style: styleByMode[mode] || '',
            assetAnalysis,
            extra: parsedIdentityNote(mode)
          });

      let expectedCount = expectedSceneCountForDuration(
        durationByMode[mode],
        mode === 'cinematic_pro' ? 'default' : mode
      );
      let promptText = '';
      if (mode === 'cinematic_pro') promptText = getCinematicStoryboardPrompt(cinematicTopic, cinematicDuration, cinematicStyle, aspectRatio, cinematicAudience, refCount, identityBible, assetAnalysis);
      else if (mode === 'microimpact') promptText = getMicroImpactPrompt(microImpactTopic, aspectRatio, microImpactAudience, refCount, identityBible, assetAnalysis);
      else if (mode === 'narrativearc') promptText = getNarrativeArcPrompt(narrativeArcTopic, aspectRatio, narrativeArcAudience, refCount, identityBible, assetAnalysis);
      else if (mode === 'talkinghead') promptText = getTalkingHeadPrompt(thTopic, thDuration, thTone, aspectRatio, thAudience, refCount, identityBible, assetAnalysis);
      else if (mode === 'stopmotion') promptText = getStopMotionPrompt(smProduct, smDuration, smStyle, aspectRatio, smAudience, refCount, identityBible, assetAnalysis);
      else if (mode === 'grafix') promptText = getGrafixPrompt(topicText, gfDuration, aspectRatio, gfStyle, "", refCount, identityBible, assetAnalysis);

      setLoadingText(isGrafix ? 'Generating Grafix framework series...' : 'Building JSON sequence array...');
      const parsed = await fetchStoryboardJson(promptText, expectedCount, signal);
      if (signal.aborted) return;
      const lockedSec = parseDurationToSeconds(durationByMode[mode]) || expectedCount * 5 || 30;
      parsed.duration = `${lockedSec}s`;
      if (Array.isArray(parsed.scenes) && parsed.scenes.length) {
        parsed.scenes = lockScenesToDuration(parsed.scenes, lockedSec);
      }
      if (isGrafix && topicText) {
        const topicLower = topicText.toLowerCase();
        parsed.scenes = (parsed.scenes || []).map((s, idx) => {
          const blob = `${s.visual || ''} ${s.image_prompt || ''} ${s.action || ''}`.toLowerCase();
          const mentionsTopic = topicLower.split(/\s+/).filter((w) => w.length > 3).some((w) => blob.includes(w))
            || blob.includes(topicLower.slice(0, Math.min(24, topicLower.length)));
          if (mentionsTopic) return s;
          return {
            ...s,
            visual: `Motion graphics about "${topicText}". ${s.visual || ''}`.trim(),
            image_prompt: `Motion graphics still frame about "${topicText}". ${s.image_prompt || s.visual || 'Clean kinetic design composition.'} Style: ${gfStyle || 'motion-graphics'}. Aspect ${aspectRatio}.`,
            i2v_prompt: s.i2v_prompt
              ? `${s.i2v_prompt} Keep topic: ${topicText}.`
              : `Animate motion graphics for topic "${topicText}" with kinetic type and graphic transitions.`,
            dialogue: s.dialogue || ''
          };
        });
        parsed.title = parsed.title && String(parsed.title).includes(topicText.slice(0, 20))
          ? parsed.title
          : `📊 ${topicText}`;
        parsed.topic = topicText;
      }

      const finalBible = parsed.identity_bible
        ? `${identityBible}\nModel lock: ${parsed.identity_bible}`
        : identityBible;

      const gfNeg = withEnvNegative(`${DEFAULT_NEGATIVE}, live-action influencer, random portrait, fashion model, unrelated stock photo`, false);
      parsed.scenes = (parsed.scenes || []).map((s, idx) => normalizeScene(s, idx, aspectRatio, {
        forceEnrich: true,
        topic: topicText,
        mode,
        style: styleByMode[mode] || parsed.style || '',
        allowWhiteStudio: false
      }));
      parsed.scenes = lockScenesToDuration(parsed.scenes, lockedSec);
      parsed.duration = `${lockedSec}s`;

      const sceneLines = parsed.scenes.map((s, idx) => {
        const num = s.scene_num || (idx + 1);
        return `[ADENGAN ${num}] ${s.timecode || ''}\nVISUAL: ${s.visual}\nKAMERA: ${s.camera}\nAKSI: ${s.action}\nEMOSI: ${s.emotion}\nDIALOG: "${s.dialogue}"\nIMAGE_PROMPT: ${s.image_prompt}\nI2V: ${s.i2v_prompt}\nNEGATIVE: ${s.negative}`;
      }).join('\n\n');

      const continuityLine = isGrafix
        ? `CONTINUITY: Same motion-graphics style, palette, and TOPIC ("${topicText}") across ALL scenes. No random influencer faces.`
        : 'CONTINUITY: Same character/product identity across ALL scenes.';

      const vp = `TITLE: ${parsed.title || (isGrafix ? `📊 ${topicText}` : 'Papan Cerita Storyboard')}\nTOPIC: ${topicText}\nDURATION: ${lockedSec}s | FORMAT: ${aspectRatio}\nSTYLE: ${parsed.style || styleByMode[mode] || 'Cinematic'}\n\n${finalBible}\n\n${sceneLines}\n\n${continuityLine}`;

      const imagePrompts = parsed.scenes.map((s) => {
        const base = s.image_prompt || s.visual || '';
        if (isGrafix) {
          return [
            `MOTION GRAPHICS STILL — TOPIC: ${topicText}`,
            base,
            `Style: ${gfStyle && gfStyle !== 'auto' ? gfStyle : (parsed.style || 'motion graphics')}`,
            `Aspect ${aspectRatio}. Designed colorful environment/set for this topic — NOT plain white empty canvas.`,
            finalBible
          ].join('\n');
        }
        return [base, `TOPIC: ${topicText}`, `Aspect ${aspectRatio}.`, `NO plain white background.`, finalBible].join('\n');
      });
      const negatives = parsed.scenes.map((s) => withEnvNegative(s.negative || (isGrafix ? gfNeg : DEFAULT_NEGATIVE), false));

      const combinedRes = {
        ...parsed,
        scenes: parsed.scenes,
        topic: topicText,
        identityBible: finalBible,
        assetAnalysis,
        videoPrompt: vp,
        caption: parsed.title || topicText || 'Storyboard',
        duration: `${lockedSec}s`,
        selectedDurationSec: lockedSec,
        mode
      };
      setGeneratedOutput(combinedRes);
      setEditableImagePrompt(imagePrompts);
      setBoxEdits({
        videoPrompt: vp,
        caption: parsed.title || topicText || 'Storyboard',
        script: parsed.scenes.map((s, idx) => `[Adegan ${s.scene_num || (idx + 1)}]: "${s.dialogue || ''}"`).join('\n\n'),
        identityBible: finalBible
      });
      setCurrentDisplayRatio(aspectRatio);
      await generateVisual(imagePrompts, false, aspectRatio, imagePrompts.length, {
        identityBible: finalBible,
        useContinuity: true,
        concurrency: 3,
        negatives,
        motionGraphicsMode: isGrafix,
        topicLock: topicText || ''
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        const msg = String(err.message || 'Unknown network error.');
        const friendly = 'Failed to construct architecture: ' + msg;
        setErrorMessage(friendly);
        setTimeout(() => setErrorMessage(''), 8000);
      }
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const parsedIdentityNote = (mode) => {
    if (mode === 'stopmotion') return 'Tabletop stop-motion continuity; same product scale and lighting language.';
    if (mode === 'talkinghead') return 'Talking-head framing; consistent background and wardrobe.';
    if (mode === 'grafix') return 'Motion graphics brand palette consistency.';
    return 'Cinematic continuity across every scene.';
  };

  const generateAllContent = async () => {
    const activeUploadData = getActiveUploadData();

    if (activeTab === 'character') {
      if (!characterName.trim()) {
        setErrorMessage('Required field missing: Please supply Character Identity Name.');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
    } else if (activeTab === 'fake_influencer') {
      if (!fiName.trim()) {
        setErrorMessage('Required field missing: Identify Synthetic Persona Name.');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
    } else {
      if (!productName.trim()) {
        setErrorMessage('Required field missing: Specify Target Element / Subject.');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }
    }

    setIsGeneratingAll(true);
    setGeneratedOutput(null);
    setImageUrls([]);
    setZoomedImages({});
    setShowMagicBox({});
    setMagicPrompts({});
    setBoxEdits({});
    setEditModes({});
    setLoadingText(activeTab === 'ugc' ? 'Mapping UGC sequence architecture...' : 'Generating premium visual assets...');
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;

    try {
      let result = {};
      let promptInputForAI = "";
      let identityBible = '';
      let assetAnalysis = '';

      const activeProducts = (activeUploadData.products || []).filter(p => p.base64);
      const activeBackgrounds = (activeUploadData.backgrounds || []).filter(b => b.base64);
      const displayCategory = activeTab === 'ootd' ? 'Outfit' : category;
      const safeProductName = productName.trim() || (activeProducts.length > 0 ? "This Product" : displayCategory);

      if (activeProducts.length > 0 || (activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64) || activeBackgrounds.length > 0) {
        setLoadingText('Extracting features from reference images...');
        try {
          assetAnalysis = await analyzeReferenceAssets(signal);
        } catch (analyzeErr) {
          if (analyzeErr.name === 'AbortError') throw analyzeErr;
          console.warn('Reference analysis skipped:', analyzeErr);
        }
      }

      identityBible = buildIdentityBible({
        mode: activeTab,
        productName: safeProductName,
        category: displayCategory,
        gender,
        hijabMode,
        environment: activeTab === 'ugc' ? ugcEnvironment : (activeTab === 'ootd' ? location : productBackground),
        style: activeTab === 'ootd' ? style : energyLevel,
        assetAnalysis
      });
      result.identityBible = identityBible;
      result.assetAnalysis = assetAnalysis;

      const anatomyLock = "Correct human anatomy, No extra fingers.";
      const isModelActive = activeTab === 'product' ? productPOVMode === 'With Model' : true;
      let framingPrompt = getFramingPrompt(aspectRatio, isModelActive);
      const hdModifier = "4K HD, extremely detailed commercial presentation.";
      let cleanImageInstruction = activeTab === 'character'
        ? " [CHARACTER SHEET: clean white/soft studio background OK. No text overlay.]"
        : " [ENVIRONMENT REQUIRED: detailed real location/set matching the scene — furniture, walls, outdoor, cafe, etc. NO plain white background, NO empty white studio. No watermark text.]";

      let energyImageStyle = "";
      if (energyLevel === 'Calm aesthetic') energyImageStyle = "soft muted color palette, gentle diffused lighting";
      else if (energyLevel === 'Influencer energetic') energyImageStyle = "vibrant popping colors, bright daylight";
      else if (energyLevel === 'Premium brand vibe') energyImageStyle = "high-end editorial lighting, deep rich shadows";
      else if (energyLevel === 'Cozy ASMR') energyImageStyle = "intimate macro focus, warm ambient lighting";

      const targetModelHeader = `[GEMINI OMNI FLASH COMPATIBLE]
MOTION RESOLUTION: 4K Ultra Cinematic Video @24fps.
CAMERA SYSTEM: Ultra-stable static tripod shot.`;

      if (activeTab === 'product') {
        const isProductModelMode = productPOVMode === 'With Model';
        const isSpeakingProduct = productNarration === 'With Voice-Over';
        const productTotalSec = parseDurationToSeconds(duration) || 10;

        const productAction = activeProducts.length > 0
          ? `holding the EXACT product from the PRODUCT REFERENCE`
          : `holding the product named ${safeProductName}`;

        let productBgPrompt = "";
        if (productBackground === "Auto by AI") {
          productBgPrompt = "detailed aesthetic lifestyle interior with furniture, soft window light, depth and color (NOT plain white studio)";
        } else {
          productBgPrompt = `${productBackground} — fully detailed background with props and depth (NOT plain white)`;
        }
        if (isProductModelMode && productTotalSec >= 10) {
          const modelDesc = `young Asian ${gender}`;
          const framingPromptModel = getFramingPrompt(aspectRatio, true);
          const framingPromptProduct = getFramingPrompt(aspectRatio, false);
          const envBan = 'NO plain white background, NO empty white studio.';
          const n = productTotalSec <= 10 ? 2 : 3;

          // Dynamic dialogue based on product category
          const productCat = (category || 'General').toLowerCase();
          const isBeauty = /skincare|beauty|makeup|serum|moisturis|sunscreen|toner|foundation|lipstick|blush|mask/.test(productCat);
          const isFood = /food|makanan|snack|drink|minuman|supplement|vitamin|protein|beverage/.test(productCat);
          const isFashion = /fashion|clothing|baju|kasut|shoes|bag|beg|accessories|tudung|hijab|ootd/.test(productCat);
          const isGadget = /gadget|electronic|tech|phone|earphone|laptop|cable|charger|speaker/.test(productCat);
          const isHome = /home|rumah|kitchen|dapur|cleaning|organizer|storage|pillow|bedding/.test(productCat);

          const hookDialogues = isSpeakingProduct ? {
            beauty: `Kau tau tak kenapa kulit aku tiba-tiba jadi lagi cerah? Sebab ${safeProductName} ni. Serious game changer.`,
            food: `Korang kena cuba ${safeProductName} ni. Rasa dia bukan calang-calang — aku dah habis satu dalam masa 2 hari.`,
            fashion: `POV: kau jumpa benda yang buat outfit kau naik level 10x. Ni dia — ${safeProductName}.`,
            gadget: `Aku dah cuba banyak produk dalam kategori ni, tapi ${safeProductName} je yang betul-betul buat aku terkejut.`,
            home: `Rumah aku rasa lagi neat and organized lepas guna ${safeProductName} ni. Korang pun boleh.`,
            general: `Weh! Aku kena bagitau korang pasal ${safeProductName} ni — first impression memang susah nak lupa.`
          } : {};
          const demoDialogues = isSpeakingProduct ? {
            beauty: `Tengok — tekstur dia ringan, terus absorb. No greasy feel langsung. Kulit aku rasa macam kena upgrade.`,
            food: `Tengok ingredients dia — clean, no artificial stuff. Rasa dia pun natural. Memang worth it.`,
            fashion: `Material dia quality — tak cepat kedut, comfortable nak pakai seharian. Best part? Harga dia accessible.`,
            gadget: `Performance dia stable, build quality solid. Bukan murah tapi memang berbaloi untuk investment jangka panjang.`,
            home: `Guna je terus nampak result. Senang, practical, dan jimat masa. Exactly macam yang aku cari.`,
            general: `Tengok detail dia — quality memang nampak. Bukan sekadar cantik tapi functional betul-betul.`
          } : {};
          const ctaDialogues = isSpeakingProduct ? {
            beauty: `Kalau kau serius nak result, ${safeProductName} ni memang kena ada dalam routine. Klik beg kuning sekarang! 🛒`,
            food: `Stock dia cepat habis sebab ramai dah tau. Grab dulu sebelum terlambat — beg kuning bawah! 🛒`,
            fashion: `Limited stock. Kalau kau suka apa yang kau nampak, jangan tunggu lagi — klik beg kuning! 🛒`,
            gadget: `Investment yang betul-betul berbaloi. Grab sekarang sebelum harga naik — beg kuning bawah! 🛒`,
            home: `Upgrade rumah kau sekarang. Harga special masih ada — klik beg kuning sebelum sold out! 🛒`,
            general: `Berbaloi gila. Grab cepat sebelum stock habis — klik beg kuning sekarang! 🛒`
          } : {};

          const catKey = isBeauty ? 'beauty' : isFood ? 'food' : isFashion ? 'fashion' : isGadget ? 'gadget' : isHome ? 'home' : 'general';

          const roles = n === 2
            ? [
                { role: 'HOOK', framing: framingPromptModel, dialogue: hookDialogues[catKey] || '' },
                { role: 'CTA', framing: framingPromptModel, dialogue: ctaDialogues[catKey] || '' }
              ]
            : [
                { role: 'HOOK', framing: framingPromptModel, dialogue: hookDialogues[catKey] || '' },
                { role: 'DEMO', framing: framingPromptProduct, dialogue: demoDialogues[catKey] || '' },
                { role: 'CTA', framing: framingPromptModel, dialogue: ctaDialogues[catKey] || '' }
              ];
          const visuals = [
            `${modelDesc} discovering ${productAction}`,
            n === 2 ? `${modelDesc} showing satisfaction with ${safeProductName}` : `Hands demonstrating ${safeProductName}`,
            `${modelDesc} holding ${safeProductName} with confident smile`
          ];
          promptInputForAI = roles.map((r, i) =>
            `[SCENE ${i + 1} — ${r.role}] 4K photography. ${visuals[i]}. Background: ${productBgPrompt}. ${anatomyLock} Aspect ${aspectRatio}. ${hdModifier}. ${r.framing} ${cleanImageInstruction} ${envBan}`
          );
          result.productScenes = lockScenesToDuration(roles.map((r, i) => ({
            sceneNumber: i + 1,
            scene_num: i + 1,
            visual: `${targetModelHeader}\n\n[SCENE ${i + 1} — ${r.role}]\n${visuals[i]} in ${productBgPrompt}.`,
            dialogue: r.dialogue
          })), productTotalSec);
          result.videoPrompt = result.productScenes.map(s => s.visual).join('\n\n');
          result.script = isSpeakingProduct
            ? result.productScenes.map(s => `[Adegan ${s.sceneNumber}]: "${s.dialogue}"`).join('\n\n')
            : `[Mute Background Track]`;
        } else {
          if (isProductModelMode) {
            promptInputForAI = `High resolution 4K photography. A young Asian ${gender} model holding and showcasing the ${productAction}. Background: ${productBgPrompt}. Color grading: ${energyImageStyle}. ${anatomyLock} Aspect ratio: ${aspectRatio}. ${hdModifier}. ${framingPrompt} ${cleanImageInstruction} NO plain white background.`;
            result.videoPrompt = `${targetModelHeader}\nSCENE: A young Asian ${gender} gently showing ${productAction} to the camera in ${productBgPrompt}.`;
          } else {
            promptInputForAI = `First-person POV shot of a single human hand holding the ${productAction}. Background: ${productBgPrompt}. Color style: ${energyImageStyle}. ${anatomyLock} Aspect ratio: ${aspectRatio}. ${hdModifier}. ${framingPrompt} ${cleanImageInstruction} NO plain white background.`;
            result.videoPrompt = `${targetModelHeader}\nSCENE: Single human hand holding ${productAction} against ${productBgPrompt}.`;
          }
          const singleCatKey = (() => {
            const c = (category || '').toLowerCase();
            if (/skincare|beauty|makeup|serum|moisturis|sunscreen|toner|foundation|lipstick/.test(c)) return 'beauty';
            if (/food|makanan|snack|drink|minuman|supplement|vitamin|protein/.test(c)) return 'food';
            if (/fashion|clothing|baju|kasut|shoes|bag|beg|accessories|tudung|hijab/.test(c)) return 'fashion';
            if (/gadget|electronic|tech|phone|earphone|laptop|cable|charger|speaker/.test(c)) return 'gadget';
            if (/home|rumah|kitchen|dapur|cleaning|organizer|storage|pillow/.test(c)) return 'home';
            return 'general';
          })();
          const singleHooks = {
            beauty: `Kulit cerah dalam masa seminggu? Aku tak caya sampai aku try sendiri ${safeProductName} ni.`,
            food: `Serious, ${safeProductName} ni addictive gila. Sekali rasa, terus nak lagi.`,
            fashion: `Outfit game changed. ${safeProductName} ni buat aku nampak put-together dalam masa 5 minit.`,
            gadget: `${safeProductName} ni bukan sekadar gadget biasa. Performance dia buat aku speechless.`,
            home: `Lepas guna ${safeProductName} ni, rumah aku rasa macam baru renovate. Serius tak tipu.`,
            general: `Sumpah, ${safeProductName} ni betul-betul berbaloi. First time guna terus jatuh cinta.`
          };
          const singleScripts = {
            beauty: `[VOCAL PROMPT: ${productVoiceTone}]\n\nKorang ada masalah kulit yang sama macam aku? Cuba ${safeProductName} ni — dalam masa beberapa hari, memang nampak perbezaan. Texture ringan, absorb cepat, result pun nampak. Grab sekarang sebelum stock habis!`,
            food: `[VOCAL PROMPT: ${productVoiceTone}]\n\nAku dah cuba banyak produk dalam kategori ni, tapi ${safeProductName} je yang betul-betul buat aku repeat order. Rasa dia sedap, ingredients pun clean. Korang kena cuba sendiri — klik beg kuning sekarang!`,
            fashion: `[VOCAL PROMPT: ${productVoiceTone}]\n\nKorang cari outfit yang versatile, quality, tapi tak mahal? ${safeProductName} ni jawapan dia. Material best, design timeless. Aku dah pakai berkali-kali masih nampak cantik. Jangan lepaskan peluang ni!`,
            gadget: `[VOCAL PROMPT: ${productVoiceTone}]\n\nDalam dunia gadget, ramai yang bagi janji tapi tak deliver. ${safeProductName} ni beza — performance stabil, build quality solid, worth every ringgit. Kalau korang serius nak upgrade, ni masa yang tepat.`,
            home: `[VOCAL PROMPT: ${productVoiceTone}]\n\nRumah cantik tak perlu mahal. ${safeProductName} ni dah ubah cara aku organize ruang — simple, practical, dan nampak aesthetic. Grab sekarang dan rasa sendiri perbezaannya!`,
            general: `[VOCAL PROMPT: ${productVoiceTone}]\n\nSumpah weh, aku tak expect ${safeProductName} ni akan bagi impak sebesar ni. Quality memang nampak, function pun deliver. Korang yang tengah consider — jangan tunggu lagi, klik beg kuning sebelum stock habis!`
          };

          result.productScenes = lockScenesToDuration([{
            sceneNumber: 1, scene_num: 1,
            visual: result.videoPrompt,
            dialogue: isSpeakingProduct ? (singleHooks[singleCatKey] || singleHooks.general) : ''
          }], productTotalSec);

          if (isSpeakingProduct) {
            result.script = singleScripts[singleCatKey] || singleScripts.general;
          } else {
            result.script = `[Mute Background Track]`;
          }
        }
        result.caption = getCaptionAndHashtags();
        result.duration = `${productTotalSec}s`;
        result.selectedDurationSec = productTotalSec;
      }
      else if (activeTab === 'ootd') {
        const outfitDescription = activeProducts.length > 0
          ? "wearing the EXACT SAME outfit from the PRODUCT REFERENCE with high accuracy"
          : `wearing a modern fashion attire styled in ${style} aesthetic`;

        let finalLocationPrompt = `${location} background`;
        let mirrorInstruction = "";

        if (mirrorMode === 'true' || mirrorMode === true) {
          mirrorInstruction = `MIRROR SELFIE MODE: Large standing mirror selfie reflection.`;
          if (location === 'Auto by AI') finalLocationPrompt = "aesthetic cozy bedroom interior with bed, decor, large standing mirror, warm lamp light, visible room depth (NOT plain white)";
        } else {
          if (location === 'Auto by AI') finalLocationPrompt = "lifestyle interior with furniture, wall texture, window light and soft bokeh depth (NOT plain white studio)";
          else finalLocationPrompt = `${location} — detailed real location with props and depth (NOT plain white)`;
        }

        let hijabInstruction = "";
        if (gender === 'Wanita' || gender === 'Female') {
          hijabInstruction = hijabMode === 'Hijab'
            ? "The model is wearing a stylish matching hijab. "
            : "The model has beautiful modern hair, no head covering. ";
        }

        promptInputForAI = `Commercial-grade full body fashion photography. A young Asian ${gender} model ${outfitDescription}. Style context: ${style}. Location/Background: ${finalLocationPrompt}. Lighting style: ${energyImageStyle}. ${hijabInstruction}${mirrorInstruction} ${anatomyLock} Aspect ratio: ${aspectRatio}. ${hdModifier}. ${framingPrompt} ${cleanImageInstruction} BACKGROUND BAN: no plain white void.`;

        const isSpeakingOotd = ootdNarration === 'With Voice-Over';
        let ootdMovementPrompt = "";

        if (location.includes("Passenger Seat")) {
          ootdMovementPrompt = `IMAGE-TO-VIDEO MODE: High angle POV selfie in a moving car passenger seat, head tilt, softly smiling at camera.`;
        } else {
          ootdMovementPrompt = `SCENE DESCRIPTION: High-end fashion showcase of the Asian ${gender} wearing the outfit.`;
        }

        let ootdPosesMix = [
          "Natural breathing, maintaining confident steady eye contact.",
          "Slight head tilt, gentle weight shift."
        ];

        let scenesVideo = [];
        let scenesScript = [];
        const ootdTotalSec = parseDurationToSeconds(duration) || 10;
        let sceneCountInt = sceneCountForVideoDuration(ootdTotalSec);
        const userScenes = parseInt(ootdSceneCount) || 1;
        if (userScenes > sceneCountInt) sceneCountInt = userScenes;
        let ootdScenesData = [];
        const finalIsSpeakingOotd = location.includes("Passenger Seat") ? false : isSpeakingOotd;

        for (let i = 0; i < sceneCountInt; i++) {
          let currentPose = ootdPosesMix[i % ootdPosesMix.length];
          let dialogueText = "";

          if (sceneCountInt === 1) {
              dialogueText = `Saja nak spill sikit detail ootd pasal baju ${safeProductName} ni sebab sumpah bila pakai terus rasa auto terpaling stylish! Material dia kain premium gila. Korang kena dapatkan cepat dengan tekan beg kuning okay!`;
          } else {
              if (i === 0) {
                  dialogueText = `Weh, harini I nak spill detail ootd ${safeProductName} ni sebab design dia sumpah up-to-date and boost keyakinan korang gila-gila!`;
              } else if (i === sceneCountInt - 1) {
                  dialogueText = `Nampak mahal tapi harga dia sumpah marhaen habis. Jangan fikir lama-lama weh, grab cepat dengan klik beg kuning kat bawah!`;
              } else if (i === 1) {
                  dialogueText = `Kemasan jahitan dia kemas gila and potongan dia memang fit nicely dekat badan.`;
              } else {
                  dialogueText = `Kain dia tak panas and super selesa gila kalau nak pakai pergi pusing mall seharian.`;
              }
          }

          let lipSyncInstruction = finalIsSpeakingOotd
              ? 'LIP-SYNC: Flawless real-time conversational Malay lip-sync.'
              : 'LIP-SYNC: Muted. Mouth closed.';

          let sceneVideoPrompt = location.includes("Passenger Seat")
              ? `${ootdMovementPrompt}`
              : `${targetModelHeader}\n\n${ootdMovementPrompt}\n\n[SCENE ${i + 1}]\nMOTION: ${currentPose}\n${lipSyncInstruction}`;

          if (!location.includes("Passenger Seat")) {
            scenesVideo.push(`[SCENE ${i + 1}]\nMOTION: ${currentPose}\n${lipSyncInstruction}`);
          }

          if (finalIsSpeakingOotd) {
              scenesScript.push(`[Adegan ${i + 1}]: "${dialogueText}"`);
          } else {
              scenesScript.push(`[Adegan ${i + 1}]: (MUTE)`);
          }

          ootdScenesData.push({
             sceneNumber: i + 1,
             videoPrompt: sceneVideoPrompt,
             script: dialogueText,
             isMute: !finalIsSpeakingOotd
          });
        }

        result.ootdScenes = lockScenesToDuration(ootdScenesData, ootdTotalSec);
        if (location.includes("Passenger Seat")) {
            result.videoPrompt = ootdMovementPrompt;
        } else {
            result.videoPrompt = `${targetModelHeader}\n\n${ootdMovementPrompt}\n\nDURATION: ${ootdTotalSec}s\n\n${scenesVideo.join('\n\n')}`;
        }

        if (finalIsSpeakingOotd) {
          result.script = scenesScript.join('\n\n');
        } else {
          result.script = `[FULL MUTE]\n\n${scenesScript.join('\n')}`;
        }
        result.caption = getCaptionAndHashtags();
        result.duration = `${ootdTotalSec}s`;
        result.selectedDurationSec = ootdTotalSec;
      }
      else if (activeTab === 'ugc') {
        const refCount = activeProducts.length;
        const is30sUgc = duration === '30';
        const expectedUgcScenes = expectedSceneCountForDuration(duration, 'ugc');

        if (is30sUgc) {
          const modelDesc = `young Asian ${gender}${gender === 'Wanita' && hijabMode === 'Hijab' ? ' wearing a stylish modern hijab' : ''} influencer`;
          const productAction = activeProducts.length > 0
            ? `holding/showcasing the EXACT product from the PRODUCT REFERENCE`
            : `holding/showcasing ${safeProductName}`;
          const envPrompt = ugcEnvironment || 'Aesthetic Room';
          const ugc30Blueprints = [
            {
              role: 'HOOK',
              visual: `${modelDesc} in ${envPrompt}, ${productAction}, excited surprised expression, stop-scrolling energy. Angle: ${ugcAngle}.`,
              dialogue: `Weh korang! Aku baru jumpa ${safeProductName} ni and sumpah first impression dia memang gila!`
            },
            {
              role: 'INTRO',
              visual: `${modelDesc} presents packaging of ${safeProductName} closer to camera in ${envPrompt}.`,
              dialogue: `Tengok ni packaging dia pun dah nampak premium — rasa macam brand mahal je!`
            },
            {
              role: 'DEMO',
              visual: `Close-up hands demonstrating ${safeProductName}, showing texture/material/usage. Environment: ${envPrompt}.`,
              dialogue: `Tengok tekstur dia — lembut gila, senang apply, terus absorb tanpa rasa melekit.`
            },
            {
              role: 'BENEFIT',
              visual: `${modelDesc} reacts positively after using ${safeProductName} in ${envPrompt}, natural UGC lighting.`,
              dialogue: `Lepas try, kualiti dia memang lain macam weh. Serious berbaloi!`
            },
            {
              role: 'PROOF',
              visual: `${modelDesc} shows result/detail of ${safeProductName} near face/hands, confident smile, ${envPrompt}.`,
              dialogue: `Kalau korang yang tengah cari ${safeProductName} bagus — yang ni memang recommended gila.`
            },
            {
              role: 'CTA',
              visual: `${modelDesc} in ${envPrompt} holding ${safeProductName}, pointing down gesture (yellow basket CTA), strong end-frame composition.`,
              dialogue: `Cepat grab sebelum stok habis. Klik beg kuning bawah ni sekarang! 🛒`
            }
          ];

          result.scenes = ugc30Blueprints.map((bp, i) => {
            const start = i * 5;
            const end = start + 5;
            const imageGenerationPrompt = `[SCENE ${i + 1} — ${bp.role}] 4K UGC photography. ${bp.visual} Color style: ${energyImageStyle}. ${anatomyLock} Aspect ratio: ${aspectRatio}. ${hdModifier}. ${framingPrompt} ${cleanImageInstruction}\n${identityBible}`;
            return normalizeScene({
              scene_num: i + 1,
              sceneNumber: i + 1,
              timecode: `${start}s–${end}s`,
              visual: `${targetModelHeader}\n\n[SCENE ${i + 1} — ${bp.role}]\n${bp.visual}`,
              environment: envPrompt,
              camera: i === 0 ? 'Medium close-up, punchy handheld' : i === 2 ? 'Macro detail' : 'Medium shot',
              action: bp.role,
              emotion: i === 0 ? 'excited surprise' : i === 5 ? 'confident CTA' : 'engaged',
              imageGenerationPrompt,
              image_prompt: imageGenerationPrompt,
              i2v_prompt: `UGC ${aspectRatio} motion. ${bp.visual}. Natural phone-cam energy. Keep identity + environment locked (no white void).`,
              negative: DEFAULT_NEGATIVE,
              dialogue: bp.dialogue
            }, i, aspectRatio, {
              forceEnrich: true,
              topic: safeProductName,
              mode: 'ugc',
              allowWhiteStudio: false
            });
          });

          const ugc30Sec = 30;
          result.scenes = lockScenesToDuration(result.scenes, ugc30Sec);
          result.duration = `${ugc30Sec}s`;
          result.selectedDurationSec = ugc30Sec;
          result.videoPrompt = result.scenes.map(s => s.visual).join('\n\n');
          result.script = result.scenes.map(s => `[Adegan ${s.sceneNumber}]: "${s.dialogue}"`).join('\n\n');
          result.caption = getCaptionAndHashtags();
          promptInputForAI = result.scenes.map(s => s.image_prompt || s.imageGenerationPrompt);

          setBoxEdits({
            videoPrompt: result.videoPrompt,
            script: result.script,
            caption: result.caption,
            scenes: result.scenes,
            identityBible
          });

          setGeneratedOutput(result);
          setEditableImagePrompt(promptInputForAI);
          setCurrentDisplayRatio(aspectRatio);
          await generateVisual(promptInputForAI, false, aspectRatio, result.scenes.length, {
            identityBible,
            useContinuity: true,
            concurrency: 3,
            topicLock: safeProductName,
            negatives: result.scenes.map((s) => withEnvNegative(s.negative || DEFAULT_NEGATIVE, false))
          });
          setIsGeneratingAll(false);
          return;
        }

        const promptText = getUgcStoryboardPrompt(
          safeProductName,
          duration,
          category,
          ugcEnvironment,
          gender,
          hijabMode,
          ugcAngle,
          refCount,
          identityBible,
          assetAnalysis
        );

        setLoadingText(`Building UGC algorithmic sequence ${duration}s...`);
        const parsedUgc = await fetchStoryboardJson(promptText, expectedUgcScenes, signal);

        const finalBible = parsedUgc.identity_bible
          ? `${identityBible}\nModel lock: ${parsedUgc.identity_bible}`
          : identityBible;

        const normalizedScenes = (parsedUgc.scenes || []).map((scene, sIdx) => {
          const base = normalizeScene(scene, sIdx, aspectRatio, {
            forceEnrich: true,
            topic: safeProductName,
            mode: 'ugc',
            style: energyImageStyle,
            allowWhiteStudio: false
          });
          const modifiedVisual = [
            base.image_prompt,
            `Color style: ${energyImageStyle}.`,
            anatomyLock,
            `Aspect ${aspectRatio}.`,
            hdModifier,
            cleanImageInstruction,
            `Location: ${ugcEnvironment || 'Aesthetic Room'} with real furniture/props — NOT plain white.`,
            finalBible
          ].join(' ');
          return {
            ...base,
            sceneNumber: sIdx + 1,
            environment: ugcEnvironment,
            imageGenerationPrompt: modifiedVisual,
            image_prompt: modifiedVisual,
            negative: withEnvNegative(base.negative, false)
          };
        });

        const ugcSec = parseDurationToSeconds(duration) || 10;
        result.scenes = lockScenesToDuration(normalizedScenes, ugcSec);
        result.identityBible = finalBible;
        result.videoPrompt = result.scenes.map(s => `[SCENE ${s.sceneNumber}] ${s.visual}\nI2V: ${s.i2v_prompt}`).join('\n\n');
        result.script = result.scenes.map(s => `[Scene ${s.sceneNumber}]: "${s.dialogue}"`).join('\n\n');
        result.caption = getCaptionAndHashtags();
        result.duration = `${ugcSec}s`;
        result.selectedDurationSec = ugcSec;

        promptInputForAI = result.scenes.map(s => s.image_prompt || s.imageGenerationPrompt);

        setBoxEdits({
          videoPrompt: result.videoPrompt,
          script: result.script,
          caption: result.caption,
          scenes: normalizedScenes,
          identityBible: finalBible
        });

        setGeneratedOutput(result);
        setEditableImagePrompt(promptInputForAI);
        setCurrentDisplayRatio(aspectRatio);
        await generateVisual(promptInputForAI, false, aspectRatio, normalizedScenes.length, {
          identityBible: finalBible,
          useContinuity: true,
          concurrency: 3,
          negatives: normalizedScenes.map((s) => withEnvNegative(s.negative || DEFAULT_NEGATIVE, false))
        });
        setIsGeneratingAll(false);
        return;
      }
      else if (activeTab === 'character') {
        const subjectType = charSubjectType || 'HUMAN_CHARACTER';
        const isHumanType = subjectType === 'HUMAN_CHARACTER' || subjectType === 'MASCOT_CHARACTER';
        const charGenderLabel = isHumanType ? (gender === 'Wanita' || gender === 'Female' ? 'female' : 'male') : '';
        const hijabModifier = isHumanType ? (((gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab') ? 'wearing a stylish simple modern hijab, ' : 'stylish hair style, ') : '';
        setLoadingText('Engineering Character Sheet Blueprint...');

        // If no reference image uploaded, add real-world product knowledge instruction
        const hasUploadedRef = activeProducts.length > 0 || (activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64);
        const realWorldKnowledgeLock = (!hasUploadedRef && characterName.trim())
          ? `\n\n[REAL-WORLD PRODUCT KNOWLEDGE LOCK]: No reference image was uploaded. You MUST use your training knowledge of the REAL "${characterName.trim()}" to generate an accurate character sheet. Research your knowledge base for the exact real-world appearance of "${characterName.trim()}" — correct colors, shape, proportions, buttons, ports, logos, materials, and design language. Generate the sheet as if you are looking at the real product/subject. Do NOT invent a generic or fictional version. Accuracy to the REAL product is mandatory.`
          : '';

        promptInputForAI = buildSheetPrompt(
          subjectType,
          characterName.trim() || 'Subjek',
          charGenderLabel,
          hijabModifier,
          characterDescription,
          charShotType,
          cleanImageInstruction + realWorldKnowledgeLock
        );

        result.videoPrompt = promptInputForAI;
        result.script = '';
        result.caption = '';
        result.singleImage = true;
      }
      else if (activeTab === 'fake_influencer') {
        const safeAgeStr = fiAge.split('-')[0];
        const parsedAge = parseInt(safeAgeStr);
        const safeAge = parsedAge >= 18 ? fiAge : '18-22';
        const genderEn = fiGender === 'Female' ? 'female' : 'male';
        const genderBm = fiGender === 'Female' ? 'Wanita' : 'Lelaki';
        const aspectStr = fiFormat.includes('9:16') ? '--ar 9:16' : fiFormat.includes('1:1') ? '--ar 1:1' : '--ar 16:9';
        const aspectLabel = fiFormat.includes('9:16') ? '9:16' : fiFormat.includes('1:1') ? '1:1' : '16:9';

        const visualDNA = [
          `face: ${fiFaceShape}`,
          `skin tone category: ${fiSkinTone}`,
          `hair/headwear: ${fiHair}`,
          `body: ${fiBodyType}`,
          `signature expression: ${fiSignature}`
        ].join('; ');

        const malaysiaLocalLock = `[MALAYSIA LOCAL INFLUENCER STYLE]
- Fictional Malaysian content creator for TikTok Malaysia / Shopee / Instagram Reels MY
- Southeast Asian Malaysian facial features (NOT Korean idol, NOT Western model, NOT Indonesian-only stereotype)
- Natural everyday Malaysia lighting and color grade (warm tropical daylight or soft indoor LED)
- Authentic UGC smartphone look preferred over high-fashion runway
- Relatable "kawan korang" energy, friendly and approachable
- No resemblance to real Malaysian celebrities or influencers`;

        const characterIdentity = `A fictional ${safeAge} years old Malaysian ${genderEn} local influencer named vibe-identity "${fiName || 'Creator MY'}". Niche: ${fiNiche}. Personal brand vibe: ${fiVibe}.`;

        let ruleModifiers = [];
        if (fiRules.ultraSkin || fiRules.realSkin) ruleModifiers.push('realistic skin texture, natural pores, subtle tropical humidity glow');
        if (fiRules.rawPhoto) ruleModifiers.push('shot on smartphone, raw candid Malaysian UGC snapshot');
        if (fiRules.noAi) ruleModifiers.push('no plastic skin, no cgi, no over-smoothed beauty filter');
        if (fiRules.realHands) ruleModifiers.push('realistic human hands');
        if (fiRules.lockFace) ruleModifiers.push('consistent face lock across angles');

        const combinedRules = ruleModifiers.join(', ');
        let formatSpecificPrompt = '';

        if (fiFormat.includes('4 Pose Character Sheet')) {
          formatSpecificPrompt = `Create a horizontal reference sheet of 4 poses of the same fictional Malaysian person. Clean soft white/cream background. Same outfit and identity.`;
        } else if (fiFormat.includes('Full Body OOTD')) {
          formatSpecificPrompt = `Vertical 9:16 full body OOTD mirror/self portrait. Show complete outfit from head to shoes.`;
        } else if (fiFormat.includes('Product Review')) {
          formatSpecificPrompt = `Malaysia affiliate product review pose: hold a generic product box near face, natural excited smile, eye contact with camera.`;
        } else if (fiFormat.includes('Beauty Close Up') || fiFormat.includes('GRWM')) {
          formatSpecificPrompt = `Beauty close-up / GRWM portrait. Focus on natural Malaysian skin texture and soft makeup.`;
        } else if (fiFormat.includes('Shopee Live')) {
          formatSpecificPrompt = `Shopee Live talking-head framing (chest-up), phone-tripod angle, lively host energy.`;
        } else if (fiFormat.includes('1:1')) {
          formatSpecificPrompt = `Square 1:1 Instagram feed portrait, centered, clean composition.`;
        } else {
          formatSpecificPrompt = `Vertical 9:16 TikTok/Reels Malaysia influencer pose, medium shot, engaging eye contact.`;
        }

        const stylingPrompt = `Outfit vibe category: ${fiOutfit}. Location setting: ${fiBackground}.`;
        const antiRealPersonLock = `[Strictest rules: 100% original synthetic human. No resemblance to real public figures, celebrities, or known influencers in Malaysia or abroad.]`;
        const sanitizedCustomPrompt = fiCustom ? `[Custom user notes]: ${fiCustom}` : '';

        const isSheet = String(fiFormat || '').includes('Character Sheet') || String(fiFormat || '').includes('4 Pose');
        const locationLock = isSheet
          ? `Background: clean soft white/cream studio for reference sheet only.`
          : `Background/location MUST be: ${fiBackground}. Fully detailed room/set with furniture, depth, and tropical lighting. FORBIDDEN: plain pure white empty background.`;

        const mainImagePrompt = `${antiRealPersonLock}

${malaysiaLocalLock}

[SUBJECT]
${characterIdentity}
Visual DNA: ${visualDNA}

[CATEGORIES LOCK]
- Skin tone: ${fiSkinTone}
- Hair / headwear: ${fiHair}
- Outfit vibe: ${fiOutfit}
- Location setting: ${fiBackground}

[SHOT]
${formatSpecificPrompt}
${stylingPrompt}
${locationLock}
Realism mode: ${fiRealism || 'TikTok UGC Natural MY'}.

[REALISM / QUALITY]
${combinedRules}
Photoreal, commercial UGC quality, tropical Malaysia ambient light.

${sanitizedCustomPrompt}
${aspectStr}`;

        const strictNegativePrompt = [
          'anime, CGI, plastic skin, doll face, warped fingers, extra limbs',
          'Korean idol clone, Western fashion model default, Indonesian-only stereotype',
          'celebrity lookalike, watermark, text overlay, logo',
          'over-smoothed beauty filter, uncanny valley',
          isSheet ? '' : 'plain white background, empty white studio, blank white void'
        ].filter(Boolean).join(', ');

        const consistencyPrompt = `Keep the same Malaysian fictional identity across all images: same face, ${fiSkinTone}, ${fiHair}, ${fiOutfit} palette, and body proportions. Do not redesign between shots.`;

        const sheetPrompt = `Malaysia local influencer character sheet, ${safeAge}yo fictional ${genderEn}, white/soft studio background, 4 angles (front, 3/4, side, front smile). DNA: ${visualDNA}. Outfit vibe: ${fiOutfit}. Same identity every panel.`;

        const tiktokPrompt = `9:16 TikTok Malaysia UGC video of the same fictional local influencer (${fiNiche}). Location: ${fiBackground}. Outfit vibe: ${fiOutfit}. Natural smartphone handheld, talking in casual Bahasa Melayu energy (visual only), soft smile, product or lifestyle context. Continuity lock: ${visualDNA}.`;

        promptInputForAI = mainImagePrompt;

        result.fiIdentity = [
          `Nama: ${fiName || 'Kreator MY'}`,
          `Jantina: ${genderBm}`,
          `Umur: ${safeAge} tahun`,
          `Gaya: Malaysia Local Influencer`,
          `Niche: ${fiNiche}`,
          `Vibe: ${fiVibe}`,
          `Format: ${fiFormat} (${aspectLabel})`
        ].join('\n');

        result.fiDesc = [
          `Muka: ${fiFaceShape}`,
          `Skin tone category: ${fiSkinTone}`,
          `Hair / headwear: ${fiHair}`,
          `Outfit vibe: ${fiOutfit}`,
          `Location setting: ${fiBackground}`,
          `Badan: ${fiBodyType}`,
          `Ciri signature: ${fiSignature}`,
          `Realism: ${fiRealism}`
        ].join('\n');

        result.fiMainPrompt = mainImagePrompt;
        result.fiNegPrompt = strictNegativePrompt;
        result.fiConsistency = consistencyPrompt;
        result.fiSheet = sheetPrompt;
        result.fiTiktok = tiktokPrompt;
        result.fiStyleTag = 'Malaysia Local Influencer';
        result.fiCategories = {
          skinTone: fiSkinTone,
          hairHeadwear: fiHair,
          outfitVibe: fiOutfit,
          locationSetting: fiBackground
        };

        result.videoPrompt = '';
        result.script = '';
        result.caption = '';

        if (fiFormat.includes('9:16')) setAspectRatio('9:16');
        else if (fiFormat.includes('1:1')) setAspectRatio('1:1');
        else setAspectRatio('16:9');
      }

      result.cta = `👉 Klik beg kuning di bawah untuk dapatkan sekarang! 🛒✨`;
      if (!result.selectedDurationSec) {
        const locked = getSelectedDurationSeconds();
        result.duration = `${locked}s`;
        result.selectedDurationSec = locked;
        if (result.scenes?.length) result.scenes = lockScenesToDuration(result.scenes, locked);
        if (result.productScenes?.length) result.productScenes = lockScenesToDuration(result.productScenes, locked);
        if (result.ootdScenes?.length) result.ootdScenes = lockScenesToDuration(result.ootdScenes, locked);
      } else {
        result.duration = `${result.selectedDurationSec}s`;
      }

      setGeneratedOutput(result);
      setEditableImagePrompt(promptInputForAI);

      setBoxEdits({
        videoPrompt: result.videoPrompt || promptInputForAI,
        script: result.script || '',
        caption: result.caption || '',
        ootdScenes: result.ootdScenes || [],
        productScenes: result.productScenes || [],
        fiIdentity: result.fiIdentity || '',
        fiDesc: result.fiDesc || '',
        fiMainPrompt: result.fiMainPrompt || '',
        fiNegPrompt: result.fiNegPrompt || '',
        fiConsistency: result.fiConsistency || '',
        fiSheet: result.fiSheet || '',
        fiTiktok: result.fiTiktok || ''
      });

      setCurrentDisplayRatio(aspectRatio);
      const imgCount = result.singleImage
        ? 1
        : (Array.isArray(promptInputForAI) ? promptInputForAI.length : 2);
      const allowWhite = activeTab === 'character' || (activeTab === 'fake_influencer' && String(fiFormat || '').includes('Character Sheet'));
      const envSuffix = allowWhite
        ? ''
        : `\n[BACKGROUND LOCK]: Detailed environment matching this scene/topic. NO plain white background, NO empty white studio.`;
      const visualPrompts = Array.isArray(promptInputForAI)
        ? promptInputForAI.map((p) => `${p}\n${identityBible}${envSuffix}`)
        : `${promptInputForAI}\n${identityBible}${envSuffix}`;
      await generateVisual(visualPrompts, false, aspectRatio, imgCount, {
        identityBible,
        useContinuity: Array.isArray(promptInputForAI) && promptInputForAI.length >= 3,
        concurrency: 3,
        negatives: allowWhite ? [DEFAULT_NEGATIVE] : [withEnvNegative(DEFAULT_NEGATIVE, false)],
        topicLock: activeTab === 'character' ? '' : (safeProductName || productName || '')
      });
    } catch (error) {
      if (error?.name === 'AbortError') return;
      console.error("Error generating campaign content:", error);
      setErrorMessage("Rendering payload encountered an error: " + String(error.message || 'Please refresh module.'));
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsGeneratingAll(false);
      if (generationAborted.current) {
        generationAborted.current = false;
      }
    }
  };

  const handleDownloadHD = async (url, index) => {
    if (!url) return;
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const activeRatio = currentDisplayRatio || aspectRatio;
        let targetWidth = 3840;
        let targetHeight = 3840;

        if (activeRatio === '9:16') {
          targetWidth = 2160;
          targetHeight = 3840;
        } else if (activeRatio === '16:9') {
          targetWidth = 3840;
          targetHeight = 2160;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const scale = Math.max(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
        const drawWidth = img.naturalWidth * scale;
        const drawHeight = img.naturalHeight * scale;

        let x = (targetWidth - drawWidth) / 2;
        let y = (targetHeight - drawHeight) / 2;
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        canvas.toBlob((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `Storyboard_Studio_HD_${index + 1}_${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          }, 100);
        }, 'image/png', 1.0);
      };
      img.onerror = () => {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<img src="${url}" />`);
        }
      };
      img.src = url;
    } catch (error) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<img src="${url}" />`);
      }
    }
  };

  const toggleEditBoxMode = (sectionId) => {
    setEditModes(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleBoxValueChange = (sectionId, value) => {
    setBoxEdits(prev => ({ ...prev, [sectionId]: value }));
  };

  const saveBoxValue = (sectionId) => {
    setEditModes(prev => ({ ...prev, [sectionId]: false }));
    if (sectionId === 'videoPrompt' || sectionId === 'video') {
      setEditableImagePrompt(editedValues[sectionId]);
    }
  };

  const regenerateWithEditedPrompt = async (promptToUse) => {
    setIsGeneratingImage(true);
    setLoadingText("Deploying edited prompt variables to synthesis core...");
    await generateVisual(promptToUse, true, currentDisplayRatio || aspectRatio);
  };

  const renderOutputBox = (title, icon, sectionId, onRegenerate = null, customRegenerateWithPrompt = null) => {
    const isEditing = editModes[sectionId];
    const value = editedValues[sectionId] !== undefined ? editedValues[sectionId] : (generatedOutput ? generatedOutput[sectionId] : '');

    return (
      <div className={`border rounded-2xl p-5 mb-4 relative shadow-sm group transition-all duration-300 ${t('bg-gray-800/50 border-gray-700', 'bg-gray-50 border-gray-200')}`}>
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-gray-700/30">
          <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-wider text-sky-500">
            {icon} {title}
          </h3>
          <div className="flex items-center gap-1.5">
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all uppercase tracking-widest ${t('bg-sky-900/30 text-sky-400 hover:bg-sky-900/50 border border-pink-900/50', 'bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-200')}`}
              >
                <I name="RefreshCw" size={12} /> Re-Gen
              </button>
            )}

            {isEditing ? (
              <button
                onClick={() => saveBoxValue(sectionId)}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 bg-green-500 text-white uppercase tracking-widest hover:bg-green-600"
              >
                <I name="Save" size={12} /> Save
              </button>
            ) : (
              <button
                onClick={() => toggleEditBoxMode(sectionId)}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 uppercase tracking-widest ${t('bg-gray-700 text-gray-200 hover:bg-gray-600', 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200')}`}
              >
                <I name="Edit2" size={12} /> Edit
              </button>
            )}

            <button
              onClick={() => copyToClipboard(value, sectionId)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 uppercase tracking-widest ${
                copiedSection === sectionId
                ? 'bg-green-100 text-green-600 border-green-200 opacity-100'
                : (t('bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600', 'bg-white text-gray-500 hover:bg-sky-50 hover:text-sky-500 border border-gray-200'))
              }`}
            >
              {copiedSection === sectionId ? <I name="Check" size={12} /> : <I name="Copy" size={12} />}
              {copiedSection === sectionId ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={value}
              onChange={(e) => handleBoxValueChange(sectionId, e.target.value)}
              rows={6}
              className={`w-full rounded-xl p-3 font-mono text-[13px] border focus:outline-none focus:ring-1 focus:ring-sky-400 ${C.p2(isDarkMode)}`}
            />
            {customRegenerateWithPrompt && (
              <button
                onClick={() => regenerateWithEditedPrompt(value)}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-sky-500 text-white flex items-center gap-2 hover:bg-sky-600 transition-colors shadow-md shadow-sky-500/10"
              >
                <I name="Sparkles" size={14} /> Re-render New Visual Concept
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className={`whitespace-pre-wrap leading-relaxed font-mono text-[13px] ${U.c16} ${String(value || '').length > 300 && !editModes[`${sectionId}_expanded`] ? 'max-h-[120px] overflow-hidden relative' : ''}`}>
              {value}
            </p>
            {String(value || '').length > 300 && !editModes[`${sectionId}_expanded`] && (
              <button
                onClick={() => setEditModes(prev => ({ ...prev, [`${sectionId}_expanded`]: true }))}
                className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${t('text-sky-400 hover:text-sky-300', 'text-sky-500 hover:text-sky-600')} transition-colors`}
              >
                ▼ Show Full Prompt
              </button>
            )}
            {String(value || '').length > 300 && editModes[`${sectionId}_expanded`] && (
              <button
                onClick={() => setEditModes(prev => ({ ...prev, [`${sectionId}_expanded`]: false }))}
                className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500 hover:text-gray-400', 'text-gray-400 hover:text-gray-500')} transition-colors`}
              >
                ▲ Collapse
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderGenderBox = () => (
    <div>
      <label className="block text-[10px] font-bold mb-2.5 uppercase tracking-wider text-gray-400">Model Gender</label>
      <div className={`flex rounded-2xl p-1.5 border ${t('bg-gray-800/50 border-gray-700', 'bg-white border-gray-200')}`}>
        <button onClick={() => setGender('Wanita')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${gender === 'Wanita' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md' : (t('bg-transparent text-gray-400', 'bg-transparent text-gray-500'))}`}>Female</button>
        <button onClick={() => setGender('Pria')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${gender === 'Pria' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md' : (t('bg-transparent text-gray-400', 'bg-transparent text-gray-500'))}`}>Male</button>
      </div>
    </div>
  );

  const renderProductUploadBox = () => {
    const activeUploadData = getActiveUploadData();
    const activeProduct = activeUploadData.products[0] || { name: '', base64: null, mimeType: null };

    return (
      <div className="relative group mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleProductUpload(e, 0)}
          className={U.c11}
        />
        <div className={`w-full border border-dashed rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between transition-all duration-300 relative ${
          activeProduct.name
          ? (t('border-sky-500/50 bg-sky-900/10', 'border-sky-300 bg-sky-50'))
          : (t('border-gray-700 hover:border-sky-500/50 bg-gray-800/30', 'border-gray-300 hover:border-sky-300 bg-gray-50'))
        }`}>
          <div className="flex items-center gap-5 overflow-hidden w-full sm:w-auto mb-4 sm:mb-0">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${activeProduct.base64 ? 'border-sky-500/50' : 'border-gray-700'}`}>
              {activeProduct.base64 ? (
                <img src={`data:${activeProduct.mimeType};base64,${activeProduct.base64}`} alt="preview" className="w-full h-full object-cover rounded-full p-1" />
              ) : (
                <span style={{ fontSize: '24px', lineHeight: 1 }}>📤</span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-base font-bold truncate ${activeProduct.name ? 'text-gray-200' : 'text-gray-500'}`}>
                {activeProduct.name ? activeProduct.name : 'Upload Product Reference'}
              </span>
              {!activeProduct.name && <span className="text-xs mt-1 text-gray-400 font-bold">Locks consistency metric automatically inside active tab</span>}
            </div>
          </div>
          <span className={`text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full border shadow-sm whitespace-nowrap ${isDarkMode ? 'bg-sky-900/30 border-pink-800/50 text-sky-400' : 'bg-sky-100 border-sky-200 text-sky-600'}`}>
            Aset Rujukan
          </span>
          {activeProduct.name && (
            <button
              onClick={(e) => { e.preventDefault(); handleRemoveProduct(0); }}
              className={`absolute right-4 top-4 sm:top-1/2 sm:-translate-y-1/2 p-2 rounded-full transition-colors z-20 shadow-sm border ${t('bg-red-900/30 text-red-400 border-red-900/50', 'bg-white text-red-500 border-red-105')}`}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>✖️</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderBackgroundUploadBox = () => {
    const activeUploadData = getActiveUploadData();
    const backgrounds = activeUploadData.backgrounds || [];

    return (
      <div className="mt-4">
        <label className={C.label}>Environment / Background Reference (Optional)</label>
        <div className={`w-full border border-dashed rounded-3xl p-6 transition-all duration-300 ${backgrounds.length > 0 ? t('border-sky-500/50 bg-sky-900/10', 'border-sky-300 bg-sky-50') : t('border-gray-700 bg-gray-800/30', 'border-gray-300 bg-gray-50')}`}>
          
          {backgrounds.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {backgrounds.map((bg, index) => (
                <div key={index} className={`relative w-20 h-20 rounded-xl overflow-hidden shadow-sm border group ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <img src={`data:${bg.mimeType};base64,${bg.base64}`} alt={`Background ${index}`} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.preventDefault(); handleRemoveBackground(index); }}
                    className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                     <I name="Trash" size={20} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBackgroundUpload}
              className={U.c11}
            />
            <div className="flex items-center gap-4 cursor-pointer">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${t('bg-sky-500/20 border-sky-500/50 text-sky-400', 'bg-sky-100 border-sky-300 text-sky-500')}`}>
                <I name="Image" size={20} />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold ${t('text-gray-200', 'text-gray-700')}`}>
                  Select Background Image
                </span>
                <span className="text-xs mt-1 text-gray-400 font-medium">1 image is enough. Multi-upload is optional.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderIdentityBox = () => {
    const activeUploadData = getActiveUploadData();

    return (
      <div className={`border p-5 rounded-2xl shadow-sm relative overflow-hidden group transition-colors mt-4 ${t('bg-[#1a1c23]', 'bg-white border-gray-200')}`}>
        <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>

        {!activeUploadData.useCustomFace && (
          <div className="flex items-center justify-between pl-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${t('bg-sky-500/10 text-sky-400', 'bg-sky-50 text-sky-500')}`}>
                  <I name="ShieldAlert" size={20} />
                </div>
                <div>
                  <label className={`block text-sm font-black ${t('text-gray-200', 'text-gray-800')}`}>
                    Biometric Identity Face Lock
                  </label>
                  <p className="text-[10px] mt-0.5 text-gray-500">Activate to hold and lock a consistent facial blueprint</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}>Disabled</span>
                <button
                  onClick={() => updateTabUpload('useCustomFace', true)}
                  className={`w-12 h-6 rounded-full relative transition-colors border ${t('bg-gray-800 border-gray-600', 'bg-gray-200 border-gray-300')}`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-[3px] left-1 transition-transform translate-x-0" />
                </button>
              </div>
          </div>
        )}

        {activeUploadData.useCustomFace && (
          <>
          <div className="flex items-center justify-between mb-4 pl-2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500 rounded-lg text-white shadow-sm shadow-sky-500/30">
                  <I name="ShieldAlert" size={20} />
                </div>
                <div>
                  <label className={`block text-sm font-black ${t('text-sky-400', 'text-sky-700')}`}>
                    Biometric Face Lock Engine
                  </label>
                  <p className={`text-[10px] mt-0.5 ${t('text-sky-500/80', 'text-sky-600')}`}>System maps physical proportions from reference facial source.</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-sky-500">Enabled</span>
              <button
                onClick={() => { updateTabUpload('useCustomFace', false); handleRemoveFace(); }}
                className="w-12 h-6 rounded-full relative transition-colors border bg-sky-500 border-sky-500"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-[3px] left-1 transition-transform translate-x-6" />
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in-up mt-4 pl-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFaceUpload}
              className={U.c11}
            />
            <div className={`w-full border-2 border-dashed rounded-xl px-5 py-6 flex flex-col items-center justify-center text-center transition-all relative ${isDarkMode ? (activeUploadData.faceFileName ? 'border-sky-500/50 bg-sky-900/10' : 'border-gray-700 hover:border-sky-500/30 bg-gray-800/30') : (activeUploadData.faceFileName ? 'border-sky-400 bg-white' : 'border-sky-200 hover:border-sky-300 bg-white')}`}>

              {activeUploadData.uploadedFaceBase64 ? (
                <div className="relative">
                   <img
                     src={`data:${activeUploadData.uploadedFaceMimeType};base64,${activeUploadData.uploadedFaceBase64}`}
                     alt="Face Preview"
                     className="w-14 h-14 object-cover rounded-full shadow-md border-2 border-sky-400 mb-3 relative z-10"
                   />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${t('bg-sky-500/10 text-sky-400', 'bg-sky-50 text-sky-400')}`}>
                  <I name="User" size={24} />
                </div>
              )}

              <span className={`text-xs font-bold px-6 ${activeUploadData.faceFileName ? (t('text-gray-200', 'text-gray-800')) : (U.c17)}`}>
                {activeUploadData.faceFileName ? activeUploadData.faceFileName : 'Upload Face Reference Image'}
              </span>
            </div>
            {activeUploadData.faceFileName && (
              <button
                onClick={(e) => { e.preventDefault(); handleRemoveFace(); }}
                className={`absolute top-2 right-2 p-1.5 rounded-lg transition-colors z-20 shadow-sm ${t('bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900/50', 'bg-white text-red-500 border-red-100')}`}
                title="Remove picture"
              >
                <I name="X" size={14} />
              </button>
            )}
          </div>
          </>
        )}
      </div>
    );
  };

  // Download combined segment (pair two images on-demand)
  const [combiningPairIndex, setCombiningPairIndex] = useState(null);
  const handleDownloadCombinedSegment = async (pairIndex) => {
    const idxA = pairIndex * 2;
    const idxB = pairIndex * 2 + 1;
    const imgA = imageUrls[idxA];
    const imgB = imageUrls[idxB];
    if (!imgA || !imgB) return;

    setCombiningPairIndex(pairIndex);
    try {
      const ratio = currentDisplayRatio || aspectRatio || '9:16';
      const combined = await combineImagesVerticallyPair(imgA, imgB, ratio);
      // Trigger download
      const link = document.createElement('a');
      link.href = combined;
      link.download = `Storyboard_Segment_${pairIndex + 1}_Combined_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 100);
    } catch (err) {
      console.warn('Failed to combine images for download:', err);
      setErrorMessage('Failed to combine segment images. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setCombiningPairIndex(null);
    }
  };

  const activeUploadData = getActiveUploadData();
  const displayRatio = currentDisplayRatio || aspectRatio;
  const containerAspectClass = displayRatio === '16:9' ? 'aspect-video' : displayRatio === '1:1' ? 'aspect-square' : 'aspect-[9/16]';

  if (!hasAgreed) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-300 ${t('bg-[#0a0c10]', 'bg-[#f8fafc]')}`}>
        <div className={`rounded-3xl p-8 sm:p-12 max-w-2xl w-full animate-fade-in-up border shadow-2xl ${t('bg-[#11131a] border-gray-800 shadow-black/50', 'bg-white border-gray-100')}`}>
          <div className={`flex items-center gap-5 mb-10 border-b pb-6 ${U.c15}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${t('bg-red-500/10 border-red-500/20', 'bg-red-50 border-red-100')}`}>
              <I name="ShieldAlert" className="text-red-500" size={28} />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-wide ${U.c14}`}>
              USER LICENSE AGREEMENT
            </h1>
          </div>

          <div className={`space-y-6 text-sm sm:text-base mb-10 ${U.c16}`}>
            <div className={`p-5 rounded-2xl border relative overflow-hidden ${t('bg-red-950/30 border-red-900/50', 'bg-red-50 border-red-200')}`}>
              <div className="absolute left-0 top-0 w-1 h-full bg-red-500"></div>
              <p className={`font-black text-lg mb-2 uppercase tracking-widest ${t('text-red-500', 'text-red-600')}`}>
                ⚠️ STRICTLY FORBIDDEN TO RESELL!
              </p>
              <p className={`font-medium leading-relaxed ${t('text-red-200', 'text-red-800')}`}>
                This platform is protected by the exclusive license of the developer. You are
                <strong className="inline-block px-2 py-1 mx-1 rounded text-white font-black tracking-widest bg-red-600 shadow-sm">
                  NOT PERMITTED
                </strong>
                to redistribute, resell, or share the source code of this application without explicit written consent.
              </p>
            </div>

            <p>By confirming access below, you agree to the following terms:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-sky-500 text-gray-500">
              <li>Respect the developer's exclusive rights of Storyboard Studio by Ayep.</li>
              <li>Remain morally responsible for the advertising materials created and processed.</li>
            </ul>
          </div>

          <button
            onClick={() => setHasAgreed(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-sky-500/20 transition-all transform hover:-translate-y-1 text-lg tracking-widest uppercase border-0"
          >
            I AGREE & CONTINUE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans pb-20 transition-colors duration-300 relative ${t('bg-[#0a0c10]', 'bg-[#f8fafc]')}`}>
      <header className={`backdrop-blur-xl border-b sticky top-0 z-40 transition-colors duration-300 ${t('bg-[#11131a]/90 border-gray-800', 'bg-white/80 border-gray-100')}`}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              cancelAllGenerations();
              setActiveTab('cinematic_pro');
              setGeneratedOutput(null);
              setImageUrls([]);
              setEditableImagePrompt('');
              setEditModes({});
              setBoxEdits({});
              setZoomedImages({});
              setShowMagicBox({});
              setMagicPrompts({});
              setErrorMessage('');
              setShowApiKeyInput(!getStoredApiKey());
              setCurrentDisplayRatio(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0 overflow-hidden relative border border-sky-500/30">
              {!logoError ? (
                <img
                  src="https://i.ibb.co.com/4gtSWzX5/file-000000006b24720b89e81d697978230b.png"
                  alt="Logo"
                  className="w-full h-full object-cover absolute inset-0 z-10"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
                  ND
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className={`text-xl font-black tracking-tight leading-none ${U.c14}`}>
                Storyboard Studio AI
              </h1>
              <p className="text-[9px] font-bold tracking-widest uppercase mt-1 text-gray-400">
                PRO CONTENT & VISUAL ENGINE
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
              <I name="ShieldCheck" size={14} className="text-emerald-400" />
              <span>Gemini Auto Integrated</span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center px-3 py-2 rounded-full border transition-all duration-300 ${t('bg-[#0a0c10] border-gray-700 text-gray-300', 'bg-gray-50 border-gray-200 text-gray-400')}`}
            >
              {isDarkMode ? <I name="Sun" className="w-4 h-4 mr-1.5" /> : <I name="Moon" className="w-4 h-4 mr-1.5" />}
              <I name="ChevronDown" size={14} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-5 sm:px-8 py-10 relative z-10">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-sm flex items-center justify-between shadow-lg">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} className="p-1 rounded-full hover:bg-red-500/20">
              <I name="X" size={16} />
            </button>
          </div>
        )}

        {/* API Key Input */}
        {(showApiKeyInput || !apiKey) && (
          <div className={`mb-6 p-4 rounded-2xl border flex flex-col sm:flex-row items-center gap-3 ${t('bg-[#11131a] border-yellow-900/50', 'bg-yellow-50 border-yellow-200')}`}>
            <div className="flex items-center gap-2 shrink-0">
              <span style={{ fontSize: '16px' }}>🔑</span>
              <span className={`text-xs font-bold uppercase tracking-widest ${t('text-yellow-400', 'text-yellow-700')}`}>Gemini API Key</span>
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Gemini API key here..."
              className={`flex-1 w-full rounded-xl px-4 py-2.5 text-sm border focus:outline-none focus:ring-1 focus:ring-sky-400 ${t('bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600', 'bg-white border-gray-200 text-gray-800')}`}
            />
            <button
              onClick={() => handleSaveApiKey(apiKey)}
              disabled={!apiKey.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-sky-500 text-white disabled:opacity-50 hover:bg-sky-600 transition-colors shrink-0"
            >
              Save Key
            </button>
          </div>
        )}

        {/* Arahan cara dapatkan Gemini API Key */}
        {(showApiKeyInput || !apiKey) && (
          <div className={`mb-6 p-5 rounded-2xl border ${t('bg-[#11131a] border-gray-800', 'bg-gray-50 border-gray-200')}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${t('text-gray-400', 'text-gray-500')}`}>📖 Cara Dapatkan Gemini API Key</p>
            <ol className={`text-sm space-y-2 list-decimal list-inside leading-relaxed ${t('text-gray-300', 'text-gray-600')}`}>
              <li>Pergi ke <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline hover:text-sky-300 font-bold">Google AI Studio → API Keys</a></li>
              <li>Log masuk dengan akaun Google anda.</li>
              <li>Klik butang <span className="font-bold text-sky-400">"Create API Key"</span>.</li>
              <li>Pilih mana-mana Google Cloud project (atau buat baru jika tiada).</li>
              <li>Copy API key yang dipaparkan dan paste di ruangan atas. ☝️</li>
            </ol>
            <p className={`text-[11px] mt-3 ${t('text-gray-500', 'text-gray-400')}`}>💡 API key ini percuma (free tier). Pastikan jangan kongsi key anda dengan orang lain.</p>
          </div>
        )}
        {apiKey && !showApiKeyInput && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}>🤖 Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold border appearance-none cursor-pointer transition-colors ${t('bg-[#0a0c10] border-gray-700 text-white', 'bg-gray-50 border-gray-200 text-gray-800')}`}
              >
                {GEMINI_MODELS.map((m) => (
                  <option key={m.v} value={m.v} style={isDarkMode ? { backgroundColor: '#0a0c10', color: '#fff' } : {}}>{m.l}</option>
                ))}
              </select>
            </div>
            <button onClick={() => setShowApiKeyInput(true)} className="text-[10px] text-gray-500 hover:text-sky-400 transition-colors uppercase tracking-widest font-bold">
              🔑 Change API Key
            </button>
          </div>
        )}

        {apiKey && !showApiKeyInput && (
          <div className={`mb-4 rounded-2xl border overflow-hidden ${t('bg-[#11131a] border-gray-800', 'bg-gray-50 border-gray-200')}`}>
            <button
              onClick={() => setShowProviderPanel(!showProviderPanel)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left ${t('hover:bg-gray-800/50', 'hover:bg-gray-100')} transition-colors`}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <span>⚙️</span>
                <span className={t('text-gray-500', 'text-gray-400')}>Provider:</span>
                <span className={textProvider === 'genfity' ? 'text-purple-400' : 'text-emerald-400'}>{textProvider === 'genfity' ? 'Genfity' : 'Gemini'}</span>
                <span className={t('text-gray-600', 'text-gray-400')}>·</span>
                <span className={t('text-gray-500', 'text-gray-400')}>Mode:</span>
                <span className={generateMode === 'text_only' ? 'text-purple-400' : 'text-sky-400'}>{generateMode === 'text_only' ? 'Text Only' : 'Text + Img'}</span>
              </div>
              <span className={`text-[10px] ${t('text-gray-500', 'text-gray-400')}`}>{showProviderPanel ? '▲' : '▼'}</span>
            </button>
            {showProviderPanel && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-800/50 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}>📝 Text Provider:</span>
                  <select
                    value={textProvider}
                    onChange={(e) => handleTextProviderChange(e.target.value)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold border appearance-none cursor-pointer transition-colors ${t('bg-[#0a0c10] border-gray-700 text-white', 'bg-white border-gray-200 text-gray-800')}`}
                  >
                    <option value="gemini" style={isDarkMode ? { backgroundColor: '#0a0c10', color: '#fff' } : {}}>Gemini (Direct)</option>
                    <option value="genfity" style={isDarkMode ? { backgroundColor: '#0a0c10', color: '#fff' } : {}}>Genfity Gateway</option>
                  </select>

                  {textProvider === 'genfity' && (
                    <>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}>Model:</span>
                      <select
                        value={genfityModel}
                        onChange={(e) => handleGenfityModelChange(e.target.value)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold border appearance-none cursor-pointer transition-colors ${t('bg-[#0a0c10] border-gray-700 text-white', 'bg-white border-gray-200 text-gray-800')}`}
                      >
                        {GENFITY_MODELS.map((m) => (
                          <option key={m.v} value={m.v} style={isDarkMode ? { backgroundColor: '#0a0c10', color: '#fff' } : {}}>{m.l}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>

                {textProvider === 'genfity' && (
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest shrink-0 ${t('text-purple-400', 'text-purple-600')}`}>🔑 Genfity Key:</span>
                    <input
                      type="password"
                      value={genfityKey}
                      onChange={(e) => setGenfityKey(e.target.value)}
                      onBlur={(e) => handleSaveGenfityKey(e.target.value)}
                      placeholder="genfity_xxxxxxxxxxxx"
                      className={`flex-1 rounded-lg px-3 py-1.5 text-xs border focus:outline-none focus:ring-1 focus:ring-purple-400 ${t('bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600', 'bg-white border-gray-200 text-gray-800')}`}
                    />
                    {genfityKey && <span className="text-[10px] text-green-400 font-bold">✓</span>}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}>🎯 Output:</span>
                  <div className={`flex rounded-xl p-1 border ${t('bg-[#0a0c10] border-gray-700', 'bg-white border-gray-200')}`}>
                    <button
                      onClick={() => handleGenerateModeChange('text_and_images')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${generateMode === 'text_and_images' ? 'bg-sky-500 text-white shadow-sm' : t('text-gray-400', 'text-gray-500')}`}
                    >
                      📝 + 🖼️ Text + Images
                    </button>
                    <button
                      onClick={() => handleGenerateModeChange('text_only')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${generateMode === 'text_only' ? 'bg-purple-500 text-white shadow-sm' : t('text-gray-400', 'text-gray-500')}`}
                    >
                      📝 Text Only
                    </button>
                  </div>
                  {generateMode === 'text_only' && (
                    <span className={`text-[10px] font-medium ${t('text-purple-400', 'text-purple-600')}`}>(Gemini Key tak perlu)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative mb-10 group">
          <div className="flex items-center">
            <button
              onClick={() => scrollTabs('left')}
              className={`p-2 rounded-full mr-2 transition-all shrink-0 hover:bg-sky-500/10 ${t('text-sky-400 hover:text-sky-300', 'text-sky-500 hover:text-sky-600')}`}
            >
              <I name="ChevronLeft" className="w-5 h-5" />
            </button>

            <div
              ref={tabsContainerRef}
              onScroll={handleTabsScroll}
              className={`flex-grow flex p-1.5 rounded-full shadow-md overflow-x-auto border scroll-smooth relative select-none no-scrollbar ${C.p3(isDarkMode)}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { id: 'cinematic_pro', icon: <I name="Clapperboard" size={16} />, label: 'Cinematic Pro' },
                { id: 'microimpact', icon: <I name="Zap" size={16} />, label: '10s Micro' },
                { id: 'narrativearc', icon: <I name="Film" size={16} />, label: '30s Narrative' },
                { id: 'talkinghead', icon: <I name="User" size={16} />, label: 'Talking Head' },
                { id: 'product', icon: <I name="Box" size={16} />, label: 'Product POV' },
                { id: 'ootd', icon: <I name="Shirt" size={16} />, label: 'OOTD' },
                { id: 'ugc', icon: <I name="Video" size={16} />, label: 'Affiliate UGC' },
                { id: 'stopmotion', icon: <I name="Box" size={16} />, label: 'Stop Motion' },
                { id: 'grafix', icon: <I name="PenTool" size={16} />, label: 'Grafix' },
                { id: 'character', icon: <I name="User" size={16} />, label: 'Char Sheet' },
                { id: 'fake_influencer', icon: <I name="UserPlus" size={16} />, label: 'Fake Influencer' },
              ].map(tab => (
                <button
                  key={tab.id}
                  data-active={activeTab === tab.id ? "true" : "false"}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-shrink-0 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-xs transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : (t('text-gray-400 hover:text-white bg-transparent', 'text-gray-500 hover:text-gray-800 bg-transparent'))}`}
                >
                  {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className={`p-2 rounded-full ml-2 transition-all shrink-0 hover:bg-sky-500/10 ${t('text-sky-400 hover:text-sky-300', 'text-sky-500 hover:text-sky-600')}`}
            >
              <I name="ChevronRight" className="w-5 h-5" />
            </button>
          </div>

          <div className={`h-1.5 rounded-full mx-10 mt-3 relative overflow-hidden flex items-center ${t('bg-gray-800/60', 'bg-gray-200/60')}`}>
            <div
              className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-150"
              style={{
                width: '25%',
                left: `${scrollPercent * 0.75}%`
              }}
            />
          </div>
        </div>

        {activeTab === 'cinematic_pro' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Clapperboard" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Cinematic Pro — Universal Storyboard</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Core Subject / Video Topic"
                value={cinematicTopic}
                onChange={(e) => setCinematicTopic(e.target.value)}
                placeholder="e.g., The importance of financial planning among young adults..."
                rows={4}
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={cinematicDuration}
                  onChange={(e) => setCinematicDuration(e.target.value)}
                  options={['10', '15', '20', '30', '45', '60'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Cinematic Style"
                  value={cinematicStyle}
                  onChange={(e) => setCinematicStyle(e.target.value)}
                  options={[
                    { v: 'auto', l: 'Auto (AI Suggested)' },
                    'Epic Hollywood', 'Moody Cyberpunk', 'Aesthetic Pastel', 'Retro Film 1990s', 'Corporate Clean'
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <InputField
                label="Target Audience (Optional)"
                value={cinematicAudience}
                onChange={(e) => setCinematicAudience(e.target.value)}
                placeholder="e.g., Urban youth aged 20-30, startup founders..."
                isDarkMode={isDarkMode}
              />

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('cinematic_pro')}
                disabled={isGeneratingAll || !cinematicTopic.trim()}
                className={`${U.c2} mt-4 active:scale-[0.98] hover:opacity-90 disabled:opacity-50`}
              >
                {isGeneratingAll ? 'Processing Storyboard...' : 'Generate Cinematic Storyboard'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'microimpact' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Zap" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>10s Micro — Maximum Rapid Impact</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Core Topic / Hook Outline"
                value={microImpactTopic}
                onChange={(e) => setMicroImpactTopic(e.target.value)}
                placeholder="e.g., The secret to extra crunchy spicy anchovies..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Target Audience"
                  value={microImpactAudience}
                  onChange={(e) => setMicroImpactAudience(e.target.value)}
                  placeholder="e.g., Spicy food lovers, local foodies..."
                  isDarkMode={isDarkMode}
                />
                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('microimpact')}
                disabled={isGeneratingAll || !microImpactTopic.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Processing...' : 'Generate 10s Micro-Impact Suite'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'narrativearc' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Film" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>30s Narrative Arc — Smooth Storytelling</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Core Storyline / Narrative Topic"
                value={narrativeArcTopic}
                onChange={(e) => setNarrativeArcTopic(e.target.value)}
                placeholder="e.g., A young man's journey building a catering empire from home..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Target Audience"
                  value={narrativeArcAudience}
                  onChange={(e) => setNarrativeArcAudience(e.target.value)}
                  placeholder="e.g., Working adults, small business owners..."
                  isDarkMode={isDarkMode}
                />
                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('narrativearc')}
                disabled={isGeneratingAll || !narrativeArcTopic.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Processing...' : 'Generate 30s Narrative Arc'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'talkinghead' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="User" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Talking Head — Direct Presenter Focus</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Discussion Topic / Educational Script"
                value={thTopic}
                onChange={(e) => setThTopic(e.target.value)}
                placeholder="e.g., 3 essential tips to avoid online shopping scams..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={thDuration}
                  onChange={(e) => setThDuration(e.target.value)}
                  options={['15', '30', '60'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Delivery Tone"
                  value={thTone}
                  onChange={(e) => setThTone(e.target.value)}
                  options={[
                    { v: 'personal', l: 'Casual & Friendly' },
                    { v: 'professional', l: 'Professional & Charismatic' },
                    { v: 'energetic', l: 'High Energy / Affiliate' },
                    { v: 'educational', l: 'Educational / Lecture' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <InputField
                label="Target Audience"
                value={thAudience}
                onChange={(e) => setThAudience(e.target.value)}
                placeholder="e.g., College students, online shoppers..."
                isDarkMode={isDarkMode}
              />

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('talkinghead')}
                disabled={isGeneratingAll || !thTopic.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Processing...' : 'Generate Talking Head Profile'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'product' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Box" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Product POV — Showcase & Unboxing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Product Name / Core Subject"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Hydrating Brightening Glow Serum"
                  isDarkMode={isDarkMode}
                />
                <SelectField
                  label="Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={['Skincare', 'Food & Beverage', 'Tech & Gadgets', 'Fashion', 'Home Living']}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  options={['10', '15', '30'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Energy & Aesthetic Level"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(e.target.value)}
                  options={[
                    { v: 'Influencer energetic', l: 'Energetic & Vibrant' },
                    { v: 'Calm aesthetic', l: 'Calm & Aesthetic (ASMR)' },
                    { v: 'Premium brand vibe', l: 'Exclusive & Premium' },
                    { v: 'Cozy ASMR', l: 'Cozy / Satisfying Details' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Presentation Mode"
                  value={productPOVMode}
                  onChange={(e) => setProductPOVMode(e.target.value)}
                  options={[
                    { v: 'With Model', l: 'Include Model Showcasing Product' },
                    { v: 'Hands Only', l: 'Hands Only Focus (POV)' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Voice Narration Profile"
                  value={productNarration}
                  onChange={(e) => setProductNarration(e.target.value)}
                  options={[
                    { v: 'With Voice-Over', l: 'Include AI Voice-Over Script' },
                    { v: 'Mute / Background Music', l: 'Background Music Only / Muted' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Background Studio Setting"
                  value={productBackground}
                  onChange={(e) => setProductBackground(e.target.value)}
                  options={[
                    { v: 'Auto by AI', l: 'Auto Lifestyle Aesthetic Vibe' },
                    { v: 'Luxury Vanity Desk', l: 'Luxury Vanity Desk' },
                    { v: 'Modern Kitchen Counter', l: 'Modern Kitchen Counter' },
                    { v: 'Minimalist Living Room', l: 'Minimalist Living Room' },
                    { v: 'Lush Garden Setting', l: 'Lush Garden / Natural Setup' }
                  ]}
                  isDarkMode={isDarkMode}
                />
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={generateAllContent}
                disabled={isGeneratingAll || !productName.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Rendering Product Elements...' : 'Build Visual Concept & Sequence'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ootd' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Shirt" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>OOTD — Fashion & Apparel Profile</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Apparel Name / Theme Profile"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Pastel Raya Modern Kebaya Set"
                  isDarkMode={isDarkMode}
                />
                <SelectField
                  label="Aesthetic Style"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  options={[
                    { v: 'Korean Minimalist', l: 'Korean Minimalist / Clean Girl' },
                    { v: 'Streetwear Chic', l: 'Streetwear Chic & Baggy' },
                    { v: 'Modest Classic', l: 'Traditional / Modest Classic' },
                    { v: 'Parisian Vintage', l: 'Parisian Vintage' },
                    { v: 'Corporate Office Vibe', l: 'Smart Corporate Casual' }
                  ]}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  options={['10', '15', '30'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Headwear Configuration"
                  value={hijabMode}
                  onChange={(e) => setHijabMode(e.target.value)}
                  options={['Hijab', 'No Hijab']}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Mirror Selfie Reflection"
                  value={mirrorMode}
                  onChange={(e) => setMirrorMode(e.target.value === 'true')}
                  options={[
                    { v: 'true', l: 'Yes (Mirror Selfie Profile)' },
                    { v: 'false', l: 'No (Standard Direct Studio / Outdoor)' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Background Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  options={[
                    { v: 'Auto by AI', l: 'Auto Lifestyle Aesthetic Vibe' },
                    { v: 'Inside Car (Passenger Seat)', l: '🚗 Inside Car (Passenger Seat)' },
                    { v: 'Aesthetic Room', l: 'Minimalist Bedroom' },
                    { v: 'Studio Minimalis', l: 'Photo Studio' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Voice Narration Profile"
                  value={ootdNarration}
                  onChange={(e) => setOotdNarration(e.target.value)}
                  options={[
                    { v: 'With Voice-Over', l: 'Include AI Voice-Over Script' },
                    { v: 'Mute / Background Music', l: 'Background Music Only / Muted' }
                  ]}
                  isDarkMode={isDarkMode}
                />
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={generateAllContent}
                disabled={isGeneratingAll || !productName.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Generating Elements...' : 'Build OOTD Fashion Concept'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'ugc' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Video" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Affiliate UGC — Lifestyle Creator Pipeline</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Product Name / Core Subject"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Hydrating Brightening Glow Serum"
                  isDarkMode={isDarkMode}
                />
                <SelectField
                  label="Product Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={['Skincare', 'Food & Beverage', 'Tech & Gadgets', 'Fashion', 'Home Living']}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  options={['10', '15', '30'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="UGC Angle Profile"
                  value={ugcAngle}
                  onChange={(e) => setUgcAngle(e.target.value)}
                  options={[
                    { v: 'Storytime & Experience', l: 'Storytime & Personal Experience' },
                    { v: 'Problem & Solution', l: 'Problem & Immediate Solution' },
                    { v: 'Unboxing & First Impression', l: 'Unboxing & First Impressions' },
                    { v: 'ASMR / Quiet Review', l: 'ASMR / Aesthetic Quiet Review' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <SelectField
                label="Environment Setting"
                value={ugcEnvironment}
                onChange={(e) => setUgcEnvironment(e.target.value)}
                options={[
                  'Aesthetic Room', 'Cosy Cafe Setting', 'Minimalist Bathroom Space', 'Outdoor Park', 'Modern Office Setting'
                ]}
                isDarkMode={isDarkMode}
              />

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={generateAllContent}
                disabled={isGeneratingAll || !productName.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Generating Architecture...' : 'Process UGC Workflow Timeline'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stopmotion' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="Box" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Stop Motion — Creative Product Assembly</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Product Name / Animation Trajectory"
                value={smProduct}
                onChange={(e) => setSmProduct(e.target.value)}
                placeholder="e.g., Lipmatte glides in, opens automatically, and spreads its contents..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={smDuration}
                  onChange={(e) => setSmDuration(e.target.value)}
                  options={['5', '10', '15'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Stop-Motion Aesthetic"
                  value={smStyle}
                  onChange={(e) => setSmStyle(e.target.value)}
                  options={[
                    { v: 'premium', l: 'Premium & Polished' },
                    { v: 'quirky', l: 'Fun & Quirky' },
                    { v: 'minimalist', l: 'Clean Minimalist' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              <InputField
                label="Target Audience"
                value={smAudience}
                onChange={(e) => setSmAudience(e.target.value)}
                placeholder="e.g., Gen-Z, creative design lovers..."
                isDarkMode={isDarkMode}
              />

              {renderProductUploadBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('stopmotion')}
                disabled={isGeneratingAll || !smProduct.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Processing Sequences...' : 'Build Stop Motion Framework'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'grafix' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="PenTool" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Grafix — Kinetic Motion Graphics</h2>
            </div>
            
            <div className="space-y-6">
              <TextareaField
                label="Primary Subject / Core Message"
                value={gfTopic}
                onChange={(e) => setGfTopic(e.target.value)}
                placeholder="e.g., Explain exactly how solar panels save monthly electricity bills..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Video Duration"
                  value={gfDuration}
                  onChange={(e) => setGfDuration(e.target.value)}
                  options={['10', '20', '30', '45', '60'].map(v => ({ v, l: `${v} Seconds` }))}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Motion Graphics Framework"
                  value={gfStyle}
                  onChange={(e) => setGfStyle(e.target.value)}
                  options={[
                    { v: 'auto', l: 'Auto (Content Based)' },
                    { v: 'cyber-dashboard', l: 'Cyber-Dashboard Tech' },
                    { v: 'edgy-journalist', l: 'Edgy Journalist Outline' },
                    { v: 'cinematic-prestige', l: 'Cinematic Prestige' },
                    { v: 'organic-infographic', l: 'Organic Infographic' },
                    { v: 'financial-blueprint', l: 'Financial Blueprint' }
                  ]}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderBackgroundUploadBox()}

              <button
                onClick={() => generateNewMode('grafix')}
                disabled={isGeneratingAll || !gfTopic.trim()}
                className={`${U.c2} mt-4`}
              >
                {isGeneratingAll ? 'Constructing Explainer...' : 'Initialize Grafix Framework'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'character' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="User" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Character Sheet — Visual Consistency Vault</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Subject Registration Name"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="e.g., Sarah Amelia / Drone Tech X1"
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Target Subject Type"
                  value={charSubjectType}
                  onChange={(e) => setCharSubjectType(e.target.value)}
                  options={[
                    { v: 'HUMAN_CHARACTER', l: '🧑 Human Actor' },
                    { v: 'PRODUCT_CHARACTER', l: '📦 Primary Product' },
                    { v: 'VEHICLE_CHARACTER', l: '🚗 Vehicle' },
                    { v: 'ANIMAL_CHARACTER', l: '🐾 Animal / Organism' },
                    { v: 'MASCOT_CHARACTER', l: '🎭 Mascot / Avatar' },
                    { v: 'OBJECT_CHARACTER', l: '💻 Other (Laptop, Accessories...)' },
                    { v: 'AUTO_DETECT', l: '✨ AI Auto Detect (From Image)' }
                  ]}
                  isDarkMode={isDarkMode}
                />
              </div>

              <TextareaField
                label="Physical Description / Properties"
                value={characterDescription}
                onChange={(e) => setCharacterDescription(e.target.value)}
                placeholder="Include wardrobe details, physical traits, primary expression baseline..."
                isDarkMode={isDarkMode}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Camera Shot Scale"
                  value={charShotType}
                  onChange={(e) => setCharShotType(e.target.value)}
                  options={['Half Body (Portrait)', 'Full Body (Head to Toe)']}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Hijab Headwear Profile"
                  value={hijabMode}
                  onChange={(e) => setHijabMode(e.target.value)}
                  options={['Hijab', 'No Hijab']}
                  isDarkMode={isDarkMode}
                />

                <div>
                  <label className={C.label}>Aspect Ratio Target</label>
                  {renderAspectRatioButtons()}
                </div>
              </div>

              {renderGenderBox()}
              {renderProductUploadBox()}
              {renderIdentityBox()}

              <button
                onClick={generateAllContent}
                disabled={isGeneratingAll || !characterName.trim()}
                className={`${U.c2} mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-blue-500/20`}
              >
                {isGeneratingAll ? 'Extracting Profiles...' : 'Initialize Consistency Blueprint'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'fake_influencer' && (
          <div className={C.card(isDarkMode)}>
            <div className="flex items-center gap-4 mb-6">
              <div className={U.c3}><I name="UserPlus" size={20} /></div>
              <h2 className={C.h2(isDarkMode)}>Fake Influencer — Synthetic Digital Human</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Fictional Entity Name"
                  value={fiName}
                  onChange={(e) => setFiName(e.target.value)}
                  placeholder="e.g., Aina, Sofea, Amir, Zara"
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Assigned Age Demographic"
                  value={fiAge}
                  onChange={(e) => setFiAge(e.target.value)}
                  options={['18-22', '23-27', '28-32', '33-38']}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Target Niche Market"
                  value={fiNiche}
                  onChange={(e) => setFiNiche(e.target.value)}
                  options={FI_NICHE_OPTIONS}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Visual Format Configuration"
                  value={fiFormat}
                  onChange={(e) => setFiFormat(e.target.value)}
                  options={FI_FORMAT_OPTIONS}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Brand Vibe Personality"
                  value={fiVibe}
                  onChange={(e) => setFiVibe(e.target.value)}
                  options={fiGender === 'Female' ? FI_VIBE_OPTIONS_FEMALE : FI_VIBE_OPTIONS_MALE}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-800 pt-6 mt-6">
                <SelectField
                  label="Skin Tone Parameters"
                  value={fiSkinTone}
                  onChange={(e) => setFiSkinTone(e.target.value)}
                  options={FI_SKIN_TONE_OPTIONS}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Hair / Headwear Parameters"
                  value={fiHair}
                  onChange={(e) => setFiHair(e.target.value)}
                  options={fiGender === 'Female' ? FI_HAIR_HEADWEAR_FEMALE : FI_HAIR_HEADWEAR_MALE}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Outfit Vibe Matrix"
                  value={fiOutfit}
                  onChange={(e) => setFiOutfit(e.target.value)}
                  options={fiGender === 'Female' ? FI_OUTFIT_VIBE_FEMALE : FI_OUTFIT_VIBE_MALE}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField
                  label="Environmental Mapping"
                  value={fiBackground}
                  onChange={(e) => setFiBackground(e.target.value)}
                  options={FI_LOCATION_OPTIONS}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Facial Skeleton Vector"
                  value={fiFaceShape}
                  onChange={(e) => setFiFaceShape(e.target.value)}
                  options={['Soft oval face', 'Round cute face', 'Slim V-shape face', fiGender === 'Female' ? 'Heart-shaped face' : 'Strong jawline', 'Mature elegant face', 'Natural Malaysian features', 'Soft Southeast Asian features']}
                  isDarkMode={isDarkMode}
                />

                <SelectField
                  label="Realism Protocol Engine"
                  value={fiRealism}
                  onChange={(e) => setFiRealism(e.target.value)}
                  options={['TikTok UGC Natural MY', 'Raw Smartphone Photo', 'Ultra Realistic Human', 'DSLR Editorial Natural', 'Shopee Live Natural Lighting']}
                  isDarkMode={isDarkMode}
                />
              </div>

              {renderGenderBox()}

              <div className="border-t border-gray-800 pt-6 mt-6">
                <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">Quality Stability Checks</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'lockFace', label: 'Lock Face Variables' },
                    { key: 'ultraSkin', label: 'Real Human Pores' },
                    { key: 'rawPhoto', label: 'Raw Candid Filter' },
                    { key: 'safeFictional', label: 'Synthetic ID Policy' },
                    { key: 'noAi', label: 'No AI Plastic Look' },
                    { key: 'noText', label: 'No Text Overlay' },
                    { key: 'realHands', label: 'Anatomically Correct Hands' },
                    { key: 'realSkin', label: 'Skin Pore Texture Details' }
                  ].map(rule => (
                    <label key={rule.key} className="flex items-center gap-2 cursor-pointer group" onClick={() => setFiRules(prev => ({ ...prev, [rule.key]: !prev[rule.key] }))}>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${fiRules[rule.key] ? 'bg-sky-500 border-sky-500' : (t('bg-[#0a0c10] border-gray-700 group-hover:border-sky-500', 'bg-white border-gray-300 group-hover:border-sky-400'))}`}>
                         {fiRules[rule.key] && <I name="Check" size={12} className="text-white" />}
                      </div>
                      <span className="text-xs text-gray-400 select-none group-hover:text-gray-300">{rule.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <TextareaField
                label="Custom Engineering Directives"
                value={fiCustom}
                onChange={(e) => setFiCustom(e.target.value)}
                placeholder="Inject custom prompt specifications here..."
                isDarkMode={isDarkMode}
              />
              
              {renderBackgroundUploadBox()}

              <button
                onClick={generateAllContent}
                disabled={isGeneratingAll || !fiName.trim()}
                className={`${U.c2} mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20`}
              >
                {isGeneratingAll ? 'Deploying Synthetic Identity...' : 'Generate Synthetic Personality Matrix'}
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Display Canvas & Final Pipeline Results */}
        {(generatedOutput || isGeneratingImage || Object.values(regeneratingIndexes).some(v => v) || Object.keys(showMagicBox).length > 0) && (
          <div ref={outputRef} className="animate-fade-in-up mt-20 pt-10">
            <div className="text-center mb-16 relative">
               <h2 className={`text-4xl font-black tracking-wide mb-4 ${U.c14}`}>
                 {activeTab === 'character' ? 'Character Blueprint Reference' : activeTab === 'cinematic_pro' ? 'Cinematic Storyboard Details' : activeTab === 'microimpact' ? '10s Micro-Impact Suite' : activeTab === 'narrativearc' ? '30s Narrative Arc Pipeline' : activeTab === 'talkinghead' ? 'Talking Head Board Mapping' : activeTab === 'stopmotion' ? 'Stop Motion Frame Sequencing' : activeTab === 'grafix' ? 'Motion Graphics Deck' : 'Unified Workspace Canvas'}
               </h2>
               <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-16">
              <div>
                {isGeneratingImage && imageUrls.length === 0 ? (
                  <div className={`w-full max-w-lg mx-auto border rounded-[3rem] p-10 flex flex-col items-center justify-center text-center aspect-[9/16] shadow-2xl ${t('bg-[#11131a] border-gray-800 shadow-black/50', 'bg-white border-sky-100')}`}>
                     <div className="w-16 h-16 border-4 border-sky-100 border-t-pink-500 rounded-full animate-spin mb-6"></div>
                     <p className="text-lg font-black text-sky-500 animate-pulse tracking-widest uppercase">{loadingText}</p>
                  </div>
                ) : (
                  <div className={`grid grid-cols-1 ${imageUrls.length >= 6 ? 'md:grid-cols-3 max-w-6xl' : imageUrls.length === 3 ? 'md:grid-cols-3 max-w-6xl' : imageUrls.length > 1 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-md'} mx-auto gap-6 lg:gap-10`}>
                    {imageUrls.map((url, index) => {
                       const pairIndex = Math.floor(index / 2);
                       const isSecondInPair = index % 2 === 1;
                       const hasPairPartner = imageUrls.length >= 4 && index % 2 === 1 && imageUrls[index - 1];
                       const slideDescs = activeTab === 'character' ? [
                         "Character reference: Structural details for scene modeling continuity.",
                         "Alternate character sheet viewpoint: Controlled ambient rendering metrics."
                       ] : activeTab === 'ugc' ? [
                         "Scene (Hook): Instant scrolling attention mechanism.",
                         "Scene (Showcase): Macro product detail highlights.",
                         "Scene (CTA): High-retention close-out call-to-action."
                       ] : [
                         "Fictional subject visual generated safely via reference guidelines.",
                         "Consistent body posture mapped precisely inside frame constraints."
                       ];

                       return (
                      <div key={index} className="flex flex-col group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="flex gap-4 mb-6 px-2">
                           <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg">
                             0{index + 1}
                           </div>
                           <div className="flex items-center">
                             <p className={`text-xs leading-relaxed font-medium ${C.muted(isDarkMode)}`}>
                               {slideDescs[index % slideDescs.length]}
                             </p>
                           </div>
                        </div>

                        <div className={`relative border-[8px] rounded-[3rem] shadow-2xl overflow-hidden flex-grow flex flex-col group-hover:-translate-y-2 transition-transform duration-500 ${t('border-[#1a1c23] bg-[#1a1c23] shadow-black/50', 'border-gray-900 bg-gray-900')}`}>
                          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
                             <div className={`w-32 h-6 rounded-b-2xl ${t('bg-[#1a1c23]', 'bg-gray-900')}`}></div>
                          </div>

                          <div
                            className={`relative w-full ${containerAspectClass} bg-black overflow-hidden cursor-zoom-in`}
                            onClick={() => setFullscreenImage(url)}
                          >
                            {(regeneratingIndexes[index] || isMagicEditing[index]) && (
                               <div className="absolute inset-0 backdrop-blur-xl z-30 flex flex-col items-center justify-center text-center p-4 bg-black/80">
                                   <I name="RefreshCw" className="animate-spin text-sky-500 mb-4" size={32} />
                                   <span className="text-[10px] text-white font-black tracking-widest mb-6 animate-pulse">
                                     {isMagicEditing[index] ? 'APPLYING MAGIC BOX ADJUSTMENTS...' : 'RE-SCHEDULING VISUAL GENERATION...'}
                                   </span>
                               </div>
                            )}

                            <img
                              src={url}
                              alt={`Output ${index + 1}`}
                              className="w-full h-full object-cover transition-all duration-700"
                              style={{
                                transform: zoomedImages[index] ? 'scale(1.5)' : 'scale(1)',
                                transition: zoomedImages[index] ? 'transform 15s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-6">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDownloadHD(url, index)}
                                disabled={!url || regeneratingIndexes[index]}
                                className={`flex-1 py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${t('bg-[#11131a] border-gray-800 text-white hover:border-sky-500', 'bg-white border-gray-200 text-gray-700 hover:border-sky-400')}`}
                              >
                                <I name="Download" size={14} className="text-sky-500" /> DOWNLOAD HD
                              </button>
                              <button
                                onClick={() => regenerateSingleVisual(index)}
                                disabled={!url || regeneratingIndexes[index]}
                                className={`flex-1 py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${t('bg-[#11131a] border-gray-800 text-white hover:border-cyan-400', 'bg-white border-gray-200 text-gray-700 hover:border-cyan-400')}`}
                              >
                                <I name="RefreshCw" size={14} className={`${regeneratingIndexes[index] ? "animate-spin text-sky-500" : "text-gray-400"}`} /> ALTERNATIVE
                              </button>
                            </div>

                            <button
                              onClick={() => toggleMagicBox(index)}
                              disabled={!url || regeneratingIndexes[index]}
                              className={`w-full py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${showMagicBox[index] ? (PINK_GRAD + ' border-transparent') : (t('bg-[#11131a] border-gray-800 text-sky-400 hover:border-sky-500', 'bg-sky-50 border-sky-200 text-sky-600'))}`}
                            >
                              <I name="Wand2" size={14} className={showMagicBox[index] ? "text-white" : "text-sky-500"} />
                              {showMagicBox[index] ? 'CLOSE MAGIC BOX' : 'MAGIC BOX TUNER 🪄'}
                            </button>

                            {showMagicBox[index] && (
                               <div className={`mt-2 p-4 rounded-xl border shadow-inner animate-fade-in ${t('bg-[#0a0c10] border-sky-500/30', 'bg-sky-50/50 border-sky-200')}`}>
                                  <label className={`block text-[9px] font-bold mb-2 uppercase tracking-widest ${t('text-sky-400', 'text-sky-500')}`}>
                                    Fine-Tune Visual Architecture
                                  </label>
                                  <textarea
                                    value={magicPrompts[index] || ''}
                                    onChange={(e) => setMagicPrompts({ ...magicPrompts, [index]: e.target.value })}
                                    placeholder="e.g., Swap outfit color to elegant white, apply heavy cinematic shadow details..."
                                    rows={2}
                                    className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400 transition-all border resize-none ${t('bg-[#11131a] border-gray-700 text-white placeholder-gray-600', 'bg-white border-sky-100 text-gray-800')}`}
                                    style={isDarkMode ? { backgroundColor: '#11131a', color: '#ffffff', borderColor: '#374151' } : {}}
                                  />
                                  <button
                                    onClick={() => performMagicEdit(index)}
                                    disabled={!magicPrompts[index] || isMagicEditing[index]}
                                    className={`w-full mt-2 py-2.5 rounded-lg text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-md ${PINK_GRAD}`}
                                  >
                                    <I name="Send" size={12} /> Execute Parameter Updates
                                  </button>
                               </div>
                            )}

                            {/* Download Combined Segment button — shown on the 2nd image of each pair */}
                            {hasPairPartner && (
                              <button
                                onClick={() => handleDownloadCombinedSegment(pairIndex)}
                                disabled={combiningPairIndex === pairIndex}
                                className={`w-full mt-2 py-3 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${t('bg-sky-950/30 border-sky-800/50 text-sky-400 hover:border-sky-500', 'bg-sky-50 border-sky-200 text-sky-600 hover:border-sky-400')}`}
                              >
                                <I name="Layers" size={14} className="text-sky-400" />
                                {combiningPairIndex === pairIndex ? 'COMBINING...' : `⬇️ DOWNLOAD COMBINED SEGMENT ${pairIndex + 1}`}
                              </button>
                            )}
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>

              {/* Flow AI Segments — directly below images */}
              {generatedOutput && activeTab !== 'character' && activeTab !== 'fake_influencer' && (() => {
                const totalSec = parseDurationToSeconds(generatedOutput.selectedDurationSec)
                  || parseDurationToSeconds(generatedOutput.duration)
                  || getSelectedDurationSeconds();
                if (!totalSec || totalSec < 1) return null;

                const normScenes = collectScenesForFlow();
                const fallbackScenes = normScenes.length
                  ? normScenes
                  : [{
                      scene_num: 1,
                      timecode: `0s–${totalSec}s`,
                      visual: editedValues.videoPrompt || generatedOutput.videoPrompt || editableImagePrompt || '',
                      dialogue: editedValues.script || generatedOutput.script || '',
                      i2v_prompt: ''
                    }];

                const segs = generateFlowSegments(fallbackScenes, String(totalSec), {
                  identityBible: generatedOutput.identityBible || editedValues.identityBible || '',
                  aspectRatio: currentDisplayRatio || aspectRatio || '9:16',
                  title: generatedOutput.title || generatedOutput.caption || productName || cinematicTopic || ''
                });
                if (!segs.length) return null;

                return (
                  <div className="border rounded-[1.25rem] p-6 shadow-sm relative transition-all duration-300 bg-[#09151c] border-[#12313f] mt-8 max-w-4xl mx-auto">
                    <h3 className="font-extrabold text-sm flex items-center gap-2 uppercase tracking-wide mb-2 text-[#38bdf8]">
                      <span style={{ fontSize: '16px', lineHeight: 1 }}>⚡</span> FLOW AI CONTINUITY SEGMENTS (I2V)
                    </h3>
                    <p className="text-xs mb-2 leading-relaxed text-gray-400">
                      Core duration: <span className="text-sky-300 font-bold">{totalSec}s</span>
                      {' '}· Preparing {segs.length} chained segments.
                    </p>
                    <p className="text-[10px] mb-4 text-gray-500 uppercase tracking-widest">
                      {segs.map((s) => s.label).join('  →  ')}
                    </p>
                    <div className="space-y-3 mt-2">
                      {segs.map((seg, i) => {
                        const isSegExpanded = editModes[`flow_seg_expand_${i}`];
                        const segPromptKey = `flow_seg_prompt_${i}`;
                        const segDialogueKey = `flow_seg_dialogue_${i}`;
                        const isPromptEditing = editModes[segPromptKey];
                        const isDialogueEditing = editModes[segDialogueKey];
                        
                        // Extract dialogue from the segment's scenes
                        const segScenes = normScenes.filter((sc) => {
                          const m = String(sc.timecode || '').match(/(\d+\.?\d*)/);
                          if (!m) return false;
                          const start = parseFloat(m[1]);
                          return start >= seg.start && start < seg.end;
                        });
                        const segDialogue = segScenes.map((sc) => sc.dialogue).filter(Boolean).join('\n');
                        
                        const currentPromptVal = editedValues[segPromptKey] !== undefined ? editedValues[segPromptKey] : seg.prompt;
                        const currentDialogueVal = editedValues[segDialogueKey] !== undefined ? editedValues[segDialogueKey] : segDialogue;

                        return (
                          <div key={`${seg.label}_${i}`} className={`rounded-xl border overflow-hidden transition-all ${isSegExpanded ? 'bg-[#0c1e27] border-[#1e4d5f]' : 'bg-[#0c1e27] border-[#143e4f]'}`}>
                            <div className="flex items-center justify-between px-4 py-3">
                              <button
                                onClick={() => toggleEditBoxMode(`flow_seg_expand_${i}`)}
                                className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-[#38bdf8] hover:text-sky-300 transition-colors"
                              >
                                <I name={isSegExpanded ? "ChevronDown" : "ChevronRight"} size={12} />
                                {seg.label} · SEGMENT {seg.part}/{seg.parts}
                              </button>
                              <button
                                onClick={() => copyToClipboard(currentPromptVal, `flow_seg_${i}`)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                                  copiedSection === `flow_seg_${i}`
                                  ? 'bg-[#15803d] text-white'
                                  : 'bg-[#143e4f] text-[#38bdf8] hover:bg-[#1e4d5f]'
                                }`}
                              >
                                <span style={{ fontSize: '12px', lineHeight: 1 }}>{copiedSection === `flow_seg_${i}` ? '✅' : '📋'}</span>
                                {copiedSection === `flow_seg_${i}` ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            
                            {isSegExpanded && (
                              <div className="px-4 pb-4 space-y-3 border-t border-[#143e4f] pt-3 animate-fade-in">
                                {/* Editable Prompt */}
                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400">Segment Prompt</span>
                                    <div className="flex gap-1.5">
                                      {isPromptEditing ? (
                                        <button onClick={() => saveBoxValue(segPromptKey)} className={U.c9}>Save</button>
                                      ) : (
                                        <button onClick={() => toggleEditBoxMode(segPromptKey)} className="px-2 py-0.5 rounded text-[10px] bg-[#143e4f] text-sky-300 font-bold hover:bg-[#1e4d5f]">Edit</button>
                                      )}
                                    </div>
                                  </div>
                                  {isPromptEditing ? (
                                    <textarea
                                      value={currentPromptVal}
                                      onChange={(e) => handleBoxValueChange(segPromptKey, e.target.value)}
                                      rows={5}
                                      className="w-full rounded-lg px-3 py-2 text-[11px] font-mono resize-none focus:outline-none focus:ring-1 focus:ring-sky-400 border bg-[#09151c] border-[#1e4d5f] text-gray-200"
                                    />
                                  ) : (
                                    <div className="whitespace-pre-wrap text-[11px] font-mono leading-relaxed text-gray-300 bg-[#09151c] border border-[#1e4d5f] rounded-lg p-3 max-h-40 overflow-y-auto custom-scrollbar">
                                      {currentPromptVal}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Editable Dialogue */}
                                {(currentDialogueVal || isDialogueEditing) && (
                                  <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400">🎤 Dialog / VO (Segment)</span>
                                      <div className="flex gap-1.5">
                                        {isDialogueEditing ? (
                                          <button onClick={() => saveBoxValue(segDialogueKey)} className={U.c9}>Save</button>
                                        ) : (
                                          <button onClick={() => toggleEditBoxMode(segDialogueKey)} className="px-2 py-0.5 rounded text-[10px] bg-sky-900/40 text-sky-400 font-bold hover:bg-sky-900/60">Edit</button>
                                        )}
                                        <button onClick={() => copyToClipboard(currentDialogueVal, `flow_seg_dlg_${i}`)} className={`px-2 py-0.5 rounded text-[10px] font-bold ${copiedSection === `flow_seg_dlg_${i}` ? 'bg-green-500 text-white' : 'bg-sky-900/40 text-sky-400'}`}>
                                          {copiedSection === `flow_seg_dlg_${i}` ? '✅' : '📋'}
                                        </button>
                                      </div>
                                    </div>
                                    {isDialogueEditing ? (
                                      <textarea
                                        value={currentDialogueVal}
                                        onChange={(e) => handleBoxValueChange(segDialogueKey, e.target.value)}
                                        rows={3}
                                        className="w-full rounded-lg px-3 py-2 text-[11px] font-mono resize-none focus:outline-none focus:ring-1 focus:ring-sky-400 border bg-sky-950/20 border-pink-900/30 text-pink-200"
                                      />
                                    ) : (
                                      <div className="whitespace-pre-wrap text-[11px] font-medium leading-relaxed italic text-sky-300 bg-sky-950/20 border border-pink-900/30 rounded-lg p-3">
                                        {currentDialogueVal || '(No dialogue for this segment)'}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {generatedOutput && (
                <div className={`rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border transition-all duration-300 ${t('bg-[#11131a] border-gray-800', 'bg-white border-pink-50')}`}>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b pb-6 relative z-10 ${U.c15}`}>
                    <div>
                      <h3 className={`text-2xl font-black flex items-center gap-3 ${U.c14}`}>
                        {activeTab === 'fake_influencer' ? <I name="UserPlus" className="text-sky-500" size={28} /> : (activeTab === 'character') ? <I name="Camera" className="text-sky-500" size={28} /> : <I name="Video" className="text-sky-500" size={28} />}
                        {['fake_influencer'].includes(activeTab) ? "Synthetic Persona Vault" : activeTab === 'character' ? "Identity Blueprint Matrix" : "Sequence & Script Console"}
                      </h3>
                      <p className="text-xs mt-2 tracking-widest uppercase text-gray-400">
                        Transfer components seamlessly to Kling / Runway / Luma flow layers.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                    <div className={`${(activeTab === 'fake_influencer' || activeTab === 'character') ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
                      {activeTab === 'fake_influencer' ? (
                        <div className="space-y-6">
                            <div className={`rounded-2xl border px-4 py-3 text-xs ${t('bg-emerald-500/5 border-emerald-500/20 text-emerald-300', 'bg-emerald-50 border-emerald-100 text-emerald-700')}`}>
                              Format Restriction: <strong>Malaysia Local Influencer Model</strong>
                              {generatedOutput?.fiCategories ? (
                                <span className="block mt-1 text-[11px] opacity-90">
                                  Skin Vector: {generatedOutput.fiCategories.skinTone} · Hair Array: {generatedOutput.fiCategories.hairHeadwear} · Style Matrix: {generatedOutput.fiCategories.outfitVibe}
                                </span>
                              ) : null}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderOutputBox("01. Identiti Asas Kreator (Basic Setup)", <I name="User" size={16} />, 'fiIdentity')}
                                {renderOutputBox("02. Spesifikasi Profil Wajah & Fizikal", <I name="Eye" size={16} />, 'fiDesc')}
                            </div>
                            {renderOutputBox("03. Master Image Synthesizer Prompt", <I name="Sparkles" size={16} />, 'fiMainPrompt')}
                            {renderOutputBox("04. Strict Negative Exclusions", <I name="ShieldAlert" size={16} />, 'fiNegPrompt')}
                            {renderOutputBox("05. Face/Identity Consistency Protocol", <I name="CheckCircle" size={16} />, 'fiConsistency')}
                            {renderOutputBox("06. Layout Format (Character Sheet Structure)", <I name="Layers" size={16} />, 'fiSheet')}
                            {renderOutputBox("07. I2V Motion Prompts (TikTok/Shopee Format)", <I name="Video" size={16} />, 'fiTiktok')}
                        </div>
                      ) : activeTab === 'ugc' ? (
                        <div className="space-y-6">
                          {(editedValues.scenes || generatedOutput.scenes || []).map((scene, idx) => {
                            const isVisualEditing = editModes[`ugc_scene_${idx}_visual`];
                            const isDialogueEditing = editModes[`ugc_scene_${idx}_dialogue`];
                            const visualVal = editedValues[`ugc_scene_${idx}_visual`] !== undefined ? editedValues[`ugc_scene_${idx}_visual`] : scene.visual;
                            const dialogueVal = editedValues[`ugc_scene_${idx}_dialogue`] !== undefined ? editedValues[`ugc_scene_${idx}_dialogue`] : scene.dialogue;

                            return (
                              <div key={idx} className="border rounded-2xl p-5 shadow-sm relative transition-all duration-300 bg-gray-800/20 border-gray-700 animate-fade-in-up">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700/50">
                                  <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-wider text-sky-400">
                                    <I name="Video" size={16} /> Scene 0{scene.sceneNumber} ({scene.timecode})
                                  </h3>
                                </div>
                                <div className="space-y-4">
                                  <div className="space-y-1">
                                    <div className={U.c12}>
                                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Image to Video Visual Prompt:</span>
                                      <div className="flex gap-1.5">
                                        {isVisualEditing ? (
                                          <button onClick={() => saveBoxValue(`ugc_scene_${idx}_visual`)} className={U.c9}>Save</button>
                                        ) : (
                                          <button onClick={() => toggleEditBoxMode(`ugc_scene_${idx}_visual`)} className={U.c8}>Edit</button>
                                        )}
                                        <button onClick={() => copyToClipboard(visualVal, `ugc_${idx}_vis`)} className={U.c7}>Copy</button>
                                      </div>
                                    </div>

                                    {isVisualEditing ? (
                                      <div className="space-y-2">
                                        <textarea
                                          value={visualVal}
                                          onChange={(e) => handleBoxValueChange(`ugc_scene_${idx}_visual`, e.target.value)}
                                          rows={4}
                                          className={`w-full rounded-xl p-3 font-mono text-[13px] border focus:outline-none focus:ring-1 focus:ring-sky-400 ${C.p2(isDarkMode)}`}
                                        />
                                      </div>
                                    ) : (
                                      <div className={`whitespace-pre-wrap leading-relaxed font-mono text-[13px] p-4 rounded-xl border min-h-[80px] ${isDarkMode ? 'text-gray-300 bg-gray-950/60 border-gray-800/80' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>
                                        {visualVal}
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-1">
                                    <div className={U.c12}>
                                      <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Skrip Penyampaian / Voiceover (Malay):</span>
                                      <div className="flex gap-1.5">
                                        {isDialogueEditing ? (
                                          <button onClick={() => saveBoxValue(`ugc_scene_${idx}_dialogue`)} className={U.c9}>Save</button>
                                        ) : (
                                          <button onClick={() => toggleEditBoxMode(`ugc_scene_${idx}_dialogue`)} className={U.c8}>Edit</button>
                                        )}
                                        <button onClick={() => copyToClipboard(dialogueVal, `ugc_${idx}_dlg`)} className={U.c7}>Copy</button>
                                      </div>
                                    </div>

                                    {isDialogueEditing ? (
                                      <textarea
                                        value={dialogueVal}
                                        onChange={(e) => handleBoxValueChange(`ugc_scene_${idx}_dialogue`, e.target.value)}
                                        rows={3}
                                        className={`w-full rounded-xl p-3 font-mono text-[13px] border focus:outline-none focus:ring-1 focus:ring-sky-400 ${C.p2(isDarkMode)}`}
                                      />
                                    ) : (
                                      <div className={`whitespace-pre-wrap leading-relaxed font-sans text-sm p-4 rounded-xl border min-h-[50px] ${isDarkMode ? 'text-gray-200 bg-sky-950/20 border-pink-900/30' : 'text-gray-700 bg-sky-50 border-sky-200'}`}>
                                        {dialogueVal}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : activeTab === 'ootd' ? (
                        <div className="space-y-6">
                          {(editedValues.ootdScenes || generatedOutput.ootdScenes || []).map((scene, idx) => {
                            const isVisualEditing = editModes[`ootd_scene_${idx}_visual`];
                            const isDialogueEditing = editModes[`ootd_scene_${idx}_dialogue`];
                            const visualVal = editedValues[`ootd_scene_${idx}_visual`] !== undefined ? editedValues[`ootd_scene_${idx}_visual`] : scene.videoPrompt;
                            const dialogueVal = editedValues[`ootd_scene_${idx}_dialogue`] !== undefined ? editedValues[`ootd_scene_${idx}_dialogue`] : scene.script;

                            return (
                            <div key={idx} className="border rounded-2xl p-5 shadow-sm relative transition-all duration-300 bg-gray-800/20 border-gray-700">
                              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700/50">
                                <h3 className="font-bold text-sm flex items-center gap-2 uppercase tracking-wider text-sky-400">
                                  <I name="Video" size={16} /> Adegan Visual 0{scene.sceneNumber}
                                </h3>
                              </div>
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <div className={U.c12}>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Image to Video Visual Prompt:</span>
                                    <div className="flex gap-1.5">
                                      {isVisualEditing ? (
                                        <button onClick={() => saveBoxValue(`ootd_scene_${idx}_visual`)} className={U.c9}>Save</button>
                                      ) : (
                                        <button onClick={() => toggleEditBoxMode(`ootd_scene_${idx}_visual`)} className={U.c8}>Edit</button>
                                      )}
                                      <button onClick={() => copyToClipboard(visualVal, `ootd_${idx}_vis`)} className={U.c7}>Copy</button>
                                    </div>
                                  </div>

                                  {isVisualEditing ? (
                                    <div className="space-y-2">
                                      <textarea
                                        value={visualVal}
                                        onChange={(e) => handleBoxValueChange(`ootd_scene_${idx}_visual`, e.target.value)}
                                        rows={4}
                                        className={`w-full rounded-xl p-3 font-mono text-[13px] border focus:outline-none focus:ring-1 focus:ring-sky-400 ${C.p2(isDarkMode)}`}
                                      />
                                    </div>
                                  ) : (
                                    <div className={`whitespace-pre-wrap leading-relaxed font-mono text-[13px] p-4 rounded-xl border min-h-[100px] ${isDarkMode ? 'text-gray-300 bg-gray-950/60 border-gray-800/80' : 'text-gray-700 bg-gray-50 border-gray-200'}`}>
                                      {visualVal}
                                    </div>
                                  )}
                                </div>

                                {!scene.isMute && (
                                  <div className="space-y-1">
                                    <div className={U.c12}>
                                      <span className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Skrip Penyampaian (Bahasa Melayu):</span>
                                      <div className="flex gap-1.5">
                                        {isDialogueEditing ? (
                                          <button onClick={() => saveBoxValue(`ootd_scene_${idx}_dialogue`)} className={U.c9}>Save</button>
                                        ) : (
                                          <button onClick={() => toggleEditBoxMode(`ootd_scene_${idx}_dialogue`)} className={U.c8}>Edit</button>
                                        )}
                                        <button onClick={() => copyToClipboard(dialogueVal, `ootd_${idx}_dlg`)} className={U.c7}>Copy</button>
                                      </div>
                                    </div>

                                    {isDialogueEditing ? (
                                      <textarea
                                        value={dialogueVal}
                                        onChange={(e) => handleBoxValueChange(`ootd_scene_${idx}_dialogue`, e.target.value)}
                                        rows={3}
                                        className={`w-full rounded-xl p-3 font-mono text-[13px] border focus:outline-none focus:ring-1 focus:ring-sky-400 ${C.p2(isDarkMode)}`}
                                      />
                                    ) : (
                                      <div className={`whitespace-pre-wrap leading-relaxed font-sans text-sm p-4 rounded-xl border min-h-[60px] ${isDarkMode ? 'text-gray-200 bg-sky-950/20 border-pink-900/30' : 'text-gray-700 bg-sky-50 border-sky-200'}`}>
                                        {dialogueVal}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )})}
                        </div>
                      ) : (activeTab === 'character') ? (
                        renderOutputBox("01. Blueprint Synthesis Architecture", <I name="Camera" size={16} />, 'videoPrompt', null, true)
                      ) : (
                        <>
                          {renderOutputBox("01. Master Composition Prompt", <I name="Video" size={16} />, 'videoPrompt', null, true)}
                        </>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <button
                          onClick={() => {
                            let promptText = "";
                            if (activeTab === 'fake_influencer') {
                              promptText = `[MAIN IMAGE PROMPT]\n${editedValues.fiMainPrompt || generatedOutput.fiMainPrompt}\n\n[NEGATIVE PROMPT]\n${editedValues.fiNegPrompt || generatedOutput.fiNegPrompt}`;
                            } else if (activeTab === 'character') {
                              promptText = `[IMAGE PROMPT]\n${editedValues.videoPrompt || editableImagePrompt}`;
                            } else if (editedValues.script || generatedOutput.script) {
                              promptText = `[VIDEO PROMPT]\n${editedValues.videoPrompt || generatedOutput.videoPrompt}\n\n[DIALOGUE]\n${editedValues.script || generatedOutput.script}`;
                            } else {
                              promptText = `[VIDEO PROMPT]\n${editedValues.videoPrompt || generatedOutput.videoPrompt}`;
                            }
                            copyToClipboard(promptText, 'copyPromptOnly');
                          }}
                          className={`flex items-center justify-center gap-2 border py-4 rounded-2xl text-[10px] font-black transition-all shadow-sm group relative overflow-hidden uppercase tracking-widest ${
                            copiedSection === 'copyPromptOnly'
                            ? 'bg-green-100 text-green-600 border-green-200 opacity-100'
                            : (t('bg-[#0a0c10] border-gray-800 text-white hover:border-sky-500', 'bg-white border-gray-200 text-gray-800 hover:border-sky-400'))
                          }`}
                        >
                          {copiedSection === 'copyPromptOnly' ? <I name="Check" size={16} /> : <I name="Copy" size={16} />}
                          <span>{copiedSection === 'copyPromptOnly' ? 'Master Frame Copied' : 'Salin Konteks Teras'}</span>
                        </button>

                        <button
                          onClick={() => {
                            let jsonPrompt = "";
                            if (activeTab === 'fake_influencer') {
                              jsonPrompt = JSON.stringify({
                                target_models: ["Midjourney v6", "Flux.1", "Stable Diffusion 3"],
                                character_identity: editedValues.fiIdentity || generatedOutput.fiIdentity,
                                visual_description: editedValues.fiDesc || generatedOutput.fiDesc,
                                main_image_prompt: editedValues.fiMainPrompt || generatedOutput.fiMainPrompt,
                                negative_prompt: editedValues.fiNegPrompt || generatedOutput.fiNegPrompt,
                                consistency_lock: editedValues.fiConsistency || generatedOutput.fiConsistency,
                                character_sheet: editedValues.fiSheet || generatedOutput.fiSheet,
                                tiktok_video_prompt: editedValues.fiTiktok || generatedOutput.fiTiktok
                              }, null, 2);
                            } else if (activeTab === 'character') {
                              jsonPrompt = JSON.stringify({ imagePrompt: editedValues.videoPrompt || editableImagePrompt }, null, 2);
                            } else if (activeTab === 'ugc') {
                              jsonPrompt = JSON.stringify({
                                target_models: ["Gemini Omni Flash", "Seedance", "Kling", "Veo", "Grok"],
                                image_generation_prompt: editedValues.videoPrompt || editableImagePrompt,
                                scenes: (editedValues.scenes || generatedOutput.scenes || []).map((s, idx) => ({
                                  visual: editedValues[`ugc_scene_${idx}_visual`] || s.visual,
                                  dialogue: editedValues[`ugc_scene_${idx}_dialogue`] || s.dialogue
                                }))
                              }, null, 2);
                            } else if (activeTab === 'ootd') {
                              jsonPrompt = JSON.stringify({
                                target_models: ["Gemini Omni Flash", "Kling", "Veo", "Grok", "Seedance"],
                                scenes: (editedValues.ootdScenes || generatedOutput.ootdScenes || []).map((s, idx) => ({
                                  visual: editedValues[`ootd_scene_${idx}_visual`] || s.videoPrompt,
                                  dialogue: editedValues[`ootd_scene_${idx}_dialogue`] || s.script
                                }))
                              }, null, 2);
                            } else {
                              jsonPrompt = JSON.stringify({
                                target_models: ["Gemini Omni Flash", "Kling", "Veo", "Grok", "Seedance"],
                                videoPrompt: editedValues.videoPrompt || generatedOutput.videoPrompt,
                                dialogue: editedValues.script || generatedOutput.script || "No Voice-Over"
                              }, null, 2);
                            }
                            copyToClipboard(jsonPrompt, 'copyPromptJson');
                          }}
                          className={`flex items-center justify-center gap-2 border py-4 rounded-2xl text-[10px] font-black transition-all shadow-sm group relative overflow-hidden uppercase tracking-widest ${
                            copiedSection === 'copyPromptJson'
                            ? 'bg-green-100 text-green-600 border-green-200 opacity-100'
                            : (t('bg-[#0a0c10] border-gray-800 text-white hover:border-sky-500', 'bg-white border-gray-200 text-gray-800 hover:border-sky-400'))
                          }`}
                        >
                          {copiedSection === 'copyPromptJson' ? <I name="Check" size={16} /> : <I name="Code" size={16} />}
                          <span>{copiedSection === 'copyPromptJson' ? 'JSON Parameter Built' : 'Export Format JSON'}</span>
                        </button>
                      </div>
                    </div>

                    {activeTab !== 'character' && activeTab !== 'fake_influencer' && (
                      <div className="lg:col-span-5 space-y-6">
                        {activeTab !== 'ugc' && activeTab !== 'ootd' && (generatedOutput.script || editedValues.script) && renderOutputBox("02. Papan Cerita & Voice Over (Bahasa Melayu)", <I name="Mic" size={16} />, 'script')}
                        {(generatedOutput.caption || editedValues.caption) && renderOutputBox("03. Konfigurasi Penulisan Caption & Hashtag", <I name="Hash" size={16} />, 'caption', handleRegenerateCaption)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className={`max-w-7xl mx-auto px-5 sm:px-8 mt-10 pt-10 pb-12 border-t text-center relative z-10 transition-colors duration-300 ${t('border-gray-800', 'border-gray-200')}`}>
        <p className="text-sm font-medium mb-4 tracking-wide text-gray-500">© 2026 Storyboard Studio Architecture.</p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setIsAboutOpen(true)} className="text-sm font-medium text-gray-500 hover:text-sky-500 transition-colors duration-200">View Ecosystem Documentation</button>
          <button onClick={() => setIsHelpOpen(true)} className="text-sm font-medium text-gray-500 hover:text-sky-500 transition-colors duration-200">Terminal Access Guideline</button>
        </div>
      </footer>

      {isAboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={() => setIsAboutOpen(false)}>
          <div className={`rounded-3xl p-6 sm:p-10 max-w-md w-full relative shadow-2xl border ${C.p3(isDarkMode)}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAboutOpen(false)} className={`absolute top-5 right-5 p-2 rounded-full transition-colors z-10 ${t('bg-gray-800 hover:bg-gray-700 text-gray-400', 'bg-gray-50 hover:bg-gray-100')}`}>
              <I name="X" size={20} />
            </button>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${t('bg-sky-900/30 text-sky-400', 'bg-sky-50')}`}>
              <I name="Sparkles" size={28} />
            </div>
            <h2 className={`text-2xl font-black mb-4 ${U.c14}`}>System Engineering Data</h2>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              An advanced AI-integrated pipeline environment specifically formulated to process and control structured conceptual video assets natively.
            </p>
          </div>
        </div>
      )}

      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-black/60 backdrop-blur-sm" onClick={() => setIsHelpOpen(false)}>
          <div className={`rounded-3xl p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl border custom-scrollbar ${C.p3(isDarkMode)}`} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsHelpOpen(false)} className={`absolute top-5 right-5 p-2 rounded-full transition-colors z-10 ${t('bg-gray-800 text-gray-400', 'bg-gray-50')}`}>
              <I name="X" size={20} />
            </button>
            <div className={`flex items-center gap-4 mb-8 border-b pb-5 ${U.c15}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-sky-900/30 text-sky-400">
                <I name="HelpCircle" size={24} />
              </div>
              <h2 className={`text-2xl font-black tracking-wide ${U.c14}`}>System Core Operating Manual</h2>
            </div>

            <div className={`space-y-6 text-sm leading-relaxed ${U.c16}`}>
              <div>
                <h3 className={U.c10}>
                  <I name="Zap" size={16} /> Automated Engine Directives
                </h3>
                <p>
                  Storyboard Studio processes prompt instructions securely behind the interface. Text and structural properties are seamlessly generated based on configured rulesets.
                </p>
              </div>

              <div>
                <h3 className={U.c10}>
                  <I name="ShieldCheck" size={16} /> Continuity (CREF) Lock
                </h3>
                <p>
                  Inject image elements securely into the system mapping parameter to lock continuous structure and character logic properties efficiently.
                </p>
              </div>

              <div>
                <h3 className={U.c10}>
                  <I name="Wand2" size={16} /> Modifying Component Architecture
                </h3>
                <p>
                  Access the <strong>MAGIC BOX TUNER 🪄</strong> configuration mechanism to apply partial visual adjustment logic natively without affecting fundamental composition references.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-800 flex justify-end">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="py-2.5 px-6 rounded-xl bg-sky-500 text-white font-bold text-xs"
              >
                Acknowledge Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-start justify-center overflow-auto animate-fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="fixed top-5 right-5 z-[80] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20"
          >
            <I name="X" size={20} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen preview"
            className="max-w-[95vw] w-auto my-6 rounded-xl shadow-2xl"
            style={{ maxHeight: 'none' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-fade-in-down">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-400/50 text-white">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <I name="CheckCircle" size={22} />
            </div>
            <div>
              <p className="font-black text-sm tracking-wide">Generation Complete!</p>
              <p className="text-[11px] opacity-90 mt-0.5">Storyboard & visuals berjaya dihasilkan.</p>
            </div>
            <button onClick={() => setShowSuccessPopup(false)} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
              <I name="X" size={14} />
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
${isDarkMode ? `
input[type="text"], textarea, select {
  background-color: #0a0c10 !important;
  color: #ffffff !important;
  border-color: #374151 !important;
}
input[type="text"]::placeholder, textarea::placeholder {
  color: #6b7280 !important;
}
select option {
  background-color: #0a0c10 !important;
  color: #ffffff !important;
}
` : ''}
@keyframes fadeInUp {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
animation: fadeInUp 0.5s ease-out forwards;
}
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}
.animate-fade-in {
animation: fadeIn 0.3s ease-out forwards;
}
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f472b6; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #f472b6; }
` }} />
    </div>
  );
}
