import { redis } from "../config/redis.js";

export const TTL = {
    SHORT: 300,        // 5 minutes
    MEDIUM: 1800,      // 30 minutes
    LONG: 3600,        // 1 hour
    VERY_LONG: 86400   // 24 hours
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
    try {
        const cached = await redis.get(key);

        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.error('Cache get error:', error);
        return null;
    }
};

export const cacheSet = async (key: string, data: any, ttl: number = TTL.MEDIUM): Promise<void> => {
    try {
        await redis.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
        console.error('Cache set error:', error);
    }
};

export const cacheDel = async (pattern: string): Promise<void> => {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }
    } catch (error) {
        console.error('Cache delete error:', error);
    }
}

export const generateCacheKey = (prefix: string, ...params: string[]): string => {
    return `${prefix}:${params.join(':')}`;
}