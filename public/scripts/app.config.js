angular.module('macrotrack')
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController as register'
    }).otherwise({
      redirectTo: '/home'
    });

    $locationProvider.html5mode(true);
  });
