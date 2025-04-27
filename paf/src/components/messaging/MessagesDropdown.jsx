import { useState } from 'react';

function MessagesDropdown({ isOpen, onClose }) {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      user: {
        id: "2",
        name: "Jane Smith",
        title: "UX Designer",
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      lastMessage: {
        content: "Hi John, I wanted to follow up on our discussion about the project timeline.",
        timestamp: "2h ago",
        isRead: false,
        isFromUser: false
      }
    },
    {
      id: "2",
      user: {
        id: "3",
        name: "Alex Johnson",
        title: "Data Scientist",
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      lastMessage: {
        content: "Thanks for sharing those resources! They were very helpful.",
        timestamp: "Yesterday",
        isRead: true,
        isFromUser: true
      }
    },
    {
      id: "3",
      user: {
        id: "4",
        name: "Emily Williams",
        title: "Project Manager",
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      lastMessage: {
        content: "Let's schedule a meeting to discuss the new requirements.",
        timestamp: "2d ago",
        isRead: true,
        isFromUser: false
      }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = searchQuery
    ? conversations.filter(convo => 
        convo.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convo.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  if (!isOpen) return null;

  const unreadCount = conversations.filter(convo => !convo.lastMessage.isRead && !convo.lastMessage.isFromUser).length;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2">
        <div className="px-4 py-2 border-b">
          <h3 className="text-lg font-medium">Messages</h3>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {unreadCount} new
            </span>
          )}
          <div className="mt-2 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-gray-100 rounded-full py-2 px-4 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              {searchQuery ? 'No matching conversations' : 'No messages yet'}
            </div>
          ) : (
            filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  !conversation.lastMessage.isRead && !conversation.lastMessage.isFromUser ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img 
                      src={conversation.user.profileImage} 
                      alt={conversation.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {!conversation.lastMessage.isRead && !conversation.lastMessage.isFromUser && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h4 className="font-medium truncate">{conversation.user.name}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.lastMessage.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.isFromUser && <span className="text-gray-400">You: </span>}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-gray-50 text-center border-t">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all messages
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessagesDropdown;
