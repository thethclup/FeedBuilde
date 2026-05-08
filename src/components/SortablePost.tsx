import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FeedPost, useGameStore } from '../store/gameStore';
import { Trash2 } from 'lucide-react';

export function SortablePost({ post, key }: { post: FeedPost; key?: React.Key }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: post.id });
  const { removePost } = useGameStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 50 : 1,
    position: 'relative' as any,
  };

  const getStyleData = (type: string) => {
     switch(type) {
        case 'meme': return { color: 'from-[#FFD700] to-orange-500', name: 'MEME' };
        case 'news': return { color: 'from-[#7000FF] to-blue-500', name: 'NEWS' };
        case 'video': return { color: 'from-[#00D1FF] to-teal-500', name: 'VIDEO' };
        case 'poll': return { color: 'from-[#00FF94] to-green-500', name: 'POLL' };
        case 'thread': return { color: 'from-white to-gray-400', name: 'THREAD' };
        case 'ad': return { color: 'from-[#FF005C] to-red-500', name: 'ADVERTISEMENT' };
        default: return { color: 'from-gray-500 to-gray-800', name: 'CONTENT' };
     }
  };

  const styleData = getStyleData(post.type);

  return (
    <div ref={setNodeRef} style={style} className="bg-[#161616] border border-[#333] rounded-2xl p-4 flex flex-col gap-2 relative group touch-none cursor-grab">
      <div className="absolute inset-0 z-0" {...attributes} {...listeners}></div>

      <div className="flex justify-between items-start relative z-10 w-full">
        <div className="flex gap-2 items-center pointer-events-none p-1">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${styleData.color}`}></div>
          <div className="text-[10px] font-bold text-white tracking-wider">{styleData.name}</div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); navigator.vibrate?.(30); removePost(post.id); }}
          className="text-[#444] hover:text-[#FF005C] transition z-20 pointer-events-auto p-2 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="h-12 bg-[#222] rounded-lg mt-1 relative overflow-hidden pointer-events-none">
         <div className="absolute bottom-2 right-2 flex gap-1">
           <div className="px-2 py-1 bg-[#333] text-white text-[8px] font-bold rounded">
             {post.engagement} ENG
           </div>
           {post.type === 'ad' && (
             <div className="px-2 py-1 bg-[#FF005C] text-white text-[8px] font-bold rounded">
               PROMOTED
             </div>
           )}
         </div>
      </div>
      
      <div className="flex justify-between mt-1 pointer-events-none">
        <div className="flex gap-2 text-[8px] font-mono text-[#666]">
           <span>E:{post.engagement.toFixed(1)}</span>
           <span>M:{post.monetization.toFixed(1)}</span>
           <span className={post.toxicity > 2 ? 'text-[#FF005C]' : ''}>T:{post.toxicity.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
