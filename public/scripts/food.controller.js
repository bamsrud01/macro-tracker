angular.module('macrotrack')
  .controller('FoodController', FoodController);

function FoodController(FoodService) {

  let food = this;

  console.log('On Food');

}
