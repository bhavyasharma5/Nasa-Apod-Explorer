import React, { useState, useEffect } from 'react';
import { APOD } from '../types/apod';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  apod: APOD;
  onToggle?: (isFav: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ apod, onToggle }) => {
  const [favorited, setFavorited] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(apod.date));
  }, [apod.date]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (favorited) {
      removeFavorite(apod.date);
      setFavorited(false);
      onToggle?.(false);
    } else {
      addFavorite(apod);
      setFavorited(true);
      onToggle?.(true);
    }
  };

  return (
    <button
      className={`favorite-button ${favorited ? 'favorited' : ''} ${animating ? 'animating' : ''}`}
      onClick={handleToggle}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span className="heart-icon">
        {favorited ? '❤️' : '🤍'}
      </span>
    </button>
  );
};

export default FavoriteButton;

