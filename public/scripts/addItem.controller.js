angular.module('macrotrack')
  .controller('AddItemController', AddItemController);

//  Manages adding both foods and recipes
function AddItemController(AddItemService, NavService) {

  let add = this;

  //  Starting object (take from nav depending on food or recipe?)
  //  const defaults = {};

  //  Foods
  //  { name, variety, brand, serving, calories, carbs, fiber, protein, fat }
  //  Add user_id from active
  add.food = {};

  add.submitFood = () => {
    add.food.user_id = NavService.state.user_id;
    //  Ensure required fields are filled
    if (add.food.name && add.food.user_id) {
      //  Submit food (AddItemService)
      AddItemService.addFood(add.food)
      //  .then() navigate to food
    } else {
      //  Error message
    }
  }

  //  Recipes
  //  { name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url }
  //  Add [ food_id ] for ingredients
  add.recipe = {};

  add.submitRecipe = () => {
    add.recipe.user_id = NavService.state.user_id;
    //  Ensure required fields are filled
    if (add.recipe.name && add.recipe.user_id && add.recipe.directions) {
      //  Set up ingredients array
      //  Submit recipe (AddItemService)
      AddItemService.addRecipe(add.recipe)
      //  .then() navigate to recipe
    } else {
      //  Error message
    }
  }

}
