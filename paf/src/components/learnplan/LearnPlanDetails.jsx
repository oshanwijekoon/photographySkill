import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function LearnPlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);
  
  // Mock videos data
  const [videos, setVideos] = useState([
    { 
      id: 1, 
      title: "Introduction to the Course", 
      duration: "10:15", 
      thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      completed: true
    },
    { 
      id: 2, 
      title: "Core Concepts & Fundamentals", 
      duration: "24:30", 
      thumbnail: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      completed: true
    },
    { 
      id: 3, 
      title: "Intermediate Techniques", 
      duration: "18:45", 
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      completed: false
    },
    { 
      id: 4, 
      title: "Advanced Applications", 
      duration: "32:20", 
      thumbnail: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      completed: false
    },
    { 
      id: 5, 
      title: "Final Project & Conclusion", 
      duration: "45:10", 
      thumbnail: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      completed: false
    }
  ]);

  // Mock data for a single learn plan
  useEffect(() => {
    // Simulate API call to fetch plan details
    setTimeout(() => {
      setPlan({
        id: id,
        title: "React Fundamentals Masterclass",
        category: "technology",
        description: "Learn the core concepts of React including hooks, state management, and component lifecycle. This comprehensive course will take you from beginner to proficient React developer with practical exercises and real-world projects.",
        instructor: "Sarah Johnson",
        instructorTitle: "Senior Frontend Developer",
        instructorImage: "https://randomuser.me/api/portraits/women/44.jpg",
        level: "Intermediate",
        duration: "5 hours",
        thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
        videos: 5,
        rating: 4.8,
        enrolled: 1245,
        lastUpdated: "October 2023",
        whatYouWillLearn: [
          "Understand React core concepts and component architecture",
          "Master hooks like useState, useEffect, useContext, and custom hooks",
          "Implement state management with Context API and Redux",
          "Build real-world applications with React Router",
          "Optimize performance with React's best practices"
        ]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleVideoCompletion = (videoId) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, completed: true } : video
    ));
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-72 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            </div>
            <div>
              <div className="h-full bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!plan) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Learn Plan Not Found</h2>
          <p className="mt-2 text-gray-600">The learn plan you're looking for doesn't exist or has been removed.</p>
          <Link to="/learnplan" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
            Back to Learn Plans
          </Link>
        </div>
      </div>
    );
  }
  
  // Calculate progress percentage
  const completedVideos = videos.filter(video => video.completed).length;
  const progressPercentage = Math.round((completedVideos / videos.length) * 100);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/learnplan" className="text-gray-600 hover:text-gray-900">
              Learn Plans
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-600 font-medium">{plan.title}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Video player */}
            <div className="aspect-w-16 aspect-h-9 bg-gray-900">
              <div className="flex items-center justify-center h-full">
                <img 
                  src={videos[activeVideo].thumbnail} 
                  alt={videos[activeVideo].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg hover:bg-opacity-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Video info */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h1>
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{plan.rating} rating</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{plan.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{plan.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Last updated {plan.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <img src={plan.instructorImage} alt={plan.instructor} className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-medium text-gray-900">{plan.instructor}</h3>
                  <p className="text-sm text-gray-600">{plan.instructorTitle}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{plan.description}</p>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">What you'll learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                  {plan.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
                <div className="flex items-center mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 ml-4">{progressPercentage}%</span>
                </div>
                <p className="text-sm text-gray-600">
                  {completedVideos} of {videos.length} lessons completed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <div 
                    key={video.id}
                    className={`flex cursor-pointer p-3 rounded-lg transition-colors ${
                      activeVideo === index 
                        ? 'bg-indigo-50 border border-indigo-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveVideo(index)}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                      <div className="h-16 w-24 rounded bg-gray-200 overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt="" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className={`text-sm font-medium ${activeVideo === index ? 'text-indigo-700' : 'text-gray-900'}`}>
                          {index + 1}. {video.title}
                        </p>
                        {video.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t">
              <button 
                onClick={() => handleVideoCompletion(videos[activeVideo].id)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                disabled={videos[activeVideo].completed}
              >
                {videos[activeVideo].completed ? 'Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPlanDetails;
