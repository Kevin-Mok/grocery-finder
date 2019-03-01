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

// }}} food data //

// }}} vars //

// create elem fxn's {{{ //

function createRow() {//{{{
  const curRow = document.createElement('div')
  curRow.className = 'row'
  return curRow
}//}}}

// food categories {{{ //

function createFoodCategory(name) {
  const foodCategory = document.createElement('li')
  foodCategory.className = "nav-item dropdown pointer"

  const categoryLabel = document.createElement('a')
  categoryLabel.className = 'nav-link dropdown-toggle'
  // categoryLabel.id = name + '-dropdown'
  categoryLabel.setAttribute('data-toggle', 'dropdown')
  categoryLabel.textContent = name

  const dropdown = document.createElement('div')
  dropdown.className = 'dropdown-menu'

  foodCategory.appendChild(categoryLabel)
  foodCategory.appendChild(dropdown)

  const allSubCategory = createFoodSubcategory('All')
  allSubCategory.id = name.toLowerCase() + '-items'
  addSubToCategory(foodCategory, allSubCategory)

  return foodCategory
}

function createFoodSubcategory(name) {
  const subcategory = document.createElement('a')
  subcategory.className = 'dropdown-item pointer'
  subcategory.setAttribute('data-toggle', 'dropdown')
  subcategory.textContent = name

  return subcategory
}

function addSubToCategory(category, subcategory) {
  category.querySelector('.dropdown-menu').appendChild(subcategory)
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

function createStoreDiv() {
  const storeDiv = document.createElement('div')
  storeDiv.className = 'store-div media col-xl-5 mx-auto'
  return storeDiv
}

function createStoreThumbnail(src) {
  const storeThumbnail = document.createElement('div')
  storeThumbnail.className = 'store-img-div media-left'

  const storeImg = document.createElement('img')
  storeImg.className = 'store-img media-object img-thumbnail'
  storeImg.src = src

  storeThumbnail.appendChild(storeImg)

  return storeThumbnail
}

function createStoreBody(name) {
  const storeBody = document.createElement('div')
  storeBody.className = 'store-div-body media-body'

  const storeHeader = document.createElement('h3')
  storeHeader.className = 'store-name media-heading'
  storeHeader.textContent = name

  const cartPrice = document.createElement('p')
  cartPrice.className = 'cart-price-p'
  cartPrice.textContent = "Cart Price: "

  const storeDistance = document.createElement('p')
  storeDistance.className = 'store-dist-p'
  storeDistance.textContent = "Store Distance: "

  storeBody.appendChild(storeHeader)
  storeBody.appendChild(cartPrice)
  storeBody.appendChild(storeDistance)

  return storeBody
}

/* function createStoreInfo(storeBody) {
  const cartPrice = document.createElement('p')
  cartPrice.textContent = name
} */

// }}} store //

// }}} return elem fxn's //

// show food {{{ //

function createFoodCategories(categories) {
  Object.keys(categories).forEach(function(key) {
    const category = createFoodCategory(key)
    categories[key].forEach(function(subcategoryName) {
      addSubToCategory(category, createFoodSubcategory(subcategoryName))
    })
    categoryList.appendChild(category)
  })
}
createFoodCategories(categories)
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

// TODO: transition in //
function displayFood(foodDict) {//{{{
  foodGrid.innerHTML = ''
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

function generateRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2)
}

function addRandomStoreInfo(storeBody) {
  const cartPriceParElem = storeBody.querySelector('.cart-price-p')
  const storeDistParElem = storeBody.querySelector('.store-dist-p')

  const cartPriceSpanElem = document.createElement('span')
  const storeDistSpanElem = document.createElement('span')

  cartPriceSpanElem.textContent = '$' + generateRandomFloat(10, 50)
  storeDistSpanElem.textContent = generateRandomFloat(5, 50) + ' km'

  cartPriceParElem.appendChild(cartPriceSpanElem)
  storeDistParElem.appendChild(storeDistSpanElem)
}

function displayStores(storeDict) {//{{{
  foodGrid.innerHTML = ''
  let curRow = createRow()
  foodGrid.appendChild(curRow)

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
}//}}}
displayStores(stores)
document.querySelector('#calc-btn').addEventListener('click', function() {
  displayStores(stores)
})


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
    log(cart)
  }
}

foodGrid.addEventListener('mouseover', showIconsOnFood);
foodGrid.addEventListener('mouseout', showIconsOnFood);
foodGrid.addEventListener('click', toggleFoodCartStatus);

// }}} show/hide checks //
