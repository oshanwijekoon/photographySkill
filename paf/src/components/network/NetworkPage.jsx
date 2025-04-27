import { useState } from 'react';
import ConnectionCard from './ConnectionCard';

function NetworkPage() {
  const [connectionRequests, setConnectionRequests] = useState([
    {
      id: "1",
      name: "Sarah Wilson",
      title: "Marketing Manager",
      company: "Digital Marketing Co.",
      mutualConnections: 12,
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: "2",
      name: "Robert Chen",
      title: "Software Architect",
      company: "Tech Solutions Inc.",
      mutualConnections: 8,
      profileImage: "https://randomuser.me/api/portraits/men/6.jpg"
    }
  ]);
  
  const [recommendations, setRecommendations] = useState([
    {
      id: "3",
      name: "Jennifer Lee",
      title: "Product Manager",
      company: "Innovative Products",
      mutualConnections: 5,
      profileImage: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      id: "4",
      name: "Michael Brown",
      title: "Data Analyst",
      company: "Data Insights Corp",
      mutualConnections: 3,
      profileImage: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      title: "UX Researcher",
      company: "User Experience Labs",
      mutualConnections: 7,
      profileImage: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    {
      id: "6",
      name: "David Miller",
      title: "Frontend Developer",
      company: "Web Dev Solutions",
      mutualConnections: 2,
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg"
    }
  ]);
  
  const handleAcceptRequest = (id) => {
    // Move from requests to accepted connections (not shown in this UI)
    setConnectionRequests(connectionRequests.filter(req => req.id !== id));
  };
  
  const handleIgnoreRequest = (id) => {
    setConnectionRequests(connectionRequests.filter(req => req.id !== id));
  };
  
  const handleConnect = (id) => {
    // In a real app, this would send a connection request
    // For demo purposes, we'll just remove from recommendations
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };
  
  return (
    <div className="space-y-6">
      {/* Connection requests section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h2 className="text-xl font-semibold">Connection Requests</h2>
        </div>
        
        {connectionRequests.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>You have no pending connection requests.</p>
          </div>
        ) : (
          <div className="divide-y">
            {connectionRequests.map(request => (
              <ConnectionCard
                key={request.id}
                connection={request}
                type="request"
                onAccept={() => handleAcceptRequest(request.id)}
                onIgnore={() => handleIgnoreRequest(request.id)}
                onConnect={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* People you may know section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h2 className="text-xl font-semibold">People you may know</h2>
          <p className="text-gray-500 text-sm">Based on your profile and connections</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          {recommendations.map(recommendation => (
            <ConnectionCard
              key={recommendation.id}
              connection={recommendation}
              type="recommendation"
              onConnect={() => handleConnect(recommendation.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NetworkPage;
