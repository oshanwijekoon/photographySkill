import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import CommentSection from '../comments/CommentSection';

function PhotoDetail({ photo, onClose }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="md:flex-1 flex items-center justify-center p-4">
          <img
            src={photo.image}
            alt={photo.title}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>

        {/* Right side - Details */}
        <div className="md:w-96 bg-white dark:bg-gray-800 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{photo.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">{photo.description}</p>
            <p className="mt-2 text-sm">by {photo.photographer}</p>
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-2"
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{photo.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2"
            >
              <FaComment />
              <span>{photo.comments}</span>
            </button>
            <button className="flex items-center space-x-2">
              <FaShare />
            </button>
          </div>

          {showComments && <CommentSection postId={photo.id} />}
        </div>
      </div>
    </motion.div>
  );
}

export default PhotoDetail;
