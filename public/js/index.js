// vars {{{ //

const user = {
  userId: 1,
  username: 'user',
  password: 'user',
  postalCode: 'ABC 123',
  savedCarts: {}
}

// }}} vars //

window.onload = function() {//{{{
  gridRow.addEventListener('click', toggleFoodCartStatus);

	// SERVER DATA EXCHANGE: This is where the web app creates all the food
  // categories (returned from the server) displayed in the navbar.
  //
  // The code below uses the hardcoded categories object defined at the top
  // of food.js.
  createFoodCategories(categories)

  // categoryList.addEventListener('click', changeCategory, true)
  // categoryList.addEventListener('click', changeCategory)
  // document.querySelector('#all-items').addEventListener('click', changeCategory)
  
	// SERVER DATA EXCHANGE: This is where the web app displays all food in the
  // database. The food information from the server is then displayed in the DOM.
	// The code below accesses the `all` dummy object defined at the top of food.js.
  document.querySelector('#all-items').addEventListener('click', () => {
    displayFoodCategory('all')
  })

  // search listeners {{{ //

  document.querySelector('#search-bar-sm').addEventListener('keyup', e => {
    e.preventDefault()
    search('sm')
  })
  document.querySelector('#search-bar-lg').addEventListener('keyup', e => {
    e.preventDefault()
    search('lg')
  })

  document.querySelector('#search-btn-sm').addEventListener('click', e => {
    e.preventDefault()
    search('sm')
  })
  document.querySelector('#search-btn-lg').addEventListener('click', e => {
    e.preventDefault()
    search('lg')
  })

  document.querySelector('#clear-search-btn-sm').addEventListener('click', e => {
    e.preventDefault()
    clearSearch('sm')
  })
  document.querySelector('#clear-search-btn-lg').addEventListener('click', e => {
    e.preventDefault()
    clearSearch('lg')
  })

  // }}} search listeners //

  // displayStores(stores)

  // curView = 'food'
  // displayFood(all)

  // foodGridRow.appendChild(createEtf('Test', 'test', 4, 20))
  // openSettingsPopup()

  // displayFoodCategory('all')
  displayAllFoodFetched()

  // dropdown hover (jquery) {{{ //

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

  // }}} dropdown hover (jquery) //
}

// }}}  do these when page is loaded //
