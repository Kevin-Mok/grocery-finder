/* CSC309 - user and resource authentication */

// require {{{ //

'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client

const { ObjectID } = require('mongodb')
const { mongoose } = require('./mongo/mongoose');
const { Food, FoodType, Store, User } = require('./mongo/models')
const session = require('express-session')

// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))

// }}} require //

// static js directory
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/imgs", express.static(__dirname + '/public/imgs'))
app.use("/js", express.static(__dirname + '/public/js'))

app.use(session({//{{{
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))//}}}

app.route('/').get((req, res) => {//{{{
  res.sendFile(__dirname + '/public/index.html')
})//}}}

app.route('/cart').get((req, res) => {//{{{
  res.sendFile(__dirname + '/public/cart.html')
})//}}}

app.get('/foodTypes', (req, res) => {//{{{
	FoodType.find({}).then(foodTypesDict => {
		res.send(foodTypesDict)
	}, (error) => {
		res.status(500).send(error)
	})
})//}}}

/** User routes **/

/** Used when the user signs up{{{
 *
 * Request body should look like:
 * {
 * 		username: username,
 * 		password: password,
 * 		postalCode: postalcode, 
 * }
 *
 * On success, the newly created user object is returned
 * On failure, (duplicate username / username or password is too short)
 * a 400 error code and an appropriate error message is returned.
 *///}}}
app.post('/signup', (req, res) => {//{{{
	new User({
		username: req.body.username,
		password: req.body.password,
		postalCode: req.body.postalCode
	}).save()
  .then((result) => {
    res.send(result)
  }).catch((error) => {
    log(error)
    let msg = 'Invalid data has been entered.'
    if (!error.errors) {
      msg = 'Someone is already using that username.'
    } else if (error.errors.password) {
      msg = error.errors.password.message
    } else if (error.errors.username) {
      msg = error.errors.username.message
    } else if (error.errors.postalCode) {
      msg = error.errors.postalCode.message
    }
    res.status(400).send(msg);
  })
})//}}}

/** Used when the user attempts to login{{{
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
 *///}}}
app.post('/login', (req, res) => {//{{{
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
})//}}}

/**
 * Used when the user enters an item in the cart
 *
 * The id in the url should be a mongodb id for the food
 * to add to the cart
 *
 * IMPORTANT
 * If user is not logged in, code 401 is sent, then the front
 * end is in charge of storing the cart information
 */
app.post('/add_to_cart/:id', (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(400).send()
	}

	id = mongoose.Types.ObjectId(id);
	
	if (!req.session.user_id) {
		return res.status(401).send('Must be logged in to add to the cart in the database')
	}	
	

	User.findByIdAndUpdate(req.session.user_id, { $addToSet: { cart: id }}, { new: true }).then((user) => {
		if (!user) {
			return res.status(404).send()
		}
		res.send({ 
			user,
			added_food_id: id
		})
	}).catch((error) => {
		res.status(400).send(error)
	})
});

/**
 * Deletes the FoodType with specified id
 * 
 * IMPORTANT
 * If user is not logged in, code 401 is sent, then the front
 * end is in charge of calling a post route with the local cart array, to get an
 * array of FoodTypes
 */
app.post('/delete_from_cart/:id', (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(400).send()
	}

	id = mongoose.Types.ObjectId(id);
	
	if (!req.session.user_id) {
		return res.status(401).send('Must be logged in to add to the cart in the database')
	}	

	User.findByIdAndUpdate(req.session.user_id, { $pull: { cart: id }}, { new: true }).then((user) => {
		if (!user) {
			return res.status(404).send()
		}
		res.send({ 
			user,
			removed_food_id: id
		})
	}).catch((error) => {
		res.status(400).send(error)
	})

});


/**
 * Returns an array of FoodTypes, which represents the current 
 * user's cart
 * 
 * IMPORTANT
 * If user is not logged in, code 401 is sent, then the front
 * end is in charge of calling a post route with the local cart array, to get an
 * array of FoodTypes
 */
app.get('/get_cart', (req, res) => {
	if (!req.session.user_id) {
		return res.status(401).send('Must be logged in')
	}

	User.findById(req.session.user_id).then((user) => {
		if (!user) {
			return res.status(400).send('User does not exist')
		}

		return Promise.resolve(user.cart)
	}).then((cartArray) => {
		// cartArray is an array of FoodType Ids
		return FoodType.find({'_id': { $in: cartArray }})
	}).then((cart) => {
		res.send(cart)
	}).catch((error) => {
		res.status(400).send()
	})
})


/**
 * Returns an array of FoodTypes depending on the input array
 *
 * Request body should look like:
 * {
 * 		cart: [array of string ids]
 * }
 */
app.post('/get_food_types_from_ids', (req, res) => {
	const cart = req.body.cart
	const cartIds = cart.map((stringId) => mongoose.Types.ObjectId(stringId))


	FoodType.find({'_id': { $in: cartIds }}).then((cart) => {
		res.send(cart)
	}).catch((error) => {
		res.status(400).send()
	})

})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
