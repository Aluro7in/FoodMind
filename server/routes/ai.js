import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

// AI Assistant endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Prepare conversation context
    const messages = [
      {
        role: 'system',
        content: `You are FoodMind AI, an expert nutrition and cooking assistant. You provide evidence-based advice on:
        - Healthy recipe modifications and ingredient substitutions
        - Nutritional analysis and meal planning
        - Cooking techniques and food safety
        - Dietary guidance for various health goals
        - Personalized nutrition recommendations
        
        Always provide detailed, helpful responses with practical tips. Focus on health, nutrition science, and sustainable eating habits.`
      },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      model: 'gpt-3.5-turbo',
      powered_by: 'OpenAI'
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponse = generateFallbackResponse(req.body.message);
    
    res.json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      model: 'fallback',
      powered_by: 'FoodMind AI',
      note: 'Using fallback AI due to API limitations'
    });
  }
});

// Fallback AI responses
function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
    return `I'd be happy to help with cooking! Here are some general tips:

**For Healthier Recipes:**
• Replace refined grains with whole grains (quinoa, brown rice)
• Use Greek yogurt instead of sour cream for protein
• Add vegetables to increase fiber and nutrients
• Choose lean proteins and healthy cooking methods

**Cooking Tips:**
• Meal prep on weekends for busy weekdays
• Keep your pantry stocked with healthy staples
• Experiment with herbs and spices for flavor without excess salt

What specific recipe or cooking challenge would you like help with?`;
  }
  
  if (lowerMessage.includes('nutrition') || lowerMessage.includes('healthy')) {
    return `Great question about nutrition! Here's some evidence-based guidance:

**Balanced Nutrition Basics:**
• Include protein, healthy fats, and complex carbs in each meal
• Aim for 5-9 servings of fruits and vegetables daily
• Stay hydrated with water throughout the day
• Focus on whole, minimally processed foods

**Meal Planning Tips:**
• Plan your meals around lean proteins and vegetables
• Include a variety of colors in your fruits and vegetables
• Consider your activity level when planning portions

Would you like specific advice for your dietary goals or restrictions?`;
  }
  
  return `Thank you for your question! As your FoodMind AI assistant, I'm here to help with:

• Recipe modifications and cooking techniques
• Nutritional guidance and meal planning
• Healthy eating strategies
• Ingredient substitutions and dietary accommodations

Please feel free to ask me anything specific about nutrition, cooking, or healthy eating habits. I'm powered by advanced AI to provide you with evidence-based guidance!`;
}

// Get AI suggestions for meal planning
router.post('/meal-plan', async (req, res) => {
  try {
    const { dietaryPreferences = [], healthGoals = [], daysCount = 7 } = req.body;

    const prompt = `Create a ${daysCount}-day meal plan for someone with these preferences: ${dietaryPreferences.join(', ')} and health goals: ${healthGoals.join(', ')}. Include breakfast, lunch, dinner, and one snack per day. Focus on balanced nutrition and variety.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a nutrition expert creating personalized meal plans. Provide detailed, practical meal suggestions with brief nutritional benefits.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    res.json({
      mealPlan: completion.choices[0].message.content,
      preferences: dietaryPreferences,
      goals: healthGoals,
      duration: `${daysCount} days`,
      generated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Meal plan generation error:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});

export default router;