import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import PhotoGrid from './PhotoGrid';
import PhotoDetail from './PhotoDetail';

function DiscoverPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Amazing Wildlife</h1>
          <div className="max-w-2xl relative">
            <input
              type="text"
              placeholder="Search wildlife photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/60" />
          </div>
        </div>
      </div>

      {selectedPhoto ? (
        <PhotoDetail photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      ) : (
        <PhotoGrid onPhotoSelect={setSelectedPhoto} searchQuery={searchQuery} />
      )}
    </div>
  );
}

export default DiscoverPage;
