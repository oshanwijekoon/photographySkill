import { useState } from 'react';
import { Link } from 'react-router-dom';

function LearnPlanCard({ plan }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technology': return '💻';
      case 'cooking': return '🍳';
      case 'fitness': return '🏋️';
      case 'art': return '🎨';
      case 'business': return '💼';
      default: return '📚';
    }
  };
  
  // Function to capitalize first letter of each word
  const formatCategory = (category) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={plan.thumbnail} 
          alt={plan.title}
          className="h-48 w-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 rounded">
          {plan.videos} videos
        </div>
        <div className="absolute top-4 left-4 bg-white shadow-sm text-gray-800 text-sm font-medium px-2 py-1 rounded-full flex items-center">
          <span className="mr-1">{getCategoryIcon(plan.category)}</span>
          {formatCategory(plan.category)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plan.description}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex-shrink-0">
            <img 
              src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 50)}.jpg`}
              alt={plan.instructor}
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{plan.instructor}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {plan.duration}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {plan.level}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {plan.rating}
          </div>
        </div>
        
        <Link to={`/learnplan/${plan.id}`}>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            View Course
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LearnPlanCard;
