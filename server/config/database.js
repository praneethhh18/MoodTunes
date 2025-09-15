const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // User profiles table
      db.run(`
        CREATE TABLE IF NOT EXISTS user_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER UNIQUE NOT NULL,
          favorite_moods TEXT DEFAULT '[]',
          favorite_playlists TEXT DEFAULT '[]',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `);

      // Mood history table
      db.run(`
        CREATE TABLE IF NOT EXISTS mood_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          mood VARCHAR(255) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `);

      // Playlist history table
      db.run(`
        CREATE TABLE IF NOT EXISTS playlist_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          playlist_name VARCHAR(255) NOT NULL,
          playlist_data TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database initialized successfully');
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initializeDatabase };