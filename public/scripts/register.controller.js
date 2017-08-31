angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

//  Manages user registration, log-in, and log-out
function RegisterController(RegisterService, MainService) {

  let register = this;

  //  register.newUser = { username, password, email, shared }
  register.newUser = {
    shared: false
  }

  //  Submit a new user
  register.submitUser = () => {
    RegisterService.submitUser(register.newUser).then(() => {
      register.newUser = { shared: false }
    });
  }

  console.log('On Register');

}
