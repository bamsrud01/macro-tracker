/*  Handle CRUD of recipes  */

//  Declare router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection');

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

//  Get recipe by id
router.get('/byId', function(req, res) {
  const { id } = req.query;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM recipes WHERE id=$1',
      [id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  Get ingredients for recipe
router.get('/ingredient', function(req, res) {
  const { id } = req.query;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM ingredients WHERE recipe_id=$1',
      [id], function(err, result) {
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

//  Post a new recipe
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

//  Post ingredients for recipes
router.post('/ingredient', function(req, res) {
  const { recipe_id, food_name, food_amount } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO ingredients (recipe_id, food_name, food_amount) ' +
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

/*  PUT requests  */

//  Update a recipe (UNTESTED)
router.put('/', function(req, res) {
  const { name, serving, calories, carbs, fiber, protein, fat, user_id, directions, source, source_url, id } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE recipes SET name=$1, serving=$2, calories=$3, ' +
      'carbs=$4, fiber=$5, protein=$6, fat=$7, user_id=$8, directions=$9, ' +
      'source=$10, source_url=$11 WHERE id=$12',
      [name, serving, calories, carbs, fiber, protein, fat, user_id, directions, source, source_url, id],
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

//  Update ingredients for recipes (UNTESTED)
router.put('/ingredient', function(req, res) {
  const { id, food_name, food_amount } = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE ingredients SET food_name=$1, food_amount=$2 WHERE id=$3',
      [food_name, food_amount, id],
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

//  Delete a recipe (UNTESTED)
router.delete('/', function(req, res) {
  const recipeId = req.query.recipeId;  //  Change as required
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM recipes WHERE id=$1', [recipeId],
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

//  Delete an ingredient (UNTESTED)
router.delete('/ingredient', function(req, res) {
  const ingredientId = req.query.ingredientId;  //  Change as required
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM ingredients WHERE id=$1', [ingredientId],
      function (err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Deleted ingredient');
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

//  Export router
module.exports = router;
