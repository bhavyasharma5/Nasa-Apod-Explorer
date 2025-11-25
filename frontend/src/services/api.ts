import axios from 'axios';
import { APOD, APIResponse } from '../types/apod';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAPOD = async (date?: string): Promise<APOD> => {
  try {
    const params = date ? { date } : {};
    const response = await api.get<APIResponse<APOD>>('/apod', { params });
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.error || 'Failed to fetch APOD');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message);
    }
    throw error;
  }
};

export const getAPODRange = async (startDate: string, endDate: string): Promise<APOD[]> => {
  try {
    const response = await api.get<APIResponse<APOD[]>>('/apod/range', {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.error || 'Failed to fetch APOD range');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message);
    }
    throw error;
  }
};

export const getRandomAPODs = async (count: number = 10): Promise<APOD[]> => {
  try {
    const response = await api.get<APIResponse<APOD[]>>('/apod/random', {
      params: { count },
    });
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.error || 'Failed to fetch random APODs');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || error.message);
    }
    throw error;
  }
};

export default api;

