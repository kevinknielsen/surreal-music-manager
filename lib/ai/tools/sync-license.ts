import { tool } from 'ai';
import { z } from 'zod';
import type { Session } from 'next-auth';

export const syncLicenseTool = tool({
  description: 'Register music as IP Asset on Story Protocol and create sync licensing rights. Use when user mentions "sync", "licensing", "clear for sync", "register IP", or wants to license their music.',
  parameters: z.object({
    trackName: z.string().describe('Name of the track to license'),
    artistName: z.string().describe('Name of the artist'),
    description: z.string().optional().describe('Additional description or context about the licensing request')
  }),
  execute: async ({ trackName, artistName, description }) => {
    // This tool returns the data for the UI component to handle
    // The actual Story Protocol registration will be triggered by the button click
    return {
      type: 'sync-license-interface',
      trackName,
      artistName,
      description,
      message: `Ready to register "${trackName}" by ${artistName} on Story Protocol as an IP Asset with sync licensing rights. This will create an on-chain record that enables automatic royalty tracking and licensing.`,
      buttonText: 'Register on Story Protocol',
      terms: 'Creates IP Asset with Commercial Sync License - enables revenue sharing when your music is used in media productions (TV, film, ads, etc.)'
    };
  },
});

export function createSyncLicenseTool({ session }: { session: Session }) {
  return tool({
    description: 'Create a sync-license token for a music track using Story Protocol',
    parameters: z.object({
      trackName: z.string().describe('Name of the track to license'),
      artistName: z.string().describe('Name of the artist'),
      description: z.string().optional().describe('Additional description about the licensing')
    }),
    execute: async ({ trackName, artistName, description }) => {
      return {
        type: 'sync-license-component',
        data: {
          trackName,
          artistName,
          description,
          userId: session.user?.id,
          userName: session.user?.name
        }
      };
    },
  });
} 