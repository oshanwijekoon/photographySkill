import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { motion } from 'framer-motion';

function Header() {
  const { user } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-20 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-gradient-to-r from-blue-700 to-blue-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="text-3xl font-extrabold text-white">
                  <span className="relative z-10">Photoscape</span>
                </span>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-400 rounded-full opacity-70 animate-pulse"></div>
              </motion.div>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {['Home', 'Profile', 'Learn', 'Discover'].map((item, index) => {
                const path = item === 'Home' ? '/' : 
                             item === 'Learn Plans' ? '/learnplan' : 
                             `/${item.toLowerCase().replace(' ', '')}`;
                
                const active = item === 'Learn Plans' 
                  ? isActive('/learnplan') || location.pathname.startsWith('/learnplan/')
                  : isActive(path);
                
                return (
                  <motion.div
                    key={item}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to={path}
                      className={`relative px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                        active 
                          ? 'text-white' 
                          : 'text-blue-100 hover:text-white'
                      }`}
                    >
                      {item}
                      {active && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute inset-0 rounded-full bg-blue-600"
                          style={{ zIndex: -1 }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-1 rounded-full text-blue-100 hover:text-white focus:outline-none"
              >
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </motion.button>
              
              <Link to="/profile" className="ml-4 flex items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <img
                    className="h-9 w-9 rounded-full object-cover border-2 border-blue-300 shadow-md"
                    src={user.profileImage}
                    alt={user.name}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                </motion.div>
                <span className="ml-2 text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
              </Link>
            </div>
            
            <div className="ml-4 md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white focus:outline-none"
              >
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          height: mobileMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md shadow-lg rounded-b-xl mx-2"
      >
        <div className="pt-2 pb-3 space-y-1 px-2">
          {['Home', 'Profile', 'Learn Plans', 'Network'].map((item) => {
            const path = item === 'Home' ? '/' : 
                         item === 'Learn Plans' ? '/learnplan' : 
                         `/${item.toLowerCase().replace(' ', '')}`;
            
            const active = item === 'Learn Plans' 
              ? isActive('/learnplan') || location.pathname.startsWith('/learnplan/')
              : isActive(path);
            
            return (
              <Link
                key={item}
                to={path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  active 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            );
          })}
        </div>
        
        <div className="pt-4 pb-5 border-t border-gray-200">
          <div className="flex items-center px-4 bg-blue-50 py-3 rounded-lg mx-2">
            <div className="flex-shrink-0 relative">
              <img
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-200"
                src={user.profileImage}
                alt={user.name}
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
            </div>
            <div className="ml-3">
              <div className="text-base font-semibold text-gray-800">{user.name}</div>
              <div className="text-sm font-medium text-blue-600">{user.title}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;
