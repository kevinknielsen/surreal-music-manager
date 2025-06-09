import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  // Story Protocol focused assistant greeting  
  const greetingText = `Welcome to **Story Protocol Music IP Manager**, ${session.user?.name || 'artist'}! 🎵⚡

I'm your **Story Protocol AI Assistant** specialized in transforming your music into blockchain-based IP Assets with automated royalty distribution.

## 🚀 **Story Protocol Capabilities**

1. **🎯 IP Asset Registration**: Transform your tracks into on-chain IP Assets with comprehensive licensing options:
   - **Sync Licensing** - for TV, film, advertising
   - **Commercial Remix Rights** - monetizable derivatives  
   - **Attribution Licensing** - free use with credit
   - **Non-Commercial Rights** - personal/educational
   - **Derivative Works** - building upon existing IP
   - **Exclusive Rights** - full ownership transfer

2. **💰 Revenue Analytics**: Track your Story Protocol royalties and IP monetization in real-time

3. **📋 Legal Documentation**: Generate Story Protocol compliant licensing agreements and contracts

## ✨ **Why Story Protocol?**
- ⚡ **Automated Royalties** - No more chasing payments
- 🌍 **Global Rights Management** - One platform, worldwide reach  
- 🔗 **On-chain Transparency** - Every transaction is verifiable
- 🎨 **Derivative Tracking** - Monitor and monetize remixes/covers
- 🛡️ **IP Protection** - Blockchain-based ownership proof

**Ready to revolutionize your music IP management?** Tell me about your tracks and licensing goals!`;
  const initialGreeting = [{
    id: generateUUID(),
    role: 'assistant' as const,
    content: greetingText,
    parts: [{
      type: 'text' as const,
      text: greetingText
    }],
    createdAt: new Date(),
  }];

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={initialGreeting}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={initialGreeting}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
