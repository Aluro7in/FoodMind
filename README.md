# FoodMind - AI-Powered Nutrition & Meal Planning

FoodMind is a comprehensive web application that combines artificial intelligence with nutrition science to provide personalized meal planning, food recognition, and dietary guidance.

## 🚀 Features

### 🧠 AI-Powered Core
- **OpenAI Integration**: Advanced conversational AI for nutrition guidance
- **Food Recognition**: Computer vision for instant food identification
- **Personalized Recommendations**: AI-driven meal planning and nutrition advice

### 🍽️ Nutrition & Recipes
- **Smart Recipe Database**: 15,000+ AI-curated healthy recipes
- **Nutritional Analysis**: Detailed macro and micronutrient breakdowns
- **Meal Planning**: Automated weekly meal plans based on preferences
- **Dietary Accommodations**: Support for various dietary restrictions

### 📱 User Experience
- **Responsive Design**: Beautiful, mobile-first interface
- **Real-time Analytics**: Track nutrition goals and progress
- **Video Tutorials**: Step-by-step cooking instructions
- **Community Features**: Share recipes and tips

### 💳 Subscription System
- **Flexible Plans**: Free, Premium, and Professional tiers
- **Stripe Integration**: Secure payment processing
- **Usage Analytics**: Track API usage and features

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Vite** for development and building

### Backend
- **Node.js** with Express.js
- **OpenAI API** for AI features
- **Stripe** for payments
- **JWT** for authentication
- **Multer** for file uploads

### External Integration
- **FastAPI Backend**: Python-based food recognition service
- **PyTorch**: Computer vision models for food identification

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd foodmind-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. **Start the application**
```bash
npm start
```

This will start both the Express backend (port 3001) and React frontend (port 3000).

### Development Mode

For development with hot reloading:

```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Required
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret

# Optional
STRIPE_SECRET_KEY=your_stripe_secret_key
FASTAPI_URL=http://localhost:5000
PORT=3001
```

### OpenAI Integration

The application uses OpenAI's GPT models for:
- Conversational AI assistant
- Recipe recommendations
- Nutritional analysis
- Meal planning suggestions

### Food Recognition

The app integrates with an external FastAPI backend for food recognition:
- Upload images for AI analysis
- Get nutritional information
- Track food consumption

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Recipes
- `GET /api/recipes` - Get recipes with filters
- `GET /api/recipes/:id` - Get specific recipe
- `GET /api/recipes/featured/today` - Get featured recipe

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/meal-plan` - Generate meal plans

### Food Recognition
- `POST /api/food-recognition/analyze` - Analyze food image
- `GET /api/food-recognition/stats` - Get usage statistics

### Subscriptions
- `GET /api/subscription/plans` - Get subscription plans
- `POST /api/subscription/create-checkout-session` - Create Stripe session

## 🎨 Design System

### Colors
- **Primary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Secondary**: Blue to Cyan gradient (`from-blue-500 to-cyan-500`)
- **Success**: Green to Teal gradient (`from-green-500 to-teal-500`)
- **Background**: Soft gradients (`from-blue-50 via-purple-50 to-pink-50`)

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts with proper spacing
- **Interactive**: Hover states and micro-animations

## 🔒 Security

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Bolt.new Deployment
The application is optimized for Bolt.new deployment with:
- Automatic dependency installation
- Environment variable configuration
- Production build optimization

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@foodmind.ai
- Documentation: [docs.foodmind.ai](https://docs.foodmind.ai)
- Issues: [GitHub Issues](https://github.com/foodmind/issues)

## 🙏 Acknowledgments

- **OpenAI** for providing advanced AI capabilities
- **Stripe** for secure payment processing
- **Pexels** for high-quality food photography
- **React Community** for excellent development tools

---

**FoodMind** - Transforming nutrition through artificial intelligence 🧠🍎