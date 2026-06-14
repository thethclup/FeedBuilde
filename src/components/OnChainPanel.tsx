import React from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage, useSendTransaction, useSendCalls } from 'wagmi';
import { parseEther, concat } from 'viem';
import { injected } from 'wagmi/connectors';
import { SiweMessage } from 'siwe';
import { useGameStore } from '../store/gameStore';

const BUILDER_SUFFIX = '0x07626173656170700080218021802180218021802180218021';

export function OnChainPanel() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { sendTransaction } = useSendTransaction();
  const { sendCalls } = useSendCalls();
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
      if (sendCalls) {
        sendCalls({
          calls: [
            {
              to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
              value: parseEther('0'),
              data: '0x',
            }
          ],
          capabilities: {
            dataSuffix: {
              value: BUILDER_SUFFIX,
              optional: true,
            }
          }
        });
      } else {
        const attributedCalldata = concat(['0x', BUILDER_SUFFIX]);
        sendTransaction({
          to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
          value: parseEther('0'),
          data: attributedCalldata,
        });
      }
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
