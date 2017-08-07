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

//  Get all foods
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

//  Post a new food
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

/*  PUT requests  */

//  Update a food
router.put('/', function(req, res) {
  const { id, name, variety, brand, serving, calories, carbs, fiber, protein, fat } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE foods SET name=$1, variety=$2, brand=$3, serving=$4, ' +
      'calories=$5, carbs=$6, fiber=$7, protein=$8, fat=$9 WHERE id=$10',
      [name, variety, brand, serving, calories, carbs, fiber, protein, fat, id],
      function (err, result) {
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

/*  DELETE requests  */

//  Delete a food
router.delete('/', function(req, res) {
  const foodId = req.query.foodId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM foods WHERE id=$1', [foodId],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted food');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Export router
module.exports = router;
