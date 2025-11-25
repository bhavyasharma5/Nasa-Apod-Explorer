import React, { useEffect } from 'react';
import { APOD } from '../types/apod';
import { format } from 'date-fns';
import './APODModal.css';

interface APODModalProps {
  apod: APOD;
  onClose: () => void;
}

const APODModal: React.FC<APODModalProps> = ({ apod, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-media">
          {apod.media_type === 'image' ? (
            <img
              src={apod.hdurl || apod.url}
              alt={apod.title}
              className="modal-image"
            />
          ) : (
            <div className="modal-video-container">
              <iframe
                src={apod.url}
                title={apod.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="modal-video"
              ></iframe>
            </div>
          )}
        </div>

        <div className="modal-info">
          <div className="modal-header">
            <h2 className="modal-title">{apod.title}</h2>
            <p className="modal-date">{format(new Date(apod.date), 'MMMM dd, yyyy')}</p>
            {apod.copyright && (
              <p className="modal-copyright">© {apod.copyright}</p>
            )}
          </div>

          <div className="modal-description">
            <p>{apod.explanation}</p>
          </div>

          <div className="modal-actions">
            {apod.hdurl && (
              <a 
                href={apod.hdurl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button primary"
              >
                Download HD Image
              </a>
            )}
            <button className="action-button secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APODModal;

