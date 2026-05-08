import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type PostType = 'meme' | 'news' | 'video' | 'poll' | 'thread' | 'ad';

export interface FeedPost {
  id: string;
  type: PostType;
  engagement: number;
  monetization: number;
  toxicity: number;
  createdAt: number;
}

export interface Upgrades {
  algorithm: number;
  serverCapacity: number;
  moderation: number;
  recommendation: number;
}

export interface GameState {
  engagementScore: number;
  money: number;
  retention: number;
  toxicity: number;
  revenueRate: number;
  
  feed: FeedPost[];
  feedCapacity: number;
  
  upgrades: Upgrades;
  prestigeMultiplier: number;
  prestigeCount: number;
  
  addPost: (type: PostType) => void;
  reorderFeed: (startIndex: number, endIndex: number) => void;
  removePost: (id: string) => void;
  upgradeAlgorithm: () => void;
  upgradeServer: () => void;
  upgradeModeration: () => void;
  processTick: () => void;
  prestige: () => void;
}

const POST_STATS: Record<PostType, { e: number; m: number; t: number }> = {
  meme: { e: 10, m: 0, t: 1 },
  news: { e: 5, m: 2, t: 5 },
  video: { e: 15, m: 5, t: 2 },
  poll: { e: 8, m: 0, t: 0 },
  thread: { e: 12, m: 1, t: 3 },
  ad: { e: -5, m: 20, t: 0 },
};

const MAX_RETENTION = 100;

export const useGameStore = create<GameState>((set, get) => ({
  engagementScore: 0,
  money: 0,
  retention: 100,
  toxicity: 0,
  revenueRate: 0,
  
  feed: [],
  feedCapacity: 10,
  
  upgrades: {
    algorithm: 1,
    serverCapacity: 1,
    moderation: 1,
    recommendation: 1,
  },
  
  prestigeMultiplier: 1,
  prestigeCount: 0,

  addPost: (type) => set((state) => {
    if (state.feed.length >= state.feedCapacity) return state;
    
    const stats = POST_STATS[type];
    const newPost: FeedPost = {
      id: uuidv4(),
      type,
      engagement: stats.e,
      monetization: stats.m,
      toxicity: stats.t,
      createdAt: Date.now(),
    };
    
    return { feed: [newPost, ...state.feed] };
  }),

  reorderFeed: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.feed);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { feed: result };
  }),

  removePost: (id) => set((state) => ({
    feed: state.feed.filter(p => p.id !== id)
  })),

  upgradeAlgorithm: () => set((state) => {
    const cost = Math.floor(100 * Math.pow(1.5, state.upgrades.algorithm));
    if (state.money >= cost) {
      return {
        money: state.money - cost,
        upgrades: { ...state.upgrades, algorithm: state.upgrades.algorithm + 1 }
      };
    }
    return state;
  }),
  
  upgradeServer: () => set((state) => {
    const cost = Math.floor(200 * Math.pow(1.5, state.upgrades.serverCapacity));
    if (state.money >= cost) {
      return {
        money: state.money - cost,
        upgrades: { ...state.upgrades, serverCapacity: state.upgrades.serverCapacity + 1 },
        feedCapacity: state.feedCapacity + 5
      };
    }
    return state;
  }),

  upgradeModeration: () => set((state) => {
    const cost = Math.floor(150 * Math.pow(1.5, state.upgrades.moderation));
    if (state.money >= cost) {
      return {
        money: state.money - cost,
        upgrades: { ...state.upgrades, moderation: state.upgrades.moderation + 1 }
      };
    }
    return state;
  }),

  processTick: () => set((state) => {
    let totalE = 0;
    let totalM = 0;
    let currentToxicity = 0;

    // Calculate synergys (rudimentary - adjacent posts of same type give bonus)
    state.feed.forEach((post, i) => {
      let multiplier = 1;
      
      // Algorithm Upgrade Modifier
      multiplier += (state.upgrades.algorithm * 0.1); 
      
      // Synergy
      if (i > 0 && state.feed[i-1].type === post.type) {
        multiplier += 0.5; // Combo bonus
      }

      totalE += post.engagement * multiplier;
      totalM += post.monetization * multiplier;
      currentToxicity += post.toxicity;
    });

    // Apply moderation
    const effectivelyToxicity = Math.max(0, currentToxicity - (state.upgrades.moderation * 2));
    
    // Impact retention
    let newRetention = state.retention;
    if (effectivelyToxicity > 10) {
      newRetention = Math.max(0, newRetention - 1);
    } else if (effectivelyToxicity === 0) {
      newRetention = Math.min(MAX_RETENTION, newRetention + 0.5);
    }

    const finalEMulti = (newRetention / 100) * state.prestigeMultiplier;
    
    const newRev = totalM * finalEMulti;

    return {
      engagementScore: state.engagementScore + (totalE * finalEMulti),
      money: state.money + newRev,
      revenueRate: newRev,
      toxicity: effectivelyToxicity,
      retention: newRetention
    };
  }),

  prestige: () => set((state) => ({
    engagementScore: 0,
    money: 0,
    retention: 100,
    toxicity: 0,
    revenueRate: 0,
    feed: [],
    feedCapacity: 10,
    upgrades: {
      algorithm: 1,
      serverCapacity: 1,
      moderation: 1,
      recommendation: 1,
    },
    prestigeCount: state.prestigeCount + 1,
    prestigeMultiplier: state.prestigeMultiplier + 0.5,
  }))
}));
