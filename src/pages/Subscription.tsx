import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Heart, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium' | 'professional'>('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started with healthy eating',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-gray-400 to-gray-500',
      features: [
        'Access to 100+ basic recipes',
        'Basic nutritional information',
        'Simple meal tracking',
        'Community access',
        '5 AI assistant queries per day',
        '3 food recognition scans per day'
      ],
      limitations: [
        'Limited recipe collection',
        'Basic nutrition data only',
        'No video tutorials',
        'No meal planning tools'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      period: 'month',
      description: 'Ideal for serious health enthusiasts',
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Access to 1000+ premium recipes',
        'Detailed nutritional analysis',
        'Advanced meal planning tools',
        'Video tutorials for all recipes',
        'Unlimited AI assistant queries',
        'Unlimited food recognition',
        'Personalized recommendations',
        'Export meal plans & shopping lists',
        'Priority customer support'
      ],
      limitations: []
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 19.99,
      period: 'month',
      description: 'For nutritionists and food professionals',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      features: [
        'Everything in Premium',
        'Advanced analytics dashboard',
        'Client management tools',
        'Custom recipe creation',
        'Bulk meal planning',
        'API access for integrations',
        'White-label options',
        'Advanced reporting',
        'Dedicated account manager',
        'Custom branding options'
      ],
      limitations: []
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Coach',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'MealMind has transformed how I plan meals for my clients. The AI recommendations are spot-on!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Home Cook',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'The food recognition feature is incredible. I can track my nutrition effortlessly now.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Nutritionist',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'As a professional, the analytics and client tools are exactly what I needed. Highly recommended!',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay for your convenience.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Absolutely! You can change your plan at any time from your account settings. Changes take effect immediately.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee if you\'re not completely satisfied with your subscription.'
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would integrate with Stripe
      console.log(`Subscribing to ${planId} plan`);
      
      // Show success message
      alert(`Successfully subscribed to ${planId} plan!`);
      
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
            Choose Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of MealMind with our flexible subscription plans.
            Start your journey to better health today.
          </p>
        </motion.div>

        {/* Current Subscription Status */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-12"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                <p className="text-gray-600">
                  You're currently on the <span className="font-medium capitalize">{user.subscriptionTier}</span> plan
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-600">/{plan.period}</span>}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400">×</span>
                    <span className="text-gray-500 line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isProcessing || (user?.subscriptionTier === plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  user?.subscriptionTier === plan.id
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                    <span>Processing...</span>
                  </div>
                ) : user?.subscriptionTier === plan.id ? (
                  'Current Plan'
                ) : plan.price === 0 ? (
                  'Get Started Free'
                ) : (
                  `Start ${plan.name} Plan`
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-start">
                  <MessageCircle className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;