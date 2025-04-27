import { useState, useContext } from 'react';
import { UserContext, UIContext } from '../../App';
import { FaCamera, FaTimes, FaLeaf } from 'react-icons/fa';

function CreatePost({ standalone = false, onPostCreated }) {
  const { user } = useContext(UserContext);
  const { setShowCreatePost } = useContext(UIContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Wildlife',
    tags: '',
    imageUrl: '',
    captionStyle: 'natural',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);
    // Simulating post creation
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        ...formData,
        author: user.name,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      setIsSubmitting(false);
      if (!standalone) {
        setShowCreatePost(false);
      }
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Wildlife',
        tags: '',
        imageUrl: '',
        captionStyle: 'natural',
        location: ''
      });
    }, 1000);
  };

  const content = (
    <form onSubmit={handleSubmit} className="p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-green-800 mb-2">
            <FaCamera className="inline mr-2" />
            Capture Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
            placeholder="e.g., 'Majestic Lion at Sunset'"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-800 mb-2">
            <FaLeaf className="inline mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
            placeholder="Share the story behind your wildlife encounter..."
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold text-green-800 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
            >
              <option value="Wildlife">Wildlife</option>
              <option value="Birds">Birds</option>
              <option value="Mammals">Mammals</option>
              <option value="Reptiles">Reptiles</option>
              <option value="Marine Life">Marine Life</option>
              <option value="Insects">Insects</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-green-800 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
              placeholder="e.g., 'Serengeti National Park'"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-800 mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="wildlife, nature, safari, animal"
            className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-green-800 mb-2">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full rounded-lg border-2 border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90"
            placeholder="https://example.com/wildlife-image.jpg"
          />
        </div>

      
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-lg text-white font-medium text-lg transition-colors ${
            isSubmitting 
              ? 'bg-green-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? 'Sharing...' : 'Share Wildlife Post'}
        </button>
      </div>
    </form>
  );

  if (standalone) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Share Your Wildlife Experience</h1>
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl">
        <div className="flex justify-between items-center border-b px-6 py-4 bg-green-700 text-white rounded-t-xl">
          <h2 className="text-2xl font-semibold">Share Your Wildlife Experience</h2>
          <button 
            onClick={() => setShowCreatePost(false)}
            className="text-white hover:text-green-200 transition-colors"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}

export default CreatePost;
