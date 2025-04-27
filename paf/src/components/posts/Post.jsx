import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp, FaComment, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';
import { UserContext, ThemeContext } from '../../App';
import CommentSection from '../comments/CommentSection';
// Import TimeAgo with error handling
let TimeAgo;
try {
  TimeAgo = require('react-timeago').default;
} catch (error) {
  console.warn('TimeAgo failed to load:', error);
}

const Post = ({ post }) => {
  const { user } = useContext(UserContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [isLiked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  // Format date as fallback for TimeAgo
  useEffect(() => {
    try {
      const date = new Date(post.timestamp);
      setFormattedDate(date.toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    } catch (error) {
      setFormattedDate('Recently');
    }
  }, [post.timestamp]);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const renderTimeAgo = () => {
    if (TimeAgo) {
      try {
        return <TimeAgo date={post.timestamp} />;
      } catch (error) {
        return formattedDate;
      }
    }
    return formattedDate;
  };

  return (
    <motion.div 
      className={`rounded-xl shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.author.id}`} className="flex items-center">
          <img 
            src={post.author.profileImage} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-lg">{post.author.name}</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>{post.author.title}</span>
              <span className="mx-1">•</span>
              <span>{renderTimeAgo()}</span>
            </div>
          </div>
        </Link>
        <div className="relative">
          <button 
            onClick={() => setShowOptions(!showOptions)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaEllipsisH />
          </button>
          {showOptions && (
            <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg py-1 z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Report post</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Hide post</button>
              {user.id === post.author.id && (
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Delete post</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p className="mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img src={post.image} alt="Post" className="w-full h-auto object-cover" />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1 items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400">
              👍
            </span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-400">
              ❤️
            </span>
          </div>
          <span>{likeCount}</span>
        </div>
        <div className="ml-auto flex space-x-4">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 flex justify-between border-t border-gray-200 dark:border-gray-700">
        <motion.button 
          className={`flex items-center justify-center w-1/4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isLiked ? 'text-blue-500 font-semibold' : ''}`}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
        >
          {isLiked ? '👍' : <FaRegThumbsUp className="mr-2" />}
          <span className="ml-2">Like</span>
        </motion.button>
        <motion.button 
          className="flex items-center justify-center w-1/4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          whileTap={{ scale: 0.95 }}
          onClick={toggleComments}
        >
          <FaComment className="mr-2" />
          <span>Comment</span>
        </motion.button>
        <motion.button 
          className="flex items-center justify-center w-1/4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          whileTap={{ scale: 0.95 }}
        >
          <FaShare className="mr-2" />
          <span>Share</span>
        </motion.button>
        <motion.button 
          className={`flex items-center justify-center w-1/4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${saved ? 'text-blue-500 font-semibold' : ''}`}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
        >
          <FaBookmark className="mr-2" />
          <span>Save</span>
        </motion.button>
      </div>

      {/* Comment Section */}
      {showComments && <CommentSection postId={post.id} />}
    </motion.div>
  );
};

export default Post;
