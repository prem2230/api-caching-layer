import express from 'express';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import healthRouter from './routes/health.route.js';
import demoRouter from './routes/demo.route.js';
import { connectDB } from './config/database.js';
import { config } from './config/env.js';
import { rateLimitMiddleware } from './middlewares/rate-limit.middleware.js';


const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(rateLimitMiddleware(config.rateLimit.windowMs, config.rateLimit.maxRequests));

connectDB();

app.use('/api/v1/health', healthRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/demo', demoRouter);

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});