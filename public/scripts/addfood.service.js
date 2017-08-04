angular.module('macrotrack')
  .service('AddFoodService', AddFoodService);

function AddFoodService($http) {

  let service = this;

  //  Will contain:
    //  existingFood {false}
    //  foodToEdit {food_object}

  //  Post a new food to the database
  service.submitNewFood = (foodData) => {
    console.log('Will POST data:', foodData);
    return $http({
      method: 'POST',
      url: '/food',
      data: foodData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

  //  Update an existing food
  service.updateFood = (foodData) => {
    console.log('Will PUT data:', foodData);
    return $http({
      method: 'PUT',
      url: '/food',
      data: foodData
    }).then(response => {
      console.log('SERVICE received response:', response);
      return response.data;
    });
  }

  //  Delete an existing food
  service.deleteFood = (foodId) => {
    console.log('Will DELETE food with id:', foodId);
    return $http.delete('/food', {
      params: {
        foodId
      }
    }).then(response => {
      console.log('SERVICE received response:', response);
      return;
    });
  }

}
