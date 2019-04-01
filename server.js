/* CSC309 - user and resource authentication */

'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const { ObjectID } = require('mongodb')
const { mongoose } = require('./mongo/mongoose');
const { Food, FoodType, Store } = require('./mongo/models')

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

app.route('/').get((req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/foodTypes', (req, res) => {
	FoodType.find({}).then(foodTypesDict => {
		res.send(foodTypesDict)
	}, (error) => {
		res.status(500).send(error)
	})
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
