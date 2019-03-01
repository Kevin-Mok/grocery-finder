// Javascript source code for adminPage.html
'use strict'

let users = [];

class User {
	constructor(username, dateJoined, profilePicture, isBanned) {
		this.username = username;
		this.dateJoined = dateJoined;
		this.profilePicture = profilePicture;   //the url to where their profile picture is stored
		this.isBanned = isBanned;
	}
}

// Dummy user data for phase 1

users.push(new User("Obama", new Date("September 21, 2017 05:25:11"), 'imgs/profile-pictures/obama.jpg', false));
users.push(new User("ProGamer", new Date("May 11, 2016 09:29:29"), 'imgs/profile-pictures/default.jpg', false));
users.push(new User("TimeTraveller", new Date("December 19, 2019 18:59:59"), 'imgs/profile-pictures/default.jpg', false));
users.push(new User("Ronald", new Date("August 5, 2017 17:21:22"), 'imgs/profile-pictures/default.jpg', false));
users.push(new User("Bucky", new Date("January 6, 2016 01:45:00"), 'imgs/profile-pictures/default.jpg', false));
users.push(new User("Tony", new Date("February 28, 2019 05:27:19"), 'imgs/profile-pictures/default.jpg', false));
users.push(new User("Barnes", new Date("July 1, 2017 23:21:19"), 'imgs/profile-pictures/default.jpg', false));


// loadUsers fills the user listing box
function loadUsers() {

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

		userListingBox.appendChild(newEntry);
	}

}

document.addEventListener("click", userSelected);

function userSelected(e) {
	if (e.target.classList.contains('userEntryFrame')) {
		console.log('hello');
	} 
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
		window.bgSource = `adminPageBackgrounds/bg${bgIndex}proto.jpeg`;
	}
*/
	loadUsers();
	
}