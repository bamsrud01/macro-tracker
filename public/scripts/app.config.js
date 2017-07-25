angular.module('macrotrack')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeController as home'
    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
  });
