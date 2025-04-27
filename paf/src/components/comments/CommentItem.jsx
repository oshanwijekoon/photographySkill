import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function CommentItem({ comment, currentUserId, onDelete, onLike }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const optionsButtonRef = useRef(null);
  const isAuthor = comment.author.id === currentUserId;
  
  // Close options menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showOptions && 
        optionsRef.current && 
        !optionsRef.current.contains(event.target) &&
        optionsButtonRef.current && 
        !optionsButtonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);
  
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(comment.id);
  };
  
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(comment.id);
    setShowOptions(false);
  };
  
  const toggleOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOptions(!showOptions);
  };
  
  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src={comment.author.profileImage}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5">
            <div className="flex justify-between items-start gap-2">
              <span className="font-medium text-gray-900 dark:text-white">{comment.author.name}</span>
              
              <div className="relative">
                <button 
                  ref={optionsButtonRef}
                  onClick={toggleOptions}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-1 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
                
                {showOptions && (
                  <motion.div 
                    ref={optionsRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="py-1">
                      {isAuthor && (
                        <button 
                          onClick={handleDelete}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center focus:outline-none"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Delete
                        </button>
                      )}
                      <button 
                        onClick={() => setShowOptions(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center focus:outline-none"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                        Share
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            <p className="mt-1 text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-1 ml-1">
            <button 
              onClick={handleLike}
              className={`text-xs font-medium flex items-center ${comment.isLiked ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'} focus:outline-none`}
            >
              <svg className="w-4 h-4 mr-1" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
              {comment.likes > 0 && comment.likes}
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
