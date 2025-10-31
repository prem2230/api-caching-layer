import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis.js';

export const rateLimitMiddleware = (windowMs: number = 60000, maxRequests: number = 100) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const key = `rate_limit:${req.ip}`;

        try {
            const current = await redis.incr(key);

            if (current === 1) {
                await redis.expire(key, Math.ceil(windowMs / 1000));
            }

            if (current > maxRequests) {
                return res.status(429).json({
                    error: 'Too many requests',
                    retryAfter: windowMs / 1000
                });
            }

            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));

            next();
        } catch (error) {
            console.error('Rate limit error:', error);
            next(); // Continue on Redis error
        }
    };
};
