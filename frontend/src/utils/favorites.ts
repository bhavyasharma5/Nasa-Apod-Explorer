import { APOD } from '../types/apod';

const FAVORITES_KEY = 'nasa_apod_favorites';

export const getFavorites = (): APOD[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const addFavorite = (apod: APOD): boolean => {
  try {
    const favorites = getFavorites();
    
    if (favorites.some(fav => fav.date === apod.date)) {
      return false;
    }
    
    favorites.unshift(apod);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

export const removeFavorite = (date: string): boolean => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav.date !== date);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const isFavorite = (date: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.date === date);
};

export const clearFavorites = (): boolean => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
};

export const getFavoritesCount = (): number => {
  return getFavorites().length;
};

