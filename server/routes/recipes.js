import express from 'express';

const router = express.Router();

// Mock recipe database
const recipes = [
  {
    id: 1,
    name: 'Mediterranean Quinoa Bowl',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    cuisine: 'mediterranean',
    difficulty: 'easy',
    prepTime: '25 minutes',
    cookTime: '15 minutes',
    servings: 4,
    calories: 420,
    rating: 4.8,
    description: 'A nutritious and colorful bowl packed with quinoa, fresh vegetables, and tahini dressing.',
    ingredients: [
      { name: 'Quinoa', amount: '1 cup', calories: 222 },
      { name: 'Cherry tomatoes', amount: '2 cups', calories: 60 },
      { name: 'Cucumber', amount: '1 large', calories: 16 },
      { name: 'Red onion', amount: '1/2 medium', calories: 20 },
      { name: 'Kalamata olives', amount: '1/2 cup', calories: 80 },
      { name: 'Feta cheese', amount: '1/2 cup', calories: 100 }
    ],
    instructions: [
      'Rinse quinoa under cold water. In a medium saucepan, bring 2 cups water to boil.',
      'Add quinoa, reduce heat to low, cover and simmer for 15 minutes until water is absorbed.',
      'Remove from heat and let stand 5 minutes. Fluff with a fork and let cool completely.',
      'While quinoa cooks, prepare vegetables: dice cucumber, halve cherry tomatoes, and thinly slice red onion.',
      'In a small bowl, whisk together lemon juice, olive oil, and tahini until smooth.',
      'In a large bowl, combine cooled quinoa, vegetables, olives, and feta cheese.',
      'Pour dressing over quinoa mixture and toss gently to combine.',
      'Garnish with fresh parsley and serve immediately or chill for later.'
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
    tags: ['vegetarian', 'gluten-free', 'high-protein'],
    isSpecial: true
  },
  {
    id: 2,
    name: 'Thai Green Curry',
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
    cuisine: 'thai',
    difficulty: 'medium',
    prepTime: '45 minutes',
    cookTime: '30 minutes',
    servings: 6,
    calories: 380,
    rating: 4.6,
    description: 'Aromatic Thai curry with coconut milk, vegetables, and fragrant herbs.',
    ingredients: [
      { name: 'Green curry paste', amount: '3 tbsp', calories: 30 },
      { name: 'Coconut milk', amount: '400ml', calories: 445 },
      { name: 'Chicken breast', amount: '500g', calories: 825 },
      { name: 'Thai eggplant', amount: '200g', calories: 50 },
      { name: 'Thai basil', amount: '1/2 cup', calories: 5 }
    ],
    instructions: [
      'Heat oil in a large pan over medium heat.',
      'Add curry paste and cook for 2 minutes until fragrant.',
      'Add thick coconut milk and simmer for 5 minutes.',
      'Add chicken and cook until tender.',
      'Add vegetables and remaining coconut milk.',
      'Simmer until vegetables are cooked.',
      'Garnish with Thai basil and serve with rice.'
    ],
    nutrition: {
      calories: 380,
      protein: 28,
      carbs: 12,
      fat: 26,
      fiber: 3,
      sugar: 8,
      sodium: 890
    },
    tags: ['spicy', 'dairy-free', 'high-protein']
  },
  {
    id: 3,
    name: 'Avocado Toast Supreme',
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400',
    cuisine: 'american',
    difficulty: 'easy',
    prepTime: '10 minutes',
    cookTime: '5 minutes',
    servings: 2,
    calories: 320,
    rating: 4.7,
    description: 'Elevated avocado toast with poached egg, microgreens, and everything seasoning.',
    ingredients: [
      { name: 'Sourdough bread', amount: '2 slices', calories: 160 },
      { name: 'Ripe avocado', amount: '1 large', calories: 234 },
      { name: 'Eggs', amount: '2 large', calories: 140 },
      { name: 'Microgreens', amount: '1/4 cup', calories: 5 },
      { name: 'Everything seasoning', amount: '1 tsp', calories: 5 }
    ],
    instructions: [
      'Toast bread slices until golden brown.',
      'Bring water to simmer in a saucepan for poached eggs.',
      'Mash avocado with lime juice, salt, and pepper.',
      'Poach eggs for 3-4 minutes until whites are set.',
      'Spread avocado mixture on toast.',
      'Top with poached egg and microgreens.',
      'Sprinkle with everything seasoning and serve immediately.'
    ],
    nutrition: {
      calories: 320,
      protein: 16,
      carbs: 24,
      fat: 20,
      fiber: 12,
      sugar: 3,
      sodium: 420
    },
    tags: ['vegetarian', 'high-fiber', 'breakfast']
  }
];

// Get all recipes with filtering
router.get('/', (req, res) => {
  try {
    let filteredRecipes = [...recipes];
    
    // Apply filters
    const { cuisine, difficulty, search, limit = 20 } = req.query;
    
    if (cuisine && cuisine !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
      );
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Limit results
    filteredRecipes = filteredRecipes.slice(0, parseInt(limit));
    
    res.json({
      recipes: filteredRecipes,
      total: filteredRecipes.length,
      filters: { cuisine, difficulty, search }
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get recipe by ID
router.get('/:id', (req, res) => {
  try {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Get featured/special recipe
router.get('/featured/today', (req, res) => {
  try {
    const featuredRecipe = recipes.find(recipe => recipe.isSpecial) || recipes[0];
    res.json(featuredRecipe);
  } catch (error) {
    console.error('Error fetching featured recipe:', error);
    res.status(500).json({ error: 'Failed to fetch featured recipe' });
  }
});

// Get recipe categories/cuisines
router.get('/meta/cuisines', (req, res) => {
  try {
    const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
    const difficulties = [...new Set(recipes.map(recipe => recipe.difficulty))];
    
    res.json({
      cuisines: cuisines.sort(),
      difficulties: difficulties.sort(),
      totalRecipes: recipes.length
    });
  } catch (error) {
    console.error('Error fetching recipe metadata:', error);
    res.status(500).json({ error: 'Failed to fetch recipe metadata' });
  }
});

export default router;