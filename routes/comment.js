/*  Handle CRUD of comments on foods and recipes  */

//  Declare router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection');

/*  GET requests  */

//  Get all comments on profile
router.get('/profile', function(req, res) {
  const { id } = req.query;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM profile_comments WHERE profile_user_id=$1',
      [id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database (get /comment/profile):', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  POST requests  */
router.post('/profile', function(req, res) {
  const { targetId, userId, commentDate, comment } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO profile_comments (profile_user_id, user_id, comment_date, comment)' +
      'VALUES ($1, $2, $3, $4) RETURNING *',
      [targetId, userId, commentDate, comment],
      function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  PUT requests  */

/*  DELETE requests  */

//  Export router
module.exports = router;
