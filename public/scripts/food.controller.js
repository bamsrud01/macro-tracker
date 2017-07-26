angular.module('macrotrack')
  .controller('FoodController', FoodController);

//  Manages displaying and sorting existing food objects
function FoodController(FoodService) {

  let food = this;

  //  Function to get all existing foods in the database
  food.getAllFoods = () => {
    FoodService.getAllFoods().then(foodData => {
      food.listedFoods = foodData;
    });
  }

  //  Get all foods in database when opening view
  food.getAllFoods();

}
