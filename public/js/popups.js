// This javascript file handles user interaction for popups
// This includes the interactions for login, signup, user settings and save carts

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
//
// Create this:
//
// <div class="popup">
//   <h1 class="popup-title" id="">Sign up</h1>
//   <p class="popup-text" id="">Your groceries are just a click away!</p>
//   <div class="popup-input-div"><i class="popup-icon fas fa-envelope"></i><input class="input-box" type="text" placeholder="Username" id="signInUsername"></div>
//   <div class="popup-input-div"><i class="popup-icon fas fa-unlock"></i><input class="input-box" type="password" placeholder="Password" id="signInPassword"></div>
//   <div class="popup-input-div">
//     <i class="popup-icon fas fa-map-marker-alt popup-icon-left-padding"></i>
//     <input class="input-box" type="text" placeholder="Postal Code" id="postalCodeInput">
//     <button class="btn btn-primary" id="postalCodeQuestionBtn" data-toggle="popover" data-trigger="focus" data-placement="right" data-original-title="" title=""><i class="fas fa-question" id=""></i></button>
//   </div>
//   <button class="btn btn-primary popup-button" id="popupLoginBtn">Signup</button><button class="btn btn-danger popup-button" id="popupCancelBtn" onclick="closePopup()">Cancel</button>
//   <p class="popup-text" id="">Already have an account? <a class="" id="" href="#" onclick="logInLinkClicked()">Log in!</a></p>
// </div>
function openSignupPopup() {
  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup";

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

  const signupBtn = createElementWithText("button", "btn btn-primary popup-button", "popupSignupBtn", "Signup");
  const cancelBtn = createElementWithText("button", "btn btn-danger popup-button", "popupCancelBtn", "Cancel");
  signupBtn.setAttribute("onclick", "signupBtnClicked()");
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
  popup.appendChild(signupBtn);
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

// Create this
// <div class="popup">
//   <h1 class="popup-title" id="">Current cart</h1>
//   <p class="popup-text" id="">Enter a name for your current cart.</p>
//   <div class="popup-input-div"><i class="fas fa-file-signature popup-icon"></i></i><input class="input-box" type="text" placeholder="Cart name" id="cartName"></div>
//
//   <button class="btn btn-primary popup-button" id="popupSaveBtn">Save cart</button>
//   <button class="btn btn-danger popup-button" id="popupCancelBtn" onclick="closePopup()">Cancel</button>
// </div>
function openCurrentCartPopup() {
  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup";

  const h1 = createElementWithText('h1', 'popup-title', '', 'Current cart');
  const p1 = createElementWithText('p', 'popup-text', '', 'Enter a name for your current cart.');

  const nameDiv = createInputPopupDiv('fa-file-signature', 'text', 'Cart name', 'cartName');

  const saveBtn = createElementWithText("button", "btn btn-primary popup-button", "popupSaveBtn", "Save cart");
  saveBtn.setAttribute("onclick", "cartSaveBtnClicked()");
  const cancelBtn = createElementWithText("button", "btn btn-danger popup-button", "popupCancelBtn", "Cancel");
  cancelBtn.setAttribute("onclick", "closePopup()");

  popup.appendChild(h1);
  popup.appendChild(p1);
  popup.appendChild(nameDiv);
  popup.appendChild(saveBtn);
  popup.appendChild(cancelBtn);

  document.body.appendChild(popup);
}

function cartSaveBtnClicked() {
  const cartName = $('#cartName').val()
  // SERVER DATA EXCHANGE: This is where the user is saving a cart.
  // Provide the server with the current user id, current cart contents and
  // saved cart name.
  user.savedCarts[cartName] = [...cart]; // es6 cloned cart

  // If saved carts dropdown is already visible, destory it and make a new one
  // with the newly saved cart
  if ($('.saved-carts-div').length) {
    $('.saved-carts-div').remove()
    createSavedCartsDiv()
  }

  closePopup()
}

function saveUserSettings() {

  // SERVER DATA EXCHANGE: This is where the user updates their user data.
  // Make a request to the server, providing the server with user.id,
  // new username, new password and new postal code.
  // The server then updates the user with new data in the database.
  //
  // The code below just modifies the global user object with the new data

  user.username = getEtfValue(document.querySelector('#etf-username'))
  user.password = getEtfValue(document.querySelector('#etf-password'))
  user.postalCode = getEtfValue(document.querySelector('#etf-postal-code'))

  closePopup()
}

function censorText(text) {
  return '*'.repeat(text.length)
  // return '•'.repeat(text.length)
}

function openSettingsPopup() {
  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "settings-popup";

  const h1 = createElementWithText('h1', 'popup-title', '', 'User Settings');

  const userInfoDiv = document.createElement('div')
  userInfoDiv.id = 'user-info-div'
  userInfoDiv.appendChild(createEtf('Username', user.username, 4, 20))
  // TODO: actually change user password with this. right now the censor breaks this //
  userInfoDiv.appendChild(createEtf('Password', censorText(user.password), 4, 20, true))
  userInfoDiv.appendChild(createEtf('Postal Code', user.postalCode, 6, 7))

  const saveChangesBtn = createElementWithText("button", "btn btn-primary popup-button", "popupLoginBtn", "Save Changes");
  saveChangesBtn.setAttribute("onclick", "saveUserSettings()");
  const cancelBtn = createElementWithText("button", "btn btn-danger popup-button", "popupCancelBtn", "Cancel");
  cancelBtn.setAttribute("onclick", "closePopup()");

  popup.appendChild(h1);
  popup.appendChild(userInfoDiv);
  popup.appendChild(saveChangesBtn);
  popup.appendChild(cancelBtn);

  document.body.appendChild(popup);
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

function signupBtnClicked() {
  // SERVER DATA EXCHANGE: This is where we handle new signups.
  //
  // After retrieving the new username, password and postalcode,
  // this data is sent to the server, which creates a new user in the
  // database.
  const username = document.querySelector("#signInUsername").value;
  const password = document.querySelector("#signInPassword").value;
  const postalCode = document.querySelector("#postalCodeInput").value;

  const reqBody = {
    username,
    password,
    location: postalCode
  }

  const url = '/signup'

  const request = new Request(url, {
    method: 'post', 
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  fetch(request).then(function(res) {

    if (res.status === 200) {
      return Promise.resolve('Signup Successful. Please login to continue.')
    }
    
    return res.text()
  }).then((res) => {
    alert(res)
  }).catch((error) => {
    alert(error)
  })



  closePopup();
}

function loginBtnClicked() {
  const loginUsername = document.querySelector("#loginUsername").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  // SERVER DATA EXCHANGE: This is where we check if the user-entered
  // user/pass credentials are correct.
  //
  // Make a request to the server providing the server with loginUsername and
  // loginPassword.  The server determines if login was successful or not
  //
  // The code below assumes that we only have two accounts, a dummy user
  // account and an admin account. It also assumes that a global 'user'
  // variable would be made availible.

  if (loginUsername == 'admin' && loginPassword == 'admin') {
    closePopup();

    const manageUsersDropdownItem = document.createElement('a');
    manageUsersDropdownItem.setAttribute('class', 'dropdown-item');
    manageUsersDropdownItem.setAttribute('href', 'adminPage.html');
    manageUsersDropdownItem.innerText = 'Manage Users';
    document.querySelector('#profileDropdown').appendChild(manageUsersDropdownItem);

    alert("Admin login Successful. 'Manage Users' is now available from the user dropdown menu.");
  } else if (loginUsername == 'user' && loginPassword == 'user') {
    closePopup();
  } else {
    alert("Incorrect credentials! Please try again.");
  }
}


// The following code handles the funcitonality where the login and signup
// popup dissappear when you click outside the popup, or if you hit the
// Esc key.

$('.openLoginPopup').click(openLoginPopup);
$('.openSignupPopup').click(openSignupPopup);
$('.openSettingsPopup').click(openSettingsPopup);

$("body").click((e) => {
// $("html").click((e) => {

  // Without this check, the popup dissappears right after you click
  // the Login and Signup buttons in the dropdown
  if (e.target.classList.contains('openSignupPopup') ||
    e.target.classList.contains('openLoginPopup') ||
    e.target.classList.contains('openSettingsPopup') ||
    e.target.classList.contains('save-cart-btn')) {
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
