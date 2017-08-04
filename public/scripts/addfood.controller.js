angular.module('macrotrack')
  .controller('AddFoodController', AddFoodController);

//  Manages CRUD operations on foods
function AddFoodController(AddFoodService, MainService) {

  let add = this;

  //  If an existing food, populate fields
  if (AddFoodService.existingFood) {
    add.newFood = AddFoodService.existingFood;
  }

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

  //  Function to edit an existing food
  add.updateFood = () => {
    if ((MainService.state.user_id == add.newFood.user_id) && add.newFood.name) {
      console.log('Updating food:', add.newFood);
      AddFoodService.updateFood(add.newFood).then(response => {
        console.log('Success! Food updated:', response);
      });
    } else {
      console.log('Error updating food!');
    }
  }

  //  Function to delete an existing food
  //  What will happen to recipes referencing the food?
  add.deleteFood = () => {
    if (MainService.state.user_id == add.newFood.user_id) {
      console.log('Deleting food:', add.newFood);
      AddFoodService.deleteFood(add.newFood.id).then(() => {
        console.log('Success!  Food deleted.  Should redirect?');
      });
    } else {
      console.log('Error deleting food!');
    }
  }

}
