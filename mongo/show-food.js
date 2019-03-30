const log = console.log;
const { mongoose } = require('./mongoose');
const { Food } = require('./models')

Food.find().then(foods => { 
  log(foods, foods.length)
  process.exit()
}, error => { log(error) })
