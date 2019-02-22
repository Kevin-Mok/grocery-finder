const log = console.log

// return elem fxn's {{{ //

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

// }}} return elem fxn's //

// show/hide checks {{{ //

function showIconsOnFood(e) {
	// log(e)
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

function addFoodToCart(e) {
	const foodDiv = e.target.parentElement
	if (foodDiv.classList.contains('food-div') && !foodDiv.classList.contains('in-cart')) {
		foodDiv.classList.add('in-cart')
	} else {
		foodDiv.classList.remove('in-cart')
	}
}

const foodGridDiv = document.querySelector('#food-grid')
foodGridDiv.addEventListener('mouseover', showIconsOnFood);
foodGridDiv.addEventListener('mouseout', showIconsOnFood);
foodGridDiv.addEventListener('click', addFoodToCart);

// }}} show/hide checks //

// add food to row {{{ //

const fruits = {"1":{"name":"Red Apple","store_name":"storeA","img":"imgs/apples.jpg","price":189},"2":{"name":"Yellow Lemon","store_name":"storeC","img":"imgs/lemon.jpg","price":192},"3":{"name":"Green Lemon","store_name":"storeC","img":"imgs/green-lemon.jpg","price":68},"4":{"name":"Green Apple","store_name":"storeC","img":"imgs/green-apple.jpg","price":159},"5":{"name":"Cherries","store_name":"storeA","img":"imgs/cherries.jpg","price":196}}

let curRow = createNewRow()
foodGridDiv.appendChild(curRow)

Object.keys(fruits).forEach(function(key, index) {
	const foodDiv = createNewFoodDiv()
	const foodImg = document.createElement('img')
	foodImg.src = fruits[key]["img"]
	foodImg.className = 'food-img'
	foodDiv.appendChild(foodImg)
	foodDiv.appendChild(createNewCheckIcon())
	foodDiv.appendChild(createNewRemoveIcon())
	curRow.appendChild(foodDiv)
})

// }}} add food to row //

// navbar search {{{ //

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

// }}} navbar search //
