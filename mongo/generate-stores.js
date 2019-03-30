// vars {{{ //

'use strict';
const log = console.log;
const fs = require('fs');
const { mongoose } = require('./mongoose');
const { Food, Store } = require('./models')

const storeNames = JSON.parse(fs.readFileSync('../json/stores.json'))
const streetNames = JSON.parse(fs.readFileSync('../json/streets.json'))

// const storesToAdd = 5
const storesToAdd = 2

// }}} vars //

// helpers {{{ //

const getRandomElem = array => { 
  return array[Math.floor(Math.random() * array.length)]
}

const getRandomAddress = () => { 
  const maxStreetNum = 1000
  return Math.ceil(Math.random() * maxStreetNum) + ' ' + getRandomElem(streetNames)
}

// }}} helpers //

// add items {{{ //

for (let i = 0; i < storesToAdd; i++) {
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
