import React, { useState } from 'react';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from 'stream-chat-react';
import useChatClient from '../hooks/useChatClient';
import useAuth from '../hooks/useAuth';
import 'stream-chat-react/dist/css/v2/index.css';
import ChatLoading from './ChatLoading';
import CustomChannelHeader from './CustomChannelHeader';

const ChatWidget = () => {
  const { session } = useAuth();
  const { client, channel, connectChat, disconnectChat } = useChatClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  if (!session) {
    return null;
  }

  const toggleChat = async () => {
    if (!isOpen) {
      setIsChatLoading(true);
      try {
        await connectChat();
        setIsOpen(true);
      } catch (error) {
        console.error('Error connecting chat:', error);
      } finally {
        setIsChatLoading(false);
      }
    } else {
      setIsOpen(false);
      await disconnectChat();
    }
  };

  const buttonStyle = isChatLoading
    ? {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }
    : {
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
      };

  return (
    <div className="fixed bottom-4 right-4 z-50 chat-widget">
      <button
        onClick={toggleChat}
        className="btn-primary cursor-pointer"
        style={buttonStyle}
        disabled={isChatLoading}
      >
        {isChatLoading ? <ChatLoading /> : (isOpen ? '✕' : '💬')}
      </button>
      {isOpen && client && channel && (
        <div className="chat-container">
          <Chat client={client}>
            <Channel channel={channel}>
              <Window>
                <CustomChannelHeader />
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