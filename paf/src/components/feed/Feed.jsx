import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { UserContext, ThemeContext } from '../../App';
import Post from '../posts/Post';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1575550959106-5a7defe28b56"
            alt="Wildlife Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Capture the Wild
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Join our community of wildlife photographers and share your perspective
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all mr-4"
                onClick={() => navigate('/posts/manage')}
              >
                Start Sharing
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-white/80">{category.count} photos</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ... existing post mapping code ... */}
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    title: "Wildlife",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7",
    count: 1234
  },
  {
    title: "Landscapes",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    count: 890
  },
  {
    title: "Birds",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890",
    count: 567
  }
];

export default Feed;
