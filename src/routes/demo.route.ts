import express from 'express';
import { getCacheStats } from '../utils/cache-analytics.js';
import { cacheDel } from '../services/cache.service.js';

const router = express.Router();

router.get('/cache-stats', async (req, res) => {
    await getCacheStats();
    res.json({ message: 'Check console for cache stats' });
});

router.delete('/clear-cache', async (req, res) => {
    await cacheDel('*');
    res.json({ message: 'All cache cleared' });
});

export default router;