import { useState } from 'react';

function AddLearnPlanForm({ onAddLearnPlan, categories }) {
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0]?.id || '',
    description: '',
    instructor: '',
    level: 'Beginner',
    duration: '',
    thumbnail: '',
    objectives: [''],
    prerequisites: [''],
    resources: [''],
    videos: 0
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'videos' ? parseInt(value, 10) || '' : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleArrayInputChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (!formData.objectives.some(obj => obj.trim())) newErrors.objectives = 'At least one objective is required';
    if (!formData.prerequisites.some(pre => pre.trim())) newErrors.prerequisites = 'At least one prerequisite is required';
    if (!formData.resources.some(res => res.trim())) newErrors.resources = 'At least one resource is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddLearnPlan({
        ...formData,
        objectives: formData.objectives.filter(obj => obj.trim()),
        prerequisites: formData.prerequisites.filter(pre => pre.trim()),
        resources: formData.resources.filter(res => res.trim())
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm py-2.5 px-3 border-2 ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
                placeholder="e.g. Advanced Photography Techniques"
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
                className="mt-1 block w-full rounded-md py-2.5 px-3 border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm py-2.5 px-3 border-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-indigo-500`}
            placeholder="Provide a detailed description of the course..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Course Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Details</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor</label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md py-2.5 px-3 border-2 ${errors.instructor ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Instructor name"
              />
              {errors.instructor && <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>}
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md py-2.5 px-3 border-2 border-gray-300"
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
                className={`mt-1 block w-full rounded-md py-2.5 px-3 border-2 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g. 8 hours"
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
          </div>
        </div>

        {/* Dynamic Arrays */}
        {['objectives', 'prerequisites', 'resources'].map((field) => (
          <div key={field} className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                + Add {field.slice(0, -1)}
              </button>
            </div>
            {formData[field].map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayInputChange(index, e.target.value, field)}
                  className="flex-1 rounded-md py-2.5 px-3 border-2 border-gray-300"
                  placeholder={`Enter ${field.slice(0, -1)}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, field)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            {errors[field] && <p className="mt-1 text-sm text-red-600">{errors[field]}</p>}
          </div>
        ))}

        {/* Thumbnail URL */}
        <div className="md:col-span-2">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md py-2.5 px-3 border-2 ${errors.thumbnail ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter image URL"
          />
          {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={() => onAddLearnPlan(null)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create Learn Plan
        </button>
      </div>
    </form>
  );
}

export default AddLearnPlanForm;
