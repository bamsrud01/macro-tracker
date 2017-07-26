angular.module('macrotrack')
  .controller('AddFoodController', AddFoodController);

//  Manages CRUD operations on foods
function AddFoodController(AddFoodService, MainService) {

  let add = this;

  //  Food with all fields at null
  const emptyFood = {
    name: null,
    variety: null,
    brand: null,
    serving: null,
    calories: null,
    carbs: null,
    fiber: null,
    protein: null,
    fat: null,
    user_id: null
  };

  //  Function to submit a new food
  add.submitNewFood = () => {
    if (MainService.state.loggedIn && add.newFood.name) {
      add.newFood.user_id = MainService.state.user_id;
      console.log('Submitting food:', add.newFood);
      AddFoodService.submitNewFood(add.newFood).then(response => {
        console.log('Success!  New food created:', response);
        add.newFood = emptyFood;
      });
    } else {
      console.log('Error!  Check required fields');
    }
  }

}
