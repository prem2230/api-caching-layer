import express from 'express';
import { createProduct, getProductById, getProducts, getProductsByUser } from '../controllers/product.controller.js';
import { cacheMiddleware } from '../middlewares/cache.middleware.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/get-products', cacheMiddleware('products', 600), getProducts);
router.get('/get-product/:productId', cacheMiddleware('product', 1800), getProductById);
router.get('/get-products-by-user/:userId', cacheMiddleware('user-products', 300), getProductsByUser);

export default router;