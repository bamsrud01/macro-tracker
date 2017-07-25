// Handle user registration and login

//  Declare file as a router
const router = require('express').Router();

//  Import PostgreSQL and Passport
const pg = require('pg');
const passport = require('passport');

//  Import user registration
// const User = require('..models/user');

//  Use 'macrotrack' database
let config = {
  database: 'macrotrack'
}

//  Initialize connection pool
let pool = new pg.Pool(config);

//  GET request to check if username is unique
router.get('/unique', function (req, res) {
  let username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM users WHERE username=$1',
      [username], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  POST request to register a new user (packaged object)
router.post('/', function(req, res) {
  console.log('Registering a new user');
  User.create(req.body.userData).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /register:', err);
    res.sendStatus(500);
  });
});

//  POST request for user login
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Loggin in a user');
  res.sendStatus(200);
});

//  POST request for user logout
router.post('/logout', function(req, res) {
  req.logout();
  console.log('Loggin in a user');
  res.sendStatus(200);
});

//  DELETE a user
router.delete('/', function(req, res) {
  let username = req.query.username
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM users ' +
      'WHERE username=$1;',
      [username], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted user: ' + username);
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Export router
module.exports = router;
