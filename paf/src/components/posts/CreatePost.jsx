import { useState, useContext } from 'react';
import { UserContext, UIContext } from '../../App';

function CreatePost() {
  const { user } = useContext(UserContext);
  const { setShowCreatePost } = useContext(UIContext);
  
  const [postContent, setPostContent] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeMedia = () => {
    setMediaPreview(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!postContent.trim() && !mediaPreview) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating post creation
    setTimeout(() => {
      // Here we would normally send data to the server
      console.log({
        content: postContent,
        media: mediaPreview,
        author: user.id
      });
      
      setIsSubmitting(false);
      setPostContent('');
      setMediaPreview(null);
      setShowCreatePost(false);
    }, 1000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-xl font-semibold text-black">Create a post</h2>
          <button 
            onClick={() => setShowCreatePost(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <img 
                src={user.profileImage} 
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <div className="mt-1 text-sm inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  Public
                </div>
              </div>
            </div>
            
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What skills or experience would you like to share?"
              className="w-full min-h-[120px] border-0 focus:ring-0 text-lg resize-none text-black"
            ></textarea>
            
            {mediaPreview && (
              <div className="relative mt-2 rounded-lg overflow-hidden">
                <img src={mediaPreview} alt="Preview" className="w-full h-auto" />
                <button
                  type="button"
                  onClick={removeMedia}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="px-4 py-3 border-t flex justify-between items-center">
            <div className="flex gap-3">
              <label className="flex items-center gap-1 py-2 px-3 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span>Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </label>
              
              <button type="button" className="flex items-center gap-1 py-2 px-3 rounded-md text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Video</span>
              </button>
              
              <button type="button" className="flex items-center gap-1 py-2 px-3 rounded-md text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                </svg>
                <span>Document</span>
              </button>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || (!postContent.trim() && !mediaPreview)}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isSubmitting || (!postContent.trim() && !mediaPreview)
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
