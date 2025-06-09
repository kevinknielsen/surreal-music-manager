<a href="https://github.com/kevinkainielsengarcia/surreal-music-manager">
  <img alt="AI Music Assistant Demo" src="app/(chat)/opengraph-image.png">
  <h1 align="center">🎵 AI Music Assistant - Blockchain Demo</h1>
</a>

<p align="center">
    <strong>AI assistant with blockchain-based music licensing and royalty tracking capabilities.</strong>
</p>

<p align="center">
  <a href="#demo"><strong>🎬 Demo</strong></a> ·
  <a href="#sponsor-technologies"><strong>🔧 Sponsor Tech</strong></a> ·
  <a href="#features"><strong>✨ Features</strong></a> ·
  <a href="#getting-started"><strong>🚀 Setup</strong></a>
</p>
<br/>

## 🎬 Demo

**Try the assistant at: [http://localhost:3000](http://localhost:3000)**

**Test these commands:**
- "I need to create a sync license for my track"
- "Show me my royalty earnings"
- "Help me license my music"

---

## 🔧 Sponsor Technologies

This project demonstrates integration with blockchain and AI technologies:

### 🏗️ **Story Protocol** - IP Asset Management
- **Location**: [`app/(chat)/api/mint-sync/route.ts`](app/(chat)/api/mint-sync/route.ts)
- **Purpose**: **ACTUALLY mints blockchain-based sync-license tokens** for music IP assets using Story Protocol SDK
- **Demo**: Ask "create a sync license" to see **REAL** Story Protocol integration
- **Status**: ✅ **LIVE BLOCKCHAIN INTEGRATION** (with fallback to mock for demo)

### ⚡ **Thirdweb** - Blockchain Infrastructure  
- **Location**: [`lib/ai/tools/show-royalties.ts`](lib/ai/tools/show-royalties.ts)
- **Purpose**: Reads on-chain royalty data and manages Web3 interactions
- **Demo**: Ask "show my royalties" to see Thirdweb integration

### 🌐 **Fleek** - Decentralized Deployment
- **Location**: [`fleek.config.js`](fleek.config.js), [`scripts/deploy.sh`](scripts/deploy.sh)
- **Purpose**: IPFS-based deployment for decentralized hosting

---

## ✨ Core Features

### 🎯 **Functional Blockchain Tools**
- **Sync Licensing**: Creates blockchain tokens for music licensing via Story Protocol
- **Royalty Tracking**: Displays on-chain royalty data via Thirdweb
- **AI Integration**: Uses tools based on user requests, not just conversation

### 🤖 **AI Assistant Capabilities**
- **Tool-Based**: Actually executes blockchain transactions through tools
- **Music Industry Focus**: Specialized for music licensing and royalty tasks
- **Document Generation**: Can create contracts and agreements

### 🛠️ **Technical Stack**
- [Next.js 15](https://nextjs.org) with App Router and React Server Components
- [AI SDK](https://sdk.vercel.ai/docs) for LLM integration and tool calling
- [Story Protocol SDK](https://docs.story.foundation/) for IP asset management
- [Thirdweb SDK](https://thirdweb.com/docs) for Web3 integration
- [Auth.js](https://authjs.dev) for secure authentication

---

## 🎯 How It Works

### 🎵 **1. Sync Licensing Workflow**
```
User: "I need to create a sync license for my track"
AI: Recognizes request → Uses syncLicense tool
System: Calls Story Protocol API → Mints blockchain token
Result: User gets licensing token with transaction details
```

### 💰 **2. Royalty Tracking**
```
User: "Show me my royalty earnings"
AI: Recognizes request → Uses showRoyalties tool  
System: Calls Thirdweb to read on-chain data
Result: Displays royalty breakdown with blockchain verification
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm

### Quick Setup

1. **Clone and install**
```bash
git clone https://github.com/kevinkainielsengarcia/surreal-music-manager.git
cd surreal-music-manager
pnpm install
```

2. **Start development server**
```bash
pnpm dev
```

3. **Test at [http://localhost:3000](http://localhost:3000)**

### Environment Variables

For full functionality, add to `.env.local`:
```bash
# AI Model
XAI_API_KEY=your_xai_key

# Database  
POSTGRES_URL=your_neon_db_url

# Authentication
AUTH_SECRET=your_auth_secret

# Story Protocol (for REAL blockchain integration)
STORY_PRIVATE_KEY=your_wallet_private_key_without_0x
STORY_RPC_URL=https://aeneid.storyrpc.io
STORY_SPG_NFT_CONTRACT=0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc

# Thirdweb (optional for demo)
THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

**⚠️ Note**: Without `STORY_PRIVATE_KEY`, the app will use demo mode with mock blockchain data.

---

## 🏗️ Project Structure

```

---

## 🎯 Hackathon Submission

**Project Code**: `cbkyzn8n5cuyj00mfm54gcrn7pvv05q`

This project demonstrates:
- **Story Protocol**: Real IP asset minting for music licensing
- **Thirdweb**: On-chain royalty data integration  
- **Fleek**: Decentralized hosting and deployment
- **AI Tools**: Functional blockchain execution through conversation

Built to showcase practical blockchain integration for music industry applications! 🎵⚡

---

## 🚀 Current Status

### ✅ **IMPLEMENTED**
- **Real Story Protocol SDK Integration**: Uses `@story-protocol/core-sdk` for actual blockchain transactions
- **Smart Fallback System**: Gracefully falls back to demo mode when blockchain isn't configured
- **Proper Type Safety**: Full TypeScript support with correct SDK types
- **Environment Configuration**: Flexible setup for development and production

### 🎯 **How to Enable Real Blockchain**
1. Get an Aeneid testnet wallet private key
2. Add `STORY_PRIVATE_KEY=your_private_key` to `.env.local`
3. Test with "create a sync license" - you'll get real transaction hashes!

### 📱 **Demo Instructions**
1. **Start the app**: `pnpm dev`
2. **Visit**: [http://localhost:3000](http://localhost:3000)  
3. **Try these prompts**:
   - "I need to create a sync license for my track"
   - "Show me my royalty earnings"
   - "Help me license my music for commercials"

**Expected Results**:
- ✅ AI recognizes licensing requests and uses appropriate tools
- ✅ **REAL Story Protocol integration** for licensing tokens (when configured)
- ✅ Thirdweb integration for royalty data  
- ✅ **Actual blockchain transactions** with real transaction hashes and explorer links
- ✅ Graceful fallback to demo mode when blockchain isn't configured