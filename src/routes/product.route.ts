import express from 'express';
import { createProduct, getProductById, getProducts, getProductsByUser } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/get-products', getProducts);
router.get('/get-product/:productId', getProductById);
router.get('/get-products-by-user/:userId', getProductsByUser);

export default router;