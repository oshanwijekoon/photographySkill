import { useState } from 'react';

function AddLearnPlanForm({ onAddLearnPlan, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'technology',
    description: '',
    instructor: '',
    level: 'Beginner',
    duration: '',
    thumbnail: '',
    videos: 0
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'videos' ? parseInt(value, 10) || '' : value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.videos) newErrors.videos = 'Number of videos is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddLearnPlan(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="e.g. React Fundamentals Masterclass"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="Provide a detailed description of the learn plan"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.instructor ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="e.g. Sarah Johnson"
          />
          {errors.instructor && <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>}
        </div>
        
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="e.g. 5 hours"
          />
          {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
        </div>
        
        <div>
          <label htmlFor="videos" className="block text-sm font-medium text-gray-700">Number of Videos</label>
          <input
            type="number"
            id="videos"
            name="videos"
            value={formData.videos}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.videos ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            min="1"
          />
          {errors.videos && <p className="mt-1 text-sm text-red-600">{errors.videos}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onAddLearnPlan(null)}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Learn Plan
        </button>
      </div>
    </form>
  );
}

export default AddLearnPlanForm;
