const { db } = require('../config/database');

class User {
  static async create(userData) {
    return new Promise((resolve, reject) => {
      const { username, email, password_hash } = userData;
      
      db.run(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, password_hash],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, username, email });
          }
        }
      );
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static async createProfile(userId) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO user_profiles (user_id) VALUES (?)',
        [userId],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, user_id: userId });
          }
        }
      );
    });
  }
}

module.exports = User;