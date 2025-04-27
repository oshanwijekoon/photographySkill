import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, ThemeContext, UIContext } from '../../App';
import { FaMoon, FaSun, FaBell, FaEnvelope, FaSearch, FaPlus } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { setShowCreatePost } = useContext(UIContext);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">PAF</span>
            </Link>
          </div>

          {/* Search */}
          <div className={`relative mx-4 flex-1 max-w-lg transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800 focus:ring-blue-600 text-white' 
                    : 'bg-gray-100 focus:ring-blue-400 text-gray-900'
                } transition-all duration-300`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <FaSearch className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {user?.isAuthenticated && (
              <>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all"
                >
                  <FaPlus />
                </button>
                <Link to="/messages" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  <FaEnvelope className="text-xl" />
                </Link>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  <FaBell className="text-xl" />
                </button>
              </>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {isDarkMode ? <FaSun className="text-xl text-yellow-300" /> : <FaMoon className="text-xl text-gray-700" />}
            </button>
            
            {user?.isAuthenticated ? (
              <Link to="/profile" className="flex items-center">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border-2 border-blue-500 hover:border-purple-500 transition-all"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
