import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import useAuth from './useAuth';

const useChatClient = () => {
  const { session } = useAuth();
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const connectChat = async () => {
    try {
      const userEmail = session?.user?.email;
      if (!userEmail) {
        console.error('No user session available for chat connection.');
        return;
      }
      const response = await fetch('/api/customerSupport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) {
        console.error('Failed to fetch customer support data');
        return;
      }
      const { token, channelId, userId } = await response.json();
      const streamClient = StreamChat.getInstance(import.meta.env.VITE_PUBLIC_STREAM_KEY);
      await streamClient.connectUser(
        { id: userId, name: userEmail },
        token
      );
      const streamChannel = streamClient.channel('messaging', channelId);
      await streamChannel.watch();
      setClient(streamClient);
      setChannel(streamChannel);
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const disconnectChat = async () => {
    if (client) {
      await client.disconnectUser();
      setClient(null);
      setChannel(null);
    }
  };

  return { client, channel, connectChat, disconnectChat };
};

export default useChatClient;