// require {{{ //

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

// }}} require //

const StoreSchema = new Schema({//{{{
    name: String,
    address: String,
    imgSrc: String
})//}}}

const FoodTypeSchema = new Schema({//{{{
    name: String,
    subcategory: String,
    imgSrc: String
})//}}}

const FoodSchema = new Schema({//{{{
    foodType: Schema.Types.ObjectId,
    store: Schema.Types.ObjectId,
    price: Number
})//}}}

// user schema {{{ //

const UserSchema = new mongoose.Schema({//{{{
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
		minlength: [4, 'Password must be at least 4 characters long.']
	},

	// postal code
	postalCode: { 
		type: String,
		required: [true, 'Postal code is required.'],
		minlength: [6, 'Postal code must be 6 characters in length.'],
		maxlength: [6, 'Postal code must be 6 characters in length.']
	},

	dateJoined: { type: Date, default: Date.now },
	lastLogin: { type: Date, default: Date.now },
	profilePicture: { type: String, default: ''},
	bannedUntil: { type: Date, default: null },
	isAdmin: false,
	cart: [Schema.Types.ObjectId]
})//}}}

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
			return Promise.reject('Wrong username or password.')
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject('Wrong username or password.');
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

// }}} user schema //

// export {{{ //

const Food = mongoose.model('Food', FoodSchema);
const FoodType = mongoose.model('FoodType', FoodTypeSchema);
const Store = mongoose.model('Store', StoreSchema);
const User = mongoose.model('User', UserSchema)

module.exports = {
  Food,
  FoodType,
  Store,
  User
}

// }}} export //
