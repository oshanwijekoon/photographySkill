import { motion } from 'framer-motion';

function PhotoGrid({ onPhotoSelect, searchQuery }) {
  const photos = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
      title: "Peacock Feather",
      photographer: "John Doe",
      likes: 1234,
      comments: 89,
      description: "A stunning close-up of a peacock feather showcasing its iridescent colors"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
      title: "Lion King",
      photographer: "Sarah Smith",
      likes: 2156,
      comments: 142,
      description: "Majestic lion photographed during sunset in the African savanna"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/567540/pexels-photo-567540.jpeg",
      title: "Arctic Fox",
      photographer: "Mike Wilson",
      likes: 1879,
      comments: 95,
      description: "Beautiful white arctic fox in its natural snowy habitat"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg",
      title: "Colorful Macaw",
      photographer: "Emma Davis",
      likes: 2453,
      comments: 167,
      description: "Close-up of a vibrant macaw parrot showing its colorful feathers"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg",
      title: "Tiger Reflection",
      photographer: "Alex Chen",
      likes: 3421,
      comments: 234,
      description: "Bengal tiger drinking water with perfect reflection in the lake"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      title: "Jumping Dolphin",
      photographer: "Maria Rodriguez",
      likes: 1987,
      comments: 156,
      description: "Bottlenose dolphin leaping out of the ocean at sunset"
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg",
      title: "Curious Red Panda",
      photographer: "Tom Anderson",
      likes: 2765,
      comments: 189,
      description: "Adorable red panda climbing on a tree branch"
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/735423/pexels-photo-735423.jpeg",
      title: "Elephant Family",
      photographer: "Lisa Wong",
      likes: 3198,
      comments: 245,
      description: "A touching moment between elephant mother and baby"
    }
  ];

  const filteredPhotos = photos.filter(photo => 
    photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photo.photographer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map(photo => (
          <motion.div
            key={photo.id}
            whileHover={{ y: -5 }}
            onClick={() => onPhotoSelect(photo)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg aspect-square">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold">{photo.title}</h3>
                  <p className="text-sm">by {photo.photographer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGrid;
