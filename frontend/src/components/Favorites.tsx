import React, { useState, useEffect } from 'react';
import { APOD } from '../types/apod';
import { getFavorites, clearFavorites } from '../utils/favorites';
import APODCard from './APODCard';
import APODModal from './APODModal';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<APOD[]>([]);
  const [selectedAPOD, setSelectedAPOD] = useState<APOD | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
      loadFavorites();
    }
  };

  const handleCardClick = (apod: APOD) => {
    setSelectedAPOD(apod);
  };

  const handleCloseModal = () => {
    setSelectedAPOD(null);
    loadFavorites(); // Refresh in case favorite was removed
  };

  return (
    <div className="favorites fade-in">
      <div className="favorites-header">
        <div>
          <h2>❤️ My Favorites</h2>
          <p className="subtitle">Your collection of amazing space imagery</p>
        </div>
        {favorites.length > 0 && (
          <button className="clear-all-button" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">🌟</div>
          <h3>No favorites yet</h3>
          <p>Start exploring and add your favorite APODs by clicking the heart icon!</p>
        </div>
      ) : (
        <>
          <div className="favorites-count">
            <p>{favorites.length} favorite{favorites.length !== 1 ? 's' : ''} saved</p>
          </div>

          <div className="gallery-grid">
            {favorites.map((apod) => (
              <APODCard
                key={apod.date}
                apod={apod}
                onClick={() => handleCardClick(apod)}
              />
            ))}
          </div>
        </>
      )}

      {selectedAPOD && (
        <APODModal apod={selectedAPOD} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Favorites;

