/** Storyboard Studio — Vite + React (GitHub/Vercel Ready) */
import React, { useState, useRef, useEffect } from 'react';

const SVG_ICONS = {
  Video: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Mic: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  Hash: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  Copy: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Sparkles: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.5 1.5L21 17l-1.5.5L19 19l-.5-1.5L17 17l1.5-.5L19 15z"/></svg>,
  Upload: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Box: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Shirt: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>,
  RefreshCw: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Download: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  User: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Maximize: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>,
  ShieldAlert: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Layers: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Smartphone: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  X: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  MessageCircle: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  HelpCircle: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  ChevronDown: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevronRight: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Camera: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Briefcase: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Headphones: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  Flame: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14 0-5.5 3-7 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.5-2.5 1.5-3.5z"/></svg>,
  CheckCircle: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Wand2: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2L11 5"/></svg>,
  Send: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  ShieldCheck: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  Code: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Sun: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Film: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  ZoomIn: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  Info: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  UserCheck: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
  ExternalLink: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  UserPlus: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  Eye: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Zap: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Clock: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  PenTool: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  Clapperboard: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M4 11l3-7h10l3 7"/><path d="M8 11V4"/><path d="M12 11V4"/><path d="M16 11V4"/></svg>,
  Edit2: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Save: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  ChevronLeft: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  FileText: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Volume2: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08"/></svg>,
  Image: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Trash: (s) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
};

const I = ({ name, size = 16, className = '', style = {} }) => (
  <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size + 'px', height: size + 'px', ...style }} role="img" aria-label={name}>
    {SVG_ICONS[name] ? SVG_ICONS[name](size) : <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>}
  </span>
);

const ChevronDown = ({ className = '', size = 16 }) => (
  <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size + 'px', height: size + 'px' }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </span>
);

const ASPECT_RATIOS = [
  { v: '9:16', l: '9:16 · TikTok/Reels' },
  { v: '16:9', l: '16:9 · YouTube' },
  { v: '1:1', l: '1:1 · Instagram' }
];

// Added backgrounds array to store multiple environment images
const EMPTY_UPLOAD = { products: [{ name: '', base64: null, mimeType: null }], backgrounds: [], faceFileName: '', uploadedFaceBase64: null, uploadedFaceMimeType: null, useCustomFace: true };
const TAB_UPLOAD_KEYS = ['cinematic_pro', 'microimpact', 'narrativearc', 'talkinghead', 'product', 'ootd', 'ugc', 'stopmotion', 'grafix', 'character', 'fake_influencer'];
const makeEmptyTabUploads = () => Object.fromEntries(TAB_UPLOAD_KEYS.map((k) => [k, { ...EMPTY_UPLOAD, products: [{ name: '', base64: null, mimeType: null }], backgrounds: [] }]));

const _baseCard = 'border rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden transition-colors duration-300 card-hover scroll-reveal backdrop-blur-xl';
const _baseIn = 'w-full rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-1 focus:ring-sky-300 border';
const C = {
  card: (d, mb = 'mb-8') => `${_baseCard} ${mb} ${d ? 'bg-[#11131a] border-gray-800' : 'bg-white border-gray-100'}`,
  label: 'block text-[11px] font-bold mb-2.5 uppercase tracking-wide text-gray-300',
  input: (d) => `${_baseIn} transition-all ${d ? 'bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'}`,
  select: (d) => `${_baseIn} appearance-none ${d ? 'bg-[#0a0c10] border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`,
  h2: (d) => `text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent ${d ? '' : 'text-gray-800'}`,
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
  c2: 'w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black py-4 rounded-2xl text-lg disabled:opacity-70 btn-shine btn-pulse-valid',
  c3: 'w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold',
  c4: 'block text-[11px] font-bold mb-2.5 uppercase tracking-wide flex items-center gap-1.5 text-gray-300',
  c5: 'text-sm font-bold uppercase tracking-widest text-sky-500 mb-6 flex items-center gap-2',
  c6: 'block text-[11px] font-bold mb-2.5 uppercase tracking-wide text-sky-400',
  c7: 'px-2 py-0.5 rounded text-[11px] bg-sky-900/40 text-sky-400 font-bold',
  c8: 'px-2 py-0.5 rounded text-[11px] bg-gray-700 text-gray-300 font-bold',
  c9: 'px-2 py-0.5 rounded text-[11px] bg-green-500 text-white font-bold',
  c10: 'font-bold text-base text-sky-500 mb-2 flex items-center gap-1.5',
  c11: 'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
  c12: 'flex justify-between items-center mb-1',
  c13: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  c14: 'text-gray-800 dark:text-white',
  c15: 'border-gray-100 dark:border-gray-800',
  c16: 'text-gray-600 dark:text-gray-300',
  c17: 'text-gray-400 dark:text-gray-300',
  c18: 'text-gray-500 dark:text-gray-400'
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const COMMON_FILLERS = ['weh', 'sumpah', 'gila', 'serious', 'ah', 'eh', 'kan', 'tau tak', 'best', 'lepastu', 'macam', 'yang'];

const countRepeatedFillers = (dialogues) => {
  const counts = {};
  dialogues.forEach((d) => {
    const lower = String(d).toLowerCase();
    COMMON_FILLERS.forEach((f) => {
      if (!lower.includes(f)) return;
      const matches = lower.match(new RegExp(f.replace(/\s+/g, '\\s+'), 'g')) || [];
      counts[f] = (counts[f] || 0) + matches.length;
    });
  });
  return counts;
};

const deduplicateDialogue = (scenes) => {
  if (!Array.isArray(scenes)) return scenes;
  const used = new Set();
  const result = scenes.map((s, i) => {
    let d = String(s.dialogue || '').trim();
    if (!d) return s;
    COMMON_FILLERS.forEach((f) => {
      const lower = d.toLowerCase();
      const regex = new RegExp(`\\b${f.replace(/\s+/g, '\\s+')}\\b`, 'gi');
      if (lower.split(f).length - 1 > 0 && used.has(f)) {
        d = d.replace(regex, '').replace(/\s{2,}/g, ' ').trim();
      } else if (lower.split(f).length - 1 > 0) {
        used.add(f);
      }
    });
    if (!d) d = s.dialogue;
    return { ...s, dialogue: d };
  });
  return result;
};

// Verify dialogue flows smoothly across scenes — detect repetition, dangling questions, filler overuse.
// Returns { ok, issues } so callers can trigger AI repair when the story is broken.
const verifyDialogueContinuity = (scenes) => {
  if (!Array.isArray(scenes) || scenes.length < 2) return { ok: true, issues: [] };
  const issues = [];
  const dialogues = scenes.map((s) => String(s.dialogue || '').trim()).filter(Boolean);

  // Check 1: Exact duplicate dialogue lines (case-insensitive, punctuation-stripped)
  const seen = new Set();
  dialogues.forEach((d) => {
    const normalized = d.toLowerCase().replace(/[^\w\s]/g, '').trim();
    if (normalized.length < 8) return;
    if (seen.has(normalized)) {
      issues.push(`Dialog berulang (sama exact): "${d.slice(0, 50)}..."`);
    }
    seen.add(normalized);
  });

  // Check 2: Consecutive scenes opening with the same word
  for (let i = 1; i < dialogues.length; i++) {
    const prevOpen = (dialogues[i - 1].split(/\s+/)[0] || '').toLowerCase();
    const currOpen = (dialogues[i].split(/\s+/)[0] || '').toLowerCase();
    if (prevOpen && currOpen && prevOpen === currOpen && prevOpen.length > 2) {
      issues.push(`Scene berturut-turut buka dengan perkataan sama: "${prevOpen}"`);
    }
  }

  // Check 3: Dangling question — scene ends with "?" but next scene doesn't answer
  for (let i = 0; i < dialogues.length - 1; i++) {
    const endsWithQuestion = /[??]\s*$/.test(dialogues[i]);
    if (!endsWithQuestion) continue;
    const nextOpen = (dialogues[i + 1].split(/\s+/)[0] || '').toLowerCase();
    const answersQuestion = /^(ya|betul|sebab|kerana|memang|sebenarnya|actually|yes|no|tak|memanglah|ar|haa|haaa|oh)\b/.test(nextOpen);
    if (!answersQuestion) {
      issues.push(`Scene ${i + 1} tamat dengan soalan tapi Scene ${i + 2} tak jawab — dialog tergantung`);
    }
  }

  // Check 4: Filler overused across multiple scenes (>2 occurrences)
  const fillerCounts = {};
  dialogues.forEach((d) => {
    const lower = d.toLowerCase();
    COMMON_FILLERS.forEach((f) => {
      if (lower.includes(f)) fillerCounts[f] = (fillerCounts[f] || 0) + 1;
    });
  });
  Object.entries(fillerCounts).forEach(([f, c]) => {
    if (c > 2) issues.push(`Filler "${f}" berulang ${c} kali across scenes — buang`);
  });

  // Check 5: Dead-end closing (last scene ends with "ok tu je" / "so yeah")
  const lastLine = dialogues[dialogues.length - 1] || '';
  if (/(ok tu je|so yeah|tu je|itu je|gitu je)\s*$/i.test(lastLine)) {
    issues.push(`Scene terakhir tamat dengan dead-end ("ok tu je") — perlu CTA/payoff`);
  }

  // Check 6: Semantic continuity — scene N+1 dialogue must reference scene N
  for (let i = 0; i < dialogues.length - 1; i++) {
    const current = dialogues[i].toLowerCase();
    const next = dialogues[i + 1].toLowerCase();
    // Extract meaningful content words (≥4 chars, not pronouns/stopwords) from both scenes
    const stopwords = new Set(['aku','kau','dia','kita','korang','ni','tu','ini','itu','dan','atau','tapi','sebab','macam','yang','dah','sudah','belum','akan','sedang','telah','pernah','boleh','mahu','nak','hendak','saja','juga','semua','sikit','sangat','banyak','kalau','juga','lagi','bila','mana','sini','sana','tolong','cuba','mesti','hendak','hendaklah','adalah','ialah','iaitu','yakni','bahawa','kerana','supaya','untuk','dengan','secara','antara','dalam','seperti','tanpa','serta','setelah','selama','sejak']);
    const meaningfulWords = (text) => [...new Set(text.split(/\W+/).filter(w => w.length >= 4 && !stopwords.has(w)))];
    const currentWords = meaningfulWords(current);
    const nextWords = meaningfulWords(next);
    const shared = currentWords.filter(w => nextWords.includes(w));
    // If scene N has at least 2 meaningful nouns and scene N+1 shares NONE, flag it
    if (currentWords.length >= 2 && nextWords.length >= 1 && shared.length === 0) {
      issues.push(`Scene ${i + 1} dan ${i + 2} tiada continuity semantic — topik berubah secara mendadak`);
    }
  }

  return { ok: issues.length === 0, issues };
};

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


const VISUAL_RULES = `
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
`;

const RETENTION_RULES = `
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
`;

const REFERENCE_CONSISTENCY_RULES = `
REFERENCE IMAGE CONSISTENCY (MANDATORY):
If reference image exists, maintain across ALL scenes:
- character design, wardrobe, and color palette
- mood, lighting direction, and art direction
- lens feeling, composition, and texture
- environment and visual era
- overall appearance and brand identity
Do NOT change unless explicitly requested.
Never redesign, recolor, or replace with generic version of the uploaded reference.
`;

const CAMERA_OPTIONS = [
  'Extreme Close Up', 'Close Up', 'Medium Shot', 'Medium Wide Shot', 'Wide Shot',
  'Drone Shot', 'POV', 'Over Shoulder', 'Tracking Shot', 'Dolly In', 'Dolly Out',
  'Push In', 'Pull Back', 'Handheld', 'Static', 'Low Angle', 'High Angle',
  'Top Down', 'Macro Shot', 'Whip Pan', 'Orbit Shot', 'Rack Focus',
  'Crane Shot', 'Dutch Angle', 'Locked-Off Shot'
];


const getRandomHookAngle = () => getRandomElement(HOOK_ANGLES);

const DIALOGUE_AUTHENTICITY_RULES = `
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

WITHIN-SCENE REPETITION RULES (CRITICAL):
- NEVER repeat the same sentence or phrase within a single scene's dialogue.
- NEVER write: "Sumpah best gila. Sumpah best gila." — same sentence twice is FORBIDDEN.
- NEVER write partial repeats: "Eh korang. Eh korang tau tak." — starting two sentences with same fragment is FORBIDDEN.
- Each sentence within a scene dialogue MUST be unique and add new information.
- Read each scene's dialogue out loud mentally — if any two sentences sound like echoes of each other, REWRITE.
- NEVER repeat the same word twice consecutively (e.g. "best best", "gila gila", "baru baru") — use a different word.

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
`;

const DEFAULT_NEGATIVE = 'no text overlay, no watermark, no logo text, no extra fingers, no deformed hands, no plastic skin, no blurry face, no cropped head, plain pure white background, empty white void, featureless white studio cyclorama, blank white backdrop, solid white wall only, no screen facing camera while person is actively playing, no impossible device orientation, no mirrored or flipped screen, no floating hands, no disconnected arms, no warped face, no extra thumbs, no uncanny expression, no melted fingers, no double pupils, no upside-down console, no rotated device in hands, no swapped left-right buttons, no mirrored logo, no scrambled button layout, no controls in wrong position, no reversed branding, no device held the wrong way, no hybrid front-and-back view, no screen visible from behind, no thumbsticks on the rear panel, no impossible mix of angles, no invented room, no new window, no new doorway, no extra furniture not in reference, no changed wall colour, no different lighting direction';

const SCENE_ENVIRONMENT_RULES = `
ENV RULES: Every scene MUST take place in the EXACT SAME core location/set. If the action changes, just change the CAMERA ANGLE of the same room/environment. Do not invent new locations. FORBIDDEN plain white/empty studio. image_prompt must name the location, lighting, props. Keep character, product, and background architecture locked across all scenes.`;

const SCENE_JSON_CONTRACT = `Each scene MUST include: scene_num, timecode, visual (EN — must describe LOCATION + lighting + background props), camera, action, emotion, dialogue (BM or ""), image_prompt (EN still — must include full environment, NOT white background), i2v_prompt (EN motion), negative (must ban plain white background), angle_used (ONLY if product reference sheet is provided — write the exact panel label e.g. "FRONT", "BACK", "IN_HAND", "LEFT_SIDE" that you are copying the product from for this scene; omit if no product sheet), b_roll (optional: 1 short B-roll shot suggestion for editor e.g. "close-up hands unboxing", "macro product texture", "reaction shot face"), sound_note (optional: audio cue for editor e.g. "bass drop", "whoosh", "silence", "snap cut"). [SCREEN ORIENTATION RULE — CRITICAL]: If a character holds/uses a device with a screen (phone, tablet, handheld console, laptop), the screen MUST face TOWARD the character — the BACK of the device faces the camera/viewer. NEVER show the screen facing the camera while the person is looking at the camera or talking — that is physically impossible and looks uncanny. A person cannot watch their own screen AND face the camera at the same time. Choose ONE: either (a) she looks DOWN at the screen while playing (screen tilted toward her face, back visible to camera), OR (b) she looks at the camera and talks with the device held at chest level, screen facing her, back toward camera. Screen may face the camera ONLY in a dedicated product-showcase shot where NO one is looking at the camera. [DIALOGUE EYE-CONTACT RULE — IMPORTANT]: When a scene has spoken dialogue (the character is talking to the audience/viewer), the character SHOULD make direct eye contact with the camera — this is how creators address viewers and it feels natural and engaging. In the visual, action, and image_prompt for any scene that has non-empty dialogue, explicitly state that the character looks directly at the camera / makes eye contact with the viewer while speaking (unless the scene is deliberately a B-roll cutaway with a voiceover, in which case no face is needed). Avoid the uncanny look of a person speaking while staring off to the side for no reason. Silent/visual-only scenes (empty dialogue) do NOT need camera eye contact — they can look at the product, environment, or action naturally.`;

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

// Converts any i2v_prompt into an explicit time-coded motion instruction for Omni Flash / Flow AI.
// Uses the scene's own timecode + camera + action so it works regardless of what format the AI returned.
const toTimeCodedI2V = (scene) => {
  const raw = String(scene.i2v_prompt || scene.action || scene.visual || '').trim();
  // If it already looks time-coded (has a pattern like "0s" or "0s–1s:"), leave it as-is.
  if (/\b\d+(\.\d+)?s\s*[–\-:]/i.test(raw)) return raw;

  // Parse the scene duration from timecode like "2.5s–5s" or "0s–3.3s".
  const tc = String(scene.timecode || '').replace(/\s/g, '');
  const nums = tc.match(/(\d+(?:\.\d+)?)/g) || [];
  const start = nums.length >= 1 ? parseFloat(nums[0]) : 0;
  const end = nums.length >= 2 ? parseFloat(nums[1]) : start + 2.5;
  const dur = Math.max(0.5, end - start);

  // Split the clip into setup / key-move / hold beats.
  const t1 = +(start + dur * 0.3).toFixed(1);
  const t2 = +(start + dur * 0.7).toFixed(1);
  const camera = String(scene.camera || 'static shot').trim();
  const action = String(scene.action || raw || 'subject holds pose').trim().replace(/\.$/, '');

  return `${start}s–${t1}s: establish (${camera}), subject in starting pose. `
    + `${t1}s–${t2}s: ${action} — camera ${camera.toLowerCase()}. `
    + `${t2}s–${end}s: hold final pose, ready to lead into next scene. `
    + `ONE continuous motion, no cuts. Keep face, wardrobe, product, lighting, and background locked.`;
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
    assetAnalysis ? `PRODUCT TRUTH RULE (CRITICAL): The reference analysis above describes the ACTUAL product. It overrides any preset category label. Every scene, action, benefit, and line of dialogue must be about THAT product type — if the analysis describes a gadget, write gadget dialogue (specs, performance, usage); if it describes skincare, write skincare dialogue. Never write a script for a different product category than the one in the reference analysis.` : '',
    extra || '',
    `RULES: Same face, age, body type, skin tone, wardrobe colors, product packaging across scenes. Do not redesign the character or product.`,
    `PRODUCT SIZE & PROPORTIONS LOCK (CRITICAL): The product MUST appear in REAL-WORLD ACCURATE SIZE and proportions in every scene. Do NOT make the product look larger, smaller, wider, or narrower than it actually is. If the product is palm-sized, show it palm-sized. If it's a large box, frame the shot to include its full real-world scale. NEVER stretch, warp, resize, or distort the product to fit the frame. Use correct scale relationships between the product and human hands/body/face. Reference the uploaded images for exact size ratio. If no reference is uploaded, use widely known real-world proportions for that product type.`,
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
  if (sec <= 10) return 4;
  if (sec <= 15) return 5;
  if (sec <= 20) return 6;
  if (sec <= 30) return 8;
  if (sec <= 45) return 12;
  return 16;
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

const getOotdStoryboardPrompt = (product, duration, style, location, gender, hijabMode, mirrorMode, narration, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 10;
  const sceneCount = sec <= 10 ? 4 : sec <= 20 ? 6 : sec <= 30 ? 8 : 10;
  const perScene = (sec / sceneCount).toFixed(1);
  const hasVO = narration === 'With Voice-Over';
  const modelDesc = `young Asian ${gender}${(gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab' ? ' wearing a stylish matching hijab coordinated with the outfit' : ''}`;
  const isMirror = mirrorMode === 'true' || mirrorMode === true;

  const stylingTips = /kasut|shoes|sneaker|boot/.test((product||'').toLowerCase())
    ? 'Styling tip dialogue: mention how the shoes complete the outfit, comfort level, and what to pair with.'
    : /bag|beg|handbag/.test((product||'').toLowerCase())
    ? 'Styling tip dialogue: mention versatility, what outfits it matches, day-to-night transition.'
    : /tudung|hijab|shawl/.test((product||'').toLowerCase())
    ? 'Styling tip dialogue: mention how to style it, fabric feel, colour coordination.'
    : 'Styling tip dialogue: mention fit, material quality, how it makes the wearer feel confident.';

  return `You are a professional fashion content director and stylist. Generate a ${sec}s OOTD storyboard for: "${product || 'this outfit'}" (Style: ${style}).
${assetAnalysis ? `OUTFIT ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
Model: ${modelDesc}
Location: ${location || 'Aesthetic lifestyle interior'}
${isMirror ? 'MIRROR MODE: Include a mirror selfie scene.' : ''}
References: ${refCount > 0 ? 'YES — match outfit exactly' : 'NO'}

SCENE STRUCTURE (${sceneCount} scenes × ${perScene}s):
- Scene 1: HOOK — full body reveal, stop-scroll energy, confident pose
- Scene 2: TOP DETAIL — close-up upper body, fabric texture, fit
- Scene 3: BOTTOM DETAIL — close-up lower body, shoes/bag if any
- Scene 4: MOVEMENT — walking, twirling, natural movement shot
${sceneCount >= 6 ? `- Scene 5: STYLING TIP — character speaks to camera, shares styling advice
- Scene 6: CTA — "link dekat bio" or "tap product card"` : ''}
${sceneCount >= 8 ? `- Scene 7: ACCESSORIES CLOSE-UP — jewellery, bag, shoes detail
- Scene 8: FINAL HERO — best angle full body beauty shot` : ''}

CAMERA MOVEMENT (vary per scene):
- Full body static / Slow tilt up / Close dolly / Tracking walk shot / Mirror POV

${stylingTips}

RULES:
- Dialogue in natural conversational Malay (max 15 words per scene). ${!hasVO ? 'VO mode OFF — visual only, dialogue = "".' : ''}
- Every scene SAME outfit, SAME model, SAME location — no changes between scenes.
- image_prompt must include: outfit description, location, lighting, camera angle. NO plain white background.
- i2v_prompt time-coded: "0s–Xs: [motion]. Xs–Ys: [motion]. Outfit and model locked."
${SCENE_JSON_CONTRACT}

Return ONLY valid JSON:
{
"title": "👗 OOTD: ${product || style}",
"duration": "${sec}s",
"scenes": [...]
}`;
};

const getProductPOVPrompt = (product, duration, category, background, gender, hijabMode, narration, mode, refCount, identityBible = '', assetAnalysis = '') => {
  const sec = parseInt(duration) || 10;
  const sceneCount = sec <= 10 ? 3 : sec <= 20 ? 5 : sec <= 30 ? 7 : 9;
  const perScene = (sec / sceneCount).toFixed(1);
  const cat = (category || '').toLowerCase();
  const hasModel = mode === 'With Model';
  const hasVO = narration === 'With Voice-Over';

  // Hero shot formula per category
  const heroFormula = /gadget|tech|electronic|phone|console|laptop|speaker/.test(cat)
    ? 'Shot sequence: (1) Reveal from box/bag, (2) Detail close-up of key feature/screen, (3) In-hand real-scale shot, (4) Feature demo (power on/screen lit/button press), (5) Reaction shot if model present.'
    : /skincare|beauty|serum|cream|mask|toner/.test(cat)
    ? 'Shot sequence: (1) Packaging reveal, (2) Texture swatch on hand/arm, (3) Application motion on skin, (4) Absorption/blend result, (5) Before-after glow reaction.'
    : /fashion|baju|kasut|bag|tudung|clothing/.test(cat)
    ? 'Shot sequence: (1) Flat lay product reveal, (2) Material/texture close-up, (3) On-body or held shot, (4) Detail (stitching/logo/tag), (5) Full look or styled shot.'
    : /food|drink|snack|supplement|vitamin/.test(cat)
    ? 'Shot sequence: (1) Packaging reveal, (2) Prep/pour/unwrap, (3) Close-up texture/color, (4) First taste/sip reaction, (5) Finished presentation.'
    : 'Shot sequence: (1) Packaging reveal, (2) Product detail close-up, (3) In-use demonstration, (4) Key benefit highlight, (5) Final hero shot.';

  const modelDesc = hasModel
    ? `A young Asian ${gender}${(gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab' ? ' wearing a stylish modern hijab' : ''} content creator`
    : 'Product only (no model)';

  const dialogueRule = hasVO
    ? 'Each scene with dialogue: write 1 natural conversational Malay line (max 15 words). Hook scene MUST stop the scroll.'
    : 'No spoken dialogue. Visual storytelling only. Dialogue field = "".';

  return `You are a professional product videographer and creative director. Generate a ${sec}s product showcase storyboard for: "${product}" (Category: ${category}).
${assetAnalysis ? `PRODUCT ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
Model: ${modelDesc}
Background: ${background || 'Auto by AI — aesthetic lifestyle interior'}
References loaded: ${refCount > 0 ? 'YES — match product exactly' : 'NO'}

HERO SHOT FORMULA FOR THIS CATEGORY:
${heroFormula}

CAMERA MOVEMENT (vary per scene):
- Dolly in slow / Pull back reveal / Orbit 360 / Macro push-in / Static beauty shot / Handheld natural

LIGHTING:
- Soft diffused window light for organic feel
- Hard dramatic side light for premium/luxury feel
- Match lighting to brand tone (premium = dramatic, everyday = soft)

RULES:
- Exactly ${sceneCount} scenes, ${perScene}s each. Continuous timecodes, no gaps.
- ${dialogueRule}
- Every image_prompt MUST include: product name, exact background, lighting, camera angle. NO plain white background.
- i2v_prompt must be time-coded: "0s–Xs: [motion]. Xs–Ys: [motion]. Keep product, lighting, background locked."
- Scene 1 = HOOK (stop-scroll energy). Last scene = CTA or hero beauty shot.
${identityBible ? SCENE_JSON_CONTRACT : SCENE_JSON_CONTRACT}

Return ONLY valid JSON:
{
"title": "🎬 Product POV: ${product}",
"duration": "${sec}s",
"scenes": [...]
}`;
};

const getCategoryContext = (category, product = '', price = '') => {
  const cat = (category || '').toLowerCase();
  if (/skincare|serum|toner|moistur|sunscreen|beauty|makeup|foundation|mask|essence/.test(cat)) return {
    demo: 'DEMO SEQUENCE: Scene 2 = unbox/reveal packaging; Scene 3 = texture close-up (swatch on hand/arm, show consistency); Scene 4 = application on face/skin (patting motion, absorption); Scene 5 = result reaction (glow, smoothness, before/after feel);',
    hook: `Curiosity gap about skin result — e.g. "Korang tau tak kenapa kulit aku jadi macam ni lepas pakai ${product || 'benda ni'}?" — relatable skin problem or shocking before/after claim.`,
    cta: `Shopee/TikTok Shop link for ${product || 'this product'}. ${price ? `Price anchor: RM${price} — sebut harga dalam CTA.` : 'Mention limited promo or free gift.'} Urgency: stok tinggal sikit / promo hari ni je.`,
    negative: 'no dirty skin, no clogged pores, no cakey makeup look'
  };
  if (/food|makanan|snack|minum|drink|beverage|supplement|vitamin|protein|kopi|tea|teh|jus|juice|roti|kek|cake/.test(cat)) return {
    demo: 'DEMO SEQUENCE: Scene 2 = unbox/reveal product packaging; Scene 3 = preparation or plating (pouring, mixing, unwrapping); Scene 4 = first bite/sip reaction (genuine taste reaction, eyes widen); Scene 5 = flavour verdict + texture description;',
    hook: `Unexpected taste reaction — e.g. "Serious tak tipu, ${product || 'benda ni'} ni lain dari yang lain weh!" — viral food angle or "kau dah try ke?" hook.`,
    cta: `Order link for ${product || 'this product'}. Mention best flavour or bundle promo.`,
    negative: 'no unappetizing food, no messy spill, no bad lighting on food'
  };
  if (/tech|gadget|electronic|phone|earphone|earbuds|laptop|charger|cable|speaker|console|gaming|tablet|watch|smartwatch/.test(cat)) return {
    demo: 'DEMO SEQUENCE: Scene 2 = unbox (reveal device from box, first look); Scene 3 = physical detail (build quality, ports, buttons, screen clarity); Scene 4 = key feature demo (speed test, audio, battery, game test); Scene 5 = real-use reaction (impressed face, compare to old device);',
    hook: `Bold tech claim — e.g. "${product || 'Benda ni'} battery dia 7 hari?!" — unboxing surprise or speed/performance shock.`,
    cta: `Shopee/Lazada link for ${product || 'this product'}. Mention official store or warranty.`,
    negative: 'no cracked screen, no laggy UI, no low resolution display'
  };
  if (/fashion|baju|kasut|shoes|sneaker|boot|bag|beg|tudung|hijab|shawl|cloth|dress|seluar|skirt|blouse|shirt|jacket/.test(cat)) return {
    demo: 'DEMO SEQUENCE: Scene 2 = unbox/reveal item (packaging, first look at colour/material); Scene 3 = material close-up (texture, stitching, quality feel); Scene 4 = try-on or styling (put on, show fit, movement); Scene 5 = outfit reaction (mirror check, confidence boost, complete look);',
    hook: `Styling surprise — e.g. "Tak sangka ${product || 'benda ni'} boleh buat aku nampak macam ni!" — price vs quality shock.`,
    cta: `Shopee/TikTok Shop for ${product || 'this product'}. Mention size guide or colour options.`,
    negative: 'no warped fabric, no bad fit, no unflattering angle'
  };
  if (/home|rumah|kitchen|dapur|clean|basuh|organiz|storage|pillow|bedding|sofa|furnitur|decoration|hiasan|lampu|light/.test(cat)) return {
    demo: 'DEMO SEQUENCE: Scene 2 = unbox/reveal product; Scene 3 = before-state problem (messy shelf, dull space, dirty surface); Scene 4 = product in use (organising, cleaning, decorating); Scene 5 = after-result (neat, clean, transformed space);',
    hook: `Relatable home problem — e.g. "${product || 'Benda ni'} je yang aku perlukan rupanya!" — satisfying before/after or budget-friendly angle.`,
    cta: `Shopee link for ${product || 'this product'}. Mention bundle or set deal.`,
    negative: 'no messy background after, no cluttered result'
  };
  // Default fallback
  return {
    demo: 'DEMO SEQUENCE: Scene 2 = reveal/unbox; Scene 3 = detail close-up (quality, texture, feature); Scene 4 = product in use (demonstrate key benefit); Scene 5 = reaction/result;',
    hook: `Relatable problem ${product ? `"${product} ni selesaikan masalah aku yang dah lama"` : 'the product solves'} — or surprising benefit claim.`,
    cta: `Shopee/TikTok Shop link for ${product || 'this product'}. Mention promo or limited stock.`,
    negative: ''
  };
};

const getUgcStoryboardPrompt = (product, duration, category, environment, gender, hijabMode, angle, refCount, identityBible = '', assetAnalysis = '', price = '') => {
  const sec = parseInt(duration) || 10;
  // Ladder mirrors the proven Cinematic Pro one: keeps every scene ~2.5-4s, which is
  // the Omni Flash / i2v sweet spot. The old ladder (3/4/6) capped at 6 scenes, so a
  // 45s video became 7.5s per scene (motion drift) and could never fit the 7-part
  // demo structure below.
  const sceneCount = sec <= 10 ? 4 : sec <= 15 ? 5 : sec <= 20 ? 6 : sec <= 30 ? 8 : sec <= 45 ? 12 : 15;
  const perScene = (sec / sceneCount).toFixed(1);
  const modelRef = `${gender === 'Wanita' || gender === 'Female' ? 'young Asian female' : 'young Asian male'} influencer${(gender === 'Wanita' || gender === 'Female') && hijabMode === 'Hijab' ? ' wearing an aesthetic modern hijab' : ''}`;

  const catCtx = getCategoryContext(category, product, price);
  return `You are a high-converting affiliate UGC (User Generated Content) video director. Create a detailed ${sec}s storyboard for a video about "${product}" (Category: ${category}).
Style / Angle: ${angle}
Environment: ${environment}
Influencer Profile: ${modelRef}
${refCount > 0 ? 'Note: Reference assets are loaded for physical consistency.' : ''}
${assetAnalysis ? `PRODUCT/ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

[CATEGORY-SPECIFIC GUIDE — ${category.toUpperCase()}]
HOOK ANGLE: ${catCtx.hook}
${catCtx.demo}
CTA STYLE: ${catCtx.cta}
${catCtx.negative ? `EXTRA NEGATIVES: ${catCtx.negative}` : ''}

RULES:
- Exactly ${sceneCount} scenes, ${perScene}s each. Timecodes must be continuous with no gaps.
- Dialogue / Script / Voice Over MUST be written in conversational, casual, trendy, relatable BAHASA MELAYU (Malay). Keep visual/camera/image fields in English.
- Scene 1: HOOK — stop scrolling immediately. MANDATORY HOOK ANGLE: ${getRandomHookAngle()}
- Middle scenes — DEMO SEQUENCE. You have ${sceneCount} scenes total, so allocate as follows:
UNBOXING DETAIL RULES (when product is physical):
  * REVEAL: Show seal/tape being broken, box opening sound implied, product lifted out slowly
  * TEXTURE: Macro close-up — fabric weave/cream consistency/device finish. Describe exact texture feel in dialogue ("lembut gila", "solid habis", "ringan je")
  * AUTHENTIC MOMENT: Real reaction — first sniff, first touch, genuine surprise. NOT scripted "wow amazing!"
  * PACKAGING DETAIL: Logo placement, color accuracy, premium vs budget feel — mention in visual description
${sceneCount <= 4
  ? `  Scene 1 = HOOK. Scene 2 = REVEAL + TEXTURE combined (product held up, then close on material/quality). Scene 3 = USE + RESULT combined (product used, then the "after" reaction). Scene ${sceneCount} = CTA.
  With only ${sceneCount} scenes there is no room for a separate social-proof scene — fold the proof into the RESULT dialogue instead (e.g. "serious lepas seminggu...").`
  : sceneCount <= 6
  ? `  Scene 1 = HOOK. Scene 2 = UNBOX/REVEAL. Scene 3 = TEXTURE/DETAIL close-up. Scene 4 = APPLICATION/USE. Scene ${sceneCount - 1} = RESULT/TRANSFORMATION (fold social proof into this dialogue). Scene ${sceneCount} = CTA.`
  : `  Scene 1 = HOOK. Scene 2 = UNBOX/REVEAL. Scene 3 = TEXTURE/DETAIL close-up. Scene 4 = APPLICATION/USE. Scene 5 = RESULT/TRANSFORMATION. Scene 6 = SOCIAL PROOF (phone screen with rating, creator reaction, or "days later" shot — authentic, not an ad read). Remaining middle scenes = extra angles of use/result that add NEW information. Scene ${sceneCount} = CTA.`}
  Follow this progression in order — do not output random product angles.
- Final scene: CTA — pick the most contextually appropriate variant:
  SHOPEE CTA: "Klik beg kuning bawah ni — free shipping harini je" / "Link ada dekat bio, grab sebelum stok habis"
  TIKTOK SHOP CTA: "Tap the link below / Check the product card" / "Dah ada dekat TikTok Shop — swipe up!"
  URGENCY CTA: "Stock tinggal sikit — aku tengok sendiri dah low" / "Promo habis malam ni je"
  SOCIAL PROOF CTA: "5000+ dah order — join sekali la" / "Rating 4.9 — korang pun boleh try"
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
  const sceneCount = sec <= 10 ? 4 : sec <= 15 ? 5 : sec <= 20 ? 6 : sec <= 30 ? 8 : sec <= 45 ? 12 : 16;
  const perScene = (sec / sceneCount).toFixed(1);

  // Natural 3-Act structure per duration: HOOK → CONTENT → CTA
  const getActMap = (n) => {
    if (n <= 3) {
      return [
        `ACT 1 — HOOK (Scene ${1}): Pattern interrupt — grab attention in 1 second. Open with a provocative question, bold claim, shocking stat, or mid-action story drop in BM. No "Hai korang..." intro. Dialogue must feel like a real person interrupting their friend's scroll.`,
        `ACT 2 — CONTENT / SOLUTION (Scene ${2}): Deliver the value, show the transformation, explain the problem and solution naturally. Emotional build. Dialogue must feel like someone sharing a genuine experience, not reading a script.`,
        `ACT 3 — CTA / PAYOFF (Scene ${3}): Strong closing. Emotional payoff, satisfaction, or clear call-to-action. Leave the viewer feeling something. No dead ending like "ok tu je".`
      ];
    } else if (n <= 4) {
      return [
        `ACT 1 — HOOK (Scene 1): Instant pattern interrupt. Start with curiosity gap, question, or relatable confession. MUST feel like a real TikTok/Reels hook — imperfect, energetic, natural BM.`,
        `ACT 1 — SETUP (Scene 2): Establish context. Who, what, why now. Make viewer care. Transition naturally from the hook.`,
        `ACT 2 — SOLUTION / DEMO (Scene 3): Show the transformation, the product, the answer. Demonstrate with real energy. Dialogues must include natural BM fillers: "eh", "kan", "tau tak", "sumpah".`,
        `ACT 3 — CTA (Scene 4): Strong close with emotional payoff. Point to action (beg kuning, swipe up, etc.). Make viewer feel FOMO or satisfaction.`
      ];
    } else {
      return [
        `ACT 1 — HOOK (Scene 1): Pattern interrupt. Bold question, controversial take, or shocking stat. Must stop the scroll in under 1.5s. Natural BM hook — think kawan sembang, bukan script.`,
        `ACT 1 — SETUP (Scene 2): Establish the world, character, stakes. Why should the viewer care? Build curiosity naturally.`,
        `ACT 2 — CONFLICT / PROBLEM (Scene 3): Introduce the tension, pain point, or challenge. Make it relatable. "Korang pernah rasa..." style.`,
        `ACT 2 — BUILD / SOLUTION (Scene 4): Start revealing the solution or demonstration. Energy builds. Show transformation beginning.`,
        `ACT 2 — DEEPER SOLUTION (Scene 5): Full demonstration, proof, or emotional breakthrough. Most valuable content here. Dialogue should feel like an excited friend sharing something amazing.`,
        `ACT 3 — CTA / PAYOFF (Scene 6): Strong emotional close. Satisfaction, transformation complete, clear action step. Leave viewer with a feeling or urge to act.`
      ];
    }
  };

  const actMap = getActMap(sceneCount);

  return `You are a VIRAL MALAYSIA TIKTOK/REELS STORYBOARD DIRECTOR who speaks like a real human, not AI. Create a ${sec}s ${aspect} storyboard about: ${topic}${style !== 'auto' ? ` in ${style} style` : ''}${audience ? `. Target: ${audience}` : ''}.

PLATFORM CONTEXT — ${platform} (${aspect}):
${platform === 'TikTok' ? 'TikTok MY: Hook MUST land in <1.5s. Pattern interrupt first frame. Fast cuts, trending audio cue, BM slang feels authentic. Algo rewards watch-time — front-load value.' : platform === 'Reels' ? 'Instagram Reels: Hook 1.5-2s. Aesthetic visual hooks work. Slightly slower pacing okay. Captions important.' : platform === 'YouTube' ? 'YouTube Shorts: Hook 2s. Can have more context. Title card friendly. Slightly educational tone okay.' : platform === 'Shopee' ? 'Shopee Live/Video: Product-forward. Price anchor early. Trust-building tone. CTA strong.' : 'TikTok/Reels: Hook MUST land in <1.5s. Mobile-native vertical. Pattern interrupt first frame.'}
HOOK TYPE for this topic: ${/produk|product|review|unbox|beli/.test((topic||'').toLowerCase()) ? 'Product curiosity hook — lead with surprising result or price reveal' : /tips|cara|how|tutorial/.test((topic||'').toLowerCase()) ? 'Value hook — "Kau tak tau benda ni..."' : /cerita|story|pengalaman/.test((topic||'').toLowerCase()) ? 'Story hook — drop into middle of action' : 'Pattern interrupt — bold claim or question that demands answer'}

PACING: Mark each scene with pace tag — FAST (cut <2s), MEDIUM (2-4s), SLOW (4s+). Hook=FAST, reveal=SLOW.

CRITICAL RULES — Your life depends on following these:
1. Exactly ${sceneCount} scenes, ~${perScene}s each. Continuous story with no gaps.
2. ${sec <= 15 ? 'This is a SHORT video — every second counts. No filler scenes.' : 'Build a proper narrative arc with rising tension.'}
3. DIALOGUE MUST SOUND 100% HUMAN — not like AI copywriting. Rules:
   - Use natural Malay fillers: "eh", "kan", "tau tak", "sumpah", "weh", "gila", "macam", "serious"
   - Include incomplete sentences, self-corrections, rhetorical questions
   - Each scene's dialogue must have DIFFERENT emotional energy than the scene before
   - NEVER start with "Hai korang hari ni aku nak share tentang..."
   - NEVER repeat the same word twice in a row (e.g. "baru baru", "best best", "gila gila") — use a different word instead
   - Think how a real Malaysian creator talks to their close friend on TikTok Live
4. 3-ACT STRUCTURE (HOOK → CONTENT/SOLUTION → CTA) — MUST follow:
${actMap.map((act, i) => `Scene ${i+1}: ${act}`).join('\n')}
5. Emotional journey: Curiosity → Engagement → Satisfaction/FOMO
6. Each scene MUST push the story forward — zero filler.
7. Visual/image fields in English. Dialogue in natural BM.

DIALOG PACING & SEGMENT CONTINUITY (CRITICAL FOR AI VIDEO GENERATION):
8. Each scene's dialogue must be SHORT enough to speak naturally within ${perScene}s. Max ~${Math.round(parseFloat(perScene) * 3)} words per scene at natural BM speech pace (~3 words/sec).
9. NOT every scene needs dialogue. Leave 1-2 scenes as VISUAL-ONLY (dialogue: "") for breathing room — let the visuals tell the story.
10. Scene N's dialogue must CONNECT to Scene N+1. Use bridging: "lepas tu kan...", "tapi...", "so...", "pastu..." at scene transitions.
11. The full dialogue across all scenes must read as ONE continuous conversation — not isolated random sentences.
12. For videos >${sec > 15 ? '15s' : '10s'}: group every 2-3 scenes into a mini-thought that resolves before the next group begins. This ensures each 10s segment feels complete when cut.
13. STORY LOGIC (MUST be coherent): The scenes must form a logical cause-and-effect chain. Each scene is a direct consequence of the previous one. A viewer must be able to follow WHY each moment happens. For a product story, a natural logical arc is: (a) show the problem/pain → (b) introduce the product as the answer → (c) show it working/being used → (d) show the happy result → (e) call to action. Do NOT jump to "she's happily using it" before establishing WHY she picked it up. Do NOT show the CTA before the benefit is proven. The emotion in each scene must match where we are in the story (frustrated at the problem, curious at discovery, delighted at the result).
14. SEGMENT SELF-CONTAINMENT: This video will be cut into 10-second segments. Every group of scenes that falls within a 10s window must make sense on its own. Therefore: the FIRST scene of each ~10s block should NOT open with a dangling bridge word ("tapi...", "lepas tu...", "so...") that depends on a scene the viewer may not have seen — instead it should re-anchor lightly (name the product or the situation) before continuing. Mid-block scenes can still bridge naturally.
15. DIALOGUE ↔ VISUAL MATCH: What the character SAYS must match what the scene SHOWS. If the dialogue talks about battery life, the visual should relate to using/checking the device, not an unrelated action. If she says "tengok ni" (look at this), she must be showing something to the camera. Never pair a line of dialogue with a visual that contradicts or ignores it.

NARRATIVE ENGINE — Select the STRONGEST progression for this topic (do NOT force Hook→Problem→Solution→CTA if another works better):
Available progressions: escalating problem, desire progression, mystery reveal, curiosity loop, before vs after, transformation journey, documentary discovery, character journey, problem to consequence, comedy setup to punchline, visual escalation, expectation vs reality, social experiment, countdown, hidden truth.
Pick the one that creates the most retention for THIS specific topic. Announce your chosen progression in the JSON "style" field.

CAMERA VARIETY (MANDATORY):
- NEVER repeat the same camera angle/shot type in consecutive scenes.
- Use at least 4 different camera types across ${sceneCount} scenes.
- Available: Extreme Close Up, Close Up, Medium Shot, Wide Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Low Angle, High Angle, Top Down, Macro, Handheld, Orbit Shot, Whip Pan.
- Vary strategically: close-up for emotion, wide for context, POV for immersion, tracking for energy.

STYLE INFERENCE (when style is "auto"):
${style === 'auto' ? `Automatically select the strongest visual style for "${topic}". Consider: Cinematic, UGC, POV, Documentary, Product Demo, Emotional Storytelling, Comedy Skit, Hyperreal Commercial, Aesthetic B-Roll, Visual Metaphor, Macro Product Film. Pick what creates the most impact.` : `Mandatory style: ${style}.`}

RETENTION — SCENE 1 MUST create immediate interest using one of these:
- Unexpected movement or action mid-frame
- Unfinished action (viewer needs to see what happens next)
- Emotional tension or human reaction
- Visual contradiction or unusual scale
- Mystery or transformation beginning
- Sensory imagery (texture, sound implication, touch)
- Pattern interruption (something viewers don't expect)
Do NOT open with generic talking-to-camera unless the topic demands it.

CONTINUITY RULES (STRICT):
- Every scene must: connect to previous scene, move story forward, show progression, include movement, reveal new information.
- NEVER create random disconnected scenes. NEVER use filler. NEVER repeat the same message in different words.
- No random character changes between scenes. No wardrobe changes unless specified. No face changes. No product redesign. No disconnected transitions. No unexplained environment changes.

AUDIO DIRECTION: Include an "audio_direction" field in the JSON output suggesting the best audio mood (e.g., "emotional piano", "tension pulse", "fast percussion", "trending beat", "minimal ambience", "ASMR texture", "silence before reveal").

${refCount > 0 ? 'Reference assets loaded — lock product/identity consistency across ALL scenes.' : ''}
${assetAnalysis ? `ASSET ANALYSIS for visual consistency:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}

Return ONLY valid JSON — no markdown, no commentary:
{"title":"🎬 [organic-sounding title in BM]","duration":"${sec}s","style":"[chosen style]","audio_direction":"[mood]","identity_bible":"[lock string]","scenes":[{"scene_num":1,"timecode":"0s–${perScene}s","visual":"[English with LOCATION + lighting + concrete details]","camera":"[specific shot type + movement — VARY each scene]","action":"[what happens — include movement]","emotion":"[facial expression + body language]","dialogue":"[NATURAL BM max ${Math.round(parseFloat(perScene) * 3)} words — or empty string for visual-only scenes]","image_prompt":"[English still with full environment]","i2v_prompt":"[English motion prompt]","negative":"${DEFAULT_NEGATIVE}","sound_design":"[BGM mood + SFX suggestion]"}]}`;
};

const getMicroImpactPrompt = (topic, aspect, audience, refCount, identityBible = '', assetAnalysis = '', punchCut = false) =>
  `You are a 10s MICRO-IMPACT SPECIALIST. Create ${punchCut ? '5 scenes (~2s each)' : 'exactly 3 scenes (~3.3s)'} for: ${topic}. Aspect ${aspect}.${audience ? ` Target: ${audience}.` : ''}${refCount ? ' Refs loaded.' : ''}
${punchCut ? 'PUNCH-CUT MODE: Fast cuts, maximum impact. 5 scenes × 2s. Hook must land in <0.5s. Every scene is a visual punch.' : 'STANDARD MODE: 3 scenes × 3.3s. Hook → Value → CTA.'}
SOUND DESIGN NOTES: For each scene, add a "sound_note" field in the JSON (e.g., "bass drop", "whoosh transition", "silence before CTA", "upbeat sting", "snap cut"). This helps editors pick audio cues.
${assetAnalysis ? `ASSET:\n${assetAnalysis}\n` : ''}${identityBible ? identityBible + '\n' : ''}${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Dialogue BM; visuals EN; each image_prompt must include a vivid environment matching the topic (never plain white).

HOOK FORMULA (pick strongest for topic):
- CURIOSITY GAP: "Korang tau tak kenapa [surprising thing]? Jawapan dia akan buat korang terkejut..."
- SHOCK STAT: Lead with a number nobody expects. e.g. "97% orang buat benda ni salah cara..."
- BOLD CLAIM: Controversial opener. e.g. "Stop beli [X]. Aku dah buktikan ia tak berbaloi."
- VISUAL HOOK: Scene 1 = extreme close-up of result/transformation, no dialogue

THUMBNAIL RULE: Scene 1 image_prompt MUST also work as a standalone scroll-stopping thumbnail — high contrast, clear subject, emotion visible.

WORD COUNT CAP: Max 10 words per scene dialogue (3.3s / 3 words per sec). Keep it punchy.

SCENE STRUCTURE (3 scenes for 10s):
- Scene 1: HOOK — stop-scroll moment. Provocative question or shocking statement in BM.
- Scene 2: PAYOFF/DEMO — deliver the hook's promise immediately. Show key detail/result.
- Scene 3: CTA — urgency-driven close. No dead-end "ok tu je".

${DIALOGUE_AUTHENTICITY_RULES}

JSON only:
{"title":"⚡ ${topic}","duration":"10s","identity_bible":"[lock]","scenes":[{"scene_num":1,"timecode":"0s–3.3s","visual":"[EN + location]","camera":"[shot]","action":"[action]","emotion":"[face]","dialogue":"[BM max 10 words]","image_prompt":"[still with environment — scroll-stopping thumbnail quality]","i2v_prompt":"[motion]","negative":"${DEFAULT_NEGATIVE}"}]}`;

const getNarrativeArcPrompt = (topic, aspect, audience, refCount, identityBible = '', assetAnalysis = '', genre = 'emotional') => {
  // Fixed-format 30s tab (UI offers no duration control — that is by design).
  // Was "6 scenes x 5s"; 5s per clip drifts in i2v generation, so the same 6-beat
  // 3-act structure is now told in 9 scenes of ~3.3s, which is the i2v sweet spot.
  const colorGrade = {
    emotional: 'Warm golden tones, soft shadows, slight vignette',
    thriller: 'Cold desaturated blues, high contrast, deep shadows',
    comedy: 'Bright vibrant saturated, clean lighting, no shadows',
    motivational: 'High contrast bold, dynamic lighting, deep blacks',
    educational: 'Clean neutral tones, consistent lighting, minimal',
  };
  const genreContext = {
    emotional: 'GENRE: Emotional/Inspirational — slow burn build, raw authentic moments, music-driven. Dialogue feels like a real confession, not a script. Colour: warm golden tones.',
    thriller: 'GENRE: Thriller/Suspense — fast cuts, unresolved tension early, shocking reveal mid-story. Dialogue: short punchy lines, cliff-hangers. Colour: cold desaturated.',
    comedy: 'GENRE: Comedy/Relatable — self-deprecating humour, unexpected twist, audience laughs WITH creator. Dialogue: natural BM with comedic timing. Colour: bright vibrant.',
    motivational: 'GENRE: Motivational/Epic — rising energy, problem→overcome→triumph arc. Dialogue: empowering, direct address. Colour: high contrast bold.',
    educational: 'GENRE: Educational/Tips — clear value delivery, numbered steps feel natural not robotic. Dialogue: "Korang tau tak..." hook. Colour: clean neutral.',
  };
  return `You are a professional FLOW AI & IMAGE-TO-VIDEO CINEMATIC DIRECTOR. Create a continuous 30-second storyboard with exactly 9 scenes (~3.3 seconds each) optimized for Flow AI.
Topic: ${topic}
Aspect Ratio: ${aspect}
${audience ? `Target: ${audience}` : ''}
${genreContext[genre] || genreContext.emotional}
COLOR GRADE for this genre: ${colorGrade[genre] || colorGrade.emotional}. Apply this color mood to every scene's visual and image_prompt description.
${refCount > 0 ? 'Reference assets loaded.' : ''}
${assetAnalysis ? `ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}

FLOW AI TECHNICAL REQUIREMENTS:
- Each scene's i2v_prompt must specify: motion direction, speed, camera movement, and subject action
- Use "seamless loop" language: end of scene N motion must connect to start of scene N+1
- Subject position at END of scene N should match START position of scene N+1
- Avoid hard teleportation between scenes — use transitional actions (walking through door, turning head, etc.)

3-ACT STRUCTURE (mandatory — each scene must serve its act):
Scene 1: ACT 1 — HOOK: visual pattern interrupt, grab attention in 1 second. Unexpected angle or extreme close-up.
Scene 2: ACT 1 — SETUP: establish world, character, and stakes. Viewer must understand what this is about.
Scene 3: ACT 2 — CONFLICT: introduce tension, problem, challenge, or desire. Emotional pull begins.
Scene 4: ACT 2 — CONFLICT DEEPENS: show a concrete consequence of the problem. Make it specific, not abstract.
Scene 5: ACT 2 — TURNING POINT: the answer/solution first appears. Curiosity shifts to hope.
Scene 6: ACT 2 — BUILD: demonstrate the solution working. Energy escalates.
Scene 7: ACT 3 — RESOLUTION: breakthrough moment, transformation, or answer fully revealed. Emotional peak.
Scene 8: ACT 3 — PROOF: show the result holding up (reaction, detail shot, or "after" evidence).
Scene 9 — PAYOFF (pick one):
  A) EMOTIONAL CLOSE: Character reaction shot, face showing satisfaction/relief/joy.
  B) PRODUCT HERO: Product/result in perfect lighting, camera slowly pulls back. Reveal moment.
  C) CTA DIRECT: Character looks straight to camera, speaks CTA line with genuine energy. Point gesture.
  D) LINGERING VISUAL: Beautiful environmental/atmospheric shot that encapsulates the story emotion. No dialogue.
Emotional arc: Curiosity → Tension → Release. Action in scene N must flow naturally into scene N+1.

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Scenes must feel continuous (action carries over). Dialogue BM, visuals English with location detail. No plain white backgrounds.

CAMERA VARIETY (MANDATORY):
- NEVER repeat the same camera angle in consecutive scenes.
- Use at least 5 different camera types across the 9 scenes.
- Available: Extreme Close Up, Close Up, Medium Shot, Wide Shot, POV, Tracking Shot, Dolly In, Low Angle, High Angle, Macro, Handheld.

${DIALOGUE_AUTHENTICITY_RULES}

Return ONLY valid JSON:
{"title": "🎬 30s Narrative: [Topic]", "duration": "30s", "style": "Flow AI Optimized", "identity_bible":"[lock]", "scenes": [{"scene_num":1,"timecode":"0s–3.3s","visual":"[English + location/lighting]","camera":"[movement]","action":"[continuous action]","emotion":"[emotion]","dialogue":"[BM]","image_prompt":"[still with full environment]","i2v_prompt":"[motion]","transition_to_next":"cut|dissolve|wipe_left|zoom_in|match_cut","negative":"${DEFAULT_NEGATIVE}"}]}`;
};

const getTalkingHeadPrompt = (topic, duration, tone, aspect, audience, refCount, identityBible = '', assetAnalysis = '', teleprompter = false, subtitleFormat = false) => {
  const sec = parseInt(duration) || 30;
  // Dialogue-heavy tab: each scene still needs room for a full spoken line, but the old
  // ladder pinned every duration >=20s at 5s per scene, which drifts in i2v generation.
  // Target ~3.3-4.1s: long enough to speak a line, short enough to stay stable.
  const sceneCount = sec <= 10 ? 3 : sec <= 15 ? 4 : sec <= 20 ? 5 : sec <= 30 ? 8 : sec <= 45 ? 11 : 15;
  const perScene = (sec / sceneCount).toFixed(1);
  return `You are a TALKING HEAD storyboard generator. Create ${sec}s influencer storyboard: ${topic}. Tone: ${tone}. Aspect: ${aspect}.
Exactly ${sceneCount} scenes, ~${perScene}s each.
${audience ? `Target: ${audience}` : ''}
${refCount > 0 ? 'Reference assets loaded.' : ''}
${assetAnalysis ? `ASSET ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
${teleprompter ? `[TELEPROMPTER MODE ON]: Format ALL dialogue as short readable lines (max 5 words per line). Use line breaks. Add natural cues: [PAUSE], [SMILE], [LEAN IN], [LOOK UP], [EMPHASIZE] at natural points. This will be read on-camera.` : '[NATURAL MODE]: Dialogue flows naturally, no cue markers needed.'}

SCENE 1 HOOK — MANDATORY (pick the strongest hook type for this topic):
- QUESTION HOOK: Open with a bold provocative question in BM that the target audience cannot ignore. e.g. "Korang tau tak kenapa ramai orang rugi buat benda ni?"
- BOLD CLAIM HOOK: Start with a surprising statement or controversial opinion. e.g. "Aku berhenti buat [X] lepas 2 tahun — dan rasa lega gila."
- SURPRISING STAT HOOK: Lead with a shocking number or fact relevant to the topic.
- STORY HOOK: Drop straight into a relatable micro-story mid-action, no intro. e.g. "Semalam aku kat kedai, tetiba nampak benda ni..."
Scene 1 dialogue MUST use one of these hooks. No generic intros like "Hai korang, hari ni aku nak cakap pasal...".

TELEPROMPTER PACING RULES:
- Break dialogue into breath groups: max 8-10 words per natural pause
- Mark natural pauses with " / " in dialogue: "Korang tau tak / benda ni dah viral gila / sebab satu sebab je"
- Each breath group = 1.5-2s speak time
- Scene dialogue total = ${Math.round(parseFloat(perScene) * 2.5)} words max

EYE CONTACT DIRECTION (vary per scene):
- Scene 1 HOOK: Direct camera eye contact — creates intimacy, stops scroll
- Middle scenes: Mix of camera, product demo look-down, side glance for authenticity
- CTA scene: Direct camera + hand gesture pointing down
Add "eye_contact": "camera_direct" | "product_demo" | "side_authentic" | "camera_cta" to each scene

B-ROLL INSERTION RULE:
- Every 2-3 talking head scenes, AI MUST suggest 1 B-roll cutaway scene
- B-roll scene: visual="[cutaway: product detail/environment/action]", dialogue="" (carry VO from previous scene)
- Mark B-roll scenes with "scene_type": "talking_head" | "broll_cutaway"

STORY STRUCTURE for remaining scenes:
- Middle scenes: deliver the value/story/demo promised by the hook. Build curiosity → answer → deeper insight.
- Final scene: strong close — emotional payoff, clear CTA, or memorable punchline. Not just "ok tu je dari aku".

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Keep same face identity. Dialogue natural BM. Visuals English. Background must be a real room/location (bedroom, cafe, office, street) — never plain white.

CAMERA VARIETY (MANDATORY):
- NEVER repeat the same camera angle in consecutive scenes.
- Use at least 4 different camera types across ${sceneCount} scenes.
- Available: Extreme Close Up, Close Up, Medium Shot, Medium Wide Shot, Wide Shot, Drone Shot, POV, Over Shoulder, Tracking Shot, Dolly In, Dolly Out, Push In, Pull Back, Handheld, Static, Low Angle, High Angle, Top Down, Macro Shot, Whip Pan, Orbit Shot, Rack Focus, Crane Shot, Dutch Angle, Locked-Off Shot.
- Avoid repetitive framing. Use camera movement strategically.

${DIALOGUE_AUTHENTICITY_RULES}

Return ONLY valid JSON:
{"title":"🤳 [topic]","duration":"${sec}s","style":"${tone}","identity_bible":"[lock]","scenes":[{"scene_num":1,"timecode":"0s–${perScene}s","visual":"[English + room/location]","camera":"[shot]","action":"[action]","emotion":"[facial]","dialogue":"[BM hook — question/bold claim/stat/story]","image_prompt":"[still with environment]","i2v_prompt":"[motion]","eye_contact":"camera_direct|product_demo|side_authentic|camera_cta","scene_type":"talking_head|broll_cutaway","negative":"${DEFAULT_NEGATIVE}"}]}`;
};

const getStopMotionPrompt = (product, duration, style, aspect, audience, refCount, identityBible = '', assetAnalysis = '') => {
  // The UI offers 5s/10s/15s but this prompt used to hardcode "10 seconds / 10 scenes",
  // so picking 5s or 15s silently did nothing. Keep the 1-second-per-frame rhythm that
  // makes stop motion read correctly, and scale the frame count to the chosen duration.
  const sec = parseInt(duration) || 10;
  const sceneCount = sec; // 1 frame per second
  return `You are a specialized Stop Motion Storyboard Generator. Transform "${product}" into a ${sec}-second stop-motion video storyboard.

RULES:
- Exactly ${sceneCount} scenes, each exactly 1 second.
- Format: 9:16 vertical. Style: Stop Motion / ${style}.
- Scene 1 MUST create immediate visual curiosity (object slides/jumps/snaps into frame).
- Scene ${sceneCount} (the final frame) MUST be a strong hero shot (main object centered, clean background, premium composition).
- Every scene must visually connect to the next — one continuous sequence, NOT random disconnected shots.
- Each scene has ONE dominant stop-motion action only.
- Prefer movements: Slide, Jump, Rotate, Assemble, Appear, Flip, Stack, Pop Up, Spin, Expand, Collapse, Roll, Snap Into Place, Split, Merge, Unfold, Scatter, Gather, Pour, Drop, Rise, Orbit, Swap, Reveal.
- Keep actions easy to animate (frame-by-frame repositioning, rotation, scale, practical tabletop stop motion).

EASING & TIMING PER MOVEMENT:
- Slide: ease-in-out (slow start, fast middle, slow end) — 12-15 frames at 12fps
- Jump: ease-out on rise, ease-in on land — sharp arc
- Rotate: linear for mechanical products, ease-in-out for organic objects
- Snap Into Place: fast ease-out (object arrives quickly, slight overshoot bounce)
- Pour/Drop: gravity ease-in (accelerating)
- Reveal/Appear: ease-out (smooth entrance)
Add "easing": "[easing type]" and "frame_count": "[N frames at 12fps]" to each scene.

PROPS BY PRODUCT CATEGORY (infer from product name):
- Beauty/Skincare: marble slab, dried flowers, pearl beads, gold coins, rose petals
- Tech/Gadgets: geometric shapes, cables, LED strips, brushed metal surfaces
- Food/Drink: ice cubes, herbs, spices, cutting board, fabric napkin
- Fashion/Accessories: fabric swatches, buttons, thread spools, jewelry elements
- Generic: confetti, sand, powder, small geometric blocks
Add "props_suggestion": "[product-appropriate props]" to each scene JSON.

COLOR PALETTE LOCK (maintain across all ${sceneCount} scenes):
- Extract dominant color from product reference or infer from product name/category
- Background/surface color must complement product (contrast or analogous)
Add "color_palette": "primary: [hex/name], accent: [hex/name], surface: [hex/name]" to the JSON root.
${refCount > 0 ? 'Note: Product reference image is loaded for visual consistency.' : ''}
${assetAnalysis ? `PRODUCT ANALYSIS:\n${assetAnalysis}\n` : ''}
${identityBible ? `${identityBible}\n` : ''}
EASING & TIMING:
Animation easing for this video: ${easingMode === 'ease-in-out' ? 'EASE-IN-OUT — objects start slow, speed up mid-frame, slow to stop. Natural organic feel.' : easingMode === 'bounce' ? 'BOUNCE — objects overshoot then snap back. Playful energetic feel.' : easingMode === 'snap' ? 'SNAP — instant cuts, zero easing. Punchy aggressive feel.' : easingMode === 'slow-mo' ? 'SLOW MOTION — each frame held slightly longer, graceful reveal.' : 'EASE-IN-OUT — natural smooth motion.'}
For each scene, specify in i2v_prompt: entry direction (left/right/top/bottom/zoom), motion type (slide/flip/drop/spin/reveal), and easing tag.

PROPS CHECKLIST (include in visual description):
- Background surface: e.g., marble table, kraft paper, wooden board, white foam board
- Supporting props: e.g., dried flowers, coins, pencils, fabric swatches (match product category)
- Lighting: e.g., soft side window light, ring light from above, LED strip behind
- Camera angle: flat lay (top-down) / eye level / 45° angle

${SCENE_ENVIRONMENT_RULES}
${SCENE_JSON_CONTRACT}
Dialogue should be empty string for all scenes unless text-on-screen is essential (prefer empty).
Tabletop set must have visible surface texture, props, and lighting — not empty white void.

Return ONLY valid JSON:
{
"title": "🧩 Stop Motion: ${product}",
"duration": "${sec}s",
"style": "Stop Motion",
"identity_bible": "[product lock]",
"scenes": [
{"scene_num": 1, "timecode": "0s–1s", "visual": "[English]", "camera": "[Top Down / Close Up / Macro / Hero Shot]", "action": "[One stop-motion movement]", "emotion": "[mood]", "dialogue": "", "easing": "[easing type]", "frame_count": "[N frames at 12fps]", "props_suggestion": "[product-appropriate props]", "image_prompt": "[still]", "i2v_prompt": "[frame-by-frame motion]", "negative": "${DEFAULT_NEGATIVE}"}
],
"props": ["[props]"],
"visual_mood": "[mood]",
"transition_style": ["[transitions]"],
"color_palette": "primary: [hex/name], accent: [hex/name], surface: [hex/name]"
}`;
};

const getGrafixPrompt = (topic, duration, aspect, style, audience, refCount, identityBible = '', assetAnalysis = '', brandColor = '', dataInput = '') => {
  const sec = parseInt(duration) || 30;
  // Motion graphics: no speech pacing to respect, so keep scenes tight (~3.3-4s) —
  // the old ladder pinned everything >=20s at 5s per scene, too long for clean i2v motion.
  const sceneCount = sec <= 10 ? 3 : sec <= 15 ? 4 : sec <= 20 ? 6 : sec <= 30 ? 8 : sec <= 45 ? 12 : 15;
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
${brandColor ? `[BRAND COLOR LOCK]: Use ONLY this color palette throughout ALL scenes: ${brandColor}. Every background, graphic element, text, icon, and accent must stay within this palette. No random colors.` : ''}
${dataInput ? `[DATA VISUALIZATION]: User provided this data to visualize: ${dataInput}. Translate each data point into a VISUAL METAPHOR — NOT text overlay. Examples: growing bar = rising object, 40% = filling circle, comparison = two objects side by side. Make data feel visual and intuitive.` : ''}

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

DATA VISUALIZATION TYPES (use when topic involves numbers/stats/comparisons):
- Bar chart animation: numbers counting up, bars growing
- Pie/donut chart: segments appearing one by one
- Timeline: events appearing left to right with connecting line
- Comparison table: columns sliding in, checkmarks appearing
- Progress meter: fill animation with percentage counter
- Map highlight: region/country lighting up
- Icon grid: multiple icons animating in simultaneously
When topic involves data, specify "viz_type" field with most appropriate type.

BRAND COLOR INTEGRATION:
${assetAnalysis ? "Reference image analyzed — extract dominant brand colors: use in typography, icons, backgrounds throughout. Maintain brand palette consistency across all scenes." : "No brand reference — choose a cohesive color palette that matches the topic mood (tech=blue/dark, finance=green/gold, lifestyle=warm tones, etc.)"}
Add "brand_palette": "[primary color + accent color]" to JSON root.

LOWER-THIRD TEXT RULES:
- Every scene that introduces a new concept MUST have a lower-third text overlay
- Max 5 words per lower-third
- Format: "HEADLINE / supporting stat or label"
- Lower-third appears in first 1s of scene, holds 2s, fades out
Add "lower_third": "[text]" | null to each scene JSON.
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
"viz_type": "[bar_chart|pie_chart|timeline|comparison_table|progress_meter|map_highlight|icon_grid|none]",
"lower_third": "[max 5 words]",
"negative": "${DEFAULT_NEGATIVE}, live-action influencer, random portrait, fashion model"
}
],
"brand_palette": "[primary color + accent color]"
}`;
};

const FI_SKIN_TONE_OPTIONS = ['Malay warm fair (putih gading)', 'Malay natural medium (sawo matang)', 'Malay golden tan glow', 'Malaysian Chinese fair porcelain', 'Malaysian Chinese warm ivory', 'Malaysian Indian warm brown', 'Mixed Malaysian golden beige', 'Deep warm bronze Malaysian', 'Light cool beige KL office look'];
const FI_HAIR_HEADWEAR_FEMALE = ['Long straight black hair (Raya sleek)', 'Soft wavy brown-black hair', 'Shoulder-length layered hair', 'Sleek high ponytail', 'Curtain bangs soft black hair', 'Tudung bawal pastel aesthetic', 'Tudung labuh plain premium', 'Inner + shawl hijab modern', 'Sporty instant tudung', 'Satin scarf headwrap casual', 'Half-up claw clip hair (cafe OOTD)'];
const FI_HAIR_HEADWEAR_MALE = ['Short neat black hair (kerap potong)', 'Korean soft middle part', 'Textured crop / french crop', 'Combed side part clean', 'Undercut modern', 'Messy natural waves', 'Buzz cut clean', 'Songkok formal Raya (optional props)', 'Baseball cap street casual', 'Kopiah plain (soft lighting portrait)'];
const FI_OUTFIT_VIBE_FEMALE = ['Dark Streetwear — black oversized hoodie + cargo pants', 'All-Black Minimal — fitted black turtleneck + tailored trousers', 'Dark Academia — charcoal blazer + dark midi skirt', 'Monochrome Navy — navy co-ord set, structured', 'Dark Modest Chic — deep burgundy modest blouse + wide-leg pants', 'Hijab modest pastel set', 'Casual MY OOTD (cotton tee + jeans)', 'Raya kurung modern soft color', 'Office lady blouse + slacks (KL)', 'Cafe soft girl cardigan look', 'Premium modest blazer set', 'Date night simple midi dress'];
const FI_OUTFIT_VIBE_MALE = ['Dark Streetwear — black oversized tee + black cargo pants', 'All-Black Minimal — black fitted crewneck + slim trousers', 'Techwear Dark — dark grey tech jacket + joggers', 'Monochrome Charcoal — charcoal co-ord set, clean cut', 'Dark Smart Casual — navy slim shirt + dark chinos', 'Streetwear oversized tee', 'Casual MY OOTD (plain tee + jeans)', 'Office smart casual (oxford + chinos)', 'Premium blazer date look', 'Baju Melayu modern slim fit', 'Campus hoodie casual', 'Techwear light jacket outdoor'];
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
      bottomRow: 'BOTTOM ROW — REFERENCE DETAILS: Full Body Reference, Close-Up Face Reference, Hair Reference, Outfit Reference, Accessories Reference. Use a professional visual-development sheet layout.\n\nBOTTOM SECTION — COLOR PALETTE STRIP: Add a horizontal color swatch strip at the very bottom of the sheet showing: skin tone swatch, hair color swatch, eye color swatch, outfit primary color swatch, outfit accent color swatch. Label each swatch with a descriptive color name.'
    },
    PRODUCT_CHARACTER: {
      topRow: 'TOP ROW — 4 PRIMARY REFERENCE ANGLES (crop-ready): These four panels are the MOST IMPORTANT and will be cropped out individually for later use, so make each one large, clean, well-separated, and clearly labelled with a bold caption above it. Panel 1 = "FRONT VIEW" (product facing camera, screen/face and all front controls fully visible). Panel 2 = "3/4 VIEW" (three-quarter angle showing front + one side together — the best single reference angle). Panel 3 = "BACK VIEW" (rear facing camera, showing back panel, logo, vents, ports). Panel 4 = "IN-HAND VIEW" (product held naturally in a human hand at real-world scale, oriented the correct upright way). Each of these four panels must show the SAME product with an IDENTICAL, consistent control/button/logo layout — do not mirror or rearrange controls between panels.',
      middleRow: 'MIDDLE ROW — TECHNICAL VIEWS (smaller, secondary): Label each: "LEFT SIDE", "RIGHT SIDE", "TOP VIEW", "BOTTOM VIEW".',
      bottomRow: 'BOTTOM ROW — DETAIL REFERENCES (smaller): Label each: "LEFT CONTROLS" (close-up of left-hand buttons/joystick/D-pad), "RIGHT CONTROLS" (close-up of right-hand buttons/joystick), "LOGO DETAIL", "SCALE REFERENCE". Requirements: Preserve exact product identity, proportions, brand colors, visible logo design, and the exact asymmetric control layout (left-side controls stay left, right-side stay right — never swapped or mirrored). For any device with an asymmetric control layout, the LEFT CONTROLS and RIGHT CONTROLS close-up panels are the authoritative map of true button positions.\n\nSCALE REFERENCE PANEL: In the bottom-right corner, show the product next to a common reference object (human hand for handheld products, desk for large products, coin for small products) to establish real-world scale.'
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
${characterDescription && characterDescription.length < 20 ? '\nAUTO-DETECT MODE: No detailed description provided. Analyze the uploaded reference image and extract all visual characteristics automatically. Generate the character sheet based purely on what you observe in the reference.' : ''}

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
${category === 'PRODUCT_CHARACTER'
  ? 'IMPORTANT: Add a clear, legible caption ABOVE each of the 4 primary reference panels ("FRONT VIEW", "3/4 VIEW", "BACK VIEW", "IN-HAND VIEW") and above each secondary/detail panel. Use clean bold professional typography, correctly spelled, high-contrast, easy to read — these labels are needed so the panels can be identified and cropped later. Keep captions short (2-3 words), consistent position, no decorative text.'
  : 'If labels are used: keep labels minimal, use clean professional typography, use short view names, place labels consistently, avoid large titles. Where text rendering quality is unreliable, prioritize clean visual layout over excessive labels.'}

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
=== PHOTOREALISM MANDATE (CRITICAL) ===
This character sheet MUST be 100% PHOTOREALISTIC — indistinguishable from a real photograph.
- REAL HUMAN SKIN: visible pores, natural skin texture, subtle imperfections, real lighting interaction on skin.
- ZERO cartoon, illustration, anime, 3D render, or painterly style. If the subject is human, it must look like a real person photographed in a studio.
- Match the uploaded reference face EXACTLY: same bone structure, same eye shape, same nose, same lip proportions, same skin tone, same age appearance. Do NOT beautify, stylize, or reinterpret the face.
- The output must look like the SAME REAL PERSON photographed from different angles — not a "similar looking" AI interpretation.
- Treat the reference image as a real photograph of a real person. Replicate their appearance with forensic accuracy.
- NO smooth plastic AI skin. NO doll-like perfection. Keep natural human asymmetry and texture.

Generate the Character Sheet now. Output a single 9:16 portrait professional Character Sheet image.

[LABEL CONSISTENCY RULE]: Every panel MUST have a clear bold caption label above it (e.g. "FRONT VIEW", "BACK VIEW", "LEFT SIDE"). Labels must be consistent — same font style, same position (top-center of each panel), same capitalization. No panel should be unlabelled.

[AUTO-CROP GUIDE]: The 4 primary panels in the TOP ROW are designed to be cropped individually for use as reference images in scene generation. Keep each panel self-contained: full subject visible, no overlapping elements between panels, clear margins around each panel.`;
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

  // CLEAN ALLOCATION: distribute scenes sequentially and evenly across segments.
  // Scene order is preserved (scene 1,2,3 -> seg 1; 4,5,6 -> seg 2; ...) so nothing
  // overlaps between segments and no dialogue is ever duplicated.
  if (normalized.length) {
    const perSeg = Math.ceil(normalized.length / numSegments);
    normalized.forEach((sc, i) => {
      const segIdx = Math.min(numSegments - 1, Math.floor(i / perSeg));
      buckets[segIdx].push(sc);
    });
    // If any segment ended up empty (uneven counts), pull ONE scene from the
    // richest neighbouring segment — move it, don't copy it (no duplication).
    for (let i = 0; i < numSegments; i++) {
      if (buckets[i].length) continue;
      let richest = -1, richestLen = 1;
      for (let d = 0; d < numSegments; d++) {
        if (buckets[d].length > richestLen) { richestLen = buckets[d].length; richest = d; }
      }
      if (richest >= 0) {
        // take from the end if donor is before us, from the start if after us
        const moved = richest < i ? buckets[richest].pop() : buckets[richest].shift();
        if (moved) buckets[i].push(moved);
      }
    }
  }

  // TIMING RESET: re-stamp each scene's timecode + i2v so every segment starts at
  // its true window (0s, 10s, 20s...) with no overflow across segment boundaries.
  for (let i = 0; i < numSegments; i++) {
    const segStart = i * segSize;
    const segEnd = Math.min(segStart + segSize, totalSec);
    const segScenes = buckets[i];
    if (!segScenes.length) continue;
    const per = (segEnd - segStart) / segScenes.length;
    segScenes.forEach((sc, idx) => {
      const a = +(segStart + idx * per).toFixed(1);
      const b = +(segStart + (idx + 1) * per).toFixed(1);
      sc.timecode = `${a}s–${b}s`;
      // rebuild the time-coded i2v against the corrected window
      const t1 = +(a + (b - a) * 0.3).toFixed(1);
      const t2 = +(a + (b - a) * 0.7).toFixed(1);
      const cam = String(sc.camera || 'static shot').trim();
      const act = String(sc.action || sc.visual || 'subject holds pose').trim().replace(/\.$/, '');
      sc.i2v_prompt = `${a}s–${t1}s: establish (${cam}), subject in starting pose. `
        + `${t1}s–${t2}s: ${act} — camera ${cam.toLowerCase()}. `
        + `${t2}s–${b}s: hold final pose, ready to lead into next scene. `
        + `ONE continuous motion, no cuts. Keep face, wardrobe, product, lighting, and background locked.`;
    });
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
          // NOTE: 'Still prompt' (image_prompt) is intentionally omitted here.
          // It is for still-image generation, not video. Including it bloats the
          // Flow AI prompt past its input limit and confuses the video model
          // (it reads image instructions inside a video prompt). Flow AI only
          // needs the scene description, camera, and time-coded motion.
          return [
            `Scene ${sc.scene_num}: ${vis}`,
            cam ? `Camera: ${cam}` : '',
            i2v ? `I2V: ${i2v}` : ''
          ].filter(Boolean).join('\n');
        }).join('\n\n')
      : `Hold continuity frame for ${s}s–${e}s. Same character, product, lighting. Subtle natural motion only.`;

    const dialogues = segScenes
      .filter((sc) => sc.dialogue && String(sc.dialogue).trim())
      .map((sc) => `[Scene ${sc.scene_num}] "${sc.dialogue}"`)
      .join('\n');

    // WARM-UP REFERENCE: point Flow AI at the strongest scene in this segment as the
    // identity anchor, so the other (text-only) scenes match its face/product/lighting.
    // Reuses pickBestKeyframe — no new picking logic.
    const anchor = segScenes.length ? segScenes[pickBestKeyframe(segScenes).index] : null;
    const anchorNote = anchor
      ? `\nKEYFRAME ANCHOR: Scene ${anchor.scene_num} is the identity reference for this segment. Match its EXACT face, wardrobe, product layout, and lighting in every other scene here — keep one consistent person and product throughout.`
      : '';

    const prompt = [
      `🎬 FLOW AI SEGMENT ${s}s–${e}s  (full video ${totalSec}s · part ${i + 1}/${numSegments})`,
      title ? `TITLE: ${title}` : '',
      `FORMAT: ${aspectRatio} | WINDOW: ${s}s to ${e}s | DURATION: ${e - s}s`,
      identityBible ? `\n${identityBible}` : '',
      anchorNote,
      `\nVISUAL:\n${visuals}`,
      dialogues ? `\nDIALOGUE (BM):\n${dialogues}` : '',
      `\nCONTINUITY: Same character, product, wardrobe, environment across ALL segments of this ${totalSec}s video. PRODUCT SIZE LOCK: maintain real-world accurate product size — do NOT oversize or shrink the product. Keep exact scale ratio vs human hands/body as shown in reference.`,
      `INSTRUCTIONS: Generate only the ${s}s–${e}s portion. Match prior segment identity if extending. Product must appear in its REAL original size — never artificially enlarged.`
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

// Short "done" beep so the user knows a generation finished while tabbed away.
// ponytail: uses the built-in Web Audio API instead of shipping an audio asset.
// Ceiling: fixed two-tone chime, no volume control. If richer sounds are ever
// needed, swap this for an <audio> element with a real sound file.
const playDoneSound = () => {
  try {
    if (localStorage.getItem('sound_alerts') === 'off') return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // Two quick rising notes = pleasant "task complete" chime.
    [[880, 0], [1320, 0.12]].forEach(([freq, offset]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.25, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.2);
    });
    setTimeout(() => ctx.close().catch(() => {}), 600);
  } catch { /* audio blocked or unsupported — silently skip */ }
};

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

const getStoredKeyframeMode = () => {
  try {
    const v = localStorage.getItem('keyframe_mode') || 'on';
    // Valid modes: 'off' (0 img), 'on' (1 smart keyframe), 'segment' (1 per Flow segment)
    return ['off', 'on', 'segment'].includes(v) ? v : 'on';
  } catch { return 'on'; }
};
const getStoredTimelineMode = () => {
  try { return localStorage.getItem('timeline_mode') || 'off'; } catch { return 'off'; }
};

// SMART KEYFRAME PICKER: pick the scene index that makes the best identity anchor.
// A good keyframe clearly shows the subject's face + product (close/medium shot),
// so Flow AI has a strong reference to lock identity across the rest of the video.
// Scores one scene as a keyframe candidate. Returns a numeric score.
const scoreKeyframeCandidate = (sc, i = 0) => {
  const cam = String(sc.camera || '').toLowerCase();
  const vis = String(sc.visual || sc.action || '').toLowerCase();
  const act = String(sc.action || '').toLowerCase();
  const emo = String(sc.emotion || '').toLowerCase();
  const dlg = String(sc.dialogue || '').trim();
  let score = 0;
  // RULE 1 — represent the SCENE: prefer shots that clearly frame face + product.
  if (/close\s*up/.test(cam)) score += 5;
  if (/medium/.test(cam)) score += 4;
  if (/over\s*shoulder/.test(cam)) score += 2;
  if (/pov|top\s*down|macro|extreme/.test(cam)) score -= 2;
  if (/face|looking at|smil|eyes|expression|talk/.test(vis)) score += 3;
  if (/hold|console|product|device|screen/.test(vis)) score += 1;
  // #1a — ACTION field: static/holding/facing = good anchor; motion = bad (blur).
  if (/hold|show|present|face camera|look at camera|point|reveal/.test(act)) score += 2;
  if (/walk|run|jump|spin|throw|drop|toss|dash|move fast/.test(act)) score -= 3; // motion blur = weak keyframe
  // #1b — EMOTION field: expressive/engaging emotions make a stronger, more scroll-stopping anchor.
  if (/excited|surprised|amazed|shocked|happy|joy|confident|delighted/.test(emo)) score += 3;
  if (/neutral|calm|tired|bored/.test(emo)) score += 0;
  // RULE 2 — represent the DIALOGUE: a talking moment anchors the segment's message.
  if (dlg.length > 0) {
    score += 4;
    if (dlg.length >= 20) score += 1;
    if (/\?|!|weh|korang|sumpah|serious|tau/.test(dlg.toLowerCase())) score += 1;
    // Best of all: talking WHILE looking at the camera (direct viewer address).
    const looksAtCam = /look(?:ing|s)?\s*(?:at|into|to)?\s*(?:the\s*)?camera|eye contact|direct(?:ly)? at (?:the )?camera|faces? the camera|addressing the viewer/i.test(vis + ' ' + act);
    if (looksAtCam) score += 3;
  } else {
    score -= 3;
  }
  score -= i * 0.1; // tiebreaker: earlier scene slightly preferred
  return score;
};

// Picks the best keyframe scene and reports confidence + a short human reason.
// Returns { index, score, confidence, reason }.
const pickBestKeyframe = (scenes) => {
  if (!Array.isArray(scenes) || !scenes.length) {
    return { index: 0, score: 0, confidence: 0, reason: 'No scenes available' };
  }
  const scored = scenes.map((sc, i) => ({ i, s: scoreKeyframeCandidate(sc, i), sc }));
  scored.sort((a, b) => b.s - a.s);
  const best = scored[0];
  const runnerUp = scored[1] || { s: best.s - 2 };
  // Confidence: how clearly the best beats the runner-up, mapped to ~40-99%.
  const gap = Math.max(0, best.s - runnerUp.s);
  const confidence = Math.min(99, Math.max(40, Math.round(60 + gap * 8)));
  // Build a short reason from what earned the points.
  const sc = best.sc;
  const bits = [];
  if (/close\s*up|medium/i.test(sc.camera || '')) bits.push('clear face shot');
  if (String(sc.dialogue || '').trim()) bits.push('has dialogue');
  if (/excited|surprised|amazed|shocked|happy|confident/i.test(sc.emotion || '')) bits.push('expressive');
  if (/hold|product|console|device/i.test(sc.visual || sc.action || '')) bits.push('product visible');
  const reason = bits.length ? bits.join(' + ') : 'best available anchor';
  return { index: best.i, score: best.s, confidence, reason };
};

// Backward-compatible wrapper (returns index only).
const pickBestKeyframeIndex = (scenes) => pickBestKeyframe(scenes).index;

// For 'segment' mode: pick one representative keyframe index per Flow segment window.
const pickKeyframeIndicesPerSegment = (scenes, totalSec, segSize = 10) => {
  if (!Array.isArray(scenes) || !scenes.length) return [0];
  const numSegments = Math.max(1, Math.ceil((totalSec || 30) / segSize));
  const perSeg = Math.ceil(scenes.length / numSegments);
  const indices = [];
  for (let seg = 0; seg < numSegments; seg++) {
    const startIdx = seg * perSeg;
    const endIdx = Math.min(startIdx + perSeg, scenes.length);
    if (startIdx >= scenes.length) break;
    const slice = scenes.slice(startIdx, endIdx);
    const localBest = pickBestKeyframeIndex(slice);
    indices.push(startIdx + localBest);
  }
  return indices.length ? indices : [0];
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
// Fallback cascade: if the primary image model is overloaded (503) or keeps failing,
// automatically try the next one instead of hammering the same down server.
const IMAGE_MODEL_CASCADE = [
  'gemini-3.1-flash-image',
  'gemini-3-pro-image',
  'gemini-2.5-flash-image-preview'
];

// Sticky preferred image model (falls back to primary if none saved / invalid).
const getStoredImageModel = () => {
  try {
    const v = localStorage.getItem('image_model_pref');
    return v && IMAGE_MODEL_CASCADE.includes(v) ? v : IMAGE_MODEL_CASCADE[0];
  } catch { return IMAGE_MODEL_CASCADE[0]; }
};

const getStoredModel = () => {
  try { return localStorage.getItem('gemini_selected_model') || 'gemini-3.5-flash'; } catch { return 'gemini-3.5-flash'; }
};

const getStoredGenfityModel = () => {
  try { return localStorage.getItem('genfity_selected_model') || 'genfity/gemini-3.5-flash'; } catch { return 'genfity/gemini-3.5-flash'; }
};

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const callGeminiApi = async (model, payload, isPredict = false, signal = null) => {
    const currentKey = getStoredApiKey();
    if (!currentKey) throw new Error('API Key belum dimasukkan. Sila masukkan Gemini API Key anda di bahagian atas halaman.');
  const endpoint = isPredict ? 'predict' : 'generateContent';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${endpoint}?key=${currentKey}`;
  // 429 (Too Many Requests) gets longer delays since quota resets slower
  const delays = [2000, 4000, 8000, 16000, 32000, 60000];
  
  for (let i = 0; i <= 6; i++) {
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

      // For 429 and 5xx, retry with longer backoff
      if (response.status === 429) {
        console.warn(`Rate limited (429) on attempt ${i + 1}. Waiting ${delays[i] || 60000}ms...`);
        if (i >= 6) throw new Error(`HTTP 429: Too Many Requests. Sila tunggu sebentar atau guna API key lain.`);
        await new Promise((resolve) => setTimeout(resolve, delays[i] || 60000));
        continue;
      }

      // 503/500/502 = server overloaded/down. Retry ONCE quickly, then give up fast
      // with a clear OVERLOADED signal so the caller can switch to the next model in the cascade.
      if (response.status === 503 || response.status === 500 || response.status === 502) {
        console.warn(`Server ${response.status} (overloaded) on attempt ${i + 1} for model ${model}.`);
        if (i >= 1) throw new Error(`HTTP ${response.status}: MODEL_OVERLOADED`);
        await new Promise((resolve) => setTimeout(resolve, [1500, 2500][i] || 2000));
        continue;
      }

      throw new Error(`HTTP Error ${response.status}`);
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      if (error.message && /HTTP (400|401|403)/.test(error.message)) throw error;
      if (error.message && error.message.includes('429')) throw error; // 429 sudah retry loop
      if (error.message && error.message.includes('MODEL_OVERLOADED')) throw error; // let cascade switch model
      if (i === 6) throw error;
      await new Promise((resolve) => setTimeout(resolve, delays[i] || 2000));
    }
  }
};

// Try the image models in order; if one is overloaded (503), move to the next.
// Optionally start from a preferred model (e.g. user's sticky choice).
const callImageApiWithFallback = async (payload, isPredict = false, signal = null, preferredModel = null, onModelSwitch = null) => {
  const cascade = preferredModel
    ? [preferredModel, ...IMAGE_MODEL_CASCADE.filter((m) => m !== preferredModel)]
    : [...IMAGE_MODEL_CASCADE];
  let lastErr = null;
  for (let m = 0; m < cascade.length; m++) {
    const model = cascade[m];
    try {
      if (m > 0 && typeof onModelSwitch === 'function') onModelSwitch(model, m);
      return await callGeminiApi(model, payload, isPredict, signal);
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      lastErr = err;
      // Only fall through to the next model when the current one is overloaded/down.
      if (err.message && err.message.includes('MODEL_OVERLOADED')) {
        console.warn(`Model ${model} overloaded — switching to next in cascade.`);
        continue;
      }
      // Any other error (bad key, bad request, etc.) is not fixed by switching models.
      throw err;
    }
  }
  throw lastErr || new Error('Semua model imej Gemini sedang sibuk (503) sekarang. Ini masalah server Google, bukan API key atau baki anda. Cuba lagi dalam 1-2 minit, atau tukar model imej di tetapan.');
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
  const [hasAgreed, setHasAgreed] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('cinematic_pro');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [generationStep, setGenerationStep] = useState(0);
  const [generateHistory, setGenerateHistory] = useState([]);
  const t = (d, l) => (isDarkMode ? d : l);
  const [scrollPercent, setScrollPercent] = useState(0);
  const tabsContainerRef = useRef(null);

  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [regeneratingIndexes, setRegeneratingIndexes] = useState({});
  const [loadingText, setLoadingText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [progressStage, setProgressStage] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [generationStartTime, setGenerationStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [expectedTotalScenes, setExpectedTotalScenes] = useState(0);

  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [editableImagePrompt, setEditableImagePrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  // Sound alert toggle (persisted). Default ON.
  // Save draft — persist inputs to localStorage
  const saveDraft = () => {
    try {
      const draft = {
        cinematicTopic, cinematicDuration, cinematicStyle,
        microImpactTopic, narrativeArcTopic,
        thTopic, thDuration, thTone,
        smProduct, smDuration,
        gfTopic, gfDuration, gfStyle,
        productName, duration, category, energyLevel, aspectRatio,
        gender, hijabMode, ugcEnvironment, ugcAngle
      };
      localStorage.setItem('sb_draft', JSON.stringify(draft));
    } catch {}
  };
  const loadDraft = () => {
    try {
      const d = JSON.parse(localStorage.getItem('sb_draft') || '{}');
      if (d.cinematicTopic) setCinematicTopic(d.cinematicTopic);
      if (d.cinematicDuration) setCinematicDuration(d.cinematicDuration);
      if (d.microImpactTopic) setMicroImpactTopic(d.microImpactTopic);
      if (d.narrativeArcTopic) setNarrativeArcTopic(d.narrativeArcTopic);
      if (d.thTopic) setThTopic(d.thTopic);
      if (d.thDuration) setThDuration(d.thDuration);
      if (d.smProduct) setSmProduct(d.smProduct);
      if (d.gfTopic) setGfTopic(d.gfTopic);
      if (d.productName) setProductName(d.productName);
      if (d.duration) setDuration(d.duration);
      if (d.category) setCategory(d.category);
      if (d.gender) setGender(d.gender);
      if (d.aspectRatio) setAspectRatio(d.aspectRatio);
    } catch {}
  };

  // Keyboard shortcut modal state
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Copy all scenes
  const handleCopyAllScenes = () => {
    if (!generatedOutput?.scenes) return;
    const text = generatedOutput.scenes.map((s, i) =>
      `[Scene ${i+1} — ${s.timecode || ''}]
Visual: ${s.visual || ''}
Dialogue: ${s.dialogue || ''}
I2V: ${s.i2v_prompt || ''}`
    ).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      addToast('Semua scenes disalin!', 'success', 2000);
      playSound('click');
    }).catch(() => addToast('Copy gagal', 'error', 2000));
  };

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try { return localStorage.getItem('sound_alerts') !== 'off'; } catch { return true; }
  });
  // Stores which scene(s) were picked as keyframes + confidence, for UI display.
  const [keyframeInfo, setKeyframeInfo] = useState([]);
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
  const bgCanvasRef = useRef(null);
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
  const [fiFaceShape, setFiFaceShape] = useState('Slim V-shape face');
  const [fiSkinTone, setFiSkinTone] = useState('Malaysian Chinese fair porcelain');
  const [fiHair, setFiHair] = useState('Inner + shawl hijab modern');
  const [fiBodyType, setFiBodyType] = useState('Slim natural');
  const [fiSignature, setFiSignature] = useState('Soft smile');
  const [fiRealism, setFiRealism] = useState('TikTok UGC Natural MY');
  const [fiOutfit, setFiOutfit] = useState('Streetwear baggy tee + cargo');
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
  const [thTeleprompter, setThTeleprompter] = useState(false);
  const [narrativeGenre, setNarrativeGenre] = useState('emotional');
  const [ugcPrice, setUgcPrice] = useState('');
  const [gfBrandColor, setGfBrandColor] = useState('');
  const [gfDataInput, setGfDataInput] = useState('');
  const [microPunchCut, setMicroPunchCut] = useState(false);
  const [thSubtitleFormat, setThSubtitleFormat] = useState(false);
  const [smEasingMode, setSmEasingMode] = useState('ease-in-out');
  const [thAudience, setThAudience] = useState('');
  const [smProduct, setSmProduct] = useState('');
  const [smDuration, setSmDuration] = useState('10');
  const [smStyle, setSmStyle] = useState('premium');
  const [smAudience, setSmAudience] = useState('');
  const [gfTopic, setGfTopic] = useState('');
  const [gfDuration, setGfDuration] = useState('30');
  const [gfStyle, setGfStyle] = useState('auto');
  const [gfAudience, setGfAudience] = useState('');
  const [cinematicPlatform, setCinematicPlatform] = useState('TikTok');

  const [apiKey, setApiKey] = useState(getStoredApiKey);
  const [genfityKey, setGenfityKey] = useState(getStoredGenfityKey);
  const [textProvider, setTextProvider] = useState(getStoredTextProvider);
  const [generateMode, setGenerateMode] = useState(getStoredGenerateMode);
  const [keyframeMode, setKeyframeMode] = useState(getStoredKeyframeMode);
  const [timelineMode, setTimelineMode] = useState(getStoredTimelineMode);
  const [genfityModel, setGenfityModel] = useState(getStoredGenfityModel);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!getStoredApiKey());
  const [showProviderPanel, setShowProviderPanel] = useState(false);
  const [showApiKeyVisible, setShowApiKeyVisible] = useState(false);
  const [showGenfityKeyVisible, setShowGenfityKeyVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getStoredModel);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

const CHANGELOG = [
  {
    version: 'v2.1', date: '20 Jul 2026', isNew: true,
    changes: [
      '3D animated background — particle universe + glassmorphism orbs + mouse parallax',
      'License/agreement page removed — straight to app',
    ]
  },
  {
    version: 'v2.2', date: '21 Jul 2026', isNew: true,
    changes: [
      'Glassmorphism cards — backdrop-blur-xl pada semua card',
      'Gradient text headings — h2 & title pakai sky→cyan→emerald gradient',
      'Enhanced progress bar — gradient bar animated',
      'Branded loading animation — clapperboard icon + recording dot',
      'Image viewer upgrade — wheel zoom, arrow nav, keyboard support, image counter',
      'Micro-interactions — btn-shine glow sweep + pulse ring',
      'Empty state illustration — floating sparkles, guide text',
      'Toast notifications stlh generate — auto pop success toast',
    ]
  },
  {
    version: 'v2.0', date: '20 Jul 2026', isNew: false,
    changes: [
      'Dialog Re-Gen ikut durasi segment — 10s = max 25 words, 30s = max 75 words',
      'Watak tak lagi bercakap laju/rush untuk video pendek',
    ]
  },
  {
    version: 'v1.9', date: '20 Jul 2026', isNew: false,
    changes: [
      'Dialog/VO sync ke Segment Prompt — fix Windows line ending bug (\\r\\n)',
      'UGC + OOTD dialog save sync ke scenes array',
      'Semua tab dialog edit sekarang update segment prompt correctly',
    ]
  },
  {
    version: 'v1.8', date: '20 Jul 2026', isNew: false,
    changes: [
      'Biometric Face Lock Engine sentiasa enabled — no more toggle, always active',
      'Changelog floating button — version history dengan NEW badge',
      'Within-scene dialogue repetition rules — ban same sentence twice',
      'Improved AI prompts semua 8 tabs (platform context, pacing, Flow AI hints)',
    ]
  },
  {
    version: 'v1.7', date: '20 Jul 2026', isNew: false,
    changes: [
      'Improved AI prompts — all 8 tabs (platform context, pacing, sound design, Flow AI hints)',
      'Within-scene dialogue repetition rules (no more "Sumpah best gila. Sumpah best gila.")',
      'Auto tone detection when dialog edited — injects [TONE] tag into segment prompt',
      'Storyboard Timeline toggle — default OFF, Smart Keyframe default ON',
      'Screen orientation lock — screen faces user not camera',
      'Background/environment continuity anchor lock',
    ]
  },
  {
    version: 'v1.6', date: '20 Jul 2026', isNew: true,
    changes: [
      'UX improvements — sticky generate button, progress steps, tab descriptions',
      'Keyboard shortcuts: Ctrl+Enter generate, Esc cancel',
      'Mobile sidebar overlay, smooth dark mode transition',
      'Recent history (last 3 generates) in sidebar',
      'Sidebar collapsible layout (Layout A)',
      '2-row grouped tabs (Video / Image & Tools)',
    ]
  },
  {
    version: 'v1.5', date: '19 Jul 2026', isNew: false,
    changes: [
      'Dialog edit syncs to segment prompt — full prompt preserved',
      'Flow AI segment color highlights (amber=prompt, pink=dialog)',
      'Scene count sync fix — eliminates dialogue repair pass repetition',
      'esbuild regex fix — Vercel deployment restored',
    ]
  },
  {
    version: 'v1.4', date: '18 Jul 2026', isNew: false,
    changes: [
      'Flow AI segment donor logic — canvas-style, no dialogue modification',
      'Single image viewer with prev/next navigation',
      'Fake influencer tab — synthetic Malaysian persona generator',
      'Character sheet multi-layout (human, product, vehicle, animal, mascot)',
    ]
  },
];
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Sound effects (Web Audio API — no external files) — uses soundEnabled state from above
  const soundCtxRef = useRef(null);
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = soundCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      soundCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0.08;
      if (type === 'click') { osc.frequency.value = 600; osc.type = 'sine'; gain.gain.value = 0.04; osc.start(); osc.stop(ctx.currentTime + 0.05); }
      else if (type === 'success') { osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.06; osc.start(); setTimeout(() => { try { const o2 = ctx.createOscillator(); const g2 = ctx.createGain(); o2.connect(g2); g2.connect(ctx.destination); g2.gain.value = 0.06; o2.frequency.value = 659; o2.type = 'sine'; o2.start(); o2.stop(ctx.currentTime + 0.15); } catch {} }, 120); osc.stop(ctx.currentTime + 0.12); }
      else if (type === 'start') { osc.frequency.value = 440; osc.type = 'sine'; gain.gain.value = 0.05; osc.start(); osc.stop(ctx.currentTime + 0.08); }
      else if (type === 'error') { osc.frequency.value = 220; osc.type = 'square'; gain.gain.value = 0.03; osc.start(); osc.stop(ctx.currentTime + 0.2); }
      else { osc.frequency.value = 500; osc.type = 'sine'; osc.start(); osc.stop(ctx.currentTime + 0.06); }
    } catch {}
  };
  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try { localStorage.setItem('sound_alerts', next ? 'on' : 'off'); } catch {}
    if (next) playSound('click');
  };

  // Toast notifications
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // Scene detail modal
  const [sceneModal, setSceneModal] = useState(null); // { scene, imageUrl }

  // Lightbox navigation
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Generation history (localStorage, max 5 per tab)
  const [genHistory, setGenHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gen_history') || '{}'); } catch { return {}; }
  });
  const saveToHistory = (tabKey, outputData, imageUrlsData) => {
    setGenHistory(prev => {
      const tabHistory = prev[tabKey] || [];
      const entry = { timestamp: Date.now(), output: outputData, imageUrls: imageUrlsData.slice(0, 3) };
      const updated = [entry, ...tabHistory].slice(0, 5);
      const next = { ...prev, [tabKey]: updated };
      try { localStorage.setItem('gen_history', JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const [showHistory, setShowHistory] = useState(false);

  // Export PDF state
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Skeleton loading slots
  const [skeletonCount, setSkeletonCount] = useState(0);

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

  const handleKeyframeModeChange = (mode) => {
    setKeyframeMode(mode);
    try { localStorage.setItem('keyframe_mode', mode); } catch {}
  };
  const handleTimelineModeChange = (mode) => {
    setTimelineMode(mode);
    try { localStorage.setItem('timeline_mode', mode); } catch {}
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

  // Auto-detect reference sheet angles — scan once, reuse across all scenes
  const analyzeProductAngles = async (signal = null) => {
    const activeUploadData = getActiveUploadData();
    const activeProducts = (activeUploadData.products || []).filter((p) => p.base64);
    if (!activeProducts.length) return null;

    const parts = [{
      text: `You are a product reference sheet analyst. Look at the attached image carefully.
If this is a multi-angle reference sheet (character sheet / turnaround sheet), identify ALL the distinct angle panels visible.
Return ONLY a valid JSON object in this exact format:
{
  "is_sheet": true,
  "available_angles": ["FRONT", "BACK", "LEFT_SIDE", "RIGHT_SIDE", "TOP", "BOTTOM", "IN_HAND", "3Q_FRONT", "3Q_BACK"],
  "angle_notes": "brief note about what each angle shows"
}
If this is a single-angle photo (not a sheet), return:
{ "is_sheet": false, "available_angles": ["FRONT"], "angle_notes": "single image" }
Only include angles that are ACTUALLY visible. Use these exact labels: FRONT, BACK, LEFT_SIDE, RIGHT_SIDE, TOP, BOTTOM, IN_HAND, 3Q_FRONT, 3Q_BACK, LEFT_CONTROLS, RIGHT_CONTROLS.`
    }];

    activeProducts.forEach((p) => {
      parts.push({ inlineData: { mimeType: p.mimeType || 'image/jpeg', data: p.base64 } });
    });

    try {
      const payload = { contents: [{ role: 'user', parts }], generationConfig: { temperature: 0.1 } };
      const res = await callGeminiApi(selectedModel, payload, false, signal);
      const text = extractGeminiText(res).trim();
      const json = parseModelJson(text);
      return json && Array.isArray(json.available_angles) ? json : null;
    } catch { return null; }
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
      // Deduplicate repeated fillers in dialogue
      parsed.scenes = deduplicateDialogue(parsed.scenes);
      // Log repeated filler warning
      const allDialogue = parsed.scenes.map((s) => s.dialogue).filter(Boolean);
      const fillerCounts = countRepeatedFillers(allDialogue);
      const overused = Object.entries(fillerCounts).filter(([, c]) => c > Math.max(2, parsed.scenes.length));
      if (overused.length) {
        console.warn('⚠️ Dialogue fillers overused:', overused.map(([f, c]) => `${f}(${c})`).join(', '));
      }
            // CONTINUITY CHECK: detect repeated/dangling/dead-end dialogue and force a repair pass.
      // Critical for Flow AI segments so the story feels seamless across cuts.
      const continuity = verifyDialogueContinuity(parsed.scenes);
      if (!continuity.ok && !repairNote) {
        const issueList = continuity.issues.slice(0, 4).join('; ');
        throw new Error(`Dialog continuity issue: ${issueList}. Rewrite dialog supaya jalan cerita bersambung, tiada pengulangan, tiada soalan tergantung.`);
      }

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
        : " [MANDATORY PHYSICS: Flawless hand anatomy. ORIENTATION LOCK: All held objects, products, devices, screens, and text MUST be in correct upright orientation — NEVER mirrored, flipped, or upside down. Buttons, logos, and screens must face the viewer correctly. CONTROL LAYOUT LOCK: For any device with controls (gaming console, handheld, remote, controller), the button/joystick/D-pad layout MUST stay physically consistent and correct — LEFT-side controls stay on the LEFT, RIGHT-side controls stay on the RIGHT, never swapped or mirrored. The brand logo must read correctly (not reversed). When held by a person, the device is oriented the natural way a real user would hold it — not rotated 180 degrees, not upside down. Fingers grip the ergonomic grips naturally, thumbs rest on the correct top-facing controls.]";
      const bibleBlock = identityBible ? `\n${identityBible}\n` : '';
      const topicBlock = topicLock
        ? `\n[TOPIC LOCK — MANDATORY]: This image MUST visually represent: "${topicLock}". Do not replace with unrelated people or scenes.\n`
        : '';
      const hasBackgroundRef = activeBackgrounds.length > 0;
      const envLock = allowWhiteStudio
        ? ''
        : hasBackgroundRef
        ? `\n[BACKGROUND OVERRIDE — CRITICAL]: A BACKGROUND REFERENCE IMAGE is attached. You MUST use ONLY that location — ignore any environment description in the prompt that contradicts the reference image. The reference image defines the ONLY allowed space. Do NOT invent cafes, new rooms, outdoor areas, or any location not visible in the reference image.`
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
          parts[0].text += "\n\n[PRODUCT]: The human must hold/wear ONLY the product from the attached REFERENCE IMAGE (full rules are stated with the image itself).";
        }
        activeProducts.forEach((p, indexSlot) => {
          parts.push({ text: `=== PRODUCT REFERENCE IMAGE ${indexSlot + 1} — STRICT COPY RULES ===\n STEP 1: Identify which angle this scene needs (front/back/side/in-hand) from the scene description.\nSTEP 2: Find the MATCHING labelled panel in this reference sheet.\nSTEP 3: Copy the product from THAT panel ONLY — zero mixing between panels.\nHARD RULES:\n- FRONT panel = screen + front buttons visible. ZERO rear vents, ZERO rear logo.\n- BACK panel = rear casing + vents + rear logo ONLY. ZERO screen, ZERO thumbsticks, ZERO face buttons.\n- LEFT CONTROLS = left-side buttons only. RIGHT CONTROLS = right-side only. Never swap left/right.\n- Button/stick positions must match reference EXACTLY — never mirror or rearrange.\n- Screen faces the PERSON holding it. Back faces the camera. NEVER show screen facing camera while person uses device.\n- Real-world scale: device proportional to hands/body. Never oversized.\n- No extras: zero props not in reference image.\nREMEMBER: A real photograph can only show ONE side at a time.` });
          parts.push({ inlineData: { mimeType: p.mimeType || "image/jpeg", data: p.base64 } });
        });
      }

      if (activeTab !== 'character' && activeBackgrounds.length > 0) {
        // Keep this instruction ATTACHED to the background image rather than appending it
        // to the giant parts[0] text block. In multimodal prompts an instruction that sits
        // right beside the image it refers to is followed far more reliably than one buried
        // hundreds of words earlier.
        parts[0].text += "\n\n[ENVIRONMENT]: Use the attached BACKGROUND REFERENCE as the sole location (details are stated with the image itself).";
        activeBackgrounds.forEach((b, indexSlot) => {
          parts.push({ text: `=== BACKGROUND / ENVIRONMENT REFERENCE ${indexSlot + 1} ===\n[NO-INVENTION RULE — CRITICAL ENVIRONMENT BACKGROUND LOCK]\n[THIS IMAGE IS THE ENTIRE WORLD OF THE SCENE]: Use ONLY this room/location. A different camera angle means re-framing INSIDE this same space — never a different place. Do NOT add windows, doors, hallways, furniture, decor, plants, or posters that are not visible in this image. If the framing would run past what this image shows, fall back to plain wall, soft shadow, or shallow depth-of-field blur instead of inventing new detail. Keep wall colour, floor material, light direction, and time of day exactly as shown, in every scene.` });
          parts.push({ inlineData: { mimeType: b.mimeType || "image/jpeg", data: b.base64 } });
        });
      }

      if (hasContinuity) {
        const mimeType = continuityDataUrl.substring(continuityDataUrl.indexOf(':') + 1, continuityDataUrl.indexOf(';'));
        const base64Data = continuityDataUrl.split(',')[1];
        parts[0].text += motionGraphicsMode
          ? "\n\n[CONTINUITY ANCHOR — GRAFIX]: Match the SAME motion-graphics style, color palette, type treatment, and topic branding as the CONTINUITY FRAME. New scene layout/animation pose is OK; do not switch to unrelated live-action people."
          : "\n\n[CONTINUITY ANCHOR]: Match the SAME person, face, wardrobe, product, color grade, AND background environment/location as the CONTINUITY FRAME. Keep the same room, lighting, props, and setting. Only change camera angle/pose/action as requested.";
        parts.push({ text: motionGraphicsMode ? "=== CONTINUITY FRAME (STYLE LOCK) ===" : "=== CONTINUITY FRAME (HERO LOCK) ===" });
        parts.push({ inlineData: { mimeType: mimeType || 'image/jpeg', data: base64Data } });
      }

      if (isGuided) {
        const payload = {
          contents: [{ role: 'user', parts }],
          generationConfig: { responseModalities: ['IMAGE'] }
        };
        const data = await callImageApiWithFallback(payload, false, signal, getStoredImageModel(), (nm) => setLoadingText(`Model sibuk, tukar ke ${nm}...`));
        const newBase64 = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        if (!newBase64) throw new Error('Gemini Image Model did not return an image.');
        return `data:image/jpeg;base64,${newBase64}`;
      } else {
        const payload = {
          contents: [{ role: 'user', parts }],
          generationConfig: { responseModalities: ['IMAGE'] }
        };
        const data = await callImageApiWithFallback(payload, false, signal, getStoredImageModel(), (nm) => setLoadingText(`Model sibuk, tukar ke ${nm}...`));
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

  // Keyboard shortcuts: Ctrl+Enter = Generate, Escape = Cancel
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        setShowShortcuts(prev => !prev);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
        addToast('Draft disimpan!', 'success', 2000);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isGeneratingAll && !isGeneratingImage) {
          if (['cinematic_pro','microimpact','narrativearc','talkinghead','stopmotion','grafix','ugc'].includes(activeTab)) {
            generateNewMode(activeTab);
          } else {
            generateAllContent();
          }
        }
      }
      if (e.key === 'Escape' && (isGeneratingAll || isGeneratingImage)) {
        cancelAllGenerations();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isGeneratingAll, isGeneratingImage, activeTab]);

  // 3D Particle Universe + Mouse Parallax Background
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    const PARTICLE_COUNT = 80;
    const CONNECT_DIST = 120;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouse);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mxRatio = (mouseX - canvas.width / 2) / canvas.width;
      const myRatio = (mouseY - canvas.height / 2) / canvas.height;

      particles.forEach(p => {
        p.x += p.vx + mxRatio * 0.3;
        p.y += p.vy + myRatio * 0.3;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  const handleTabChange = (tab) => {
    if (activeTab === tab) return;

    setTabCache(prev => ({
      ...prev,
      [activeTab]: {
        generatedOutput,
        imageUrls,
        editableImagePrompt,
        currentDisplayRatio,
        aspectRatio,
        editedValues,
        editModes,
        zoomedImages,
        showMagicBox,
        magicPrompts
      }
    }));

    cancelAllGenerations();
    setActiveTab(tab);

    setCopiedSection('');
    setErrorMessage('');

    const cached = tabCache[tab];
    if (cached) {
      setGeneratedOutput(cached.generatedOutput);
      setImageUrls(cached.imageUrls);
      setEditableImagePrompt(cached.editableImagePrompt);
      setCurrentDisplayRatio(cached.currentDisplayRatio);
      setAspectRatio(cached.aspectRatio);
      setBoxEdits(cached.editedValues || {});
      setEditModes(cached.editModes || {});
      setZoomedImages(cached.zoomedImages || {});
      setShowMagicBox(cached.showMagicBox || {});
      setMagicPrompts(cached.magicPrompts || {});
    } else {
      setGeneratedOutput(null);
      setImageUrls([]);
      setEditableImagePrompt('');
      setCurrentDisplayRatio(null);
      setBoxEdits({});
      setEditModes({});
      setZoomedImages({});
      setShowMagicBox({});
      setMagicPrompts({});

      if (tab === 'character') {
        setAspectRatio('16:9');
      } else {
        setAspectRatio('9:16');
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetTab = () => {
    setGeneratedOutput(null);
    setImageUrls([]);
    setEditableImagePrompt('');
    setCurrentDisplayRatio(null);
    setBoxEdits({});
    setEditModes({});
    setZoomedImages({});
    setShowMagicBox({});
    setMagicPrompts({});
    setTabCache(prev => {
      const next = { ...prev };
      delete next[activeTab];
      return next;
    });
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
    setGenerationStartTime(Date.now());
    setElapsedSeconds(0);
    setProgressStage(0);
    setProgressPercent(0);

    const activeRatio = overrideRatio || aspectRatio;
    setCurrentDisplayRatio(activeRatio);
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;
    const {
      identityBible = '',
      useContinuity = true,
      concurrency = 2,
      negatives = null,
      motionGraphicsMode = false,
      topicLock = '',
      keyframeScenes = [],
      keyframeDurationSec = 0
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

      // Storyboard Timeline controls scene image generation:
      // Timeline ON = generate all scenes (full storyboard images)
      // Timeline OFF (default) = defer to Smart Keyframe, which now has 3 modes:
      //   'on'      = 1 smart-picked keyframe (best face+product shot, not always scene 1)
      //   'segment' = 1 keyframe per Flow AI segment (better continuity for 30s+ videos)
      //   'off'     = 0 images (text prompts only for Flow AI)
      if (timelineMode !== 'on' && !isRegenerate && promptsToRun.length > 1) {
        const sceneList = Array.isArray(keyframeScenes) ? keyframeScenes : [];
        if (keyframeMode === 'on') {
          // Pick the single best identity-anchor scene instead of blindly using index 0.
          const pick = sceneList.length ? pickBestKeyframe(sceneList) : { index: 0, confidence: 0, reason: 'scene 1' };
          const safeIdx = Math.min(pick.index, promptsToRun.length - 1);
          promptsToRun = [promptsToRun[safeIdx]];
          runLimit = 1;
          setKeyframeInfo([{ scene: safeIdx + 1, confidence: pick.confidence, reason: pick.reason }]);
          setLoadingText(`Smart Keyframe: Scene ${safeIdx + 1} picked (${pick.confidence}% confidence — ${pick.reason})...`);
        } else if (keyframeMode === 'segment') {
          // One keyframe per Flow segment window so each 10s block has its own anchor.
          const totalSec = keyframeDurationSec > 0 ? keyframeDurationSec : (sceneList.length > 0 ? sceneList.length * 2.5 : 30);
          const idxs = sceneList.length
            ? pickKeyframeIndicesPerSegment(sceneList, totalSec, 10)
            : [0];
          const safeIdxs = [...new Set(idxs.map((x) => Math.min(x, promptsToRun.length - 1)))];
          promptsToRun = safeIdxs.map((x) => promptsToRun[x]);
          runLimit = promptsToRun.length;
          // Capture per-keyframe confidence for the UI.
          const perSeg = Math.ceil(sceneList.length / Math.max(1, safeIdxs.length));
          setKeyframeInfo(safeIdxs.map((idx, seg) => {
            const startIdx = seg * perSeg;
            const slice = sceneList.slice(startIdx, Math.min(startIdx + perSeg, sceneList.length));
            const pk = slice.length ? pickBestKeyframe(slice) : { confidence: 0, reason: '' };
            return { scene: idx + 1, segment: seg + 1, confidence: pk.confidence, reason: pk.reason };
          }));
          setLoadingText(`Smart Keyframe (per-segment): ${runLimit} keyframes — one per 10s block, rest = text prompts...`);
        } else {
          promptsToRun = [];
          runLimit = 0;
          setKeyframeInfo([]);
          setLoadingText('Text-only: No scene images (enable Smart Keyframe or Storyboard Timeline)...');
        }
      }

      // Early exit if no images to generate
      if (runLimit === 0 || promptsToRun.length === 0) {
        setImageUrls([]);
        setIsGeneratingImage(false);
        return;
      }

      const results = new Array(runLimit).fill(null);
      let lastImageError = null;
      let completed = 0;
      const bumpProgress = () => {
        completed += 1;
        setProgressPercent(Math.round((completed / runLimit) * 100));
        setProgressStage(2);
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
          playDoneSound();
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 3500);
        }
      }
      mainAbortController.current = null;
    }
  };

  const regenerateSingleVisual = async (index) => {
    playSound('start');
    setRegeneratingIndexes(prev => ({ ...prev, [index]: true }));
    gridAbortControllers.current[index] = new AbortController();

    const lockedRatio = currentDisplayRatio || aspectRatio;
    const uniqueSeed = `[Variation Seed: ${Date.now() + index}]`;
    const stabilitySuffix = "[MANDATORY: KEEP THE PERSON AND FACE EXACTLY THE SAME AS THE REFERENCE].";
    const identityBible = generatedOutput?.identityBible || '';
    const allowWhite = activeTab === 'character' || (activeTab === 'fake_influencer' && String(fiFormat || '').includes('Character Sheet'));
    const envRegen = allowWhite
      ? ''
      : ' Keep the same detailed environment/location (NOT plain white background). [SAME-SPACE RULE]: This is a NEW CAMERA ANGLE of the SAME location already established — not a new place. Re-frame within the exact room/set from the BACKGROUND REFERENCE and previous scenes. Do NOT invent walls, windows, doors, furniture, or decor that were not already visible. If the new angle would look past what the reference shows, use plain wall, soft shadow, or shallow depth-of-field blur instead of inventing detail. Keep wall colour, floor, lighting direction, and time of day identical.';
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
        const prompt = `${basePromptForRegen}. ${uniqueSeed} [Alternative camera angle. ${stabilitySuffix}]${envRegen}${identityBible ? `\n${identityBible}` : ''} Ultra-sharp 2K resolution, no blur, no grain, crisp commercial quality.`;

        const newImgUrl = await fetchSingleImage(prompt, lockedRatio, gridAbortControllers.current[index].signal, index, {
          identityBible, continuityDataUrl,
          negative: withEnvNegative(DEFAULT_NEGATIVE, allowWhite), topicLock
        });
        if (newImgUrl) {
          setImageUrls(prev => { const u = [...prev]; u[index] = newImgUrl; return u; });
        }
      }
      playDoneSound();
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

    playSound('start');
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

      const data = await callImageApiWithFallback(payload, false, gridAbortControllers.current[index].signal, getStoredImageModel(), (nm) => setLoadingText(`Model sibuk, tukar ke ${nm}...`));
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
      platformCallOut = "Korang kena dapatkan cepat sebelum sold out teruk! 🔥🔥";
    } else if (platform === 'Reels') {
      platformHashtags = `#ExplorePage #ReelsInstagram #ReelsMalaysia #${activeTab === 'ootd' ? 'InstaFashion #OOTDReels' : 'InstagramReview #ViralMalaysia'}`;
      platformCallOut = "Boleh check out dekat link bio I sekarang okay! ?";
    } else {
      platformHashtags = `#RacunAesthetic #${activeTab === 'ootd' ? 'OOTDStyle' : 'ProductReview'}`;
      platformCallOut = "Link pembelian ada dekat ruangan yang disediakan ya! ?";
    }

    const captionTemplates = [
      `Sumpah I tak menyesal langsung beli ${pName} ni! 🔥 Kualiti dia memang premium habis weh!`,
      `Akhirnya dapat pun try ${pName} yang tengah viral gila tu! Memang berbaloi gila 🔥`,
      `Racun aesthetic kalini: ${pName}. Korang dah grab ke belum? Sila cepat weh sebelum kehabisan stock! 🔥🔥`
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
    playSound('start');
    setSidebarOpen(false);
    setGeneratedOutput(null);
    setImageUrls([]);
    setShowMagicBox({});
    setMagicPrompts({});
    setGenerationStep(0);
    setBoxEdits({});
    setEditModes({});
    setLoadingText('Analyzing assets & constructing storyboard architecture...');
    setGenerationStartTime(Date.now());
    setElapsedSeconds(0);
    setProgressStage(0);
    setProgressPercent(0);
    setExpectedTotalScenes(0);

    const activeUploadData = getActiveUploadData();
    const refCount = (activeUploadData.products || []).filter(p => p.base64).length;
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;

    try {
      let assetAnalysis = '';
      let productAngles = null;
      const hasFace = activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64;
      const hasBackgrounds = activeUploadData.backgrounds && activeUploadData.backgrounds.length > 0;
      
      if (refCount > 0 || hasFace || hasBackgrounds) {
        setLoadingText('Absorbing visual data from reference images...');
        setGenerationStep(1);
        try {
          assetAnalysis = await analyzeReferenceAssets(signal);
          productAngles = await analyzeProductAngles(signal).catch(() => null);
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
        grafix: gfTopic,
        ugc: productName
      };
      const durationByMode = {
        cinematic_pro: cinematicDuration,
        microimpact: '10',
        narrativearc: '30',
        talkinghead: thDuration,
        ugc: duration,
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
      setExpectedTotalScenes(expectedCount);
      setProgressStage(0);
      let promptText = '';
      if (mode === 'cinematic_pro') promptText = getCinematicStoryboardPrompt(cinematicTopic, cinematicDuration, cinematicStyle, aspectRatio, cinematicAudience, refCount, identityBible, assetAnalysis, cinematicPlatform);
      else if (mode === 'microimpact') promptText = getMicroImpactPrompt(microImpactTopic, aspectRatio, microImpactAudience, refCount, identityBible, assetAnalysis, microPunchCut);
      else if (mode === 'narrativearc') promptText = getNarrativeArcPrompt(narrativeArcTopic, aspectRatio, narrativeArcAudience, refCount, identityBible, assetAnalysis, narrativeGenre);
      else if (mode === 'talkinghead') promptText = getTalkingHeadPrompt(thTopic, thDuration, thTone, aspectRatio, thAudience, refCount, identityBible, assetAnalysis, thTeleprompter, thSubtitleFormat);
      else if (mode === 'stopmotion') promptText = getStopMotionPrompt(smProduct, smDuration, smStyle, aspectRatio, smAudience, refCount, identityBible, assetAnalysis, smEasingMode);
      else if (mode === 'grafix') promptText = getGrafixPrompt(topicText, gfDuration, aspectRatio, gfStyle, gfAudience, refCount, identityBible, assetAnalysis, gfBrandColor, gfDataInput);
      else if (mode === 'ugc') promptText = getUgcStoryboardPrompt(productName.trim(), duration, category, ugcEnvironment, gender, hijabMode, ugcAngle, refCount, identityBible, assetAnalysis, ugcPrice);

      setLoadingText(isGrafix ? 'Generating Grafix framework series...' : 'Building JSON sequence array...');
      setGenerationStep(2);
      setProgressStage(1);
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
          : `🎬 ${topicText}`;
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

      // OMNI FLASH: force time-coded i2v_prompt (test on cinematic_pro tab only for now)
      if (mode === 'cinematic_pro') {
        parsed.scenes = parsed.scenes.map((s) => ({ ...s, i2v_prompt: toTimeCodedI2V(s) }));
      }

      const sceneLines = parsed.scenes.map((s, idx) => {
        const num = s.scene_num || (idx + 1);
        return `[ADENGAN ${num}] ${s.timecode || ''}\nVISUAL: ${s.visual}\nKAMERA: ${s.camera}\nAKSI: ${s.action}\nEMOSI: ${s.emotion}\nDIALOG: "${s.dialogue}"\nIMAGE_PROMPT: ${s.image_prompt}\nI2V: ${s.i2v_prompt}\nNEGATIVE: ${s.negative}`;
      }).join('\n\n');

      const continuityLine = isGrafix
        ? `CONTINUITY: Same motion-graphics style, palette, and TOPIC ("${topicText}") across ALL scenes. No random influencer faces.`
        : 'CONTINUITY: Same character/product identity across ALL scenes.';

      const vp = `TITLE: ${parsed.title || (isGrafix ? `🎬 ${topicText}` : 'Papan Cerita Storyboard')}\nTOPIC: ${topicText}\nDURATION: ${lockedSec}s | FORMAT: ${aspectRatio}\nSTYLE: ${parsed.style || styleByMode[mode] || 'Cinematic'}\n\n${finalBible}\n\n${sceneLines}\n\n${continuityLine}`;

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
        const angleNote = s.angle_used ? `[USE PANEL: ${s.angle_used} — copy product ONLY from this panel in the reference sheet. Do not mix with other panels.]` : '';
        return [base, angleNote, `TOPIC: ${topicText}`, `Aspect ${aspectRatio}.`, `NO plain white background.`, finalBible].filter(Boolean).join('\n');
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
      addToast('Storyboard siap dijana!', 'success', 4000);
      playSound('success');
      setSidebarOpen(false);
      setGenerateHistory(prev => [{ tab: activeTab, topic: cinematicTopic || productName || thTopic || gfTopic || smProduct || narrativeArcTopic || characterName || fiName, timestamp: Date.now() }, ...prev.slice(0, 4)]);
      setEditableImagePrompt(imagePrompts);
      setBoxEdits({
        videoPrompt: vp,
        caption: parsed.title || topicText || 'Storyboard',
        script: parsed.scenes.map((s, idx) => `[Adegan ${s.scene_num || (idx + 1)}]: "${s.dialogue || ''}"`).join('\n\n'),
        identityBible: finalBible
      });
      setCurrentDisplayRatio(aspectRatio);
      setGenerationStep(3);
      await generateVisual(imagePrompts, false, aspectRatio, imagePrompts.length, {
        identityBible: finalBible,
        useContinuity: true,
        concurrency: 2,
        negatives,
        motionGraphicsMode: isGrafix,
        topicLock: topicText || '',
        keyframeScenes: parsed.scenes || [],
        keyframeDurationSec: lockedSec || 0
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        const msg = String(err.message || 'Unknown network error.');
        const friendly = 'Failed to construct architecture: ' + msg;
        setErrorMessage(friendly);
        playSound('error');
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
    playSound('start');
    setSidebarOpen(false);
    setGeneratedOutput(null);
    setImageUrls([]);
    setZoomedImages({});
    setShowMagicBox({});
    setMagicPrompts({});
    setBoxEdits({});
    setEditModes({});
    setLoadingText(activeTab === 'ugc' ? 'Mapping UGC sequence architecture...' : 'Generating premium visual assets...');
    setGenerationStartTime(Date.now());
    setElapsedSeconds(0);
    setProgressStage(0);
    setProgressPercent(0);
    setExpectedTotalScenes(0);
    mainAbortController.current = new AbortController();
    const signal = mainAbortController.current.signal;

    try {
      let result = {};
      let promptInputForAI = "";
      let identityBible = '';
      let assetAnalysis = '';
      let productAngles = null;

      const activeProducts = (activeUploadData.products || []).filter(p => p.base64);
      const activeBackgrounds = (activeUploadData.backgrounds || []).filter(b => b.base64);
      const displayCategory = activeTab === 'ootd' ? 'Outfit' : category;
      // When the user uploads a product image but doesn't type a name, we used to send
      // "This Product" plus whatever the category dropdown happened to be (default
      // 'Skincare'), so a gadget upload produced a skincare script. The uploaded image is
      // the real source of truth, so say so explicitly instead of guessing.
      const hasProductRef = activeProducts.length > 0;
      const userNamedProduct = productName.trim();
      const safeProductName = userNamedProduct || (hasProductRef ? "the product shown in the attached reference image" : displayCategory);
      // Only trust the category dropdown when the user actually named the product.
      // Otherwise the reference image + its analysis decides what this thing is.
      const effectiveCategory = (hasProductRef && !userNamedProduct)
        ? 'IDENTIFY FROM REFERENCE IMAGE (ignore any preset category — the uploaded image and its analysis define what this product actually is; write all dialogue, scenes, and benefits for THAT product type)'
        : displayCategory;

      if (activeProducts.length > 0 || (activeUploadData.useCustomFace && activeUploadData.uploadedFaceBase64) || activeBackgrounds.length > 0) {
        setLoadingText('Extracting features from reference images...');
        try {
          assetAnalysis = await analyzeReferenceAssets(signal);
          productAngles = await analyzeProductAngles(signal).catch(() => null);
        } catch (analyzeErr) {
          if (analyzeErr.name === 'AbortError') throw analyzeErr;
          console.warn('Reference analysis skipped:', analyzeErr);
        }
      }

      identityBible = buildIdentityBible({
        mode: activeTab,
        productName: safeProductName,
        category: effectiveCategory,
        gender,
        hijabMode,
        environment: activeTab === 'ugc' ? ugcEnvironment : (activeTab === 'ootd' ? location : productBackground),
        style: activeTab === 'ootd' ? style : energyLevel,
        assetAnalysis
      });
      // Append available angles to identityBible if product sheet detected
      if (productAngles && productAngles.is_sheet && productAngles.available_angles?.length) {
        const angleList = productAngles.available_angles.join(', ');
        identityBible += `\n\n[PRODUCT REFERENCE SHEET — AVAILABLE ANGLES]\nThis reference sheet contains these labelled panels: ${angleList}.\nFor EACH scene, pick the ONE angle that matches the scene's camera/action, declare it as "angle_used" in the JSON, and copy the product ONLY from that panel.\nAngles: ${productAngles.angle_notes || ''}`;
      }
      result.identityBible = identityBible;
      result.assetAnalysis = assetAnalysis;
      result.productAngles = productAngles;

      const anatomyLock = "Correct human anatomy, No extra fingers.";
      const isModelActive = activeTab === 'product' ? productPOVMode === 'With Model' : true;
      let framingPrompt = getFramingPrompt(aspectRatio, isModelActive);
      const hdModifier = "4K HD, ultra-sharp 2K resolution, crisp edges, no blur, no pixelation, photorealistic commercial quality, pin-sharp focus throughout.";
      let cleanImageInstruction = activeTab === 'character'
        ? (charSubjectType === 'PRODUCT_CHARACTER'
            ? " [PRODUCT CHARACTER SHEET: clean white/soft studio background. Short panel captions (view names) ARE allowed and wanted above each panel; no other text overlay or watermark.]"
            : " [CHARACTER SHEET: clean white/soft studio background OK. No text overlay.]")
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
        const productTotalSec = parseDurationToSeconds(duration) || 10;
        const expectedCount = productTotalSec <= 10 ? 3 : productTotalSec <= 20 ? 5 : productTotalSec <= 30 ? 7 : 9;
        const promptText = getProductPOVPrompt(
          safeProductName, duration, effectiveCategory,
          productBackground, gender, hijabMode,
          productNarration, productPOVMode,
          activeProducts.length, identityBible, assetAnalysis
        );
        setLoadingText('Generating Product POV storyboard...');
        const parsed = await fetchStoryboardJson(promptText, expectedCount, signal);
        const locked = lockScenesToDuration(parsed.scenes || [], productTotalSec);
        locked.forEach(s => { s.i2v_prompt = toTimeCodedI2V(s); });
        result.scenes = locked;
        result.productScenes = locked;
        result.videoPrompt = locked.map(s => s.i2v_prompt).join('\n\n');
        result.script = locked.map((s, i) => `[Scene ${i+1}]: ${s.dialogue || '(visual)'}`).join('\n');
        result.caption = getCaptionAndHashtags();
        result.duration = `${productTotalSec}s`;
        result.selectedDurationSec = productTotalSec;
        promptInputForAI = locked.map(s => s.image_prompt || s.visual || '');
        const finalBible = buildIdentityBible({ mode: 'product', productName: safeProductName, category: effectiveCategory, gender, hijabMode, environment: productBackground, style: energyLevel, assetAnalysis });
        const negatives = locked.map(s => withEnvNegative(s.negative || DEFAULT_NEGATIVE, false));
        await generateVisual(promptInputForAI, false, aspectRatio, locked.length, {
          identityBible: finalBible, useContinuity: true, concurrency: 2, negatives,
          keyframeScenes: locked, keyframeDurationSec: productTotalSec
        });
        setIsGeneratingAll(false);
        return;
      }
      else if (activeTab === 'ootd') {
        const ootdTotalSec = parseDurationToSeconds(duration) || 10;
        const expectedCount = ootdTotalSec <= 10 ? 4 : ootdTotalSec <= 20 ? 6 : ootdTotalSec <= 30 ? 8 : 10;
        const promptText = getOotdStoryboardPrompt(
          safeProductName, duration, style, location,
          gender, hijabMode, mirrorMode, ootdNarration,
          activeProducts.length, identityBible, assetAnalysis
        );
        setLoadingText('Generating OOTD storyboard...');
        const parsed = await fetchStoryboardJson(promptText, expectedCount, signal);
        const locked = lockScenesToDuration(parsed.scenes || [], ootdTotalSec);
        locked.forEach(s => { s.i2v_prompt = toTimeCodedI2V(s); });
        result.scenes = locked;
        result.ootdScenes = locked;
        result.videoPrompt = locked.map(s => s.i2v_prompt).join('\n\n');
        result.script = locked.map((s, i) => `[Scene ${i+1}]: ${s.dialogue || '(visual)'}`).join('\n');
        result.caption = getCaptionAndHashtags();
        result.duration = `${ootdTotalSec}s`;
        result.selectedDurationSec = ootdTotalSec;
        promptInputForAI = locked.map(s => s.image_prompt || s.visual || '');
        const finalBible = buildIdentityBible({ mode: 'ootd', productName: safeProductName, category: effectiveCategory, gender, hijabMode, environment: location, style, assetAnalysis });
        const negatives = locked.map(s => withEnvNegative(s.negative || DEFAULT_NEGATIVE, false));
        await generateVisual(promptInputForAI, false, aspectRatio, locked.length, {
          identityBible: finalBible, useContinuity: true, concurrency: 2, negatives,
          keyframeScenes: locked, keyframeDurationSec: ootdTotalSec
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
          formatSpecificPrompt = `Malaysia affiliate content creator pose: natural confident stance, hands free (no product), genuine smile, direct eye contact with camera, UGC creator energy.`;
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
[HANDS FREE]: Do NOT place any product, bottle, box, or object in the model's hands. Natural pose only — hands relaxed at sides, on hip, or gesturing naturally.
Realism mode: ${fiRealism || 'TikTok UGC Natural MY'}.

[FASHION DIRECTION — PROFESSIONAL STYLIST EYE]
You are a professional fashion photographer and stylist. The outfit is: ${fiOutfit}.
COLOUR RULE: Extract the dominant colour palette from the outfit description. All clothing pieces must be colour-coordinated and harmonious — no clashing tones. Dark outfits stay dark (no random bright patches). Accessories, shoes, and bag (if visible) must complement the outfit palette.
STYLING RULE: Clothes must fit well — no baggy ill-fitting silhouette unless it is intentional (e.g. oversized streetwear). Fabric must drape naturally. No wrinkled or crumpled fabric unless styled intentionally.
POSE: Natural, confident, editorial-quality pose. Not stiff. Not awkward. Fashion-forward body language.

[REALISM / QUALITY]
${combinedRules}
Photoreal, commercial UGC quality, tropical Malaysia ambient light. Ultra-sharp 2K resolution, pin-sharp focus, zero blur, zero grain, zero pixelation, crisp skin texture and fabric detail.

${sanitizedCustomPrompt}
${aspectStr}`;

        const strictNegativePrompt = [
          'anime, CGI, plastic skin, doll face, warped fingers, extra limbs',
          'Korean idol clone, Western fashion model default, Indonesian-only stereotype',
          'celebrity lookalike, watermark, text overlay, logo',
          'over-smoothed beauty filter, uncanny valley',
          'holding product, holding bottle, holding box, holding device, product in hand, item in hand',
          'blurry, out of focus, soft focus, low resolution, pixelated, grainy, noisy, jpeg artifacts, watermark, overexposed, underexposed',
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

      result.cta = `🛒 Klik beg kuning di bawah untuk dapatkan sekarang! 🔥🔥`;
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
      addToast('Storyboard siap dijana!', 'success', 4000);
      playSound('success');
      setSidebarOpen(false);
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
      setExpectedTotalScenes(imgCount);
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
          concurrency: 2,
          negatives: allowWhite ? [DEFAULT_NEGATIVE] : [withEnvNegative(DEFAULT_NEGATIVE, false)],
        topicLock: activeTab === 'character' ? '' : (safeProductName || productName || ''),
        keyframeScenes: [],
        keyframeDurationSec: parseInt(duration) || 30
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

  const getDownloadName = () => {
    // Try to get a meaningful name from generated output or active tab fields
    const fromOutput = generatedOutput?.topic || generatedOutput?.title || '';
    if (fromOutput) return fromOutput.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim().slice(0, 60);
    
    const nameByTab = {
      cinematic_pro: cinematicTopic,
      microimpact: microImpactTopic,
      narrativearc: narrativeArcTopic,
      talkinghead: thTopic,
      product: productName,
      ootd: productName,
      ugc: productName,
      stopmotion: smProduct,
      grafix: gfTopic,
      character: characterName,
      fake_influencer: fiName
    };
    const name = nameByTab[activeTab] || '';
    return name.replace(/[^a-zA-Z0-9\s\-_]/g, '').trim().slice(0, 60);
  };

  const handleDownloadHD = async (url, index, resolution = '4k') => {
    if (!url) return;
    const baseName = getDownloadName() || 'Storyboard_Studio';
    const safeName = baseName.replace(/\s+/g, '_').toLowerCase();
    // 4K = 3840px, 2K = 1920px (good enough for Flow AI video generation)
    const is2k = resolution === '2k';
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const activeRatio = currentDisplayRatio || aspectRatio;
        let targetWidth = is2k ? 1920 : 3840;
        let targetHeight = is2k ? 1920 : 3840;

        if (activeRatio === '9:16') {
          targetWidth = is2k ? 1080 : 2160;
          targetHeight = is2k ? 1920 : 3840;
        } else if (activeRatio === '16:9') {
          targetWidth = is2k ? 1920 : 3840;
          targetHeight = is2k ? 1080 : 2160;
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
          link.download = `${safeName}_${index + 1}.png`;
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
    // Sync UGC scene dialogue → update editedValues.scenes array
    const ugcDlgMatch = sectionId.match(/^ugc_scene_(\d+)_dialogue$/);
    if (ugcDlgMatch) {
      const idx = parseInt(ugcDlgMatch[1]);
      const newDialogue = editedValues[sectionId] || '';
      setBoxEdits(prev => {
        const scenes = [...(prev.scenes || generatedOutput?.scenes || [])];
        if (scenes[idx]) {
          scenes[idx] = { ...scenes[idx], dialogue: newDialogue };
        }
        return { ...prev, scenes };
      });
    }

    // Sync OOTD scene dialogue → update editedValues.ootdScenes array
    const ootdDlgMatch = sectionId.match(/^ootd_scene_(\d+)_dialogue$/);
    if (ootdDlgMatch) {
      const idx = parseInt(ootdDlgMatch[1]);
      const newDialogue = editedValues[sectionId] || '';
      setBoxEdits(prev => {
        const scenes = [...(prev.ootdScenes || generatedOutput?.ootdScenes || [])];
        if (scenes[idx]) {
          scenes[idx] = { ...scenes[idx], script: newDialogue };
        }
        return { ...prev, ootdScenes: scenes };
      });
    }

    // Sync dialogue edit → segment prompt (update DIALOGUE (BM) block + auto tone detection)
    const dlgMatch = sectionId.match(/^flow_seg_dialogue_(\d+)$/);
    if (dlgMatch) {
      const idx = dlgMatch[1];
      const promptKey = `flow_seg_prompt_${idx}`;
      const newDialogue = editedValues[sectionId] || '';
      // Build flow segments to get original prompt + scene context for tone detection
      const totalSec = parseDurationToSeconds(generatedOutput?.selectedDurationSec || generatedOutput?.duration) || getSelectedDurationSeconds();
      const normScenes = collectScenesForFlow();
      const fallbackScenes = normScenes.length ? normScenes : [{
        scene_num: 1, timecode: `0s–${totalSec}s`,
        visual: editedValues.videoPrompt || generatedOutput?.videoPrompt || editableImagePrompt || '',
        dialogue: editedValues.script || generatedOutput?.script || '',
        i2v_prompt: ''
      }];
      const segs = generateFlowSegments(fallbackScenes, String(totalSec), {
        identityBible: generatedOutput?.identityBible || editedValues.identityBible || '',
        aspectRatio: currentDisplayRatio || aspectRatio || '9:16',
        title: generatedOutput?.title || generatedOutput?.caption || productName || cinematicTopic || ''
      });
      const originalPrompt = segs[idx]?.prompt || '';
      const segScenes = segs[idx]?.scenes || [];
      const sceneContext = segScenes.map(s => `Scene ${s.scene_num}: visual="${(s.visual || '').slice(0, 150)}", emotion="${s.emotion || ''}", action="${s.action || ''}"`).join('\n');

      // Update prompt with new dialogue immediately
      setBoxEdits(prev => {
        const currentPrompt = prev[promptKey] || originalPrompt;
        // Use flexible line ending match (handles both \n and \r\n)
        const dlgRegex = new RegExp('[\r\n]+DIALOGUE \\(BM\\):[\\s\\S]*?(?=[\r\n]+CONTINUITY:|[\r\n]+INSTRUCTIONS:|$)');
        // Remove old TONE tag if exists
        const toneRegex = new RegExp('\[TONE:[^\]]*\][\r\n]*', 'g');
        const cleanedPrompt = currentPrompt.replace(toneRegex, '');
        const updated = cleanedPrompt.includes('DIALOGUE (BM):')
          ? cleanedPrompt.replace(dlgRegex, `
DIALOGUE (BM):
${newDialogue}
`)
          : cleanedPrompt + `
DIALOGUE (BM):
${newDialogue}`;
        return { ...prev, [promptKey]: updated };
      });

      // Auto-detect tone via AI based on scene context + new dialogue
      (async () => {
        try {
          const tonePrompt = `You are a voice director for Malaysian TikTok/Reels. Analyze the scene context and dialogue below. Detect the MOST NATURAL speaking tone for TTS that matches the scene mood.

SCENE CONTEXT:
${sceneContext.slice(0, 600)}

DIALOGUE:
${newDialogue.slice(0, 400)}

Output ONLY a short tone tag in this exact format:
[TONE: <energy level>, <emotion>, <pace>]

Examples:
[TONE: excited, enthusiastic, fast-paced]
[TONE: calm, warm, slow and soft]
[TONE: serious, concerned, measured]
[TONE: playful, cheeky, upbeat]
[TONE: dramatic, intense, building tension]
[TONE: friendly, casual, conversational]
[TONE: urgent, persuasive, energetic]
[TONE: reflective, nostalgic, gentle]

Pick the ONE that best fits. No explanation, just the tag.`;
          const toneData = await callTextApi(tonePrompt, null, { temperature: 0.3 });
          const toneTag = extractGeminiText(toneData).trim().match(/\[TONE:[^\]]*\]/)?.[0] || '';
          if (toneTag) {
            setBoxEdits(prev => {
              const currentPrompt = prev[promptKey] || originalPrompt;
              const toneRegex = new RegExp('\[TONE:[^\]]*\]\s*', 'g');
              const cleaned = currentPrompt.replace(toneRegex, '');
              const withTone = `${toneTag}\n${cleaned}`;
              return { ...prev, [promptKey]: withTone };
            });
          }
        } catch (e) {
          console.warn('Tone detection skipped:', e);
        }
      })();
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
        <div className={`w-full border border-dashed rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center transition-all duration-300 relative ${
          activeProduct.name
          ? (t('border-sky-500/50 bg-sky-900/10', 'border-sky-300 bg-sky-50'))
          : (t('border-gray-700 hover:border-sky-500/50 bg-gray-800/30', 'border-gray-300 hover:border-sky-300 bg-gray-50'))
        }`}>
          <div className="flex flex-col items-center justify-center text-center w-full gap-3">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${activeProduct.base64 ? 'border-sky-500/50' : 'border-gray-700'}`}>
              {activeProduct.base64 ? (
                <img src={`data:${activeProduct.mimeType};base64,${activeProduct.base64}`} alt="preview" className="w-full h-full object-cover rounded-full p-1" />
              ) : (
                <I name="Upload" size={24} className="text-sky-400" />
              )}
            </div>
            <div className="flex flex-col items-center text-center min-w-0">
              <span className={`text-sm font-black ${activeProduct.name ? 'text-gray-200' : t('text-sky-400','text-sky-700')}`}>
                {activeProduct.name ? activeProduct.name : '📦 Upload Product Reference'}
              </span>
              {!activeProduct.name && <p className={`text-[10px] mt-0.5 ${t('text-sky-500/80','text-sky-600')}`}>Upload gambar produk — AI lock visual consistency merentas semua scene</p>}
            </div>
          </div>

          {activeProduct.name && (
            <button
              onClick={(e) => { e.preventDefault(); handleRemoveProduct(0); }}
              className={`absolute right-4 top-4 sm:top-1/2 sm:-translate-y-1/2 p-2 rounded-full transition-colors z-20 shadow-sm border ${t('bg-red-900/30 text-red-400 border-red-900/50', 'bg-white text-red-500 border-red-105')}`}
            >
              <I name="X" size={16} className="text-red-400" />
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
        <label className={C.label}>Environment / Background / Environment Reference (Optional)</label>
        <div className={`w-full border border-dashed rounded-3xl p-6 transition-all duration-300 ${backgrounds.length > 0 ? t('border-sky-500/50 bg-sky-900/10', 'border-sky-300 bg-sky-50') : t('border-gray-700 bg-gray-800/30', 'border-gray-300 bg-gray-50')}`}>
          
          {backgrounds.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4 justify-center">
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
            <div className="flex flex-col items-center justify-center text-center w-full gap-3 cursor-pointer">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border shadow-sm ${t('bg-sky-500/20 border-sky-500/50 text-sky-400', 'bg-sky-100 border-sky-300 text-sky-500')}`}>
                <I name="Image" size={20} />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className={`text-sm font-black ${t('text-sky-400', 'text-sky-700')}`}>
                  🏙️ Upload Background Reference
                </span>
                <p className={`text-[10px] mt-0.5 ${t('text-sky-500/80', 'text-sky-600')}`}>Upload gambar lokasi — AI kunci latar sama merentas semua scene yang dijana.</p>
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
                  <p className={`text-[10px] mt-0.5 ${t('text-sky-500/80', 'text-sky-600')}`}>Upload gambar muka — AI kunci wajah sama merentas semua scene yang dijana.</p>
                </div>
            </div>
            <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase bg-sky-500 text-white tracking-widest">Active</span>
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
  const handleExportToCharSheet = (imageDataUrl) => {
    if (!imageDataUrl || !imageDataUrl.startsWith('data:image')) return;
    const mimeType = imageDataUrl.substring(imageDataUrl.indexOf(':') + 1, imageDataUrl.indexOf(';'));
    const base64Data = imageDataUrl.split(',')[1];
    // Save to character tab's face lock
    setTabUploads((prev) => ({
      ...prev,
      character: {
        ...prev.character,
        useCustomFace: true,
        faceFileName: `Fake Influencer Export (${fiName || 'FI'})`,
        uploadedFaceBase64: base64Data,
        uploadedFaceMimeType: mimeType
      }
    }));
    // Clear character tab cache so it picks up the new face
    setTabCache((prev) => {
      const next = { ...prev };
      delete next.character;
      return next;
    });
    // Show success feedback
    setCopiedSection('exported_char_sheet');
    setTimeout(() => setCopiedSection(''), 3000);
  };

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
      const segBaseName = getDownloadName() || 'Storyboard_Studio';
      const segSafeName = segBaseName.replace(/\s+/g, '_').toLowerCase();
      link.download = `${segSafeName}_segment_${pairIndex + 1}.jpg`;
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

  if (showLanding && !hasAgreed) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden ${t('bg-[#0a0c10]', 'bg-[#f8fafc]')}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative z-10 max-w-4xl w-full text-center animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-sky-500/30">
              <I name="Clapperboard" size={40} className="text-white" />
            </div>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight mb-6 ${U.c14}`}>
            Generate AI Storyboards
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">in 60 Seconds</span>
          </h1>
          <p className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${t('text-gray-300', 'text-gray-600')}`}>
            Professional storyboard generation for Malaysian TikTok, Reels & Shopee Live creators. AI-powered scenes, dialogue, and visuals — ready for Flow AI video generation.
          </p>
          <div className={`flex flex-wrap items-center justify-center gap-6 mb-12 px-6 py-4 rounded-2xl border ${t('bg-[#11131a]/50 border-gray-800', 'bg-white border-gray-200')}`}>
            <div className="flex items-center gap-2"><I name="UserCheck" size={18} className="text-emerald-400" /><span className={`text-sm font-bold ${t('text-gray-300', 'text-gray-700')}`}>500+ Malaysian creators</span></div>
            <div className={`w-px h-5 ${t('bg-gray-700', 'bg-gray-300')}`}></div>
            <div className="flex items-center gap-2"><I name="Zap" size={18} className="text-amber-400" /><span className={`text-sm font-bold ${t('text-gray-300', 'text-gray-700')}`}>11 generation modes</span></div>
            <div className={`w-px h-5 ${t('bg-gray-700', 'bg-gray-300')}`}></div>
            <div className="flex items-center gap-2"><I name="ShieldCheck" size={18} className="text-sky-400" /><span className={`text-sm font-bold ${t('text-gray-300', 'text-gray-700')}`}>Free to start</span></div>
          </div>
          <button onClick={() => setShowLanding(false)} className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-black text-lg tracking-wider uppercase shadow-2xl shadow-sky-500/40 transition-all transform hover:scale-105">
            <span className="relative flex items-center gap-3 justify-center"><I name="Sparkles" size={22} />Start Creating Free</span>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
            {[{ icon: 'Video', label: 'Cinematic Storyboards', desc: 'Full scene-by-scene breakdown' },{ icon: 'Image', label: 'AI Visual Generation', desc: '4K quality storyboard frames' },{ icon: 'Film', label: 'Flow AI Ready', desc: 'Segmented prompts for I2V' }].map((f, i) => (
              <div key={i} className={`p-4 rounded-2xl border transition-all hover:scale-105 ${t('bg-[#11131a]/50 border-gray-800 hover:border-sky-500/50', 'bg-white border-gray-200 hover:border-sky-300')}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 mx-auto ${t('bg-sky-900/40', 'bg-sky-50')}`}><I name={f.icon} size={20} className="text-sky-400" /></div>
                <p className={`text-sm font-bold mb-1 ${U.c14}`}>{f.label}</p>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-10">© 2026 Storyboard Studio · Made for Malaysian content creators</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans pb-8 transition-all duration-500 relative ${t('bg-[#0a0c10]', 'bg-[#f8fafc]')}`}>
      {/* 3D Animated Background — Particles + Glassmorphism Orbs */}
      <canvas ref={bgCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-orb bg-orb-4"></div>
      </div>
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
              <h1 className={`text-xl font-black tracking-tight leading-none bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent`}>
                              Storyboard Studio AI
                            </h1>
              <p className="text-[9px] font-bold tracking-widest uppercase mt-1 text-gray-400">
                PRO CONTENT & VISUAL ENGINE
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setSidebarOpen(p => !p)}
              title="Toggle Sidebar"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border transition-all duration-300 ${t('bg-[#0a0c10] border-gray-700 text-gray-300 hover:border-sky-500', 'bg-gray-50 border-gray-200 text-gray-500 hover:border-sky-400')}`}
            >
              <I name="Layers" size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">{sidebarOpen ? 'Hide' : 'Tabs'}</span>
            </button>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
              <I name="ShieldCheck" size={14} className="text-emerald-400" />
              <span>Gemini Auto Integrated</span>
            </div>

            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
              className={`flex items-center px-3 py-2 rounded-full border transition-all duration-300 ${soundEnabled ? 'bg-sky-500/20 border-sky-500/40 text-sky-400' : 'bg-[#0a0c10] border-gray-700 text-gray-500'}`}
            >
              <I name="Volume2" className="w-4 h-4" />
            </button>
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

      <div className="flex min-h-[calc(100vh-64px)] relative z-10">

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`shrink-0 transition-all duration-300 overflow-hidden ${sidebarOpen ? 'w-56' : 'w-0'} ${t('bg-[#0d0f14] border-r border-gray-800', 'bg-gray-50 border-r border-gray-200')} fixed md:relative top-[65px] md:top-auto h-[calc(100vh-65px)] z-30 md:z-auto overflow-y-auto`}>
          <div className="p-3 pt-4 min-w-[224px]">
            {[
              {
                group: '🎬 Video',
                tabs: [
                  { id: 'cinematic_pro', icon: <I name="Clapperboard" size={14} />, label: 'Cinematic Pro', desc: 'Cerita 3-babak: masalah → solusi → CTA', grad: 'from-violet-500 to-fuchsia-500', glow: 'shadow-violet-500/30', text: 'text-violet-300' },
                  { id: 'microimpact', icon: <I name="Zap" size={14} />, label: '10s Micro', desc: '10s pukul cepat: hook → payoff → CTA', grad: 'from-amber-400 to-orange-500', glow: 'shadow-amber-500/30', text: 'text-amber-300' },
                  { id: 'narrativearc', icon: <I name="Film" size={14} />, label: '30s Narrative', desc: '30s, 9 scene — cerita emosi 3-babak', grad: 'from-rose-500 to-pink-500', glow: 'shadow-rose-500/30', text: 'text-rose-300' },
                  { id: 'talkinghead', icon: <I name="User" size={14} />, label: 'Talking Head', desc: 'Cakap depan kamera — dialog padat, teleprompter', grad: 'from-blue-500 to-indigo-500', glow: 'shadow-blue-500/30', text: 'text-blue-300' },
                  { id: 'ugc', icon: <I name="Video" size={14} />, label: 'Affiliate UGC', desc: 'Review affiliate: unbox → guna → hasil → CTA Shopee', grad: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/30', text: 'text-emerald-300' },
                ]
              },
              {
                group: '🖼️ Image',
                tabs: [
                  { id: 'product', icon: <I name="Box" size={14} />, label: 'Product POV', desc: 'Fokus produk — unboxing & demo dekat', grad: 'from-cyan-500 to-sky-500', glow: 'shadow-cyan-500/30', text: 'text-cyan-300' },
                  { id: 'ootd', icon: <I name="Shirt" size={14} />, label: 'OOTD', desc: 'Fesyen — tunjuk outfit, styling, mix & match', grad: 'from-pink-500 to-rose-500', glow: 'shadow-pink-500/30', text: 'text-pink-300' },
                  { id: 'stopmotion', icon: <I name="Box" size={14} />, label: 'Stop Motion', desc: '10 frame × 1s — objek gerak, takde manusia', grad: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/30', text: 'text-orange-300' },
                ]
              },
              {
                group: '🔧 Tools',
                tabs: [
                  { id: 'grafix', icon: <I name="PenTool" size={14} />, label: 'Grafix', desc: 'Motion graphic — teks, chart, ikon (takde manusia)', grad: 'from-purple-500 to-indigo-500', glow: 'shadow-purple-500/30', text: 'text-purple-300' },
                  { id: 'character', icon: <I name="User" size={14} />, label: 'Char Sheet', desc: 'Turnaround multi-angle — jadikan reference', grad: 'from-sky-500 to-cyan-400', glow: 'shadow-sky-500/30', text: 'text-sky-300' },
                  { id: 'fake_influencer', icon: <I name="UserPlus" size={14} />, label: 'Fake Influencer', desc: 'Cipta persona AI konsisten (muka rekaan)', grad: 'from-fuchsia-500 to-pink-500', glow: 'shadow-fuchsia-500/30', text: 'text-fuchsia-300' },
                ]
              }
            ].map(({ group, tabs }) => (
              <div key={group} className="mb-4">
                <p className={`text-[9px] font-black uppercase tracking-widest px-2 mb-1.5 ${t('text-gray-600', 'text-gray-400')}`}>{group}</p>
                <div className="space-y-0.5">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all duration-200 text-left relative overflow-hidden group ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.grad} text-white shadow-lg ${tab.glow} sidebar-active-glow`
                          : t('text-gray-400 hover:text-white hover:bg-white/8 hover:scale-[1.01]', 'text-gray-500 hover:text-gray-800 hover:bg-gray-100')
                      }`}
                    >
                      {/* Left accent bar */}
                      {activeTab === tab.id && (
                        <span className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-white/60" />
                      )}
                      {/* Shimmer on hover */}
                      {activeTab !== tab.id && (
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 sidebar-shimmer rounded-xl pointer-events-none" />
                      )}
                      <span className={`shrink-0 transition-transform duration-200 ${activeTab === tab.id ? 'text-white scale-110' : t(tab.text, tab.text)}`}>
                        {tab.icon}
                      </span>
                      <span className="flex flex-col items-start leading-tight min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 w-full">
                          <span className="truncate flex-1">{tab.label}</span>
                          {/* Scene count badge */}
                          {(() => {
                            const dur = tab.id === 'cinematic_pro' ? cinematicDuration : tab.id === 'talkinghead' ? thDuration : tab.id === 'grafix' ? gfDuration : tab.id === 'stopmotion' ? smDuration : tab.id === 'microimpact' ? '10' : tab.id === 'narrativearc' ? '30' : duration;
                            const n = expectedSceneCountForDuration(dur, tab.id);
                            return n ? <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${activeTab === tab.id ? 'bg-white/20 text-white' : t('bg-gray-700 text-gray-400','bg-gray-200 text-gray-500')}`}>{n}s</span> : null;
                          })()}
                        </span>
                        {tab.desc && <span className={`text-[10px] font-normal leading-snug mt-0.5 ${activeTab === tab.id ? 'text-white/80' : 'opacity-50'}`}>{tab.desc}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {generateHistory.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-[9px] font-black uppercase tracking-widest px-2 mb-1.5 text-gray-600">Recent</p>
              {generateHistory.map((h, i) => (
                <button key={i} onClick={() => { setGeneratedOutput(h.output); setActiveTab(h.tab); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-[10px] text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all truncate">
                  {h.topic || h.tab}
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 px-5 sm:px-8 py-10">
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
              <I name="ShieldAlert" size={16} className="text-yellow-400" />
              <span className={`text-xs font-bold uppercase tracking-widest ${t('text-yellow-400', 'text-yellow-700')}`}>Gemini API Key</span>
            </div>
            <div className="flex-1 w-full relative">
              <input
                type={showApiKeyVisible ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your Gemini API key here..."
                className={`w-full rounded-xl px-4 py-2.5 pr-10 text-sm border focus:outline-none focus:ring-1 focus:ring-sky-400 ${t('bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600', 'bg-white border-gray-200 text-gray-800')}`}
              />
              <button
                type="button"
                onClick={() => setShowApiKeyVisible(!showApiKeyVisible)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${t('text-gray-500 hover:text-gray-300', 'text-gray-400 hover:text-gray-600')}`}
                title={showApiKeyVisible ? "Hide key" : "Show key"}
              >
                <I name={showApiKeyVisible ? "Eye" : "Eye"} size={16} />
              </button>
            </div>
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
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${t('text-gray-400', 'text-gray-500')}`}>Cara Dapatkan Gemini API Key</p>
            <ol className={`text-sm space-y-2 list-decimal list-inside leading-relaxed ${t('text-gray-300', 'text-gray-600')}`}>
              <li>Pergi ke <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline hover:text-sky-300 font-bold">Google AI Studio ? API Keys</a></li>
              <li>Log masuk dengan akaun Google anda.</li>
              <li>Klik butang <span className="font-bold text-sky-400">"Create API Key"</span>.</li>
              <li>Pilih mana-mana Google Cloud project (atau buat baru jika tiada).</li>
              <li>Copy API key yang dipaparkan dan paste di ruangan atas. ✅</li>
            </ol>
            <p className={`text-[11px] mt-3 ${t('text-gray-500', 'text-gray-400')}`}>API key ini percuma (free tier). Pastikan jangan kongsi key anda dengan orang lain.</p>
          </div>
        )}
        {apiKey && !showApiKeyInput && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}><I name="Sparkles" size={12} className="text-sky-400" /> MODEL:</span>
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
              Change API Key
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
                <span></span>
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
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}><I name="Code" size={12} className="text-emerald-400" /> Text Provider:</span>
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
                    <span className={`text-[10px] font-bold uppercase tracking-widest shrink-0 ${t('text-purple-400', 'text-purple-600')}`}><I name="ShieldAlert" size={12} className="text-purple-400" /> Genfity Key:</span>
                    <div className="flex-1 relative">
                      <input
                        type={showGenfityKeyVisible ? "text" : "password"}
                        value={genfityKey}
                        onChange={(e) => setGenfityKey(e.target.value)}
                        onBlur={(e) => handleSaveGenfityKey(e.target.value)}
                        placeholder="genfity_xxxxxxxxxxxx"
                        className={`w-full rounded-lg px-3 py-1.5 pr-8 text-xs border focus:outline-none focus:ring-1 focus:ring-purple-400 ${t('bg-[#0a0c10] border-gray-700 text-white placeholder-gray-600', 'bg-white border-gray-200 text-gray-800')}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowGenfityKeyVisible(!showGenfityKeyVisible)}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors ${t('text-gray-500 hover:text-gray-300', 'text-gray-400 hover:text-gray-600')}`}
                        title={showGenfityKeyVisible ? "Hide key" : "Show key"}
                      >
                        <I name="Eye" size={12} />
                      </button>
                    </div>
                    {genfityKey && <span className="text-[10px] text-green-400 font-bold">OK</span>}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}><I name="Layers" size={12} className="text-sky-400" /> Output:</span>
                  <div className={`flex rounded-xl p-1 border ${t('bg-[#0a0c10] border-gray-700', 'bg-white border-gray-200')}`}>
                    <button
                      onClick={() => handleGenerateModeChange('text_and_images')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${generateMode === 'text_and_images' ? 'bg-sky-500 text-white shadow-sm' : t('text-gray-400', 'text-gray-500')}`}
                    >
                      Text + Images
                    </button>
                    <button
                      onClick={() => handleGenerateModeChange('text_only')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${generateMode === 'text_only' ? 'bg-purple-500 text-white shadow-sm' : t('text-gray-400', 'text-gray-500')}`}
                    >
                      Text Only
                    </button>
                  </div>
                  {generateMode === 'text_only' && (
                    <span className={`text-[10px] font-medium ${t('text-purple-400', 'text-purple-600')}`}>(Gemini Key tak perlu)</span>
                  )}
                </div>
                {generateMode === 'text_and_images' && (
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-800/30">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${t('text-gray-500', 'text-gray-400')}`}><I name="Zap" size={12} className="text-amber-400" /> Smart Keyframe:</span>
                    <button
                      onClick={() => handleKeyframeModeChange(keyframeMode === 'off' ? 'on' : keyframeMode === 'on' ? 'segment' : 'off')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${keyframeMode !== 'off' ? 'bg-amber-500 text-white shadow-sm' : t('bg-gray-800 text-gray-400 hover:text-white', 'bg-gray-100 text-gray-500')}`}
                    >
                      {keyframeMode === 'on' ? 'ON (1 img)' : keyframeMode === 'segment' ? 'PER-SEGMEN' : 'OFF'}
                    </button>
                    {keyframeMode === 'on' && (
                      <span className={`text-[10px] font-medium ${t('text-amber-400', 'text-amber-600')}`}>
                        Jimat token: 1 keyframe pintar (auto-pilih shot terbaik), selebihnya text prompt
                      </span>
                    )}
                    {keyframeMode === 'segment' && (
                      <span className={`text-[10px] font-medium ${t('text-amber-400', 'text-amber-600')}`}>
                        1 keyframe setiap 10s segmen — continuity lebih baik untuk video panjang
                      </span>
                    )}
                    
                    <span className={`text-[10px] font-bold uppercase tracking-widest ml-2 ${t('text-gray-500', 'text-gray-400')}`}><I name="Layers" size={12} className="text-sky-400" /> Storyboard Timeline:</span>
                    <button
                      onClick={() => handleTimelineModeChange(timelineMode === 'on' ? 'off' : 'on')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${timelineMode === 'on' ? 'bg-sky-500 text-white shadow-sm' : t('bg-gray-800 text-gray-400 hover:text-white', 'bg-gray-100 text-gray-500')}`}
                    >
                      {timelineMode === 'on' ? 'ON (all scenes)' : 'OFF (1 img)'}
                    </button>
                    {timelineMode === 'off' && (
                      <span className={`text-[10px] font-medium ${t('text-sky-400', 'text-sky-600')}`}>
                        OFF: Smart Keyframe je (1 gambar). ON untuk semua scene
                      </span>
                    )}

                    <span className={`text-[10px] font-bold uppercase tracking-widest ml-2 ${t('text-gray-500', 'text-gray-400')}`}><I name="Zap" size={12} className="text-emerald-400" /> Bunyi Siap:</span>
                    <button
                      onClick={() => {
                        const next = soundEnabled ? 'off' : 'on';
                        setSoundEnabled(next === 'on');
                        try { localStorage.setItem('sound_alerts', next); } catch {}
                        if (next === 'on') playDoneSound();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${soundEnabled ? 'bg-emerald-500 text-white shadow-sm' : t('bg-gray-800 text-gray-400 hover:text-white', 'bg-gray-100 text-gray-500')}`}
                    >
                      {soundEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}



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
                  label="Platform Target"
                  value={cinematicPlatform}
                  onChange={(e) => setCinematicPlatform(e.target.value)}
                  options={[
                    { v: 'TikTok', l: '🎵 TikTok MY' },
                    { v: 'Reels', l: '📸 Instagram Reels' },
                    { v: 'YouTube', l: '▶️ YouTube Shorts' },
                    { v: 'Shopee', l: '🛍️ Shopee Video' },
                  ]}
                  isDarkMode={isDarkMode}
                />
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

              <div className="sticky bottom-4 z-30 pt-4">
                {isGeneratingAll && (
                                  <div className="space-y-2 mb-3 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                                    {/* Gradient Progress Bar */}
                                    <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 transition-all duration-700 ease-out relative"
                                        style={{ width: `${((generationStep + 1) / 4) * 100}%` }}
                                      >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                                      </div>
                                    </div>
                                    {/* Step Labels */}
                                    <div className="flex items-center justify-between">
                                      {['Menganalisis', 'Membina', 'Menjana', 'Memproses'].map((step, i) => (
                                        <div key={i} className={`flex items-center gap-1 text-[10px] font-bold transition-all duration-500 ${
                                          i < generationStep ? 'text-emerald-400' :
                                          i === generationStep ? 'text-sky-400' :
                                          'text-gray-600'
                                        }`}>
                                          <span className={
                                            i < generationStep ? '' :
                                            i === generationStep ? 'animate-spin text-[8px]' : ''
                                          }>
                                            {i < generationStep ? '✅' : i === generationStep ? '●' : '○'}
                                          </span>
                                          {step}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                <button
                  onClick={() => generateNewMode('cinematic_pro')}
                  disabled={isGeneratingAll || !cinematicTopic.trim()}
                  className={`${U.c2} active:scale-[0.98] hover:opacity-90 disabled:opacity-50`}
                >
                  {isGeneratingAll ? 'Processing Storyboard...' : 'Generate Cinematic Storyboard'}
                </button>
                <p className="text-center text-[9px] text-gray-600 mt-2">Ctrl+Enter to generate · Esc to cancel</p>
              </div>
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

              {/* Punch-Cut toggle */}
              <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${t('border-gray-700 bg-gray-800/30','border-gray-200 bg-gray-50')}`}>
                <div>
                  <p className={`text-sm font-black ${t('text-gray-200','text-gray-800')}`}>⚡ Punch-Cut Mode</p>
                  <p className={`text-[10px] mt-0.5 ${t('text-gray-500','text-gray-400')}`}>5 scenes × 2s — faster cuts, maximum impact</p>
                </div>
                <button onClick={() => setMicroPunchCut(prev => !prev)} className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${microPunchCut ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : t('border-gray-700 text-gray-500','border-gray-300 text-gray-400')}`}>{microPunchCut ? 'ON' : 'OFF'}</button>
              </div>

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
                <SelectField
                  label="Story Genre"
                  value={narrativeGenre}
                  onChange={(e) => setNarrativeGenre(e.target.value)}
                  options={[
                    { v: 'emotional', l: '💛 Emotional / Inspirational' },
                    { v: 'thriller', l: '🖤 Thriller / Suspense' },
                    { v: 'comedy', l: '😂 Comedy / Relatable' },
                    { v: 'motivational', l: '🔥 Motivational / Epic' },
                    { v: 'educational', l: '📚 Educational / Tips' },
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

              {/* Teleprompter toggle */}
              <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${t('border-gray-700 bg-gray-800/30','border-gray-200 bg-gray-50')}`}>
                <div>
                  <p className={`text-sm font-black ${t('text-gray-200','text-gray-800')}`}>📜 Teleprompter Mode</p>
                  <p className={`text-[10px] mt-0.5 ${t('text-gray-500','text-gray-400')}`}>Dialog dipecah baris pendek + cue [PAUSE] [SMILE] untuk baca on-camera</p>
                </div>
                <button
                  onClick={() => setThTeleprompter(prev => !prev)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${thTeleprompter ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : t('border-gray-700 text-gray-500','border-gray-300 text-gray-400')}`}
                >{thTeleprompter ? 'ON' : 'OFF'}</button>
              </div>

              {/* Subtitle format toggle */}
              <div className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${t('border-gray-700 bg-gray-800/30','border-gray-200 bg-gray-50')}`}>
                <div>
                  <p className={`text-sm font-black ${t('text-gray-200','text-gray-800')}`}>🎬 CapCut Subtitle Format</p>
                  <p className={`text-[10px] mt-0.5 ${t('text-gray-500','text-gray-400')}`}>Output dialog dalam baris pendek (max 5 patah) — ready paste ke CapCut auto-caption</p>
                </div>
                <button
                  onClick={() => setThSubtitleFormat(prev => !prev)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${thSubtitleFormat ? 'bg-green-500/20 border-green-500/50 text-green-400' : t('border-gray-700 text-gray-500','border-gray-300 text-gray-400')}`}
                >{thSubtitleFormat ? 'ON' : 'OFF'}</button>
              </div>

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

              <InputField
                label="Product Price (Optional)"
                value={ugcPrice}
                onChange={(e) => setUgcPrice(e.target.value)}
                placeholder="e.g., 49.90 (AI akan sebut harga dalam CTA)"
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

                <SelectField
                  label="Animation Easing"
                  value={smEasingMode}
                  onChange={(e) => setSmEasingMode(e.target.value)}
                  options={[
                    { v: 'ease-in-out', l: '🌊 Ease In-Out (Natural)' },
                    { v: 'bounce', l: '🏀 Bounce (Playful)' },
                    { v: 'snap', l: '⚡ Snap Cut (Punchy)' },
                    { v: 'slow-mo', l: '🎞️ Slow Motion (Graceful)' },
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

                <InputField
                  label="Target Audience (Optional)"
                  value={gfAudience}
                  onChange={(e) => setGfAudience(e.target.value)}
                  placeholder="e.g., Young entrepreneurs, Gen Z, Tech enthusiasts"
                  isDarkMode={isDarkMode}
                />

                <InputField
                  label="Brand Colors (Optional)"
                  value={gfBrandColor}
                  onChange={(e) => setGfBrandColor(e.target.value)}
                  placeholder="e.g., #FF5733, navy blue, gold — AI will lock all scenes to this palette"
                  isDarkMode={isDarkMode}
                />

                <InputField
                  label="Data to Visualize (Optional)"
                  value={gfDataInput}
                  onChange={(e) => setGfDataInput(e.target.value)}
                  placeholder="e.g., Sales naik 40%, 3 langkah mudah, 5000+ pelanggan — AI translate to visuals"
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
                    { v: 'HUMAN_CHARACTER', l: '👤 Human Actor' },
                    { v: 'PRODUCT_CHARACTER', l: '📦 Primary Product' },
                    { v: 'VEHICLE_CHARACTER', l: '🚗 Vehicle' },
                    { v: 'ANIMAL_CHARACTER', l: '🐾 Animal / Organism' },
                    { v: 'MASCOT_CHARACTER', l: '🎭 Mascot / Avatar' },
                    { v: 'OBJECT_CHARACTER', l: '💻 Other (Laptop, Accessories...)' },
                    { v: 'AUTO_DETECT', l: '? AI Auto Detect (From Image)' }
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
        {/* Empty State */}


                {(generatedOutput || isGeneratingImage || Object.values(regeneratingIndexes).some(v => v) || Object.keys(showMagicBox).length > 0) && (
                  <div ref={outputRef} className="animate-fade-in-up mt-8 pt-4">
            <div className="text-center mb-8 relative">
               <h2 className={`text-4xl font-black tracking-wide mb-4 bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent`}>
                 {activeTab === 'character' ? 'Character Blueprint Reference' : activeTab === 'cinematic_pro' ? 'Cinematic Storyboard Details' : activeTab === 'microimpact' ? '10s Micro-Impact Suite' : activeTab === 'narrativearc' ? '30s Narrative Arc Pipeline' : activeTab === 'talkinghead' ? 'Talking Head Board Mapping' : activeTab === 'stopmotion' ? 'Stop Motion Frame Sequencing' : activeTab === 'grafix' ? 'Motion Graphics Deck' : 'Unified Workspace Canvas'}
               </h2>
               <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-4"></div>
               <div className="flex items-center justify-center gap-3 mt-2">
                 {generatedOutput?.scenes?.length > 0 && (
                   <button onClick={handleCopyAllScenes} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${t('border-gray-700 text-gray-400 hover:border-sky-500 hover:text-sky-400','border-gray-300 text-gray-500 hover:border-sky-400 hover:text-sky-500')}`}>
                     <I name="Copy" size={11} /> Copy All Scenes
                   </button>
                 )}
                 <button onClick={saveDraft} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${t('border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400','border-gray-300 text-gray-500 hover:border-green-400 hover:text-green-500')}`}>
                   <I name="Save" size={11} /> Save Draft
                 </button>
                 <button onClick={() => setShowShortcuts(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black border transition-all ${t('border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400','border-gray-300 text-gray-500 hover:border-purple-400 hover:text-purple-500')}`}>
                   <I name="Keyboard" size={11} /> Shortcuts
                 </button>
               </div>
               {generatedOutput && (
                 <button
                   onClick={handleResetTab}
                   className="px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2 mx-auto"
                 >
                   <I name="Trash" size={14} /> Reset Tab {activeTab.replace('_', ' ').toUpperCase()}
                 </button>
               )}
            </div>


            <div className="space-y-16">
              <div>
                {isGeneratingImage && imageUrls.length === 0 ? (() => {
                  const lt = String(loadingText || '').toLowerCase();
                  // Use progressStage (state) as primary source of truth; fall back to text parsing
                  let stage = progressStage;
                  if (/analyz|extract|absorb|map/i.test(lt)) stage = Math.min(stage, 0);
                  else if (/build|construct|engineer|repair|json|sequence|framework|architecture/i.test(lt)) stage = Math.max(stage, 1);
                  else if (/generat|render|regen|visual|frame|deploy|synth/i.test(lt)) stage = Math.max(stage, 2);
                  const stages = ['Analyzing', 'Building', 'Generating', 'Done'];
                  
                  // stage 0 = analyzing (5–15%), stage 1 = building JSON (15–40%), stage 2 = generating images (progressPercent)
                  const rawPct = stage === 2 ? Math.max(progressPercent, 5) : stage === 1 ? Math.max(progressPercent > 0 ? progressPercent : 0, 20) : 5;
                  const displayPct = Math.min(rawPct, 99);
                  const eta = displayPct > 5 && elapsedSeconds > 5
                    ? Math.round((elapsedSeconds / displayPct) * (100 - displayPct))
                    : null;
                  
                  const formatTime = (sec) => {
                    if (!sec && sec !== 0) return '';
                    if (sec < 60) return `${sec}s`;
                    return `${Math.floor(sec/60)}m ${sec%60}s`;
                  };
                  
                  return (
                    <div className={`w-full max-w-lg mx-auto border rounded-[3rem] p-10 flex flex-col items-center justify-center text-center aspect-[9/16] shadow-2xl relative overflow-hidden ${t('bg-[#11131a] border-gray-800 shadow-black/50', 'bg-white border-sky-100')}`}>
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-sky-500 blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-400 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                      </div>
                      
                      {/* Branded Clapperboard Loading */}
                      <div className="relative mb-6">
                        <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-sky-500/30 animate-bounce-once">
                          <I name="Clapperboard" size={48} className="text-white" />
                        </div>
                        {/* Recording dot */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500" />
                      </div>
                      
                      {/* Progress ring */}
                      <div className="relative mb-4">
                        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="52" fill="none" stroke={isDarkMode ? '#1f2937' : '#e5e7eb'} strokeWidth="6" />
                          <circle cx="60" cy="60" r="52" fill="none" stroke="url(#progGrad)" strokeWidth="6" strokeLinecap="round"
                            strokeDasharray={`${326.7 * displayPct/100} 326.7`} className="transition-all duration-700 ease-out" />
                          <defs>
                            <linearGradient id="progGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0ea5e9" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-xl font-black ${U.c14}`}>{displayPct}%</span>
                        </div>
                      </div>

                      {/* Stages */}
                      <div className="relative w-full max-w-[220px] space-y-2 mb-4">
                        {stages.map((s, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-500 ${
                              i < stage ? 'bg-emerald-500 text-white' :
                              i === stage ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/50' :
                              t('bg-gray-800 text-gray-600', 'bg-gray-200 text-gray-400')
                            }`}>
                              {i < stage ? '✓' : ''}
                            </div>
                            <div className="flex-1 text-left">
                              <span className={`text-[11px] font-bold transition-all duration-500 ${
                                i < stage ? t('text-emerald-400', 'text-emerald-600') :
                                i === stage ? 'text-sky-400 animate-pulse' :
                                t('text-gray-600', 'text-gray-400')
                              }`}>{s}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Loading text — typewriter style */}
                      <p className="text-sm font-black text-sky-500 tracking-wide uppercase leading-relaxed text-center min-h-[20px]">
                        {loadingText || 'Generating...'}
                        <span className="animate-pulse">_</span>
                      </p>
                      
                      {eta !== null && (
                        <p className={`text-[10px] font-bold tracking-widest mt-2 ${t('text-gray-500', 'text-gray-400')}`}>
                          ETA: {formatTime(eta)} &middot; {elapsedSeconds}s
                        </p>
                      )}
                    </div>
                  );
                })() : (
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
                           <div className="flex items-center gap-2 flex-wrap">
                             {timelineMode !== 'on' && keyframeMode !== 'off' && (
                               <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1">
                                 <I name="Zap" size={10} /> Keyframe
                               </span>
                             )}
                             {timelineMode !== 'on' && keyframeMode !== 'off' && keyframeInfo[index] && (
                               <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${keyframeInfo[index].confidence >= 75 ? 'bg-green-500/20 text-green-400' : keyframeInfo[index].confidence >= 55 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                                 Scene {keyframeInfo[index].scene} · {keyframeInfo[index].confidence}% · {keyframeInfo[index].reason}
                               </span>
                             )}
                             <p className={`text-xs leading-relaxed font-medium ${C.muted(isDarkMode)}`}>
                               {timelineMode !== 'on' && keyframeMode !== 'off'
                                 ? 'Ini keyframe anchor untuk Flow AI. Tak puas hati (muka/produk pelik)? Tekan REGENERATE KEYFRAME di bawah untuk buat semula keyframe ini sahaja.'
                                 : slideDescs[index % slideDescs.length]}
                             </p>
                           </div>
                        </div>

                        <div className={`relative border-[8px] rounded-[3rem] shadow-2xl overflow-hidden flex-grow flex flex-col group-hover:-translate-y-2 transition-transform duration-500 ${t('border-[#1a1c23] bg-[#1a1c23] shadow-black/50', 'border-gray-900 bg-gray-900')}`}>
                          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-30">
                             <div className={`w-32 h-6 rounded-b-2xl ${t('bg-[#1a1c23]', 'bg-gray-900')}`}></div>
                          </div>

                          <div
                            className={`relative w-full ${containerAspectClass} bg-black overflow-hidden cursor-zoom-in`}
                            onClick={() => { setFullscreenImage(url); setLightboxIndex(index); }}
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
                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${t('bg-[#11131a] border-gray-800 text-white hover:border-sky-500', 'bg-white border-gray-200 text-gray-700 hover:border-sky-400')}`}
                              >
                                <I name="Download" size={14} className="text-sky-500" /> DOWNLOAD 4K
                              </button>
                              <button
                                onClick={() => handleDownloadHD(url, index, '2k')}
                                disabled={!url || regeneratingIndexes[index]}
                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${t('bg-[#11131a] border-gray-800 text-white hover:border-cyan-400', 'bg-white border-gray-200 text-gray-700 hover:border-cyan-400')}`}
                              >
                                <I name="Download" size={14} className="text-cyan-400" /> DOWNLOAD 2K
                              </button>
                            </div>
                            <button
                              onClick={() => regenerateSingleVisual(index)}
                              disabled={!url || regeneratingIndexes[index]}
                              className={`w-full py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${(timelineMode !== 'on' && keyframeMode !== 'off') ? 'bg-amber-500 border-transparent text-white hover:bg-amber-600' : t('bg-[#11131a] border-gray-800 text-white hover:border-cyan-400', 'bg-white border-gray-200 text-gray-700 hover:border-cyan-400')}`}
                            >
                              <I name="RefreshCw" size={14} className={`${regeneratingIndexes[index] ? "animate-spin" : ""} ${(timelineMode !== 'on' && keyframeMode !== 'off') ? 'text-white' : 'text-gray-400'}`} /> {(timelineMode !== 'on' && keyframeMode !== 'off') ? 'REGENERATE KEYFRAME' : 'ALTERNATIVE 2K'}
                            </button>

                            <button
                              onClick={() => toggleMagicBox(index)}
                              disabled={!url || regeneratingIndexes[index]}
                              className={`w-full py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm disabled:opacity-50 ${showMagicBox[index] ? (PINK_GRAD + ' border-transparent') : (t('bg-[#11131a] border-gray-800 text-sky-400 hover:border-sky-500', 'bg-sky-50 border-sky-200 text-sky-600'))}`}
                            >
                              <I name="Wand2" size={14} className={showMagicBox[index] ? "text-white" : "text-sky-500"} />
                              {showMagicBox[index] ? 'CLOSE MAGIC BOX' : 'MAGIC BOX TUNER'}
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
                                {combiningPairIndex === pairIndex ? 'COMBINING...' : `DOWNLOAD COMBINED SEGMENT ${pairIndex + 1}`}
                              </button>
                            )}

                            {/* Export to Character Sheet — only in fake_influencer tab */}
                            {activeTab === 'fake_influencer' && url && (
                              <button
                                onClick={() => handleExportToCharSheet(url)}
                                className={`w-full mt-2 py-3.5 rounded-xl border text-[10px] font-black flex items-center justify-center gap-2 transition-all tracking-widest uppercase shadow-sm ${t('bg-emerald-950/30 border-emerald-800/50 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-900/30', 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:border-emerald-400')}`}
                              >
                                <I name="UserPlus" size={14} className="text-emerald-400" /> EXPORT TO CHARACTER SHEET
                              </button>
                            )}
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </div>

              {/* === STORYBOARD TIMELINE VIEW === */}
              {timelineMode === 'on' && generatedOutput && imageUrls.length > 0 && (generatedOutput.scenes || generatedOutput.productScenes || generatedOutput.ootdScenes) && (() => {
                const allScenes = (generatedOutput.scenes || generatedOutput.productScenes || generatedOutput.ootdScenes || []).filter(Boolean);
                if (!allScenes.length) return null;
                return (
                  <div className={`rounded-3xl p-6 sm:p-8 shadow-lg border transition-all duration-300 mb-8 ${t('bg-[#11131a] border-gray-800', 'bg-white border-gray-100')}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t('bg-sky-900/40', 'bg-sky-100')}`}>
                        <I name="Film" size={20} className="text-sky-400" />
                      </div>
                      <div>
                        <h3 className={`font-black text-lg ${U.c14}`}>Storyboard Timeline</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{allScenes.length} scenes · {generatedOutput.duration || '—'} · {currentDisplayRatio || aspectRatio}</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto pb-4 custom-scrollbar">
                      <div className="flex gap-3 min-w-min">
                        {allScenes.map((scene, idx) => {
                          const thumb = imageUrls[idx] || imageUrls[idx % imageUrls.length];
                          const timecode = scene.timecode || `${idx * 5}s–${(idx + 1) * 5}s`;
                          const dialogue = String(scene.dialogue || '').trim();
                          return (
                            <div key={idx} className={`flex-shrink-0 w-40 rounded-2xl border overflow-hidden transition-all hover:scale-105 cursor-pointer group ${t('bg-[#0a0c10] border-gray-700 hover:border-sky-500', 'bg-gray-50 border-gray-200 hover:border-sky-400')}`} onClick={() => { setFullscreenImage(thumb); setLightboxIndex(idx); }}>
                              <div className={`relative ${containerAspectClass} bg-black overflow-hidden`}>
                                {thumb ? (
                                  <img src={thumb} alt={`Scene ${idx + 1}`} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <I name="Image" size={24} className="text-gray-600" />
                                  </div>
                                )}
                                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-black flex items-center justify-center shadow-lg z-10">
                                  {idx + 1}
                                </div>
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                  <span className="text-[10px] text-white font-bold tracking-wide">{timecode}</span>
                                </div>
                              </div>
                              <div className="p-2.5 space-y-1.5">
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${t('text-sky-400', 'text-sky-600')}`}>
                                  {String(scene.visual || scene.action || '').slice(0, 40)}{String(scene.visual || '').length > 40 ? '...' : ''}
                                </p>
                                {dialogue && (
                                  <p className={`text-[10px] italic leading-snug ${t('text-gray-400', 'text-gray-500')}`}>
                                    "{dialogue.slice(0, 50)}{dialogue.length > 50 ? '...' : ''}"
                                  </p>
                                )}
                                {scene.camera && (
                                  <p className={`text-[9px] uppercase tracking-widest ${t('text-gray-600', 'text-gray-400')}`}>
                                    {String(scene.camera).slice(0, 30)}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className={`mt-4 h-1.5 rounded-full overflow-hidden ${t('bg-gray-800', 'bg-gray-200')}`}>
                      <div className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, (imageUrls.length / allScenes.length) * 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 text-center">
                      {imageUrls.length}{'/'}{allScenes.length} scenes generated · Click any scene to view fullscreen
                    </p>
                  </div>
                );
              })()}

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
                      <I name="Zap" size={16} className="text-sky-400" /> FLOW AI CONTINUITY SEGMENTS (I2V)
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
                                {seg.label} · SEGMENT {seg.part}{'/'}{seg.parts}
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
                                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">⚡ Segment Prompt</span>
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
                                  <div className="bg-pink-950/20 border border-pink-500/20 rounded-xl p-3">
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-pink-400 flex items-center gap-1">🎤 Dialog {'/'} VO (Segment)</span>
                                      <div className="flex gap-1.5">
                                        <button
                                          onClick={async () => {
                                            const segKey = `flow_seg_dialogue_${i}`;
                                            setEditModes(prev => ({ ...prev, [segKey + '_loading']: true }));
                                            try {
                                              const storyContext = generatedOutput?.videoPrompt || '';
                                              const segVisual = currentPromptVal || '';
                                              const prevDialogue = currentDialogueVal || '';
                                              // Calculate word limit based on segment duration
                                              const segDurSec = seg.end - seg.start;
                                              const wordsPerSec = 2.5; // natural BM speech pace
                                              const maxWords = Math.floor(segDurSec * wordsPerSec);
                                              const maxWordsPerLine = Math.floor(maxWords / Math.max(1, (prevDialogue.split('\n').filter(Boolean).length)));
                                              const regenPrompt = `You are a Malaysian TikTok/Reels scriptwriter. Rewrite the DIALOGUE below in fresh, natural, trendy Bahasa Melayu (BM). Keep the same story beat and emotional arc — just make the words different, more engaging, and more human.

STORY CONTEXT (for continuity — do NOT change the story):
${storyContext.slice(0, 800)}

SEGMENT VISUAL (what's happening in this segment):
${segVisual.slice(0, 400)}

CURRENT DIALOGUE TO REWRITE:
${prevDialogue}

SEGMENT DURATION: ${segDurSec}s
SPEECH PACE: ~${wordsPerSec} words/sec for natural BM
TOTAL MAX WORDS: ${maxWords} words for this entire segment
MAX WORDS PER LINE: ${maxWordsPerLine} words per dialogue line

RULES:
- Output ONLY the new dialogue lines in BM (no JSON, no labels, no explanation)
- Keep same number of lines/scenes
- STRICT WORD LIMIT: Each line MAX ${maxWordsPerLine} words — dialogue MUST fit within ${segDurSec}s when spoken naturally
- Short punchy sentences preferred — especially for 10s segments
- Must feel like kawan sembang — natural fillers (eh, kan, tau tak, sumpah, weh)
- Must connect logically to the visual described above
- Different word choices from original but same story beat
- NEVER repeat the same word or phrase twice in a row`;

                                              const data = await callTextApi(regenPrompt, null, { temperature: 0.85 });
                                              const newDialogue = extractGeminiText(data).trim();
                                              if (newDialogue) {
                                                handleBoxValueChange(segKey, newDialogue);
                                                // Auto-sync to segment prompt after regen
                                                setTimeout(() => saveBoxValue(segKey), 50);
                                              }
                                            } catch (err) {
                                              console.warn('Dialogue regen failed:', err);
                                            } finally {
                                              setEditModes(prev => ({ ...prev, [`flow_seg_dialogue_${i}_loading`]: false }));
                                            }
                                          }}
                                          disabled={editModes[`flow_seg_dialogue_${i}_loading`]}
                                          className="px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold hover:bg-sky-500/40 disabled:opacity-50 flex items-center gap-1"
                                        >
                                          <I name="RefreshCw" size={10} className={editModes[`flow_seg_dialogue_${i}_loading`] ? 'animate-spin' : ''} /> Re-Gen
                                        </button>
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
                            );
                          })}
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
      </div>{/* end sidebar+content wrapper */}

      <footer className={`max-w-7xl mx-auto px-5 sm:px-8 mt-10 pt-10 pb-12 border-t text-center relative z-10 transition-colors duration-300 ${t('border-gray-800', 'border-gray-200')}`}>
        <p className="text-sm font-medium mb-4 tracking-wide text-gray-500">© 2026 Storyboard Studio Architecture.</p>
        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setIsAboutOpen(true)} className="text-sm font-medium text-gray-500 hover:text-sky-500 transition-colors duration-200">View Ecosystem Documentation</button>
          <button onClick={() => setIsHelpOpen(true)} className="text-sm font-medium text-gray-500 hover:text-sky-500 transition-colors duration-200">Terminal Access Guideline</button>
        </div>
      </footer>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setShowShortcuts(false)}>
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl border ${t('bg-[#0d1117] border-gray-700','bg-white border-gray-200')}`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`text-lg font-black ${t('text-white','text-gray-900')}`}>⌨️ Keyboard Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-gray-500 hover:text-white transition-colors"><I name="X" size={18}/></button>
            </div>
            <div className="space-y-2">
              {[
                ['Ctrl + Enter', 'Generate storyboard'],
                ['Ctrl + S', 'Save draft'],
                ['Esc', 'Cancel generation'],
                ['?', 'Toggle shortcuts panel'],
              ].map(([key, desc]) => (
                <div key={key} className={`flex items-center justify-between px-3 py-2 rounded-xl ${t('bg-gray-800/50','bg-gray-50')}`}>
                  <span className={`text-xs ${t('text-gray-400','text-gray-600')}`}>{desc}</span>
                  <kbd className={`px-2 py-1 rounded-lg text-[10px] font-black border ${t('bg-gray-700 border-gray-600 text-sky-400','bg-gray-100 border-gray-300 text-sky-600')}`}>{key}</kbd>
                </div>
              ))}
            </div>
            <p className={`text-[10px] text-center mt-4 ${t('text-gray-600','text-gray-400')}`}>Tekan ? atau klik luar untuk tutup</p>
          </div>
        </div>
      )}

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
                  Access the <strong>MAGIC BOX TUNER</strong> configuration mechanism to apply partial visual adjustment logic natively without affecting fundamental composition references.
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
                className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-hidden animate-fade-in"
                onClick={() => setFullscreenImage(null)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setFullscreenImage(null);
                  if (e.key === 'ArrowLeft' && lightboxIndex !== null && lightboxIndex > 0) {
                    setFullscreenImage(imageUrls[lightboxIndex - 1]);
                    setLightboxIndex(lightboxIndex - 1);
                  }
                  if (e.key === 'ArrowRight' && lightboxIndex !== null && lightboxIndex < imageUrls.length - 1) {
                    setFullscreenImage(imageUrls[lightboxIndex + 1]);
                    setLightboxIndex(lightboxIndex + 1);
                  }
                }}
                ref={el => el?.focus()}
              >
                {/* Close button */}
                <button
                  onClick={() => setFullscreenImage(null)}
                  className="fixed top-5 right-5 z-[80] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/20"
                >
                  <I name="X" size={20} />
                </button>
                {/* Nav arrows */}
                {lightboxIndex !== null && lightboxIndex > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setFullscreenImage(imageUrls[lightboxIndex - 1]); setLightboxIndex(lightboxIndex - 1); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20 backdrop-blur-sm"
                  >
                    <I name="ChevronLeft" size={24} />
                  </button>
                )}
                {lightboxIndex !== null && lightboxIndex < imageUrls.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setFullscreenImage(imageUrls[lightboxIndex + 1]); setLightboxIndex(lightboxIndex + 1); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[80] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all border border-white/20 backdrop-blur-sm"
                  >
                    <I name="ChevronRight" size={24} />
                  </button>
                )}
                {/* Zoom container */}
                <div className="flex items-center justify-center w-full h-full p-8 overflow-auto cursor-grab active:cursor-grabbing"
                  onWheel={(e) => {
                    e.stopPropagation();
                    const img = e.currentTarget.querySelector('img');
                    if (!img) return;
                    const scale = parseFloat(img.dataset.scale || '1');
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    const newScale = Math.max(0.5, Math.min(3, scale + delta));
                    img.style.transform = `scale(${newScale})`;
                    img.dataset.scale = newScale;
                    const zoomLabel = e.currentTarget.querySelector('.zoom-label');
                    if (zoomLabel) zoomLabel.textContent = `${Math.round(newScale * 100)}%`;
                  }}
                >
                  <img
                    src={fullscreenImage}
                    alt="Fullscreen preview"
                    className="max-w-[95vw] max-h-[95vh] w-auto h-auto rounded-xl shadow-2xl transition-transform duration-200"
                    style={{ transform: 'scale(1)' }}
                    data-scale="1"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="zoom-label fixed bottom-6 right-6 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest border border-white/20 z-[80]">100%</span>
                </div>
                {/* Image counter */}
                {lightboxIndex !== null && (
                  <div className="fixed bottom-6 left-6 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest border border-white/20 z-[80]">
                    {lightboxIndex + 1} / {imageUrls.length}
                  </div>
                )}
              </div>
            )}

      {/* Success Popup — Center Modal Overlay */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccessPopup(false)}>
          <div className="animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-4 px-10 py-8 rounded-3xl shadow-2xl border bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400/50 text-white text-center min-w-[280px]">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-bounce-once">
                <I name="CheckCircle" size={36} />
              </div>
              <div>
                <p className="font-black text-lg tracking-wide">Generation Complete!</p>
                <p className="text-sm opacity-90 mt-1">Storyboard & visuals berjaya dihasilkan.</p>
              </div>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-sm font-bold tracking-wide"
              >
                OK, Teruskan
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Toast Notifications */}
      <div className="fixed bottom-16 right-6 z-[90] flex flex-col items-end gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-sm font-bold animate-fade-in-up max-w-xs ${
            toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-300' :
            toast.type === 'error' ? 'bg-red-900/90 border-red-500/50 text-red-300' :
            toast.type === 'warning' ? 'bg-amber-900/90 border-amber-500/50 text-amber-300' :
            'bg-[#11131a]/90 border-gray-700 text-gray-200'
          }`}>
            <I name={toast.type === 'success' ? 'CheckCircle' : toast.type === 'error' ? 'X' : toast.type === 'warning' ? 'ShieldAlert' : 'Info'} size={16} />
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="opacity-60 hover:opacity-100 transition-opacity ml-1">
              <I name="X" size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Generation History Panel */}
      {showHistory && (
        <div className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in" onClick={() => setShowHistory(false)}>
          <div className={`rounded-3xl p-6 max-w-lg w-full max-h-[70vh] overflow-y-auto relative shadow-2xl border custom-scrollbar ${t('bg-[#11131a] border-gray-800', 'bg-white border-gray-200')}`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`font-black text-lg flex items-center gap-2 ${U.c14}`}><I name="Clock" size={20} className="text-sky-400" /> Generation History</h3>
              <button onClick={() => setShowHistory(false)} className={t('text-gray-400 hover:text-white', 'text-gray-500 hover:text-gray-800')}><I name="X" size={20} /></button>
            </div>
            {(genHistory[activeTab] || []).length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No history for this tab yet.</p>
            ) : (
              <div className="space-y-3">
                {(genHistory[activeTab] || []).map((entry, i) => (
                  <div key={i} className={`rounded-2xl border p-4 cursor-pointer transition-all hover:border-sky-500/50 ${t('bg-gray-800/50 border-gray-700', 'bg-gray-50 border-gray-200')}`}
                    onClick={() => {
                      setGeneratedOutput(entry.output);
                      setImageUrls(entry.imageUrls || []);
                      setShowHistory(false);
                      addToast('History restored!', 'success');
                    }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-sky-400">{new Date(entry.timestamp).toLocaleString()}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${t('bg-sky-900/40 text-sky-400', 'bg-sky-100 text-sky-600')}`}>Restore</span>
                    </div>
                    <p className={`text-xs truncate ${t('text-gray-300', 'text-gray-600')}`}>{entry.output?.title || entry.output?.topic || 'Generated output'}</p>
                    {entry.imageUrls?.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {entry.imageUrls.slice(0, 3).map((url, j) => (
                          <img key={j} src={url} alt="" className="w-10 h-16 object-cover rounded-lg border border-gray-700/50" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Changelog Button */}
      <button
        onClick={() => setIsChangelogOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full shadow-xl border transition-all hover:scale-105 ${t('bg-[#11131a] border-gray-700 text-gray-300 hover:border-sky-500', 'bg-white border-gray-200 text-gray-600 hover:border-sky-400')}`}
      >
        <span className="text-sm">📋</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Changelog</span>
        {CHANGELOG.some(c => c.isNew) && (
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
        )}
      </button>

      {/* Changelog Modal */}
      {isChangelogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsChangelogOpen(false)}>
          <div className={`rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto relative shadow-2xl border custom-scrollbar ${t('bg-[#11131a] border-gray-800', 'bg-white border-gray-100')}`} onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsChangelogOpen(false)} className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${t('bg-gray-800 hover:bg-gray-700 text-gray-400', 'bg-gray-50 hover:bg-gray-100')}`}>
              <I name="X" size={18} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t('bg-sky-900/30', 'bg-sky-50')}`}>
                <span className="text-lg">📋</span>
              </div>
              <div>
                <h2 className={`text-lg font-black ${U.c14}`}>Changelog</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Storyboard Studio AI — Update History</p>
              </div>
            </div>
            <div className="space-y-6">
              {CHANGELOG.map((entry, i) => (
                <div key={i} className={`border rounded-2xl p-4 ${t('border-gray-800 bg-gray-900/30', 'border-gray-100 bg-gray-50')}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-black ${t('text-sky-400', 'text-sky-600')}`}>{entry.version}</span>
                    {entry.isNew && <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-sky-500 text-white">NEW</span>}
                    <span className={`text-[10px] ml-auto ${t('text-gray-600', 'text-gray-400')}`}>{entry.date}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {entry.changes.map((change, j) => (
                      <li key={j} className={`text-xs flex items-start gap-2 ${t('text-gray-400', 'text-gray-600')}`}>
                        <span className="text-sky-500 mt-0.5 shrink-0">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
/* --- ANIMATIONS --- */
@keyframes sidebarGlow {
0%, 100% { box-shadow: 0 0 8px 2px rgba(139,92,246,0.4); }
50% { box-shadow: 0 0 18px 6px rgba(139,92,246,0.7); }
}
@keyframes shimmerSweep {
0% { background-position: -200% 0; }
100% { background-position: 200% 0; }
}
@keyframes iconPop {
0% { transform: scale(1); }
50% { transform: scale(1.25); }
100% { transform: scale(1.1); }
}
.sidebar-active-glow { animation: sidebarGlow 2s ease-in-out infinite; }
.sidebar-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmerSweep 1.5s ease-in-out infinite;
}
.sidebar-icon-active { animation: iconPop 0.3s ease-out forwards; }
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
@keyframes bounceOnce {
0% { transform: scale(0.5); opacity: 0; }
50% { transform: scale(1.2); }
70% { transform: scale(0.9); }
100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-once {
animation: bounceOnce 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
}

/* --- FLOATING PARTICLES --- */

@keyframes pulseGlow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* --- MICRO-INTERACTIONS --- */
.btn-shine { position: relative; overflow: hidden; }
.btn-shine::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left 0.5s; }
.btn-shine:hover::before { left: 100%; }
.btn-pulse-valid:not(:disabled) { animation: pulseRing 2s infinite; }
@keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4); } 70% { box-shadow: 0 0 0 12px rgba(56,189,248,0); } 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0); } }

/* --- GLASSMORPHISM ORBS --- */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%);
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  border: 1px solid rgba(56,189,248,0.08);
}
.bg-orb-1 { width: 400px; height: 400px; top: -80px; right: -100px; animation: orbFloat1 30s ease-in-out infinite; background: radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 70%); }
.bg-orb-2 { width: 300px; height: 300px; bottom: 10%; left: -80px; animation: orbFloat2 25s ease-in-out infinite 3s; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 70%); }
.bg-orb-3 { width: 250px; height: 250px; top: 45%; right: 5%; animation: orbFloat3 22s ease-in-out infinite 7s; background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(56,189,248,0.04) 50%, transparent 70%); }
.bg-orb-4 { width: 180px; height: 180px; top: 15%; left: 25%; animation: orbFloat1 28s ease-in-out infinite 12s; background: radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(56,189,248,0.03) 50%, transparent 70%); }

@keyframes orbFloat1 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(40px, -30px) scale(1.05); } 66% { transform: translate(-20px, 20px) scale(0.95); } }
@keyframes orbFloat2 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-30px, 40px) scale(1.08); } 66% { transform: translate(25px, -15px) scale(0.92); } }
@keyframes orbFloat3 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, 30px) scale(0.96); } 66% { transform: translate(-35px, -20px) scale(1.04); } }

/* --- GLASS CARD --- */
.glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(56,189,248,0.05);
}

/* --- GRADIENT TEXT --- */
.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #06b6d4 50%, #818cf8 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

/* --- MAGIC GLOW BORDER --- */
.glow-border {
  position: relative;
  overflow: hidden;
}
.glow-border::before {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: inherit;
  background: linear-gradient(45deg, transparent, rgba(56,189,248,0.15), transparent, rgba(6,182,212,0.15), transparent);
  background-size: 400% 400%;
  animation: gradientShift 6s ease infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s;
}
.glow-border:hover::before {
  opacity: 1;
}

/* --- HERO GLOW --- */
.hero-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulseGlow 4s ease-in-out infinite;
  pointer-events: none;
}

/* --- ICON PULSE --- */
.icon-pulse {
  display: inline-flex;
  animation: pulseGlow 2s ease-in-out infinite;
}

/* --- SCROLLBAR --- */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #7dd3fc; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #38bdf8; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #7dd3fc; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #38bdf8; }
` }} />
    </div>
  );
}
