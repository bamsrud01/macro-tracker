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
        console.log('Got rows from database (get /profile/date):', result.rows);
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
          console.log('Error querying database (post /profiles/date):', err);
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

//  Post user food record
router.post('/logFood', function(req, res) {
  const { user_id, log_id, item_id, amount, log_date } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO log_foods (user_id, log_id, food_id, amount, log_date) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, log_id, item_id, amount, log_date],
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

//  Post user recipe record
router.post('/logRecipe', function(req, res) {
  const { user_id, log_id, item_id, amount, log_date } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO log_recipes (user_id, log_id, recipe_id, amount, log_date) ' +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, log_id, item_id, amount, log_date],
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

/*  PUT requests  */

//  Put user date record
router.put('/date', function(req, res) {
  const { id, calories, carbs, protein, fat } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE history SET calories=$1, ' +
      'carbs=$2, protein=$3, fat=$4 WHERE id=$5 RETURNING *',
      [calories, carbs, protein, fat, id],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows (put /profiles/date):', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  Put user weight record
router.put('/weight', function(req, res) {
  const { weight, id } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE history SET weight=$1 WHERE id=$2 RETURNING *',
      [weight, id],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Returning rows (put /profiles/weight):', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

/*  DELETE requests  */



//  Export router
module.exports = router;
