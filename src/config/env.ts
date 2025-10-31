import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 4000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/demo'
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    cache: {
        defaultTTL: parseInt(process.env.CACHE_DEFAULT_TTL || '1800'),
        compressionThreshold: parseInt(process.env.CACHE_COMPRESSION_THRESHOLD || '1024')
    }
};
