require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cacheManager = require('./config/cache');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/apod', require('./routes/apod'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    cache: cacheManager.getStats()
  });
});

// Cache stats endpoint
app.get('/api/cache/stats', (req, res) => {
  res.json({
    success: true,
    data: cacheManager.getStats()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'NASA APOD Explorer API',
    version: '1.0.0',
    endpoints: {
      apod: {
        today: 'GET /api/apod',
        specific_date: 'GET /api/apod?date=YYYY-MM-DD',
        range: 'GET /api/apod/range?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD',
        random: 'GET /api/apod/random?count=10'
      },
      health: 'GET /health',
      cache_stats: 'GET /api/cache/stats'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         NASA APOD Explorer - Backend Service             ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                        ║
║  Cache TTL: ${process.env.CACHE_TTL || 3600}s                                  ║
║  Cache Max Keys: ${process.env.CACHE_MAX_KEYS || 100}                            ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;

