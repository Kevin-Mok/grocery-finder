// vars {{{ //

const cart = []
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

// food categories {{{ //

function createFoodCategory(name) {//{{{
  const foodCategory = createDropdownMenu()
  foodCategory.querySelector('.dropdown-label').textContent = name

  const allSubCategory = createFoodSubcategory('All')
  allSubCategory.id = name.toLowerCase() + '-items'
  addItemToDropdown(foodCategory, allSubCategory)

  return foodCategory
}//}}}

function createFoodSubcategory(name) {
  const subcategory = createDropdownItem()
  subcategory.classList.add('food-subcategory')
  subcategory.textContent = name

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

function createAlphDescIcon() {//{{{
  const alphDescIcon = document.createElement('i')
  alphDescIcon.className = "fas fa-sort-alpha-down"
  return alphDescIcon
}//}}}

// }}} return elem fxn's //

// sorting options {{{ //

function setAlphaSorting() {//{{{
  const sortingMenu = document.querySelector('#sorting-options')
  clearDropdownItems(sortingMenu)

  const sortingLabel = sortingMenu.querySelector('#sorting-label')
  removeAllChildren(sortingLabel)
  const alphaForwardIcon = document.createElement('i')
  alphaForwardIcon.className = "fas fa-sort-alpha-down"
  sortingLabel.appendChild(alphaForwardIcon)

  /* const alphaBackwardItem = createDropdownItem()
  const alphaBackward = document.createElement('i')
  alphaBackward.className = "fas fa-sort-alpha-up"
  alphaBackwardItem.appendChild(alphaBackward)
  addItemToDropdown(sortingMenu, alphaBackwardItem) */

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
  curView = 'food'
  if (e.target.id == 'all-items') {
    displayFood(all)
  } else if (e.target.classList.contains('food-subcategory')) {
    let foodCategoryName = e.target.textContent.toLowerCase()
    if (foodCategoryName == 'all') {
      foodCategoryName = /(\w*)-*/g.exec(e.target.id)[1]
    }
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
