import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users, Star, Play } from 'lucide-react';

const Recipes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');

  const cuisines = [
    'all', 'italian', 'japanese', 'mexican', 'indian', 'thai', 'french', 'mediterranean'
  ];

  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const times = ['all', '15-min', '30-min', '60-min', '60-min+'];

  const recipes = [
    {
      id: 1,
      name: 'Mediterranean Quinoa Bowl',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'mediterranean',
      difficulty: 'easy',
      prepTime: '25 minutes',
      servings: 4,
      calories: 420,
      rating: 4.8,
      description: 'A nutritious and colorful bowl packed with quinoa, fresh vegetables, and tahini dressing.',
      isSpecial: true
    },
    {
      id: 2,
      name: 'Thai Green Curry',
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'thai',
      difficulty: 'medium',
      prepTime: '45 minutes',
      servings: 6,
      calories: 380,
      rating: 4.6,
      description: 'Aromatic Thai curry with coconut milk, vegetables, and fragrant herbs.'
    },
    {
      id: 3,
      name: 'Italian Margherita Pizza',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'italian',
      difficulty: 'medium',
      prepTime: '1 hour',
      servings: 2,
      calories: 650,
      rating: 4.9,
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.'
    },
    {
      id: 4,
      name: 'Japanese Salmon Teriyaki',
      image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'japanese',
      difficulty: 'easy',
      prepTime: '20 minutes',
      servings: 2,
      calories: 450,
      rating: 4.7,
      description: 'Glazed salmon with homemade teriyaki sauce, served with steamed vegetables.'
    },
    {
      id: 5,
      name: 'Mexican Black Bean Tacos',
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'mexican',
      difficulty: 'easy',
      prepTime: '15 minutes',
      servings: 4,
      calories: 320,
      rating: 4.5,
      description: 'Healthy tacos with seasoned black beans, fresh salsa, and avocado.'
    },
    {
      id: 6,
      name: 'Indian Chickpea Curry',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
      cuisine: 'indian',
      difficulty: 'medium',
      prepTime: '40 minutes',
      servings: 6,
      calories: 380,
      rating: 4.8,
      description: 'Rich and flavorful curry with chickpeas, tomatoes, and aromatic spices.'
    }
  ];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesTime = selectedTime === 'all' || 
      (selectedTime === '15-min' && parseInt(recipe.prepTime) <= 15) ||
      (selectedTime === '30-min' && parseInt(recipe.prepTime) <= 30) ||
      (selectedTime === '60-min' && parseInt(recipe.prepTime) <= 60) ||
      (selectedTime === '60-min+' && parseInt(recipe.prepTime) > 60);
    
    return matchesSearch && matchesCuisine && matchesDifficulty && matchesTime;
  });

  const todaysSpecial = recipes.find(recipe => recipe.isSpecial);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Delicious Recipes
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore our collection of healthy, delicious recipes from around the world.
            Find your next favorite meal with detailed nutritional information and video tutorials.
          </p>
        </motion.div>

        {/* Today's Special */}
        {todaysSpecial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6 fill-current" />
                <h2 className="text-2xl font-bold">Today's Special</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">{todaysSpecial.name}</h3>
                  <p className="text-lg mb-6 opacity-90">{todaysSpecial.description}</p>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{todaysSpecial.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>{todaysSpecial.servings} servings</span>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-full">
                      <span className="font-semibold">{todaysSpecial.calories} cal</span>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      to={`/recipes/${todaysSpecial.id}`}
                      className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
                    >
                      View Recipe
                    </Link>
                    <button className="flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200">
                      <Play className="w-5 h-5" />
                      <span>Watch Video</span>
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src={todaysSpecial.image}
                    alt={todaysSpecial.name}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes..."
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

              {/* Time Filter */}
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {times.map(time => (
                  <option key={time} value={time}>
                    {time === 'all' ? 'Any Time' : time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900">{recipe.calories} cal</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 text-center"
                  >
                    View Recipe
                  </Link>
                  <button className="flex items-center justify-center w-12 h-10 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-all duration-200">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No recipes found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;