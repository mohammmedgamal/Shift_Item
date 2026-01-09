const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Duties Master Table
      db.run(`CREATE TABLE IF NOT EXISTS duties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        description_en TEXT,
        description_ar TEXT,
        frequency TEXT CHECK(frequency IN ('daily', 'weekly', 'monthly')),
        shift_type TEXT CHECK(shift_type IN ('Morning', 'Night', 'Both')),
        day_of_week TEXT, -- For weekly duties (Saturday, Sunday, etc.)
        day_of_month INTEGER, -- For monthly duties (1-31)
        assigned_unit TEXT -- Optional: e.g., 'U12', 'U34'
      )`);

      // Duty Logs Table
      db.run(`CREATE TABLE IF NOT EXISTS duty_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        duty_id INTEGER,
        date TEXT NOT NULL, -- YYYY-MM-DD
        shift_group TEXT, -- A, B, C, D
        shift_type TEXT, -- Morning, Night
        status TEXT DEFAULT 'pending', -- Done, Partly Done, Skipped, Not Due
        feedback TEXT,
        operator_name TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (duty_id) REFERENCES duties (id)
      )`);

      // Users Table
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'operator' -- 'admin' or 'operator'
      )`);

      // Settings/Meta Table
      db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

module.exports = { db, initDb };

