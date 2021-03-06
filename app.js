const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const logginForm = document.getElementById("loggin");
const loginBtn = document.querySelector(".login-btn");
const logginUser = document.getElementById("logginUsername");
const logginPass = document.getElementById("logginPassword");
const accountRegistered = document.querySelector(".account-loggin");
const notRegistered = document.querySelector(".account-register");
const register = document.querySelector(".register");
const login = document.querySelector(".login");
//Event Listeners
//REGISTER Listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  requiredCheck([username, email, password, password2]);
  lengthCheck(username, 3, 15);
  lengthCheck(password, 6, 25);
  passwordCheck(password, password2);
  emailCheck(email);
});
// LOGGIN Listener
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  requiredCheck([logginUser, logginPass]);
  let curentUser = {
    username: document.getElementById("logginUsername").value,
    password: document.getElementById("logginPassword").value,
  };
  const user = localStorage.getItem(`${curentUser.username} new user`);
  const curentUserStr = JSON.stringify(curentUser);
  if (user === curentUserStr) {
    logginForm.classList.add("active");
    document.querySelector(".logginH11").style.display = "block";
    document.querySelector(".logginH11").textContent = "Succesfully Logged In";
    document.querySelector(".logginH12").textContent = curentUser.username;
  } else {
    document.querySelector(".logginH11").textContent = "Try Again";
    displayError(logginUser, "Username is invalid");
    displayError(logginPass, "Password is invalid");
  }
});
accountRegistered.addEventListener("click", function () {
  registered();
});
notRegistered.addEventListener("click", function () {
  e.preventDefault();
  noAccount();
});

//functions
//Input field name
function fieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Input completion required
function requiredCheck(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value === "") {
      displayError(input, `${fieldName(input)} is required`);
    } else {
      displaySuccess(input);
      let user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };
      localStorage.setItem(`${username.value} new user`, JSON.stringify(user));
    }
  });
}

//Input Error Message
function displayError(input, message) {
  const controlWrapper = input.parentElement;
  controlWrapper.className = "control-wrapper error";
  const spanTag = controlWrapper.querySelector("span");
  spanTag.innerText = message;
}
//Input success
function displaySuccess(input) {
  const controlWrapper = input.parentElement;
  controlWrapper.className = "control-wrapper success";
}

//length check
function lengthCheck(input, min, max) {
  if (input.value.length < min) {
    displayError(
      input,
      `${fieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    displayError(
      input,
      `${fieldName(input)} must be less than ${max} characters`
    );
  }
}

// password validation
function passwordCheck(input1, input2) {
  if (input1.value !== input2.value) {
    displayError(input2, `Passwords are not matching`);
  }
}

//email validation
function emailCheck(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    displaySuccess(input);
  } else {
    displayError(input, `Email is not valid`);
  }
}
//already registered

function registered() {
  var register = document.querySelector(".register");
  var login = document.querySelector(".login");
  document.querySelector(".logginH11").textContent = "Login";
  document.querySelector(".logginH12").textContent = username.value;
  register.style.display = "none";
  login.style.display = "block";
}
// not registered
function noAccount() {
  register.style.display = "block";
  login.style.display = "none";
}
