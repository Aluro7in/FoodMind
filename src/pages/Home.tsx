import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Brain, Camera, Video, Users, Award, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <ChefHat className="w-8 h-8" />,
      title: "Smart Meal Planning",
      description: "AI-powered meal suggestions tailored to your dietary preferences and health goals.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Assistant",
      description: "Get personalized cooking advice and nutritional guidance from our OpenAI-powered chef.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Food Recognition",
      description: "Scan your meals to instantly get nutritional information and AI-powered analysis.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Tutorials",
      description: "Learn new recipes with step-by-step video guides from expert chefs worldwide.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Healthy Recipes" },
    { number: "75,000+", label: "Happy Users" },
    { number: "2M+", label: "Meals Planned" },
    { number: "99%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  FoodMind
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto">
                Your intelligent companion for meal planning, nutrition tracking, and healthy living powered by advanced AI technology.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-500 font-medium">Powered by OpenAI & FastAPI</span>
              </div>
              {user && (
                <p className="text-lg text-purple-600 mb-8 font-medium">
                  Welcome back, {user.name}! Ready to continue your healthy journey?
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center group"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center group"
                    >
                      Start Your AI Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/recipes"
                      className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-200"
                    >
                      Explore Recipes
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Features for Healthy Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover powerful AI features designed to make meal planning effortless and nutrition tracking enjoyable with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced AI Technology
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                FoodMind leverages state-of-the-art artificial intelligence to provide personalized nutrition guidance, 
                food recognition, and meal planning that adapts to your unique needs and preferences.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">OpenAI-powered conversational AI assistant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">FastAPI backend with PyTorch food recognition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Real-time nutritional analysis and recommendations</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <span className="text-lg font-semibold text-gray-900">AI Assistant Demo</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">User:</p>
                    <p className="text-gray-800">"What's a healthy breakfast for weight loss?"</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                    <p className="text-sm text-purple-600 mb-2">FoodMind AI:</p>
                    <p className="text-gray-800">"I recommend a protein-rich breakfast like Greek yogurt with berries and nuts. This combination provides sustained energy, helps control hunger, and supports your weight loss goals..."</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Health Enthusiasts Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join our growing community of AI-powered healthy living
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Health with AI?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start your journey to better nutrition and wellness today with FoodMind's intelligent features powered by cutting-edge AI technology.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
                >
                  Start Free AI Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/subscription"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  View AI Plans
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;