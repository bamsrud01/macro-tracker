angular.module('macrotrack')
  .controller('AddItemController', AddItemController);

//  Manages adding both foods and recipes
function AddItemController(AddItemService) {

  let add = this;

  //  Starting object (take from nav depending on food or recipe?)
  //  const defaults = {};

  //  Foods
  //  { name, variety, brand, serving, calories, carbs, fiber, protein, fat }
  //  Add user_id from active

  //  Recipes
  //  { name, serving, calories, carbs, fiber, protein, fat, directions, source, source_url }
  //  Add [ food_id ] for ingredients

}
