export interface IEnvConfig {
    port: number;
    nodeEnv: string | undefined;
    mongodb: {
        uri: string;
    };
    redis: {
        url: string;
    };
    cache: {
        defaultTTL: number;
        compressionThreshold: number;
    };
    apiBaseUrl: string;
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    }
}