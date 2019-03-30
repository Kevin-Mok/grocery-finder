// vars {{{ //

'use strict';
const log = console.log;
const fs = require('fs');
const { mongoose } = require('./mongoose');
const ObjectID = mongoose.Schema.Types.ObjectID 
const { Food, Store } = require('./models')

const foodsDict = JSON.parse(fs.readFileSync('../json/food.json'))

// }}} vars //

// helpers {{{ //

const getRandomPrice = (min, max) => { 
  return (Math.random() * (max - min) + min).toFixed(2)
}

const getfoodImgSrc = foodName => { 
  const imgDir = '/imgs/food/'
  const imgExt = '.jpg'
  const imgName = foodName.toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '') 
  return imgDir + imgName + imgExt
}

// }}} helpers //

// add items {{{ //

const generatePricesForStore = storeId => { 
  let foodDoc = null
  for (const [category, foodList] of Object.entries(foodsDict)) {
    for (const food of foodList) {
      new Food({
        foodType: food,
        foodSubcategory: category,
        store: storeId,
        price: getRandomPrice(1, 5),
        imgSrc: getfoodImgSrc(food)
      }).save().then((result) => {
        log(result)
      }, (error) => {
        log('ERROR: while adding', foodDoc)
      })
    }
  }
}

Store.find().then(stores => { 
  stores.forEach(store => { generatePricesForStore(store._id) })
}, error => { log(error) })

// }}} add items //
