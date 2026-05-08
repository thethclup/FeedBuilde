import React from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { SiweMessage } from 'siwe';
import { useGameStore } from '../store/gameStore';

export function OnChainPanel() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { engagementScore, prestigeCount, money, revenueRate } = useGameStore();

  const handleRecordEmpire = async () => {
    if (!address) return;
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Record my Feed Empire! Engagement: ${Math.floor(engagementScore)}, Prestige: ${prestigeCount}`,
        uri: window.location.origin,
        version: '1',
        chainId: 8453, // Base Mainnet
      });
      const signature = await signMessageAsync({
        account: address as `0x${string}`,
        message: message.prepareMessage(),
      });
      
      const res = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature })
      });
      if(res.ok) {
        alert("Empire recorded on Base Mainnet successfully!");
      } else {
        alert("Verification failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSayGM = async () => {
    if (!address) return;
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Say GM on-chain with Feed Builder (Builder Code: bc_kdf087np)`,
        uri: window.location.origin,
        version: '1',
        chainId: 8453,
      });
      await signMessageAsync({
        account: address as `0x${string}`,
        message: message.prepareMessage(),
      });
      alert('GM recorded on-chain! Gggggm ☕️');
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="p-4 bg-[#111] border-t border-[#222]">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] text-[#666]">REVENUE RATE</span>
        <span className="text-[10px] text-[#00FF94]">+{revenueRate.toFixed(1)} / sec</span>
      </div>
      <div className="flex items-center justify-between mb-3 border-t border-[#222] pt-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse"></div>
          <span className="text-[10px] text-[#666] font-bold">BASE MAINNET ACTIVE</span>
        </div>
        <span className="text-[10px] text-[#00FF94] font-mono">${money.toLocaleString(undefined, {maximumFractionDigits:0})} TOTAL</span>
      </div>
      
      {!isConnected ? (
        <button 
          onClick={() => connect({ connector: injected() })}
          className="w-full py-3 bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-white text-[11px] font-black rounded-lg uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          CONNECT BASE WALLET
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <button 
             onClick={handleSayGM}
             className="w-full py-2 bg-[#222] text-[#00D1FF] border border-[#00D1FF]/30 text-[10px] font-bold rounded hover:bg-[#333] transition-colors uppercase tracking-widest"
          >
             SAY GM ON-CHAIN
          </button>
          <button 
             onClick={handleRecordEmpire}
             className="w-full py-3 bg-white text-black text-[11px] font-black rounded hover:bg-[#DDD] transition-colors tracking-widest"
          >
             RECORD EMPIRE ON-CHAIN
          </button>
          <div className="flex justify-end relative z-50">
             <button 
               onClick={() => disconnect()}
               className="text-[9px] text-[#666] hover:text-[#999] uppercase pr-1 cursor-pointer"
             >
               Disconnect
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
