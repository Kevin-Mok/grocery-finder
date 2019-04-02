// SERVER DATA EXCHANGE:
// Get the cart from the server
// The code below assumes that the cart looks like this:
// {
//   2: {name: "Lemon (Yellow)", img: "imgs/food/produce/fruits/lemon.jpg"},
//   12: {name: "Broccoli", img: "imgs/food/produce/vegetables/broccoli.jpg"},
//   13: {name: "Bell Pepper (Red)", img: "imgs/food/produce/vegetables/bell-pepper-red.jpg"}
// }

window.onload = function() {
  const request = createGetRequest('/get_cart')
  fetch(request).then(function(res) {

    if (res.status === 401) {
      // User is not logged in 
    }
    return res.json()
  }).then((cart) => {
    displayCart(cart)
  }).catch((error) => {
    console.log(error)
  })


  createSavedCartsDiv()



}
displayCart(cart)


function displayCart(cart)  {
  // SERVER DATA EXCHANGE:
  // Get the cart from the server
  //
  // The code below assumes the cart object looks like this:
  // {
  //   2: {name: "Lemon (Yellow)", img: "imgs/food/produce/fruits/lemon.jpg"},
  //   12: {name: "Broccoli", img: "imgs/food/produce/vegetables/broccoli.jpg"},
  //   13: {name: "Bell Pepper (Red)", img: "imgs/food/produce/vegetables/bell-pepper-red.jpg"}
  // }

  cart.forEach(foodDoc => {
    const foodDiv = createFoodDiv()
    foodDiv.id = 'food-div-' + foodDoc._id

    foodDiv.appendChild(createFoodImg(foodDoc.imgSrc))
    foodDiv.appendChild(createFoodInfo(foodDoc.name))

    foodDiv.children[1].removeChild(foodDiv.children[1].children[1])
    foodDiv.children[1].appendChild(createRemoveFromCartBtn())
    foodDiv.children[1].children[1].setAttribute('onclick', 'removeFromCart(event)')
    gridRow.appendChild(foodDiv)
    // $('.remove-cart-btn').click(function(){
    //   console.log('sameed')
    // })
  })
}


/**
 * Called when the user clicks Remove from Cart
 */
function removeFromCart(e) {
  const foodDiv = e.target.parentElement.parentElement
  const foodInfoDiv = e.target.parentElement;
  const foodId = /food-div-([A-Za-z0-9]*)/g.exec(foodDiv.id)[1]

  gridRow.removeChild(foodDiv)

  
}

