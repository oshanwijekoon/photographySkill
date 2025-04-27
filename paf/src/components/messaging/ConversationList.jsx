import { useMemo } from 'react';

function ConversationList({ conversations, activeId, onSelectConversation, searchQuery, onSearchChange }) {
  // Format the timestamp into a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If this week, show day name
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(convo => 
      convo.user.name.toLowerCase().includes(query) ||
      convo.messages.some(msg => msg.content.toLowerCase().includes(query))
    );
  }, [conversations, searchQuery]);
  
  // Sort conversations by most recent activity
  const sortedConversations = useMemo(() => {
    return [...filteredConversations].sort((a, b) => 
      new Date(b.lastActivity) - new Date(a.lastActivity)
    );
  }, [filteredConversations]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search messages..."
            className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No conversations found</p>
          </div>
        ) : (
          <ul className="divide-y">
            {sortedConversations.map(conversation => {
              const latestMessage = conversation.messages[conversation.messages.length - 1];
              const isActive = conversation.id === activeId;
              
              return (
                <li 
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${isActive ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <img 
                        src={conversation.user.profileImage}
                        alt={conversation.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.user.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {formatTime(conversation.lastActivity)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate">
                        {latestMessage.sender === 'me' && "You: "}
                        {latestMessage.content}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      <div className="p-3 border-t">
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition text-sm">
          New Message
        </button>
      </div>
    </div>
  );
}

export default ConversationList;
