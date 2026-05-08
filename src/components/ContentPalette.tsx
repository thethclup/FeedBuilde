import React from 'react';
import { useGameStore, PostType } from '../store/gameStore';
import { motion } from 'motion/react';

const PALETTE_ITEMS: { type: PostType; label: string; icon: string; bgClass: string; textClass: string; hoverShadow: string }[] = [
  { type: 'meme', label: 'MEME', icon: '🖼️', bgClass: 'bg-[#FFD700]/10', textClass: 'text-[#FFD700]', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]' },
  { type: 'poll', label: 'POLL', icon: '📊', bgClass: 'bg-[#00FF94]/10', textClass: 'text-[#00FF94]', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(0,255,148,0.3)]' },
  { type: 'video', label: 'VIDEO', icon: '🎥', bgClass: 'bg-[#00D1FF]/10', textClass: 'text-[#00D1FF]', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(0,209,255,0.3)]' },
  { type: 'ad', label: 'AD', icon: '🔥', bgClass: 'bg-[#FF005C]/10', textClass: 'text-[#FF005C]', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(255,0,92,0.3)]' },
  { type: 'news', label: 'NEWS', icon: '📰', bgClass: 'bg-[#7000FF]/10', textClass: 'text-[#7000FF]', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(112,0,255,0.3)]' },
  { type: 'thread', label: 'THREAD', icon: '🧵', bgClass: 'bg-white/10', textClass: 'text-white', hoverShadow: 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]' },
];

export function ContentPalette() {
  const { addPost, feed, feedCapacity } = useGameStore();

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest">Content Vault</h3>
        <span className="bg-[#222] text-[#00D1FF] text-[10px] px-2 py-0.5 rounded">{Math.max(0, feedCapacity - feed.length)} AVAILABLE</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {PALETTE_ITEMS.map((item) => (
          <motion.div
            whileTap={{ scale: 0.95 }}
            key={item.type}
            onClick={() => { addPost(item.type); navigator.vibrate?.(40); }}
            className={`aspect-square bg-[#111] border border-[#333] rounded-xl flex flex-col items-center justify-center gap-2 transition-all group ${feed.length >= feedCapacity ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#161616]'}`}
          >
            <div className={`w-10 h-10 ${item.bgClass} rounded-full flex items-center justify-center ${item.textClass} ${item.hoverShadow} transition-shadow text-lg`}>{item.icon}</div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
}
