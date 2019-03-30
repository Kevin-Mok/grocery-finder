// SERVER DATA EXCHANGE:
// Get the cart from the server
// The code below assumes that the cart looks like this:
// {
//   2: {name: "Lemon (Yellow)", img: "imgs/food/produce/fruits/lemon.jpg"},
//   12: {name: "Broccoli", img: "imgs/food/produce/vegetables/broccoli.jpg"},
//   13: {name: "Bell Pepper (Red)", img: "imgs/food/produce/vegetables/bell-pepper-red.jpg"}
// }
displayCart(cart)
createSavedCartsDiv()

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
  
  cart = {};

  Object.keys(cart).forEach(function(key) {
    const foodDiv = createFoodDiv()
    foodDiv.id = 'food-div-' + key

    foodDiv.appendChild(createFoodImg(cart[key]["img"]))
    foodDiv.appendChild(createFoodInfo(cart[key]["name"]))
    const checkIcon = createCheckIcon()
    foodDiv.appendChild(checkIcon)
    foodDiv.appendChild(createRemoveIcon())

    if (cart.indexOf(key) != -1) {
      foodDiv.classList.add('in-cart')
      checkIcon.style.display = 'inline'
    }

    gridRow.appendChild(foodDiv)
  })
}