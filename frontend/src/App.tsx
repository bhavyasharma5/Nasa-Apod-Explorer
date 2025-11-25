import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import RandomExplorer from './components/RandomExplorer';
import Statistics from './components/Statistics';
import './App.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <h1>🚀 NASA APOD Explorer</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>
                Favorites
              </Link>
            </li>
            <li>
              <Link to="/random" className={location.pathname === '/random' ? 'active' : ''}>
                Random
              </Link>
            </li>
            <li>
              <Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>
                Statistics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/random" element={<RandomExplorer />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

