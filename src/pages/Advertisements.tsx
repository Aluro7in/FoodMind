import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp, Award, Mail, Phone } from 'lucide-react';

const Advertisements: React.FC = () => {
  const partnerships = [
    {
      id: 1,
      company: 'Organic Valley',
      logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Premium organic ingredients for healthy cooking',
      category: 'Food & Ingredients',
      featured: true
    },
    {
      id: 2,
      company: 'FitLife Equipment',
      logo: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Professional kitchen tools and fitness equipment',
      category: 'Kitchen & Fitness'
    },
    {
      id: 3,
      company: 'Green Supplements',
      logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Natural vitamins and nutritional supplements',
      category: 'Health & Wellness'
    },
    {
      id: 4,
      company: 'EcoKitchen',
      logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Sustainable kitchen appliances and cookware',
      category: 'Kitchen & Home'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Monthly Active Users', icon: <Users className="w-6 h-6" /> },
    { number: '2.5M+', label: 'Monthly Page Views', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '85%', label: 'User Engagement Rate', icon: <Star className="w-6 h-6" /> },
    { number: '4.8/5', label: 'Average User Rating', icon: <Award className="w-6 h-6" /> }
  ];

  const adFormats = [
    {
      name: 'Banner Ads',
      description: 'Prominent placement on our homepage and recipe pages',
      price: '$500/month',
      features: ['Prime visibility', 'Click tracking', 'Performance analytics']
    },
    {
      name: 'Sponsored Recipes',
      description: 'Feature your products in our curated recipe content',
      price: '$1,000/month',
      features: ['Recipe integration', 'Video tutorials', 'Shopping links']
    },
    {
      name: 'Newsletter Sponsorship',
      description: 'Reach our engaged subscriber base directly',
      price: '$750/month',
      features: ['50,000+ subscribers', 'Dedicated section', 'Custom content']
    },
    {
      name: 'Custom Partnership',
      description: 'Tailored advertising solutions for your brand',
      price: 'Contact us',
      features: ['Flexible terms', 'Custom integration', 'Dedicated support']
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Brand <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Partnerships
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with MealMind to reach health-conscious consumers who are passionate about 
            nutrition, wellness, and healthy living. Join our community of trusted brands.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-600">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Current Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Trusted Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((partner, index) => (
              <div
                key={partner.id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  partner.featured ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {partner.featured && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                    Featured Partner
                  </div>
                )}
                <img
                  src={partner.logo}
                  alt={partner.company}
                  className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{partner.company}</h3>
                <p className="text-gray-600 text-center mb-3">{partner.description}</p>
                <div className="text-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {partner.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advertising Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Advertising Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adFormats.map((format, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{format.name}</h3>
                <p className="text-gray-600 mb-4">{format.description}</p>
                <div className="text-2xl font-bold text-purple-600 mb-4">{format.price}</div>
                <ul className="space-y-2">
                  {format.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Partner With Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Partner With MealMind?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Reach a highly engaged audience of health-conscious consumers who trust our recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Targeted Audience</h3>
              <p className="opacity-90">
                Reach users actively seeking healthy lifestyle products and services
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Platform</h3>
              <p className="opacity-90">
                Join us as we continue to expand our user base and market reach
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Brand</h3>
              <p className="opacity-90">
                Associate your brand with a trusted name in health and nutrition
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Partner With Us?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can create a custom partnership that drives results for your brand
            and provides value to our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Email Us</p>
                <p className="text-gray-600">partnerships@mealmind.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Call Us</p>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <a
              href="/contact"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 inline-block"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Advertisements;