import { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import CreatePost from './components/posts/CreatePost';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MessageCenter from './components/messaging/MessageCenter';
import LearnPlanPage from './components/learnplan/LearnPlanPage';
import LearnPlanDetails from './components/learnplan/LearnPlanDetails';
import Header from './components/layout/Header';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import PostManagement from './components/posts/PostManagement';

// Create contexts for user and UI state
export const UserContext = createContext(null);  // Change this line
export const UIContext = createContext(null);
export const ThemeContext = createContext(null);

function App() {
  // Mock authenticated user state
  const [user, setUser] = useState({
    id: "1",
    name: "John Doe",
    title: "Professional Photographer",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    background: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
    connections: 342,
    isAuthenticated: true,
    isAdmin: true
  });
  
  // App-wide UI state
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle theme toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading your experience...</h2>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UIContext.Provider value={{ showCreatePost, setShowCreatePost }}>
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          <Router>
            <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
              <Header />
              <main className="w-full">
                <Routes>
                  <Route path="/login" element={user.isAuthenticated ? <Navigate to="/" /> : <Login />} />
                  <Route path="/register" element={user.isAuthenticated ? <Navigate to="/" /> : <Register />} />
                  <Route path="/" element={<Feed />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/messages" element={<MessageCenter />} />
                  <Route path="/posts/manage" element={<PostManagement />} />
                  <Route path="/learnplan" element={<LearnPlanPage />} />
                  <Route path="/learnplan/:id" element={<LearnPlanDetails />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <AnimatePresence>
                {showCreatePost && <CreatePost />}
              </AnimatePresence>
            </div>
          </Router>
        </ThemeContext.Provider>
      </UIContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
