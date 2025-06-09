# Story Protocol Music IP Manager 🎵⛓️

**Transforming Music Rights Management with Blockchain Technology**

A revolutionary AI-powered music management platform that leverages **Story Protocol** to register, license, and monetize intellectual property assets on-chain. Built for creators who want transparent, automated, and global music rights management.

## 🎯 Project Overview

The Story Protocol Music IP Manager is a comprehensive platform that bridges the gap between traditional music industry practices and blockchain-based IP management. By integrating **Story Protocol's innovative IP infrastructure**, artists can register their music as on-chain IP Assets, create programmable licenses, and automate royalty distribution globally.

### 🏆 **Story Protocol Integration** (Sponsor Technology)

This project extensively uses **Story Protocol** as the core blockchain infrastructure:

#### **Primary Story Protocol Components Used:**
- **[@story-protocol/core-sdk](https://github.com/storyprotocol/protocol-core-v1)** - Main SDK for IP Asset registration
- **IPA Metadata Standard** - Proper metadata formatting for IP Assets
- **Programmable IP Licenses (PIL)** - Smart contract-based licensing
- **On-chain Royalty Distribution** - Automated revenue sharing
- **IP Asset Registry** - Blockchain-based ownership proof

#### **Story Protocol Features Implemented:**
- ✅ **IP Asset Registration** - Register music tracks as blockchain IP Assets
- ✅ **Metadata Compliance** - Full IPA Metadata Standard implementation
- ✅ **Multi-License Support** - 6 different license types (sync, commercial-remix, non-commercial, attribution, derivative, exclusive)
- ✅ **IPFS Integration** - Decentralized metadata and media storage
- ✅ **Creator Attribution** - On-chain creator records with contribution percentages
- ✅ **Royalty Configuration** - Customizable royalty rates (0-50%)
- ✅ **Explorer Integration** - Direct links to Story Protocol testnet explorer

## 🚀 Live Demo

**Deployed Application:** [surreal-music-manager.vercel.app](https://surreal-music-manager.vercel.app)

**Demo Video:** [📹 Watch 3-minute Demo](https://your-demo-video-link.com) *(Coming Soon)*

**Story Protocol Explorer Examples:**
- [Sample IP Asset](https://aeneid.explorer.story.foundation/ipa/0x1006E24e4DbA37Ca28e39B95daBD3baA71489796)
- [Sample Transaction](https://aeneid.explorer.story.foundation/transactions/0x238ae2dab69d015ab09602f20e3af7d80b8cfb27ee3f35f375ccd25d25128198)

## 🛠️ Technical Architecture

### **Frontend Stack**
- **Next.js 15** (App Router) - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations

### **Blockchain Integration**
- **Story Protocol Core SDK** - Primary blockchain interaction layer
- **Viem** - Ethereum interaction library
- **Ethers.js** - Web3 utilities

### **AI & Backend**
- **Vercel AI SDK** - AI-powered chat interface
- **OpenAI GPT-4** - Natural language processing
- **NextAuth.js** - Authentication system
- **Drizzle ORM** - Database management
- **PostgreSQL** - Primary database

### **Storage & IPFS**
- **Pinata** - IPFS pinning service for metadata
- **Vercel Blob** - File upload and storage

## 📁 Project Structure

```
surreal-music-manager/
├── app/
│   ├── (auth)/                    # Authentication pages
│   ├── (chat)/                    # Main chat interface
│   │   ├── api/
│   │   │   └── mint-sync/         # 🎯 Story Protocol API routes
│   │   └── page.tsx               # Main chat interface
├── components/
│   ├── sync-license-button.tsx    # 🎯 Story Protocol registration UI
│   ├── sync-license-result.tsx    # 🎯 IP Asset display component
│   └── ui/                        # Reusable UI components
├── lib/
│   ├── story-protocol.ts          # 🎯 Story Protocol client setup
│   └── ai/
│       └── tools/
│           └── sync-license.ts    # 🎯 AI tool for IP registration
└── README.md
```

**🎯 = Files with Story Protocol Integration**

## 🎵 Features

### **Core IP Management**
- **AI-Powered Chat Interface** - Natural language interaction for music management
- **Multi-License Registration** - Support for 6 different license types:
  - 🎬 **Sync Licensing** - TV, film, advertising placement
  - 🔄 **Commercial Remix** - Commercial derivatives and remixes
  - 📚 **Non-Commercial** - Educational and personal use
  - 📝 **Attribution** - Free use with credit requirement
  - 🎨 **Derivative Works** - Building upon existing IP
  - 👑 **Exclusive Rights** - Full rights transfer

### **Blockchain Features**
- **On-Chain Registration** - Immutable IP ownership records
- **Automated Royalties** - Smart contract-based revenue distribution
- **Global Rights Management** - Cross-border licensing without intermediaries
- **Transparent Analytics** - Public transaction and ownership history

### **User Experience**
- **Rich Metadata Input** - Comprehensive track information forms
- **Real-Time Transaction Tracking** - Live blockchain confirmation
- **Explorer Integration** - Direct links to Story Protocol explorer
- **Mobile-Responsive Design** - Works across all devices

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and pnpm
- Story Protocol testnet wallet with $IP tokens
- Pinata account for IPFS uploads
- Database (PostgreSQL)

### **Environment Setup**

1. **Clone the repository:**
```bash
git clone https://github.com/kevinknielsen/surreal-music-manager.git
cd surreal-music-manager
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Environment Variables:**
Create `.env.local` with:
```bash
# Story Protocol Configuration (🎯 REQUIRED)
STORY_PRIVATE_KEY=your_testnet_private_key_here
STORY_SPG_NFT_CONTRACT=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc

# IPFS Storage
PINATA_JWT=your_pinata_jwt_token

# Database
POSTGRES_URL=your_postgres_connection_string

# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# AI Configuration
OPENAI_API_KEY=your_openai_api_key
```

4. **Get Story Protocol Testnet Tokens:**
   - Create a wallet on [Story Protocol Aeneid Testnet](https://docs.story.foundation/developers/testnet)
   - Get testnet $IP tokens from [QuickNode Faucet](https://faucet.quicknode.com/story)

5. **Run the development server:**
```bash
pnpm dev
```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🎯 Story Protocol Implementation Details

### **IP Asset Registration Flow**

1. **Metadata Preparation** (`app/(chat)/api/mint-sync/route.ts`)
   ```typescript
   // IPA Metadata Standard compliance
   const ipMetadata = {
     title: trackName,
     description: `${LICENSE_DESCRIPTIONS[licenseType]} for "${trackName}" by ${artistName}`,
     createdAt: Math.floor(Date.now() / 1000).toString(),
     creators: [{ name: artistName, address: userAddress, contributionPercent: 100 }],
     image: albumArtUrl,
     mediaUrl: audioFileUrl,
     mediaType: "audio/mpeg",
     // ... additional metadata fields
   };
   ```

2. **IPFS Upload** - Metadata stored on IPFS via Pinata
3. **Story Protocol Registration** - Using core SDK:
   ```typescript
   const ipAssetResponse = await storyClient.ipAsset.mintAndRegisterIp({
     spgNftContract: spgContract,
     ipMetadata: {
       ipMetadataURI: ipMetadataURI,
       ipMetadataHash: ipMetadataHash,
       nftMetadataURI: nftMetadataURI,
       nftMetadataHash: nftMetadataHash,
     },
   });
   ```

### **License Types Implementation**

Each license type has specific terms configured in `lib/ai/tools/sync-license.ts`:

```typescript
const LICENSE_TYPES = {
  SYNC: 'sync',
  COMMERCIAL_REMIX: 'commercial-remix',
  NON_COMMERCIAL: 'non-commercial',
  ATTRIBUTION: 'attribution',
  DERIVATIVE: 'derivative',
  EXCLUSIVE: 'exclusive'
} as const;
```

### **AI Integration**

The AI assistant (`lib/ai/tools/sync-license.ts`) can automatically:
- Parse music track details from conversation
- Suggest appropriate license types
- Execute Story Protocol registration
- Provide real-time transaction updates

## 📊 Business Impact

### **Problems Solved**
- **Complex Rights Management** → Automated blockchain licensing
- **Opaque Royalty Distribution** → Transparent smart contracts  
- **Geographic Licensing Barriers** → Global, borderless IP rights
- **Intermediary Dependencies** → Direct creator-to-licensee relationships

### **Market Opportunity**
- **$26.2B Global Music Licensing Market** (2023)
- **Growing Creator Economy** - 50M+ content creators worldwide
- **Blockchain Adoption** - $67.4B blockchain market by 2026

## 🛡️ Security & Compliance

- **IPA Metadata Standard** - Full compliance with Story Protocol standards
- **Immutable Records** - Blockchain-based ownership proof
- **Smart Contract Audits** - Built on audited Story Protocol infrastructure
- **IPFS Redundancy** - Decentralized metadata storage

## 🔮 Future Roadmap

- [ ] **Advanced Analytics Dashboard** - Revenue tracking and IP performance metrics
- [ ] **Multi-Chain Support** - Expand beyond Story Protocol testnet
- [ ] **Mobile App** - iOS/Android applications
- [ ] **Label Integration** - Enterprise features for record labels
- [ ] **AI Rights Negotiation** - Automated licensing deal optimization
- [ ] **Creator Collaboration Tools** - Multi-creator IP asset management

## 🏗️ Development Team

**Built for Story Protocol Hackathon**

- **Kevin Nielsen Garcia** - Full-Stack Developer & Blockchain Engineer
- **Expertise:** Next.js, TypeScript, Story Protocol, Web3 Integration

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Contact

- **GitHub Issues:** [Report bugs or request features](https://github.com/kevinknielsen/surreal-music-manager/issues)
- **Story Protocol Docs:** [https://docs.story.foundation](https://docs.story.foundation)
- **Live Demo:** [surreal-music-manager.vercel.app](https://surreal-music-manager.vercel.app)

---

**Built with ❤️ for the Story Protocol ecosystem and the future of decentralized IP rights management.**