const songData = require('../data/songData');

/**
 * Service for handling mood-based song recommendations
 * TODO: Extend this service to integrate with external APIs (Spotify, Apple Music, etc.)
 * TODO: Implement collaborative filtering and personalized recommendations
 * TODO: Add user preference learning and history tracking
 */
class RecommendationService {
  /**
   * Get recommended songs based on detected mood
   * @param {string} mood - The detected mood (happy, sad, neutral, angry, relaxed)
   * @param {number} limit - Maximum number of songs to return (default: 5)
   * @returns {Array} Array of recommended songs
   */
  static getRecommendationsByMood(mood, limit = 5) {
    // Normalize mood input
    const normalizedMood = mood.toLowerCase().trim();
    
    // Validate mood
    const validMoods = ['happy', 'sad', 'neutral', 'angry', 'relaxed'];
    if (!validMoods.includes(normalizedMood)) {
      throw new Error(`Invalid mood: ${mood}. Valid moods are: ${validMoods.join(', ')}`);
    }
    
    // Get songs for the mood
    const moodSongs = songData[normalizedMood] || [];
    
    // Return limited number of songs
    return moodSongs.slice(0, Math.max(1, Math.min(limit, moodSongs.length)));
  }
  
  /**
   * Get all available moods
   * @returns {Array} Array of available mood strings
   */
  static getAvailableMoods() {
    return Object.keys(songData);
  }
  
  /**
   * TODO: Implement Spotify API integration
   * @param {string} mood - The detected mood
   * @param {string} accessToken - Spotify access token
   * @returns {Promise<Array>} Promise resolving to array of Spotify tracks
   */
  static async getSpotifyRecommendations(mood, accessToken) {
    // Placeholder for future Spotify integration
    throw new Error('Spotify integration not yet implemented');
  }
  
  /**
   * TODO: Implement collaborative filtering recommendations
   * @param {string} userId - User identifier
   * @param {string} mood - The detected mood
   * @returns {Promise<Array>} Promise resolving to personalized recommendations
   */
  static async getPersonalizedRecommendations(userId, mood) {
    // Placeholder for future personalized recommendations
    throw new Error('Personalized recommendations not yet implemented');
  }
}

module.exports = RecommendationService;