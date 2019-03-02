// Javascript source code for adminPage.html
'use strict'

let users = [];			// holds User's that ARE NOT filtered out by the search function
let hiddenUsers = [];	// holds User's that ARE filtered out 

class User {
	constructor(username, dateJoined, lastLogin, profilePicture, bannedUntil) {
		this.username = username;
		this.dateJoined = dateJoined;
		this.lastLogin = lastLogin;
		this.profilePicture = profilePicture;   //the url to where their profile picture is stored
		this.bannedUntil = bannedUntil;	// the Date that this user is unbanned. If user is not banned, this is null.
	}
}

// Dummy user data for phase 1

users.push(new User("Obama", new Date("September 21, 2017 05:25:11"), new Date("February 20, 2018 06:21:33"), 'imgs/profile-pictures/obama.jpg', null));
users.push(new User("ProGamer", new Date("May 11, 2016 09:29:29"), new Date("May 11, 2016 09:29:29"),'imgs/profile-pictures/progamer.jpeg', null));
users.push(new User("TimeTraveller", new Date("December 19, 2019 18:59:59"), new Date("December 20, 2019 17:10:02"), 'imgs/profile-pictures/timetraveller.jpeg', null));
users.push(new User("Ronald", new Date("August 5, 2017 17:21:22"), new Date("August 5, 2017 17:21:22"), 'imgs/profile-pictures/default.jpg', null));
users.push(new User("Bucky", new Date("January 6, 2016 01:45:00"), new Date("January 6, 2016 07:12:32"), 'imgs/profile-pictures/default.jpg', null));
users.push(new User("Tony", new Date("February 28, 2019 05:27:19"), new Date("January 19, 2019 05:27:19"), 'imgs/profile-pictures/default.jpg', null));
users.push(new User("Barnes", new Date("July 1, 2017 23:21:19"), new Date("July 4, 2017 23:59:59"), 'imgs/profile-pictures/barnes.jpeg', null));


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

	const deleteUserButton = document.createElement('div');
	deleteUserButton.className = 'deleteUserButton';
	const deleteUserButtonText = document.createTextNode('Delete User');
	deleteUserButton.appendChild(deleteUserButtonText);

	deleteUserButton.addEventListener('click', deleteUser);

	selectedUserFrame.appendChild(deleteUserButton);


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
/*  Commented out code periodically changes background of page. 
	===================================TODO: Make this look nicer or delete=========================================

	changeBackgroundParameters();
	document.body.background = window.bgSource;
	setInterval (function () {
		changeBackgroundParameters();
		document.body.background = window.bgSource;
	}, 10000);

	function changeBackgroundParameters() {
		window.bgIndex = (Math.floor((Math.random())*10)) + 1;
		window.bgSource = `./imgs/adminPageBackgrounds/bg${bgIndex}proto.jpeg`;
	}

*/
	
	document.body.background = './imgs/adminPageBackgrounds/adminpagebackground.jpg';
	loadUsers();
	const searchBar = document.querySelector('#searchBar');
	searchBar.addEventListener('keyup', applyFilter);
	const searchButton = document.querySelector('.searchButton');
	searchButton.addEventListener('click', applyFilter);
	const clearFilterButton = document.querySelector('.clearFilterButton');
	clearFilterButton.addEventListener('click', clearFilter);
	
}
