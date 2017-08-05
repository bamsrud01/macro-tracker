/*  Handle CRUD of recipes  */

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

//  All recipes
router.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipes ORDER BY name', function(err, result) {
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

//  Post a new recipe (UNTESTED)
router.post('/', function(req, res) {
  const { name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id} = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO recipes (name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url, user_id],
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

//  Post ingredients for recipes (UNTESTED)
router.post('/ingredient', function(req, res) {
  const { recipe_id, food_name, food_amount } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO foods_recipes (recipe_id, food_name, food_amount) ' +
      'VALUES ($1, $2, $3) RETURNING *',
      [recipe_id, food_name, food_amount],
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


//  Export router
module.exports = router;
