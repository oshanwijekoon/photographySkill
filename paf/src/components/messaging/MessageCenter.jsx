import { useState } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

function MessageCenter() {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      user: {
        id: "2",
        name: "Jane Smith",
        title: "UX Designer",
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
        isOnline: true
      },
      messages: [
        {
          id: "1-1",
          content: "Hi John, I wanted to follow up on our discussion about the project timeline.",
          timestamp: "2023-10-15T10:30:00",
          sender: "them"
        },
        {
          id: "1-2",
          content: "Hey Jane, sure thing. I've been working on the estimates and should have them by tomorrow.",
          timestamp: "2023-10-15T10:35:00",
          sender: "me"
        },
        {
          id: "1-3",
          content: "That sounds great! Looking forward to seeing them.",
          timestamp: "2023-10-15T10:38:00",
          sender: "them"
        }
      ],
      lastActivity: "2023-10-15T10:38:00"
    },
    {
      id: "2",
      user: {
        id: "3",
        name: "Alex Johnson",
        title: "Data Scientist",
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
        isOnline: false
      },
      messages: [
        {
          id: "2-1",
          content: "John, do you have time to discuss the analytics framework?",
          timestamp: "2023-10-14T15:20:00",
          sender: "them"
        },
        {
          id: "2-2",
          content: "I'm free tomorrow afternoon if that works for you.",
          timestamp: "2023-10-14T15:45:00",
          sender: "me"
        }
      ],
      lastActivity: "2023-10-14T15:45:00"
    },
    {
      id: "3",
      user: {
        id: "4",
        name: "Emily Williams",
        title: "Project Manager",
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
        isOnline: true
      },
      messages: [
        {
          id: "3-1",
          content: "Let's schedule a meeting to discuss the new requirements.",
          timestamp: "2023-10-12T09:15:00",
          sender: "them"
        },
        {
          id: "3-2",
          content: "Sounds good, Emily. How about Thursday at 2pm?",
          timestamp: "2023-10-12T10:30:00",
          sender: "me"
        },
        {
          id: "3-3",
          content: "Perfect, I'll send out a calendar invite.",
          timestamp: "2023-10-12T11:00:00",
          sender: "them"
        }
      ],
      lastActivity: "2023-10-12T11:00:00"
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState(conversations[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentConversation = conversations.find(convo => convo.id === activeConversation);
  
  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toISOString(),
      sender: "me"
    };
    
    setConversations(conversations.map(convo => 
      convo.id === activeConversation 
        ? { 
            ...convo, 
            messages: [...convo.messages, newMessage],
            lastActivity: newMessage.timestamp
          } 
        : convo
    ));
  };
  
  return (
    <div className="flex bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-230px)]">
      {/* Conversation list */}
      <div className="w-1/3 border-r">
        <ConversationList 
          conversations={conversations}
          activeId={activeConversation}
          onSelectConversation={setActiveConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
      
      {/* Chat window */}
      <div className="w-2/3">
        {currentConversation ? (
          <ChatWindow 
            conversation={currentConversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageCenter;
