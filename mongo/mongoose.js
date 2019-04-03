'use strict';

const mongoose = require('mongoose');
const mlabURI = 'mongodb://global:cJQWWLKDbQ8t8P6g@ds227146.mlab.com:27146/heroku_bhzxhm9b'
const localURI = 'mongodb://localhost:27017/GroceryAPI'

mongoose.connect(
  // process.env.MONGODB_URI,
  // mlabURI,
  localURI,
  { useNewUrlParser: true,
    useCreateIndex: true});

module.exports = { mongoose }
