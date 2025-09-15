const { db } = require('../config/database');

class Profile {
  static async getByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM user_profiles WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            if (row) {
              // Parse JSON fields
              row.favorite_moods = JSON.parse(row.favorite_moods || '[]');
              row.favorite_playlists = JSON.parse(row.favorite_playlists || '[]');
            }
            resolve(row);
          }
        }
      );
    });
  }

  static async updateFavorites(userId, favorites) {
    return new Promise((resolve, reject) => {
      const { favorite_moods, favorite_playlists } = favorites;
      
      db.run(
        `UPDATE user_profiles 
         SET favorite_moods = ?, favorite_playlists = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = ?`,
        [
          JSON.stringify(favorite_moods || []),
          JSON.stringify(favorite_playlists || []),
          userId
        ],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ changes: this.changes });
          }
        }
      );
    });
  }

  static async getMoodHistory(userId, limit = 50) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM mood_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
        [userId, limit],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async addMoodHistory(userId, mood) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO mood_history (user_id, mood) VALUES (?, ?)',
        [userId, mood],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, user_id: userId, mood });
          }
        }
      );
    });
  }

  static async getPlaylistHistory(userId, limit = 50) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM playlist_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
        [userId, limit],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            // Parse playlist_data JSON for each row
            const parsedRows = rows.map(row => ({
              ...row,
              playlist_data: JSON.parse(row.playlist_data)
            }));
            resolve(parsedRows);
          }
        }
      );
    });
  }

  static async addPlaylistHistory(userId, playlistName, playlistData) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO playlist_history (user_id, playlist_name, playlist_data) VALUES (?, ?, ?)',
        [userId, playlistName, JSON.stringify(playlistData)],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ 
              id: this.lastID, 
              user_id: userId, 
              playlist_name: playlistName,
              playlist_data: playlistData
            });
          }
        }
      );
    });
  }

  static async clearMoodHistory(userId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM mood_history WHERE user_id = ?',
        [userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ deleted: this.changes });
          }
        }
      );
    });
  }

  static async clearPlaylistHistory(userId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM playlist_history WHERE user_id = ?',
        [userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ deleted: this.changes });
          }
        }
      );
    });
  }
}

module.exports = Profile;