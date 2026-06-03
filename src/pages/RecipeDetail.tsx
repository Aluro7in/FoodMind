import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Heart, Share2, Play, ArrowLeft, ChefHat } from 'lucide-react';

const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('ingredients');
  
  // Mock recipe data - in production, this would come from an API
  const recipe = {
    id: 1,
    name: 'Mediterranean Quinoa Bowl',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A nutritious and colorful bowl packed with quinoa, fresh vegetables, and tahini dressing. This recipe is perfect for a healthy lunch or dinner and provides all the essential nutrients your body needs.',
    prepTime: '25 minutes',
    cookTime: '15 minutes',
    totalTime: '40 minutes',
    servings: 4,
    difficulty: 'Easy',
    calories: 420,
    rating: 4.8,
    reviewCount: 234,
    cuisine: 'Mediterranean',
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'High Protein'],
    ingredients: [
      { name: 'Quinoa', amount: '1 cup', calories: 222 },
      { name: 'Cherry tomatoes', amount: '2 cups', calories: 60 },
      { name: 'Cucumber', amount: '1 large', calories: 16 },
      { name: 'Red onion', amount: '1/2 medium', calories: 20 },
      { name: 'Kalamata olives', amount: '1/2 cup', calories: 80 },
      { name: 'Feta cheese', amount: '1/2 cup', calories: 100 },
      { name: 'Fresh parsley', amount: '1/4 cup', calories: 5 },
      { name: 'Lemon juice', amount: '3 tbsp', calories: 10 },
      { name: 'Olive oil', amount: '3 tbsp', calories: 120 },
      { name: 'Tahini', amount: '2 tbsp', calories: 120 }
    ],
    instructions: [
      'Rinse quinoa under cold water. In a medium saucepan, bring 2 cups water to boil.',
      'Add quinoa, reduce heat to low, cover and simmer for 15 minutes until water is absorbed.',
      'Remove from heat and let stand 5 minutes. Fluff with a fork and let cool completely.',
      'While quinoa cooks, prepare vegetables: dice cucumber, halve cherry tomatoes, and thinly slice red onion.',
      'In a small bowl, whisk together lemon juice, olive oil, and tahini until smooth.',
      'In a large bowl, combine cooled quinoa, vegetables, olives, and feta cheese.',
      'Pour dressing over quinoa mixture and toss gently to combine.',
      'Garnish with fresh parsley and serve immediately or chill for later.',
    ],
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 48,
      fat: 18,
      fiber: 6,
      sugar: 8,
      sodium: 380
    },
    tips: [
      'For extra flavor, toast the quinoa in a dry pan for 2-3 minutes before cooking.',
      'This bowl can be made ahead and stored in the refrigerator for up to 3 days.',
      'Feel free to substitute any vegetables based on your preferences or what you have on hand.',
      'For a vegan version, simply omit the feta cheese or use a plant-based alternative.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example'
  };

  const tabs = [
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'instructions', label: 'Instructions' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'tips', label: 'Tips' }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/recipes"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Recipes</span>
          </Link>
        </motion.div>

        {/* Recipe Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                {recipe.dietaryTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-current text-yellow-400" />
                  <span className="font-medium">{recipe.rating}</span>
                  <span className="text-white/80">({recipe.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ChefHat className="w-5 h-5" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 text-lg mb-6">{recipe.description}</p>

            {/* Recipe Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Prep Time</p>
                <p className="font-semibold text-gray-900">{recipe.prepTime}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Time</p>
                <p className="font-semibold text-gray-900">{recipe.totalTime}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Servings</p>
                <p className="font-semibold text-gray-900">{recipe.servings}</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-xl">
                <span className="text-2xl">🔥</span>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="font-semibold text-gray-900">{recipe.calories}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </button>
              <button className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-purple-500 hover:text-purple-500 transition-all duration-200">
                <Heart className="w-5 h-5" />
                <span>Save Recipe</span>
              </button>
              <button className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-purple-500 hover:text-purple-500 transition-all duration-200">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-all duration-200`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{ingredient.name}</span>
                        <span className="text-gray-600 ml-2">{ingredient.amount}</span>
                      </div>
                      <span className="text-sm text-gray-500">{ingredient.calories} cal</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions Tab */}
            {activeTab === 'instructions' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition Tab */}
            {activeTab === 'nutrition' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{recipe.nutrition.calories}</p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600">{recipe.nutrition.protein}g</p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">{recipe.nutrition.carbs}g</p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <p className="text-2xl font-bold text-orange-600">{recipe.nutrition.fat}g</p>
                    <p className="text-sm text-gray-600">Fat</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-lg font-semibold text-gray-900">{recipe.nutrition.fiber}g</p>
                    <p className="text-sm text-gray-600">Fiber</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-lg font-semibold text-gray-900">{recipe.nutrition.sugar}g</p>
                    <p className="text-sm text-gray-600">Sugar</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-lg font-semibold text-gray-900">{recipe.nutrition.sodium}mg</p>
                    <p className="text-sm text-gray-600">Sodium</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cooking Tips</h3>
                <div className="space-y-4">
                  {recipe.tips.map((tip, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        💡
                      </div>
                      <p className="text-gray-700 flex-1">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;