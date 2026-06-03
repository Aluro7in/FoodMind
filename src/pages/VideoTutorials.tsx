import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Filter, Search, Star } from 'lucide-react';

const VideoTutorials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const cuisines = ['all', 'italian', 'japanese', 'mexican', 'indian', 'thai', 'french'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const tutorials = [
    {
      id: 1,
      title: 'Perfect Pasta Carbonara',
      description: 'Learn the authentic Italian technique for creamy carbonara without cream',
      thumbnail: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:45',
      difficulty: 'intermediate',
      cuisine: 'italian',
      views: '2.3M',
      rating: 4.9,
      chef: 'Chef Marco',
      videoUrl: 'https://www.youtube.com/watch?v=example1'
    },
    {
      id: 2,
      title: 'Sushi Rolling Masterclass',
      description: 'Master the art of sushi making with professional techniques',
      thumbnail: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '18:30',
      difficulty: 'advanced',
      cuisine: 'japanese',
      views: '1.8M',
      rating: 4.8,
      chef: 'Chef Tanaka',
      videoUrl: 'https://www.youtube.com/watch?v=example2'
    },
    {
      id: 3,
      title: 'Authentic Tacos al Pastor',
      description: 'Traditional Mexican street tacos with homemade marinade',
      thumbnail: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:20',
      difficulty: 'intermediate',
      cuisine: 'mexican',
      views: '1.5M',
      rating: 4.7,
      chef: 'Chef Rodriguez',
      videoUrl: 'https://www.youtube.com/watch?v=example3'
    },
    {
      id: 4,
      title: 'Butter Chicken from Scratch',
      description: 'Rich and creamy Indian curry with aromatic spices',
      thumbnail: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '22:15',
      difficulty: 'intermediate',
      cuisine: 'indian',
      views: '3.1M',
      rating: 4.9,
      chef: 'Chef Patel',
      videoUrl: 'https://www.youtube.com/watch?v=example4'
    },
    {
      id: 5,
      title: 'Thai Green Curry',
      description: 'Fragrant and spicy curry with fresh herbs and coconut milk',
      thumbnail: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '16:40',
      difficulty: 'beginner',
      cuisine: 'thai',
      views: '980K',
      rating: 4.6,
      chef: 'Chef Siriporn',
      videoUrl: 'https://www.youtube.com/watch?v=example5'
    },
    {
      id: 6,
      title: 'Classic French Omelette',
      description: 'Perfect technique for silky, restaurant-quality omelettes',
      thumbnail: 'https://images.pexels.com/photos/824635/pexels-photo-824635.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8:25',
      difficulty: 'beginner',
      cuisine: 'french',
      views: '1.2M',
      rating: 4.8,
      chef: 'Chef Dubois',
      videoUrl: 'https://www.youtube.com/watch?v=example6'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || tutorial.cuisine === selectedCuisine;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  const featuredTutorial = tutorials[0];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Video <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from professional chefs with step-by-step video tutorials.
            Master new techniques and create restaurant-quality dishes at home.
          </p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-lg font-semibold">Featured Tutorial</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{featuredTutorial.title}</h2>
                <p className="text-lg mb-6 opacity-90">{featuredTutorial.description}</p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{featuredTutorial.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>{featuredTutorial.views} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span>{featuredTutorial.rating}</span>
                  </div>
                </div>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Now</span>
                </button>
              </div>
              <div className="relative">
                <img
                  src={featuredTutorial.thumbnail}
                  alt={featuredTutorial.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Cuisine Filter */}
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                  </option>
                ))}
              </select>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {tutorial.duration}
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tutorial.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    tutorial.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{tutorial.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">by {tutorial.chef}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-sm text-gray-600">{tutorial.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{tutorial.views} views</span>
                  <span className="capitalize">{tutorial.cuisine}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Watch Tutorial</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No tutorials found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTutorials;