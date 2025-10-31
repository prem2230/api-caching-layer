import express from 'express';
import { redis } from '../config/redis.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', async (req, res) => {
    const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
            redis: 'unknown',
            mongodb: 'unknown'
        }
    };

    try {
        // Check Redis
        await redis.ping();
        health.services.redis = 'healthy';
    } catch (error) {
        health.services.redis = 'unhealthy';
        health.status = 'degraded';
    }

    try {
        // Check MongoDB
        if (mongoose.connection.readyState === 1) {
            health.services.mongodb = 'healthy';
        } else {
            health.services.mongodb = 'unhealthy';
            health.status = 'degraded';
        }
    } catch (error) {
        health.services.mongodb = 'unhealthy';
        health.status = 'degraded';
    }

    const statusCode = health.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(health);
});

export default router;
