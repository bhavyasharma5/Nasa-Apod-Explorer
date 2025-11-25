const express = require('express');
const router = express.Router();
const nasaService = require('../services/nasaService');

router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    if (date && !isValidDate(date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    const data = await nasaService.getAPOD(date);

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error in /api/apod:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

router.get('/range', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'start_date and end_date are required'
      });
    }

    if (!isValidDate(start_date) || !isValidDate(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format. Use YYYY-MM-DD'
      });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({
        success: false,
        error: 'start_date must be before end_date'
      });
    }

    const data = await nasaService.getAPODRange(start_date, end_date);

    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error('Error in /api/apod/range:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

router.get('/random', async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;

    if (count < 1 || count > 100) {
      return res.status(400).json({
        success: false,
        error: 'count must be between 1 and 100'
      });
    }

    const data = await nasaService.getRandomAPODs(count);

    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error('Error in /api/apod/random:', error);
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return dateString === date.toISOString().split('T')[0];
}

module.exports = router;

