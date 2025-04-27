import { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../App';
import PostCard from '../posts/PostCard';
import Skills from './Skills';
import EditProfileModal from './EditProfileModal';
import { motion } from 'framer-motion';

function Profile() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('posts');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const tabsRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  
  // Mock posts data for the profile
  const [userPosts, setUserPosts] = useState([
    {
      id: "1",
      author: {
        id: user.id,
        name: user.name,
        title: user.title,
        profileImage: user.profileImage
      },
      content: "Just completed a major project using React and Node.js! The client was thrilled with the results. #webdevelopment #reactjs",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      likes: 42,
      comments: 8,
      timestamp: "2d ago"
    },
    {
      id: "2",
      author: {
        id: user.id,
        name: user.name,
        title: user.title,
        profileImage: user.profileImage
      },
      content: "Excited to share that I've just been certified as an AWS Solutions Architect! Looking forward to applying these skills in upcoming projects.",
      image: null,
      likes: 67,
      comments: 12,
      timestamp: "1w ago"
    }
  ]);

  // Activity data
  const activities = [
    { 
      id: "1", 
      type: "certificate", 
      title: "AWS Solutions Architect Associate",
      description: "Completed certification course",
      date: "3 days ago",
      icon: "🏆" 
    },
    { 
      id: "2", 
      type: "connection", 
      title: "Connected with Sarah Johnson",
      description: "Senior Developer at TechCorp",
      date: "1 week ago",
      icon: "🔗" 
    },
    { 
      id: "3", 
      type: "learn", 
      title: "Completed React Advanced Course",
      description: "12 hours of content",
      date: "2 weeks ago",
      icon: "📚" 
    }
  ];

  // Education data
  const education = [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      years: "2015 - 2019",
      logo: "https://randomuser.me/api/portraits/lego/1.jpg"
    },
    {
      school: "Online Academy",
      degree: "Full Stack Web Development Bootcamp",
      years: "2020",
      logo: "https://randomuser.me/api/portraits/lego/2.jpg"
    }
  ];

  // Connections data
  const connections = [
    {
      id: "1",
      name: "Alex Chen",
      title: "UX Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      title: "Senior Developer",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: "3",
      name: "Michael Brown",
      title: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: "4",
      name: "Emily Davis",
      title: "Data Scientist",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];

  // Handle tab change and animate indicator
  const handleTabChange = (tab, e) => {
    const currentTab = e.currentTarget;
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth
      });
    }
    setActiveTab(tab);
  };

  // Add this function to handle edit profile button click
  const handleEditProfileClick = () => {
    setShowEditProfile(true);
  };

  return (
    <div className="pb-12">
      {/* Profile Header/Banner */}
      <div className="relative mb-8">
        <div className="h-60 w-full overflow-hidden rounded-xl">
          <img 
            src={user.background || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"} 
            alt="Profile background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 transform translate-y-1/2 left-8 flex items-end">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <button 
              onClick={() => setShowEditProfile(true)}
              className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          
          <div className="ml-6 pb-6">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-white/80">{user.title}</p>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-8">
          <button 
            onClick={handleEditProfileClick}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md"
          >
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Profile content */}
      <div className="mt-16 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* About section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">About</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Passionate software engineer with 5+ years of experience building web applications. Specialized in React, Node.js, and cloud infrastructure.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Software Engineer at TechCorp</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                  <a href="#" className="text-primary-600 hover:underline">github.com/johndoe</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Skills</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                Add New
              </button>
            </div>
            <div className="p-6">
              <Skills />
            </div>
          </div>
          
          {/* Education section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Education</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {education.map((edu, index) => (
                <div key={index} className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <img src={edu.logo} alt={edu.school} className="w-12 h-12 rounded-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{edu.school}</h4>
                    <p className="text-gray-700">{edu.degree}</p>
                    <p className="text-gray-500 text-sm mt-1">{edu.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-100 relative" ref={tabsRef}>
              <div className="flex">
                <button 
                  onClick={(e) => handleTabChange('posts', e)}
                  className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'posts' ? 'text-primary-600' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  Posts
                </button>
                <button 
                  onClick={(e) => handleTabChange('activity', e)}
                  className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'activity' ? 'text-primary-600' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  Activity
                </button>
                <button 
                  onClick={(e) => handleTabChange('connections', e)}
                  className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'connections' ? 'text-primary-600' : 'text-gray-700 hover:text-gray-900'}`}
                >
                  Connections
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {user.connections}
                  </span>
                </button>
              </div>
              
              {/* Active tab indicator */}
              <div 
                className="absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-300 ease-in-out"
                style={{
                  left: indicatorStyle.left || 0,
                  width: indicatorStyle.width || 0
                }}
              ></div>
            </div>
            
            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'posts' && (
                <div className="space-y-6">
                  {userPosts.map(post => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {activities.map(activity => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-xl">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'connections' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {connections.map(connection => (
                    <motion.div
                      key={connection.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <img 
                        src={connection.image} 
                        alt={connection.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{connection.name}</h4>
                        <p className="text-gray-600 text-sm">{connection.title}</p>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 5a1 1 0 112 0v6.5a1 1 0 11-2 0V5zm-1 9.5a1 1 0 100 2 1 1 0 000-2z"></path>
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal user={user} onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
}

export default Profile;
