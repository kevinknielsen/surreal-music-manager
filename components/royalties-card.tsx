'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoyaltiesCardProps {
  userAddress?: string;
}

export function RoyaltiesCard({ userAddress }: RoyaltiesCardProps) {
  const [royalties, setRoyalties] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userAddress) {
      setLoading(false);
      return;
    }

    // Simulate fetching royalties - in real implementation this would use thirdweb hooks
    const fetchRoyalties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock royalties data - replace with actual thirdweb integration
        const mockRoyalties = (Math.random() * 2.5 + 0.1).toFixed(3);
        setRoyalties(mockRoyalties);
      } catch (err) {
        setError('Oops—couldn\'t fetch royalty data. Try again?');
      } finally {
        setLoading(false);
      }
    };

    fetchRoyalties();
  }, [userAddress]);

  if (!userAddress) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Q3 Royalties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Connect your wallet to view royalties</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Q3 Royalties</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <p className="text-muted-foreground animate-pulse">
            Checking your on-chain royalties…
          </p>
        )}
        
        {error && (
          <p className="text-destructive">
            {error}
          </p>
        )}
        
        {royalties && !loading && !error && (
          <div className="space-y-2">
            <p className="text-2xl font-bold">
              Ξ {royalties}
            </p>
            <p className="text-muted-foreground">
              distributed to your wallet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 