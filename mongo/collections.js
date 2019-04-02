// vars {{{ //

const log = console.log;
const fs = require('fs');
const { mongoose } = require('./mongoose');
const ObjectID = mongoose.Schema.Types.ObjectID 
const { Food, FoodType, Store, User } = require('./models')
const argv = require('yargs').argv

const imgDir = '/imgs'
const imgExt = 'jpg'

// }}} vars //

let selectedCollection = null//{{{
if (argv.food) {
  selectedCollection = Food
} else if (argv.foodTypes) {
  selectedCollection = FoodType
} else if (argv.stores) {
  selectedCollection = Store
} else if (argv.users) {
  selectedCollection = User
}
//}}}

// helpers {{{ //

const getRandomElem = array => { 
  return array[Math.floor(Math.random() * array.length)]
}

const showCollection = coll => { 
  coll.find().then(docs => { 
    log(docs, docs.length)
  }, error => { log(error) })
}

const findDoc = (coll, id) => { 
  coll.findById(id).then(doc => { 
    log(doc)
  }, error => { log(error) })
}

// generate stores {{{ //

const storeNames = JSON.parse(fs.readFileSync('../json/stores.json'))
const streetNames = JSON.parse(fs.readFileSync('../json/streets.json'))

const getRandomAddress = () => { 
  const maxStreetNum = 1000
  return Math.ceil(Math.random() * maxStreetNum) + ' ' + getRandomElem(streetNames)
}

const getStoreImgSrc = storeName => { 
  const imgName = storeName.toLowerCase().replace(/\s/g, '-')
  // return imgDir + 'stores/' + imgName + imgExt
  return `${imgDir}/stores/${imgName}.${imgExt}`
}

const generateStores = storesToAdd => {//{{{
  let storeName = ''
  for (let i = 0; i < storesToAdd; i++) {
    storeName = getRandomElem(storeNames)
    new Store({
      name: storeName,
      address: getRandomAddress(),
      imgSrc: getStoreImgSrc(storeName)
    }).save().then(result => {
      log(result)
    }, err => { log(err) })
  }
}//}}}

// }}} generate stores //

// generate food types {{{ //

const foodTypesDict = JSON.parse(fs.readFileSync('../json/food.json'))

const getfoodImgSrc = (foodName, foodSubcategory) => { 
  const imgName = foodName.toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '') 
  // return imgDir + 'food/' + imgName + imgExt
  return `${imgDir}/food/${foodSubcategory.toLowerCase()}/` + 
    `${imgName}.${imgExt}`
}

const generateFoodTypes = () => { 
  for (const [subcategory, foodList] of Object.entries(foodTypesDict)) {
    for (const food of foodList) {
      new FoodType({
        name: food,
        subcategory: subcategory,
        imgSrc: getfoodImgSrc(food, subcategory)
      }).save().then((result) => {
        log(result)
      }, (err) => {
        log(err)
      })
    }
  }
}

// }}} generate food types //

// generate food {{{ //

const getRandomPrice = (min, max) => { 
  return (Math.random() * (max - min) + min).toFixed(2)
}

const generateFoodForStore = storeId => { 
  FoodType.find().then(foodTypes => { 
    let foodDoc = null
    foodTypes.forEach(type => {
      new Food({
        foodType: type._id,
        store: storeId,
        price: getRandomPrice(1, 5),
      }).save().then((result) => {
        log(result)
      }, (error) => {
        log('ERROR: while adding', foodDoc)
      })
    })
  }, error => { log(error) })
}

const generateFood = () => { 
  Store.find().then(stores => { 
    stores.forEach(store => { generateFoodForStore(store._id) })
  }, error => { log(error) })
}

// }}} generate food //

// generate users {{{ //

const getCurUsers = () => { 
  User.find().then(users => { 
    return users.length
  }, error => { 
    return 0
  })
}

const getRandomPostalCode = () => { 
  const validPostalChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += validPostalChars[Math.floor
      (Math.random() * validPostalChars.length)]
  }
  return result;
}

const generateUser = (username, admin=false) => { 
  new User({
    username: username,
    password: username,
    postalCode: getRandomPostalCode(),
    isAdmin: admin
  }).save().then(result => {
    log(result)
  }, err => { log(err) })
}

// generates usersToAdd amount of users and 1 admin
const generateUsers = usersToAdd => {//{{{
  let curUsers = getCurUsers() || 0
  const adminName = 'admin' + ((curUsers == 0) ? 
    '' : curUsers.toString())
  generateUser(adminName, true)
  curUsers++

  let username = ''
  for (let i = curUsers; i < curUsers + usersToAdd; i++) {
    username = 'user' + ((i == 1) ?  '' : i.toString())
    log(username)
    generateUser(username)
  }
}//}}}

// }}} generate users //

const exitAfter = seconds => { 
  setTimeout(() => { process.exit() }, seconds * 1000)
}

// }}} helpers //

if (argv.gen || argv.g) {//{{{
  if (argv.stores) {
    generateStores(argv.stores)
  } else if (argv.foodTypes) {
    generateFoodTypes()
  } else if (argv.food) {
    generateFood()
  } else if (argv.users) {
    generateUsers(argv.users)
  }
  /* } else if (argv.all) {
    generateStores(argv.stores)
    generateFoodTypes()
    generateFood()
  } */
  exitAfter(2)
}//}}}

if (argv.find) {//{{{
  // log(argv, selectedCollection)
  findDoc(selectedCollection, argv.find)
}//}}}

if (argv.show) {//{{{
  if (argv.all) {
    for (const coll of [Store, FoodType, Food]) {
      showCollection(coll)
    }
  } else {
    showCollection(selectedCollection)
    exitAfter(1)
  }
}//}}}

if (argv.drop || argv.d) {//{{{
  if (argv.all) {
    for (const coll of [Food, FoodType, Store]) {
      coll.collection.drop()
      showCollection(selectedCollection)
    }
  } else {
    selectedCollection.collection.drop()
    showCollection(selectedCollection)
    exitAfter(1)
  }
}//}}}

process.on('unhandledRejection', r => console.log(r));
