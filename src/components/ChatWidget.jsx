import React, { useState, useEffect } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  ChannelHeader,
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import 'stream-chat-react/dist/css/v2/index.css';

// Custom ChannelHeader for customer support (removes online user count)
const CustomChannelHeader = ({ channel }) => {
  return (
    <div className="str-chat__header-livestream str-chat__header-customer-support">
      <div className="str-chat__header-livestream-left">
        <h3>{channel.data?.name || 'Customer Support'}</h3>
      </div>
    </div>
  );
};

const ChatWidget = () => {
  const { client, channel } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);
  const [hasWelcomeMessageBeenShown, setHasWelcomeMessageBeenShown] = useState(false);

  useEffect(() => {
    if (isOpen && !hasWelcomeMessageBeenShown) {
      // Set the welcome message as shown
      setHasWelcomeMessageBeenShown(true);
    }
  }, [isOpen, hasWelcomeMessageBeenShown]);

  if (!client || !channel) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 chat-widget">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary cursor-pointer"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      {isOpen && (
        <div className="chat-container">
          {/* Welcome message outside the chat */}
          {!hasWelcomeMessageBeenShown && (
            <div className="welcome-message">
              <p>Hello! How can we assist you today?</p>
            </div>
          )}
          {/* Chat window */}
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <ChannelHeader HeaderComponent={CustomChannelHeader} />
                <MessageList />
                <MessageInput placeholder="Type your message here..." />
              </Window>
            </Channel>
          </Chat>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
