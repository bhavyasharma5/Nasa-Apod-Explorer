# NASA APOD Explorer - Frontend

Beautiful, responsive React application for exploring NASA's Astronomy Picture of the Day.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- ✅ Dashboard with today's APOD
- ✅ Date picker for historical APODs
- ✅ Gallery view with date range filtering
- ✅ Detail modal with full descriptions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Support for images and videos
- ✅ HD image downloads
- ✅ Beautiful animations

## Tech Stack

- React 18
- TypeScript
- React Router
- Axios
- date-fns
- CSS3 with animations

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Gallery.tsx         # Gallery view
│   ├── APODCard.tsx        # Card component
│   └── APODModal.tsx       # Detail modal
├── services/
│   └── api.ts              # API service
├── types/
│   └── apod.ts             # TypeScript types
└── App.tsx                 # Main app
```

## Configuration

The app connects to the backend API at `http://localhost:3001` by default.

To change the API URL, set the `REACT_APP_API_URL` environment variable.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design System

- Modern dark theme
- Smooth animations
- Responsive grid layouts
- Accessible UI components

