angular.module('macrotrack')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController as home'
    }).when('/foods', {
      templateUrl: 'views/foods.html',
      controller: 'FoodController as food'
    }).when('/recipes', {
      templateUrl: 'views/recipes.html',
      controller: 'RecipeController as recipe'
    }).when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController as profile'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
  });
