import { NextFunction, Request, Response } from "express"
import { cacheGet, cacheSet, generateCacheKey } from "../services/cache.service"


export const cacheMiddleware = (keyPrefix: string, ttl?: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cacheKey = generateCacheKey(keyPrefix, req.originalUrl);

        const cached = await cacheGet(cacheKey);

        if (cached) {
            console.log(`Cache hit for key: ${cacheKey}`);
            return res.json({
                ...cached,
                source: 'cache'
            });
        }
        console.log(`Cache miss for key: ${cacheKey}`);

        const originalJson = res.json;

        res.json = function (data: any) {
            if (res.statusCode === 200) {
                cacheSet(cacheKey, data, ttl);
            }
            return originalJson.call(this, { ...data, source: 'database' });
        };

        next();
    }
}