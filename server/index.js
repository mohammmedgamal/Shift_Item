const express = require('express');
const cors = require('cors');
const path = require('path');
const { db } = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);
  db.get('SELECT id, name, username, role FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(user);
  });
});

// Get all duties with optional filters
app.get('/api/duties', (req, res) => {
  const { frequency, shift_type, day_of_week, day_of_month } = req.query;
  let query = 'SELECT * FROM duties WHERE 1=1';
  const params = [];

  if (frequency) {
    query += ' AND frequency = ?';
    params.push(frequency);
  }
  if (shift_type) {
    query += ' AND (shift_type = ? OR shift_type = "Both")';
    params.push(shift_type);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get current tasks for a specific date and shift
app.get('/api/tasks/today', (req, res) => {
  const { date, shift_type, shift_group } = req.query;
  const d = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[d.getDay()];
  const dayOfMonth = d.getDate();

  const query = `
    SELECT d.*, l.status, l.feedback, l.operator_name 
    FROM duties d
    LEFT JOIN duty_logs l ON d.id = l.duty_id AND l.date = ? AND l.shift_group = ?
    WHERE (d.frequency = 'daily' AND (d.shift_type = ? OR d.shift_type = 'Both'))
       OR (d.frequency = 'weekly' AND d.day_of_week = ? AND (d.shift_type = ? OR d.shift_type = 'Both'))
       OR (d.frequency = 'monthly' AND d.day_of_month = ? AND (d.shift_type = ? OR d.shift_type = 'Both'))
  `;
  
  db.all(query, [date, shift_group, shift_type, dayName, shift_type, dayOfMonth, shift_type], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Submit/Update duty log
app.post('/api/logs', (req, res) => {
  const { duty_id, date, shift_group, shift_type, status, feedback, operator_name } = req.body;
  
  db.run(`
    INSERT INTO duty_logs (duty_id, date, shift_group, shift_type, status, feedback, operator_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(duty_id, date, shift_group) DO UPDATE SET
    status = excluded.status,
    feedback = excluded.feedback,
    operator_name = excluded.operator_name
  `, [duty_id, date, shift_group, shift_type, status, feedback, operator_name], function(err) {
    // Note: ON CONFLICT requires a unique constraint. Let's add it if missing or use a different approach.
    // Since SQLite ON CONFLICT needs a UNIQUE constraint, let's just use a simple insert or update logic.
    if (err) {
       // Fallback for older SQLite or missing constraint: try update then insert
       db.get('SELECT id FROM duty_logs WHERE duty_id = ? AND date = ? AND shift_group = ?', [duty_id, date, shift_group], (err, row) => {
         if (row) {
           db.run('UPDATE duty_logs SET status = ?, feedback = ?, operator_name = ? WHERE id = ?', [status, feedback, operator_name, row.id], (err) => {
             if (err) return res.status(500).json({ error: err.message });
             res.json({ success: true });
           });
         } else {
           db.run('INSERT INTO duty_logs (duty_id, date, shift_group, shift_type, status, feedback, operator_name) VALUES (?, ?, ?, ?, ?, ?, ?)', 
           [duty_id, date, shift_group, shift_type, status, feedback, operator_name], (err) => {
             if (err) return res.status(500).json({ error: err.message });
             res.json({ success: true });
           });
         }
       });
       return;
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Admin: CRUD for duties
app.post('/api/admin/duties', (req, res) => {
  const { title_en, title_ar, frequency, shift_type, day_of_week, day_of_month } = req.body;
  db.run(`INSERT INTO duties (title_en, title_ar, frequency, shift_type, day_of_week, day_of_month) VALUES (?, ?, ?, ?, ?, ?)`,
    [title_en, title_ar, frequency, shift_type, day_of_week, day_of_month], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.delete('/api/admin/duties/:id', (req, res) => {
  db.run(`DELETE FROM duties WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Stats
app.get('/api/stats/completion', (req, res) => {
  db.all(`
    SELECT shift_group, status, COUNT(*) as count 
    FROM duty_logs 
    GROUP BY shift_group, status
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Settings
app.get('/api/settings', (req, res) => {
  db.all(`SELECT * FROM settings`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const settings = {};
    rows.forEach(row => settings[row.key] = row.value);
    res.json(settings);
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

