import React from 'react';
import { useGameStore } from '../store/gameStore';

export function UpgradesPanel() {
  const { money, upgrades, upgradeAlgorithm, upgradeServer, upgradeModeration, prestige, prestigeMultiplier } = useGameStore();

  const algoCost = Math.floor(100 * Math.pow(1.5, upgrades.algorithm));
  const serverCost = Math.floor(200 * Math.pow(1.5, upgrades.serverCapacity));
  const modCost = Math.floor(150 * Math.pow(1.5, upgrades.moderation));

  return (
    <>
      <div className="p-4 border-b border-[#222]">
        <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest">Algorithm Lab</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 hide-scrollbar">
        <UpgradeItem 
           icon="🧠" bgClass="bg-[#7000FF]/20" iconColor="text-[#7000FF]"
           title="Neural Rec"
           level={upgrades.algorithm}
           barColor="bg-[#7000FF]"
           cost={algoCost}
           canAfford={money >= algoCost}
           onClick={upgradeAlgorithm}
        />

        <UpgradeItem 
           icon="⚡" bgClass="bg-[#00D1FF]/20" iconColor="text-[#00D1FF]"
           title="Server Speed"
           level={upgrades.serverCapacity}
           barColor="bg-[#00D1FF]"
           cost={serverCost}
           canAfford={money >= serverCost}
           onClick={upgradeServer}
        />

        <UpgradeItem 
           icon="☣️" bgClass="bg-[#FF005C]/20" iconColor="text-[#FF005C]"
           title="Anti-Toxicity"
           level={upgrades.moderation}
           barColor="bg-[#FF005C]"
           cost={modCost}
           canAfford={money >= modCost}
           onClick={upgradeModeration}
        />

        {/* Analytics Mini Graph */}
        <div className="mt-4 hidden lg:block">
          <h4 className="text-[10px] font-bold text-[#444] uppercase mb-2 flex justify-between">
            <span>Weekly Retention</span>
            <span className="text-[#00FF94]">+{(prestigeMultiplier - 1).toFixed(1)}x Multi</span>
          </h4>
          <div className="h-24 bg-[#050505] border border-[#222] rounded flex items-end justify-between p-1">
            <div className="w-4 bg-[#00D1FF] opacity-20 h-12 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] opacity-30 h-16 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] opacity-50 h-20 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] opacity-70 h-14 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] opacity-90 h-18 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] h-22 rounded-t-sm"></div>
            <div className="w-4 bg-[#00D1FF] h-14 opacity-40 rounded-t-sm"></div>
          </div>
        </div>
        
        <div className="mt-2">
            <button 
                onClick={() => {
                   if (confirm("Are you sure? This resets everything except your multiplier!")) {
                      prestige();
                   }
                }}
                className="w-full py-2 bg-transparent text-[#FF005C] border border-[#FF005C]/30 text-[10px] font-bold rounded hover:bg-[#FF005C]/10 transition-colors uppercase tracking-widest mt-2"
            >
                HARD RESET EMPIRE
            </button>
        </div>
      </div>
    </>
  );
}

function UpgradeItem({ icon, bgClass, title, level, barColor, cost, canAfford, onClick }: any) {
  const percent = Math.min(100, level * 5); // visually
  return (
    <button 
       onClick={onClick}
       disabled={!canAfford}
       className={`w-full bg-[#111] border ${canAfford ? 'border-[#333] hover:border-[#555]' : 'border-[#222] opacity-50'} p-3 rounded-xl flex flex-col text-left transition-all group cursor-pointer`}
    >
        <div className="flex items-center gap-3 w-full">
          <div className={`w-10 h-10 shrink-0 ${bgClass} rounded-lg flex items-center justify-center text-xl`}>{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center whitespace-nowrap">
              <span className="text-[11px] font-bold group-hover:text-white transition-colors truncate">{title}</span>
              <span className="text-[10px] text-[#00FF94] ml-2">LVL {level}</span>
            </div>
            <div className="w-full h-1 bg-[#222] mt-1 relative overflow-hidden">
              <div className={`absolute top-0 left-0 h-full ${barColor}`} style={{width: `${percent}%`}}></div>
            </div>
            <div className="mt-1 text-[9px] text-[#666] font-mono">${cost.toLocaleString()}</div>
          </div>
        </div>
    </button>
  );
}
