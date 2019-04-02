/* CSC309 - user and resource authentication */

'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client

const { ObjectID } = require('mongodb')
const { mongoose } = require('./mongo/mongoose');
const { Food, FoodType, Store } = require('./mongo/models')
const session = require('express-session')
const { User } = require('./mongo/user-model')

// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))

// static js directory
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/imgs", express.static(__dirname + '/public/imgs'))
app.use("/js", express.static(__dirname + '/public/js'))

app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))

app.route('/').get((req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})


app.get('/foodTypes', (req, res) => {
	FoodType.find({}).then(foodTypesDict => {
		res.send(foodTypesDict)
	}, (error) => {
		res.status(500).send(error)

/** User routes **/

/**
 * Used when the user signs up
 *
 * Request body should look like:
 * {
 * 		username: username,
 * 		password: password,
 * 		location: location (postalcode), 
 * }
 *
 * On success, the newly created user object is returned
 * On failure, (duplicate username / username or password is too short)
 * a 400 error code and an appropriate error message is returned.
 */
app.post('/signup', (req, res) => {
	// Create a new user
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		location: req.body.location
	})

	// save user to database
	user.save().then((result) => {
		res.send(user)
	}).catch((error) => {
		let msg = 'Invalid data has been entered.'

		if (!error.errors) {
			msg = 'Someone is already using that username.'
		} else if (error.errors.password) {
			msg = error.errors.password.message
		} else if (error.errors.username) {
			msg = error.errors.username.message
		} else if (error.errors.location) {
			msg = error.errors.location.message
		}
		res.status(400).send(msg);
	})
})

/**
 * Used when the user attempts to login
 *
 * Request body should look like:
 * {
 * 		username: username,
 * 		password: password
 * }
 *
 * #TODO need to figure out what to return
 * so that the front end page can show a "logout" button
 * instead of login. (maybe handlebars)
 */
app.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	User.findByLoginCredentials(username, password).then((user) => {
		if(!user) {
			res.send('LOGIN FAILED!')
		} else {
			// Add the user to the session cookie that we will
			// send to the client
			req.session.user_id = user._id;
			req.session.username = user.username;
			res.send(user)
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});



