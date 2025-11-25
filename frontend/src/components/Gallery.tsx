import React, { useState, useEffect } from 'react';
import { getAPODRange } from '../services/api';
import { APOD } from '../types/apod';
import { format, subDays } from 'date-fns';
import APODCard from './APODCard';
import APODModal from './APODModal';
import SearchBar from './SearchBar';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [apods, setApods] = useState<APOD[]>([]);
  const [filteredApods, setFilteredApods] = useState<APOD[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAPOD, setSelectedAPOD] = useState<APOD | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mediaFilter, setMediaFilter] = useState<string>('all');
  const [copyrightFilter, setCopyrightFilter] = useState<string>('all');

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 30);
    const start = format(thirtyDaysAgo, 'yyyy-MM-dd');
    const end = format(today, 'yyyy-MM-dd');
    
    setStartDate(start);
    setEndDate(end);
    fetchAPODs(start, end);
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apods, searchQuery, mediaFilter, copyrightFilter]);

  const fetchAPODs = async (start: string, end: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAPODRange(start, end);
      const sortedData = data.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setApods(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch APODs');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...apods];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apod =>
        apod.title.toLowerCase().includes(query) ||
        apod.explanation.toLowerCase().includes(query) ||
        (apod.copyright && apod.copyright.toLowerCase().includes(query))
      );
    }

    if (mediaFilter !== 'all') {
      filtered = filtered.filter(apod => apod.media_type === mediaFilter);
    }

    if (copyrightFilter === 'with') {
      filtered = filtered.filter(apod => apod.copyright);
    } else if (copyrightFilter === 'without') {
      filtered = filtered.filter(apod => !apod.copyright);
    }

    setFilteredApods(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDateRangeSearch = () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        setError('Start date must be before end date');
        return;
      }
      fetchAPODs(startDate, endDate);
    }
  };

  const handleQuickFilter = (days: number) => {
    const today = new Date();
    const pastDate = subDays(today, days);
    const start = format(pastDate, 'yyyy-MM-dd');
    const end = format(today, 'yyyy-MM-dd');
    
    setStartDate(start);
    setEndDate(end);
    fetchAPODs(start, end);
  };

  const handleCardClick = (apod: APOD) => {
    setSelectedAPOD(apod);
  };

  const handleCloseModal = () => {
    setSelectedAPOD(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => fetchAPODs(startDate, endDate)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="gallery fade-in">
      <div className="gallery-header">
        <h2>APOD Gallery</h2>
        <p className="subtitle">Explore the wonders of space through NASA's archive</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="gallery-controls">
        <div className="date-range-picker">
          <div className="input-group">
            <label htmlFor="start-date">From:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
              min="1995-06-16"
              className="date-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="end-date">To:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              max={format(new Date(), 'yyyy-MM-dd')}
              min="1995-06-16"
              className="date-input"
            />
          </div>
          <button className="search-button" onClick={handleDateRangeSearch}>
            Search
          </button>
        </div>

        <div className="quick-filters">
          <span className="filter-label">Quick filters:</span>
          <button className="filter-button" onClick={() => handleQuickFilter(7)}>
            Last 7 days
          </button>
          <button className="filter-button" onClick={() => handleQuickFilter(30)}>
            Last 30 days
          </button>
          <button className="filter-button" onClick={() => handleQuickFilter(90)}>
            Last 90 days
          </button>
        </div>

        <div className="advanced-filters">
          <div className="filter-group">
            <label>Media Type:</label>
            <select value={mediaFilter} onChange={(e) => setMediaFilter(e.target.value)} className="filter-select">
              <option value="all">All</option>
              <option value="image">Images Only</option>
              <option value="video">Videos Only</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Copyright:</label>
            <select value={copyrightFilter} onChange={(e) => setCopyrightFilter(e.target.value)} className="filter-select">
              <option value="all">All</option>
              <option value="with">With Copyright</option>
              <option value="without">Without Copyright</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredApods.length} of {apods.length} results</p>
      </div>

      <div className="gallery-grid">
        {filteredApods.map((apod) => (
          <APODCard
            key={apod.date}
            apod={apod}
            onClick={() => handleCardClick(apod)}
          />
        ))}
      </div>

      {filteredApods.length === 0 && apods.length > 0 && (
        <div className="no-results">
          <p>No results match your search or filters. Try adjusting your criteria.</p>
        </div>
      )}

      {apods.length === 0 && !loading && (
        <div className="no-results">
          <p>No results found for the selected date range.</p>
        </div>
      )}

      {selectedAPOD && (
        <APODModal apod={selectedAPOD} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Gallery;

