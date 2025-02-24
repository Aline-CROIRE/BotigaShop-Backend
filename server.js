const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const paymentController = require('./controllers/paymentController');
const { specs, swaggerUi } = require('./swagger');

const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables early
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security middleware: sets various HTTP headers for app security
app.use(helmet());

// Logging middleware: logs HTTP requests in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Stripe webhook endpoint must be declared before express.json()
// It uses express.raw() to capture the raw JSON payload needed for signature verification
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

// Standard middleware
app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Register application routes (ensure each of these modules exports an Express router instance)
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working correctly" })
})

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));


// Error handling middleware should be the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
