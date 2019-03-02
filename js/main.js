// vars {{{ //

const log = console.log

const cart = []
let cartView = false
const foodGrid = document.querySelector('#food-grid')
const categoryList = document.querySelector('#category-list')

// food data (phase 1) {{{ //

const fruits = {//{{{
	"1": {
		"name": "Apples (Red)",
		"img": "imgs/produce/fruits/apples.jpg",
	},
	"2": {
		"name": "Lemon (Yellow)",
		"img": "imgs/produce/fruits/lemon.jpg",
	},
	"3": {
		"name": "Lemon (Green)",
		"img": "imgs/produce/fruits/green-lemon.jpg",
	},
	"4": {
		"name": "Apples (Green)",
		"img": "imgs/produce/fruits/green-apple.jpg",
	},
	"5": {
		"name": "Cherries",
		"img": "imgs/produce/fruits/cherries.jpg",
	}
}//}}}
const vegetables = {//{{{
	"11": {
		"name": "Carrots",
		"img": "imgs/produce/vegetables/carrots.jpg",
	},
	"12": {
		"name": "Broccoli",
		"img": "imgs/produce/vegetables/broccoli.jpg",
	},
	"13": {
		"name": "Bell Pepper (Red)",
		"img": "imgs/produce/vegetables/bell-pepper-red.jpg",
	},
	"14": {
		"name": "Eggplant",
		"img": "imgs/produce/vegetables/eggplant.jpg",
	},
	"15": {
		"name": "Zucchini",
		"img": "imgs/produce/vegetables/zucchini.jpg",
	}
}//}}}
const stores = {//{{{
  "1": {
    "name": "Loblaws",
    "img": "imgs/stores/loblaws.jpg",
  },
	"2": {
		"name": "Metro",
		"img": "imgs/stores/metro.jpg",
	},
	"3": {
		"name": "Sobeys",
		"img": "imgs/stores/sobeys.jpg",
	},
	"4": {
		"name": "Whole Foods",
		"img": "imgs/stores/whole-foods.jpg",
	},
}//}}}
const produce = Object.assign({}, fruits, vegetables)
const all = Object.assign({}, produce)

const categories = {"Produce": ['Fruits', 'Vegetables']}

const cartPriceRange = { min: 9999, max: 0 }
const storeDistRange = { min: 999, max: 0 }

// }}} food data //

// }}} vars //

// create elem fxn's {{{ //

function createRow() {//{{{
  const curRow = document.createElement('div')
  curRow.className = 'row'
  return curRow
}//}}}

// food categories {{{ //

function createDropdownMenu() {//{{{
  const dropdownMenu = document.createElement('li')
  dropdownMenu.className = "nav-item dropdown pointer"

  const dropdownLabel = document.createElement('a')
  dropdownLabel.className = 'dropdown-label nav-link dropdown-toggle'
  dropdownLabel.setAttribute('data-toggle', 'dropdown')

  const dropdown = document.createElement('div')
  dropdown.className = 'dropdown-menu'

  dropdownMenu.appendChild(dropdownLabel)
  dropdownMenu.appendChild(dropdown)

  return dropdownMenu
}//}}}

function createFoodCategory(name) {//{{{
  const foodCategory = createDropdownMenu()
  foodCategory.querySelector('.dropdown-label').textContent = name

  const allSubCategory = createFoodSubcategory('All')
  allSubCategory.id = name.toLowerCase() + '-items'
  addItemToDropdown(foodCategory, allSubCategory)

  return foodCategory
}//}}}

function createDropdownItem() {
  const dropdownItem = document.createElement('a')
  dropdownItem.className = 'dropdown-item pointer'
  dropdownItem.setAttribute('data-toggle', 'dropdown')

  return dropdownItem
}

function createFoodSubcategory(name) {
  const subcategory = createDropdownItem()
  subcategory.textContent = name

  return subcategory
}

function addItemToDropdown(dropdown, item) {
  dropdown.querySelector('.dropdown-menu').appendChild(item)
}

function clearDropdownItems(dropdown) {
  removeAllChildren(dropdown.querySelector('.dropdown-menu')) 
}

// }}} food categories //

// food {{{ //

function createFoodDiv() {
  const foodDiv = document.createElement('div')
  // foodDiv.classList.add('food-div', 'col-sm-4', 'col-lg-3', 'col-xl-2')
  foodDiv.className = 'food-div col-sm-4 col-lg-3 col-xl-2'
  return foodDiv
}

function createFoodImg(src) {
  const foodImg = document.createElement('img')
  foodImg.className = 'food-img img-fluid rounded'
  foodImg.src = src
  return foodImg
}

function createFoodInfo(name) {
  const foodInfo = document.createElement('p')
  foodInfo.className = 'food-info'
  foodInfo.textContent = name
  return foodInfo
}

// icons {{{ //

function createCheckIcon() {
  const checkIcon = document.createElement('i')
  checkIcon.className = "check-icon far fa-check-circle fa-7x"
  checkIcon.style.display = 'none'
  return checkIcon
}

function createRemoveIcon() {
  const removeIcon = document.createElement('i')
  removeIcon.className = "remove-icon far fa-times-circle fa-7x"
  removeIcon.style.display = 'none'
  return removeIcon
}


// }}} icons //

// }}} food //

// store {{{ //

function createStoreDiv() {//{{{
  const storeDiv = document.createElement('div')
  storeDiv.className = 'store-div media col-xl-5 mx-auto'
  return storeDiv
}//}}}

function createStoreThumbnail(src) {//{{{
  const storeThumbnail = document.createElement('div')
  storeThumbnail.className = 'store-img-div media-left'

  const storeImg = document.createElement('img')
  storeImg.className = 'store-img media-object img-thumbnail'
  storeImg.src = src

  storeThumbnail.appendChild(storeImg)

  return storeThumbnail
}//}}}

function createStoreBody(name) {
  const storeBody = document.createElement('div')
  storeBody.className = 'store-body media-body'

  const storeHeader = document.createElement('h3')
  storeHeader.className = 'store-name media-heading'
  storeHeader.textContent = name

  const storeScoreParElem = document.createElement('p')
  storeScoreParElem.className = 'store-score-label'
  storeScoreParElem.textContent = "Score: "

  const storeScoreSpanElem = document.createElement('span')
  storeScoreSpanElem.className = 'store-score-value'
  storeScoreParElem.appendChild(storeScoreSpanElem)

  // cart price line {{{ //
  
  const cartPriceParElem = document.createElement('p')
  cartPriceParElem.className = 'cart-price-label'
  cartPriceParElem.textContent = "Cart Price: "

  const cartPriceSpanElem = document.createElement('span')
  cartPriceSpanElem.className = 'cart-price-value'
  cartPriceParElem.appendChild(cartPriceSpanElem)
  
  // }}} cart price line //

  // store dist line {{{ //
  
  const storeDistParElem = document.createElement('p')
  storeDistParElem.className = 'store-dist-label'
  storeDistParElem.textContent = "Store Distance: "

  const storeDistSpanElem = document.createElement('span')
  storeDistSpanElem.className = 'store-dist-value'
  storeDistParElem.appendChild(storeDistSpanElem)
  
  // }}} store dist line //

  storeBody.appendChild(storeHeader)
  storeBody.appendChild(storeScoreParElem)
  storeBody.appendChild(cartPriceParElem)
  storeBody.appendChild(storeDistParElem)

  return storeBody
}

/* function createStoreInfo(storeBody) {
  const cartPrice = document.createElement('p')
  cartPrice.textContent = name
} */

function resetRanges() {
  cartPriceRange.min = 9999
  cartPriceRange.max = 0

  storeDistRange.min = 999
  storeDistRange.max = 0
}

// }}} store //

// }}} return elem fxn's //

// show food {{{ //

function createFoodCategories(categories) {//{{{
  Object.keys(categories).forEach(function(key) {
    const category = createFoodCategory(key)
    categories[key].forEach(function(subcategoryName) {
      addItemToDropdown(category, createFoodSubcategory(subcategoryName))
    })
    categoryList.appendChild(category)
  })
}//}}}
createFoodCategories(categories)

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayFood(foodDict) {//{{{
  removeAllChildren(foodGrid)

  let curRow = createRow()
  foodGrid.appendChild(curRow)

  Object.keys(foodDict).forEach(function(key) {
    const foodDiv = createFoodDiv()
    foodDiv.id = 'food-div-' + key

    foodDiv.appendChild(createFoodImg(foodDict[key]["img"]))
    foodDiv.appendChild(createFoodInfo(foodDict[key]["name"]))
    const checkIcon = createCheckIcon()
    foodDiv.appendChild(checkIcon)
    foodDiv.appendChild(createRemoveIcon())

    if (cart.indexOf(key) != -1) {
      foodDiv.classList.add('in-cart')
      checkIcon.style.display = 'inline'
    }

    curRow.appendChild(foodDiv)
  })
}//}}}

function createCartFoodDict() {
  const cartFoodDict = {}
  cart.forEach(function(foodId) {
    cartFoodDict[foodId] = all[foodId]
  })
  return cartFoodDict
}
document.querySelector('#cart-btn').addEventListener('click', function() {
  cartView = true
  displayFood(createCartFoodDict())
})

function changeCategory(e) {//{{{
  cartView = false
  if (e.target.id == 'all-items') {
    displayFood(all)
  } else if (e.target.classList.contains('dropdown-item')) {
    let foodCategoryName = e.target.textContent.toLowerCase()
    if (foodCategoryName == 'all') {
      foodCategoryName = /(\w*)-*/g.exec(e.target.id)[1]
    }
    eval('displayFood(' + foodCategoryName +')')
  }
}
categoryList.addEventListener('click', changeCategory, true)//}}}

// }}} show food //

// sorting options {{{ //

function setAlphaSorting() {//{{{
  const sortingMenu = document.querySelector('#sorting-options')

  const sortingLabel = sortingMenu.querySelector('#sorting-label')
  sortingLabel.className = "fas fa-sort-alpha-down"

  clearDropdownItems(sortingMenu)
  const alphaBackwardItem = createDropdownItem()
  const alphaBackward = document.createElement('i')
  alphaBackward.className = "fas fa-sort-alpha-up"
  alphaBackwardItem.appendChild(alphaBackward)
  addItemToDropdown(sortingMenu, alphaBackwardItem)

}//}}}
setAlphaSorting()

// }}} sorting options //

// show stores {{{ //

function generateRandomFloat(min, max) {//{{{
  return (Math.random() * (max - min) + min).toFixed(2)
}//}}}

function updateRange(value, range) {//{{{
  // TODO: pass in parsed value? //
  const parsedValue = parseFloat(value)
  if (parsedValue < range.min) {
    // log(parsedValue, '<', range.min)
    range.min = parsedValue
  } 
  if (parsedValue > range.max) {
    // log(parsedValue, '>', range.max)
    range.max = parsedValue
  }
}//}}}

function addRandomStoreInfo(storeBody) {//{{{
  const cartPriceValueElem = storeBody.querySelector('.cart-price-value')
  const storeDistValueElem = storeBody.querySelector('.store-dist-value')

  const cartPrice = generateRandomFloat(10, 50)
  const storeDist = generateRandomFloat(5, 50)

  cartPriceValueElem.textContent = cartPrice
  storeDistValueElem.textContent = storeDist

  updateRange(cartPrice, cartPriceRange)
  updateRange(storeDist, storeDistRange)
}//}}}

function hsv2rgb(h, s, v) {//{{{
  // http://jsfiddle.net/hqp1nmvr/
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
}//}}}

function getPercentOfRange(value, range) {
  return (value - range.min) / (range.max - range.min)
}

function colorValuesByRange(valueElems, range) {//{{{
  // will color min value green and max value red
  for (const valueElem of valueElems) {
    // TODO: need to modify saturation/value values to get darker colors?
    // depends on bg //
    // https://stackoverflow.com/a/11850303/8811872 - 0 is green, 120 is red
    const hue = Math.floor((1 - getPercentOfRange(valueElem.textContent, range)) * 120)
    valueElem.style.color = hsv2rgb(hue, .8, .9)
  }
}//}}}

function addUnitToValues(valueElems, unit, frontOrBack) {
  for (const valueElem of valueElems) {
    const value = valueElem.textContent
    valueElem.textContent = (frontOrBack == 'front') ? unit + value : value + unit
  }
}

function addStoreScores() {//{{{
  const storeBodies = document.querySelectorAll('.store-body')
  for (const storeBody of storeBodies) {
    const cartPriceScore = 1 - getPercentOfRange(
      storeBody.querySelector('.cart-price-value').textContent, cartPriceRange) 
    const storeDistScore = 1 - getPercentOfRange(
      storeBody.querySelector('.store-dist-value').textContent, storeDistRange) 
    const storeScore = ((cartPriceScore + storeDistScore) / 2 * 10).toFixed(1)
    storeBody.querySelector('.store-score-value').textContent = storeScore
  }
}//}}}

function doStoreCalculations() {//{{{
  // calculate store scores, color values and add units
  
  // NOTE: calculations must be done before adding units since calculating
  // functions assume value elements will only have number and no units
  // surrounding it
  addStoreScores()

  const cartPriceValueElems = document.querySelectorAll('.cart-price-value')
  const storeDistValueElems = document.querySelectorAll('.store-dist-value')
  const storeScoreValueElems = document.querySelectorAll('.store-score-value')

  colorValuesByRange(cartPriceValueElems, cartPriceRange)
  colorValuesByRange(storeDistValueElems, storeDistRange)
  colorValuesByRange(storeScoreValueElems, { min: 10, max: 0 })

  addUnitToValues(cartPriceValueElems, '$', 'front')
  addUnitToValues(storeDistValueElems, ' km', 'back')
  addUnitToValues(storeScoreValueElems, '/10.0', 'back')
}//}}}

function displayStores(storeDict) {//{{{
  removeAllChildren(foodGrid)

  let curRow = createRow()
  foodGrid.appendChild(curRow)

  resetRanges()
  Object.keys(storeDict).forEach(function(key) {
    const storeDiv = createStoreDiv()
    storeDiv.id = 'store-div-' + key

    storeDiv.appendChild(createStoreThumbnail(storeDict[key]["img"]))

    const storeBody = createStoreBody(storeDict[key]["name"])
    addRandomStoreInfo(storeBody)
    storeDiv.appendChild(storeBody)
    // storeDiv.appendChild(createStoreInfo(storeDict[key]["name"]))

    curRow.appendChild(storeDiv)
  })

  doStoreCalculations()
}
displayStores(stores)
document.querySelector('#calc-btn').addEventListener('click', function() {
  displayStores(stores)
})//}}}

// }}} show stores //

// show/hide checks {{{ //

function showIconsOnFood(e) {
  const foodDiv = e.target.parentElement
  if (foodDiv.classList.contains('food-div')) {
    if (e.type == 'mouseover') {
      if (foodDiv.classList.contains('in-cart')) {
        // if in cart, hide check and show remove
        foodDiv.querySelector('.check-icon').style.display = 'none'
        foodDiv.querySelector('.remove-icon').style.display = 'inline'
      } else {
        // else, just show check
        foodDiv.querySelector('.check-icon').style.display = 'inline'
      }
    } else if (e.type == 'mouseout') {
      if (foodDiv.classList.contains('in-cart')) {
        foodDiv.querySelector('.check-icon').style.display = 'inline'
      } else {
        foodDiv.querySelector('.check-icon').style.display = 'none'
      }
      // always hide remove after mouseout
      foodDiv.querySelector('.remove-icon').style.display = 'none'
    }
  }
}

function toggleFoodCartStatus(e) {
  const foodDiv = e.target.parentElement
  if (foodDiv.classList.contains('food-div')) {
    const foodId = /food-div-(\d*)/g.exec(foodDiv.id)[1]
    if (!foodDiv.classList.contains('in-cart')) {
      // add to cart
      cart.push(foodId)
      foodDiv.classList.add('in-cart')
    } else {
      // rm from cart
      cart.splice(cart.indexOf(foodId), 1)
      foodDiv.classList.remove('in-cart')
      if (cartView) {
        foodDiv.parentElement.removeChild(foodDiv)
      }
    }
    // log(cart)
  }
}

foodGrid.addEventListener('mouseover', showIconsOnFood);
foodGrid.addEventListener('mouseout', showIconsOnFood);
foodGrid.addEventListener('click', toggleFoodCartStatus);

// }}} show/hide checks //

// navbar dropdown {{{ //

// The following code implements the feature where if you hover a dropdown
// menu link, the dropdown options appear
// https://stackoverflow.com/questions/50116307/how-to-make-hover-effect-instead-of-click-in-bootstrap-4-dropdown-menu
$( ".dropdown" ).mouseover(function() {
    $( this ).addClass('show').attr('aria-expanded', "true");
    $( this ).find('.dropdown-menu').addClass('show');
});

$( ".dropdown" ).mouseout(function() {
  $( this ).removeClass('show').attr('aria-expanded', "false");
  $( this ).find('.dropdown-menu').removeClass('show');
});

// }}} navbar dropdown //

