const axios = require('axios');
const cacheManager = require('../config/cache');

const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/apod';
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

class NASAService {
  async getAPOD(date = null) {
    const cacheKey = `apod_${date || 'today'}`;
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const params = {
        api_key: NASA_API_KEY
      };

      if (date) {
        params.date = date;
      }

      const response = await axios.get(NASA_API_BASE_URL, { params });
      const data = response.data;

      // Cache the response
      cacheManager.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error('Error fetching APOD:', error.message);
      throw this.handleAPIError(error);
    }
  }

  async getAPODRange(startDate, endDate) {
    const cacheKey = `apod_range_${startDate}_${endDate}`;
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const params = {
        api_key: NASA_API_KEY,
        start_date: startDate,
        end_date: endDate
      };

      const response = await axios.get(NASA_API_BASE_URL, { params });
      const data = response.data;

      // Cache the response
      cacheManager.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error('Error fetching APOD range:', error.message);
      throw this.handleAPIError(error);
    }
  }

  async getRandomAPODs(count = 10) {
    const cacheKey = `apod_random_${count}_${Date.now()}`;

    try {
      const params = {
        api_key: NASA_API_KEY,
        count: Math.min(count, 100)
      };

      const response = await axios.get(NASA_API_BASE_URL, { params });
      const data = response.data;

      return data;
    } catch (error) {
      console.error('Error fetching random APODs:', error.message);
      throw this.handleAPIError(error);
    }
  }

  handleAPIError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.msg || error.response.data?.message || 'NASA API error';
      
      const err = new Error(message);
      err.status = status;
      return err;
    } else if (error.request) {
      const err = new Error('No response from NASA API');
      err.status = 503;
      return err;
    } else {
      const err = new Error('Error setting up NASA API request');
      err.status = 500;
      return err;
    }
  }
}

module.exports = new NASAService();

