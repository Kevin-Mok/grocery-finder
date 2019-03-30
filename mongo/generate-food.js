// vars {{{ //

'use strict';
const log = console.log;
const fs = require('fs');
const { mongoose } = require('./mongoose');
const { Food, Store } = require('./models')

const storeNames = JSON.parse(fs.readFileSync('../json/stores.json'))
const streetNames = JSON.parse(fs.readFileSync('../json/streets.json'))
const maxStreetNum = 1000

// }}} vars //

// helpers {{{ //

const getRandomElem = array => { 
  return array[Math.floor(Math.random() * array.length)]
}

const getRandomAddress = () => { 
  return Math.ceil(Math.random() * maxStreetNum) + ' ' + getRandomElem(streetNames)
}

// }}} helpers //

// add items {{{ //

for (let i = 0; i < 10; i++) {
  new Store({
    name: getRandomElem(storeNames),
    address: getRandomAddress()
  }).save().then((result) => {
    log(result)
  }, (error) => {
    log('ERROR: while adding', store)
  })
}

// }}} add items //
