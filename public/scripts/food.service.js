angular.module('macrotrack')
  .service('FoodService', FoodService);

function FoodService($http) {

  let service = this;

  //  Get all foods in database
  service.getAllFoods = () => {
    return $http.get('/food').then(response => {
      console.log('SERVICE recieved response:', response);
      return response.data;
    });
  }

}
