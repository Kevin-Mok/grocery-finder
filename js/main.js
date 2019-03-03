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
		"store_name": "storeA",
		"img": "imgs/produce/fruits/apples.jpg",
		"price": 189
	},
	"2": {
		"name": "Lemon (Yellow)",
		"store_name": "storeC",
		"img": "imgs/produce/fruits/lemon.jpg",
		"price": 192
	},
	"3": {
		"name": "Lemon (Green)",
		"store_name": "storeC",
		"img": "imgs/produce/fruits/green-lemon.jpg",
		"price": 68
	},
	"4": {
		"name": "Apples (Green)",
		"store_name": "storeC",
		"img": "imgs/produce/fruits/green-apple.jpg",
		"price": 159
	},
	"5": {
		"name": "Cherries",
		"store_name": "storeA",
		"img": "imgs/produce/fruits/cherries.jpg",
		"price": 196
	}
}//}}}
const vegetables = {//{{{
	"11": {
		"name": "Carrots",
		"store_name": "storeA",
		"img": "imgs/produce/vegetables/carrots.jpg",
		"price": 189
	},
	"12": {
		"name": "Broccoli",
		"store_name": "storeC",
		"img": "imgs/produce/vegetables/broccoli.jpg",
		"price": 192
	},
	"13": {
		"name": "Bell Pepper (Red)",
		"store_name": "storeC",
		"img": "imgs/produce/vegetables/bell-pepper-red.jpg",
		"price": 68
	},
	"14": {
		"name": "Eggplant",
		"store_name": "storeC",
		"img": "imgs/produce/vegetables/eggplant.jpg",
		"price": 159
	},
	"15": {
		"name": "Zucchini",
		"store_name": "storeA",
		"img": "imgs/produce/vegetables/zucchini.jpg",
		"price": 196
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

function createNewRow() {
  const curRow = document.createElement('div')
  curRow.className = 'row'
  return curRow
}

function createNewFoodDiv() {
  const foodDiv = document.createElement('div')
  // foodDiv.classList.add('food-div', 'col-sm-4', 'col-lg-3', 'col-xl-2')
  foodDiv.className = 'food-div col-sm-4 col-lg-3 col-xl-2'
  return foodDiv
}

function createNewFoodImg(src) {
  const foodImg = document.createElement('img')
  foodImg.className = 'food-img img-fluid rounded'
  foodImg.src = src
  return foodImg
}

function createNewFoodInfo(name) {
  const foodInfo = document.createElement('p')
  foodInfo.className = 'food-info'
  foodInfo.textContent = name
  return foodInfo
}

function createNewCheckIcon() {
  const checkIcon = document.createElement('i')
  checkIcon.className = "check-icon far fa-check-circle fa-7x"
  checkIcon.style.display = 'none'
  return checkIcon
}

function createNewRemoveIcon() {
  const removeIcon = document.createElement('i')
  removeIcon.className = "remove-icon far fa-times-circle fa-7x"
  removeIcon.style.display = 'none'
  return removeIcon
}

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
  let curRow = createNewRow()
  foodGrid.appendChild(curRow)

  Object.keys(foodDict).forEach(function(key) {
    const foodDiv = createNewFoodDiv()
    foodDiv.id = 'food-div-' + key

    foodDiv.appendChild(createNewFoodImg(foodDict[key]["img"]))
    foodDiv.appendChild(createNewFoodInfo(foodDict[key]["name"]))
    const checkIcon = createNewCheckIcon()
    foodDiv.appendChild(checkIcon)
    foodDiv.appendChild(createNewRemoveIcon())

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

document.querySelectorAll('.cart-btn').forEach(cartBtn => {
	cartBtn.addEventListener('click', function() {
	  cartView = true
	  displayFood(createCartFoodDict())
	})
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
