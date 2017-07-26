angular.module('macrotrack')
  .service('AddFoodService', AddFoodService);

function AddFoodService($http) {

  let service = this;

  //  Post a new food to the database
  service.submitNewFood = (foodData) => {
    console.log('Will POST data:', foodData);
    return $http({
      method: 'POST',
      url: '/food',
      data: foodData
    }).then(response => {
      console.log('SERVICE recieved response:', response);
      return response.data;
    });
  }

}
