/*  TO-DO
- Home
- Register
- Recipe
  - Update
  - Delete
- Ingredients
- Profile
  - Display
- View
- Log
  - Get History
  - Add Item to History
  - Delete From History
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


DONE
- Food
  - Get
  - Add
  - Update
  - Delete
- Recipe
  -Get
  - Add
- Add Item
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
