const log = console.log

/* const itemDivs = document.querySelectorAll('.item')

for (const itemDiv of itemDivs) {
	itemDiv.className = 'item col-lg-4'
} */
function createNewRow() {
	const curRow = document.createElement('div')
	curRow.className = 'row'
	return curRow
}

function createNewFoodDiv() {
	const foodDiv = document.createElement('div')
	foodDiv.className =   'item col-lg-4'
	return foodDiv
}

const foodGridDiv = document.querySelector('#food-grid')

const fruits = {"1":{"name":"Red Apple","store_name":"storeA","img":"imgs/apples.jpg","price":189},"2":{"name":"Yellow Lemon","store_name":"storeC","img":"imgs/lemon.jpg","price":192},"3":{"name":"Green Lemon","store_name":"storeC","img":"imgs/green-lemon.jpg","price":68},"4":{"name":"Green Apple","store_name":"storeC","img":"imgs/green-apple.jpg","price":159},"5":{"name":"Waterlemon","store_name":"storeA","img":"","price":196}}
let curRow = createNewRow()
foodGridDiv.appendChild(curRow)
Object.keys(fruits).forEach(function(key, index) {
	const foodDiv = createNewFoodDiv()
	const foodImg = document.createElement('img')
	foodImg.src = fruits[key]["img"]
	foodDiv.appendChild(foodImg)
	curRow.appendChild(foodDiv)
})

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
