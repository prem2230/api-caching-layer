# Redis API Caching Layer

A high-performance Node.js REST API built with TypeScript, featuring Redis caching, MongoDB integration, rate limiting, and comprehensive middleware support for scalable applications.

## Features

- **Redis Caching**: Intelligent caching with automatic compression and configurable TTL
- **MongoDB Integration**: Mongoose ODM with robust connection management
- **Rate Limiting**: IP-based rate limiting with Redis backend storage
- **TypeScript**: Full type safety with modern ES modules
- **Middleware Stack**: Cache, rate limiting, and comprehensive error handling
- **Health Monitoring**: Real-time API and service health checks
- **Performance Analytics**: Cache hit/miss ratio tracking and performance metrics
- **Data Compression**: Automatic gzip compression for large payloads
- **Environment Configuration**: Centralized configuration management

## Prerequisites

- **Node.js** 18+ 
- **MongoDB** 4.4+
- **Redis** 6.0+
- **npm** or **yarn**

## Installation

```bash
# Clone the repository
git clone https://github.com/prem2230/api-caching-layer
cd api-caching-layer

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration


# Environment Configuration
Create a .env file in the root directory:

# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/redis_cache_db

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Cache Configuration
CACHE_DEFAULT_TTL=3600
CACHE_COMPRESSION_THRESHOLD=2048

# API Configuration
API_BASE_URL=http://localhost:4000/api/v1

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

env
Environment Variables Description
Variable	Description	Default
PORT	Server port	4000
NODE_ENV	Environment mode	development
MONGO_URI	MongoDB connection string	-
REDIS_URL	Redis connection URL	-
CACHE_DEFAULT_TTL	Default cache TTL in seconds	3600
CACHE_COMPRESSION_THRESHOLD	Compression threshold in bytes	2048
API_BASE_URL	Base URL for API	-
RATE_LIMIT_WINDOW_MS	Rate limit window in milliseconds	60000
RATE_LIMIT_MAX_REQUESTS	Max requests per window	100

Running the Application
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database with sample data
npm run seed

# Run performance tests
npm run test-performance

# View cache analytics
npm run cache-stats

API Documentation
Base URL
http://localhost:4000/api/v1

Health Check
GET /health

User Endpoints
Register User
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Login User
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

http
Product Endpoints
Create Product
POST /products/create
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "userId": "user_id_here"
}

http
Get All Products (Cached - 10 minutes)
GET /products/get-products

http
Get Product by ID (Cached - 30 minutes)
GET /products/get-product/:productId

Get Products by User (Cached - 5 minutes)
GET /products/get-products-by-user/:userId

Demo Endpoints
GET /demo/cache-test

Caching Strategy
Cache TTL Levels
export const TTL = {
    SHORT: 300,        // 5 minutes
    MEDIUM: 1800,      // 30 minutes  
    LONG: 3600,        // 1 hour
    VERY_LONG: 86400   // 24 hours
};

Cache Key Format
prefix:route:parameters

Examples:

products:/api/v1/products/get-products

product:/api/v1/products/get-product/123

user-products:/api/v1/products/get-products-by-user/456

Compression Strategy
Threshold: 2KB (configurable)

Algorithm: gzip with base64 encoding

Prefix: gzip: for compressed data

Benefit: 60-80% size reduction for large payloads

Rate Limiting
Window: 60 seconds (configurable)

Limit: 100 requests per IP (configurable)

Storage: Redis-based for distributed systems

Headers:

X-RateLimit-Limit: Maximum requests allowed

X-RateLimit-Remaining: Remaining requests in current window

Performance Metrics
Typical Performance
Cache Hit Ratio: ~85% for read operations

Cached Response Time: <50ms

Database Response Time: 100-300ms

Compression Ratio: 60-80% for large responses

Throughput: 1000+ req/sec with caching

Monitoring Commands
# View cache statistics
npm run cache-stats

# Run performance benchmarks
npm run test-performance

# Monitor Redis in real-time
redis-cli monitor

# Check MongoDB performance
db.runCommand({serverStatus: 1})

Script	Description
npm run dev	Start development server with hot reload
npm run build	Build TypeScript to JavaScript
npm start	Start production server
npm run seed	Populate database with sample data
npm run test-performance	Run performance benchmarks
npm run cache-stats	Display cache analytics
Code Style
TypeScript: Strict mode enabled

ES Modules: Modern import/export syntax

Async/Await: Promise-based asynchronous code

Error Handling: Comprehensive try-catch blocks

Troubleshooting
Common Issues
Redis Connection Failed
# Check Redis status
redis-cli ping

# Start Redis server
redis-server

bash
MongoDB Connection Failed
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# Start MongoDB
mongod
```

## Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

## Acknowledgments
Express.js - Fast, unopinionated web framework

Redis - In-memory data structure store

MongoDB - Document-oriented database

TypeScript - Typed superset of JavaScript

Mongoose - MongoDB object modeling for Node.js

Built using Node.js, TypeScript, Redis, and MongoDB

## License

[Prem](https://github.com/prem2230)
