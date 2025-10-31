import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { redis } from "../config/redis.js";
import { cacheDel, cacheGet, cacheSet, generateCacheKey } from "../services/cache.service.js";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, userId } = req.body;

        if (!name || !price || !userId) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const product = new Product({
            name,
            price,
            userId
        });

        await product.save();

        await cacheDel('products:*');
        await cacheDel(`user:${userId}:products`);

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = generateCacheKey('products', 'all', String(page), String(limit));

    try {
        const cached = await cacheGet(cacheKey);
        if (cached) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return res.json({
                ...cached,
                source: 'cache'
            });
        }

        const skip = (Number(page) - 1) * Number(limit);
        const products = await Product.find().skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

        const total = await Product.countDocuments();

        const result = {
            success: true,
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        };

        await cacheSet(cacheKey, result, 600);
        console.log('Cached: ', cacheKey);

        return res.json({ ...result, source: 'database' });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getProductsByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const cacheKey = generateCacheKey('user', userId, 'products');

    try {
        const cached = await cacheGet(cacheKey);
        if (cached) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return res.json({
                ...cached,
                source: 'cache'
            });
        }
        const products = await Product.find({ userId });

        const result = {
            success: true,
            products,
            count: products.length
        };

        await cacheSet(cacheKey, result, 600);
        console.log('Cached: ', cacheKey)

        return res.json({
            ...result, source: 'database'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getProductById = async (req: Request, res: Response) => {
    const { productId } = req.params;
    const cacheKey = generateCacheKey('product', productId);

    try {
        const cached = await cacheGet(cacheKey);
        if (cached) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return res.json({
                ...cached,
                source: 'cache'
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const result = {
            success: true,
            product
        };

        await cacheSet(cacheKey, result, 600);
        console.log('Cached: ', cacheKey);

        return res.json({
            ...result,
            source: 'database'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export { createProduct, getProducts, getProductsByUser, getProductById }