import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../App';
import CommentItem from './CommentItem';

function CommentSection({ postId }) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const commentInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Initialize comments with mock data
  const [comments, setComments] = useState([
    {
      id: "1",
      postId,
      author: {
        id: "2",
        name: "Jane Smith",
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      content: "Great work! Would love to hear more about the technologies you used.",
      timestamp: "1h ago",
      likes: 3,
      isLiked: false
    },
    {
      id: "2",
      postId,
      author: {
        id: "3",
        name: "Alex Johnson",
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      content: "This is impressive! Did you face any particular challenges during implementation?",
      timestamp: "30m ago",
      likes: 1,
      isLiked: false
    }
  ]);

  // Update comment count whenever comments change
  useEffect(() => {
    setCommentCount(comments.length);
  }, [comments]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showEmojis && 
        emojiPickerRef.current && 
        !emojiPickerRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setShowEmojis(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojis]);
  
  // Add a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now().toString(),
      postId,
      author: {
        id: user.id,
        name: user.name,
        profileImage: user.profileImage
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
    
    // Focus back on the input after submitting
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 0);
  };
  
  // Delete a comment
  const handleDeleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  // Toggle like on a comment
  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  // Add emoji to comment text
  const addEmoji = (emoji) => {
    setNewComment(prev => prev + emoji);
    
    // Keep focus on input after adding emoji
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, 0);
  };
  
  const emojis = ["👍", "👏", "🙌", "🔥", "💯", "❤️", "😊", "🤔", "😂"];
  
  const commentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, height: 0, marginTop: 0 }
  };

  const emojiVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.2 }
  };
  
  const toggleEmojiPicker = (e) => {
    e.preventDefault(); // Prevent form submission
    setShowEmojis(!showEmojis);
  };
  
  return (
    <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      {/* Comment header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
          <svg className="w-5 h-5 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          {commentCount} Comments
        </h3>
        
        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
      
      {/* Comment list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        <AnimatePresence>
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              variants={commentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <CommentItem
                comment={comment}
                currentUserId={user.id}
                onDelete={handleDeleteComment}
                onLike={handleLikeComment}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Add comment form */}
      <div className="p-4">
        <form onSubmit={handleAddComment} className="flex gap-3 items-start">
          <div className="flex-shrink-0">
            <img
              src={user.profileImage}
              alt="Your profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <div className="flex-1 relative">
            <div className="relative">
              <input
                ref={commentInputRef}
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full rounded-full py-2 pl-4 pr-12 bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-600 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={toggleEmojiPicker}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Emoji picker */}
            {showEmojis && (
              <div 
                ref={emojiPickerRef}
                className="absolute right-0 bottom-12 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="grid grid-cols-5 gap-1">
                  {emojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        addEmoji(emoji);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      variants={emojiVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      transition={{ delay: index * 0.05 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={!newComment.trim()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
