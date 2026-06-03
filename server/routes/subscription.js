import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

// Initialize Stripe (use test key for development)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_...');

// Subscription plans
const plans = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Access to 100+ basic recipes',
      'Basic nutritional information',
      'Simple meal tracking',
      'Community access',
      '5 AI assistant queries per day',
      '3 food recognition scans per day'
    ]
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    priceId: 'price_premium_monthly',
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
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 19.99,
    priceId: 'price_professional_monthly',
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
    ]
  }
};

// Get all subscription plans
router.get('/plans', (req, res) => {
  res.json({
    plans: Object.values(plans),
    currency: 'USD'
  });
});

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { planId, userId } = req.body;
    
    const plan = plans[planId];
    if (!plan || plan.id === 'free') {
      return res.status(400).json({ error: 'Invalid plan selected' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/subscription`,
      client_reference_id: userId,
      metadata: {
        planId: planId,
        userId: userId
      }
    });

    res.json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    });
  }
});

// Handle webhook from Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful:', session);
      // Update user subscription in database
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Subscription payment succeeded:', invoice);
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log('Subscription cancelled:', subscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Get subscription status
router.get('/status/:userId', (req, res) => {
  // Mock subscription status - in production, get from database
  res.json({
    userId: req.params.userId,
    plan: 'premium',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false
  });
});

export default router;