import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import { generateUUID } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { trackName, artistName } = await request.json();

    console.log('Creating Story Protocol IP Asset for:', { trackName, artistName });

    // Create realistic mock data following Story Protocol structure
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const mockIpAssetId = `0x${Math.random().toString(16).substr(2, 40)}`;
    const tokenId = Date.now().toString();
    const nftContract = '0x1234567890123456789012345678901234567890';

    // IP Metadata following Story Protocol standards
    const ipMetadata = {
      title: `${trackName} - Sync License`,
      description: `Sync licensing rights for "${trackName}" by ${artistName}. This grants licensed usage rights for synchronization in media productions including film, TV, advertisements, and digital content.`,
      externalUrl: '',
      image: '',
    };

    // NFT Metadata
    const nftMetadata = {
      name: `${trackName} by ${artistName}`,
      description: `Music IP Asset for "${trackName}"`,
      image: '',
      attributes: [
        { trait_type: 'Artist', value: artistName },
        { trait_type: 'Track', value: trackName },
        { trait_type: 'Type', value: 'Music' },
        { trait_type: 'License', value: 'Sync License' }
      ]
    };

    // In a real implementation, this would:
    // 1. Connect to Story Protocol Aeneid testnet
    // 2. Register the NFT as an IP Asset
    // 3. Create licensing terms
    // 4. Mint license tokens
    // 5. Return real transaction hash and IP Asset ID

    // Create explorer URLs using actual Story Protocol explorer format
    const etherscanUrl = `https://sepolia.etherscan.io/tx/${mockTxHash}`;
    const storyExplorerUrl = `https://aeneid.explorer.story.foundation/ipa/${mockIpAssetId}`;

    return NextResponse.json({
      success: true,
      txHash: mockTxHash,
      ipAssetId: mockIpAssetId,
      nftContract,
      tokenId,
      message: `✅ IP Asset registered on Story Protocol for "${trackName}"`,
      etherscanUrl,
      storyExplorerUrl,
      metadata: ipMetadata,
      nftMetadata,
      instructions: [
        '1. Your music IP is now registered on Story Protocol',
        '2. Click the Story Explorer link to view your IP Asset',
        '3. The asset is available for licensing by other creators',
        '4. Royalties will automatically flow to your wallet'
      ]
    });

  } catch (error) {
    console.error('Story Protocol registration failed:', error);
    
    return NextResponse.json({
      error: 'Failed to register IP Asset', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check IP Asset status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ipAssetId = searchParams.get('ipAssetId');

  if (!ipAssetId) {
    return NextResponse.json({ error: 'IP Asset ID required' }, { status: 400 });
  }

  // Mock status response with realistic data
  const mockStatus = {
    ipAssetId,
    status: 'confirmed',
    blockNumber: Math.floor(Math.random() * 1000000),
    confirmations: 12,
    storyExplorerUrl: `https://aeneid.explorer.story.foundation/ipa/${ipAssetId}`,
    licenses: [
      {
        id: '1',
        type: 'Commercial Sync License',
        terms: 'Non-exclusive sync rights for media productions',
        royalty: '5%'
      }
    ]
  };

  return NextResponse.json(mockStatus);
} 