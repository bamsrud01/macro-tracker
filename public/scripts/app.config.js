/*  TO-DO
- Home
- Register (WIP)
- Food
- Recipe
- Profile
- Add Item
- View
- Log
- Favorites
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
    }).when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController as profile'
    }).when('/add-food', {
      templateUrl: 'addFood.html',
      controller: 'AddItemController as add',
    }).when('add-recipe', {
      templateUrl: 'addRecipe.html',
      controller: 'AddItemController as add',
    }).when('/view', {
      templateUrl: 'view.html',
      controller: 'ViewController as view',
    }).when('/log', {
      templateUrl: 'log.html',
      controller: 'LogController as log'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
  });
