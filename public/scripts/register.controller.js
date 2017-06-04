angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

function RegisterController(RegisterService) {

  let register = this;

  //  Object to hold user data, default value set
  //  { username, password, email, shared, (calories, carbs, protein, fat) }
  register.user = {
    shared: false
  };

  //  register.username, register.password, register.confirm, register.email
  register.restrictions = {
    existingUsername: false,
    validEmail: false,
  }

  //  Checks if user has completed all registration requirements
  register.failure = false;

  //  Ensure email is valid
  register.validateEmail = function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.email)) {
      console.log('Email is valid');
      register.restrictions.validEmail = true;
    } else {
      console.log('Email is NOT valid.');
      register.restrictions.validEmail = false;
    }
  };


}
