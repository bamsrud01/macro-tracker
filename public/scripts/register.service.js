angular.module('macrotrack')
  .service('RegisterService', RegisterService);

function RegisterService($http) {

  let service = this;

  //  Check if username is unique
  service.uniqueUsername = (username) => {
    return $http.get('/auth/unique', {
      params: {
        username: username
      }
    }).then((response) => {
      return response.data;
    });
  }

  //  Register a user
  service.register = function(userData) {
    console.log('registering user');
    return $http({
      method: 'POST',
      url: '/auth',
      data: userData
    }).then(function() {
      $location.path('/home');
    }, function(error) {
      console.log('Error registering:', error);
    });
  };

}
