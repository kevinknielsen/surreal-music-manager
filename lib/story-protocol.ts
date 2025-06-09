import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http } from "viem";
import { privateKeyToAccount, Address, Account } from "viem/accounts";

// Story Protocol configuration
export function createStoryClient(): StoryClient | null {
  try {
    const privateKey = process.env.STORY_PRIVATE_KEY;
    const rpcUrl = process.env.STORY_RPC_URL || 'https://aeneid.storyrpc.io';

    if (!privateKey) {
      console.warn('STORY_PRIVATE_KEY not found - Story Protocol features will use mock data');
      return null;
    }

    // Ensure privateKey has the 0x prefix
    const formattedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const account: Account = privateKeyToAccount(formattedKey as Address);

    const config: StoryConfig = {
      account: account,
      transport: http(rpcUrl),
      chainId: "aeneid", // Story Protocol testnet
    };

    return StoryClient.newClient(config);
  } catch (error) {
    console.error('Failed to create Story Protocol client:', error);
    return null;
  }
}

// Types for Story Protocol responses
export interface StoryProtocolResult {
  success: boolean;
  data?: {
    trackName: string;
    artistName: string;
    licenseType: string;
    royaltyPercentage: number;
    description?: string;
    txHash: string;
    ipAssetId: string;
    explorerUrl: string;
    storyExplorerUrl: string;
    licenseTerms?: any;
    timestamp: string;
    isDemoMode?: boolean;
  };
  error?: string;
  details?: string;
  isBlockchainError?: boolean;
} 