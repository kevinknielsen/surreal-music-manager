'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Music, Shield, Globe, DollarSign, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { LICENSE_TYPES, LICENSE_DESCRIPTIONS, type LicenseType } from '@/lib/ai/tools/sync-license';

interface StoryProtocolLicenseProps {
  trackName: string;
  artistName: string;
  licenseType?: LicenseType;
  royaltyPercentage?: number;
  description?: string;
}

export function StoryProtocolLicense({ 
  trackName, 
  artistName, 
  licenseType = LICENSE_TYPES.SYNC,
  royaltyPercentage = 5,
  description 
}: StoryProtocolLicenseProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLicenseType, setSelectedLicenseType] = useState<LicenseType>(licenseType);
  const [selectedRoyalty, setSelectedRoyalty] = useState(royaltyPercentage);
  const [additionalInfo, setAdditionalInfo] = useState({
    genre: '',
    album: '',
    duration: '',
    releaseYear: '',
    detailedDescription: description || '',
    audioFileUrl: '',
    albumArtUrl: ''
  });

  const handleRegister = async () => {
    setIsRegistering(true);
    setResult(null);

    try {
      const response = await fetch('/api/mint-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackName,
          artistName,
          licenseType: selectedLicenseType,
          royaltyPercentage: selectedRoyalty,
          description: additionalInfo.detailedDescription,
          metadata: {
            genre: additionalInfo.genre,
            album: additionalInfo.album,
            duration: additionalInfo.duration,
            releaseYear: additionalInfo.releaseYear,
            audioFileUrl: additionalInfo.audioFileUrl,
            albumArtUrl: additionalInfo.albumArtUrl
          }
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setResult({ 
          success: false, 
          error: data.error || 'Registration failed',
          details: data.details,
          isBlockchainError: data.isBlockchainError
        });
      }
    } catch (error) {
      setResult({ 
        success: false, 
        error: 'Network error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const getLicenseTypeColor = (type: LicenseType) => {
    switch (type) {
      case LICENSE_TYPES.SYNC: return 'bg-blue-100 text-blue-800';
      case LICENSE_TYPES.COMMERCIAL_REMIX: return 'bg-green-100 text-green-800';
      case LICENSE_TYPES.NON_COMMERCIAL: return 'bg-purple-100 text-purple-800';
      case LICENSE_TYPES.ATTRIBUTION: return 'bg-orange-100 text-orange-800';
      case LICENSE_TYPES.DERIVATIVE: return 'bg-pink-100 text-pink-800';
      case LICENSE_TYPES.EXCLUSIVE: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLicenseIcon = (type: LicenseType) => {
    switch (type) {
      case LICENSE_TYPES.SYNC: return <Music className="h-4 w-4" />;
      case LICENSE_TYPES.COMMERCIAL_REMIX: return <DollarSign className="h-4 w-4" />;
      case LICENSE_TYPES.NON_COMMERCIAL: return <Shield className="h-4 w-4" />;
      case LICENSE_TYPES.ATTRIBUTION: return <Globe className="h-4 w-4" />;
      case LICENSE_TYPES.DERIVATIVE: return <Music className="h-4 w-4" />;
      case LICENSE_TYPES.EXCLUSIVE: return <Shield className="h-4 w-4" />;
      default: return <Music className="h-4 w-4" />;
    }
  };

  if (result?.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-green-700">
            🎉 IP Asset Registered on Story Protocol!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">&ldquo;{result.data.trackName}&rdquo; by {result.data.artistName}</h3>
            <Badge className={getLicenseTypeColor(result.data.licenseType)}>
              {getLicenseIcon(result.data.licenseType)}
              <span className="ml-1">{LICENSE_DESCRIPTIONS[result.data.licenseType as LicenseType]}</span>
            </Badge>
            {result.data.isDemoMode && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Demo Mode - Mock Transaction
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Transaction Hash:</p>
              <code className="text-xs bg-gray-900 dark:bg-gray-100 text-green-400 dark:text-gray-900 p-3 rounded-lg block break-all font-mono border">
                {result.data.txHash}
              </code>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">IP Asset ID:</p>
              <code className="text-xs bg-gray-900 dark:bg-gray-100 text-blue-400 dark:text-gray-900 p-3 rounded-lg block break-all font-mono border">
                {result.data.ipAssetId}
              </code>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">License Terms:</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Royalty Rate:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{result.data.royaltyPercentage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Commercial Use:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{result.data.licenseTerms?.commercialUse ? 'Allowed' : 'Not Allowed'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Derivatives:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{result.data.licenseTerms?.derivatives ? 'Allowed' : 'Not Allowed'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Attribution Required:</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">{result.data.licenseTerms?.attribution ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(result.data.explorerUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Transaction
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(result.data.storyExplorerUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Story Explorer
            </Button>
          </div>

          <div className="pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Globe className="h-3 w-3 mr-1" />
                On-chain IP
              </Badge>
              <Badge variant="secondary">
                <DollarSign className="h-3 w-3 mr-1" />
                Automated Royalties
              </Badge>
              <Badge variant="secondary">
                <Shield className="h-3 w-3 mr-1" />
                Global Rights
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (result && !result.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-red-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-red-700">Registration Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-700 font-medium">{result.error}</p>
            {result.details && (
              <p className="text-red-600 text-sm mt-1">{result.details}</p>
            )}
            {result.isBlockchainError && (
              <p className="text-red-600 text-sm mt-2">
                💡 <strong>Tip:</strong> If you see &ldquo;insufficient funds&rdquo;, you need testnet $IP tokens from the faucet.
              </p>
            )}
          </div>
          <Button onClick={() => setResult(null)} variant="outline" className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Register IP Asset on Story Protocol
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create blockchain-based licensing for &ldquo;{trackName}&rdquo; by {artistName}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-3">
          <label className="text-sm font-medium">License Type</label>
          <Select value={selectedLicenseType} onValueChange={(value: string) => setSelectedLicenseType(value as LicenseType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LICENSE_DESCRIPTIONS).map(([key, description]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    {getLicenseIcon(key as LicenseType)}
                    <span className="text-sm">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Track Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
              <input
                type="text"
                value={additionalInfo.genre}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, genre: e.target.value }))}
                placeholder="e.g., Hip-Hop, Pop, Electronic"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Album/EP</label>
              <input
                type="text"
                value={additionalInfo.album}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, album: e.target.value }))}
                placeholder="Album or EP name"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
              <input
                type="text"
                value={additionalInfo.duration}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 3:45"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Release Year</label>
              <input
                type="text"
                value={additionalInfo.releaseYear}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, releaseYear: e.target.value }))}
                placeholder="e.g., 2024"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              value={additionalInfo.detailedDescription}
              onChange={(e) => setAdditionalInfo(prev => ({ ...prev, detailedDescription: e.target.value }))}
              placeholder="Describe your track, its style, inspiration, or licensing use cases..."
              rows={3}
              className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Audio File URL</label>
              <input
                type="url"
                value={additionalInfo.audioFileUrl}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, audioFileUrl: e.target.value }))}
                placeholder="https://example.com/track.mp3 (MP3, WAV, etc.)"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload to IPFS via <a href="https://pinata.cloud" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Pinata</a> or <a href="https://web3.storage" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Web3.Storage</a> for permanent storage
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Album Art URL</label>
              <input
                type="url"
                value={additionalInfo.albumArtUrl}
                onChange={(e) => setAdditionalInfo(prev => ({ ...prev, albumArtUrl: e.target.value }))}
                placeholder="https://example.com/cover.jpg (JPG, PNG, etc.)"
                className="w-full px-3 py-2 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Optional: Album cover image for your IP Asset NFT
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Royalty Percentage: {selectedRoyalty}%</label>
          <Slider
            value={[selectedRoyalty]}
            onValueChange={(value) => setSelectedRoyalty(value[0])}
            max={50}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0% (Free)</span>
            <span>50% (Maximum)</span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-blue-900">Story Protocol Features</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ On-chain IP registration and ownership proof</li>
            <li>✅ Automated royalty distribution to creators</li>
            <li>✅ Global licensing and rights management</li>
            <li>✅ Derivative work tracking and monetization</li>
            <li>✅ Transparent revenue and usage analytics</li>
          </ul>
        </div>

        <Button 
          onClick={handleRegister} 
          disabled={isRegistering}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isRegistering ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Registering on Story Protocol...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Register as IP Asset
            </>
          )}
        </Button>

        <div className="flex flex-wrap gap-2 justify-center pt-2">
          <Badge variant="outline" className="text-xs">
            <Globe className="h-3 w-3 mr-1" />
            Story Protocol
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            On-chain IP
          </Badge>
          <Badge variant="outline" className="text-xs">
            <DollarSign className="h-3 w-3 mr-1" />
            Auto Royalties
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Legacy export for backwards compatibility
export { StoryProtocolLicense as SyncLicenseResult }; 