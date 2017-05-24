// Handle CRUD of comments on foods and recipes

//  Declare file as a router
const router = require('express').Router();

//  Import PostgreSQL
const pg = require('pg');

//  Use 'macrotrack' database
let config = {
  database: 'macrotrack'
}

//  Initialize connection pool
let pool = new pg.Pool(config);

// GET comments on foods
//  returns [{ id, food_id, user_id, comment_date, comment }]
router.get('/food', function(req, res) {
  let foodId = req.query.foodId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM food_comments WHERE food_id=$1',
      [foodId], function(err, result) {
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

// GET comments on recipes
//  returns [{ id, recipe_id, user_id, comment_date, comment }]
router.get('/food', function(req, res) {
  let recipeId = req.query.recipeId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipe_comments WHERE recipe_id=$1',
      [recipeId], function(err, result) {
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

// GET comments on profiles
//  returns [{ id, profile_user_id, user_id, comment_date, comment }]
router.get('/profile', function(req, res) {
  let profileId = req.query.profileId;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM profile_comments WHERE profile_user_id=$1',
      [profileId], function(err, result) {
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

//  Export router
module.exports = router;
