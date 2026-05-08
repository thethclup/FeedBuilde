import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAccount } from 'wagmi';

export function Header() {
  const { retention, processTick } = useGameStore();
  const { address, isConnected } = useAccount();

  // The main game loop!
  useEffect(() => {
    const interval = setInterval(() => {
      processTick();
    }, 1000);
    return () => clearInterval(interval);
  }, [processTick]);

  return (
    <header className="h-16 border-b border-[#222] bg-[#0A0A0A] flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00D1FF] to-[#7000FF] rounded-lg flex items-center justify-center font-bold text-black">F</div>
        <h1 className="text-lg font-bold tracking-tight uppercase hidden sm:block">Feed Builder <span className="text-[#00D1FF] text-xs font-mono ml-2">v1.04</span></h1>
      </div>
      
      <div className="flex gap-4 lg:gap-8 items-center h-full">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-[#666] uppercase tracking-widest">Algorithm Health</span>
          <div className="w-24 lg:w-32 h-1 bg-[#222] mt-1 relative">
            <div className="h-full bg-[#00FF94] shadow-[0_0_8px_#00FF94] absolute top-0 left-0 transition-all duration-500" style={{width: `${Math.max(0, Math.min(100, retention))}%`}}></div>
          </div>
        </div>
        <div className="h-8 w-px bg-[#222] hidden sm:block"></div>
        <button className="bg-[#0052FF] hover:bg-[#0042CC] text-white px-3 py-2 lg:px-4 lg:py-2 rounded text-xs font-bold transition-all border border-white/10 hidden sm:block">
          {isConnected ? `CONNECTED: ${address?.slice(0,6)}...${address?.slice(-4)}` : 'DISCONNECTED'}
        </button>
      </div>
    </header>
  );
}
