# 🚀 NASA APOD Explorer

A modern, full-stack web application that showcases NASA's Astronomy Picture of the Day (APOD) using a RESTful backend service and a beautiful React frontend.

![NASA APOD Explorer](https://img.shields.io/badge/NASA-APOD%20Explorer-blue)
![Node.js](https://img.shields.io/badge/node.js-v16+-green)
![React](https://img.shields.io/badge/react-v18+-blue)
![TypeScript](https://img.shields.io/badge/typescript-v4.9+-blue)

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Caching Strategy](#caching-strategy)
- [Screenshots](#screenshots)

## ✨ Features

### Backend Service
- ✅ RESTful API endpoints for NASA APOD data
- ✅ Intelligent caching with TTL (Time To Live) and max size limits
- ✅ Secure API key management using environment variables
- ✅ Error handling and validation
- ✅ CORS enabled for cross-origin requests
- ✅ Health check and cache statistics endpoints

### Frontend Application
- ✅ **Dashboard View**: Display today's APOD with date picker
- ✅ **Gallery View**: Browse multiple APODs with advanced filtering
- ✅ **Favorites System**: Save and manage favorite APODs (localStorage)
- ✅ **Random Explorer**: Discover random APODs from the archive
- ✅ **Statistics Dashboard**: Visual analytics and insights
- ✅ **Search Functionality**: Full-text search across title/description
- ✅ **Advanced Filters**: Media type, copyright, date ranges
- ✅ **Detail Modal**: Expanded view with full descriptions
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Beautiful modern UI with smooth animations
- ✅ Support for both images and videos
- ✅ HD image download functionality
- ✅ Quick date filters (7, 30, 90 days)

## 🏗️ Architecture

```
┌─────────────┐      HTTP       ┌─────────────┐      HTTPS      ┌─────────────┐
│   React     │ ────────────────▶│   Express   │ ───────────────▶│  NASA API   │
│   Frontend  │                  │   Backend   │                 │             │
│  (Port 3000)│ ◀────────────────│ (Port 3001) │ ◀───────────────│             │
└─────────────┘    JSON/REST     └─────────────┘   JSON Response └─────────────┘
                                        │
                                        │
                                        ▼
                                 ┌─────────────┐
                                 │  Cache Layer│
                                 │  (In-Memory)│
                                 └─────────────┘
```

### Design Principles

1. **Separation of Concerns**: Backend and frontend are completely decoupled
2. **RESTful API Design**: Standard HTTP methods and status codes
3. **Caching Strategy**: LRU cache with TTL for optimal performance
4. **Error Handling**: Comprehensive error handling at all layers
5. **Security**: API keys stored in environment variables, never exposed
6. **Scalability**: Modular architecture ready for extensions

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **node-cache** - In-memory caching
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **date-fns** - Date formatting and manipulation
- **CSS3** - Modern styling with animations

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

Verify your installations:

```bash
node --version
npm --version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "Finfactor Assignment"
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` with your NASA API key:

```env
# NASA API Configuration
NASA_API_KEY=DEMO_KEY
PORT=3001

# Cache Configuration
CACHE_TTL=3600
CACHE_MAX_KEYS=100
```

**Get Your NASA API Key:**
- Visit [NASA API Portal](https://api.nasa.gov/)
- Click "Generate API Key"
- It's free and instant!
- Use `DEMO_KEY` for testing (rate-limited)

### Frontend Configuration

The frontend is pre-configured to connect to `http://localhost:3001`. No additional configuration needed!

## 🏃 Running the Application

### Option 1: Run Both Services Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Development Mode with Auto-reload

**Backend (with nodemon):**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

### Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001](http://localhost:3001)
- **Health Check:** [http://localhost:3001/health](http://localhost:3001/health)

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Get Today's APOD
```http
GET /api/apod
```

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-15",
    "title": "Mars at Opposition",
    "explanation": "...",
    "url": "https://...",
    "hdurl": "https://...",
    "media_type": "image",
    "copyright": "John Doe"
  }
}
```

#### 2. Get APOD for Specific Date
```http
GET /api/apod?date=2024-01-15
```

**Query Parameters:**
- `date` (string, optional): Date in YYYY-MM-DD format

#### 3. Get APOD Range
```http
GET /api/apod/range?start_date=2024-01-01&end_date=2024-01-31
```

**Query Parameters:**
- `start_date` (string, required): Start date in YYYY-MM-DD format
- `end_date` (string, required): End date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "count": 31,
  "data": [...]
}
```

#### 4. Get Random APODs
```http
GET /api/apod/random?count=10
```

**Query Parameters:**
- `count` (number, optional): Number of random APODs (1-100, default: 10)

#### 5. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "cache": {
    "keys": 5,
    "hits": 10,
    "misses": 3
  }
}
```

#### 6. Cache Statistics
```http
GET /api/cache/stats
```

### Error Responses

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error
- `503` - Service Unavailable (NASA API down)

## 📁 Project Structure

```
Finfactor Assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── cache.js           # Cache configuration
│   │   ├── routes/
│   │   │   └── apod.js            # APOD routes
│   │   ├── services/
│   │   │   └── nasaService.js     # NASA API service
│   │   └── server.js              # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx      # Dashboard view
│   │   │   ├── Dashboard.css
│   │   │   ├── Gallery.tsx        # Gallery view
│   │   │   ├── Gallery.css
│   │   │   ├── APODCard.tsx       # Card component
│   │   │   ├── APODCard.css
│   │   │   ├── APODModal.tsx      # Detail modal
│   │   │   └── APODModal.css
│   │   ├── services/
│   │   │   └── api.ts             # API service
│   │   ├── types/
│   │   │   └── apod.ts            # TypeScript types
│   │   ├── App.tsx                # Main app component
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

## 💾 Caching Strategy

The backend implements a sophisticated caching mechanism:

### Cache Configuration
- **TTL (Time To Live):** 3600 seconds (1 hour) by default
- **Max Keys:** 100 entries
- **Strategy:** LRU (Least Recently Used)

### How It Works

1. **First Request:** Data fetched from NASA API and cached
2. **Subsequent Requests:** Data served from cache (instant)
3. **Cache Expiry:** After TTL, data is automatically removed
4. **Cache Full:** Oldest entries removed when limit reached

### Benefits
- ⚡ **Fast Response Times:** Cached responses in milliseconds
- 💰 **API Rate Limit Friendly:** Reduces NASA API calls
- 🔄 **Automatic Management:** Self-cleaning with TTL
- 📊 **Monitoring:** Cache statistics available via API

### Cache Keys Format
- Today's APOD: `apod_today`
- Specific date: `apod_2024-01-15`
- Date range: `apod_range_2024-01-01_2024-01-31`

## 🎨 Screenshots

### Dashboard View
The main dashboard shows today's APOD with a date picker to view past images.

![Dashboard](./Screenshots/Screenshot%202025-11-25%20at%2021.58.46.png)

### Gallery View
Browse multiple APODs with customizable date ranges and quick filters.

![Gallery](./Screenshots/Screenshot%202025-11-25%20at%2021.59.09.png)

### Favorites Page
Your personal collection of saved APODs with persistent storage.

![Favorites](./Screenshots/Screenshot%202025-11-25%20at%2021.59.30.png)

### Random Explorer
Discover random APODs from NASA's archive.

![Random Explorer](./Screenshots/Screenshot%202025-11-25%20at%2022.00.39.png)

### Statistics Dashboard
Visual analytics and insights from APOD data.

![Statistics](./Screenshots/Screenshot%202025-11-25%20at%2022.00.59.png)

## 🔒 Security Best Practices

1. **API Key Protection:**
   - Never commit `.env` files
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **CORS Configuration:**
   - Configured for local development
   - Update for production deployment

3. **Input Validation:**
   - Date format validation
   - Range checks
   - Type checking

## 🚀 Production Deployment

### Backend Deployment

**Environment Variables:**
```env
NODE_ENV=production
NASA_API_KEY=your_actual_key
PORT=3001
CACHE_TTL=3600
CACHE_MAX_KEYS=100
```

**Build & Deploy:**
```bash
cd backend
npm start
```

### Frontend Deployment

**Build:**
```bash
cd frontend
npm run build
```

The `build` folder contains optimized production files ready for deployment.

**Deployment Platforms:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- Heroku

## 🧪 Testing

### Backend
Test API endpoints using:
- **Browser:** Navigate to `http://localhost:3001/api/apod`
- **Postman:** Import endpoints and test
- **cURL:**
```bash
curl http://localhost:3001/api/apod
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Code Quality

This project follows:
- ✅ RESTful API best practices
- ✅ Component-based architecture
- ✅ TypeScript for type safety
- ✅ Clean code principles
- ✅ Responsive design patterns
- ✅ Error handling at all levels

## 🌟 Unique Features That Stand Out

This implementation goes beyond the basic requirements with:

### 1. **Favorites System** ❤️
- Save your favorite APODs to localStorage
- Persists across browser sessions
- Dedicated favorites page
- Animated heart button

### 2. **Advanced Search & Filters** 🔍
- Full-text search across titles and descriptions
- Filter by media type (images/videos)
- Filter by copyright status
- Real-time filtering without API calls

### 3. **Random Explorer** 🎲
- Discover random APODs from the archive
- Configurable count (6-50 images)
- Perfect for serendipitous exploration

### 4. **Statistics Dashboard** 📊
- Visual analytics of APOD data
- Time-based analysis (7 days to 1 year)
- Media distribution charts
- Copyright analysis with progress bars
- Content insights (description length, title analysis)

### 5. **Enhanced Gallery**
- Search + multiple filters combined
- Quick date presets
- Responsive grid layout
- Hover effects and micro-interactions

## 🎯 Future Enhancements

Additional potential improvements:
- [ ] Social sharing
- [ ] Progressive Web App (PWA)
- [ ] Database persistence for multi-device sync
- [ ] User authentication
- [ ] Comments/ratings system
- [ ] Multi-language support
- [ ] Slideshow mode
- [ ] Export favorites as PDF

---

**Made with ❤️ and ☕**

*Exploring the cosmos, one picture at a time!* 🌌

