const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateUser } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing and management
 */

/**
 * @swagger
 * /api/payments/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found
 */
router.post('/create-payment-intent', authenticateUser, paymentController.createPaymentIntent);

/**
 * @swagger
 * /api/payments/history:
 *   get:
 *     summary: Get payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       401:
 *         description: Not authorized
 */
router.get('/history', authenticateUser, paymentController.getPaymentHistory);

/**
 * @swagger
 * /api/payments/verify/{paymentId}:
 *   get:
 *     summary: Verify payment status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment status verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 paymentMethod:
 *                   type: string
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Payment not found
 */
router.get('/verify/:paymentId', authenticateUser, paymentController.verifyPayment);

/**
 * @swagger
 * /api/payments/refund/{orderId}:
 *   post:
 *     summary: Process refund
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found
 */
router.post('/refund/:orderId', authenticateUser, paymentController.processRefund);

module.exports = router;
