import Redis from "ioredis";

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
export const redis = new Redis('redis://default:3U8n7gywZl9ebYu7ReSYJVa1GLd1J9vx@redis-13633.c17.us-east-1-4.ec2.redns.redis-cloud.com:13633');

redis.on('connect', () => console.log(' Redis client connected'));
redis.on('ready', () => console.log(' Redis client ready'));
redis.on('error', (err) => console.error('Redis connection error:', err));
redis.on('close', () => console.log(' Redis client closed'));

redis.ping().then(() => {
    console.log(' Redis ping successful');
}).catch((err) => {
    console.error(' Redis ping failed:', err);
});