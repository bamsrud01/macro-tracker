/*  Handle CRUD of foods  */

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

//  All foods
router.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM foods ORDER BY name', function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from "foods":', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  POST requests  */
router.post('/', function(req, res) {
  const { name, variety, brand, serving, calories, carbs, fiber, protein, fat, user_id} = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO foods (name, variety, brand, serving, calories, carbs, fiber, protein, fat, user_id)' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, variety, brand, serving, calories, carbs, fiber, protein, fat, user_id],
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


//  Export router
module.exports = router;
