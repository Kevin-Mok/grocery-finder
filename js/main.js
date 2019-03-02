const log = console.log
let curView = 'stores'

function extractFloat(text) {//{{{
  return parseFloat(/[0-9\.]+/g.exec(text)[0])
}//}}}

window.onload = function() {//{{{
  foodGridRow.addEventListener('mouseover', showIconsOnFood);
  foodGridRow.addEventListener('mouseout', showIconsOnFood);
  foodGridRow.addEventListener('click', toggleFoodCartStatus);

  createFoodCategories(categories)
  categoryList.addEventListener('click', changeCategory, true)

  document.querySelector('#cart-btn').addEventListener('click', function() {
    curView = 'cart'
    displayFood(createCartFoodDict())
  })
  document.querySelector('#calc-btn').addEventListener('click', function() {
    displayStores(stores)
  })

  displayStores(stores)
  
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
}//}}}
