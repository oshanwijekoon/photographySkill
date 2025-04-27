import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import LearnPlanCard from './LearnPlanCard';
import AddLearnPlanForm from './AddLearnPlanForm';
import { motion, AnimatePresence } from 'framer-motion';
import { createGradientText, generateRandomBlobShape } from '../../theme';

function LearnPlanPage() {
  const { user } = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [learnPlans, setLearnPlans] = useState([
    {
      id: "1",
      title: "React Fundamentals Masterclass",
      category: "technology",
      description: "Learn the core concepts of React including hooks, state management, and component lifecycle.",
      instructor: "Sarah Johnson",
      level: "Intermediate",
      duration: "5 hours",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 12,
      rating: 4.8
    },
    {
      id: "2",
      title: "Plant-Based Cooking Essentials",
      category: "cooking",
      description: "Master essential plant-based cooking techniques and recipes for a healthier lifestyle.",
      instructor: "Michael Chen",
      level: "Beginner",
      duration: "4 hours",
      thumbnail: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 8,
      rating: 4.9
    },
    {
      id: "3",
      title: "Digital Marketing Strategy",
      category: "business",
      description: "Learn how to create and implement effective digital marketing strategies for your business.",
      instructor: "Emily Rodriguez",
      level: "Advanced",
      duration: "6 hours",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 15,
      rating: 4.7
    },
    {
      id: "4",
      title: "Yoga for Flexibility",
      category: "fitness",
      description: "Improve your flexibility and reduce stress with these yoga sequences suitable for all levels.",
      instructor: "David Kim",
      level: "Beginner",
      duration: "3 hours",
      thumbnail: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 10,
      rating: 4.6
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🔍' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'business', name: 'Business', icon: '📊' },
    { id: 'cooking', name: 'Cooking', icon: '🍳' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'arts', name: 'Arts & Crafts', icon: '🎨' }
  ];

  const handleAddLearnPlan = (newPlan) => {
    setLearnPlans([...learnPlans, { 
      ...newPlan, 
      id: (learnPlans.length + 1).toString(),
      rating: 0,
      videos: 0 
    }]);
    setShowAddForm(false);
  };

  const filteredLearnPlans = learnPlans.filter(plan => 
    (activeCategory === 'all' || plan.category === activeCategory) &&
    (plan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     plan.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const shapeStyle = {
    borderRadius: generateRandomBlobShape(),
    background: 'linear-gradient(135deg, var(--colors-primary-500), var(--colors-secondary-500))'
  };

  return (
    <div className="py-8">
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10 flex flex-col md:flex-row">
              <div className="md:w-2/3 p-8 md:p-12 text-white">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Transform Your Fitness Journey
                </motion.h2>
                <div className="flex items-center mb-6">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mr-4">
                    <span className="text-xs font-semibold">Premium</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-sm">4.9 (128 reviews)</span>
                  </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-white/80 mb-6 text-lg leading-relaxed"
                >
                  Expert-designed workout plans, personalized nutrition guidance, and mindfulness practices to help you achieve your fitness goals.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex gap-4 mt-6"
                >
                  <button className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors shadow-lg transform hover:-translate-y-1 hover:shadow-xl duration-200">
                    Start Learning
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Watch Preview
                  </button>
                </motion.div>
              </div>
              <div className="md:w-1/3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fitness" 
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="flex overflow-x-auto pb-2 gap-2 w-full md:w-auto hide-scrollbar">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setActiveCategory(category.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <motion.div 
            initial={{ opacity: 0, width: "90%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex-1"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search learn plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm"
            />
          </motion.div>
          
          {user.isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all shadow-md flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Create Plan
            </motion.button>
          )}
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredLearnPlans.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No learn plans found</h3>
          <p className="mt-1 text-gray-500">Try changing your search or filter criteria.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLearnPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              variants={cardVariants}
              className="h-full"
            >
              <LearnPlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto m-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div style={shapeStyle} className="w-10 h-10 flex items-center justify-center text-white rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Learn Plan</h2>
                </div>
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <AddLearnPlanForm onAddLearnPlan={handleAddLearnPlan} categories={categories.filter(c => c.id !== 'all')} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LearnPlanPage;
