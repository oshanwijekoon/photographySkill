import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegThumbsUp, FaComment, FaShare, FaBookmark, FaEllipsisH, FaHeart, FaLaughBeam, FaAngry, FaSurprise } from 'react-icons/fa';
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
  const [reactionType, setReactionType] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  const reactions = [
    { emoji: "👍", type: "like", Icon: FaThumbsUp },
    { emoji: "❤️", type: "love", Icon: FaHeart },
    { emoji: "😂", type: "haha", Icon: FaLaughBeam },
    { emoji: "😮", type: "wow", Icon: FaSurprise },
    { emoji: "😠", type: "angry", Icon: FaAngry },
  ];

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

  const handleReaction = (type) => {
    if (reactionType === type) {
      setReactionType(null);
      setLikeCount(likeCount - 1);
    } else {
      if (!reactionType) setLikeCount(likeCount + 1);
      setReactionType(type);
    }
    setShowReactions(false);
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

      {/* Enhanced Post Stats */}
      <div className="px-6 py-3 flex items-center text-sm border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 hover:space-x-0 transition-all duration-300">
            {likeCount > 0 && reactions.slice(0, Math.min(3, likeCount)).map((reaction, index) => (
              <motion.span 
                key={index} 
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-white dark:border-gray-700 hover:scale-110 transition-transform"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {reaction.emoji}
              </motion.span>
            ))}
          </div>
          <span className="ml-2 font-medium text-gray-600 dark:text-gray-300">{likeCount}</span>
        </div>
        <div className="ml-auto flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <motion.span 
            className="flex items-center gap-1 hover:text-blue-500 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <FaComment className="w-4 h-4" />
            {post.comments?.length || 0}
          </motion.span>
          <motion.span 
            className="flex items-center gap-1 hover:text-green-500 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <FaShare className="w-4 h-4" />
            {post.shares}
          </motion.span>
        </div>
      </div>

      {/* Enhanced Post Actions */}
      <div className="px-6 py-2 flex justify-between border-t border-gray-200 dark:border-gray-700 relative bg-white dark:bg-gray-800">
        <div className="relative flex-1">
          <motion.button 
            className={`flex items-center justify-center py-2.5 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors ${
              reactionType ? 'text-blue-500 font-semibold bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setShowReactions(true)}
            onHoverEnd={() => setTimeout(() => setShowReactions(false), 500)}
          >
            {reactionType ? reactions.find(r => r.type === reactionType)?.emoji : '👍'}
            <span className="ml-2">Like</span>
          </motion.button>

          {showReactions && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -50 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 flex gap-1 bg-white dark:bg-gray-800 p-2.5 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              {reactions.map((reaction) => (
                <motion.button
                  key={reaction.type}
                  onClick={() => handleReaction(reaction.type)}
                  className={`p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transform transition-all duration-200 ${
                    reactionType === reaction.type ? 'scale-125 bg-gray-100 dark:bg-gray-700 shadow-lg' : ''
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {reaction.emoji}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

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

      {/* Enhanced Comment Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CommentSection 
            postId={post.id}
            comments={post.comments}
            currentUser={user}
            isDarkMode={isDarkMode}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Post;
