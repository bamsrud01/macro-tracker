angular.module('macrotrack', ['ngRoute']);

angular.module('macrotrack')
  .controller('MainController', MainController);

//  Parent of all controllers.  Uses MainService to move data between pages
function MainController(MainService) {

  let main = this;

}
