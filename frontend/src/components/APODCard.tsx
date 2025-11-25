import React from 'react';
import { APOD } from '../types/apod';
import { format } from 'date-fns';
import FavoriteButton from './FavoriteButton';
import './APODCard.css';

interface APODCardProps {
  apod: APOD;
  onClick: () => void;
}

const APODCard: React.FC<APODCardProps> = ({ apod, onClick }) => {
  const getThumbnail = () => {
    if (apod.media_type === 'image') {
      return apod.url;
    }
    return apod.thumbnail_url || apod.url;
  };

  return (
    <div className="apod-card" onClick={onClick}>
      <div className="card-image-container">
        <div className="card-favorite-btn">
          <FavoriteButton apod={apod} />
        </div>
        {apod.media_type === 'video' && (
          <div className="video-badge">
            <span>▶ Video</span>
          </div>
        )}
        <img
          src={getThumbnail()}
          alt={apod.title}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23151b3b" width="300" height="200"/%3E%3Ctext fill="%23b0b8d4" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
        <div className="card-overlay">
          <span>View Details</span>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{apod.title}</h3>
        <p className="card-date">{format(new Date(apod.date), 'MMM dd, yyyy')}</p>
        {apod.copyright && (
          <p className="card-copyright">© {apod.copyright}</p>
        )}
      </div>
    </div>
  );
};

export default APODCard;

