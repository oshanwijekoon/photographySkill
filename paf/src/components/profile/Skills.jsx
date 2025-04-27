import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Skills({ skills: initialSkills = [] }) {
  // Default skills if none are provided
  const defaultSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 
    'AWS', 'UI/UX Design', 'GraphQL', 'REST API'
  ];
  
  const [skills, setSkills] = useState(initialSkills.length > 0 ? initialSkills : defaultSkills);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    setSkills([...skills, newSkill]);
    setNewSkill('');
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1 text-sm flex items-center gap-1 group-hover:pr-7">
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
        
        {!isAddingSkill && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsAddingSkill(true)}
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full p-1 text-sm flex items-center justify-center"
            title="Add skill"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isAddingSkill && (
          <motion.form 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleAddSkill}
            className="mt-4 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill..."
                className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={!newSkill.trim()}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !newSkill.trim() 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Add
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsAddingSkill(false);
                    setNewSkill('');
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Skills;
