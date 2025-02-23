/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         stripeCustomerId:
 *           type: string
 *         defaultPaymentMethod:
 *           type: string
 *
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - images
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the product
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *           description: ID of the category
 *         subCategory:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         stock:
 *           type: number
 *         vendor:
 *           type: string
 *           description: ID of the vendor (user)
 *         specifications:
 *           type: object
 *         ratings:
 *           type: object
 *           properties:
 *             average:
 *               type: number
 *             count:
 *               type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         isActive:
 *           type: boolean
 *
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - items
 *         - shippingAddress
 *         - paymentMethod
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the order
 *         user:
 *           type: string
 *           description: ID of the user who placed the order
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *         shippingAddress:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             zipCode:
 *               type: string
 *             country:
 *               type: string
 *         paymentMethod:
 *           type: string
 *         paymentStatus:
 *           type: string
 *           enum: [pending, completed, failed]
 *         orderStatus:
 *           type: string
 *           enum: [processing, shipped, delivered, cancelled]
 *         totalAmount:
 *           type: number
 *
 *     Cart:
 *       type: object
 *       required:
 *         - user
 *         - items
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the cart
 *         user:
 *           type: string
 *           description: ID of the user who owns the cart
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: ID of the product
 *               quantity:
 *                 type: number
 *
 *     Payment:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: string
 *         amount:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         order:
 *           $ref: '#/components/schemas/Order'
 *
 *     SavedCard:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         brand:
 *           type: string
 *         last4:
 *           type: string
 *         expMonth:
 *           type: number
 *         expYear:
 *           type: number
 *
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the category
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         parentCategory:
 *           type: string
 *           description: ID of the parent category (for subcategories)
 *         image:
 *           type: string
 *           description: URL of the category image
 */