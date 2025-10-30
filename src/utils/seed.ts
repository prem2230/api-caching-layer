import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import dotenv from 'dotenv';

dotenv.config();

const users = [
    { name: 'John Doe', email: 'john@example.com', age: 30 },
    { name: 'Jane Smith', email: 'jane@example.com', age: 25 },
    { name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
    { name: 'Alice Brown', email: 'alice@example.com', age: 28 },
    { name: 'Charlie Wilson', email: 'charlie@example.com', age: 32 },
    { name: 'Diana Davis', email: 'diana@example.com', age: 27 },
    { name: 'Eve Miller', email: 'eve@example.com', age: 29 },
    { name: 'Frank Garcia', email: 'frank@example.com', age: 31 },
    { name: 'Grace Lee', email: 'grace@example.com', age: 26 },
    { name: 'Henry Taylor', email: 'henry@example.com', age: 33 }
];

const productNames = [
    'Laptop', 'Phone', 'Tablet', 'Headphones', 'Keyboard',
    'Mouse', 'Monitor', 'Speaker', 'Camera', 'Watch',
    'Charger', 'Cable', 'Case', 'Stand', 'Bag'
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        await User.deleteMany({});
        await Product.deleteMany({});

        // Insert users
        const createdUsers = await User.insertMany(users);
        console.log(`Created ${createdUsers.length} users`);

        // Generate products for each user
        const products = [] as any;
        createdUsers.forEach(user => {
            const numProducts = Math.floor(Math.random() * 5) + 1; // 1-5 products per user

            for (let i = 0; i < numProducts; i++) {
                products.push({
                    name: productNames[Math.floor(Math.random() * productNames.length)],
                    price: Math.floor(Math.random() * 1000) + 50, // $50-$1050
                    userId: user._id
                });
            }
        });

        const createdProducts = await Product.insertMany(products);
        console.log(`Created ${createdProducts.length} products`);

        console.log('Seed data completed successfully');
        process.exit(0);

    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedData();
