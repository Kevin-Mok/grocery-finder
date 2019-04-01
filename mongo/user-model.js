/* Users model */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// We'll make this model in a different way

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required.'],
		minlength: [1, 'Username field is empty.'],
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required.'],
		minlength: [6, 'Password must be at least 6 characters long.']
	},

	// postal code
	location: { 
		type: String,
		required: [true, 'Postal code is required.']
	},

	dateJoined: { type: Date, default: Date.now },
	lastLogin: { type: Date, default: Date.now },
	profilePicture: { type: String, default: ''},
	bannedUntil: { type: Date, default: null },
	isAdmin: false
})


// Returns a promise where:
//     on success, the user with provided username 
//     and password is returned
//
//     on failure, a message is returned
//
// This function is used when the user attempts to login with username and password
UserSchema.statics.findByLoginCredentials = function(username, password) {
	const User = this

	return User.findOne({ username }).then((user) => {

		if (!user) {
			return Promise.reject('Wrong username.')
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject('Wrong password.');
				}
			})
		})
	})
}

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
	const user = this

	// Ensures that we salt our password once and only once
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(user.password, salt, (error, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next();
	}
})


const User = mongoose.model('User', UserSchema)

module.exports = { User }