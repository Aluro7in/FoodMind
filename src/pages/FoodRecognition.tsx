import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Zap, TrendingUp, Award, BarChart3, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { foodRecognitionAPI } from '../services/api';

const FoodRecognition: React.FC = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    class_name: string;
    confidence: number;
    nutrition?: any;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [usageStats, setUsageStats] = useState({
    totalPredictions: 0,
    todayPredictions: 0,
    averageConfidence: 0,
    topFoods: []
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load usage stats on component mount
  useEffect(() => {
    loadUsageStats();
  }, []);

  const loadUsageStats = async () => {
    try {
      const response = await foodRecognitionAPI.getStats();
      setUsageStats(response.data);
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPredictionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const analyzeImage = async () => {
    if (!selectedImage || !fileInputRef.current?.files?.[0]) return;

    setIsAnalyzing(true);
    
    try {
      const file = fileInputRef.current.files[0];
      const response = await foodRecognitionAPI.analyzeImage(file);
      
      setPredictionResult(response.data);
      
      // Update usage stats
      setUsageStats(prev => ({
        ...prev,
        totalPredictions: prev.totalPredictions + 1,
        todayPredictions: prev.todayPredictions + 1
      }));
      
      // Reload stats from server
      loadUsageStats();
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPredictionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Food <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Recognition
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload or capture a photo of your food to get instant nutritional information and analysis
            powered by advanced computer vision and AI technology.
          </p>
          
          {/* Subscription Status */}
          <div className="flex justify-center mb-6">
            {user?.subscriptionTier === 'premium' || user?.subscriptionTier === 'professional' ? (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span className="font-medium">Pro Subscriber - Unlimited Scans</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Free Tier - Limited Features</span>
                <a
                  href="/subscription"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  Upgrade to Pro
                </a>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Food Recognition Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Camera className="w-6 h-6 text-purple-500 mr-2" />
                AI Food Analysis
              </h2>
              
              {!selectedImage ? (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Upload or Capture Food Image
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Take a photo or upload an image to get instant AI-powered food recognition and nutritional analysis
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleCameraCapture}
                          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                        >
                          <Camera className="w-5 h-5" />
                          <span>Take Photo</span>
                        </button>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center space-x-2 border-2 border-purple-500 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all duration-200"
                        >
                          <Upload className="w-5 h-5" />
                          <span>Upload Image</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Food to analyze"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  {predictionResult ? (
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">AI Analysis Complete!</h3>
                          <p className="text-gray-600">Here's what our AI found in your image</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-lg font-semibold text-gray-900">{predictionResult.class_name}</p>
                          <p className="text-gray-600 text-sm">Identified Food</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-green-600">{predictionResult.confidence}%</p>
                          <p className="text-gray-600 text-sm">Confidence</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {predictionResult.nutrition?.calories || 'N/A'}
                          </p>
                          <p className="text-gray-600 text-sm">Calories</p>
                        </div>
                      </div>
                      
                      {predictionResult.nutrition && (
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3">Nutritional Information</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Protein:</span>
                              <span className="font-medium ml-1">{predictionResult.nutrition.protein}g</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Carbs:</span>
                              <span className="font-medium ml-1">{predictionResult.nutrition.carbs}g</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Fat:</span>
                              <span className="font-medium ml-1">{predictionResult.nutrition.fat}g</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Fiber:</span>
                              <span className="font-medium ml-1">{predictionResult.nutrition.fiber}g</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>AI Analyzing Image...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Analyze with AI</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </motion.div>
          </div>

          {/* Sidebar with Stats */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 text-purple-500 mr-2" />
                Usage Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Total Predictions</p>
                  <p className="text-2xl font-bold text-purple-600">{usageStats.totalPredictions}</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Today's Predictions</p>
                  <p className="text-2xl font-bold text-blue-600">{usageStats.todayPredictions}</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Average Accuracy</p>
                  <p className="text-2xl font-bold text-green-600">{usageStats.averageConfidence}%</p>
                </div>
              </div>
            </motion.div>

            {/* Top Predicted Foods */}
            {usageStats.topFoods.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                  Top Foods
                </h3>
                
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={usageStats.topFoods} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={60} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* AI Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="w-6 h-6 text-purple-500 mr-2" />
                AI Recognition Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Ensure good lighting when taking photos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Center the food item in the frame</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Avoid cluttered backgrounds</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use high-resolution images for best accuracy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>AI works best with single food items</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodRecognition;