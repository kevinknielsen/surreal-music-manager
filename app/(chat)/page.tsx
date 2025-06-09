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

  // Simple assistant greeting  
  const greetingText = `Hello ${session.user?.name || 'there'}! I'm an AI assistant that can help with various tasks, including blockchain-based music functions.

I can help you with:
- Music licensing tokens (Story Protocol)
- Royalty tracking (on-chain data via Thirdweb)
- Document creation
- General recommendations and information

What can I help you with today?`;
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
