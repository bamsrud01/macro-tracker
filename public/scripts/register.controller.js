angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

//  Manages user registration, log-in, and log-out
function RegisterController(RegisterService, MainService) {

  let register = this;

  /*  DELETE register.loginData, register.loginUser(), register.logoutUser()  */
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
    RegisterService.loginUser(register.loginData).then((response) => {
      MainService.state.loggedIn = true;
      console.log('Returned user:', response);
      MainService.state.username = response.username;
      MainService.state.user_id = response.id;
      register.loginData = {};
      console.log('State:', MainService.state)
    });
  }

  //  Function to log out user
  register.logoutUser = () => {
    RegisterService.logoutUser().then((response) => {
      console.log('Logout successful!');
      MainService.state = { loggedIn: false }
      console.log('State:', MainService.state);
      console.log('Response:', response);
    });
  }

  console.log('On Register');

}
