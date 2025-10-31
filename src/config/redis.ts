import Redis from "ioredis";
import { config } from "./env.js";

// export const redis = new Redis({
//     host: 'localhost',
//     port: 6379,
//     maxRetriesPerRequest: null,
//     lazyConnect: true
// });
// export const redis = new Redis({
//     host: 'redis-13633.c17.us-east-1-4.ec2.redns.redis-cloud.com',
//     port: 13633,
//     password: '3U8n7gywZl9ebYu7ReSYJVa1GLd1J9vx',
//     username: 'default',
//     maxRetriesPerRequest: 3,
//     lazyConnect: false,
//     connectTimeout: 10000,
//     retryDelayOnFailover: 1000,
// });
export const redis = new Redis(config.redis.url, {
    maxRetriesPerRequest: 3,
    connectTimeout: 10000,
    lazyConnect: false
});

redis.on('connect', () => console.log(' Redis client connected'));
redis.on('ready', () => console.log(' Redis client ready'));
redis.on('error', (err) => console.error('Redis connection error:', err));
redis.on('close', () => console.log(' Redis client closed'));
redis.on('reconnecting', () => console.log(' Redis client reconnecting'));

redis.ping().then(() => {
    console.log(' Redis ping successful');
}).catch((err) => {
    console.error(' Redis ping failed:', err);
});