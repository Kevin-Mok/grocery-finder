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
//     <i class="fas fa-envelope popup-icon"></i><input class="input-box" type="email" placeholder="Email">
//   </div>
//   <div class="popup-input-div">
//     <i class="fas fa-unlock popup-icon"></i><input class="input-box" type="password" placeholder="Password">
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

  const usernameDiv = createInputPopupDiv("fa-envelope", "email", "Email", "loginEmail");
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

function openSignupPopup() {
  blurBackgroundToggle();
  const popup = document.createElement("div");
  popup.className = "popup";

  const h1 = createElementWithText('h1', 'popup-title', '', 'Sign up');
  const p1 = createElementWithText('p', 'popup-text', '', 'Your groceries are just a click away!');

  const usernameDiv = createInputPopupDiv("fa-envelope", "email", "Email");
  const passwordDiv = createInputPopupDiv("fa-unlock", "password", "Password");

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
  popup.appendChild(loginBtn);
  popup.appendChild(cancelBtn);
  popup.appendChild(p2);

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
  i.className = "fas " + iconName + " popup-icon";
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
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  if (loginEmail == 'admin' && loginPassword == 'admin') {
    alert("Login Successful");
    closePopup();
  } else {
    alert("Login Unsuccessful");
  }
}
