const savedCarts = {};
// the savedCarts Object is assumed to look like this:
//
//{
//  name_of_saved_cart_1: ["id_of_cart_item","id_of_cart_item", "id_of_cart_item"],
//  name_of_saved_cart_2: ["id_of_cart_item","id_of_cart_item", "id_of_cart_item"],
//}
// SERVER DATA EXCHANGE:get saved carts from server


// This javascript file contains code to dynamically create the saved carts display
//
// <div class='saved-carts-div'>
//   <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
//     Saved carts
//   </button>
//   <div class="dropdown-menu">
//     <a class="dropdown-item" href="#">Action</a>
//     <a class="dropdown-item" href="#">Another action</a>
//     <a class="dropdown-item" href="#">Something else here</a>
//   </div>
// </div>
function createSavedCartsDiv() {
  const savedCartsDiv = document.createElement('div')
  savedCartsDiv.className = 'saved-carts-div'

  const btn = createElementWithText('button', 'btn btn-primary dropdown-toggle', 'dropdownMenuButton', 'Saved Carts')
  btn.setAttribute('type', 'button')
  btn.setAttribute('data-toggle', 'dropdown')

  const dropdownMenu = document.createElement('div')
  dropdownMenu.className = 'dropdown-menu'

  const keys = Object.keys(savedCarts)

  keys.forEach((cartName) => {
    const a = createElementWithText('a', 'dropdown-item saved-cart-option', '', cartName)
    a.setAttribute('onClick', `changeCart('${cartName}')`)
    dropdownMenu.appendChild(a)
  })

  savedCartsDiv.appendChild(btn)
  savedCartsDiv.appendChild(dropdownMenu)

  document.querySelector('.container-fluid').appendChild(savedCartsDiv)
}

function changeCart(cartName) {
  // creates a clone of the saved cart
  cart = [...savedCarts[cartName]]
  displayCart(cart)
}
