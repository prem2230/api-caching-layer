import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const user = new User({
            name,
            email,
            age
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const products = await Product.find({ userId: user._id });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export { registerUser, loginUser };