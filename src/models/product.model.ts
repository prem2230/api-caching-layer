import mongoose from "mongoose";
import { IProduct } from "../types/schema-types";

const product = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export const Product = mongoose.model<IProduct>("Product", product);