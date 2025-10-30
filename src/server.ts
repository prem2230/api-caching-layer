import express from 'express';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});