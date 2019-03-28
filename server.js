/* CSC309 - user and resource authentication */

'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client

const { ObjectID } = require('mongodb')

// Import our mongoose connection
// const { mongoose } = require('./db/mongoose');

// Import the models
// const { Student } = require('./models/student')

// express
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))

// set the view library
app.set('view engine', 'hbs')

// static js directory
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/imgs", express.static(__dirname + '/public/imgs'))
app.use("/js", express.static(__dirname + '/public/js'))

app.route('/').get((req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
