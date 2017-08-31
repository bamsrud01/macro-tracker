angular.module('macrotrack')
  .service('RegisterService', RegisterService);

function RegisterService($http, $location, $q) {

  let service = this;

  /*  DELETE service.loginUser, service.logoutUser, as they belong elsewhere  */

  //  Register a user
  service.submitUser = userData => {
    console.log('Registering user');
    return $http({
      method: 'POST',
      url: '/auth',
      data: userData
    }).then(() => {
      $location.path('/home');
    }, error => {
      console.log('Error with registration:', error);
    });
  }

  //  Login a user
  service.loginUser = userData => {
    return $http.post('/auth/login', {
      username: userData.username,
      password: userData.password
    }).then((response) => {
      return response.data;
    }, error => {
      console.log('Error logging in:', error);
      return $q.reject(error);
    });
  }

  //  Logout a user
  service.logoutUser = () => {
    return $http.post('auth/logout').then((response) => {
      return response;
    });
  }

}
