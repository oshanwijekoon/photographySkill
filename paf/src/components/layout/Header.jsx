import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { motion } from 'framer-motion';

function Header() {
  const { user } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed w-full z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-white"
              >
                Photoscape
              </motion.span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {['Gallery', 'Learn', 'Discover', 'About'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-white/80 hover:text-white transition-colors px-3 py-2 text-sm font-medium"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user?.isAuthenticated ? (
              <Link to="/profile" className="flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white/20"
                />
                <span className="text-white text-sm font-medium hidden md:block">
                  {user.name}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-white/80 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
