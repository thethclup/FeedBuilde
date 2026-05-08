import React from 'react';
import { Web3Provider } from './components/Web3Provider';
import { Header } from './components/Header';
import { FeedStudio } from './components/FeedStudio';
import { ContentPalette } from './components/ContentPalette';
import { UpgradesPanel } from './components/UpgradesPanel';
import { OnChainPanel } from './components/OnChainPanel';
import { useGameStore } from './store/gameStore';

export default function App() {
  const { engagementScore, retention } = useGameStore();
  
  return (
    <Web3Provider>
      <div className="w-full h-screen bg-[#050505] text-[#E0E0E0] font-sans flex flex-col overflow-hidden selection:bg-[#00D1FF]/30">
        <Header />
        
        <main className="flex-1 flex overflow-hidden flex-col lg:flex-row">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-[#222] bg-[#0A0A0A] flex flex-col p-4 gap-4 shrink-0 overflow-y-auto hide-scrollbar z-20">
             <ContentPalette />
          </aside>

          {/* Center: Feed Studio Preview */}
           <section className="flex-1 bg-[#050505] flex flex-col items-center justify-center p-4 lg:p-8 relative overflow-hidden">
             {/* Grid Decorative Background */}
             <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
             
             {/* Mobile Canvas Emulator */}
             <div className="w-full max-w-[360px] h-full max-h-[720px] lg:w-[320px] lg:h-[640px] bg-[#0A0A0A] rounded-[40px] border-[6px] border-[#222] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative z-10">
                
                {/* In-game UI overlay */}
                <div className="absolute top-6 left-0 right-0 px-4 flex justify-between items-center z-20 pointer-events-none">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur rounded-full border border-white/10 text-[10px] font-bold">
                    ENGAGEMENT: <span className="text-[#00D1FF]">{Math.floor(engagementScore).toLocaleString()}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-xs">⚙️</div>
                </div>

                <div className="flex-1 pt-16 pb-16 overflow-y-auto hide-scrollbar relative z-10">
                  <FeedStudio />
                </div>

                {/* Bottom bar overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0052FF] flex items-center justify-center pointer-events-none z-20">
                   <span className="text-white font-black text-xs tracking-widest">BUILDING EMPIRE ON BASE</span>
                </div>
             </div>
           </section>

          {/* Right Sidebar: Algorithm Lab */}
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[#222] bg-[#0A0A0A] flex flex-col overflow-y-auto hide-scrollbar shrink-0 z-20">
             <UpgradesPanel />
             <div className="mt-auto">
               <OnChainPanel />
             </div>
          </aside>
        </main>

        <footer className="h-8 bg-[#0052FF] text-white flex items-center px-4 gap-6 overflow-hidden shrink-0 hidden lg:flex">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-tighter">Empire Builder Code:</span>
            <span className="text-[10px] font-mono bg-white/20 px-2 rounded">bc_kdf087np</span>
          </div>
          <div className="w-px h-3 bg-white/30 hidden xl:block"></div>
          <div className="flex-1 flex gap-8 items-center hidden xl:flex">
            <span className="text-[10px] font-bold flex gap-1">ENGAGEMENT <span className="opacity-70">{Math.floor(engagementScore).toLocaleString()}</span></span>
            <span className="text-[10px] font-bold flex gap-1">RETENTION <span className="opacity-70">{retention.toFixed(1)}%</span></span>
            <span className="text-[10px] font-bold flex gap-1">TRENDING <span className="text-black">#BASE_SUMMER</span></span>
          </div>
          <div className="text-[9px] font-bold opacity-70 tracking-widest hidden md:block mt-auto mb-auto ml-auto">ERC-8004 TRUSTLESS AGENT SYNCED</div>
        </footer>
      </div>
    </Web3Provider>
  );
}
