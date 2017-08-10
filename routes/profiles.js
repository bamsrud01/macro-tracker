/*  Handle user profiles and logs  */

//  Declare router
const router = require('express').Router();

//  Import PostgreSQL
const pg = require('pg');

//  Use 'macrotrack' database
const config = {
  database: 'macrotrack'
};

//  Initialize connection
var pool = new pg.Pool(config);

/*  GET requests  */

//  Get a record for a specific date
router.get('/date', function(req, res) {
  const { user_id, log_date } = req.query;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM history ' +
      'WHERE user_id=$1 AND log_date=$2',
      [user_id, log_date], function(err, result) {
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

/*  POST requests  */

//  Post user date record
router.post('/date', function(req, res) {
  const { user_id, log_date, weight, calories, carbs, protein, fat } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO history (user_id, log_date, weight, calories, carbs, protein, fat) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, log_date, weight, calories, carbs, protein, fat],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows:', result.rows);
        res.send(result.rows);  //  Or status code
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
