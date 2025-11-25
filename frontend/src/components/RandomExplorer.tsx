import React, { useState } from 'react';
import { getRandomAPODs } from '../services/api';
import { APOD } from '../types/apod';
import APODCard from './APODCard';
import APODModal from './APODModal';
import './RandomExplorer.css';

const RandomExplorer: React.FC = () => {
  const [apods, setApods] = useState<APOD[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAPOD, setSelectedAPOD] = useState<APOD | null>(null);
  const [count, setCount] = useState(12);

  const fetchRandomAPODs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRandomAPODs(count);
      setApods(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random APODs');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (apod: APOD) => {
    setSelectedAPOD(apod);
  };

  const handleCloseModal = () => {
    setSelectedAPOD(null);
  };

  return (
    <div className="random-explorer fade-in">
      <div className="explorer-header">
        <div>
          <h2>🎲 Random Explorer</h2>
          <p className="subtitle">Discover random treasures from NASA's APOD archive</p>
        </div>
      </div>

      <div className="explorer-controls">
        <div className="count-selector">
          <label htmlFor="apod-count">Number of APODs:</label>
          <select
            id="apod-count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="count-select"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>

        <button
          className="explore-button"
          onClick={fetchRandomAPODs}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-small"></span>
              Loading...
            </>
          ) : (
            <>
              🎲 Explore Random APODs
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchRandomAPODs}>
            Try Again
          </button>
        </div>
      )}

      {apods.length > 0 && (
        <>
          <div className="results-info">
            <p>Showing {apods.length} random APODs</p>
          </div>

          <div className="gallery-grid">
            {apods.map((apod) => (
              <APODCard
                key={`${apod.date}-${apod.title}`}
                apod={apod}
                onClick={() => handleCardClick(apod)}
              />
            ))}
          </div>
        </>
      )}

      {!loading && apods.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <h3>Ready to Explore?</h3>
          <p>Click the button above to discover random astronomy pictures from NASA's archive!</p>
        </div>
      )}

      {selectedAPOD && (
        <APODModal apod={selectedAPOD} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default RandomExplorer;

