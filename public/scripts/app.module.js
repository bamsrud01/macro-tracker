angular.module('macrotrack', ['ngRoute'])
  .controller('MainController', MainController);

//  Parent of all controllers.  Uses NavService to move data between pages
function MainController(NavService, MainService) {

  let main = this;

  main.nav = NavService;

}
