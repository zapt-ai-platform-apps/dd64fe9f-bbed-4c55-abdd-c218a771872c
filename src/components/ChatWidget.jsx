import React, { useState } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  ChannelHeader
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import 'stream-chat-react/dist/css/index.css';

const ChatWidget = () => {
  const { client, channel } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);

  if (!client || !channel) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 chat-widget">
      <button onClick={() => setIsOpen(!isOpen)} className="btn-primary cursor-pointer">
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      )}
    </div>
  );
};

export default ChatWidget;