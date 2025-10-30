import mongoose from "mongoose";
import { IUser } from "../types/schema-types";

const user = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

export const User = mongoose.model<IUser>("User", user);