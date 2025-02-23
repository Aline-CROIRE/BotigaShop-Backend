
const Order = require('../models/Order');
const User = require('../models/User');

const Stripe = require('stripe');

// Check if the Stripe key is loaded


const stripe = new Stripe('sk_test_51QoM1bLpNUrDfFRre4824hSYFRjdE6xxf00KlKEOJ1zInVkgLkw6SiJtn9ui2npK9R0oq5j4gKfbMDDqxQedjbIj00ls1OMKcm', {
  apiVersion: '2020-08-27' // Set your desired API version here
});



// Now you can use the `stripe` instance in your controllers


// Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: orderId,
        userId: req.user.id
      },
      payment_method_types: ['card'],
      setup_future_usage: 'off_session',
    });

    // Save paymentIntent ID in order
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get Payment History
exports.getPaymentHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.stripeCustomerId) {
      return res.status(400).json({ message: 'User not linked with Stripe' });
    }

    const payments = await stripe.paymentIntents.list({
      customer: user.stripeCustomerId,
      limit: 10,
    });

    const paymentHistory = await Promise.all(
      payments.data.map(async (payment) => {
        const order = await Order.findById(payment.metadata.orderId)
          .select('orderStatus items createdAt')
          .populate('items.product', 'name images');

        return {
          paymentId: payment.id,
          amount: payment.amount / 100,
          status: payment.status,
          createdAt: payment.created,
          order: order
        };
      })
    );

    res.json(paymentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify Payment Status
exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (!paymentIntent) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      paymentMethod: paymentIntent.payment_method_types[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process Refund
exports.processRefund = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!order.paymentIntentId) {
      return res.status(404).json({ message: 'Payment intent not found' });
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.paymentIntentId,
      reason: reason || 'requested_by_customer'
    });

    order.orderStatus = 'cancelled';
    order.paymentStatus = 'refunded';
    await order.save();

    res.json({
      success: true,
      refund: refund
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stripe Webhook Handler
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handleSuccessfulPayment(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handleFailedPayment(event.data.object);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;
    }
  } catch (error) {
    console.error('Error processing webhook event:', error);
  }

  res.json({ received: true });
};

// Helper Functions
async function handleSuccessfulPayment(paymentIntent) {
  try {
    await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
      paymentStatus: 'completed',
      orderStatus: 'processing'
    });
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
      paymentStatus: 'failed',
      orderStatus: 'cancelled'
    });
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handleRefund(refund) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(refund.payment_intent);
    await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
      paymentStatus: 'refunded',
      orderStatus: 'cancelled'
    });
  } catch (error) {
    console.error('Error handling refund:', error);
  }
}
