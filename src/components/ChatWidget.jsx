import React, { useState } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  ChannelList,
  ChannelHeader
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import 'stream-chat-react/dist/css/index.css';

const ChatWidget = () => {
  const { client, channel } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);

  if (!client || !channel) return null;

  const isAppCreator = false;
  if (isAppCreator) {
    const filters = { type: 'messaging', app_id: import.meta.env.VITE_PUBLIC_APP_ID };
    const sort = { last_message_at: -1 };

    return (
      <div className="h-screen flex">
        <Chat client={client}>
          <div className="flex w-full h-full">
            <div className="w-64 border-r bg-gray-50">
              <div className="p-4 border-b">
                <h2 className="font-semibold">App Chats</h2>
              </div>
              <ChannelList filters={filters} sort={sort} />
            </div>
            <div className="flex-1">
              <Channel>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
              </Channel>
            </div>
          </div>
        </Chat>
      </div>
    );
  }

  return (
    <div className="chat-widget">
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