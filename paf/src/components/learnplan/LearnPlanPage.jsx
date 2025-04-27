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
      title: "Wildlife Photography Fundamentals",
      category: "basics",
      description: "Master the essential techniques of wildlife photography, from camera settings to field techniques.",
      instructor: "Sarah Johnson",
      level: "Beginner",
      duration: "6 hours",
      thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 15,
      rating: 4.8
    },
    {
      id: "2",
      title: "Bird Photography Mastery",
      category: "specialized",
      description: "Learn specialized techniques for capturing birds in flight and their natural behaviors.",
      instructor: "Michael Chen",
      level: "Intermediate",
      duration: "5 hours",
      thumbnail: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 12,
      rating: 4.9
    },
    {
      id: "3",
      title: "Safari Photography Expedition",
      category: "advanced",
      description: "Advanced techniques for capturing wildlife during safaris, including tracking and safety measures.",
      instructor: "Emily Rodriguez",
      level: "Advanced",
      duration: "8 hours",
      thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      videos: 20,
      rating: 4.7
    },
    {
      id: "4",
      title: "Wildlife Photography Equipment",
      category: "gear",
      description: "Complete guide to selecting and using the right equipment for wildlife photography.",
      instructor: "David Kim",
      level: "Beginner",
      duration: "4 hours",
      thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
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
    { id: 'basics', name: 'Fundamentals', icon: '📸' },
    { id: 'specialized', name: 'Specialized', icon: '🦅' },
    { id: 'advanced', name: 'Advanced', icon: '🦁' },
    { id: 'gear', name: 'Equipment', icon: '🎥' },
    { id: 'editing', name: 'Post-Processing', icon: '🖼️' }
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
    <div className="pt-24 pb-8"> {/* Increased top padding for better spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added container wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-sm"
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
                <div className="h-64 bg-gray-300"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
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
    </div>
  );
}

export default LearnPlanPage;
