**Enhanced Implementation Plan (with Alex “Tracks” Johnson UI copy)**
*Using Neon + Vercel Blob — Tomo → Fleek → thirdweb → StoryKit*

---

### 1. Tomo SDK Integration

* **Install & Provider**

  ```bash
  npm install @tomo/sdk
  ```

  Wrap your app in `<TomoProvider apiKey=…>`.

* **UI Copy**

  * **Login Screen Heading:**

    > **Welcome to Tracks Ahead Management**
  * **Login Button Label:**

    > **Connect with Tomo**
  * **Login Subtext:**

    > “One-click social login & wallet aggregation.”
  * **On-Connect Chat Greeting:**

    > “Hey {username}, Alex here. What can I handle for you today?”

* **Session Persistence**

  * Store `{ address, profile }` in Neon and set a secure cookie/JWT.
  * In your master layout, show:

    > **Logged in as:** `{profile.name}` • `{address.slice(0,6)}…`

---

### 2. Fleek Deployment

* **Configure** `fleek.json`

  ```json
  {
    "site": {
      "name": "alex-tracks-agent",
      "framework": "nextjs",
      "build": {
        "environment": { "TOMO_API_KEY":"${TOMO_API_KEY}" },
        "command": "npm run build",
        "publicDir": ".vercel/output/static"
      }
    }
  }
  ```
* **UI Copy**

  * **Banner on Live Demo:**

    > “Alex “Tracks” Johnson — Your Virtual Music Manager”
  * **Footer:**

    > “Powered by Fleek • IPFS-hosted • Data via Neon”

---

### 3. thirdweb On-Chain Reads

* **Install & Provider**

  ```bash
  npm install @thirdweb-dev/react ethers
  ```

  Wrap with `<ThirdwebProvider activeChain="goerli">`.

* **Hook & Display**

  ```ts
  const royalties = useRoyalties(user.address);
  ```

  * **Royalties Card Title:**

    > **Q3 Royalties**
  * **Royalties Card Body (once loaded):**

    > “Ξ {royalties} distributed to your wallet.”
  * **Fallback / Loading:**

    > “Checking your on-chain royalties…”
  * **Error State:**

    > “Oops—couldn’t fetch royalty data. Try again?”

---

### 4. StoryKit IP Registration Flow

* **Install & Init**

  ```bash
  npm install @storykit/sdk
  ```

* **API Route** `/api/mint-sync` stores tx in Neon.

* **Chat Trigger & Button**

  * **Trigger Phrase:**

    > user: “Clear this track for sync”
  * **Bot Response (before):**

    > “On it—let’s mint your sync-license token.”
  * **Button Label in Chat UI:**

    > **Mint Sync-License Token**
  * **Success Response:**

    > “✅ Sync-license minted! Tx: `{txHash.slice(0,8)}…`”
  * **Follow-up Prompt:**

    > “I’ll let you know when it’s confirmed on-chain.”

---

### 5. End-to-End Verification & Polish

* **Chat Placeholder Text:**

  > “Ask Alex about royalties, licensing, distribution…”

* **Nav Labels:**

  * **Dashboard** | **Royalties** | **Sync Licensing** | **Profile**

* **Error & Empty States:**

  * **No Messages Yet:**

    > “No chats yet—what can Alex help you with?”
  * **Minting Error:**

    > “Failed to mint token. Need me to retry?”

* **Persona Consistency**
  Ensure every message aligns with Alex’s tone:

  * **Resourceful:** “Here’s how we’ll handle that…”
  * **Savvy:** “We’ll take the most efficient on-chain route.”
  * **Supportive:** “Don’t worry, I’ve got this covered.”
  * **Transparent:** “Your tx is viewable here: `{explorerLink}`.”

---

### 6. Submission Assets Prep

* **README Additions**

  * Quickstart steps for Tomo & thirdweb integration.
  * Fleek deployment notes.
  * Environment variables list:

    ```
    TOMO_API_KEY
    NEXT_PUBLIC_THIRDBWEB_RPC_URL
    NEXT_PUBLIC_ROYALTY_CONTRACT
    STORYKIT_API_KEY
    ```

* **Live Demo Banner**

  > “Live Preview → https\://\[your-fleek-url]”

* **Demo Video Script**

  1. **Login** (“Connect with Tomo”)
  2. **Ask** “What are my Q3 royalties?” → see card
  3. **Type** “Clear for sync” → click **Mint Sync-License Token**
  4. **Show** success message with tx link

* **Slide Deck Copy**

  1. **Slide 1 (Problem & Prop):**
     “Artists lack transparency & speed in royalty payouts & licensing. Alex “Tracks” Johnson automates on-chain royalties & sync licensing with a friendly, professional touch.”
  2. **Slide 2 (Architecture):**
     Bullet-list tech: Tomo → Next.js Chat SDK → thirdweb → StoryKit → Neon + Vercel Blob → Fleek
  3. **Slide 3 (Live Preview):**
     Screenshots of chat flows and royalty card.
