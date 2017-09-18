/*  TO-DO - PRIORITY
- Profile
  - Display
- View Item (recipe and food)


TO-DO - SECONDARY
- Home
- Recipe
  - Update
  - Delete
- Ingredients (might be done)
  - Update
  - Delete
- Favorites
- Comments on foods
  - Get
  - Add
  - Update
  - Delete
- Comments on recipes
  - Get
  - Add
  - Update
  - Delete
- Comments on users
  - Get
  - Add
  - Update
  - Delete
- Linking
  - Food to log
  - Recipe to log
  - Food to edit
  - Recipe to edit
  - Food to view
  - Recipe to view
  - View to favorite
  - View to edit
  - View to log
  - Favorite to log
  - Favorite to edit
- Log
  - Order listed items by ID
  - Display profile goals (e.g. logged / goal, 'Carbs: 12g / 25g, 13g remaining')
  - Remove dummy data once other routes implemented
- Show usernames in place of ID (track, foods, recipes, view, profile, comments)
- Modals
  - Log: delete
- Search
  - In log
  - In foods
  - In recipes
  - In favorites
- Cleanup
- Register
- Sign in/out, user links
- Visuals
  - Progress graph
  - Pie charts
  - Ratio bar per day (flex?)
  - Images?


DONE
- Register
- Food
  - Get
  - Add
  - Update
  - Delete
- Ingredients
  - Add ingredient on recipe update
  - Add
- Recipe
  - Get
  - Add
- Add Item
- Log
  - View existing logged items
  - Get History
  - Add Item to History
  - Delete From History (with adjustment to log)
*/

angular.module('macrotrack')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController as home'
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).when('/foods', {
      templateUrl: 'views/foods.html',
      controller: 'FoodController as food'
    }).when('/recipes', {
      templateUrl: 'views/recipes.html',
      controller: 'RecipeController as recipe'
    }).when('/favorites', {
      templateUrl: 'views/favorites.html',
      controller: 'FavoritesController as favorites'
    }).when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController as profile'
    }).when('/add-food', {
      templateUrl: 'views/add-food.html',
      controller: 'AddFoodController as add'
    }).when('/add-recipe', {
      templateUrl: 'views/add-recipe.html',
      controller: 'AddRecipeController as add'
    }).when('/view', {
      templateUrl: 'views/view-item.html',
      controller: 'ViewController as view'
    }).when('/track', {
      templateUrl: 'views/track.html',
      controller: 'TrackController as track'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
  });
