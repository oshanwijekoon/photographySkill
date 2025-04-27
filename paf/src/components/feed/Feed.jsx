import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext, UserContext, UIContext } from '../../App';
import Post from '../posts/Post';
import { FaFilter, FaFire, FaClock, FaStar, FaImage, FaVideo, FaFileAlt } from 'react-icons/fa';

const Feed = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { setShowCreatePost } = useContext(UIContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('trending');

  // Simulate fetching posts from an API
  //rgrgththth
  useEffect(() => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      const mockPosts = Array(10).fill().map((_, i) => ({
        id: `post-${i}`,
        author: {
          id: i % 3 === 0 ? user.id : `user-${i}`,
          name: i % 3 === 0 ? user.name : `User ${i}`,
          profileImage: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`,
          title: `${i % 2 === 0 ? 'Professional Photographer' : 'Photography Enthusiast'}`
        },
        content: getRandomPhotoContent(),
        image: `https://picsum.photos/seed/${i}/800/600`,
        likes: Math.floor(Math.random() * 200),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 30),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString(),
        tags: getRandomPhotoTags()
      }));

      function getRandomPhotoContent() {
        const contents = [
          "Just wrapped up a fantastic landscape shoot in the mountains! Here's one of my favorite shots. Shot with f/8, 1/250s, ISO 100. What do you think?",
          "Testing out some new portrait lighting techniques. Love how the shadows play in this one.",
          "Street photography is all about timing. Caught this beautiful moment today.",
          "Experimenting with long exposure photography. Tips welcome!",
          "New addition to my gear family! Can't wait to test this lens out.",
          "Here's a behind-the-scenes look at today's studio setup. Always learning!"
        ];
        return contents[Math.floor(Math.random() * contents.length)];
      }

      function getRandomPhotoTags() {
        const tags = ['#Photography', '#PhotoOfTheDay', '#Nikon', '#Canon', '#SonyAlpha', '#Landscape', '#Portrait', '#StreetPhotography', '#Composition', '#LightingSetup'];
        return tags.sort(() => 0.5 - Math.random()).slice(0, 3);
      }

      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, [user.id, user.name]);

  const filterPosts = () => {
    switch(filter) {
      case 'trending':
        return [...posts].sort((a, b) => b.likes - a.likes);
      case 'recent':
        return [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'top':
        return [...posts].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
      default:
        return posts;
    }
  };

  const filterButtons = [
    { id: 'trending', label: 'Trending', icon: <FaFire /> },
    { id: 'recent', label: 'Recent', icon: <FaClock /> },
    { id: 'featured', label: 'Featured', icon: <FaStar /> }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Post Box */}
      <div className={`mb-4 rounded-lg shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 text-left px-4 py-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
            >
              Start a post
            </button>
          </div>
          <div className="flex justify-between mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400"
            >
              <FaImage className="text-blue-500" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400"
            >
              <FaVideo className="text-green-500" />
              <span>Video</span>
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400"
            >
              <FaFileAlt className="text-purple-500" />
              <span>Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Temporarily disabled Stories/Highlights Section */}
      {/* <div className={`max-w-2xl mx-auto px-4 py-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="mb-6 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-4 pb-2">
            {Array(8).fill().map((_, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
                  <div className={`w-full h-full rounded-full p-0.5 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 1}.jpg`}
                      alt="Story" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <p className="text-xs text-center mt-1 truncate w-20">Story {i+1}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Temporarily disabled Filter Controls Section */}
      {/* <div className="mb-6">
        <div className={`flex items-center p-3 rounded-xl shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FaFilter className="mr-2 text-blue-500" />
          <span className="mr-4">Filter:</span>
          <div className="flex gap-2">
            {filterButtons.map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  filter === btn.id
                    ? 'bg-blue-500 text-white'
                    : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* Posts Feed */}
      <div className="space-y-6">
        {filterPosts().map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Post post={post} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
