import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodmind_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('foodmind_token');
      localStorage.removeItem('foodmind_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

// Recipes API
export const recipesAPI = {
  getAll: (filters = {}) => api.get('/recipes', { params: filters }),
  getById: (id) => api.get(`/recipes/${id}`),
  getFeatured: () => api.get('/recipes/featured/today'),
  getCuisines: () => api.get('/recipes/meta/cuisines'),
};

// AI API
export const aiAPI = {
  chat: (message, conversationHistory = []) => 
    api.post('/ai/chat', { message, conversationHistory }),
  generateMealPlan: (preferences) => 
    api.post('/ai/meal-plan', preferences),
};

// Food Recognition API
export const foodRecognitionAPI = {
  analyzeImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/food-recognition/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getStats: () => api.get('/food-recognition/stats'),
};

// Subscription API
export const subscriptionAPI = {
  getPlans: () => api.get('/subscription/plans'),
  createCheckoutSession: (planId, userId) => 
    api.post('/subscription/create-checkout-session', { planId, userId }),
  getStatus: (userId) => api.get(`/subscription/status/${userId}`),
};

export default api;