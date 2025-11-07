import { redis } from '../config/redis.js';

export const getCacheStats = async () => {
    try {
        const info = await redis.info('memory');
        const keyspace = await redis.info('keyspace');
        const allKeys = await redis.keys('*');

        console.log('Redis Cache Analytics:');
        console.log(`Total Keys: ${allKeys.length}`);
        console.log(`Memory Usage: ${info.split('\n').find(line => line.includes('used_memory_human'))}`);
        console.log(`Keyspace: ${keyspace}`);

        // Group keys by prefix
        const keyGroups: Record<string, number> = {};
        allKeys.forEach(key => {
            const prefix = key.split(':')[0];
            keyGroups[prefix] = (keyGroups[prefix] || 0) + 1;
        });

        console.log('\n Keys by Category:');
        Object.entries(keyGroups).forEach(([prefix, count]) => {
            console.log(`   ${prefix}: ${count} keys`);
        });

    } catch (error) {
        console.error('Error getting cache stats:', error);
    }
};
