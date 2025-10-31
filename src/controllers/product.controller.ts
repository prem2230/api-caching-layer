import { Request, Response } from "express";
import { Product } from "../models/product.model.js";

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

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find().skip(skip).limit(Number(limit)).sort({ createdAt: -1 });

        const total = await Product.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getProductsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const products = await Product.find({ userId });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export { createProduct, getProducts, getProductsByUser, getProductById }