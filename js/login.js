// This javascript file handles user interaction when the user clicks
// the "Login" and "Sign up" buttons

function signInLinkClicked() {
  closePopup();
  openSignupPopup();
}

function logInLinkClicked() {
  closePopup();
  openLoginPopup();
}


// Create this:
// <div class="popup">
//   <h1 class="popup-title">Login</h1>
//   <p class="popup-text">Your groceries are just a click away!</p>
//   <div class="popup-input-div">
//     <i class="fas fa-envelope popup-icon"></i>
//     <input class="input-box" id="loginUsername" type="text" placeholder="Username">
//   </div>
//   <div class="popup-input-div">
//     <i class="fas fa-unlock popup-icon"></i>
//     <input class="input-box" id="loginPassword" type="password" placeholder="Password">
//   </div>
//   <button class="btn btn-primary popup-button" id="popupLoginBtn">Login</button>
//   <button class="btn btn-danger popup-button" id="popupCancelBtn">Cancel</button>
//   <p class="popup-text">Don't have an account yet? <a href="#" onclick="loginClicked()">Sign up!</a></p>
// </div>
function openLoginPopup() {

  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup";

  const h1 = createElementWithText('h1', 'popup-title', '', 'Login');
  const p1 = createElementWithText('p', 'popup-text', '', 'Your groceries are just a click away!');

  const usernameDiv = createInputPopupDiv("fa-envelope", "text", "Username", "loginUsername");
  const passwordDiv = createInputPopupDiv("fa-unlock", "password", "Password", "loginPassword");

  const loginBtn = createElementWithText("button", "btn btn-primary popup-button", "popupLoginBtn", "Login");
  loginBtn.setAttribute("onclick", "loginBtnClicked()");
  const cancelBtn = createElementWithText("button", "btn btn-danger popup-button", "popupCancelBtn", "Cancel");
  cancelBtn.setAttribute("onclick", "closePopup()");

  const p2 = createElementWithText("p", "popup-text", "", "Dont have an account yet? ");
  const signupLink = createElementWithText("a", "", "", "Sign up!");
  signupLink.setAttribute("href", "#");
  signupLink.setAttribute("onclick", "signInLinkClicked()");
  p2.appendChild(signupLink);

  popup.appendChild(h1);
  popup.appendChild(p1);
  popup.appendChild(usernameDiv);
  popup.appendChild(passwordDiv);
  popup.appendChild(loginBtn);
  popup.appendChild(cancelBtn);
  popup.appendChild(p2);

  document.body.appendChild(popup);

}

// To access the Username, Password, Postal Code input fields,
// use #signInUsername, #signInPassword and #signInPostalCode respectively
function openSignupPopup() {
  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup popup-larger";

  const h1 = createElementWithText('h1', 'popup-title', '', 'Sign up');
  const p1 = createElementWithText('p', 'popup-text', '', 'Your groceries are just a click away!');

  const usernameDiv = createInputPopupDiv("fa-envelope", "text", "Username", "signInUsername");
  const passwordDiv = createInputPopupDiv("fa-unlock", "password", "Password", "signInPassword");
  const postalCodeDiv = createInputPopupDiv("fa-map-marker-alt popup-icon-left-padding", "text", "Postal Code", "signInPostalCode");
  postalCodeDiv.getElementsByTagName("input")[0].id = 'postalCodeInput';

  const postalCodeQuestionBtn = createElementWithText("button", "btn btn-primary", "postalCodeQuestionBtn", "");
  const questionIcon = createElementWithText("i", "fas fa-question", "", "");
  postalCodeQuestionBtn.setAttribute("data-toggle", "popover");
  postalCodeQuestionBtn.setAttribute("data-trigger", "focus");
  postalCodeQuestionBtn.setAttribute("data-placement", "right");
  postalCodeQuestionBtn.appendChild(questionIcon);
  postalCodeDiv.appendChild(postalCodeQuestionBtn);

  const loginBtn = createElementWithText("button", "btn btn-primary popup-button", "popupLoginBtn", "Signup");
  const cancelBtn = createElementWithText("button", "btn btn-danger popup-button", "popupCancelBtn", "Cancel");
  cancelBtn.setAttribute("onclick", "closePopup()");

  const p2 = createElementWithText("p", "popup-text", "", "Already have an account? ");
  const logInLink = createElementWithText("a", "", "", "Log in!");
  logInLink.setAttribute("href", "#");
  logInLink.setAttribute("onclick", "logInLinkClicked()");
  p2.appendChild(logInLink);

  popup.appendChild(h1);
  popup.appendChild(p1);
  popup.appendChild(usernameDiv);
  popup.appendChild(passwordDiv);
  popup.appendChild(postalCodeDiv)
  popup.appendChild(loginBtn);
  popup.appendChild(cancelBtn);
  popup.appendChild(p2);

  document.body.appendChild(popup);

  // Code for the popover element for the postal code question mark button
  $('#postalCodeQuestionBtn').popover({
    container: 'body',
    title: "Why do we need your postal code?",
    content: "Grocery Finder needs your postal code to provide you grocery prices and deals specific to your region."
  })
}

function closePopup() {
  blurBackgroundToggle();
  document.querySelector('.popup').remove();
}

// Create this:
// <div class="popup-input-div">
//   <i class="fas {@param iconName} popup-icon"></i><input class="input-box" type="{@param type}" placeholder="{@param placeholder}" id="{@param id}">
// </div>
function createInputPopupDiv(iconName, type, placeholder, id) {
  const div = document.createElement("div");
  const i = document.createElement("i");
  div.className = "popup-input-div"
  i.className = "popup-icon fas " + iconName;
  div.appendChild(i);

  const input = document.createElement("input");
  input.className = "input-box";
  input.setAttribute("type", type);
  input.placeholder = placeholder;
  input.id = id;
  div.appendChild(input);

  return div;
}


// Returns a dynamically created DOM element el, with
// its class set as classes, set its id as id and with a textnode text as its child
function createElementWithText(el, classes, id, text) {
  const element = document.createElement(el);
  element.className = classes;
  element.id = id;
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

function blurBackgroundToggle() {
  const mainContainer = document.querySelector(".container-fluid");
  mainContainer.classList.toggle("blur");
}

function loginBtnClicked() {
  const loginUsername = document.querySelector("#loginUsername").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  if (loginUsername == 'admin' && loginPassword == 'admin') {
    alert("Admin Login Successful. (Redirect to the admin page)");
    closePopup();
  } else if (loginUsername == 'user' && loginPassword == 'user') {
    alert("User Login Successful. (Redirect to the user page)" );
    closePopup();
  } else {
    alert("User Login Successful. (Redirect to the user page)" );
  }
}


// The following code handles the funcitonality where the login and signup
// popup dissappear when you click outside the popup, or if you hit the
// Esc key.

$("body").click(function(e) {

  // Without this check, the popup dissappears right after you click
  // the Login and Signup buttons in the dropdown
  if (e.target.id == 'openSignupPopup' || e.target.id == 'openLoginPopup') {
    return;
  }
  
  const p = $('.popup');
  // If popup currently exists and the user clicked outside of it
  if (p.length > 0 && !isPartOfPopup(e.target)) {
    closePopup();
  }
});

$(document).keyup(function(e) {
  if (e.key === "Escape" && $('.popup').length > 0) { // escape key maps to keycode `27`
    closePopup();
  }
});

/**
 * Returns true if node is an element with the .popup class,
 * or node is an ancestor that has the .popup class
 */
function isPartOfPopup(node) {
  let child = node;
  while (child !== null) {
    if (child.classList && child.classList.contains('popup')) {
      return true;
    }
    child = child.parentNode;
  }
  return false;
}
