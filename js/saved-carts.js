// This javascript file contains code to dynamically create the saved carts display
//
// <div class="saved-carts-div">
//   <h3>Saved Carts</h3>
//   <ul class="list-group">
//     <li class="list-group-item px-0">
//       <div class='saved-cart-div'>
  //         <a class="btn collapsed" data-toggle="collapse" href="#cart1" role="button">
  //         Cart 1
  //         </a>
  //         <button class="btn btn-primary saved-cart-add-btn">Add to cart</button>
  //         <button class="btn btn-primary saved-cart-replace-btn">Replace cart</button>
//       </div>
//       <div class="collapse" id="cart1">
//         <div class="saved-cart-item">
//           Item 1
//         </div>
//         <div class="saved-cart-item">
//           Item 2
//         </div>
//       </div>
//     </li>
//
//     <li class="list-group-item px-0">
//       <div class='saved-cart-div'>
//       <a class="btn collapsed" data-toggle="collapse" href="#cart2" role="button">
//         Cart 2
//       </a>
//       <button class="btn btn-primary saved-cart-add-btn">Add to cart</button>
//       <button class="btn btn-primary saved-cart-replace-btn">Replace cart</button>
//       </div>
//       <div class="collapse" id="cart2">
//         <div class="saved-cart-item">
//           Item 1
//         </div>
//         <div class="saved-cart-item">
//           Item 2
//         </div>
//       </div>
//     </li>
//   </ul>
// </div>
function createSavedCartsDiv() {
  const savedCartsDiv = document.createElement('div')
  savedCartsDiv.className = 'saved-carts-div'

  const title = createElementWithText('h3', '', '', 'Saved Carts')
  savedCartsDiv.appendChild(title)

  const ul = document.createElement('ul')
  ul.className = 'list-group'

  const cartNames = Object.keys(user.savedCarts)
  for (let i = 0; i < cartNames.length; i++) {
    const li = document.createElement('li')
    li.className = 'list-group-item px-0'
    const savedCartDiv = document.createElement('div')
    savedCartDiv.className = 'saved-cart-div'

    const a = createElementWithText('a', 'btn collapsed', '', cartNames[i])
    a.setAttribute('data-toggle', 'collapse')
    a.setAttribute('href', '#cart' + parseInt(i))
    a.setAttribute('role', 'button')
    const addBtn = createElementWithText('button', 'btn btn-primary saved-cart-add-btn', '', 'Add to cart')
    const replaceBtn = createElementWithText('button', 'btn btn-primary saved-cart-replace-btn', '', 'Replace cart')

    savedCartDiv.appendChild(a)
    savedCartDiv.appendChild(addBtn)
    savedCartDiv.appendChild(replaceBtn)

    const collapseDiv = document.createElement('div')
    collapseDiv.className = 'collapse'
    collapseDiv.id = 'cart' + parseInt(i)

    // For every item in the cart
    const cartItems =  user.savedCarts[cartNames[i]]
    for (let j = 0; j < cartItems.length; j++) {
      const itemDiv = createElementWithText('div', 'saved-cart-item', '', cartItems[j])
      collapseDiv.appendChild(itemDiv)
    }

    li.appendChild(savedCartDiv)
    li.appendChild(collapseDiv)
    ul.appendChild(li)

  }

  document.querySelector('.container-fluid').appendChild(ul)

}
