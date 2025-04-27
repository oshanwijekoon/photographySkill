import { useState } from 'react';

function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "like",
      user: {
        name: "Jane Smith",
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      content: "liked your post about React development",
      isRead: false,
      time: "2h ago"
    },
    {
      id: "2",
      type: "comment",
      user: {
        name: "Alex Johnson",
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      content: "commented on your post: \"Great insights! Would love to collaborate...\"",
      isRead: false,
      time: "5h ago"
    },
    {
      id: "3",
      type: "connection",
      user: {
        name: "Emily Williams",
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      content: "accepted your connection request",
      isRead: true,
      time: "1d ago"
    },
    {
      id: "4",
      type: "job",
      user: {
        name: "Tech Innovations Inc.",
        profileImage: "https://logo.clearbit.com/techinnovations.example.com"
      },
      content: "5 people applied to the job you posted: \"Frontend Developer\"",
      isRead: true,
      time: "2d ago"
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'connection':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
        );
      case 'job':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2">
        <div className="px-4 py-2 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 flex gap-3 ${notification.isRead ? '' : 'bg-blue-50'}`}
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img 
                        src={notification.user.profileImage} 
                        alt={notification.user.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="font-medium truncate">{notification.user.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-gray-50 text-center border-t">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
