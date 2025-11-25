import React, { useState, useEffect } from 'react';
import { getAPOD } from '../services/api';
import { APOD } from '../types/apod';
import { format } from 'date-fns';
import FavoriteButton from './FavoriteButton';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [apod, setApod] = useState<APOD | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPOD = async (date?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAPOD(date);
      setApod(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch APOD');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchAPOD(date);
  };

  const handleToday = () => {
    setSelectedDate('');
    fetchAPOD();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Astronomy Picture of the Day...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => fetchAPOD()}>
          Retry
        </button>
      </div>
    );
  }

  if (!apod) return null;

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <div className="header-info">
          <h2>Astronomy Picture of the Day</h2>
          <p className="date">{format(new Date(apod.date), 'MMMM dd, yyyy')}</p>
        </div>
        <div className="date-picker-container">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            max={format(new Date(), 'yyyy-MM-dd')}
            min="1995-06-16"
            className="date-picker"
          />
          <button className="today-button" onClick={handleToday}>
            Today
          </button>
        </div>
      </div>

      <div className="apod-container">
        <div className="media-container">
          <div className="dashboard-favorite-btn">
            <FavoriteButton apod={apod} />
          </div>
          {apod.media_type === 'image' ? (
            <a href={apod.hdurl || apod.url} target="_blank" rel="noopener noreferrer">
              <img
                src={apod.url}
                alt={apod.title}
                className="apod-image"
                loading="lazy"
              />
              <div className="image-overlay">
                <span>🔍 View HD Image</span>
              </div>
            </a>
          ) : (
            <div className="video-container">
              <iframe
                src={apod.url}
                title={apod.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="apod-video"
              ></iframe>
            </div>
          )}
        </div>

        <div className="info-container">
          <div className="title-section">
            <h1 className="apod-title">{apod.title}</h1>
            {apod.copyright && (
              <p className="copyright">© {apod.copyright}</p>
            )}
          </div>

          <div className="explanation-section">
            <h3>Description</h3>
            <p className="explanation">{apod.explanation}</p>
          </div>

          <div className="metadata">
            <div className="metadata-item">
              <span className="metadata-label">Date:</span>
              <span className="metadata-value">{apod.date}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Media Type:</span>
              <span className="metadata-value">{apod.media_type}</span>
            </div>
            {apod.hdurl && (
              <div className="metadata-item">
                <a 
                  href={apod.hdurl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  Download HD Image →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

