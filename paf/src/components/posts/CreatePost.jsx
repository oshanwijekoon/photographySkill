import { useState, useContext } from 'react';
import { UserContext, UIContext } from '../../App';

function CreatePost({ standalone = false, onPostCreated }) {
  const { user } = useContext(UserContext);
  const { setShowCreatePost } = useContext(UIContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Portraits',
    tags: '',
    imageUrl: '',
    captionStyle: 'minimal' // Add this new field
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
        category: 'Portraits',
        tags: '',
        imageUrl: '',
        captionStyle: 'minimal'
      });
    }, 1000);
  };

  const content = (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 text-emerald-600 font-medium"
          >
            <option value="Portraits" className="text-black">Portraits</option>
            <option value="Landscape" className="text-black">Landscape</option>
            <option value="Street" className="text-black">Street</option>
            <option value="Wildlife" className="text-black">Wildlife</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., portrait, lighting, composition"
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Caption Style</label>
          <select
            name="captionStyle"
            value={formData.captionStyle}
            onChange={handleChange}
            className="w-full rounded-md border border-black-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="minimal">Minimal & Clean</option>
            <option value="detailed">Detailed Technical Info</option>
            <option value="artistic">Artistic Expression</option>
            <option value="storytelling">Storytelling</option>
            <option value="instructional">Tutorial/How-To</option>
            <option value="location">Location Based</option>
            <option value="equipment">Equipment Focused</option>
            <option value="behind">Behind the Scenes</option>
            <option value="emotional">Emotional/Mood</option>
            <option value="challenge">Photography Challenge</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );

  if (standalone) {
    return content;
  }

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
        {content}
      </div>
    </div>
  );
}

export default CreatePost;
