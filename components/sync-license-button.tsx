'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink } from 'lucide-react';
import { toast } from '@/components/toast';

interface SyncLicenseButtonProps {
  trackName?: string;
  artistName?: string;
  onSuccess?: (result: any) => void;
}

export function SyncLicenseButton({ trackName = 'Water', artistName = 'Artist', onSuccess }: SyncLicenseButtonProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [lastMintResult, setLastMintResult] = useState<any>(null);

  const handleMint = async () => {
    try {
      setIsMinting(true);
      
      const response = await fetch('/api/mint-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackName,
          artistName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastMintResult(result);
        onSuccess?.(result);
        
        toast({
          type: 'success',
          description: `✅ IP Asset registered on Story Protocol! Tx: ${result.txHash.slice(0, 8)}...`,
        });
      } else {
        throw new Error(result.error || 'Minting failed');
      }
    } catch (error) {
      console.error('Minting failed:', error);
      toast({
        type: 'error',
        description: 'Failed to register IP Asset on Story Protocol. Try again?',
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={handleMint} 
        disabled={isMinting}
        className="w-full max-w-sm"
      >
        {isMinting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minting...
          </>
        ) : (
          'Register on Story Protocol'
        )}
      </Button>
      
      {lastMintResult && (
        <div className="text-sm text-muted-foreground space-y-1">
          <p>✅ IP Asset Created: &ldquo;{trackName}&rdquo;</p>
          <p>IP Asset ID: {lastMintResult.ipAssetId.slice(0, 12)}...</p>
          <div className="flex gap-2 flex-wrap">
            <a 
              href={lastMintResult.storyExplorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700"
            >
              Story Explorer <ExternalLink className="h-3 w-3" />
            </a>
            <a 
              href={lastMintResult.etherscanUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700"
            >
              Etherscan <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 