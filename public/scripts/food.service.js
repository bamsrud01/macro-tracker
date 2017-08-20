angular.module('macrotrack')
  .service('FoodService', FoodService);

//  Features to add:
  //  Sort
  //  Search

function FoodService($http) {

  let service = this;

  //  Get all foods in database
  service.getAllFoods = () => {
    return $http.get('/food').then(response => {
      console.log('SERVICE recieved response:', response);
      return response.data;
    });
  }

  //  Get a specific food by id
  service.getOneFood = (foodId) => {
    return $http.get('/food/byId', {
      params: {
        id: foodId
      }
    }).then(response => {
      return response.data;
    });
  }

}
