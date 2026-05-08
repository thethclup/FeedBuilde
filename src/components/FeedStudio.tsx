import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useGameStore } from '../store/gameStore';
import { SortablePost } from './SortablePost';

export function FeedStudio() {
  const { feed, reorderFeed } = useGameStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5,
        }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const {active, over} = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = feed.findIndex((i) => i.id === active.id);
      const newIndex = feed.findIndex((i) => i.id === over.id);
      reorderFeed(oldIndex, newIndex);
      navigator.vibrate?.(50);
    }
  }

  return (
    <div className="flex-1 px-4 flex flex-col relative min-h-full">
       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <SortableContext items={feed.map(f => f.id)} strategy={verticalListSortingStrategy}>
           <div className="flex flex-col gap-3 pb-8">
             {feed.map(post => <SortablePost key={post.id} post={post} />)}
             
             {feed.length === 0 ? (
                <div className="mt-4 border-2 border-dashed border-[#333] rounded-2xl h-32 flex flex-col items-center justify-center text-[#444]">
                  <span className="text-[10px] font-bold">DRAG CONTENT HERE</span>
                  <span className="text-[8px] uppercase tracking-widest mt-1">TO OPTIMIZE FLOW</span>
                </div>
             ) : (
                <div className="mt-2 text-center opacity-50 relative z-0">
                  <div className="w-1 h-8 mx-auto border-l-2 border-dashed border-[#333]"></div>
                </div>
             )}
           </div>
         </SortableContext>
       </DndContext>
    </div>
  )
}
