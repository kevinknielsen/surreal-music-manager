'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SyncLicenseButton } from './sync-license-button';
import { Music, Shield, Globe } from 'lucide-react';

interface SyncLicenseResultProps {
  trackName: string;
  artistName: string;
  description?: string;
}

export function SyncLicenseResult({ trackName, artistName, description }: SyncLicenseResultProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          <CardTitle className="text-lg">Sync License Token</CardTitle>
        </div>
        <CardDescription>
          Ready to mint blockchain-based sync licensing for your track
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <span className="font-medium">Track:</span> {trackName}
          </div>
          <div>
            <span className="font-medium">Artist:</span> {artistName}
          </div>
          {description && (
            <div>
              <span className="font-medium">Notes:</span> {description}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-secondary px-2 py-1 rounded-md flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Story Protocol
          </span>
          <span className="text-xs border px-2 py-1 rounded-md flex items-center gap-1">
            <Globe className="h-3 w-3" />
            On-chain
          </span>
        </div>

        <div className="border-t pt-4">
          <SyncLicenseButton 
            trackName={trackName}
            artistName={artistName}
            onSuccess={(result) => {
              console.log('Sync license minted:', result);
            }}
          />
        </div>

        <div className="text-xs text-muted-foreground">
          This creates a blockchain token granting non-exclusive sync rights for TV, film, and advertising use.
        </div>
      </CardContent>
    </Card>
  );
} 