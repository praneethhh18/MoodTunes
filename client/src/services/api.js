/**
 * API service for communicating with the MoodTunes backend
 */

const API_BASE_URL = '/api';

/**
 * Fetch song recommendations based on mood
 * @param {string} mood - The detected mood
 * @param {number} limit - Maximum number of songs to return
 * @returns {Promise<Object>} Promise resolving to recommendation response
 */
export async function getRecommendations(mood, limit = 5) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendation?mood=${encodeURIComponent(mood)}&limit=${limit}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    throw error;
  }
}

/**
 * Fetch available moods
 * @returns {Promise<Array>} Promise resolving to array of available moods
 */
export async function getAvailableMoods() {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendation/moods`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.moods;
  } catch (error) {
    console.error('Failed to fetch available moods:', error);
    throw error;
  }
}

/**
 * Check if the API server is healthy
 * @returns {Promise<boolean>} Promise resolving to true if server is healthy
 */
export async function checkServerHealth() {
  try {
    const response = await fetch('/health');
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
}