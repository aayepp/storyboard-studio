const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'App.jsx');
let c = fs.readFileSync(filePath, 'utf8');

// Replace span-based emoji placeholders with SVG I component
c = c.replace(/<span style=\{\{ fontSize: '24px', lineHeight: 1 \}\}>(\?\?)<\/span>/g, '<I name="Upload" size={24} className="text-sky-400" />');
c = c.replace(/<span style=\{\{ fontSize: '16px', lineHeight: 1 \}\}>(\?\?)<\/span>/g, '<I name="X" size={16} className="text-red-400" />');
c = c.replace(/<span style=\{\{ fontSize: '16px' \}\}>(\?\?)<\/span>/g, '<I name="ShieldAlert" size={16} className="text-yellow-400" />');

// Replace text label emojis with colourful I components
c = c.replace(/>\?\? Model:</g, '><I name="Sparkles" size={12} className="text-sky-400" /> MODEL:');
c = c.replace(/\?\? Change API Key/g, 'Change API Key');
c = c.replace(/>\?\? Cara Dapatkan/g, '>Cara Dapatkan');
c = c.replace(/>\?\? API key ini/g, '>API key ini');
c = c.replace(/>\?\? Text Provider:</g, '><I name="Code" size={12} className="text-emerald-400" /> Text Provider:');
c = c.replace(/>\?\? Genfity Key:</g, '><I name="ShieldAlert" size={12} className="text-purple-400" /> Genfity Key:');
c = c.replace(/>\?\? Output:</g, '><I name="Layers" size={12} className="text-sky-400" /> Output:');
c = c.replace(/\?\? \+ \?\?\? Text \+ Images/g, 'Text + Images');
c = c.replace(/\?\? Text Only/g, 'Text Only');
c = c.replace(/>\?\?</g, '><');  // Remove remaining standalone ?? between tags
c = c.replace(/<span>\?\?<\/span>/g, '');  // Remove any remaining span??

// Fix provider panel toggle arrows
c = c.replace(/\{showProviderPanel \? '\?' : '\?'\}/g, "{showProviderPanel ? '▲' : '▼'}");

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done - emoji labels replaced with SVG icons');
