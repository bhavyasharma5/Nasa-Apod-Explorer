# NASA APOD Explorer - Backend Service

RESTful API service for fetching and caching NASA's Astronomy Picture of the Day.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
NASA_API_KEY=DEMO_KEY
PORT=3001
CACHE_TTL=3600
CACHE_MAX_KEYS=100
```

3. Start the server:
```bash
npm start
```

4. For development with auto-reload:
```bash
npm run dev
```

## Available Endpoints

- `GET /api/apod` - Today's APOD
- `GET /api/apod?date=YYYY-MM-DD` - Specific date
- `GET /api/apod/range?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Date range
- `GET /api/apod/random?count=10` - Random APODs
- `GET /health` - Health check
- `GET /api/cache/stats` - Cache statistics

## Features

- ✅ RESTful API design
- ✅ In-memory caching with TTL
- ✅ Max cache size management
- ✅ Secure API key handling
- ✅ Error handling
- ✅ CORS enabled
- ✅ Request logging

## Tech Stack

- Express.js
- Axios
- node-cache
- dotenv
- cors

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NASA_API_KEY | Your NASA API key | DEMO_KEY |
| PORT | Server port | 3001 |
| CACHE_TTL | Cache time to live (seconds) | 3600 |
| CACHE_MAX_KEYS | Maximum cache entries | 100 |

Get your NASA API key: https://api.nasa.gov/

