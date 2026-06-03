import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Award, Target, Plus, Apple, Coffee, Utensils } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for dashboard
  const nutritionData = [
    { name: 'Protein', value: 25, color: '#8B5CF6' },
    { name: 'Carbs', value: 45, color: '#EC4899' },
    { name: 'Fats', value: 30, color: '#06B6D4' }
  ];

  const weeklyProgress = [
    { day: 'Mon', calories: 1800, goal: 2000 },
    { day: 'Tue', calories: 2100, goal: 2000 },
    { day: 'Wed', calories: 1950, goal: 2000 },
    { day: 'Thu', calories: 2200, goal: 2000 },
    { day: 'Fri', calories: 1850, goal: 2000 },
    { day: 'Sat', calories: 2300, goal: 2000 },
    { day: 'Sun', calories: 1900, goal: 2000 }
  ];

  const todaysMeals = [
    { 
      id: 1, 
      type: 'Breakfast', 
      name: 'Avocado Toast with Eggs',
      calories: 420,
      time: '8:30 AM',
      icon: <Coffee className="w-5 h-5" />,
      color: 'from-orange-400 to-red-400'
    },
    { 
      id: 2, 
      type: 'Lunch', 
      name: 'Quinoa Buddha Bowl',
      calories: 650,
      time: '1:15 PM',
      icon: <Utensils className="w-5 h-5" />,
      color: 'from-green-400 to-teal-400'
    },
    { 
      id: 3, 
      type: 'Snack', 
      name: 'Greek Yogurt with Berries',
      calories: 180,
      time: '3:45 PM',
      icon: <Apple className="w-5 h-5" />,
      color: 'from-purple-400 to-pink-400'
    }
  ];

  const healthMetrics = [
    { label: 'Calories Today', value: '1,250', goal: '2,000', percentage: 62 },
    { label: 'Protein', value: '45g', goal: '80g', percentage: 56 },
    { label: 'Water', value: '6 cups', goal: '8 cups', percentage: 75 },
    { label: 'Steps', value: '8,542', goal: '10,000', percentage: 85 }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Here's your nutrition overview for today. You're doing great!
            </p>
          </motion.div>
        </div>

        {/* Date Selector */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.label}</h3>
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500">of {metric.goal}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.percentage}% of goal</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Nutrition Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Breakdown</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={nutritionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {nutritionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {nutritionData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calories" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="goal" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Today's Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Meals</h2>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Meal</span>
            </button>
          </div>

          <div className="space-y-4">
            {todaysMeals.map((meal) => (
              <div key={meal.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${meal.color} flex items-center justify-center text-white`}>
                  {meal.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                  <p className="text-sm text-gray-600">{meal.type} • {meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{meal.calories} cal</p>
                  <p className="text-sm text-gray-500">calories</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <span className="font-medium text-gray-900">View Progress</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl hover:from-green-100 hover:to-teal-100 transition-all duration-200">
              <Target className="w-6 h-6 text-green-500" />
              <span className="font-medium text-gray-900">Set Goals</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200">
              <Award className="w-6 h-6 text-purple-500" />
              <span className="font-medium text-gray-900">Achievements</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;