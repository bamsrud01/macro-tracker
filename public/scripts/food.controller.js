angular.module('macrotrack')
  .controller('FoodController', FoodController);

function FoodController(FoodService) {

  let food = this;

  food.item = 'pizza';

}
