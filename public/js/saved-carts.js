const savedCarts = {};
// the savedCarts Object is assumed to look like this:
//
//{
//  name_of_saved_cart_1: ["id_of_cart_item","id_of_cart_item", "id_of_cart_item"],
//  name_of_saved_cart_2: ["id_of_cart_item","id_of_cart_item", "id_of_cart_item"],
//}
// SERVER DATA EXCHANGE:get saved carts from server


// {
//     "savedCarts": [
//         {
//             "foodTypeIds": [
//                 "5ca28abcfdc49f4a47020488",
//                 "5ca28abcfdc49f4a47020487"
//             ],
//             "_id": "5ca5437fc6698d882bb62056",
//             "name": "SohaniSaga"
//         }
//     ]
// }



$('.save-cart-btn').click(openCurrentCartPopup)

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


  // get Saved Carts from database
  const request = createGetRequest('/get_save_cart')

  fetch(request).then((res) => {
    if (res.status === 401) {
      const noSavedCarts = createElementWithText('span', 'dropdown-item', '', 'You have no saved carts')
      dropdownMenu.appendChild(noSavedCarts)
      return Promise.resolve({})
    }
    return res.json()
  }).then((res) => {

    if (!$.isEmptyObject(res)) {
      const savedCarts = res.savedCarts
      savedCarts.forEach((savedCart) => {
        const a = createElementWithText('a', 'dropdown-item saved-cart-option', '', savedCart.name)
        a.setAttribute('onClick', `changeCart('${savedCart.name}')`)
        dropdownMenu.appendChild(a)
      })
    }

    savedCartsDiv.appendChild(btn)
    savedCartsDiv.appendChild(dropdownMenu)
    document.querySelector('.container-fluid').appendChild(savedCartsDiv)
    
  }).catch((error) => {
    console.log(error)
  })

  

}

/**
 * Replace the current user's cart with their saved cart
 * named cartName
 */
function changeCart(cartName) {
  const request = createPostRequest('/replace_curr_cart', {name: cartName})
  fetch(request).then((res) => {
    if (res.status === 200) {
      location.reload();
    }
  }).catch((error) => {
    console.log(error)
  })
}
