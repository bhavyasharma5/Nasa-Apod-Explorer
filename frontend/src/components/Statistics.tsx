import React, { useState, useEffect } from 'react';
import { getAPODRange } from '../services/api';
import { APOD } from '../types/apod';
import { format, subDays } from 'date-fns';
import { getFavoritesCount } from '../utils/favorites';
import './Statistics.css';

interface Stats {
  totalImages: number;
  totalVideos: number;
  withCopyright: number;
  withoutCopyright: number;
  averageExplanationLength: number;
  longestTitle: { title: string; length: number };
  shortestTitle: { title: string; length: number };
}

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(30);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    fetchStatistics();
    setFavoritesCount(getFavoritesCount());
  }, [period]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      const startDate = format(subDays(today, period), 'yyyy-MM-dd');
      const endDate = format(today, 'yyyy-MM-dd');

      const data = await getAPODRange(startDate, endDate);
      calculateStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (apods: APOD[]) => {
    const totalImages = apods.filter(a => a.media_type === 'image').length;
    const totalVideos = apods.filter(a => a.media_type === 'video').length;
    const withCopyright = apods.filter(a => a.copyright).length;
    const withoutCopyright = apods.length - withCopyright;

    const totalExplanationLength = apods.reduce((sum, a) => sum + a.explanation.length, 0);
    const averageExplanationLength = Math.round(totalExplanationLength / apods.length);

    const sortedByTitle = [...apods].sort((a, b) => a.title.length - b.title.length);
    const longestTitle = {
      title: sortedByTitle[sortedByTitle.length - 1]?.title || '',
      length: sortedByTitle[sortedByTitle.length - 1]?.title.length || 0
    };
    const shortestTitle = {
      title: sortedByTitle[0]?.title || '',
      length: sortedByTitle[0]?.title.length || 0
    };

    setStats({
      totalImages,
      totalVideos,
      withCopyright,
      withoutCopyright,
      averageExplanationLength,
      longestTitle,
      shortestTitle
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Calculating statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={fetchStatistics}>
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const totalAPODs = stats.totalImages + stats.totalVideos;
  const imagePercentage = totalAPODs > 0 ? Math.round((stats.totalImages / totalAPODs) * 100) : 0;
  const videoPercentage = totalAPODs > 0 ? Math.round((stats.totalVideos / totalAPODs) * 100) : 0;
  const copyrightPercentage = totalAPODs > 0 ? Math.round((stats.withCopyright / totalAPODs) * 100) : 0;

  return (
    <div className="statistics fade-in">
      <div className="stats-header">
        <div>
          <h2>📊 Statistics</h2>
          <p className="subtitle">Insights from NASA's APOD archive</p>
        </div>

        <div className="period-selector">
          <label>Time Period:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="period-select"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 6 months</option>
            <option value={365}>Last year</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        {/* Overview Cards */}
        <div className="stat-card highlight">
          <div className="stat-icon">🌌</div>
          <div className="stat-content">
            <h3>{totalAPODs}</h3>
            <p>Total APODs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🖼️</div>
          <div className="stat-content">
            <h3>{stats.totalImages}</h3>
            <p>Images ({imagePercentage}%)</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎬</div>
          <div className="stat-content">
            <h3>{stats.totalVideos}</h3>
            <p>Videos ({videoPercentage}%)</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-content">
            <h3>{favoritesCount}</h3>
            <p>Your Favorites</p>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="detailed-stats">
        <div className="stat-section">
          <h3>📷 Copyright Information</h3>
          <div className="stat-row">
            <span>With Copyright:</span>
            <strong>{stats.withCopyright} ({copyrightPercentage}%)</strong>
          </div>
          <div className="stat-row">
            <span>Without Copyright:</span>
            <strong>{stats.withoutCopyright} ({100 - copyrightPercentage}%)</strong>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill copyright"
              style={{ width: `${copyrightPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-section">
          <h3>📝 Description Analysis</h3>
          <div className="stat-row">
            <span>Average Explanation Length:</span>
            <strong>{stats.averageExplanationLength} characters</strong>
          </div>
          <div className="stat-row">
            <span>Longest Title:</span>
            <strong>{stats.longestTitle.length} chars</strong>
          </div>
          <div className="stat-box">
            <p className="truncate">"{stats.longestTitle.title}"</p>
          </div>
          <div className="stat-row">
            <span>Shortest Title:</span>
            <strong>{stats.shortestTitle.length} chars</strong>
          </div>
          <div className="stat-box">
            <p>"{stats.shortestTitle.title}"</p>
          </div>
        </div>

        <div className="stat-section">
          <h3>📈 Media Distribution</h3>
          <div className="chart">
            <div className="chart-bar">
              <div className="chart-label">Images</div>
              <div className="chart-bar-container">
                <div
                  className="chart-bar-fill images"
                  style={{ width: `${imagePercentage}%` }}
                >
                  <span>{imagePercentage}%</span>
                </div>
              </div>
            </div>
            <div className="chart-bar">
              <div className="chart-label">Videos</div>
              <div className="chart-bar-container">
                <div
                  className="chart-bar-fill videos"
                  style={{ width: `${videoPercentage}%` }}
                >
                  <span>{videoPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

