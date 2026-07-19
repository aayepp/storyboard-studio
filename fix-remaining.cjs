const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'App.jsx');
let c = fs.readFileSync(filePath, 'utf8');

// Fix canvas text labels (these are drawn on canvas, not HTML - use ASCII symbols)
c = c.replace("ctx.fillText('? SCENE A', 16, 26)", "ctx.fillText('▶ SCENE A', 16, 26)");
c = c.replace("ctx.fillText('? SCENE B', 16, halfH + gap / 2 + 26)", "ctx.fillText('▶ SCENE B', 16, halfH + gap / 2 + 26)");

// Fix Smart Keyframe loading text
c = c.replace("setLoadingText('?? Smart Keyframe: Generating 1 keyframe only (rest = text prompts for Flow AI)...')", "setLoadingText('Smart Keyframe: Generating 1 keyframe only (rest = text prompts for Flow AI)...')");

// Fix STRICTLY FORBIDDEN text
c = c.replace('?? STRICTLY FORBIDDEN TO RESELL!', 'STRICTLY FORBIDDEN TO RESELL!');

// Fix Smart Keyframe label
c = c.replace(">? Smart Keyframe:</span>", "><I name=\"Zap\" size={12} className=\"text-amber-400\" /> Smart Keyframe:</span>");

// Fix keyframe mode button text
c = c.replace("{keyframeMode === 'on' ? '?? ON (1 img)' : '?? OFF'}", "{keyframeMode === 'on' ? 'ON (1 img)' : 'OFF'}");

// Fix MAGIC BOX TUNER text (two occurrences)
c = c.replace("'MAGIC BOX TUNER ??'", "'MAGIC BOX TUNER'");
c = c.replace("<strong>MAGIC BOX TUNER ??</strong>", "<strong>MAGIC BOX TUNER</strong>");

// Fix the remaining single ? in Flow AI segment header
c = c.replace(/<span style=\{\{ fontSize: '16px', lineHeight: 1 \}\}>\?<\/span>/g, '<I name="Zap" size={16} className="text-sky-400" />');

// Fix genfity key checkmark
c = c.replace('{genfityKey && <span className="text-[10px] text-green-400 font-bold">?</span>}', '{genfityKey && <span className="text-[10px] text-green-400 font-bold">OK</span>}');

// Fix DOWNLOAD COMBINED SEGMENT button
c = c.replace(/\?\? DOWNLOAD COMBINED SEGMENT/g, 'DOWNLOAD COMBINED SEGMENT');

// Fix remaining single ? characters used as arrows in segments display
c = c.replace(/.join\('  \?  '\)/g, ".join('  →  ')");

// Fix the Collapse/Show Full Prompt arrows
c = c.replace(/>(\s*)\? Show Full Prompt/g, '>$1▼ Show Full Prompt');
c = c.replace(/>(\s*)\? Collapse/g, '>$1▲ Collapse');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done - fixed all remaining ? and ?? in UI');
