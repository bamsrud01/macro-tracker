angular.module('macrotrack')
  .service('AddItemService', AddItemService);

function AddItemService($http) {

  let service = this;

  /*  Adding Foods  */
  //  Post a new food
  service.addFood = (data) => {
    console.log(data);
  }

  //  Edit an existing food
  service.updateFood = (data) => {
    console.log(data);
  }

  /*  Adding Recipes  */
  //  Post a new recipe
  service.addRecipe = (data) => {
    console.log(data);
  }

  //  Update an existing recipe
  service.updateRecipe = (data) => {
    console.log(data);
  }

  //  Get existing foods by search term for recipe creation
  service.getMatchingFoods = (term) => {
    console.log(term);
  }

}
