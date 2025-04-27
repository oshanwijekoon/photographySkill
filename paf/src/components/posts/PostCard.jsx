import { useState } from 'react';
import CommentSection from '../comments/CommentSection';

function PostCard({ post, currentUserId, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showOptions, setShowOptions] = useState(false);
  
  const isOwner = post.author.id === currentUserId;
  
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Post header */}
      <div className="p-4 flex justify-between">
        <div className="flex gap-3">
          <img 
            src={post.author.profileImage} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">{post.author.name}</h3>
            <p className="text-gray-500 text-sm">{post.author.title}</p>
            <p className="text-gray-400 text-xs">{post.timestamp}</p>
          </div>
        </div>
        
        {isOwner && (
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Edit post
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => onDelete(post.id)}
                  >
                    Delete post
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>
      
      {/* Post image */}
      {post.image && (
        <div className="w-full">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-96"
          />
        </div>
      )}
      
      {/* Post stats */}
      <div className="px-4 py-2 text-sm text-gray-500 flex justify-between border-t border-b">
        <div>
          {likesCount > 0 && (
            <span>
              <span className="text-blue-500">👍</span> {likesCount}
            </span>
          )}
        </div>
        <div>
          {post.comments > 0 && (
            <button onClick={toggleComments}>
              {post.comments} comments
            </button>
          )}
        </div>
      </div>
      
      {/* Post actions */}
      <div className="px-4 py-1 flex justify-between">
        <button 
          className={`flex items-center gap-1 py-2 px-3 rounded-md ${isLiked ? 'text-blue-600' : 'text-gray-500'} hover:bg-gray-100`}
          onClick={handleLike}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLiked ? 0 : 1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span>Like</span>
        </button>
        
        <button 
          className="flex items-center gap-1 py-2 px-3 rounded-md text-gray-500 hover:bg-gray-100"
          onClick={toggleComments}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span>Comment</span>
        </button>
        
        <button className="flex items-center gap-1 py-2 px-3 rounded-md text-gray-500 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>
      
      {/* Comments section */}
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
}

export default PostCard;
