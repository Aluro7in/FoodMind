import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Award, Target, Lightbulb, Globe, Zap, Heart } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: '75,000+', label: 'Happy Users', icon: <Users className="w-8 h-8" /> },
    { number: '15,000+', label: 'AI-Curated Recipes', icon: <Heart className="w-8 h-8" /> },
    { number: '2M+', label: 'Meals Planned', icon: <Target className="w-8 h-8" /> },
    { number: '35+', label: 'Countries Served', icon: <Globe className="w-8 h-8" /> }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'AI researcher and nutritionist with 15+ years of experience in personalized health solutions.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO & AI Lead',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former OpenAI engineer passionate about applying AI to health technology and nutrition science.'
    },
    {
      name: 'Chef Maria Rodriguez',
      role: 'Head of Culinary AI',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Michelin-starred chef specializing in AI-assisted recipe development and healthy cuisine.'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Head of Nutrition Research',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'PhD in Nutrition Science, leading our evidence-based AI nutrition recommendation engine.'
    }
  ];

  const values = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-First Approach',
      description: 'We leverage cutting-edge artificial intelligence to make personalized nutrition accessible and scientifically accurate.',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We continuously advance AI technology to revolutionize how people approach healthy eating and nutrition.',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'We believe in building a supportive AI-powered community where everyone can achieve their health goals.',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in AI accuracy, user experience, and evidence-based nutrition guidance.',
      color: 'from-green-400 to-teal-400'
    }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FoodMind
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're pioneering the future of nutrition with artificial intelligence. Discover how we're revolutionizing 
            the way people approach healthy eating through cutting-edge AI technology and evidence-based science.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white mb-16"
        >
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our AI-Powered Mission</h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              To democratize personalized nutrition through artificial intelligence, making evidence-based dietary 
              guidance accessible to everyone. We combine OpenAI's language models with advanced food recognition 
              technology to create an intelligent platform that adapts to your unique nutritional needs and preferences.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-purple-600">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our AI-Driven Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                FoodMind was born from a revolutionary idea: what if artificial intelligence could understand 
                nutrition as well as the world's best dietitians? Despite having access to more nutritional 
                information than ever before, people still struggle to make personalized, practical decisions about food.
              </p>
              <p>
                Founded in 2023 by a team of AI researchers, nutritionists, and culinary experts, FoodMind set out 
                to solve this challenge by creating an intelligent platform powered by OpenAI's advanced language 
                models and computer vision technology for food recognition.
              </p>
              <p>
                Today, we're proud to serve thousands of users worldwide with our AI-powered nutrition assistant, 
                helping them discover the science of healthy eating through personalized meal planning, intelligent 
                food analysis, and a supportive community of health-conscious individuals.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="AI-powered healthy meal preparation"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-gray-900">AI-Powered Nutrition Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FoodMind leverages state-of-the-art artificial intelligence to provide unparalleled nutrition guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">OpenAI Integration</h3>
              <p className="text-gray-600">
                Powered by GPT-4 for natural language understanding and personalized nutrition advice
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Computer Vision</h3>
              <p className="text-gray-600">
                PyTorch-based food recognition with FastAPI backend for real-time image analysis
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalization Engine</h3>
              <p className="text-gray-600">
                Machine learning algorithms that adapt to your preferences and nutritional goals
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 mb-4 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our AI-Driven Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the AI Nutrition Revolution</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to transform your relationship with food using artificial intelligence? Join thousands of users who have 
            already discovered the power of AI-driven healthy eating with FoodMind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Start Your AI Journey
            </a>
            <a
              href="/contact"
              className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;