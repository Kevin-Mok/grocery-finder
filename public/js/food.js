// vars {{{ //

let cart = []
const categoryList = document.querySelector('#category-list')

// food data (phase 1) {{{ //

const fruits = {//{{{
	"1": {
		"name": "Apples (Red)",
		"img": "imgs/food/produce/fruits/apples.jpg",
	},
	"2": {
		"name": "Lemon (Yellow)",
		"img": "imgs/food/produce/fruits/lemon.jpg",
	},
	"3": {
		"name": "Lemon (Green)",
		"img": "imgs/food/produce/fruits/green-lemon.jpg",
	},
	"4": {
		"name": "Apples (Green)",
		"img": "imgs/food/produce/fruits/green-apple.jpg",
	},
	"5": {
		"name": "Cherries",
		"img": "imgs/food/produce/fruits/cherries.jpg",
	}
}//}}}
const vegetables = {//{{{
	"11": {
		"name": "Carrots",
		"img": "imgs/food/produce/vegetables/carrots.jpg",
	},
	"12": {
		"name": "Broccoli",
		"img": "imgs/food/produce/vegetables/broccoli.jpg",
	},
	"13": {
		"name": "Bell Pepper (Red)",
		"img": "imgs/food/produce/vegetables/bell-pepper-red.jpg",
	},
	"14": {
		"name": "Eggplant",
		"img": "imgs/food/produce/vegetables/eggplant.jpg",
	},
	"15": {
		"name": "Zucchini",
		"img": "imgs/food/produce/vegetables/zucchini.jpg",
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

// food categories {{{ //

function displayFoodCategory(category) {
  $('.saved-carts-div').remove()
  curView = 'food'
  eval('displayFood(' + category.toLowerCase() +')')
}

function createFoodCategory(name) {//{{{
  const foodCategory = createDropdownMenu()
  foodCategory.querySelector('.dropdown-label').textContent = name

  const allSubCategory = createFoodSubcategory('All')
  allSubCategory.id = name.toLowerCase() + '-items'
	// SERVER DATA EXCHANGE: This is where the web app displays all food in this
  // category with name (argument to this function). The food information from
  // the server is then displayed in the DOM. 
  //
  // The code below accesses the dummy object with the same name as the function
  // argument defined at the top.
  allSubCategory.addEventListener('click', () => displayFoodCategory(name))
  addItemToDropdown(foodCategory, allSubCategory)

  return foodCategory
}//}}}

function createFoodSubcategory(name) {
  const subcategory = createDropdownItem()
  subcategory.classList.add('food-subcategory')
  subcategory.textContent = name
	// SERVER DATA EXCHANGE: This is where the web app displays all food in this
  // subcategory with name (argument to this function). The food information from
  // the server is then displayed in the DOM. 
  //
  // The code below accesses the dummy object with the same name as the function
  // argument defined at the top.
  subcategory.addEventListener('click', () => displayFoodCategory(name))

  return subcategory
}

// }}} food categories //

// food {{{ //

function createFoodDiv() {
  const foodDiv = document.createElement('div')
  // foodDiv.className = 'food-div col-sm-5 m-sm-3 col-md-3 m-md-4 ' +
    // 'col-lg-3 m-lg-4 col-xl-2 m-xl-3'
  // foodDiv.className = 'food-div col-sm-5 col-md-3 col-lg-3 col-xl-2'
  foodDiv.className = 'food-div col-sm-6 col-md-4 col-lg-3 col-xl-2'
  return foodDiv
}

function createFoodImg(src) {
  const foodImg = document.createElement('img')
  foodImg.className = 'food-img img-fluid rounded'
  foodImg.src = src
  return foodImg
}

function createFoodInfo(name) {
  const foodInfo = document.createElement('div')
  foodInfo.className = 'food-info-div'
  const foodInfoTitle = document.createElement('p')
  foodInfoTitle.className = 'food-info-title'
  foodInfoTitle.innerHTML = name
  foodInfo.appendChild(foodInfoTitle)

  foodInfo.appendChild(createAddToCartBtn())

  return foodInfo
}

// }}} food //

// icons {{{ //

function createAddToCartBtn() {
  const btn = document.createElement('button')
  btn.className = 'btn btn-primary food-info-btn add-cart-btn'
  btn.textContent = 'Add to Cart'
  return btn
}

function createRemoveFromCartBtn() {
  const btn = document.createElement('button')
  btn.className = 'btn btn-danger food-info-btn remove-cart-btn'
  btn.textContent = 'Remove from Cart'
  return btn
}

// }}} icons //

function createAlphDescIcon() {//{{{
  const alphDescIcon = document.createElement('i')
  alphDescIcon.className = "fas fa-sort-alpha-down"
  return alphDescIcon
}//}}}

// }}} return elem fxn's //

// sorting options {{{ //

function setAlphaSorting() {//{{{
  const sortingMenu = document.querySelector('#sorting-options')
  if (!sortingMenu) {
    return
  }
  sortingMenu.classList.remove('d-none');
  clearDropdownItems(sortingMenu)

  const sortingLabel = sortingMenu.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  const alphaForwardIcon = document.createElement('i')
  alphaForwardIcon.className = "fas fa-sort-alpha-down"
  sortingLabel.appendChild(alphaForwardIcon)

  addSortingOption(createDropdownIconItem(["fas fa-sort-alpha-down"]),
    sortingMenu,
    (e) => sortGridByValue('.food-div', '.food-info-div', 'text', 'asc', extractSortingLabelIcons(e)))

  addSortingOption(createDropdownIconItem(["fas fa-sort-alpha-up"]),
    sortingMenu,
    (e) => sortGridByValue('.food-div', '.food-info-div', 'text', 'desc', extractSortingLabelIcons(e)))

}//}}}

// }}} sorting options //

// show food {{{ //

function createFoodCategories(categories) {//{{{

  if (!categoryList) {
    return;
  }

  Object.keys(categories).forEach(function(key) {
    const category = createFoodCategory(key)
    categories[key].forEach(function(subcategoryName) {
      addItemToDropdown(category, createFoodSubcategory(subcategoryName))
    })
    categoryList.appendChild(category)
  })
}//}}}

function removeAllChildren(element) {
  if (!element) {
    return
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayFood(foodDocs) {//{{{
  clearGrid()

  foodDocs.forEach(foodDoc => {
    const foodDiv = createFoodDiv()
    // foodDiv.id = 'food-div-' + key

    foodDiv.appendChild(createFoodImg(foodDoc.imgSrc))
    foodDiv.appendChild(createFoodInfo(foodDoc.name))

    /* if (cart.indexOf(key) != -1) {
      foodDiv.classList.add('in-cart')
    } */

    gridRow.appendChild(foodDiv)
  })

  sortGridByValue('.food-div', '.food-info-div', 'text', 'asc', [createAlphDescIcon()])
  setAlphaSorting()
}//}}}

const displayAllFoodFetched = () => { //{{{
  fetch(createGetRequest('/foodTypes'))
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        log('GET failed: food types')
      }
    })
    .then(allFoodJson => {
      displayFood(allFoodJson)
    })
    .catch(err => { log(err) })
}//}}}

function createCartFoodDict() {
  const cartFoodDict = {}
  cart.forEach(function(foodId) {
    cartFoodDict[foodId] = all[foodId]
  })
  return cartFoodDict
}

function changeCategory(e) {//{{{
	// SERVER DATA EXCHANGE: This is where the web app displays foods depending
	// on the category the user has selected (All, Fruits, Vegetables, etc..)
	//
	// The server is provided with a category. The server provides an object
	// like the 'fruits' and 'vegetables' objects at the top of this file,
	// containing the food items for the current category.
	//
	// The food information from the server is then displayed in the DOM.
	//
	// The code below accesses the dummy objects defined at the top of this file.
  
  log('category', e.target)
  if (e.target.id == 'all-items') {
		$('.saved-carts-div').remove()
    curView = 'food'
    displayFood(all)
  } else if (e.target.classList.contains('food-subcategory')) {
		$('.saved-carts-div').remove()
    let foodCategoryName = e.target.textContent.toLowerCase()
    if (foodCategoryName == 'all') {
      foodCategoryName = /(\w*)-*/g.exec(e.target.id)[1]
    }
    curView = 'food'
    eval('displayFood(' + foodCategoryName +')')
  }
}
//}}}

// }}} show food //

// show/hide checks {{{ //

function toggleFoodCartStatus(e) {
  const foodDiv = e.target.parentElement.parentElement
  const foodInfoDiv = e.target.parentElement;
  if (e.target.classList.contains('btn')) {
    const foodId = /food-div-(\d*)/g.exec(foodDiv.id)[1]
    if (!foodDiv.classList.contains('in-cart')) {
      // add to cart

			// SERVER DATA EXCHANGE: This is where the user had just entered a
			// new item to the cart
			//
			// Provide the server with the current user id and the new cart.
			// Update the cart in the database, so that the current cart can
			// persist upon login and logout.

      cart.push(foodId)
      foodDiv.classList.add('in-cart')
      foodInfoDiv.removeChild(e.target)
      foodInfoDiv.appendChild(createRemoveFromCartBtn())
    } else {
      // rm from cart
      cart.splice(cart.indexOf(foodId), 1)
      foodDiv.classList.remove('in-cart')
      foodInfoDiv.removeChild(e.target)
      foodInfoDiv.appendChild(createAddToCartBtn())
      if (curView == 'cart') {
        foodDiv.parentElement.removeChild(foodDiv)
      }
    }
    // log(cart)
  }
}

// }}} show/hide checks //
