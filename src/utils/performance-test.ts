import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1/products';

const performanceTest = async () => {
    console.log('Starting Performance Test...\n');

    // Test 1: First call (Database)
    console.log('Test 1: First API call (Database hit)');
    const start1 = Date.now();
    await axios.get(`${BASE_URL}/get-products`);
    const end1 = Date.now();
    console.log(`Response time: ${end1 - start1}ms\n`);

    // Test 2: Second call (Cache)
    console.log('Test 2: Second API call (Cache hit)');
    const start2 = Date.now();
    await axios.get(`${BASE_URL}/get-products`);
    const end2 = Date.now();
    console.log(`Response time: ${end2 - start2}ms\n`);

    // Test 3: Multiple concurrent requests
    console.log('Test 3: 10 concurrent requests (Cache hits)');
    const start3 = Date.now();
    const promises = Array(10).fill(null).map(() =>
        axios.get(`${BASE_URL}/get-products`)
    );
    await Promise.all(promises);
    const end3 = Date.now();
    console.log(`Total time for 10 requests: ${end3 - start3}ms`);
    console.log(`Average per request: ${(end3 - start3) / 10}ms\n`);

    console.log('Performance test completed!');
};

performanceTest().catch(console.error);
