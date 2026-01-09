const { db } = require('./db');
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) console.error(err);
  console.log(JSON.stringify(rows, null, 2));
  process.exit();
});
