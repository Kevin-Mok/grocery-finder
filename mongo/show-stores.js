const log = console.log;
const { mongoose } = require('./mongoose');
const { Store } = require('./models')

Store.find().then(stores => { 
  log(stores, stores.length)
  process.exit()
}, error => { log(error) })
