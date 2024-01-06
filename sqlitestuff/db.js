const sqlite3 = require('sqlite3');

class Database {
  constructor(filePath) {
    this.db = new sqlite3.Database(filePath);
  }

  createUser(firstname, lastname, username, email, callback) {
    this.db.run(
      'INSERT INTO users (firstname, lastname, username, email) VALUES (?, ?, ?, ?)',
      [firstname, lastname, username, email],
      (err) => {
        callback(err, this.lastID);
      }
    );
  }
}

export default Database;
