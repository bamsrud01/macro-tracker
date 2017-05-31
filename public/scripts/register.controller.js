angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

function RegisterController(RegisterService) {

  let register = this;

  //  Object to hold user data
  //  { username, password, email, shared, calories, carbs, protein, fat }
  register.user = {};

  //  register.username, register.password, register.confirm, register.email
  register.restrictions = {
    existingUsername: false,
    validEmail: false,
  }


}
