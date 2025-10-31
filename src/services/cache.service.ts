import { gunzip, gzip } from "zlib";
import { redis } from "../config/redis.js";
import { promisify } from "util";
import { config } from "../config/env.js";

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export const TTL = {
    SHORT: 300,        // 5 minutes
    MEDIUM: 1800,      // 30 minutes
    LONG: 3600,        // 1 hour
    VERY_LONG: 86400   // 24 hours
};

export const cacheGet = async <T>(key: string): Promise<T | null> => {
    try {
        const cached = await redis.get(key);
        if (!cached) return null;

        if (cached.startsWith('gzip')) {
            const compressed = Buffer.from(cached.slice(5), 'base64');
            const decompressed = await gunzipAsync(compressed);
            return JSON.parse(decompressed.toString());
        }

        return JSON.parse(cached);
    } catch (error) {
        console.error('Cache get error:', error);
        return null;
    }
};

export const cacheSet = async (key: string, data: any, ttl: number = TTL.MEDIUM): Promise<void> => {
    try {
        const jsonString = JSON.stringify(data);
        const expiration = ttl || config.cache.defaultTTL;

        if (jsonString.length > config.cache.compressionThreshold) {
            const compressed = await gzipAsync(jsonString);
            const compressedString = 'gzip:' + compressed.toString('base64');
            await redis.setex(key, expiration, compressedString);
        } else {
            await redis.setex(key, expiration, jsonString);
        }
    } catch (error) {
        console.error('Cache set error:', error);
    }
};

export const cacheDel = async (pattern: string): Promise<void> => {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            const pipeline = redis.pipeline();
            keys.forEach(key => pipeline.del(key));
            await pipeline.exec();
        }
    } catch (error) {
        console.error('Cache delete error:', error);
    }
}

export const generateCacheKey = (prefix: string, ...params: string[]): string => {
    return `${prefix}:${params.join(':')}`;
}

export const warmCache = async (key: string, dataFetcher: () => Promise<any>, ttl?: number) => {
    try {
        const data = await dataFetcher();
        await cacheSet(key, data, ttl);
    } catch (error) {
        console.error('Cache warming error:', error);
    }
}