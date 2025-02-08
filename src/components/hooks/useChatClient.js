import { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';

const useChatClient = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const userEmail = 'user@example.com';
        const response = await fetch('/api/customerSupport', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail })
        });
        if (!response.ok) {
          console.error('Failed to fetch customer support data');
          return;
        }
        const { token, channel: channelData } = await response.json();
        const streamClient = StreamChat.getInstance(import.meta.env.VITE_PUBLIC_STREAM_KEY);
        await streamClient.connectUser(
          { id: userEmail, name: 'User Name' },
          token
        );
        const streamChannel = streamClient.channel('messaging', channelData.id);
        await streamChannel.watch();
        setClient(streamClient);
        setChannel(streamChannel);
      } catch (error) {
        console.error('Error initializing chat widget:', error);
      }
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, []);

  return { client, channel };
};

export default useChatClient;