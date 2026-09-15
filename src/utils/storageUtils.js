/**
 * Safe LocalStorage helpers with fallback handling
 * RepFuelAI Experimental Storage Utilities
 */

export const safeGetStorage = (key, fallbackValue) => {
  if (typeof window === 'undefined') return fallbackValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallbackValue;
  } catch (error) {
    console.warn(`[RepFuelAI] Error reading localStorage key "${key}":`, error);
    return fallbackValue;
  }
};

export const safeSetStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[RepFuelAI] Error saving localStorage key "${key}":`, error);
  }
};
