-- User data.  Email only for password reset.  Shared defaults to false
-- Calories, carbs, protein, fats used to set goals; optional
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  password varchar(120) NOT NULL,
  email varchar(80) NOT NULL,
  shared BOOLEAN NOT NULL,
  calories INT,
  carbs INT,
  protein INT,
  fat INT,
  goal_weight varchar(40)
);

-- Data for individual food items.  Serving is string to be parsed.
-- Many-to-many with recipes
CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  name varchar(40) NOT NULL,
  variety varchar(120),
  brand varchar(120),
  serving varchar(120),
  calories INT,
  carbs INT,
  fiber INT,
  protein INT,
  fat INT,
  user_id INT NOT NULL
);

-- Data for recipes.  Many-to-many with foods.  Serving is string to be parsed
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name varchar(120) NOT NULL,
  serving varchar(120),
  calories INT,
  carbs INT,
  fiber INT,
  protein INT,
  fat INT,
  user_id INT NOT NULL,
  directions TEXT NOT NULL,
  source varchar(120),
  source_url varchar(120)
);

-- App searches and displays matching foods for reference, but user need not directly link them.
-- All rows must have a food_name.
-- food_amount encouraged, but not required.
CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  -- food_id INT,
  food_name varchar(40) NOT NULL,
  food_amount varchar(120)
);

-- Comments on foods.
CREATE TABLE food_comments (
  id SERIAL PRIMARY KEY,
  food_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_date TIMESTAMP,
  comment TEXT NOT NULL
);

-- Comments on recipes
CREATE TABLE recipe_comments (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_date TIMESTAMP,
  comment TEXT NOT NULL
);

-- Comments on user profiles
CREATE TABLE profile_comments (
  id SERIAL PRIMARY KEY,
  profile_user_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_date TIMESTAMP,
  comment TEXT NOT NULL
);

-- Weight stored as string to be parsed.  Logged data is optional, but defaults at 0.
-- Only one table per date.  If date exists for user, updates table, not inserts
CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  log_date varchar(40),
  weight varchar(40),
  calories INT,
  carbs INT,
  protein INT,
  fat INT,
);

-- Related table for history, logging foods and recipes
CREATE TABLE log_items (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  log_id INT NOT NULL,
  food_id INT,
  recipe_id INT,
  amount INT NOT NULL,
  log_date varchar(100) NOT NULL
);

-- Recipes and foods can be saved as favorites
-- The field will have an id for food OR for recipe, not both.
CREATE TABLE user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  recipe_id INT,
  food_id INT
);
