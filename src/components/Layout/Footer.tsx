import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Instagram, Youtube, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FoodMind
              </span>
            </div>
            <p className="text-gray-600">
              Your intelligent meal planning and nutrition companion powered by AI for a healthier lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-600 hover:text-purple-600 transition-colors">Recipes</Link></li>
              <li><Link to="/ai-assistant" className="text-gray-600 hover:text-purple-600 transition-colors">AI Assistant</Link></li>
              <li><Link to="/food-recognition" className="text-gray-600 hover:text-purple-600 transition-colors">Food Recognition</Link></li>
              <li><Link to="/tutorials" className="text-gray-600 hover:text-purple-600 transition-colors">Video Tutorials</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</Link></li>
              <li><Link to="/subscription" className="text-gray-600 hover:text-purple-600 transition-colors">Subscription</Link></li>
              <li><Link to="/ads" className="text-gray-600 hover:text-purple-600 transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 text-sm">
              Get the latest recipes and nutrition tips delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 FoodMind. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;