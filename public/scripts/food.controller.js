angular.module('macrotrack')
  .controller('FoodController', FoodController);

//  Manages displaying and sorting existing food objects
function FoodController(MainService, FoodService, AddFoodService, $location) {

  let food = this;

  //  { loggedIn, username, user_id }
  food.activeUser = MainService.state;

  //  Function to get all existing foods in the database
  food.getAllFoods = () => {
    FoodService.getAllFoods().then(foodData => {
      food.listedFoods = foodData;
    });
  }

  //  Function to edit a food if users are the same
  food.editFood = (foodObject) => {
    AddFoodService.existingFood = foodObject;
    $location.path('/add-food');
  }

  //  Get all foods in database when opening view
  food.getAllFoods();

}
