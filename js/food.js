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
  allSubCategory.addEventListener('click', () => {
		$('.saved-carts-div').remove()
    displayFoodCategory(name)
  })
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
  subcategory.addEventListener('click', () => {
		$('.saved-carts-div').remove()
    displayFoodCategory(name)
  })

  return subcategory
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

// }}} food //

// icons {{{ //

function createCheckIcon() {
  const checkIcon = document.createElement('i')
  checkIcon.className = "check-icon far fa-check-circle"
  checkIcon.style.display = 'none'
  return checkIcon
}

function createRemoveIcon() {
  const removeIcon = document.createElement('i')
  removeIcon.className = "remove-icon far fa-times-circle"
  removeIcon.style.display = 'none'
  return removeIcon
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
  sortingMenu.classList.remove('d-none');
  clearDropdownItems(sortingMenu)

  const sortingLabel = sortingMenu.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  const alphaForwardIcon = document.createElement('i')
  alphaForwardIcon.className = "fas fa-sort-alpha-down"
  sortingLabel.appendChild(alphaForwardIcon)

  addSortingOption(createDropdownIconItem(["fas fa-sort-alpha-down"]),
    sortingMenu,
    (e) => sortGridByValue('.food-div', '.food-info', 'text', 'asc', extractSortingLabelIcons(e)))

  addSortingOption(createDropdownIconItem(["fas fa-sort-alpha-up"]),
    sortingMenu,
    (e) => sortGridByValue('.food-div', '.food-info', 'text', 'desc', extractSortingLabelIcons(e)))

}//}}}

// }}} sorting options //

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

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function displayFood(foodDict) {//{{{
  clearGrid()

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

    gridRow.appendChild(foodDiv)
  })

  sortGridByValue('.food-div', '.food-info', 'text', 'asc', [createAlphDescIcon()])
  setAlphaSorting()
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

			// SERVER DATA EXCHANGE: This is where the user had just entered a
			// new item to the cart
			//
			// Provide the server with the current user id and the new cart.
			// Update the cart in the database, so that the current cart can
			// persist upon login and logout.

      cart.push(foodId)
      foodDiv.classList.add('in-cart')
    } else {
      // rm from cart
      cart.splice(cart.indexOf(foodId), 1)
      foodDiv.classList.remove('in-cart')
      if (curView == 'cart') {
        foodDiv.parentElement.removeChild(foodDiv)
      }
    }
    // log(cart)
  }
}

// }}} show/hide checks //
