// Javascript source code for adminPage.html
'use strict'

let users = [];			// holds User's that ARE NOT filtered out by the search function
let hiddenUsers = [];	// holds User's that ARE filtered out 

class User {
	constructor(username, password, location, dateJoined, lastLogin, profilePicture, bannedUntil, isAdmin) {
		this.username = username;
		this.password = password;
		this.location = location;
		this.dateJoined = dateJoined;
		this.lastLogin = lastLogin;
		this.profilePicture = profilePicture;   //the url to where their profile picture is stored
		this.bannedUntil = bannedUntil;	// the Date that this user is unbanned. If user is not banned, this is null.
		this.isAdmin = isAdmin;
	}
}

// Dummy user data for phase 1

users.push(new User("Obama", "america", "Narnia", new Date("September 21, 2017 05:25:11"), new Date("February 20, 2018 06:21:33"), 'imgs/profile-pictures/obama.jpg', null, false));
users.push(new User("ProGamer", "1336", "Westeros", new Date("May 11, 2016 09:29:29"), new Date("May 11, 2016 09:29:29"),'imgs/profile-pictures/progamer.jpeg', null));
users.push(new User("TimeTraveller", "timeisaconstruct", "Essos",new Date("December 19, 2019 18:59:59"), new Date("December 20, 2019 17:10:02"), 'imgs/profile-pictures/timetraveller.jpeg', null, false));
users.push(new User("Ronald", "password", "Smallville", new Date("August 5, 2017 17:21:22"), new Date("August 5, 2017 17:21:22"), 'imgs/profile-pictures/default.jpg', null, false));
users.push(new User("Bucky", "chickensoup", "New Boston", new Date("January 6, 2016 01:45:00"), new Date("January 6, 2016 07:12:32"), 'imgs/profile-pictures/default.jpg', null, false));
users.push(new User("Tony", "password", "Ba Sing Se", new Date("February 28, 2019 05:27:19"), new Date("January 19, 2019 05:27:19"), 'imgs/profile-pictures/default.jpg', null, false));
users.push(new User("Barnes", "pizza", "Pluto", new Date("July 1, 2017 23:21:19"), new Date("July 4, 2017 23:59:59"), 'imgs/profile-pictures/barnes.jpeg', null, false));


// loadUsers fills the user listing box
function loadUsers() {

	sortUsers();

	const userListingBox = document.querySelector('.userListingBox');

	for (let i = 0; i < users.length; i++) {

		const newEntry = document.createElement('div');
		newEntry.className = 'userEntryFrame';

		const newEntryProfilePictureFrame = document.createElement('div');
		newEntryProfilePictureFrame.className = 'userEntryProfilePictureFrame';
		const newEntryProfilePicture = document.createElement('img');
		newEntryProfilePicture.className = 'userEntryProfilePicture';
		newEntryProfilePicture.setAttribute('src', users[i].profilePicture);
		newEntryProfilePictureFrame.appendChild(newEntryProfilePicture);

		newEntry.appendChild(newEntryProfilePictureFrame);

		const newEntryTextFrame = document.createElement('div');
		newEntryTextFrame.className = 'userEntryTextFrame';
		const newEntryText = document.createElement('div');
		newEntryText.className = 'userEntryText';
		const newEntryUsernameSubtitle = document.createElement('strong');
		newEntryUsernameSubtitle.innerText = 'Username:';
		const newEntryUsername = document.createElement('p');
		newEntryUsername.innerText = users[i].username;
		newEntryText.appendChild(newEntryUsernameSubtitle);
		newEntryText.appendChild(newEntryUsername);
		newEntryTextFrame.appendChild(newEntryText);

		newEntry.appendChild(newEntryTextFrame);

		// Attach the user object to the new element. This will make it easy to access
		// the user object when the HTML element is clicked.
		newEntry.user = users[i];

		newEntry.addEventListener('click', userSelected);
		userListingBox.appendChild(newEntry);
	}

}


/* 	Called when the client clicks on one of the listed user profiles in the user listing box.
	Loads user profile information onto the selected user frame */
function userSelected(e) {
	let target = e.target;

	while (target.classList.contains('userEntryFrame') == false) {
		target = target.parentElement;
	}

	const selectedUserFrame = document.querySelector('.selectedUserFrame');
	// Clear the current HTML contents within the selected user frame
	while (selectedUserFrame.firstChild) {
		selectedUserFrame.removeChild(selectedUserFrame.firstChild);
	}

	selectedUserFrame.user = target.user;
	
	const selectedUserProfilePictureFrame = document.createElement('div');
	selectedUserProfilePictureFrame.className = 'selectedUserProfilePictureFrame';
	const selectedUserProfilePicture = document.createElement('img');
	selectedUserProfilePicture.src = target.user.profilePicture;
	selectedUserProfilePicture.className = 'selectedUserProfilePicture';
	selectedUserProfilePictureFrame.appendChild(selectedUserProfilePicture);

	selectedUserFrame.appendChild(selectedUserProfilePictureFrame);

	const selectedUserDetailsFrame = document.createElement('div');
	selectedUserDetailsFrame.className = 'selectedUserDetailsFrame';
	const selectedUserTitle = document.createElement('strong');
	selectedUserTitle.className = 'selectedUserTitle';
	const selectedUserTitleText = document.createTextNode(target.user.username);
	selectedUserTitle.appendChild(selectedUserTitleText);
	selectedUserDetailsFrame.appendChild(selectedUserTitle);
	const selectedUserTimeDetails = document.createElement('p');
	selectedUserTimeDetails.className = 'selectedUserTimeDetails';
	const selectedUserLastLoginText = document.createTextNode(`Last Login: ${target.user.lastLogin.toLocaleDateString()} ${target.user.lastLogin.toLocaleTimeString()}`); 
	selectedUserTimeDetails.appendChild(selectedUserLastLoginText);
	const lineBreak = document.createElement('br');
	selectedUserTimeDetails.appendChild(lineBreak);
	const selectedUserDateRegisteredText = document.createTextNode(`Date Joined: ${target.user.dateJoined.toLocaleDateString()} ${target.user.dateJoined.toLocaleTimeString()}`)
	selectedUserTimeDetails.appendChild(selectedUserDateRegisteredText);
	selectedUserDetailsFrame.appendChild(selectedUserTimeDetails);

	selectedUserFrame.appendChild(selectedUserDetailsFrame);

	//create delete user button
	if (!target.user.isAdmin) {

		const deleteUserButton = document.createElement('div');
		deleteUserButton.className = 'deleteUserButton';

		const deleteUserButtonText = document.createTextNode('Delete User');
		deleteUserButton.appendChild(deleteUserButtonText);

		deleteUserButton.addEventListener('click', deleteUser);

		selectedUserFrame.appendChild(deleteUserButton);
	
	}

	createPasswordTextForm(target.user.password, selectedUserFrame);

	createAdminFields(target.user.isAdmin, selectedUserFrame);

	if (!target.user.isAdmin) {
		createSetToDefaultProfilePictureButton(selectedUserFrame);
	}

}

function createSetToDefaultProfilePictureButton(parentDiv) {

	const button = document.createElement('div');
	button.className = 'setToDefaultProfilePictureButton';
	button.innerText = 'Set to Default Profile Picture';
	button.addEventListener('click', setToDefaultProfilePictureClicked);

	parentDiv.append(button);

}

function setToDefaultProfilePictureClicked(e) {
	console.log(e.target.parentElement.user);
	if (confirm("Set this user's profile picture to the default picture.\n(Click 'OK' to confirm)")) {
		e.target.parentElement.user.profilePicture = 'imgs/profile-pictures/default.jpg';
		updateUserListingBox();
		reloadSelectedUserFrameWithCurrentUser();
	}
}

function createAdminFields(isAdmin, parentDiv) {
	const frame = document.createElement('div');
	frame.className = 'adminFieldsFrame';
	const subtitle = document.createElement('strong');
	subtitle.className = 'adminFieldsSubtitle';
	subtitle.innerText = 'Administrator? ';

	frame.appendChild(subtitle);

	if (isAdmin) {
		const userIsAdminText = document.createTextNode('Yes');

		frame.appendChild(userIsAdminText);

	} else {
		const userIsNotAdminText = document.createTextNode('No');

		frame.appendChild(userIsNotAdminText);

		const promoteToAdminButton = document.createElement('div');
		promoteToAdminButton.className = 'promoteToAdminButton';
		promoteToAdminButton.innerText = 'Promote to Administrator'
		promoteToAdminButton.addEventListener('click', promoteToAdmin);

		frame.appendChild(promoteToAdminButton);

	}

	parentDiv.appendChild(frame);
}

function promoteToAdmin(e) {
	if (confirm("Are you sure you want to promote this user to administrator status?" +
		"\nThis user will be able to access and modify user profiles." +
		"\nThis action cannot be undone, and you will not be able to revoke administrator privilege." + 
		"\n\n                                      (Press 'OK' to confirm)")) {
		const userToChange = e.target.parentElement.parentElement.user;   //e.target.parentElement.parentElement is the selectedUserFrame
		userToChange.isAdmin = true;
		console.log(userToChange);
		reloadSelectedUserFrameWithCurrentUser();
	}
}

function censorText(text) {
	let result = '';
	for (let i = 0; i < text.length; i++) {
		result += '*';
	}
	return result;
}


function createPasswordTextForm(text, parentDiv) {

	const selectedUserPasswordFrame = document.createElement('div');
	selectedUserPasswordFrame.className = 'selectedUserPasswordFrame';
	const selectedUserPasswordSubtitle = document.createElement('strong');
	selectedUserPasswordSubtitle.innerText = 'Password: ';
	let selectedUserPasswordText = document.createTextNode('a');
	if (parentDiv.user.isAdmin) {
		selectedUserPasswordText = document.createTextNode(censorText(text));
	} else {
		selectedUserPasswordText = document.createTextNode(text);
	}
	console.log(selectedUserPasswordText);
	selectedUserPasswordText.className = 'selectedUserPasswordText';
	selectedUserPasswordFrame.append(selectedUserPasswordSubtitle);
	selectedUserPasswordFrame.appendChild(selectedUserPasswordText);

	
	if (!parentDiv.user.isAdmin) {

		const editPasswordButton = document.createElement('div');
		editPasswordButton.innerText = 'Edit';
		editPasswordButton.className = 'editPasswordButton';
		editPasswordButton.addEventListener('click', editPasswordClicked);
		selectedUserPasswordFrame.appendChild(editPasswordButton);
	
	}


	parentDiv.appendChild(selectedUserPasswordFrame);
	

}

function editPasswordClicked(e) {

	const frame = e.target.parentElement;
	let originalText = '';
	while (frame.firstChild) {
		if (frame.firstChild.nodeType == 3) {    // if frame.firstChild is a text node
			originalText = frame.firstChild.textContent;
		}
		frame.removeChild(frame.firstChild);
	}

	const inputTextField = document.createElement('input');
	inputTextField.setAttribute('type', 'text');
	inputTextField.setAttribute('placeholder', originalText);
	inputTextField.style.float = 'left';
	inputTextField.className = 'inputTextField';

	const saveChangesButton = document.createElement('div');
	saveChangesButton.className = 'saveChangesButton';
	saveChangesButton.innerText = 'Save Changes';
	saveChangesButton.addEventListener('click', saveChangesClicked);

	const cancelChangesButton = document.createElement('div');
	cancelChangesButton.className = 'cancelChangesButton';
	cancelChangesButton.innerText = 'X';
	cancelChangesButton.addEventListener('click', cancelChangesClicked);

	frame.appendChild(inputTextField);
	frame.appendChild(saveChangesButton);
	frame.appendChild(cancelChangesButton);
	
}

function saveChangesClicked(e) {
	const frame = e.target.parentElement;
	let currentNode = frame.firstChild;
	while (currentNode != null && (!currentNode.classList.contains('inputTextField'))) {
		currentNode = currentNode.nextSibling;
	}
	const newText = currentNode.value;
	if (newText.length < 4) {
		alert("Password must be at least 4 characters long!");
		return;
	}
	while (frame.firstChild) {
		frame.removeChild(frame.firstChild);
	}

	const parentDiv = frame.parentElement;
	const affectedUser = parentDiv.user;
	affectedUser.password = newText;
	createPasswordTextForm(newText, parentDiv);

}

function cancelChangesClicked(e) {
	const frame = e.target.parentElement;
	let currentNode = frame.firstChild;
	while (currentNode != null && (!currentNode.classList.contains('inputTextField'))) {
		currentNode = currentNode.nextSibling;
	}
	while (frame.firstChild) {
		frame.removeChild(frame.firstChild);
	}
	const originalText = currentNode.placeholder;
	const parentDiv = frame.parentElement;
	createPasswordTextForm(originalText, parentDiv);
}


function deleteUser(e) {

	const verification = window.prompt("Are you sure you want to permanently delete this user? \n (Type exactly 'delete' and press OK to confirm)");

	if (verification == 'delete') {
	
		const targetUser = e.target.parentElement.user;

		users = users.filter(function(user) {return user.username != targetUser.username});
		hiddenUsers = hiddenUsers.filter(function(user) {return user.username != targetUser.username});

		clearFilter();
		updateUserListingBox();
		resetSelectedUserFrame();

	}
	
}

/* Clear, and reload the user listing box */
function updateUserListingBox() {
	const userListingBox = document.querySelector('.userListingBox');
	while (userListingBox.firstChild) {
		userListingBox.removeChild(userListingBox.firstChild);
	}
	loadUsers();
}

function resetSelectedUserFrame() {

	/* Clear, and reload the selected user box with the initial text*/
	const selectedUserFrame = document.querySelector('.selectedUserFrame');
	while (selectedUserFrame.firstChild) {
		selectedUserFrame.removeChild(selectedUserFrame.firstChild);
	}
	const selectedUserFrameInitial = document.createElement('div');
	selectedUserFrameInitial.className = 'selectedUserFrameInitialText';
	const selectedUserFrameInitialText = document.createTextNode('Start by selecting a listed user');
	selectedUserFrameInitial.appendChild(selectedUserFrameInitialText);
	selectedUserFrame.appendChild(selectedUserFrameInitial);

}

function reloadSelectedUserFrameWithCurrentUser() {
	const currentUser = document.querySelector('.selectedUserFrame').user;
	const userListingBox = document.querySelector('.userListingBox');
	let childNode = userListingBox.firstChild;
	while (childNode != null) {
		if (childNode.user == currentUser) {
			childNode.click();
		}
		childNode = childNode.nextSibling;
	}

}


function applyFilter(e) {
	e.preventDefault();

	transferHiddenUsers();

	const filterText = document.querySelector('#searchBar').value.toLowerCase();

	hiddenUsers = users.filter(function(user) {return !(user.username.toLowerCase().startsWith(filterText))});
	users = users.filter(function(user) {return user.username.toLowerCase().startsWith(filterText)});


	updateUserListingBox();

}

function clearFilter(e) {
	transferHiddenUsers();
	hiddenUsers = [];
	document.querySelector('#searchBar').value = '';
	updateUserListingBox();
	
}

function transferHiddenUsers() {
	for (let i = 0; i < hiddenUsers.length; i++) {
		users.push(hiddenUsers[i]);
	}
	hiddenUsers = [];
}

/* Sorts the User objects in users so that they are listed alphabetically according to their usernames */
function sortUsers() {
	function compareUsernames(userA, userB) {
		if (userA.username < userB.username) { return -1; }
		if (userA.username > userB.username) { return 1; }
		return 0;
	}
	users.sort(compareUsernames);
	 
}

document.addEventListener("DOMContentLoaded", main);


function main() {

	document.body.background = './imgs/adminPageBackgrounds/adminpagebackground.jpg';
	loadUsers();
	const searchBar = document.querySelector('#searchBar');
	searchBar.addEventListener('keyup', applyFilter);
	const searchButton = document.querySelector('.searchButton');
	searchButton.addEventListener('click', applyFilter);
	const clearFilterButton = document.querySelector('.clearFilterButton');
	clearFilterButton.addEventListener('click', clearFilter);
	
}
