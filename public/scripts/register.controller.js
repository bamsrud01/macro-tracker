angular.module('macrotrack')
  .controller('RegisterController', RegisterController);

function RegisterController(RegisterService, NavService) {

  let register = this;

  const defaults = {
    shared: false
  }

  //  Object to hold user data, default value set, taken from defaults
  //  { username, password, email, shared, (calories, carbs, protein, fat) }
  register.user = defaults;

  //  register.username, register.password, register.confirm, register.email
  register.restrictions = {
    existingUsername: false,
    validEmail: false,
    matchingPassword: true
  }

  //  Checks if user has completed all registration requirements
  register.failure = true;
  register.confirm = '';

  //  Ensure email is valid
  register.validateEmail = function() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(register.user.email)) {
      console.log('Email is valid');
      register.restrictions.validEmail = true;
    } else {
      console.log('Email is NOT valid.');
      register.restrictions.validEmail = false;
    }
    register.checkRequirements();
  };

  //  Set initial Calorie goal from given information (can be customized)
  register.calculateCalories = () => {
    let goal = 0;

    if (register.user.carbs) {
      goal += (register.user.carbs * 4);
    }
    if (register.user.protein) {
      goal += (register.user.protein * 4);
    }
    if (register.user.fat) {
      goal += (register.user.fat * 9);
    }

    if (goal != 0) {
      register.user.calories = goal;
    }
  }

  // Check username unique status
  register.uniqueUsername = () => {
    console.log('Checking...');
    register.user.username = register.user.username.trim();
    //  User Service to check table
    RegisterService.uniqueUsername(register.user.username)
      .then((result) => {
        console.log('Got result:', result);
        if (result.length == 0) {
          register.restrictions.existingUsername = false;
          console.log('Username does not exist');
        } else {
          register.restrictions.existingUsername = true;
          console.log('Username exists');
        }
      });
  }

  //  Check password requirements
  register.comparePassword = () => {
    if ((register.user.password.length >= 8) && (register.user.password != register.confirm)) {
      register.restrictions.matchingPassword = false;
      console.log('Not a match');
    } else {
      register.restrictions.matchingPassword = true;
      console.log('Match');
    }
    // Function to check requirements
    register.checkRequirements();
  }

  //  Check all profile requirements
  register.checkRequirements = () => {
    let { existingUsername, validEmail, matchingPassword } = register.restrictions;
    if (existingUsername && validEmail && matchingPassword) {
      register.failure = false;
    } else {
      register.failure = true;
    }
  }

  //  Submit user information
  register.submitProfile = () => {
    console.log(register.user);
  }


}
