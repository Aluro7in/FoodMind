import express from 'express';
import multer from 'multer';
import axios from 'axios';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Food recognition endpoint
router.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Try to call external FastAPI backend
    try {
      const formData = new FormData();
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      formData.append('file', blob, req.file.originalname);

      const response = await axios.post(
        process.env.FASTAPI_URL || 'http://localhost:5000/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      // Return the FastAPI response
      res.json({
        ...response.data,
        source: 'FastAPI',
        timestamp: new Date().toISOString()
      });

    } catch (fastApiError) {
      console.log('FastAPI not available, using mock recognition');
      
      // Fallback to mock food recognition
      const mockResult = generateMockFoodRecognition(req.file.originalname);
      
      res.json({
        ...mockResult,
        source: 'Mock AI',
        timestamp: new Date().toISOString(),
        note: 'Using mock recognition - FastAPI backend not available'
      });
    }

  } catch (error) {
    console.error('Food recognition error:', error);
    res.status(500).json({ 
      error: 'Food recognition failed',
      message: error.message 
    });
  }
});

// Mock food recognition for fallback
function generateMockFoodRecognition(filename) {
  const foods = [
    { name: 'Apple', confidence: 94.5, calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: 'Banana', confidence: 91.2, calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: 'Pizza', confidence: 88.7, calories: 266, protein: 11, carbs: 33, fat: 10 },
    { name: 'Salad', confidence: 85.3, calories: 33, protein: 3, carbs: 6, fat: 0.3 },
    { name: 'Burger', confidence: 92.1, calories: 540, protein: 25, carbs: 40, fat: 31 },
    { name: 'Pasta', confidence: 89.4, calories: 220, protein: 8, carbs: 44, fat: 1.1 }
  ];

  // Select random food for demo
  const randomFood = foods[Math.floor(Math.random() * foods.length)];
  
  return {
    class_name: randomFood.name,
    confidence: randomFood.confidence,
    nutrition: {
      calories: randomFood.calories,
      protein: randomFood.protein,
      carbs: randomFood.carbs,
      fat: randomFood.fat,
      fiber: Math.round(randomFood.carbs * 0.1 * 10) / 10
    },
    status: 'success'
  };
}

// Get food recognition statistics
router.get('/stats', (req, res) => {
  // Mock statistics - in production, get from database
  res.json({
    totalPredictions: 1247,
    todayPredictions: 23,
    averageConfidence: 91.3,
    topFoods: [
      { name: 'Apple', count: 156 },
      { name: 'Banana', count: 134 },
      { name: 'Pizza', count: 98 },
      { name: 'Salad', count: 87 },
      { name: 'Burger', count: 76 }
    ],
    lastUpdated: new Date().toISOString()
  });
});

export default router;