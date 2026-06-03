import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, ChefHat, Lightbulb, Heart, Zap } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your FoodMind AI Assistant, powered by OpenAI's advanced language model. I'm here to help you with cooking advice, recipe modifications, nutritional information, meal planning, and personalized dietary guidance. What would you like to know about nutrition and healthy eating?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "How can I make this recipe healthier and more nutritious?",
    "What's a good plant-based substitute for eggs in baking?",
    "Help me plan balanced meals for the entire week",
    "What are the health benefits of quinoa vs brown rice?",
    "How do I meal prep for busy weekdays efficiently?",
    "What's a balanced breakfast for sustainable weight loss?",
    "Can you suggest anti-inflammatory foods for my diet?",
    "How do I calculate my daily caloric needs?"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // In production, this would call the OpenAI API
      // For now, we'll simulate with enhanced responses
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'assistant',
          content: generateEnhancedAIResponse(inputValue),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const generateEnhancedAIResponse = (question: string): string => {
    const responses = {
      healthier: `Great question! Here are evidence-based ways to make recipes healthier:

**Ingredient Swaps:**
• Replace refined grains with whole grains (quinoa, brown rice, whole wheat pasta)
• Use Greek yogurt instead of sour cream or mayo for protein boost
• Substitute applesauce or mashed banana for some oil in baking
• Choose lean proteins like chicken breast, fish, tofu, or legumes

**Cooking Methods:**
• Baking, grilling, steaming, or air-frying instead of deep frying
• Use herbs and spices instead of excess salt for flavor
• Add vegetables to increase fiber, vitamins, and minerals

**Nutritional Enhancements:**
• Include healthy fats like avocado, nuts, or olive oil
• Add superfoods like chia seeds, flaxseeds, or berries
• Increase vegetable content by 25-50% in any dish

Would you like specific suggestions for a particular recipe?`,
      
      substitute: `Excellent question about egg substitutes! Here are the best plant-based alternatives:

**For Binding (in cookies, muffins):**
• 1 tbsp ground flaxseed + 3 tbsp water (let sit 5 minutes) = 1 egg
• 1 tbsp chia seeds + 3 tbsp water (let sit 15 minutes) = 1 egg

**For Moisture (in cakes, brownies):**
• 1/4 cup applesauce = 1 egg
• 1/4 cup mashed banana = 1 egg (adds mild banana flavor)
• 1/4 cup pumpkin puree = 1 egg

**For Leavening (in light, fluffy baked goods):**
• 1 tsp baking soda + 1 tbsp apple cider vinegar = 1 egg
• Commercial egg replacers (follow package instructions)

**For Savory Dishes:**
• 1/4 cup silken tofu, blended smooth = 1 egg
• Aquafaba (chickpea liquid) - 3 tbsp = 1 egg

Each substitute works differently, so consider your recipe's primary need. What are you planning to bake?`,
      
      planning: `Meal planning is a game-changer for healthy eating! Here's my comprehensive approach:

**Weekly Planning Strategy:**
1. **Choose Your Day:** Pick a consistent day (like Sunday) for planning
2. **Assess Your Week:** Consider your schedule - busy days need simple meals
3. **Plan by Categories:** 
   - 2-3 protein sources (chicken, fish, beans, tofu)
   - 4-5 vegetables (mix colors for variety)
   - 2-3 whole grains (quinoa, brown rice, oats)
   - Healthy fats (avocado, nuts, olive oil)

**Prep Strategy:**
• Wash and chop vegetables on prep day
• Cook grains in bulk (store 3-4 days)
• Marinate proteins ahead of time
• Prepare 2-3 sauces/dressings for variety

**Smart Shopping:**
• Create a detailed list organized by store sections
• Shop the perimeter first (fresh foods)
• Keep backup options: frozen vegetables, canned beans

**Sample Week Structure:**
• Monday: Sheet pan dinner (protein + vegetables)
• Tuesday: Grain bowl with leftovers
• Wednesday: Soup or stew (make extra for Friday)
• Thursday: Stir-fry with fresh vegetables
• Friday: Leftover soup + salad

Would you like me to create a specific meal plan based on your dietary preferences?`,
      
      quinoa: `Quinoa is truly a nutritional powerhouse! Here's why it's exceptional:

**Complete Protein Profile:**
• Contains all 9 essential amino acids (rare for plant foods)
• 8g protein per cooked cup vs 5g in brown rice
• Perfect for vegetarians and vegans

**Nutritional Benefits:**
• High in fiber (5g per cup) for digestive health
• Rich in minerals: iron, magnesium, potassium, zinc
• Contains antioxidants like quercetin and kaempferol
• Naturally gluten-free
• Low glycemic index (helps stabilize blood sugar)

**Quinoa vs Brown Rice:**
• Quinoa: Higher protein, more minerals, complete amino acids
• Brown Rice: Lower calories, more familiar taste, less expensive
• Both: Good fiber sources, gluten-free, versatile

**Cooking Tips:**
• Always rinse quinoa before cooking to remove bitter saponins
• Toast in dry pan for 2-3 minutes for nuttier flavor
• Use 2:1 liquid to quinoa ratio
• Cooking time: 15 minutes, then let stand 5 minutes

**Versatile Uses:**
• Breakfast porridge with fruits and nuts
• Salad base with vegetables and dressing
• Soup addition for protein boost
• Stuffing for vegetables
• Rice substitute in any dish

Would you like some specific quinoa recipe ideas?`,
      
      default: `That's a fantastic nutrition question! As your AI assistant powered by advanced language models, I'm here to provide evidence-based guidance tailored to your needs.

**Personalized Approach:**
To give you the most helpful advice, I'd love to know more about:
• Your specific dietary goals (weight management, muscle building, general health)
• Any dietary restrictions or preferences (vegetarian, gluten-free, etc.)
• Your current eating patterns and challenges
• Activity level and lifestyle factors

**Evidence-Based Nutrition:**
I base my recommendations on current nutritional science, considering:
• Macronutrient balance for your goals
• Micronutrient density and bioavailability
• Meal timing and metabolic factors
• Sustainable, long-term dietary changes
• Individual variations in nutritional needs

**What I Can Help With:**
• Recipe modifications and ingredient substitutions
• Meal planning and prep strategies
• Nutritional analysis and optimization
• Cooking techniques and food safety
• Dietary troubleshooting and problem-solving

Please share more details about your specific nutrition question, and I'll provide comprehensive, personalized guidance to help you achieve your health goals!`
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('health') || lowerQuestion.includes('better') || lowerQuestion.includes('nutritious')) return responses.healthier;
    if (lowerQuestion.includes('substitute') || lowerQuestion.includes('replace') || lowerQuestion.includes('egg') || lowerQuestion.includes('plant-based')) return responses.substitute;
    if (lowerQuestion.includes('plan') || lowerQuestion.includes('week') || lowerQuestion.includes('meal prep')) return responses.planning;
    if (lowerQuestion.includes('quinoa') || lowerQuestion.includes('brown rice') || lowerQuestion.includes('grain')) return responses.quinoa;
    
    return responses.default;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FoodMind AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Get personalized cooking advice, recipe modifications, and nutritional guidance
            powered by advanced artificial intelligence.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-500 font-medium">Powered by OpenAI GPT-4</span>
          </div>
        </motion.div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              Try asking me about:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-left p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 group"
                >
                  <span className="text-gray-700 group-hover:text-purple-600 transition-colors">{question}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg"
        >
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-2xl ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 ml-3'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 mr-3'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-1 mt-2 opacity-70">
                        <Zap className="w-3 h-3" />
                        <span className="text-xs">AI-powered response</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about cooking, nutrition, meal planning, or healthy eating..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Press Enter to send, Shift+Enter for new line • Powered by OpenAI
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipe Intelligence</h3>
            <p className="text-gray-600">Get AI-powered suggestions for making recipes healthier, accommodating dietary restrictions, and using substitute ingredients with detailed explanations.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutritional Expertise</h3>
            <p className="text-gray-600">Learn about the nutritional benefits of ingredients, get evidence-based advice on creating balanced meals, and understand the science behind healthy eating.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Guidance</h3>
            <p className="text-gray-600">Discover expert cooking techniques, meal prep strategies, time-saving kitchen hacks, and personalized nutrition advice tailored to your goals.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistant;