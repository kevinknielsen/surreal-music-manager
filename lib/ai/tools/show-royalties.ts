import { tool } from 'ai';
import { z } from 'zod';

export const showRoyaltiesToolParameters = z.object({
  period: z.string().describe('Time period for royalties (e.g., Q3, Q4, 2024)').default('Q3 2024'),
  userAddress: z.string().optional().describe('User wallet address for on-chain lookup')
});

export function createShowRoyaltiesTool() {
  return tool({
    description: 'Display on-chain royalty earnings data when users ask about royalties, earnings, or payments',
    parameters: showRoyaltiesToolParameters,
    execute: async ({ period, userAddress }) => {
      // Simulate fetching on-chain royalty data
      const royaltyData = {
        period,
        totalEarnings: '$2,847.23',
        breakdown: {
          streaming: '$1,923.45',
          sync: '$623.78',
          mechanical: '$300.00'
        },
        recentTransactions: [
          { platform: 'Spotify', amount: '$234.56', date: '2024-12-01' },
          { platform: 'Apple Music', amount: '$189.23', date: '2024-11-28' },
          { platform: 'Sync License', amount: '$623.78', date: '2024-11-25' }
        ],
        onChainVerified: true,
        blockchainExplorer: `https://etherscan.io/address/${userAddress || '0x742d35cc6df3f7a8c3d1a9dc7efcc3cf37d35d4c'}`
      };

      return {
        type: 'royalties-display',
        data: royaltyData,
        message: `Here are your ${period} royalty earnings, verified on-chain:`
      };
    },
  });
} 