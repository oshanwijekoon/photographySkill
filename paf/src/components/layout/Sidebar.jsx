import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';  // Verify this path is correct

function Sidebar() {
  const { user } = useContext(UserContext);
  
  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-20">
      {/* User Profile Section */}
      <div className="text-center mb-6">
        <div className="relative">
          <img 
            src={user.background}
            alt="Cover"
            className="w-full h-24 object-cover rounded-t-lg"
          />
          <img 
            src={user.profileImage}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-10"
          />
        </div>
        <div className="mt-12">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.title}</p>
          <p className="text-gray-500 text-xs mt-2">{user.connections} connections</p>
        </div>
        <Link 
          to="/profile"
          className="block mt-3 text-blue-500 hover:underline text-sm"
        >
          View Profile
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="border-t pt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="flex items-center p-2 hover:bg-gray-100 rounded">
              <span className="mr-3">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link to="/messages" className="flex items-center p-2 hover:bg-gray-100 rounded">
              <span className="mr-3">💬</span>
              Messages
            </Link>
          </li>
          {/* More sidebar links can be added here */}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
