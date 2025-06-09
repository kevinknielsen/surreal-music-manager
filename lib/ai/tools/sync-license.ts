import { tool } from 'ai';
import { z } from 'zod';
import type { Session } from 'next-auth';

// Story Protocol License Types
export const LICENSE_TYPES = {
  SYNC: 'sync',
  COMMERCIAL_REMIX: 'commercial-remix', 
  NON_COMMERCIAL: 'non-commercial',
  ATTRIBUTION: 'attribution',
  DERIVATIVE: 'derivative',
  EXCLUSIVE: 'exclusive'
} as const;

export type LicenseType = typeof LICENSE_TYPES[keyof typeof LICENSE_TYPES];

export const LICENSE_DESCRIPTIONS = {
  [LICENSE_TYPES.SYNC]: 'Sync License - for TV, film, advertising, and media synchronization',
  [LICENSE_TYPES.COMMERCIAL_REMIX]: 'Commercial Remix License - allows others to remix and monetize derivatives',
  [LICENSE_TYPES.NON_COMMERCIAL]: 'Non-Commercial License - free use for personal/educational purposes only',
  [LICENSE_TYPES.ATTRIBUTION]: 'Attribution License - free use with required credit',
  [LICENSE_TYPES.DERIVATIVE]: 'Derivative Works License - building upon existing IP',
  [LICENSE_TYPES.EXCLUSIVE]: 'Exclusive License - one-time rights transfer'
};

export const storyProtocolLicenseTool = tool({
  description: 'Register music as an IP Asset on Story Protocol with comprehensive licensing. Use for any music licensing, IP registration, rights management, sync licensing, commercial rights, or monetization requests. Transforms tracks into blockchain-based IP Assets with automated royalty distribution.',
  parameters: z.object({
    trackName: z.string().describe('Name of the track to register as IP Asset'),
    artistName: z.string().describe('Name of the artist/IP owner'),
    licenseType: z.enum(['sync', 'commercial-remix', 'non-commercial', 'attribution', 'derivative', 'exclusive']).optional().describe('Story Protocol license type to create'),
    royaltyPercentage: z.number().min(0).max(100).optional().describe('Royalty percentage for Story Protocol revenue sharing (0-100)'),
    description: z.string().optional().describe('Additional context about the IP Asset or licensing strategy')
  }),
  execute: async ({ trackName, artistName, licenseType = 'sync', royaltyPercentage = 5, description }) => {
    return {
      type: 'story-protocol-license',
      trackName,
      artistName,
      licenseType,
      royaltyPercentage,
      description,
      message: `Ready to register "${trackName}" by ${artistName} as an IP Asset on Story Protocol with ${LICENSE_DESCRIPTIONS[licenseType as LicenseType]}`,
      licenseDescription: LICENSE_DESCRIPTIONS[licenseType as LicenseType],
      features: [
        'On-chain IP registration',
        'Automated royalty distribution', 
        'Global rights tracking',
        'Derivative work monitoring',
        'Revenue transparency'
      ]
    };
  },
});

export function createStoryProtocolLicenseTool({ session }: { session: Session }) {
  return tool({
    description: 'Register music as IP Assets on Story Protocol with comprehensive licensing and automated royalty distribution. Use for music licensing, IP registration, sync rights, commercial rights, derivative works, or any music monetization requests.',
    parameters: z.object({
      trackName: z.string().describe('Name of the track to register as IP Asset'),
      artistName: z.string().describe('Name of the artist/IP owner'),
      licenseType: z.enum(['sync', 'commercial-remix', 'non-commercial', 'attribution', 'derivative', 'exclusive']).optional(),
      royaltyPercentage: z.number().min(0).max(100).optional(),
      description: z.string().optional().describe('Additional context about the IP Asset')
    }),
    execute: async ({ trackName, artistName, licenseType = 'sync', royaltyPercentage = 5, description }) => {
      return {
        type: 'story-protocol-license',
        data: {
          trackName,
          artistName,
          licenseType,
          royaltyPercentage,
          description,
          userId: session.user?.id,
          userName: session.user?.name
        }
      };
    },
  });
}

// Legacy export for backwards compatibility
export const syncLicenseTool = storyProtocolLicenseTool;
export const createSyncLicenseTool = createStoryProtocolLicenseTool; 