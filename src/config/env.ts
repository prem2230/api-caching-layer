import dotenv from 'dotenv';
import { IEnvConfig } from '../types/env-types';

dotenv.config();

// Use!(non - null assertion) to tell TypeScript these env vars will exist
// Use Number() for port conversion(handles string to number properly)
// Type assertion for nodeEnv to match the union type
// Keep parseInt() for the cache values as you had them

export const config: IEnvConfig = {
    port: Number(process.env.PORT) || 4000,
    nodeEnv: process.env.NODE_ENV,
    mongodb: {
        uri: process.env.MONGO_URI!
    },
    redis: {
        url: process.env.REDIS_URL!
    },
    cache: {
        defaultTTL: parseInt(process.env.CACHE_DEFAULT_TTL!),
        compressionThreshold: parseInt(process.env.CACHE_COMPRESSION_THRESHOLD!)
    },
    apiBaseUrl: process.env.API_BASE_URL!,
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS!),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS!)
    }
};
