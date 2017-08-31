angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

//  Manages user registration, log-in, and log-out
function RegisterController(RegisterService, MainService) {

  let register = this;

  /*  DELETE register.loginData, register.loginUser()  */
  /*  They belong elsewhere  */

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

  //  Will hold login information
  register.loginData = {};

  //  Function to log in user
  register.loginUser = () => {
    RegisterService.loginUser(register.loginData).then(() => {
      register.loginData = {};
    });
  }

  console.log('On Register');

}
