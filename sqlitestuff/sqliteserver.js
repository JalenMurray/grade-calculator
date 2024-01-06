const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

import Database from './db';

const db = new Database('gradecalc.db');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/user/:userid', (req, res) => {
  const userid = req.params.userid;

  db.get('SELECT * from users WHERE id = ? LIMIT 1', [userid], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send('User not found');
    } else {
      res.send(row);
    }
  });
});

app.post('/api/user/add', (req, res) => {
  const { firstname, lastname, username } = req.body;

  console.log(firstname, lastname, username);
  res.json({ success: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
