# Quick Setup Guide

Follow these steps to get NASA APOD Explorer running on your machine.

## Prerequisites

✅ Node.js v16+ installed  
✅ npm v8+ installed

## Setup Steps

### 1️⃣ Clone or Download

```bash
cd "Finfactor Assignment"
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
NASA_API_KEY=DEMO_KEY
PORT=3001
CACHE_TTL=3600
CACHE_MAX_KEYS=100
```

**Note:** Get a free NASA API key at https://api.nasa.gov/ or use `DEMO_KEY` for testing.

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
```

### 4️⃣ Start Backend

Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║         NASA APOD Explorer - Backend Service             ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on: http://localhost:3001                ║
║  Environment: development                                 ║
║  Cache TTL: 3600s                                         ║
║  Cache Max Keys: 100                                      ║
╚═══════════════════════════════════════════════════════════╝
```

### 5️⃣ Start Frontend

Open a **new terminal** and run:
```bash
cd frontend
npm start
```

Your browser will automatically open http://localhost:3000

## Verification

✅ Backend API: http://localhost:3001  
✅ Frontend App: http://localhost:3000  
✅ Health Check: http://localhost:3001/health  
✅ API Test: http://localhost:3001/api/apod

## Troubleshooting

### Port Already in Use

**Backend (3001):**
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Frontend (3000):**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Module Not Found

```bash
# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
```

### NASA API Key Issues

- Use `DEMO_KEY` for testing (has rate limits)
- Get free API key: https://api.nasa.gov/
- Check `.env` file exists in `backend/` directory
- Ensure no spaces around `=` in `.env` file

### CORS Errors

- Ensure backend is running on port 3001
- Ensure frontend is running on port 3000
- Check browser console for detailed error messages

## Development Mode

For auto-reload during development:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

---

**You're all set! Enjoy exploring the cosmos! 🚀🌌**

